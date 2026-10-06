---
title: Environment and dependencies
description: Runtime, development and platform dependencies of the toolchain
---

# Environment and dependencies {#环境与依赖}

This page describes development environments for the tools. To run released packages, follow [Download and install](../users/download). The Docusaurus site and upstream tools have separate environments.

| Component | Baseline | Development dependencies | Released executable requirements |
| --- | --- | --- | --- |
| xresloader | 2.23.7 | JDK 17+, Maven or project Gradle wrapper, protoc | Java 17+, JAR, schema and Excel |
| xresconv-cli | 2.0.2 | Rust 1.88+ (edition 2024), Cargo | Java and xresloader; no Rust/Python |
| xresconv-gui | 3.0.0 | Node 24+, Corepack, pinned Yarn 4, repository Rust toolchain and Tauri native dependencies | Platform WebView, bundled Node, separate Java/JAR |
| xresloader-dump-bin | 2.6.0 | Rust stable, Cargo; edition 2024 | Native program, matching descriptor and bin; no Java |

## xresloader {#xresloader}

Use `pom.xml`, `build.gradle` and current source as the authority. Maven defaults to a Java 17 release target, configurable with `project.target.javaVersion`. Lowering the target alone does not restore JDK 8 support. Dependencies include protobuf, POI, log4j, output encoders and scripting engines.

Release 2.23.7 uses protoc 36.2 and protobuf-java 4.36.2. Regenerate C++ and other bindings with the application's protobuf version; do not patch `.pb.*` files manually.

## xresconv-cli {#xresconv-cli}

`Cargo.toml` declares Rust 1.88 as the minimum. Windows icon and version resources need the Windows SDK resource compiler. The complete local tests also need Python 3 and PowerShell 7 for compatibility entrypoints and release scripts; these are not runtime requirements of the native CLI.

## xresconv-gui {#xresconv-gui}

The current `packageManager` is Yarn 4.18.1; `rust-toolchain.toml` pins Rust 1.98.1. Read the repository configuration when updating. Windows needs Visual Studio C++ tools, PowerShell 7 and WebView2. Linux needs WebKitGTK 4.1, GTK 3 and system build tools. macOS needs Xcode command-line tools.

Released packages bundle Node; development uses `corepack yarn install --immutable`. Icons, screenshots and binary resources use Git LFS; run `git lfs pull` after cloning. See the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/).

## Other components {#其他组件}

The dump-bin workspace contains `src/exec` and `src/protocol`. It uses rust-protobuf 3 and protobuf-json-mapping 3 to read descriptors and records dynamically. Its `Cargo.toml` does not declare `rust-version`; the CLI's 1.88 minimum cannot be treated as its contract. Use an edition-2024-capable toolchain; CI uses stable. See [Build and validate](./build#xresloader-dump-bin-260).

The generator and DynamicMessage-net are maintained independently. Use each project's current README and locked configuration; see [Code generator](../users/xres-code-generator) and [Data loading](../users/output-format). Historical Python 2 samples do not establish current Python 2 support.

Continue with [Build and validate](./build).
