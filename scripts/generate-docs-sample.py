"""Generate the small documentation workbook and descriptor from their sources."""
import argparse
import json
from pathlib import Path
import subprocess
import zipfile
from xml.sax.saxutils import escape

parser = argparse.ArgumentParser()
parser.add_argument('--protoc', required=True, help='Path to the project-compatible protoc')
args = parser.parse_args()
sample = Path(__file__).resolve().parent.parent / 'source/sample/current'
tables = json.loads((sample / 'tables.json').read_text(encoding='utf-8'))
ns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

def column(index):
    value = ''
    while index:
        index, digit = divmod(index - 1, 26)
        value = chr(65 + digit) + value
    return value

with zipfile.ZipFile(sample / 'tables.xlsx', 'w', zipfile.ZIP_DEFLATED) as output:
    overrides = ''.join(f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' for i in range(1, len(tables)+1))
    output.writestr('[Content_Types].xml', f'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>{overrides}</Types>')
    output.writestr('_rels/.rels', f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="{rel}/officeDocument" Target="xl/workbook.xml"/></Relationships>')
    sheets = ''.join(f'<sheet name="{name}" sheetId="{i}" r:id="rId{i}"/>' for i, name in enumerate(tables, 1))
    output.writestr('xl/workbook.xml', f'<workbook xmlns="{ns}" xmlns:r="{rel}"><sheets>{sheets}</sheets></workbook>')
    relationships = ''.join(f'<Relationship Id="rId{i}" Type="{rel}/worksheet" Target="worksheets/sheet{i}.xml"/>' for i in range(1, len(tables)+1))
    output.writestr('xl/_rels/workbook.xml.rels', f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{relationships}</Relationships>')
    for i, rows in enumerate(tables.values(), 1):
        body = ''
        for r, row in enumerate(rows, 1):
            cells = ''
            for c, value in enumerate(row, 1):
                coord = column(c) + str(r)
                if isinstance(value, (int, float)):
                    cells += f'<c r="{coord}"><v>{value}</v></c>'
                else:
                    cells += f'<c r="{coord}" t="inlineStr"><is><t>{escape(value)}</t></is></c>'
            body += f'<row r="{r}">{cells}</row>'
        output.writestr(f'xl/worksheets/sheet{i}.xml', f'<worksheet xmlns="{ns}"><sheetData>{body}</sheetData></worksheet>')

subprocess.run([args.protoc, '-I', str(sample), '--include_imports', '--descriptor_set_out=' + str(sample / 'kind.pb'), str(sample / 'kind.proto')], check=True)
print('Generated tables.xlsx and kind.pb from tables.json and kind.proto')
