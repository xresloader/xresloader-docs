---
title: Download and install
description: Latest stable downloads, platform packages and runtime requirements
---

# Download and install {#下载与安装}

import ToolchainCatalog from '@site/src/components/ToolchainCatalog';

## Latest downloads {#按系统下载最新版本}

Each component has one **Download latest release** link. Choose the package for your target OS and CPU architecture on the latest release page. JAR and protocol bundles work across platforms; GUI bootstrap and offline packages are explained below. Projects without a stable release offer their current source.

<ToolchainCatalog />

## Components and runtimes {#本文核验版本}

Components release independently, so their version numbers need not match. Both the CLI and GUI invoke the same xresloader JAR. The catalog displays the stable version returned by the query; use the latest release page for packages.

| Component | Runtime and purpose |
| --- | --- |
| xresloader | Java 17+; conversion engine |
| xresconv-cli | Native Rust; CLI batch converter |
| xresconv-gui | Tauri 2, platform WebView, bundled Node.js; GUI batch converter |
| xresloader-dump-bin | Native Rust; binary data inspector |

## Core engine {#核心引擎}

Install [Java](https://adoptium.net/) 17 or later, preferably a 64-bit build matching your architecture. Download the latest complete `xresloader-<version>.jar` and save it as `xresloader.jar` to use the command below. `<version>` is the release version; `original-xresloader-<version>.jar` does not include all the dependencies needed for the quick start.

```sh
java -version
java -jar xresloader.jar --version
```

For your own schemas, download the complete protoc package from the [official protobuf releases](https://github.com/protocolbuffers/protobuf/releases/latest), plus `protocols.zip` from the engine release. `tools.zip` contains Python helpers and extension descriptors; **it does not include protoc**. Match the protoc used for application bindings to the application's protobuf library. Regenerate historical `.pb.cc` files.

## CLI: native executable {#cli下载原生程序}

Download and extract the package for your OS and architecture. Add the executable to PATH or use its full path. The released CLI needs neither Python nor Rust.

| Platform | Package naming pattern (`<version>` is the latest version) |
| --- | --- |
| Windows x64 / ARM64 | `xresconv-cli-<version>-<target>-pc-windows-msvc.zip`, target x86_64 / aarch64 |
| Linux x64 / ARM64 | `xresconv-cli-<version>-<target>-unknown-linux-gnu.tar.gz` or a musl package |
| macOS Intel / Apple Silicon | `xresconv-cli-<version>-<target>-apple-darwin.tar.gz`, target x86_64 / aarch64 |

Additional platforms are built on a best-effort basis; check the release assets. Verify the archive against its corresponding `.sha256` file.

```sh
xresconv-cli --version
```

Select Java with `-J`, `JAVA_HOME` or PATH; see [CLI reference and Python migration](./xresconv-cli).

## GUI: bootstrap or offline {#gui选择-bootstrap-或-offline}

Extract the entire package for your OS and CPU. Retain the relative locations of Node.js, resources and preflight files. Copying the `.exe` alone does not provide a runnable installation.

| Platform | Minimum environment | Package |
| --- | --- | --- |
| Windows x64 / ARM64 | Windows 10 1809; WebView2 120+ | bootstrap / offline `.7z` |
| Linux x64 / ARM64 | Ubuntu 22.04 / glibc 2.35 baseline; supported distributions | bootstrap `.tar.zst`, offline `.tar.zst` / `.AppImage` |
| macOS Intel / Apple Silicon | macOS 13.5; system WKWebView | bootstrap `.dmg` |

**bootstrap** is suitable when the system WebView is already available. On Windows, run the bundled bootstrapper if WebView2 is missing; runtime downloads need a network connection. Linux needs WebKitGTK 4.1, GTK 3 and libsoup 3. Startup preflight reports installation instructions for the distribution.

**offline** bundles WebView2 Fixed Version on Windows and the WebKitGTK dependency closure on Linux. System prerequisites still apply. The app prefers a compatible system WebView. Offline refers to the desktop runtime; project scripts may have their own network requirements.

On macOS, copy the app from the DMG to Applications. Linux AppImages need executable permission and mount support; use the offline `.tar.zst` if mounting is unavailable. Node.js is bundled; prepare Java and the xresloader JAR separately.

See [GUI usage and migration](./xresconv-gui) for operation and language settings.

## Examples and other components {#示例与其他组件}

dump-bin runs after extraction and does not require Java. Use a descriptor matching the data; see [Binary inspection and extraction](./ecosystem-and-tools). Components without a stable release offer current main source ZIPs. The catalog also detects their first stable release automatically. Their guides describe their own dependencies.

- [English starter example](/examples/quick-start-en.zip): prepared Excel, descriptor and XML with English names and scripts.
- [xresconv-conf](https://github.com/xresloader/xresconv-conf): complete configuration and include examples.
- [xres-code-generator](https://github.com/xresloader/xres-code-generator): loader generation; see the [generator guide](./xres-code-generator).

New users can start with [Quick start](./quick-start). Developers can start with [Environment and dependencies](../development/dependency).
