---
id: intro
title: xresloader 简介
description: xresloader 工具链特性概览与文档索引
---

xresloader 是一个面向游戏团队的数据转表工具链：把 Excel 中的策划数据转换为 protobuf、JSON、MsgPack、Lua、JavaScript、XML 等多种结构化格式，并配套批量化、校验和代码生成工具。

## 主要特性

> 该部分信息会同步展示在[首页](/)，方便了解 xresloader 的能力与优势。

- 💠 **跨平台批量工具**：基于 Java 17+ 提供 CLI/GUI，并支持 include 复用配置，Windows、macOS、Linux 一致体验。
- 📦 **多格式导出**：Excel 可同时输出 protobuf、MsgPack、Lua、JavaScript、JSON、XML 以及 UE DataTable（JSON/CSV）。
- 🕸️ **协议结构完整**：同时支持 proto v2/v3、嵌套 message、数组嵌套、oneof、map 与 plain 字符串转复杂结构。
- 🧩 **枚举与描述信息导出**：可将 proto 枚举值和 descriptor 导成 Lua/JavaScript 代码或 JSON/XML 数据，并支持插件扩展反射。
- 🎮 **Unreal Engine 生态**：导出 UE 所需 JSON/CSV，自动生成 DataTable 加载代码，适配 UE 内容流水线。
- ✅ **别名表与校验体系**：别名表提升策划可读性，validator 可直接识别 proto 字段与枚举，保障数据有效。
- ⚙️ **输出插件与合表**：protobuf 插件可控制部分输出，还能自动将多张 Excel 合并为单一目标文件。
- 📐 **公式、压缩与版本控制**：支持 Excel 公式、空数据裁剪/定长保留、字段名正则映射及数据版本号设置。
- 🌐 **多语言模块形态**：Lua 支持 global/require/module，JavaScript 支持 global/node/AMD，兼容不同运行时装载方式。

## 组件状态

| 组件                                                                     | 状态                                                                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [xresloader](https://github.com/xresloader/xresloader)                   | Linux (OpenJDK 17)：![Build Status](https://github.com/xresloader/xresloader/actions/workflows/build.yml/badge.svg) |
| [xresconv-cli](https://github.com/xresloader/xresconv-cli)               | 提供批量配置 CLI，发布包附带可执行脚本                                                                              |
| [xresconv-gui](https://github.com/xresloader/xresconv-gui)               | ![GUI Build](https://github.com/xresloader/xresconv-gui/workflows/build/badge.svg)                                  |
| [xres-code-generator](https://github.com/xresloader/xres-code-generator) | 代码生成器，提供模板即可直接定制                                                                                    |
| [xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin) | ![Dump Build](https://github.com/xresloader/xresloader-dump-bin/actions/workflows/main.yml/badge.svg)               |
| 文档 (本仓库)                                                            | ![Docs Build](https://github.com/xresloader/xresloader-docs/actions/workflows/main.yml/badge.svg)                   |

![GitHub release](https://img.shields.io/github/v/release/xresloader/xresloader)
![Code size](https://img.shields.io/github/languages/code-size/xresloader/xresloader)
![Repo size](https://img.shields.io/github/repo-size/xresloader/xresloader)
![Downloads](https://img.shields.io/github/downloads/xresloader/xresloader/total)
![Forks](https://img.shields.io/github/forks/xresloader/xresloader?style=social)
![Stars](https://img.shields.io/github/stars/xresloader/xresloader?style=social)

> **迁移提示**：从 v2.11.0-rc3 起，默认禁用了对 Excel 某些常见公式的旧式兼容逻辑。如果你依赖旧行为，可通过 `--enable-excel-formular` 显式开启；若仍在使用 JDK 8，需要在源码中调整 `maven-compiler-plugin` 的 target 再构建。

## 文档地图

### 用户文档

- [下载与安装](/docs/users/download)
- [快速开始](/docs/users/quick-start)
- [xresloader 核心功能](/docs/users/xresloader-core)
- [数据映射](/docs/users/data-mapping)
- [输出格式](/docs/users/output-format)
- [批量转换 xresconv](/docs/users/xresconv)
- [支持的数据类型](/docs/users/data-types)
- [代码生成器](/docs/users/xres-code-generator)
- [高级用法](/docs/users/advance-usage)
- [生态与工具链](/docs/users/ecosystem-and-tools)
- [常见问题 FAQ](/docs/users/faq)

### 开发文档

- [依赖说明](/docs/development/dependency)
- [构建指南](/docs/development/build)
- [包源配置](/docs/development/pkg-source)
- [xresloader 设计](/docs/development/design-xresloader)
- [xresconv 设计](/docs/development/design-xresconv)

### 关于项目

- [许可证](/docs/about/license)
- [关于 xresloader](/docs/about/)

需要更完整的示例？可以直接查看仓库中的 `source/sample` 目录 —— 与文档保持同步的样例协议、配置与代码都保存在那里。
