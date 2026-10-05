---
title: 生态与工具链
description: 生态项目与常用辅助工具
---
# 生态和周边工具

## 二进制查看：xresloader-dump-bin

[xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin) 用于查看 **已经转出的二进制文件**。它读取 protobuf descriptor，展示 bin 的头信息和每条记录，帮助核对转表结果；还可提取字符串和带标签的数据。它使用 Rust，发行包解压后即可运行，无需 Java。下载 [适合目标系统的最新 Release](./download#按系统下载最新版本)。本文核验版本为 2.6.0。

### 查看入门数据

在 [快速上手](./quick-start) 示例目录执行：

```sh
xresloader-dump-bin --pretty -p kind.pb -b output/role_upgrade_cfg.bin
```

输出中可核对 xresloader version、data version、data count、hash code、数据来源 Sheet 和正文。此例 count 为 3，第二条记录为：

```json
{ "CostType": 10001, "CostValue": 50, "Id": 10001, "Level": 2 }
```

默认正文按 protobuf JSON 字段名展示，proto3 默认值可能省略。`--plain --pretty` 切换为 protobuf 文本格式。终端展示含头信息、分隔文字和末尾逗号，**不能直接作为 JSON 文件解析**。

![dump-bin 2.6.0 实际输出的排版快照，展示入门升级表的头信息与三条记录](/img/users/dump-bin-output.png)

原嵌套数组示例仍可使用，但应配套上游完整 sample 的 descriptor：

```sh
xresloader-dump-bin --pretty -p proto_v3/kind.pb -b proto_v3/arr_in_arr_cfg.bin
```

`-p / --pb-file` 和 `-b / --bin-file` 可重复，支持多个 descriptor 和数据文件。bin 必须包含正确的 data_message_type（xresloader 2.6+），descriptor 必须覆盖记录类型及其依赖。`--head-only` 只展示头信息。

### 提取字符串和带标签的数据

```sh
xresloader-dump-bin --silence -p kind.pb -b output/role_cfg.bin --output-string-table-json strings.json --string-table-pretty
xresloader-dump-bin --silence -p kind.pb -b output/role_cfg.bin --output-string-table-text strings.txt --string-table-ordered
```

JSON 输出包含 head、body 和来源信息；上例 body 包含欧若拉、杰克、库拉。文本输出适合交给本地化工具。可按值正则、字段路径或 message 路径筛选，完整选项运行 `xresloader-dump-bin --help` 查看。

协议字段使用 field_tag 或 oneof_tag 后，可选择导出带标签的数据：

```sh
xresloader-dump-bin --silence -p project.pb -b config.bin --tagged-field-tags localization --output-tagged-data-json tagged.json --tagged-data-pretty
```

这里的 project.pb、config.bin 和 localization 要替换为项目的实际协议、数据及标签。`--output-tagged-data-text` 提供文本输出，`--tagged-data-ordered` 排序；值与路径过滤规则见 [上游 README](https://github.com/xresloader/xresloader-dump-bin/blob/main/README.md)。

### 没有输出时

显示内容通过 info 日志输出，已有 RUST_LOG 环境变量可能将其过滤。PowerShell 可在当前终端设置：

```powershell
$env:RUST_LOG = 'info'
$env:RUST_LOG_STYLE = 'never'
xresloader-dump-bin --pretty -p kind.pb -b output/role_upgrade_cfg.bin
```

POSIX shell 使用 `RUST_LOG=info RUST_LOG_STYLE=never xresloader-dump-bin --pretty -p kind.pb -b output/role_upgrade_cfg.bin`。需要保存可读输出时，重定向终端输出；需要机器可读的提取结果时，使用相应 output 选项。内容差异可交给文本比较工具查看，dump-bin 本身负责展示与提取。

## 配套项目

- [xresconv-cli](./xresconv-cli) 和 [xresconv-gui](./xresconv-gui)：CLI 与 GUI 版本的批量转表工具，共用 XML。
- [xresconv-conf](https://github.com/xresloader/xresconv-conf)：完整清单、include、事件和按钮示例，本站修订版见 [XML 配置](./xresconv)。
- [xres-code-generator](./xres-code-generator)：生成多语言加载代码与索引。
- [xresloader-protocol](https://github.com/xresloader/xresloader-protocol)：数据包装头及协议扩展，加载方法见 [完整示例](./data-loading)。
