---
title: Data mapping
description: Map source data to protobuf fields
---
# Mapping Excel data to a protocol with schemes {#协议-excel数据映射和支持的配置读取源-scheme}

Start with [Quickstart](./quick-start); see [Core engine](./xresloader-core) for command options. The overall flow is:

<div class="diagram-panel">
![Mapping illustration](/img/en/development/conversion-pipeline.svg)
</div>

 Tell [xresloader](https://github.com/xresloader/xresloader) how Excel cells correspond to your protocol. This chapter explains that mapping.

## Structure of configuration entries {#配置项的结构}

Each setting is a key with up to three values: **major, minor, addition**. Their meaning depends on the key; see [Available options](#可用的配置项).

## Mapping schemes {#数据映射-scheme}

A set of scheme entries tells [xresloader](https://github.com/xresloader/xresloader) where to read Excel data and which message and fields to populate.

### Data source {#数据源}

`DataSource` specifies the workbook, sheet and first row/column to read:

<div id="mapping-data-source"></div>
![Mapping illustration](/img/en/users/data-source.svg)

### Field names and message type {#数据索引}

`ProtoName` chooses the protocol message; `KeyRow` locates the field names used to map Excel columns.

<div id="mapping-data-index"></div>
![Mapping illustration](/img/en/users/data-index.svg)

### Nested types and messages {#类型嵌套和message嵌套}

Use `parent_field.child_field` for nested fields, as in the [upstream sample](https://github.com/xresloader/xresloader/tree/main/sample).

<div id="mapping-nested"></div>
![Mapping illustration](/img/en/users/nested-message.svg)

The illustration highlights the correspondence between `KeyRow` cells and protocol fields.

### Arrays and indices {#数组和下标}

For protobuf repeated fields, use `field[zero_based_index]`. Nested arrays use `parent[index].child[index]`.

<div id="mapping-array"></div>
![Mapping illustration](/img/en/users/nested-arrays.svg)

The illustration follows the `arr_in_arr` sheet in the [upstream sample](https://github.com/xresloader/xresloader/tree/main/sample).

## Ranges and transposition {#范围与转置}

Since 2.23.0, `DataSource` accepts `file|sheet|start_row,start_column,end_row,end_column`. Coordinates start at 1 and include the end cell. An omitted or zero end coordinate leaves that direction unbounded.

```xml
<scheme name="DataSource">tables.xlsx|upgrade|3,1,5,4</scheme>
<scheme name="KeyRow">2</scheme>
```

This reads rows 3–5 and columns 1–4 of the original sheet. `KeyRow` remains row 2. Multiple DataSource entries merge into the same output entry.

`--transpose-data-source` reads records by column, and KeyRow becomes the field-name column. DataSource coordinates still refer to the original sheet; do not swap them first.

| Field column (column 1) | Record 1 (column 2) | Record 2 (column 3) |
| --- | --- | --- |
| id | 10001 | 10002 |
| name | Aurora | Jack |

Use `DataSource=transpose.xlsx|kind|1,2,2,3`, `KeyRow=1` and `ProtoName=role_cfg` for this separate transposed sheet, with `--transpose-data-source` in the entry option.

## Generate your protocol descriptor {#生成自己的协议描述}

The quickstart package's kind.proto has no external dependencies. Regenerate its descriptor in the package directory:

```sh
protoc -I . --include_imports --descriptor_set_out=kind.pb kind.proto
```

If your schema imports xresloader.proto, other proto files or protobuf built-in types, add the actual include directories with `-I` and keep `--include_imports`. The converter reads this descriptor; generate application C++ or other bindings separately with the protoc/library version your application uses.

## Available options {#可用的配置项}

| Key | Purpose | Major | Minor | Addition | Notes |
| --------------------------- | ------------------------------------------------ | --------------------------- | --------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Key | Purpose | Major | Minor | Addition | Notes |
| DataSource | Input data | Workbook path | Sheet | start_row,start_column[,end_row,end_column] | **Required**, repeatable. Multiple sources merge. Optional end coordinates require >=2.23.0; omit them to read to the end. |
| MacroSource | Macro data | Workbook path | Sheet | start_row,start_column | Optional. |
| Protocol and output settings | | | | | |
| ProtoName | Message type | e.g. role_cfg | \| | \| | **Required**; optionally package.message. |
| OutputFile | Output file | e.g. role_cfg.bin | | | **Required**. |
| KeyRow | Field-name row | e.g. 2 | | | **Required**. With `--transpose-data-source`, this is a column number. |
| KeyCase | Field-name case | e.g. lower | \| | \| | `upper`, `lower`, or unchanged (leave blank). |
| KeyWordSplit | Word separator | \| | \| | \| | Optional separator inserted between field-name words; leave blank if unused. |
| KeyPrefix | Fixed prefix | \| | \| | \| | Optional field-name prefix. |
| KeySuffix | Fixed suffix | \| | \| | \| | Optional field-name suffix. |
| KeyWordRegex | Word splitting regex | Word boundaries, e.g. [ A-Z $ trn] | Separators removed, e.g. [_$ trn] | Prefix filter, e.g. [ a-zA-Z $] | Optional regular expressions. |
| Encoding | Text encoding | UTF-8 | \| | \| | Protobuf binary strings always use UTF-8; this setting does not change binary output. |
| UeCfg-UProperty | UE field attributes | Category, default XResConfig | Blueprint access, default XResConfig | Editor access, default EditAnywhere | Optional. |
| UeCfg-CaseConvert | PascalCase conversion | true/false | \| | \| | Optional, enabled by default for generated field and class names. |
| UeCfg-CodeOutput | UE code output | Code directory | Public directory prefix | Private directory prefix | Optional; generated C++ include paths depend on the Public prefix. |
| UeCfg-DestinationPath | Resource output | Resource directory | \| | \| | Optional. |
| UeCfg-CsvObjectWrapper | Map/array wrappers in Ue-Csv | Opening wrapper | Closing wrapper | \| | Optional; >=2.9.3. |
| UeCfg-EnableDefaultLoader | Generate default UE loader | `true/false` | \| | \| | Optional, default true; >=2.13.1. |
| UeCfg-IncludeHeader | Extra UE includes | Header path | Header path | Header path | Optional; >=2.13.1. |
| JsonCfg-LargeNumberAsString | JSON large integers as strings | `true/false` | \| | \| | Optional; >=2.16.0. |
| CallbackScript | Process data with JavaScript | Script path | \| | \| | Optional; >=2.13.0. |

For example, `0UnlockLevel_num` loses the leading 0 through the prefix filter, splits into Unlock, Level and num, and removes the underscore separator. With `_` as KeyWordSplit and lower case, the protocol field becomes `unlock_level_num`.

Use field-name splitting and case conversion only when needed to adapt another tool's naming rules.

### Date and time values {#关于日期时间格式}

- `Duration` accepts a number with a unit or `HH:MM:SS`; HH may exceed 24.
  > Since 2.23.0, units include w/weeks, d/days, h/hours, m/minutes, s/seconds, ms/milliseconds, us/microseconds and ns/nanoseconds, e.g. `30d` or `30ns`.
  > Without a unit, the number is in seconds.
- `Timestamp` accepts a Unix timestamp or `YYYY-mm-dd HH:MM:SS[timezone]`. Optional zones include `+HH:MM:ss`, `+HH:MM` and `Z`. With no zone, Java's default applies; set it with e.g. `-Duser.timezone=Asia/Shanghai`.

### Encoding {#关于设置编码}

Protobuf strings use UTF-8. For generated code and text output, the converter attempts to encode text using Encoding; this option does not affect binary output.

### Processing data with `CallbackScript` {#关于使用-callbackscript-处理数据}

The script referenced by CallbackScript uses these interfaces:

- `gOurInstance` exposes the data source (`DataSrcImpl.getOurInstance()`).
- `gSchemeConf` exposes the conversion settings (`SchemeConf.getInstance()`).
- Provide `function initDataSource()`; it runs when the workbook or sheet changes.
- Provide `function currentMessageCallback(originMsg, typeDesc)` for the current message callback.
  - `originMsg` is the original data as a `HashMap`.
  - `typeDesc` is an `org.xresloader.core.data.dst.DataDstWriterNode.DataDstTypeDescriptor`.

## Sources of field-mapping settings {#从哪里读取字段映射信息}

Besides inline rules supplied to the [core engine](./xresloader-core) with `-m`, mappings can come from files. The file extension selects the reader.

### In batch configuration (recommended) {#直接写在批量转表文件里推荐}

For batch conversion, put rules directly in the [batch configuration](./xresconv).

### In Excel: .xls or .xlsx {#直接写在excel里-文件后缀xlsxlsx}

The rule sheet must have a `header` column (the Chinese alias is 字段). Value columns are `major`, `minor`, `addition` (Chinese aliases 主配置, 次配置, 补充配置). A heading of 配置项 alone does not identify a rule sheet.

The sheet name becomes the scheme name supplied with `-m`. These columns provide each setting's values:

| header | Description | major | minor | addition | Notes |
| ------------ | --------------------------- | -------------------- | ------------- | -------- | -------------------------------------------------- |
| header | Description | major | minor | addition | Notes |
| DataSource | Workbook and sheet | example.xlsx | upgrade_10001 | 3,1 | Minor selects the sheet; addition sets the first row and column. |
| DataSource | Workbook and sheet | | upgrade_10002 | 3,1 | Minor selects the sheet; addition sets the first row and column. |
| MacroSource | Macro workbook and sheet | example.xlsx | macro | 2,1 | Minor selects the sheet; addition sets the first row and column. |
| Protocol settings | | | | | |
| ProtoName | Message type | role_upgrade_cfg | | | |
| OutputFile | Output file | role_upgrade_cfg.bin | | | |
| KeyRow | Field-name row | 2 | | | |
| KeyCase | Field-name case | | | | upper/lower/unchanged |
| KeyWordSplit | Word separator | | | | |
| KeyPrefix | Fixed prefix | | | | |
| KeySuffix | Fixed suffix | | | | |
| KeyWordRegex | Word splitting | | | | Boundary, separator-removal and prefix-filter regular expressions. |
| Encoding | Text encoding | UTF-8 | | | |

### In JSON: .json {#直接写在json文件里-文件后缀json}

The JSON root is an object keyed by scheme name (`-m`). Each scheme maps setting names to scalar values or lists of major, minor and addition values:

```json
{
    "scheme_kind": {
        "DataSource": ["example.xlsx", "kind", "3,1"],
        "MacroSource": ["example.xlsx", "macro", "2,1"],
        "ProtoName": "role_cfg",
        "OutputFile": "role_cfg.bin",
        "KeyRow": 2,
        "KeyCase": "lower",
        "KeyWordSplit": "_",
        "KeyWordRegex": ["[A-Z_\\$ \\t\\r\\n]", "[_\\$ \\t\\r\\n]", "[a-zA-Z_\\$]"],
        "Encoding": "UTF-8"
    }
}
```

### In INI: .ini, .conf or .cfg {#直接写在ini文件里-文件后缀iniconfcfg}

The INI section name is the scheme name (`-m`). Entries are:

- Key.0 => major value
- Key.1 => minor value
- Key.2 => addition value

For example:

```ini
[scheme_kind]
DataSource.0 = example.xlsx
DataSource.1 = kind
DataSource.2 = 3,1
MacroSource.0 = example.xlsx
MacroSource.1 = macro
MacroSource.2 = 2,1
ProtoName = role_cfg
OutputFile = role_cfg.bin
KeyRow = 2
KeyCase = lower
KeyWordSplit = _
KeyWordRegex.0 = [A-Z_\$ \t\r\n]
KeyWordRegex.1 = [_\$ \t\r\n]
KeyWordRegex.2 = [a-zA-Z_\$]
Encoding = UTF-8
```

## Complete examples {#完整的样例}

See the [upstream sample](https://github.com/xresloader/xresloader/tree/main/sample) and [xresloader README](https://github.com/xresloader/xresloader) for complete scheme examples. The example.xlsx names above are illustrative; the quickstart package uses tables.xlsx.
