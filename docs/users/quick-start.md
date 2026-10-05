---
title: 快速上手
description: 用准备好的示例完成 Excel 转换，核对数据并加载 JSON、原生 Lua 或 protobuf
---

# 快速上手

先用现成的 Excel 和协议描述文件跑通一次转换，再换成自己的数据。本页使用 xresloader 2.23.7、xresconv-cli 2.0.2 或 xresconv-gui 3.0.0，详细参数分别见 [CLI](./xresconv-cli)、[GUI](./xresconv-gui) 和 [XML 配置](./xresconv)。

## 1. 准备工具和示例

1. 安装 Java 17 或以上版本，在终端执行 `java -version` 确认可用。
2. 从 [xresloader 最新发行页](https://github.com/xresloader/xresloader/releases/latest) 下载完整的 **xresloader-版本号.jar**，重命名为 `xresloader.jar`。也可用 [按系统下载入口](./download#按系统下载最新版本)。
3. 下载 [快速上手示例 ZIP](/examples/quick-start.zip)，解压后把 JAR 放进去。
4. 从 [下载与安装](./download) 选择 CLI 或 GUI；只需选一种。CLI 无需 Python，GUI 完整发行包自带 Node.js。

```text
quick-start/
├── convert.xml       批量转表清单
├── convert-lua.xml   可选的原生 Lua 转换清单
├── load-lua.lua      原生 Lua 加载示例
├── xresloader.jar    下载后放入的引擎
├── tables.xlsx      示例 Excel，包含转换规则 Sheet
├── kind.pb          已生成的协议描述文件
└── output/          运行后生成的 bin 和 JSON
```

示例取用 xresloader sample 的基础人物数据和本站升级数据，使用简化协议，保留数据来源与生成源。已经准备好 descriptor，第一次转换无需安装 protoc。

打开 `tables.xlsx` 可以先核对数据。`kind` Sheet 包含三个人物：

| Excel 行 | 角色 ID / id | 名称 / name |
| --- | --- | --- |
| 3 | 10001 | 欧若拉 |
| 4 | 10002 | 杰克 |
| 5 | 10003 | 库拉 |

`upgrade` Sheet 的第 1 行是说明，第 2 行是字段名，第 3 行开始是数据：

| Excel 行 | 角色 ID / Id | 等级 / Level | 货币类别 / CostType | 消耗值 / CostValue |
| --- | --- | --- | --- | --- |
| 3 | 10001 | 1 | 0 | 0 |
| 4 | 10001 | 2 | 10001 | 50 |
| 5 | 10001 | 3 | 10001 | 100 |

这里的货币类别沿用上游金币枚举值 **10001**。`scheme_kind` 和 `scheme_upgrade` 两个 Sheet 保存转换规则，不是需要导出的游戏数据。

## 2. 看一眼配置 {#quick-start-configure-sheme}

`convert.xml` 把人物表与升级表各导出为 bin 和 JSON。相对路径以配置中的工作目录为准；此处工作目录就是 XML 所在目录。

```xml title="convert.xml"
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <global>
    <work_dir>.</work_dir>
    <xresloader_path>xresloader.jar</xresloader_path>
    <proto>protobuf</proto>
    <proto_file>kind.pb</proto_file>
    <output_dir>output</output_dir>
    <output_type>bin</output_type>
    <output_type rename="/(?i)\.bin$/\.json/">json</output_type>
    <data_version>quick-start</data_version>
    <option>--pretty 2</option>
  </global>
  <list>
    <item file="tables.xlsx" scheme="scheme_kind" name="人物表" />
    <item file="tables.xlsx" scheme="scheme_upgrade" name="升级表" />
  </list>
</root>
```

## 3. 运行并检查输出

### 用 GUI

解压完整 GUI 发行包，启动 `xresconv-gui`，打开 `convert.xml`。勾选人物表和升级表，查看预览，再点击开始转换。Windows 的程序名为 `xresconv-gui.exe`。

![GUI 3.0 的示例配置、条目与真实转换日志](/img/users/gui-main-light.png)

### 用 CLI

在示例目录打开终端执行以下命令。Windows PowerShell 中，把程序名写为 `./xresconv-cli.exe`，或使用已加入 PATH 的 `xresconv-cli`。

```sh
xresconv-cli --test -p 1 convert.xml
xresconv-cli -p 1 convert.xml
```

第一行只预览，不生成数据；第二行执行转换。确认退出码为 0，再检查 `output/role_cfg.bin`、`output/role_cfg.json`、`output/role_upgrade_cfg.bin`、`output/role_upgrade_cfg.json`。JSON 可以直接打开核对记录，bin 供程序加载。

![CLI 2.0.2 的实际转换输出快照，工作目录路径已缩写](/img/users/cli-conversion.png)

## 4. 核对并加载数据

### 加载 JSON

普通 JSON 输出由 `[header, data, messageType]` 三部分组成。示例包内的 `load-json.cjs` 使用 Node.js 标准库加载升级表，并以角色 ID + 等级建立索引：

```sh
node load-json.cjs output/role_upgrade_cfg.json
```

```js
const fs = require('node:fs');
const [header, data, messageType] = JSON.parse(
  fs.readFileSync('output/role_upgrade_cfg.json', 'utf8')
);
const rows = data[messageType];
const byKey = new Map(rows.map(row => [`${row.Id}:${row.Level}`, row]));
console.log(header.count);       // 3
console.log(byKey.get('10001:2')); // { Id: 10001, Level: 2, CostType: 10001, CostValue: 50 }
```

Node.js 是此加载示例的依赖。使用其他语言时按同一 JSON 结构读取；JSON 中的字段大小写与协议一致。

### 加载原生 Lua

已有 Lua 运行环境时，可以直接加载转换出的 Lua table。示例包提供 `convert-lua.xml`，复用相同的两张表，仅把输出切换为 Lua。在示例目录执行，或用 GUI 打开该清单、勾选两项后转换：

```sh
xresconv-cli -p 1 convert-lua.xml
lua load-lua.lua output/role_upgrade_cfg.lua
```

第二行使用标准 Lua 5.4，无额外加载库。输出为 `version=quick-start, count=3` 和 `Id=10001, Level=2, CostType=10001, CostValue=50`。核心读取方法如下：

```lua
local config = dofile("output/role_upgrade_cfg.lua")
local header, messageType = config[1], config[2]
local rows = config[messageType]
local byId = {}
for _, row in ipairs(rows) do
    byId[row.Id] = byId[row.Id] or {}
    byId[row.Id][row.Level] = row
end
print(header.count)                -- 3
print(byId[10001][2].CostValue)     -- 50
```

Lua 的 `[1]` 是头信息、`[2]` 是协议名，记录放在 `config[messageType]` 中；字段大小写与协议一致。完整加载源随 ZIP 提供，路径、`require` 与重载方式见 [原生 Lua 加载](./data-loading#原生-lua-加载)。

### 查看与加载 bin

从 [最新下载](./download) 获取 **xresloader-dump-bin**，在示例目录执行：

```sh
xresloader-dump-bin --pretty -p kind.pb -b output/role_upgrade_cfg.bin
```

可核对 `data count: 3`，以及三个等级的 ID、货币类别和消耗值。dump-bin 按 descriptor 的 JSON 字段名展示；此例的 Id、Level 等保持原样，proto3 默认值 0 可能省略。若终端设置了 RUST_LOG 并过滤 info，按 [查看工具说明](./ecosystem-and-tools#没有输出时) 调整。

程序加载 bin 时，先解析 `xresloader_datablocks` 包装结构，再把每个 `data_block` 解析为 `role_upgrade_cfg`。**整个 bin 不能直接当成单条 role_upgrade_cfg 解析**。

- 推荐通过 [读表代码生成器](./xres-code-generator) 生成 C++、C#、Go、Lua 或 UE 项目的加载代码与索引。
- [协议生成与完整加载示例](./data-loading) 保留自定义协议、C++ 手动解析和旧 libresloader 模板的方法及编译命令。当前可编辑源代码也随示例 ZIP 提供。

## 换成自己的表

写自己的 `.proto`，用 protoc 生成包含依赖的 descriptor，再在 XML 中设置 `proto_file`。把 Excel 的字段名与 proto 对齐，通过内联 `DataSource`、`ProtoName`、`OutputFile` 和 `KeyRow` 指定映射，或沿用示例的 scheme Sheet。

- [数据映射](./data-mapping)：定义数据源、字段行与嵌套结构。
- [配置与输出矩阵](./xresconv)：多张表、多格式、目录与标签筛选。
- [输出格式与数据加载](./output-format)：理解 bin 包装结构，接入 C++、Lua、C# 等运行时。
- [读表代码生成](./xres-code-generator)：生成项目使用的加载代码；这是首次转换之后的步骤。

若执行失败，先核对 Java、JAR、工作目录和文件路径，再查看 [常见问题](./faq)。
