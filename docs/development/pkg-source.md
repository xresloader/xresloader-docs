---
title: 包源与代理
description: 工具链开发时的依赖源、代理和证书配置
---

# 包源与代理

优先沿用组件的锁文件与官方 HTTPS 源。需要组织镜像时，使用管理员提供并核验过的地址；镜像可达不代表内容与上游一致。

## Maven

Maven 的用户配置为 `~/.m2/settings.xml`，Windows 为用户目录下 `.m2/settings.xml`。可通过 mirror 将 central 指向组织代理仓库：

```xml
<settings>
  <mirrors>
    <mirror>
      <id>company-central</id>
      <mirrorOf>central</mirrorOf>
      <url>https://maven.example.com/repository/central/</url>
    </mirror>
  </mirrors>
</settings>
```

示例域名是占位符，需替换为实际地址。不要复制已停用的 HTTP 镜像清单。使用独立配置时运行 `mvn -s settings.xml package`，凭据保存在受控用户配置中。

### 公共镜像示例

原文的公共镜像用法保留，地址改为 HTTPS。以下两个 mirror **选一个** 放进 mirrors，不要把它们理解为并行下载或自动故障切换：

```xml
<mirror>
  <id>aliyun</id>
  <mirrorOf>central</mirrorOf>
  <name>Aliyun public</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

```xml
<mirror>
  <id>tencent-cloud</id>
  <mirrorOf>central</mirrorOf>
  <name>Tencent Cloud public</name>
  <url>https://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
</mirror>
```

配置依据见 [阿里云镜像说明](https://developer.aliyun.com/mirror/maven/) 和 [腾讯云软件源](https://intl.cloud.tencent.com/zh/document/product/213/8623?lang=zh)。2026-10-05 核验了这两个 HTTPS 地址的 Maven 元数据可达性；镜像内容与及时性由服务方维护。原 repo1 / repo2 / UK / JBoss 列表不作为多镜像回退清单，使用 Maven 默认 Central 或组织代理即可。

保留单独指定配置文件的编译、打包方法：

```sh
mvn -s settings.xml compile
mvn -s settings.xml package
```

## Node.js 与 Yarn

GUI 3.0 开发使用 Corepack/Yarn 4 和 immutable 安装，不能用旧 npm/Electron 安装流程重写 yarn.lock。本资料站的 pnpm 9 CI 合同单独维护。

```sh
npm config set registry https://registry.npmjs.org/
corepack yarn config set npmRegistryServer https://registry.npmjs.org/
corepack yarn install --immutable
```

Yarn 命令在 GUI 仓库执行。组织镜像保持 HTTPS 与证书校验；需要自建 CA 时按包管理器当前配置设置可信证书，不关闭 strict-ssl 来绕过证书错误。

原 npm 镜像示例改用当前 HTTPS 入口。需要 npm 公共镜像时可设置 registry，也可只为一次查询指定，不改全局配置：

```sh
npm config set registry https://registry.npmmirror.com/
npm view react version --registry=https://registry.npmmirror.com/
npm config set registry https://registry.npmjs.org/
npm config set strict-ssl true
```

使用 [npmmirror](https://npmmirror.com/) 时先确认组织允许该镜像。GUI 使用仓库固定的 Yarn 4 / Corepack，不再用 npm 全局安装旧 Yarn 或 electron-prebuilt；针对单次请求的 registry / proxy 用法仍可用于 npm 项目。

## 网络代理

```sh
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
npm config delete proxy
npm config delete https-proxy
```

代理地址按本机环境设置。Yarn、Cargo、Maven 各有独立网络配置，不因 npm 配置自动生效。具体字段见 [npm config](https://docs.npmjs.com/cli/using-npm/config)、[Yarn 配置](https://yarnpkg.com/configuration/yarnrc)、[Maven settings](https://maven.apache.org/settings.html) 和 [Cargo config](https://doc.rust-lang.org/cargo/reference/config.html)。
