---
title: 协议生成与数据加载
description: 推荐使用 xres-code-generator 按索引加载，附 C++、Lua 节选和手动加载示例
---

# 协议生成与数据加载

[快速上手](./quick-start) 已提供 descriptor 和简短 JSON / 原生 Lua 加载方法。**正式项目最推荐使用 [xres-code-generator](./xres-code-generator) 生成加载代码与索引**，先看下面的推荐章节。原生 Lua、C++ 手动解析和 libresloader 示例也保留在本页，便于理解格式和维护既有项目。

## 使用 xres-code-generator 加载（最推荐）

**这是接入项目时最推荐的加载方式。** 在协议中声明数据路径和索引，由 [xres-code-generator](./xres-code-generator) 生成对应语言的管理器与查询接口。管理器负责加载数据、建立索引和管理版本分组，业务代码可以直接查询单条记录或一组记录。

### 声明一次索引，两种语言使用

以升级表为例，先导入 `xrescode_extensions_v3.proto`，在已有的 role_upgrade_cfg 消息内加入以下选项；消息字段沿用入门示例的 Id、Level、CostType、CostValue：

```protobuf
option (xrescode.loader) = {
  file_path: "role_upgrade_cfg.bin"
  indexes: {
    name: "id"
    fields: "Id"
    index_type: EN_INDEX_KL // 按角色 ID 返回等级列表。
    sort_by: "Level"
  }
  indexes: {
    name: "id_level"
    fields: "Id"
    fields: "Level"
    index_type: EN_INDEX_KV // 按角色 ID + 等级返回单条记录。
  }
};
```

生成包含依赖的 descriptor 时，还需纳入 `pb_header_v3.proto` 包装头，再按目标语言生成管理器。入门包的简化 kind.pb 没有这些加载选项，需从修改后的协议重新生成。详细步骤见 [生成器公共前置步骤](./xres-code-generator#公共前置步骤)，模板与命令见 [C++ 集成](./xres-code-generator/cpp) 和 [原生 Lua 集成](./xres-code-generator/lua)。

### C++：按联合键取一条，按 ID 取列表

生成 config_manager、config_easy_api 和协议 C++ 代码，配置好数据根目录或 `set_buffer_loader` 后，在应用中初始化并加载。以下节选放在业务函数内，已包含 config_manager.h、config_easy_api.h、kind.pb.h 和 iostream：

```cpp
auto manager = excel::config_manager::me();
if (manager->init() != 0 || manager->reload() < 0) return 1;

// 角色 10001、等级 2：直接取得对应配置。
auto row = excel::get_role_upgrade_cfg_by_id_level(10001, 2);
if (row) std::cout << row->costvalue() << '\n'; // 50

// 角色 10001 的所有等级，按协议中声明的 Level 排序。
auto levels = excel::get_role_upgrade_cfg_by_id(10001);
if (levels) {
    for (const auto& level : *levels) {
        std::cout << level->level() << ": " << level->costvalue() << '\n';
    }
}
```

单条查询返回指向协议对象的共享指针，列表查询返回记录集合；使用前判断是否找到数据。函数名由加载器和索引名生成，上例的 id_level 参数顺序对应声明中的 Id、Level。路径中的 .bin 要与实际转表输出一致。

### Lua：同样按索引查询原生 Lua 数据

原生 Lua 模板生成 DataTableCustomIndex53.lua，配套运行时为 DataTableService53.lua。把它们放在 generated/，再用示例包的 convert-lua.xml 将数据导出到 output/。这一版本读取同名的 role_upgrade_cfg.lua，使用标准 Lua 即可运行：

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

Lua 代码只需给出索引名和键值，索引的建立、列表排序由生成配置和运行时完成。上面的两种语言使用相同的索引声明，文件路径和字段大小写仍以实际协议为准。项目采用 protobuf 二进制的 Lua 运行库时，也可选择 [upb](./xres-code-generator/lua-upb) 或 [lua-protobuf](./xres-code-generator/lua-protobuf) 集成。

**完整支持的加载方式见 [xres-code-generator](./xres-code-generator)**

## 原生 Lua 加载

`-t lua` 默认生成返回 table 的 Lua 文件，使用标准 Lua 即可加载。以下按 Lua 5.4 编写，使用入门示例的 Excel 和 descriptor，加载时无需 protobuf 运行库。

### 转换为 Lua

在 [入门示例](./quick-start) 目录执行 `xresconv-cli -p 1 convert-lua.xml`，或用 GUI 打开该清单并选表转换。清单复用 convert.xml 的工作目录、JAR、协议及条目，仅替换输出格式：

```xml title="convert-lua.xml"
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <!-- 复用入门清单；本文件的 output_type 组替换 bin / JSON，仅输出 Lua。 -->
  <include>convert.xml</include>
  <global>
    <output_type rename="/(?i)\.bin$/\.lua/">lua</output_type>
  </global>
</root>
```

生成 output/role_cfg.lua 与 output/role_upgrade_cfg.lua。直接调用引擎时，升级表的等价命令为：

```sh
java -jar xresloader.jar -p protobuf -f kind.pb -t lua -o output -a quick-start -s tables.xlsx -m scheme_upgrade -n "/(?i)\.bin$/\.lua/" --pretty 2
```

此处不设置 `--lua-module`；该选项会改为旧式 module 输出，结构和加载方式不同。默认 Lua table 的结构为：

| 位置 | 内容 |
| --- | --- |
| config[1] | header，含 count、data_ver、xres_ver 等 |
| config[2] | 协议名字符串，此例为 role_upgrade_cfg |
| config[config[2]] | 记录数组，Lua 下标从 1 开始 |

### 按路径加载并建立索引

示例 ZIP 的 load-lua.lua 使用 `dofile` 读取指定路径，检查记录数，并按角色 ID + 等级建立两层索引：

```lua title="load-lua.lua"
local config = dofile(arg[1] or "output/role_upgrade_cfg.lua")
local header, messageType = config[1], config[2]
local rows = assert(config[messageType], "missing data for message type")
assert(header.count == #rows, "record count does not match header")

-- 升级表以角色 ID + 等级作为联合键。
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

第一行结果为 `version=quick-start, count=3`，第二行为 `Id=10001, Level=2, CostType=10001, CostValue=50`。人物表使用同样的包装结构；记录字段为小写 id、name，可以按 row.id 建单键索引。

`dofile` 的相对路径从当前工作目录解析，每次调用都会执行文件并得到新 table。若从其他目录启动程序，传入正确路径或由应用确定数据根目录。字段名保留协议大小写，例如升级表的 Id / Level 与人物表的 id 不同。

### 按模块加载与重载

使用 `require` 时，先设置搜索路径，再按模块名加载：

```lua
package.path = "./output/?.lua;" .. package.path
local moduleName = "role_upgrade_cfg"
local config = require(moduleName)
local rows = config[config[2]]
print(config[1].count, rows[2].CostValue) -- 3，50

-- 数据更新后清除模块缓存，再加载并重建索引。
package.loaded[moduleName] = nil
local reloaded = require(moduleName)
local newRows = reloaded[reloaded[2]]
print(reloaded[1].count, newRows[2].CostValue)
```

模块名不带 .lua 后缀；这里的 package.path 仍相对于当前工作目录。`require` 返回并缓存模块结果，重复调用通常获得同一个 table。清除缓存后，之前保存的 table 和索引仍引用旧数据，应用需用新数据替换它们。函数语义见 [Lua dofile](https://www.lua.org/manual/5.4/manual.html#pdf-dofile) 和 [require](https://www.lua.org/manual/5.4/manual.html#pdf-require)。

## 用自己的协议

以下保留金币 / 钻石别名、验证器和扩展字段的例子。它使用 `protocols.zip` 中的 xresloader 扩展；示例包的简化 kind.proto 不需要这些依赖。

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

Excel 字段行写 Id、Level、CostType、CostValue、ScoreAdd；货币类别可填 10001 或别名“金币”，不能沿用旧文档误写的 1001。proto2 示例见 [上游 sample/proto_v2](https://github.com/xresloader/xresloader/tree/main/sample/proto_v2)。

### 原完整 Excel 示例

原 [role_tables.xlsx](https://github.com/xresloader/xresloader-docs/blob/main/source/sample/quick_start/sample-conf/role_tables.xlsx) 和 XML 保留 11 个等级。upgrade_10001 的第 1 行是说明、第 2 行是字段名；CostValue 列通过 Excel 公式计算，并保存结果缓存。以下按原表实际内容列出，枚举名称与中文别名均可用于 CostType：

| Id | Level | CostType（Excel 原值） | CostValue（保存的结果） |
| --- | --- | --- | --- |
| 10001 | 1 | 空 | 空 |
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

原文把货币统一写成 1001 的展示与表格和协议都不符。当前读取保存的公式缓存；修改公式后先在 Excel 中计算并保存，实时计算选项见 [核心参数](./xresloader-core)。原配置的内联映射、分组、分类和两种输出仍保留在 sample-conf/sample.xml，JAR 路径与 JVM 选项已经修正。

假设协议放在 `sample-conf/`，已将最新 [protocols.zip](./download) 解压到 `protocols/`，官方 protoc 完整包解压到 `protoc/`（包含 bin 和 include），先创建 `sample-code/`。生成 descriptor 时带上依赖，并显式指定 well-known types 的 include 目录：

```sh
protoc -I sample-conf -I protocols/extensions/v3 -I protoc/include --include_imports --descriptor_set_out=sample-conf/kind.pb sample-conf/kind.proto
protoc -I sample-conf -I protocols/extensions/v3 -I protoc/include --cpp_out=sample-code sample-conf/kind.proto protocols/extensions/v3/xresloader.proto
```

如协议导入 `xresloader_ue.proto`，同样将它加入代码生成输入。编译生成代码需要匹配的 protobuf C++ 运行库；不要复制历史生成的 descriptor.pb.cc 覆盖安装库自带文件。

## C++ 手动解析

在入门示例目录创建 `sample-code/`，下载最新协议包，并用与项目 protobuf 运行库匹配的 protoc 生成代码：

```sh
protoc -I . --cpp_out=sample-code kind.proto
protoc -I protocols --cpp_out=sample-code protocols/pb_header_v3.proto
```

将包内 `load_custom.cpp` 复制到 sample-code。数据包装结构来自 [pb_header_v3.proto](https://github.com/xresloader/xresloader-protocol/blob/main/core/pb_header_v3.proto)，每个 data_block 对应一条配置记录：

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

在 sample-code 中编译。以下适用于已经配置 pkg-config 的 protobuf C++ 环境，标准版本与运行库要求保持一致；现代 protobuf 使用 C++17 或以上。C++ 生成代码和运行库须精确匹配，见 [protobuf 版本支持](https://protobuf.dev/support/version-support/)：

```sh
g++ -std=c++17 -O0 -g load_custom.cpp kind.pb.cc pb_header_v3.pb.cc $(pkg-config --cflags --libs protobuf) -o load_custom
./load_custom ../output/role_upgrade_cfg.bin
```

Windows/MSVC 将两个生成的 .pb.cc、加载源文件和匹配的 protobuf 库加入应用工程。入门数据包含三条，第二条的 CostType 为 10001、CostValue 为 50；proto3 默认 0 不一定出现在 DebugString 中。

## libresloader 旧式模板

保留旧接口作为现有项目的迁移参考；新项目优先用代码生成器。下载当前 [libresloader.h](https://github.com/xresloader/xresloader/blob/main/loader-binding/cxx/libresloader.h)，HTTPS 证书校验保持开启：

```sh
curl -fL https://raw.githubusercontent.com/xresloader/xresloader/main/loader-binding/cxx/libresloader.h -o sample-code/libresloader.h
```

包内 `load_with_libresloader.cpp` 同时展示 key/value 与 key/list。以下为核心读取步骤；完整程序包含参数和失败处理：

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
auto first = kl.get(10001, 0); // index 从 0 开始。
if (!first) return 1;
```

在 sample-code 中编译包内完整程序：

```sh
g++ -std=c++17 -O0 -g load_with_libresloader.cpp kind.pb.cc pb_header_v3.pb.cc $(pkg-config --cflags --libs protobuf) -o load_with_libresloader
./load_with_libresloader ../output/role_upgrade_cfg.bin
```

联合键示例查询等级 2；分组示例返回 3 条。旧示例先查不存在的等级 4、未判断 load_file 结果，且直接解引用 get_list，已在新源中修正。历史 [quick_start 配置和脚本](https://github.com/xresloader/xresloader-docs/tree/main/source/sample/quick_start) 保留供维护旧工程时对照，生成代码须重新生成。

## proto2 与 proto3

repeated 数值类型的 packed 默认值不同，但合规解析器应接受 packed 和非 packed 两种编码。不要仅因运行库版本低于 3 就认定数据必须使用另一个头结构；以采用的头协议和实际生成代码为准。详见 [二进制格式与 packed](./output-format)。
