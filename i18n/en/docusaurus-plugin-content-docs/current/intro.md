---
id: intro
title: Toolchain overview
description: Current xresloader, CLI and GUI components and where to start
---

xresloader converts Excel design data into structured configuration. Batch tools, validators and generated loaders connect it to your game project.

## Capabilities {#能力与优势}

- **Cross-platform batch conversion**: a Java 17+ engine, native Rust CLI and Tauri GUI work on Windows, macOS and Linux. Includes share settings across manifests.
- **Multiple output formats**: export the same workbook as protobuf, MsgPack, Lua, JavaScript, JSON, XML or UE DataTable JSON / CSV. Output matrices separate client and server formats.
- **Complete schema structures**: proto2 / proto3, nested messages, repeated fields and nested arrays, oneof, map and in-cell Plain structures.
- **Enums and descriptors**: export schema enums, constants and descriptors as Lua / JavaScript code or JSON / XML data, with custom options for reflection.
- **Unreal Engine integration**: export DataTable JSON / CSV and generate loading code for UE workflows.
- **Aliases and validation**: field and enum aliases, macros and cross-table references make spreadsheets readable. Ranges, logical composition and custom validators check data before export.
- **Custom output and merged sources**: schema extensions control output; merge multiple Excel sources into one file, map names with regular expressions, select ranges and transpose data.
- **Formula and output controls**: read saved formula caches or explicitly enable evaluation. Trim or retain empty arrays, set data versions and configure directories and renaming for each format.
- **Loaders for multiple languages**: C++, C#, Go, upb, pbc and lua-protobuf integrations. Lua supports global / require / module; JavaScript supports global / Node.js / AMD.
- **Inspectable binaries**: xresloader-dump-bin uses descriptors to display bin headers and records and extract strings or tagged fields.

The [homepage](/) presents these capabilities and the complete component catalog, repositories and latest downloads.

## Components {#组件清单}

| Component | Purpose | Download |
| --- | --- | --- |
| [xresloader](https://github.com/xresloader/xresloader) | Excel conversion engine | [Latest release](https://github.com/xresloader/xresloader/releases/latest) |
| [xresconv-cli](https://github.com/xresloader/xresconv-cli) | CLI batch converter | [Latest release](https://github.com/xresloader/xresconv-cli/releases/latest) |
| [xresconv-gui](https://github.com/xresloader/xresconv-gui) | GUI batch converter | [Latest release](https://github.com/xresloader/xresconv-gui/releases/latest) |
| [xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin) | Inspect exported binary data | [Latest release](https://github.com/xresloader/xresloader-dump-bin/releases/latest) |
| [xres-code-generator](https://github.com/xresloader/xres-code-generator) | Data loader generator | [Current source](https://github.com/xresloader/xres-code-generator/archive/refs/heads/main.zip) |
| [xresconv-conf](https://github.com/xresloader/xresconv-conf) | XML configuration and GUI extensions | [Current source](https://github.com/xresloader/xresconv-conf/archive/refs/heads/main.zip) |
| [xresloader-protocol](https://github.com/xresloader/xresloader-protocol) | Data headers and schema extensions | [Current source](https://github.com/xresloader/xresloader-protocol/archive/refs/heads/main.zip) |

Components without a stable release offer their current source. See [Download and install](./users/download) for latest versions and platform packages. The [documentation repository](https://github.com/xresloader/xresloader-docs) contains configuration, scripts and sample sources.

## Where to start {#选择入口}

| Goal | Guide |
| --- | --- |
| Quick start | [Quick start](./users/quick-start): download a ready-to-use example and check four outputs |
| Install the tools | [Download and install](./users/download): Java, platform packages and WebViews |
| Automate conversion | [CLI usage and migration](./users/xresconv-cli): native Rust, arguments and exit status |
| Select tables interactively | [GUI usage and migration](./users/xresconv-gui): desktop workspace, logs and display settings |
| Maintain project manifests | [XML and output matrices](./users/xresconv): paths, includes, formats and filters |
| Extend the desktop app | [Scripts and selectors](./users/xresconv-scripts): events, tree mirrors and buttons |
| Modify the implementation | [Build and validate](./development/build), [Architecture and interfaces](./development/design-xresconv) |

## Verified components {#当前组件}

The releases verified on 2026-10-05 were xresloader 2.23.7, xresconv-cli 2.0.2, xresconv-gui 3.0.0 and xresloader-dump-bin 2.6.0. They release independently; see the [installation guide](./users/download) for runtime requirements.

- **Engine**: Java 17+, proto2/proto3, nested messages, repeated, oneof, map and in-cell Plain structures.
- **Output**: protobuf bin, MsgPack, Lua, JavaScript, JSON, XML and UE DataTable JSON/CSV. Loading is explained in [Output formats](./users/output-format).
- **Batch tools**: Rust CLI for pipelines; Tauri GUI for selections, output matrices and extensions. Both reuse XML, with some differences in includes and GUI events.
- **Validation**: aliases, ranges, cross-table references and logical composition; see [Validators](./users/validator).
- **Mapping**: merged sources, ranges, transposition, arrays and macros; see [Data mapping](./users/data-mapping), [Data types](./users/data-types) and [Advanced usage](./users/advance-usage).
- **Runtime integration**: [Data loader generation](./users/xres-code-generator) and [Ecosystem tools](./users/ecosystem-and-tools).

## Upgrade notes {#升级时先确认}

CLI 2.x no longer requires Python for its main program; the old Python files forward to the native executable. GUI 3.0 replaces Electron. Project scripts no longer receive DOM, jQuery or Electron APIs. Each component guide covers installation and migration.

The engine reads saved Excel formula caches by default; `--enable-excel-formular` explicitly enables evaluation. Streaming mode does not detect date formats. Lowering the compiler target alone does not make the current Java source compatible with JDK 8.

## Development and project information {#开发与项目}

- [Environment and dependencies](./development/dependency), [Build and validate](./development/build), [Package sources and proxies](./development/pkg-source).
- [xresloader design](./development/design-xresloader), [xresconv architecture and interfaces](./development/design-xresconv).
- [License](./about/license), [About the project](/docs/about), [FAQ](./users/faq).

The downloadable starter sources are under `source/sample/current`; English sources are under its `en/` directory. Other samples retain their historical context. Regenerate bindings using your protoc and runtime versions.
