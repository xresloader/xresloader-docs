---
title: Build and validate
description: Build, test and package the engine, native CLI and Tauri GUI
---

# Build and validate {#构建与验证}

Run each command at the root of its component repository. See [Dependencies](./dependency) and the [engine](./design-xresloader) / [batch tool](./design-xresconv) architecture guides. Build success, test success and a runnable release package are separate acceptance results.

## xresloader 2.23.7 {#xresloader-2237}

```sh
mvn compile
mvn package
mvn test
mvn verify
java -jar target/xresloader-2.23.7.jar --version
```

`mvn test` runs unit tests. After packaging, `mvn verify` also runs Failsafe JAR integration tests. The complete JAR defaults to Java 17 compatibility. For a Java 21 target, run `mvn -Dproject.target.javaVersion=21 clean package` with JDK 21+. `clean` removes previous target outputs; retain files you need first.

Gradle is also supported from 2.23.0. Use the project's wrapper and `build.gradle`:

```sh
./gradlew test shadowJar
```

On Windows use `./gradlew.bat`. Gradle `test` excludes `*IT` integration tests; use Maven `verify` for packaged integration checks. Generate protocols using the sample `gen_protocol_v2.py` / `gen_protocol_v3.py` and an actual protoc. Do not edit generated files. Actual conversion checks need a real JAR, Excel and descriptor: verify exit status, records and output files, beyond `--version`.

## xresconv-cli 2.0.2 {#xresconv-cli-202}

```sh
cargo build --release --locked
cargo fmt --all --check
cargo check --workspace --locked
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked -- -D warnings
```

Binaries are in `target/release`, with `.exe` on Windows. Tests cover CLI parsing, XML, planning, concurrency, cancellation, pipes and Python forwarding. fake-java validates process contracts; it does not replace real conversion. Preview with `--test`, then execute in an isolated directory and inspect outputs.

Release packaging matches tags to Cargo versions and creates platform archives and SHA256 files. See the [upstream migration contract](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md).

## xresconv-gui 3.0.0 {#xresconv-gui-300}

```sh
git lfs pull
corepack yarn install --immutable
corepack yarn check:toolchain
corepack yarn dev:desktop
```

The Tauri development entrypoint prepares backend workspaces and frontend hot reload. `corepack yarn build:desktop` builds the desktop app. Distributable media requires a platform packaging command, beyond the executable in `target/release`.

```sh
corepack yarn package:windows --variant=bootstrap --arch=x64
corepack yarn package:linux --variant=offline --arch=x86_64
corepack yarn package:macos --variant=bootstrap --arch=arm64
```

Run platform commands on the corresponding host. A non-host architecture requires explicit `--cross`. Outputs are in `build/dist`; manifests record target, sourceCommit, ABI and hashes. Example verification:

```sh
corepack yarn verify:portable --os=windows --arch=x64 --variant=bootstrap
```

| Check | Upstream command | Scope |
| --- | --- | --- |
| Static and types | lint, typecheck | JS/TS, documentation, types |
| Unit and contracts | test:unit, test:contracts | Logic and schemas |
| Rust | check:shell, test:shell | Native shell and static rules |
| Browser | test:browser | Chromium, Firefox, WebKit; adapters replace native interfaces |
| Desktop | test:desktop | Actual system WebView and application communication |
| Real conversion | test:conversion | JAR argv/stdin differential checks for eight formats |
| Release media | verify:portable | Structure, hashes, target binaries and execution in applicable environments |

Prefix all commands in the table with `corepack yarn`. Set `XRESCONV_TEST_JAR` and `XRESCONV_TEST_SAMPLE` explicitly for real conversion. Without them, only a unique adjacent-directory match is accepted; missing or multiple JARs must not be guessed. Windows desktop tests need msedgedriver matching WebView2. macOS uses the debug E2E driver; release builds prohibit this test feature.

Upstream [testing](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/testing.md) and [packaging](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/packaging.md) describe platform limits. Listing these commands does not mean the documentation maintenance ran the entire upstream suite.

## xresloader-dump-bin 2.6.0 {#xresloader-dump-bin-260}

Run at the dump-bin repository root:

```sh
cargo build --release --locked
cargo fmt --all --check
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked
```

The executable is in `target/release`, with `.exe` on Windows. Validate using a matching descriptor and exported bin: inspect headers, records and extracted files. See [Binary inspector](../users/ecosystem-and-tools). A version query does not prove parsing; this site maintenance has not run its full upstream build or tests.

## This documentation site {#本文档站点}

The site uses Node 22+. With dependencies installed, run `npm run build` at the site root to build both languages. CI uses Node 24 / pnpm 9, `pnpm install --frozen-lockfile`, then `pnpm build`. Site compilation checks MDX, links and resources; it does not execute tool examples.

For development, use `npm start -- --locale en` or `npm start -- --locale zh-Hans`. Preview the combined build with `npm run serve -- --host 127.0.0.1` to check language switching.
