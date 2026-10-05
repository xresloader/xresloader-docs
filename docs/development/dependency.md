---
title: 环境与依赖
description: 三个主要组件的运行、开发和平台依赖
---

# 环境与依赖

本页描述工具组件的开发环境。只运行发布包时，按 [下载与安装](../users/download) 准备即可；本站的 Docusaurus 环境与上游工具分开管理。

| 组件 | 当前基线 | 开发依赖 | 发布程序运行依赖 |
| --- | --- | --- | --- |
| xresloader | 2.23.7 | JDK 17+、Maven 或项目 Gradle wrapper、protoc | Java 17+、JAR、协议和 Excel |
| xresconv-cli | 2.0.2 | Rust 1.88+（edition 2024）、Cargo | Java 与 xresloader；无需 Rust/Python |
| xresconv-gui | 3.0.0 | Node 24+、Corepack、固定 Yarn 4、仓库 Rust 工具链与 Tauri 原生依赖 | 平台 WebView、包内 Node、另备 Java/JAR |
| xresloader-dump-bin | 2.6.0 | Rust stable、Cargo；edition 2024 | 原生程序、匹配的 descriptor 和 bin；无需 Java |

## xresloader

以 pom.xml、build.gradle 和当前源码为准。Maven 默认 release 目标为 Java 17，可设置 project.target.javaVersion；当前代码不能只降低 target 就重新支持 JDK 8。依赖覆盖 protobuf、POI、log4j、各输出编码库和脚本引擎。

2.23.7 的配套 protoc 为 36.2，protobuf-java 为 4.36.2。生成 C++ 等加载代码时按应用的 protobuf 版本重新生成，不手改 `.pb.*`。

## xresconv-cli

最低 Rust 版本在 Cargo.toml 声明为 1.88。Windows 构建图标与版本资源需要 Windows SDK 资源编译器。完整本地测试额外需要 Python 3 和 PowerShell 7，用于兼容入口与发布脚本；这不是正式 CLI 的运行要求。

## xresconv-gui

当前 packageManager 为 Yarn 4.18.1，rust-toolchain.toml 固定 Rust 1.98.1；更新时读取仓库配置。Windows 需要 Visual Studio C++ 工具、PowerShell 7 与 WebView2；Linux 需要 WebKitGTK 4.1、GTK 3 和系统构建工具；macOS 需要 Xcode 命令行工具。

发行包自带 Node，开发安装使用 `corepack yarn install --immutable`。图标、截图和二进制资源采用 Git LFS，克隆后执行 `git lfs pull`。原生前提见 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)。

## 其他组件

dump-bin 的 workspace 包含 src/exec 和 src/protocol，使用 rust-protobuf 3 与 protobuf-json-mapping 3 动态读取 descriptor 和记录。Cargo.toml 未声明 rust-version，不能将 CLI 的 1.88 最低版本直接当作它的最低合同；edition 2024 需要支持该 edition 的工具链，CI 使用 stable。构建见 [构建指南](./build#xresloader-dump-bin-260)。

读表代码生成器与 DynamicMessage-net 独立维护，依赖以各项目当前 README 和锁定配置为准，见 [代码生成器](../users/xres-code-generator) 与 [数据加载](../users/output-format)。历史 Python 2 示例不代表当前 Python 2 支持合同。

下一步见 [构建与验证](./build)。
