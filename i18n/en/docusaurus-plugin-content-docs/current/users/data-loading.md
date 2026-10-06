---
title: Schema generation and data loading
description: Recommended indexed loading with xres-code-generator, C++ and Lua excerpts, and manual loaders
---

# Schema generation and data loading {#协议生成与数据加载}

[Quick start](./quick-start) includes a descriptor and short JSON / native Lua loaders. **For production projects, generated loaders and indexes from [xres-code-generator](./xres-code-generator) are recommended.** Start with the next section. Native Lua, manual C++ parsing and libresloader examples remain here to explain formats and support existing projects.

## Load with xres-code-generator (recommended) {#使用-xres-code-generator-加载最推荐}

**This is the recommended project integration.** Declare data paths and indexes in the schema, then generate managers and query APIs for your language. The manager loads data, builds indexes and manages version groups; application code queries one record or a record list directly.

### Declare indexes once for both languages {#声明一次索引两种语言使用}

For upgrades, import `xrescode_extensions_v3.proto` and add these options inside role_upgrade_cfg. Keep the starter fields Id, Level, CostType and CostValue:

```protobuf
option (xrescode.loader) = {
  file_path: "role_upgrade_cfg.bin"
  indexes: {
    name: "id"
    fields: "Id"
    index_type: EN_INDEX_KL // Return a level list by character ID.
    sort_by: "Level"
  }
  indexes: {
    name: "id_level"
    fields: "Id"
    fields: "Level"
    index_type: EN_INDEX_KV // Return one record by character ID + level.
  }
};
```

Include the `pb_header_v3.proto` wrapper and dependencies in the descriptor, then generate the manager for your language. The starter kind.pb lacks these options; regenerate it from the modified schema. See [Shared prerequisites](./xres-code-generator#公共前置步骤), [C++ integration](./xres-code-generator/cpp) and [Native Lua integration](./xres-code-generator/lua).

### C++: one record by composite key, a list by ID {#c按联合键取一条按-id-取列表}

Generate config_manager, config_easy_api and protobuf C++ bindings. Configure the data root or `set_buffer_loader`, then initialize and load. Put this excerpt inside a function with config_manager.h, config_easy_api.h, kind.pb.h and iostream included:

```cpp
auto manager = excel::config_manager::me();
if (manager->init() != 0 || manager->reload() < 0) return 1;

// Query character 10001 at level 2.
auto row = excel::get_role_upgrade_cfg_by_id_level(10001, 2);
if (row) std::cout << row->costvalue() << '\n'; // 50

// All levels of character 10001, sorted by the declared Level field.
auto levels = excel::get_role_upgrade_cfg_by_id(10001);
if (levels) {
    for (const auto& level : *levels) {
        std::cout << level->level() << ": " << level->costvalue() << '\n';
    }
}
```

Single queries return shared pointers to protocol objects; list queries return collections. Check for missing data before use. Function names follow loader and index names. The id_level argument order follows Id, Level in the declaration. Keep .bin paths consistent with actual exports.

### Lua: indexed queries on native Lua data {#lua同样按索引查询原生-lua-数据}

The native Lua template generates DataTableCustomIndex53.lua, paired with DataTableService53.lua. Put both in generated/, then export the sample with convert-lua.xml to output/. This runtime loads role_upgrade_cfg.lua using standard Lua:

```lua
package.path = "./generated/?.lua;./output/?.lua;" .. package.path
local service = require("DataTableService53")
service:ReloadTables()
local upgrades = assert(service:Get("role_upgrade_cfg"))

local row = assert(upgrades:GetByIndex("id_level", 10001, 2))
print(row.CostValue) -- 50

for _, level in ipairs(upgrades:GetByIndex("id", 10001)) do
    print(level.Level, level.CostValue) -- 1/0、2/50、3/100
end
```

Lua code supplies index names and keys; generated settings and the runtime handle index construction and sorting. Both languages use the same index declaration. Paths and field casing still follow the actual schema. For binary protobuf Lua runtimes, choose [upb](./xres-code-generator/lua-upb) or [lua-protobuf](./xres-code-generator/lua-protobuf).

**See [xres-code-generator](./xres-code-generator) for all loading integrations.**

## Native Lua loading {#原生-lua-加载}

`-t lua` generates a Lua file returning a table by default. Standard Lua can load it. These examples use Lua 5.4 with the starter workbook and descriptor; no protobuf runtime is needed for loading.

### Convert to Lua {#转换为-lua}

Run `xresconv-cli -p 1 convert-lua.xml` in the [starter](./quick-start) directory, or open it in the GUI and convert selected tables. The manifest reuses convert.xml settings and items and replaces only the output format:

```xml title="convert-lua.xml"
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <!-- Reuse the starter manifest; this output_type group replaces bin / JSON with Lua. -->
  <include>convert.xml</include>
  <global>
    <output_type rename="/(?i)\.bin$/\.lua/">lua</output_type>
  </global>
</root>
```

Outputs are output/role_cfg.lua and output/role_upgrade_cfg.lua. The equivalent direct-engine command for upgrades is:

```sh
java -jar xresloader.jar -p protobuf -f kind.pb -t lua -o output -a quick-start -s tables.xlsx -m scheme_upgrade -n "/(?i)\.bin$/\.lua/" --pretty 2
```

Do not set `--lua-module` here; that selects legacy module output with a different structure and loading method. The default table structure is:

| Position | Content |
| --- | --- |
| config[1] | Header with count, data_ver, xres_ver and other fields |
| config[2] | Message-name string, role_upgrade_cfg in this example |
| config[config[2]] | Record array, with Lua indexes starting at 1 |

### Load by path and build an index {#按路径加载并建立索引}

The ZIP's load-lua.lua uses `dofile` for a supplied path, validates the count, and builds a two-level character ID + level index:

```lua title="load-lua.lua"
local config = dofile(arg[1] or "output/role_upgrade_cfg.lua")
local header, messageType = config[1], config[2]
local rows = assert(config[messageType], "missing data for message type")
assert(header.count == #rows, "record count does not match header")

-- Index upgrades by character ID + level.
local byId = {}
for _, row in ipairs(rows) do
    local levels = byId[row.Id] or {}
    byId[row.Id] = levels
    assert(levels[row.Level] == nil, "duplicate ID + level")
    levels[row.Level] = row
end
local row = assert(byId[10001] and byId[10001][2], "missing ID=10001, Level=2")
print(string.format("version=%s, count=%d", header.data_ver, #rows))
print(string.format("Id=%d, Level=%d, CostType=%d, CostValue=%d",
    row.Id, row.Level, row.CostType, row.CostValue))
```

```sh
lua load-lua.lua output/role_upgrade_cfg.lua
```

It prints `version=quick-start, count=3`, then `Id=10001, Level=2, CostType=10001, CostValue=50`. Characters use the same wrapper with lowercase id and name fields; index them by row.id.

`dofile` resolves relative paths from the current working directory and executes the file on every call, returning a new table. If starting elsewhere, pass the correct path or determine the data root in your app. Preserve field casing: upgrade Id / Level differs from character id.

### Load modules and reload {#按模块加载与重载}

Set the search path before using `require` with a module name:

```lua
package.path = "./output/?.lua;" .. package.path
local moduleName = "role_upgrade_cfg"
local config = require(moduleName)
local rows = config[config[2]]
print(config[1].count, rows[2].CostValue) -- 3，50

-- Clear the module cache after updates, then reload and rebuild indexes.
package.loaded[moduleName] = nil
local reloaded = require(moduleName)
local newRows = reloaded[reloaded[2]]
print(reloaded[1].count, newRows[2].CostValue)
```

Omit .lua from the module name. package.path is still relative to the current directory. `require` caches its result; repeated calls normally return the same table. Clearing the cache leaves existing tables and indexes referring to old data, so replace them with the newly loaded values. See [Lua dofile](https://www.lua.org/manual/5.4/manual.html#pdf-dofile) and [require](https://www.lua.org/manual/5.4/manual.html#pdf-require).

## Use your own schema {#用自己的协议}

The following historical example retains the original Chinese gold / diamond aliases, validators and extension fields so it remains compatible with its workbook. It uses xresloader extensions from `protocols.zip`; the simplified starter schema does not need them. Define English aliases for new English-language workbooks, and keep their schema declarations consistent.

```protobuf
syntax = "proto3";
import "xresloader.proto";

enum cost_type {
  EN_CT_UNKNOWN = 0;
  EN_CT_MONEY = 10001 [(org.xresloader.enum_alias) = "金币"];
  EN_CT_DIAMOND = 10101 [(org.xresloader.enum_alias) = "钻石"];
}
message role_upgrade_cfg {
  uint32 Id = 1;
  uint32 Level = 2;
  uint32 CostType = 3 [
    (org.xresloader.validator) = "cost_type",
    (org.xresloader.field_description) = "Refer to cost_type"
  ];
  int32 CostValue = 4;
  int32 ScoreAdd = 5;
}
```

Use Id, Level, CostType, CostValue and ScoreAdd in the Excel field row. Currency accepts 10001 or the declared gold alias; the old documentation's 1001 was incorrect. See the [upstream proto2 sample](https://github.com/xresloader/xresloader/tree/main/sample/proto_v2).

### Original complete Excel example {#原完整-excel-示例}

The original [role_tables.xlsx](https://github.com/xresloader/xresloader-docs/blob/main/source/sample/quick_start/sample-conf/role_tables.xlsx) and XML retain 11 levels. In upgrade_10001, row 1 describes columns and row 2 names fields. CostValue formulas have saved result caches. The table below preserves original input strings, including Chinese aliases, rather than translating data that the historical schema must match:

| Id | Level | CostType (original Excel value) | CostValue (saved result) |
| --- | --- | --- | --- |
| 10001 | 1 | Empty | Empty |
| 10001 | 2 | 10001 | 50 |
| 10001 | 3 | 10001 | 100 |
| 10001 | 4 | 10001 | 150 |
| 10001 | 5 | 10001 | 200 |
| 10001 | 6 | EN_CT_MONEY | 250 |
| 10001 | 7 | 金币 | 300 |
| 10001 | 8 | 金币 | 350 |
| 10001 | 9 | 10101 | 400 |
| 10001 | 10 | EN_CT_DIAMOND | 450 |
| 10001 | 11 | 钻石 | 500 |

The old display used 1001 for all currencies, contradicting the workbook and schema. Current conversion reads saved formula caches; calculate and save in Excel after edits. See [Core options](./xresloader-core) for evaluation. Inline mapping, groups, categories and both formats remain in sample-conf/sample.xml, with corrected JAR paths and JVM options.

Assume schemas are in `sample-conf/`, the latest [protocols.zip](./download) is extracted to `protocols/`, and the official protoc package is extracted to `protoc/` with bin and include. Create `sample-code/`. Generate the descriptor with imports and an explicit well-known-types include path:

```sh
protoc -I sample-conf -I protocols/extensions/v3 -I protoc/include --include_imports --descriptor_set_out=sample-conf/kind.pb sample-conf/kind.proto
protoc -I sample-conf -I protocols/extensions/v3 -I protoc/include --cpp_out=sample-code sample-conf/kind.proto protocols/extensions/v3/xresloader.proto
```

If importing `xresloader_ue.proto`, include it in binding generation too. Compilation requires a matching protobuf C++ runtime. Do not overwrite runtime-provided files with historical descriptor.pb.cc.

## Manual C++ parsing {#c-手动解析}

Create `sample-code/` in the starter directory, obtain the latest protocol bundle and use protoc matching the project runtime:

```sh
protoc -I . --cpp_out=sample-code kind.proto
protoc -I protocols --cpp_out=sample-code protocols/pb_header_v3.proto
```

Copy `load_custom.cpp` from the ZIP to sample-code. The wrapper is [pb_header_v3.proto](https://github.com/xresloader/xresloader-protocol/blob/main/core/pb_header_v3.proto); each data_block is one record:

```cpp title="load_custom.cpp"
#include <fstream>
#include <iostream>
#include "pb_header_v3.pb.h"
#include "kind.pb.h"

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "usage: " << argv[0] << " <role_upgrade_cfg.bin>\n";
        return 1;
    }
    std::ifstream input(argv[1], std::ios::binary);
    org::xresloader::pb::xresloader_datablocks wrapper;
    if (!input || !wrapper.ParseFromIstream(&input)) return 1;
    std::cout << wrapper.header().DebugString();
    for (int i = 0; i < wrapper.data_block_size(); ++i) {
        role_upgrade_cfg row;
        if (!row.ParseFromString(wrapper.data_block(i))) return 1;
        std::cout << row.ShortDebugString() << '\n';
    }
    return 0;
}
```

Compile in sample-code. This command assumes pkg-config is configured for protobuf C++. Use the runtime's required language standard; modern protobuf needs C++17 or later. Generated code and runtime versions must match exactly; see [protobuf version support](https://protobuf.dev/support/version-support/):

```sh
g++ -std=c++17 -O0 -g load_custom.cpp kind.pb.cc pb_header_v3.pb.cc $(pkg-config --cflags --libs protobuf) -o load_custom
./load_custom ../output/role_upgrade_cfg.bin
```

For Windows/MSVC, add both generated .pb.cc files, the loader and matching protobuf libraries to your project. The starter has three records; the second has CostType 10001 and CostValue 50. proto3 zero defaults may not appear in DebugString.

## Legacy libresloader templates {#libresloader-旧式模板}

These interfaces remain for existing-project migration. Prefer the generator for new projects. Download current [libresloader.h](https://github.com/xresloader/xresloader/blob/main/loader-binding/cxx/libresloader.h) with HTTPS certificate checks enabled:

```sh
curl -fL https://raw.githubusercontent.com/xresloader/xresloader/main/loader-binding/cxx/libresloader.h -o sample-code/libresloader.h
```

The ZIP's `load_with_libresloader.cpp` demonstrates key/value and key/list. These are its core queries; the full program handles arguments and failures:

```cpp
using Kv = xresloader::conf_manager_kv<role_upgrade_cfg, uint32_t, uint32_t>;
Kv kv;
kv.set_key_handle([](Kv::value_type row) {
    return Kv::key_type(row->id(), row->level());
});
if (!kv.load_file(file_path)) return 1;
auto level2 = kv.get(10001, 2);
if (!level2) return 1;
std::cout << level2->DebugString();

using Kl = xresloader::conf_manager_kl<role_upgrade_cfg, uint32_t>;
Kl kl;
kl.set_key_handle([](Kl::value_type row) { return Kl::key_type(row->id()); });
if (!kl.load_file(file_path)) return 1;
auto list = kl.get_list(10001);
if (!list) return 1;
std::cout << "count=" << list->size() << '\n';
auto first = kl.get(10001, 0); // Zero-based index.
if (!first) return 1;
```

Compile the complete program in sample-code:

```sh
g++ -std=c++17 -O0 -g load_with_libresloader.cpp kind.pb.cc pb_header_v3.pb.cc $(pkg-config --cflags --libs protobuf) -o load_with_libresloader
./load_with_libresloader ../output/role_upgrade_cfg.bin
```

The composite-key query gets level 2; the grouped query returns three records. The revised source fixes the old nonexistent level-4 query, unchecked load_file result and unchecked get_list dereference. Historical [quick_start configuration and scripts](https://github.com/xresloader/xresloader-docs/tree/main/source/sample/quick_start) remain for reference. Regenerate bindings.

## proto2 and proto3 {#proto2-与-proto3}

Packed defaults differ for repeated numeric fields, but compliant parsers accept packed and unpacked encodings. A runtime older than version 3 does not by itself require a different header. Use the actual wrapper schema and generated bindings. See [Binary formats and packed encoding](./output-format).
