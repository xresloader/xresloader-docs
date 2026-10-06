---
title: xresloader core features
description: Core concepts, configuration and runtime parameters
---
# The xresloader conversion engine {#转表引擎-xresloader}

Start with [Quick start](./quick-start). This reference follows the xresloader 2.23.7 implementation. The workflow is illustrated below:

<div class="diagram-panel">
![Mapping illustration](/img/en/development/conversion-pipeline.svg)
</div>

GUI, CLI, data and configuration ultimately converge on the [xresloader](https://github.com/xresloader/xresloader) engine command. This page describes that engine.

## Available parameters {#xresloader-可用参数列表}

| Option | Description | Details |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `-h --help` | Help | Display supported options |
| `-t --output-type` | Output format | bin (default), lua, msgpack, json, xml, javascript, js, ue-csv (>=2.0.0), ue-json (>=2.0.0) |
| `-p --proto` | Schema format | protobuf (default); capnproto and flatbuffer are not implemented |
| `-f --proto-file` | Descriptor | Multiple files supported from 2.14.0-rc2 |
| `-o --output-dir` | Output directory | Current directory by default |
| `-d --data-src-dir` | Data source root | Current directory by default |
| `-s --src-file` | Scheme source | Excel, INI/CFG/CONF and JSON are implemented. Prefer xls/xlsx/xlsm for Excel; other help-text suffixes do not establish support |
| `-m --src-meta` | Source metadata | Repeatable |
| `-l --delimiter` | Inline metadata separator regex | Splits -m rules; distinct from Plain field separators |
| `-v --version` | Version | Print the version |
| `-n --rename` | Rename output | Regex rule, e.g. `/(?i)\.bin$/\.lua/` |
| `--require-mapping-all` | Require all mappings | Every exported field needs a mapping; arrays need at least one element (>=2.10.0) |
| `--enable-alias-mapping` | Enable field aliases | Enabled by default in 2.23.7 source; set explicitly when behavior must be fixed |
| `--disable-alias-mapping` | Disable field aliases | Map original schema field names without changing them |
| `-c --const-print` | Export schema constants | String argument naming the output file |
| `-i --option-print` | Export schema options | String argument naming the output file |
| `-r --descriptor-print` | Export descriptors | String argument naming the output file (>=2.11.0-rc2) |
| `-a --data-version` | Data version | String written to header data_ver; generated from execution time when unset |
| `--pretty` | Pretty printing | Integer: 0 disables it; positive values specify indentation |
| `--enable-excel-formular` | Evaluate Excel formulas | Historically default before 2.11-RC3, disabled afterward; .xls evaluation can substantially slow conversion |
| `--disable-excel-formular` | Disable evaluation | Default: read saved formula caches with streaming indexes; date-format detection is disabled |
| `--disable-empty-list` | Deprecated: omit empty elements | Omit unfilled Excel array elements from output |
| `--enable-empty-list` | Deprecated: retain empty elements | Fill missing elements with default values |
| `--list-strip-all-empty` | Remove empty elements | Default; omit unfilled array elements (>=2.11.0-rc3) |
| `--list-keep-empty` | Keep all empty elements | Fill and export default values (>=2.11.0-rc3) |
| `--list-strip-empty-tail` | Remove trailing empty elements | Trim the tail and retain other missing elements as defaults (>=2.11.0-rc3) |
| `--enable-string-macro` | Apply macros to strings | Enable globally; use --disable-string-macro for individual tables (>=2.11.0-rc3) |
| `--disable-string-macro` | Disable string macros | Default behavior (>=2.11.0-rc3) |
| `--stdin` | Batch via standard input | One conversion per line, with the same options; single/double quotes group strings without escaping |
| `--lua-global` | Export Lua constants globally | Also import constants into _G; applies only to constant export |
| `--lua-module` | Legacy Lua module output | Use module(name, package.seeall) for global export |
| `--xml-root` | XML root tag | TagName of the XML output root |
| `--javascript-export` | JavaScript export mode | nodejs: exports; amd: define; other: global window/global |
| `--javascript-global` | JavaScript namespace | Namespace for global exports |
| `--ignore-unknown-dependency` | Ignore unknown dependencies | Ignore unknown input-schema dependencies (>=2.9.0) |
| `--validator-rules` | Custom validator configuration | YAML path (>=2.14.0-rc3) |
| `--disable-data-validator` | Ignore validation errors | >=2.17.0 |
| `--data-validator-error-version` | Validation severity threshold | Older validators fail; those at/above the threshold warn; 0 always fails |
| `--data-source-lru-cache-rows` | Cached row count | Streaming indexes only |
| `--tolerate-max-empty-rows` | Consecutive empty-row limit | Long empty ranges usually indicate editing mistakes (>=2.14.1) |
| `--ignore-field-tags` | Excluded field tags | Omit fields bearing specified tags (>=2.19.0) |
| `--default-field-separator` | Default Plain separator | Default `,;\|`; used inside textual message, map, list and oneof structures (>=2.21.0) |
| `--data-source-mapping-file` | Source mapping output file | >=2.19.1 |
| `--data-source-mapping-mode` | Source mapping mode | `none, md5, sha1, sha256` (>=2.19.1) |
| `--data-source-mapping-seed` | Source mapping hash seed | >=2.19.1 |
| `--transpose-data-source` | Transpose source rows/columns | KeyRow becomes the field column; DataSource coordinates still use original row/column order. See [Mapping](./data-mapping#范围与转置) |

## Defaults and boundaries {#默认行为与使用边界}

In 2.23.7, formula evaluation defaults off and field aliases default on. Historical help annotations can differ from initialization code; set switches explicitly when needed. Array trimming defaults to --list-strip-all-empty; --enable-empty-list / --disable-empty-list remain deprecated aliases.

Ordinary JSON is xresloader's header/data format; UE JSON is a DataTable structure. Neither should be assumed to be protobuf's official ProtoJSON. See [Output formats](./output-format).

Run `java -jar xresloader.jar --help` for actual help. JVM options precede -jar; conversion options follow the JAR. See [XML](./xresconv) and [CLI](./xresconv-cli) for paths and frontend options. These engine/CLI versions have English diagnostics without a locale switch.

## Batch processing {#批处理}

`--stdin` treats each nonempty line as a separate conversion within one JVM. In the [starter](./quick-start) directory, these two tasks export bin and JSON:

```bash
java -jar xresloader.jar --stdin <<'TASKS'
-p protobuf -f kind.pb -t bin -o output -a quick-start -s tables.xlsx -m scheme_kind
-p protobuf -f kind.pb -t json -o output -a quick-start -s tables.xlsx -m scheme_kind -n "/(?i)\.bin$/\.json/" --pretty 2
TASKS
```

In PowerShell, use a here-string:

```powershell
@'
-p protobuf -f kind.pb -t bin -o output -a quick-start -s tables.xlsx -m scheme_kind
-p protobuf -f kind.pb -t json -o output -a quick-start -s tables.xlsx -m scheme_kind -n "/(?i)\.bin$/\.json/" --pretty 2
'@ | java -jar xresloader.jar --stdin
```

stdin accepts single or double quote grouping without shell backslash escaping. This differs from an argv call; check whether complex quoted arguments can be represented.

A shared JVM amortizes startup, class loading, caches and JIT; the benefit depends on data and environment. The cumulative exit code cannot reconstruct each task's status. Inspect both logs and files. Use [CLI](./xresconv-cli) or [GUI](./xresconv-gui) for concurrency and cancellation.

### Complete 16-task example {#完整的-16-项示例}

The full original batch is retained as [core-batch.ps1](https://github.com/xresloader/xresloader-docs/blob/main/source/sample/core-batch.ps1). It covers Lua / JSON descriptors, JSON / XML / MsgPack, global / Node.js / AMD JavaScript, macros, mapping, nested arrays, upgrades and UE constants / DataTables / loaders. It requires the complete upstream sample, beyond the starter descriptor.

Copy upstream sample to an isolated directory and generate proto_v3/kind.pb using the next section. Retain the original workbook filename and custom_validator.yaml. At the site root:

```powershell
./source/sample/core-batch.ps1 -JarPath ../xresloader/target/xresloader-2.23.7.jar -SampleDir <copied-sample-directory> -OutputDir output-batch
```

The script retains all 16 tasks, checks dependencies and exit codes, removes historical -client, and directs outputs to output-batch under the working directory. Paths containing quotes or newlines are unsuitable for stdin. Upstream upgrade row 45 deliberately violates custom_rule5; the default uses the first 11 valid records. -IncludeValidationFailures restores the complete scheme_upgrade and makes two upgrade tasks fail strict validation (batch exit 2), while other tasks continue. A failed task may create an empty output file; existence alone is not success. Validation remains enabled and failing data is retained.

## Use xresloader directly {#直接使用xresloader}

The [upstream samples](https://github.com/xresloader/xresloader/tree/main/sample) demonstrate code and enum export, proto2/proto3, generated loaders, batch conversion and other features.

Windows entrypoints are [gen_sample_output.bat](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.bat) or [gen_sample_output.ps1](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.ps1). Linux/macOS/BSD use [gen_sample_output.sh](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.sh).

First generate proto2 descriptors with [gen_protocol_v2.py](https://github.com/xresloader/xresloader/blob/main/sample/gen_protocol_v2.py) and proto3 descriptors with [gen_protocol_v3.py](https://github.com/xresloader/xresloader/blob/main/sample/gen_protocol_v3.py).
