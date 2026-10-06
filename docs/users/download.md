---
title: 下载与安装
description: 最新正式版下载、平台包选择和运行环境
---

# 下载与安装

import ToolchainCatalog from '@site/src/components/ToolchainCatalog';

## 下载最新版本 {#按系统下载最新版本}

每个组件提供一个 **下载最新版本** 入口，在最新发布页选择适合目标系统和 CPU 架构的包。JAR 和协议包各系统通用；GUI 的 bootstrap / offline 区别见下文。尚无正式版的组件提供当前源码。

<ToolchainCatalog />

## 组件与运行时 {#本文核验版本}

各组件独立发布，版本号无需相同；CLI 和 GUI 都调用同一个 xresloader JAR。上方目录显示查询到的正式版本，发行包以最新发布页为准。

| 组件 | 运行时与用途 |
| --- | --- |
| xresloader | Java 17+；核心转换引擎 |
| xresconv-cli | 原生 Rust 程序；CLI 批量转表工具 |
| xresconv-gui | Tauri 2、系统 WebView、包内 Node.js；GUI 批量转表工具 |
| xresloader-dump-bin | 原生 Rust 程序；查看导出的二进制文件 |

## 核心引擎

安装 [Java](https://adoptium.net/) 17 或以上版本，优先使用与机器架构相符的 64 位版本。下载最新完整包 `xresloader-<version>.jar`，并保存为 `xresloader.jar` 以使用下方命令。`<version>` 是发行版本号；`original-xresloader-<version>.jar` 不包含快速上手需要的完整依赖。

```sh
java -version
java -jar xresloader.jar --version
```

创建自己的协议时，还需从 [protobuf 官方发行页](https://github.com/protocolbuffers/protobuf/releases/latest) 下载完整 protoc 包，并取得引擎发行页的 `protocols.zip`。`tools.zip` 提供 Python 辅助脚本和扩展 descriptor，**不包含 protoc 可执行文件**。用于生成应用加载代码的 protoc 应与应用的 protobuf 库匹配，不能直接复用历史 `.pb.cc`。

## CLI：下载原生程序

选择对应操作系统和架构的包，解压后将可执行文件放到 PATH，或用完整路径运行。正式 CLI 不需要安装 Python 或 Rust。

| 平台 | 发行包名格式（`<version>` 为最新版本号） |
| --- | --- |
| Windows x64 / ARM64 | `xresconv-cli-<version>-<target>-pc-windows-msvc.zip`，target 为 x86_64 / aarch64 |
| Linux x64 / ARM64 | `xresconv-cli-<version>-<target>-unknown-linux-gnu.tar.gz` 或 musl 包 |
| macOS Intel / Apple Silicon | `xresconv-cli-<version>-<target>-apple-darwin.tar.gz`，target 为 x86_64 / aarch64 |

发行页另有尽力构建的扩展平台，具体以该版本资产为准。用同名 `.sha256` 文件核对包的摘要。

```sh
xresconv-cli --version
```

Java 由 `-J`、`JAVA_HOME` 或 PATH 指定，见 [CLI 参考与 Python 迁移](./xresconv-cli)。

## GUI：选择 bootstrap 或 offline

下载与系统和 CPU 匹配的包并完整解压，保留 Node.js、资源和预检文件的相对位置。只复制 `.exe` 不能得到完整的可运行安装。

| 平台 | 最低环境 | 包格式 |
| --- | --- | --- |
| Windows x64 / ARM64 | Windows 10 1809；WebView2 120+ | bootstrap / offline `.7z` |
| Linux x64 / ARM64 | Ubuntu 22.04 / glibc 2.35 基线；受支持发行版 | bootstrap `.tar.zst`、offline `.tar.zst` / `.AppImage` |
| macOS Intel / Apple Silicon | macOS 13.5；系统 WKWebView | bootstrap `.dmg` |

**bootstrap** 适合已有系统 WebView 的机器。Windows 缺少 WebView2 时运行包内引导安装器；下载运行时需要网络。Linux 需要 WebKitGTK 4.1、GTK 3、libsoup 3，启动预检会给出当前发行版的安装指引。

**offline** 在 Windows 携带 WebView2 Fixed Version，在 Linux 携带 WebKitGTK 依赖闭包；仍需满足系统基础环境。应用优先使用满足要求的系统 WebView。offline 指桌面运行时随包提供，项目脚本的联网需求由项目决定。

macOS 打开 DMG 后将应用复制到 Applications。Linux AppImage 需执行权限与挂载支持，无法挂载可选 offline `.tar.zst`。GUI 包内含 Node.js，Java 和 xresloader JAR 需单独准备。

详细操作见 [GUI 使用与迁移](./xresconv-gui)。

## 示例与其他组件

dump-bin 解压后即可运行，不要求 Java。用与数据对应的 descriptor 查看 bin，见 [二进制查看与提取](./ecosystem-and-tools)。尚未发布正式版的组件提供当前 main 源码 ZIP；首次发布正式版后，目录会显示最新版本入口。它们的运行依赖分别见使用文档。

- [快速上手示例](/examples/quick-start.zip)：准备好的 Excel、descriptor 和 XML。
- [xresconv-conf](https://github.com/xresloader/xresconv-conf)：完整配置与 include 示例。
- [xres-code-generator](https://github.com/xresloader/xres-code-generator)：读表代码生成，见 [生成器文档](./xres-code-generator)。

新用户从 [快速上手](./quick-start) 开始；开发者从 [环境依赖](../development/dependency) 开始。
