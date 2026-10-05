---
title: xresloader 核心功能
description: xresloader 核心概念、配置项和运行参数
---
# 转表引擎-xresloader

首次使用见 [快速上手](./quick-start)。本页按 xresloader 2.23.7 的实现介绍参数。整个流程图示如下：

<div class="diagram-panel">
![image](/img/development/xresconv_process.png)
</div>

无论GUI工具还是CLI工具还是数据和配置，最终都是汇聚到调用 [xresloader](https://github.com/xresloader/xresloader) 转表引擎命令进行汇总和执行转换。 本章节主要是针对 [xresloader](https://github.com/xresloader/xresloader) 转表引擎的说明。

## xresloader-可用参数列表

| 参数选项                                                         | 描述                                                                             | 说明                                                                                                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `-h --help`                                                      | 帮助信息                                                                         | 显示帮助和支持的参数列表                                                                                                       |
| `-t --output-type`                                               | 输出类型                                                                         | bin（默认值）; lua; msgpack; json; xml; javascript; js; ue-csv (>=2.0.0版本); ue-json (>=2.0.0版本)                            |
| `-p --proto`                                                     | 协议描述类型                                                                     | protobuf(默认值),capnproto(暂未实现),flatbuffer(暂未实现)                                                                      |
| `-f --proto-file`                                                | 协议描述文件                                                                     | 从 2.14.0-rc2 版本开始允许传入多个                                                                                             |
| `-o --output-dir`                                                | 输出目录                                                                         | 默认为当前目录                                                                                                                 |
| `-d --data-src-dir`                                              | 数据源根目录                                                                     | 默认为当前目录                                                                                                                 |
| `-s --src-file` | scheme 描述源 | 已实现 Excel、INI/CFG/CONF、JSON；Excel 建议 xls/xlsx/xlsm，不把帮助中的其他后缀当作实际格式支持证明 |
| `-m --src-meta`                                                  | 数据源描述                                                                       | 可多个                                                                                                                         |
| `-l --delimiter` | 内联元数据分隔正则 | 作用于 -m 规则拆分，区别于 Plain 字段分隔符 |
| `-v --version`                                                   | 打印版本号                                                                       |                                                                                                                                |
| `-n --rename`                                                    | 重命名输出文件名                                                                 | 正则表达式 （如： `/(?i)\.bin$/\.lua/` ）                                                                                      |
| `--require-mapping-all`                                          | 开启所有字段映射检查                                                             | 开启所有字段映射检查后，转出结构中所有的字段都必须配置映射关 系，数组字段至少要有一个元素 版本 >=2.10.0                        |
| `--enable-alias-mapping` | 开启字段别名映射 | 2.23.7 源码默认开启；需要确定行为时显式设置 |
| `--disable-alias-mapping` | 禁止字段别名映射 | 不改变 proto 字段名，按原字段建立映射 |
| `-c --const-print`                                               | 输出协议描述中的常量                                                             | 参数为字符串，表示输出的文件名                                                                                                 |
| `-i --option-print`                                              | 输出协议描述中的选项                                                             | 参数为字符串，表示输出的文件名                                                                                                 |
| `-r --descriptor-print`                                          | 输出所有描述数据                                                                 | 参数为字符串，表示输出的文件名 版本 >=2.11.0-rc2                                                                               |
| `-a --data-version`                                              | 设置数据版本号                                                                   | 参数为字符串，表示输出的数据的data_ver字段。 如果不设置将按执行时间自动生成一个。 会写出到转出数据的header中。                 |
| `--pretty`                                                       | 格式化输出                                                                       | 参数为整数，0代表关闭美化输出功能，大于0表示格式化时的缩进量                                                                   |
| `--enable-excel-formular`                                        | 开启Excel公式实时计算                                                            | (2.11-RC3版本前默认开启，之后默认关闭) 2003版本的excel（*.xls）文件使用公式会大幅减慢转表速度                                  |
| `--disable-excel-formular` | 关闭公式实时计算 | 默认行为；读取保存时的公式缓存，使用流式索引，并关闭日期格式探测 |
| `--disable-empty-list`                                           | (废弃) 禁止空列表项                                                              | 默认开启。自动删除Excel中的空数据，不会转出到输出文件中                                                                        |
| `--enable-empty-list`                                            | (废弃) 开启空列表项                                                              | 开启空列表项。未填充数据将使用默认值，并转出到输出文件中                                                                       |
| `--list-strip-all-empty`                                         | 移除数组空项                                                                     | (默认) 移除数组空项，自动删除Excel中的未填充数据，不会转出到 输出文件中 版本 >=2.11.0-rc3                                      |
| `--list-keep-empty`                                              | 保留全部数组空项                                                                 | 保留全部数组空项，未填充数据将使用默认的空值来填充，并转出到 输出文件中 版本 >=2.11.0-rc3                                      |
| `--list-strip-empty-tail`                                        | 移除数组尾部空项                                                                 | 移除数组尾部空项，自动删除尾部的未填充数据，其他的未填充数据 将使用默认的空值，并转出到输出文件中 版本 >=2.11.0-rc3            |
| `--enable-string-macro`                                          | 设置Macro表也对字符串类型生效                                                    | 可以通过全局开启此选项，特定表使用 --disable-string-macro 来实现默认开启字符串文本替换，特定表不替换。 版本 >=2.11.0-rc3       |
| `--disable-string-macro`                                         | 设置Macro表也对字符串类型不生效                                                  | 默认生效; 版本 >=2.11.0-rc3                                                                                                    |
| `--stdin`                                                        | 通过标准输入批量转表                                                             | 通过标准输入批量转表，参数和上面的一样，每行都执行一次转表。 字符串参数可以用单引号或双引号包裹，但是都不支持转义。            |
| `--lua-global`                                                   | lua输出写到全局表                                                                | 输出协议描述中的常量到Lua脚本时，同时导入符号到全局表_G中 （仅对常量导出有效）                                                 |
| `--lua-module`                                                   | lua输出使用module写出                                                            | 输出Lua脚本时，使用 module(模块名, package.seeall) 导出到全局                                                                  |
| `--xml-root`                                                     | xml输出的根节点tag                                                               | 输出格式为xml时的根节点的TagName                                                                                               |
| `--javascript-export`                                            | 导出javascript数据的模式                                                         | 可选项： nodejs: 使用兼容nodejs的exports; amd: 使用兼容amd的define; 其他: 写入全局（window或global）                           |
| `--javascript-global`                                            | 导出javascript全局空间                                                           | 导出数据到全局时，可以指定写入的名字空间                                                                                       |
| `--ignore-unknown-dependency`                                    | 忽略未知的协议的依赖                                                             | 忽略未知的输入协议的依赖项(>=2.9.0版本)                                                                                        |
| `--validator-rules`                                              | 指定自定义验证器配置文件路径                                                     | 指定自定义验证器配置文件路径(YAML，>=2.14.0-rc3版本)                                                                           |
| `--disable-data-validator`                                       | 允许忽略数据验证错误                                                             | (>=2.17.0版本)                                                                                                                 |
| `--data-validator-error-version` | 校验错误版本阈值 | 低于阈值的验证器报错，高于或等于时告警；0 表示总是报错 |
| `--data-source-lru-cache-rows`                                   | 数据源的LRU Cache行数                                                            | 仅缓存流式索引                                                                                                                 |
| `--tolerate-max-empty-rows`                                      | 连续空行检测的行数                                                               | 设置连续空行检测的行数(>=2.14.1版本) ，大量的连续空行通常是误操作                                                              |
| `--ignore-field-tags`                                            | 字段Tag                                                                          | 忽略指定tag的字段转出(>=2.19.0版本)                                                                                            |
| `--default-field-separator`                                      | 默认Plain模式分隔符                                                              | 设置Plain模式分隔符(>=2.21.0版本,默认值: `,;\|` ), 用于使用文本 来配置message,map,list,oneof类型的默认时，内部字段的分隔符检测 |
| `--data-source-mapping-file`                                     | 数据源映射输出文件                                                               | (>=2.19.1版本)                                                                                                                 |
| `--data-source-mapping-mode`                                     | 数据源映射输出模式                                                               | `none, md5, sha1, sha256` (>=2.19.1版本)                                                                                       |
| `--data-source-mapping-seed`                                     | 数据源映射输出Hash Seed                                                          | (>=2.19.1版本)                                                                                                                 |
| `--transpose-data-source` | 转置数据源行列 | KeyRow 表示字段所在列；DataSource 坐标仍按原表格行列填写，见 [映射](./data-mapping#范围与转置) |

## 默认行为与使用边界

2.23.7 的公式实时计算默认关闭，字段别名映射默认开启。帮助文本中的历史默认标注可能与初始化代码不同，项目需要固定行为时显式设置相应开关。列表裁剪默认采用 --list-strip-all-empty，旧 --enable-empty-list / --disable-empty-list 仍是已弃用别名。

普通 JSON 输出是 xresloader 自己的带 header/data 的格式，UE JSON 是 DataTable 结构；不要把它们当作 protobuf 官方 ProtoJSON，见 [输出格式](./output-format)。

实际参数帮助可用 `java -jar xresloader.jar --help`。JVM 参数放在 -jar 前，转换参数放在 JAR 后。路径和批量前端选项见 [XML](./xresconv) 与 [CLI](./xresconv-cli)。

## 批处理

`--stdin` 把每个非空输入行作为一项独立转换参数，在同一个 JVM 中执行。以下命令在 [快速上手](./quick-start) 的示例目录运行，两行任务分别输出 bin 和 JSON：

```bash
java -jar xresloader.jar --stdin <<'TASKS'
-p protobuf -f kind.pb -t bin -o output -a quick-start -s tables.xlsx -m scheme_kind
-p protobuf -f kind.pb -t json -o output -a quick-start -s tables.xlsx -m scheme_kind -n "/(?i)\.bin$/\.json/" --pretty 2
TASKS
```

PowerShell 使用 here-string：

```powershell
@'
-p protobuf -f kind.pb -t bin -o output -a quick-start -s tables.xlsx -m scheme_kind
-p protobuf -f kind.pb -t json -o output -a quick-start -s tables.xlsx -m scheme_kind -n "/(?i)\.bin$/\.json/" --pretty 2
'@ | java -jar xresloader.jar --stdin
```

stdin 参数允许单引号或双引号包裹，但不采用 shell 的反斜杠转义。与单次 argv 调用的引号处理不同，包含复杂引号的参数需检查可表示性。

同一 JVM 可以复用启动、类加载、缓存与 JIT 的开销，实际收益取决于表格和运行环境。退出码是批次累计结果，不能据此恢复每条任务的成功状态；应同时检查日志与产物。大量任务可使用 [CLI](./xresconv-cli) 或 [GUI](./xresconv-gui) 管理并发和取消。

### 完整的 16 项示例

保留原文的多格式批处理，并整理为 [core-batch.ps1](https://github.com/xresloader/xresloader-docs/blob/main/source/sample/core-batch.ps1)。示例涵盖 Lua / JSON 描述信息、JSON / XML / MsgPack、JavaScript 全局 / Node.js / AMD、宏与字段映射、嵌套数组、升级表以及 UE 常量 / DataTable / 加载代码。它使用上游完整 sample，不能直接换成入门包的简化 descriptor。

先把上游 sample 复制到自己的测试目录，并按下节入口生成 proto_v3/kind.pb，保留资源转换示例.xlsx 和 custom_validator.yaml。在本站根执行：

```powershell
./source/sample/core-batch.ps1 -JarPath ../xresloader/target/xresloader-2.23.7.jar -SampleDir <复制后的sample目录> -OutputDir output-batch
```

脚本完整保留 16 行任务，显式检查依赖与退出码、去掉历史 -client JVM 参数，并将输出统一放入工作目录下的 output-batch。输出目录可以替换；包含引号或换行的路径不适用于 stdin 格式。上游升级表在第 45 行含违反 custom_rule5 的大数值测试数据，因此默认只取前 11 条有效记录。加 `-IncludeValidationFailures` 可恢复原完整 scheme_upgrade，观察两项升级表任务严格校验失败（批次退出码 2）；其余任务继续执行。失败时可能已经创建空的输出文件，不能只凭文件存在判断成功。没有关闭校验或删除失败数据。

## 直接使用xresloader

直接使用转表引擎（ [xresloader](https://github.com/xresloader/xresloader) ）的示例可以参见 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 。里面有几乎所有的使用方法。 包括但不限于转出到代码、转出枚举量、使用proto2、使用proto3、转出加载代码、批量转出等等。

Windows下的执行入口是 [gen_sample_output.bat](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.bat) 或 [gen_sample_output.ps1](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.ps1) 。 Linux/macOS/BSD 的执行入口是 [gen_sample_output.sh](https://github.com/xresloader/xresloader/blob/main/sample/gen_sample_output.sh) 。

使用前需要先使用 [gen_protocol_v2.py](https://github.com/xresloader/xresloader/blob/main/sample/gen_protocol_v2.py) 生成proto v2的协议描述文件和使用 [gen_protocol_v3.py](https://github.com/xresloader/xresloader/blob/main/sample/gen_protocol_v3.py) 生成proto v3的协议描述文件。
