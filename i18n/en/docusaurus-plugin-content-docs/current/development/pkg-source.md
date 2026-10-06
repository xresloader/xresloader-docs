---
title: Package sources and proxies
description: Dependency registries, proxies and certificates for toolchain development
---

# Package sources and proxies {#包源与代理}

Keep component lockfiles and official HTTPS sources. For organization mirrors, use an administrator-provided and verified address. Reachability does not prove that a mirror matches upstream content.

## Maven {#maven}

User configuration is `~/.m2/settings.xml`, or `.m2/settings.xml` under the Windows user directory. A mirror can route Central through an organization repository:

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

Replace the example domain with a real address. Avoid obsolete HTTP mirror lists. Use `mvn -s settings.xml package` for a separate configuration; keep credentials in controlled user settings.

### Public mirror examples {#公共镜像示例}

The original mirror examples are retained with HTTPS addresses. Choose **one** of these mirrors inside `mirrors`; they do not provide parallel downloads or automatic failover:

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

See [Aliyun's mirror guide](https://developer.aliyun.com/mirror/maven/) and [Tencent Cloud software sources](https://intl.cloud.tencent.com/zh/document/product/213/8623?lang=zh). Maven metadata at both HTTPS endpoints was reachable on 2026-10-05. Content and freshness are maintained by the providers. The historical repo1 / repo2 / UK / JBoss list is not a multi-mirror fallback configuration; use default Central or an organization proxy.

Separate configuration files also work for compilation:

```sh
mvn -s settings.xml compile
mvn -s settings.xml package
```

## Node.js and Yarn {#nodejs-与-yarn}

GUI 3.0 development uses Corepack/Yarn 4 with immutable installation. Do not rewrite `yarn.lock` using the old npm/Electron workflow. This documentation site's pnpm 9 CI contract is separate.

```sh
npm config set registry https://registry.npmjs.org/
corepack yarn config set npmRegistryServer https://registry.npmjs.org/
corepack yarn install --immutable
```

Run Yarn commands in the GUI repository. Organization mirrors should retain HTTPS and certificate checks. Configure a trusted custom CA using the package manager's current settings, rather than disabling `strict-ssl`.

The npm mirror example uses its current HTTPS endpoint. Set a registry globally or specify one for a single query:

```sh
npm config set registry https://registry.npmmirror.com/
npm view react version --registry=https://registry.npmmirror.com/
npm config set registry https://registry.npmjs.org/
npm config set strict-ssl true
```

Confirm that your organization permits [npmmirror](https://npmmirror.com/). The GUI uses pinned Yarn 4 / Corepack, rather than globally installed old Yarn or electron-prebuilt. Per-request registry and proxy options remain applicable to npm projects.

## Network proxies {#网络代理}

```sh
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
npm config delete proxy
npm config delete https-proxy
```

Use your local proxy address. Yarn, Cargo and Maven have separate network settings; npm configuration does not configure them. See [npm config](https://docs.npmjs.com/cli/using-npm/config), [Yarn settings](https://yarnpkg.com/configuration/yarnrc), [Maven settings](https://maven.apache.org/settings.html) and [Cargo config](https://doc.rust-lang.org/cargo/reference/config.html).
