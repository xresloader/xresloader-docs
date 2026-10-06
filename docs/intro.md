---
id: intro
title: 工具链概览
description: 当前 xresloader、CLI、GUI 组件与文档阅读入口
---

xresloader 将 Excel 策划数据转换为结构化配置，配合批量工具、校验和读表代码生成接入游戏项目。

## 能力与优势

- **跨平台批量转表**：Java 17+ 引擎、Rust CLI 批量转表工具与 Tauri GUI 批量转表工具协作，支持 Windows、macOS、Linux；include 让多个清单复用配置。
- **多格式导出**：同一份 Excel 可输出 protobuf、MsgPack、Lua、JavaScript、JSON、XML 和 UE DataTable JSON / CSV，通过输出矩阵区分客户端与服务端。
- **完整的协议结构**：支持 proto2 / proto3、嵌套 message、repeated 与嵌套数组、oneof、map 和单元格 Plain 复杂结构。
- **枚举与描述信息**：可将协议枚举、常量和 descriptor 导成 Lua / JavaScript 代码或 JSON / XML 数据，结合自定义输出插件扩展反射信息。
- **Unreal Engine 生态**：导出 DataTable JSON / CSV，配套生成加载代码，适配 UE 内容工作流。
- **别名与校验体系**：字段和枚举别名、宏及跨表引用提升策划可读性；范围、逻辑组合和自定义验证器在导出前检查数据。
- **输出插件与合表**：协议扩展控制输出，多张 Excel 可合并为一个目标文件，支持字段名正则映射、范围和转置。
- **公式与输出控制**：读取 Excel 公式缓存，按需开启实时计算；支持空数组裁剪或保留、数据版本号和不同输出的目录 / 重命名规则。
- **多语言加载方式**：支持 C++、C#、Go、upb、pbc、lua-protobuf 等接入方式。Lua 支持 global / require / module，JavaScript 支持 global / Node.js / AMD。
- **二进制可查看**：xresloader-dump-bin 按 descriptor 展示已导出的 bin，核对数据头与正文，还可提取字符串和带标签的字段。

首页保留这些能力介绍和 [完整组件、仓库及最新下载](/)。

## 组件清单

| 组件与仓库 | 用途 | 下载 |
| --- | --- | --- |
| [xresloader](https://github.com/xresloader/xresloader) | Excel 转表引擎 | [最新 Release](https://github.com/xresloader/xresloader/releases/latest) |
| [xresconv-cli](https://github.com/xresloader/xresconv-cli) | CLI 批量转表工具 | [最新 Release](https://github.com/xresloader/xresconv-cli/releases/latest) |
| [xresconv-gui](https://github.com/xresloader/xresconv-gui) | GUI 批量转表工具 | [最新 Release](https://github.com/xresloader/xresconv-gui/releases/latest) |
| [xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin) | 查看导出的二进制数据 | [最新 Release](https://github.com/xresloader/xresloader-dump-bin/releases/latest) |
| [xres-code-generator](https://github.com/xresloader/xres-code-generator) | 读表代码生成器 | [最新源码](https://github.com/xresloader/xres-code-generator/archive/refs/heads/main.zip) |
| [xresconv-conf](https://github.com/xresloader/xresconv-conf) | XML 配置与 GUI 扩展示例 | [最新源码](https://github.com/xresloader/xresconv-conf/archive/refs/heads/main.zip) |
| [xresloader-protocol](https://github.com/xresloader/xresloader-protocol) | 数据头与协议扩展 | [最新源码](https://github.com/xresloader/xresloader-protocol/archive/refs/heads/main.zip) |

尚无正式版的组件可下载当前源码；最新版本与平台包选择见 [下载与安装](./users/download)。[文档仓库](https://github.com/xresloader/xresloader-docs) 保留配置、脚本和示例源。

## 选择入口

| 目标 | 从这里开始 |
| --- | --- |
| 快速上手 | [快速上手](./users/quick-start)：下载准备好的示例，检查四个输出 |
| 安装当前工具 | [下载与安装](./users/download)：Java、平台包和 WebView |
| 接入自动化 | [CLI 使用与迁移](./users/xresconv-cli)：Rust 原生程序、参数和退出状态 |
| 交互式选表 | [GUI 使用与迁移](./users/xresconv-gui)：Tauri 工作台、日志和显示设置 |
| 维护项目清单 | [XML 与输出矩阵](./users/xresconv)：路径、include、格式与筛选 |
| 扩展桌面工具 | [脚本与选择器](./users/xresconv-scripts)：事件、树镜像与按钮 |
| 修改工具实现 | [构建与验证](./development/build)、[架构与接口](./development/design-xresconv) |

## 当前组件

2026-10-05 核验的正式版为 xresloader 2.23.7、xresconv-cli 2.0.2、xresconv-gui 3.0.0、xresloader-dump-bin 2.6.0。各组件独立发布，运行依赖见 [安装指南](./users/download)。

- **引擎**：Java 17+，支持 proto2/proto3、嵌套 message、repeated、oneof、map、单元格 Plain 结构。
- **输出**：protobuf bin、MsgPack、Lua、JavaScript、JSON、XML 和 UE DataTable JSON/CSV。数据加载见 [输出格式](./users/output-format)。
- **批量工具**：Rust CLI 接入流水线；Tauri GUI 管理选择、输出矩阵和项目扩展。两者复用 XML，部分 include 与 GUI 事件语义需分别确认。
- **校验**：字段与枚举别名、范围、跨表引用和逻辑组合，见 [验证器](./users/validator)。
- **映射**：多表合并、数据源范围、转置、数组和宏，见 [数据映射](./users/data-mapping)、[数据类型](./users/data-types) 与 [高级用法](./users/advance-usage)。
- **运行时接入**：[读表代码生成](./users/xres-code-generator) 与 [周边工具](./users/ecosystem-and-tools)。

## 升级注意事项 {#升级时先确认}

CLI 2.x 已移除主程序对 Python 的依赖，旧 Python 文件负责转发。GUI 3.0 已替换 Electron，项目脚本不再获得 DOM、jQuery 或 Electron 接口。安装与迁移说明分别放在组件文档中。

引擎默认读取 Excel 保存的公式缓存，显式 --enable-excel-formular 才启用实时计算；流式模式不进行日期格式探测。当前 Java 源码不能只降低编译 target 就兼容 JDK 8。

## 开发与项目

- [环境与依赖](./development/dependency)、[构建与验证](./development/build)、[包源与代理](./development/pkg-source)。
- [xresloader 设计](./development/design-xresloader)、[xresconv 架构与接口](./development/design-xresconv)。
- [许可证](./about/license)、[关于项目](/docs/about/)、[常见问题](./users/faq)。

可下载入门样例的源在 source/sample/current；其余历史样例保留原始上下文，重新生成代码时按自己的 protoc 和运行库版本处理。
