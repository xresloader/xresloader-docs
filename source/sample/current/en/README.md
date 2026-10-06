# English starter example

Verified component baseline: xresloader 2.23.7, xresconv-cli 2.0.2, xresconv-gui 3.0.0.

Download the complete engine JAR, rename it xresloader.jar and put it here.
Preview with `xresconv-cli --test -p 1 convert.xml`, then run
`xresconv-cli -p 1 convert.xml` to export character and upgrade tables as bin / JSON.
For the GUI, select English in Display settings, open convert.xml, select both
items, preview and start conversion. Project names and scripts are already English.

Load JSON with `node load-json.cjs output/role_upgrade_cfg.json`. This checks the
three-record count and queries ID=10001, Level=2. Node is a loader dependency;
conversion itself needs Java. Manual C++ and legacy libresloader sources are
included; regenerate bindings and compile against your matching protobuf runtime.

For native Lua, run `xresconv-cli -p 1 convert-lua.xml`, then
`lua load-lua.lua output/role_upgrade_cfg.lua` using standard Lua 5.4. No additional
loader library is needed. The default bin / JSON manifest remains unchanged.

sample.xml, sample_include.xml and selectors.json contain complete annotated
extensions adapted from xresconv-conf. Run `xresconv-cli -p 1 sample.xml` for six
bin / JSON outputs, or `xresconv-cli -p 1 sample_include.xml` for three Lua outputs.
Optional macros, validators and nested arrays need upstream files and remain
commented out. For GUI selectors, start with
`xresconv-gui --custom-selector selectors.json`, wait for buttons, then open XML.
This avoids the GUI 3.0.0 simultaneous-input startup race.

tables.json is the source of tables.xlsx. Character IDs and original names come
from the first three kind rows of xresloader sample/资源转换示例.xlsx at f5ab9146.
English names are Aurora, Jack and Kula. Upgrade values come from the first three
rows of this site's historical quick_start/sample-conf/role_tables.xlsx, with
missing numeric values explicitly set to 0. IDs, field names and numeric values
match the Chinese sample; only labels and character names are translated.

kind.proto describes the two basic messages without custom validators. kind.pb
is generated with protoc 36.2. The prepared descriptor needs no protoc to run.
Regenerate and package at the documentation repository root:

```powershell
python ./scripts/generate-docs-sample.py --locale en --protoc <protoc-path>
./scripts/package-docs-sample.ps1 -Locale en
```

Upstream source: https://github.com/xresloader/xresloader/tree/f5ab9146/sample
Guide: https://xresloader.atframe.work/docs/users/quick-start
Chinese samples and historical directories are maintained separately.
CLI, engine and dump-bin diagnostics remain English; these versions have no
locale switch. Raw output is not rewritten by the documentation site.
