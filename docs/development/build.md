---
title: 构建与验证
description: xresloader、原生 CLI、Tauri GUI 的构建、测试和打包入口
---

# 构建与验证

以下命令分别在对应组件仓库根目录执行。版本和依赖见 [环境与依赖](./dependency)，架构见 [xresloader](./design-xresloader) / [xresconv](./design-xresconv)。构建成功、测试成功与发行包运行是不同的验收。

## xresloader 2.23.7

```sh
mvn compile
mvn package
mvn test
mvn verify
java -jar target/xresloader-2.23.7.jar --version
```

mvn test 运行单元测试；mvn verify 在打包后继续执行 Failsafe 的 JAR 集成测试。默认生成兼容 Java 17 的完整 JAR。需要 Java 21 目标时使用 JDK 21+ 执行 `mvn -Dproject.target.javaVersion=21 clean package`。clean 会删除旧 target 产物，先保留所需文件。

2.23.0 起也支持 Gradle，命令以项目 wrapper 和 build.gradle 为准：

```sh
./gradlew test shadowJar
```

Windows 使用 `./gradlew.bat`。Gradle 的 test 排除 *IT 集成测试；打包后集成验证使用上述 Maven verify。生成协议时使用 sample 的 gen_protocol_v2.py / gen_protocol_v3.py 和实际 protoc；生成产物不直接修改。实际转换验证需使用真实 JAR、Excel 和 descriptor，检查退出码、记录和目标文件，不能仅执行 --version。

## xresconv-cli 2.0.2

```sh
cargo build --release --locked
cargo fmt --all --check
cargo check --workspace --locked
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked -- -D warnings
```

二进制在 target/release，Windows 后缀为 .exe。测试覆盖 CLI、XML、规划、并发、取消、管道和 Python 转发层；fake-java 验证进程合同，不替代真实转换。真实项目验证先 --test，再在隔离目录执行并核对产物。

发行流程按 Cargo 版本匹配 tag，生成平台包与 SHA256；完整边界见 [上游迁移合同](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md)。

## xresconv-gui 3.0.0

```sh
git lfs pull
corepack yarn install --immutable
corepack yarn check:toolchain
corepack yarn dev:desktop
```

Tauri 开发入口准备业务 workspaces 和前端热更新。桌面构建为 `corepack yarn build:desktop`；完整可分发介质使用平台打包入口，不能只分发 target/release 的程序。

```sh
corepack yarn package:windows --variant=bootstrap --arch=x64
corepack yarn package:linux --variant=offline --arch=x86_64
corepack yarn package:macos --variant=bootstrap --arch=arm64
```

平台命令在相应主机执行；指定非宿主架构需显式 --cross。产物在 build/dist，清单记录目标、sourceCommit、ABI 与摘要。验证示例：

```sh
corepack yarn verify:portable --os=windows --arch=x64 --variant=bootstrap
```

| 检查 | 上游命令 | 证明范围 |
| --- | --- | --- |
| 静态与类型 | lint、typecheck | JS/TS、文档、类型 |
| 单元与合同 | test:unit、test:contracts | 业务逻辑与 Schema |
| Rust | check:shell、test:shell | 原生壳与静态规则 |
| 浏览器 | test:browser | Chromium、Firefox、WebKit；原生接口由适配器替代 |
| 桌面 | test:desktop | 真实系统 WebView 与应用通信 |
| 真实转换 | test:conversion | JAR argv/stdin 的八种格式差分 |
| 发行介质 | verify:portable | 结构、摘要、目标二进制及适用环境中的运行 |

表中命令均以 `corepack yarn` 为前缀。真实转换明确设置 XRESCONV_TEST_JAR 和 XRESCONV_TEST_SAMPLE；未设置时只接受相邻目录唯一匹配，缺少或多个 JAR 不能猜测。Windows 桌面测试需匹配 WebView2 的 msedgedriver，macOS 使用 debug e2e 驱动；release 禁止该测试 feature。

上游 [测试](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/testing.md)、[打包](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/packaging.md) 记录具体入口和平台限制。本页列出可执行命令，不表示本站维护已运行上游全套测试。

## xresloader-dump-bin 2.6.0

在 dump-bin 仓库根执行：

```sh
cargo build --release --locked
cargo fmt --all --check
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked
```

可执行文件位于 target/release，Windows 后缀 .exe。实际验收使用匹配的 descriptor 和导出 bin，检查头信息、记录及提取文件，见 [查看工具](../users/ecosystem-and-tools)。版本查询不代替二进制解析验证；本站没有运行它的上游全套构建或测试。

## 本文档站点

本站使用 Node 22+，已有依赖时在本站根执行 `npm run build`。CI 使用 Node 24 / pnpm 9，安装命令为 `pnpm install --frozen-lockfile`，然后 `pnpm build`。站点编译验证 MDX、链接和资源，不执行工具示例。
