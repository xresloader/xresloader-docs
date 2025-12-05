---
title: Golang 读表代码
description: 使用 xres-code-generator 生成基于标准 golang protobuf 的 配置读取服务
---

# Golang集成指南

TODO: 目前Golang生态下我们的工程读表代码依赖额外的插件工具生成的代码。还没有完全整理出独立的工具和模板模块和文档。

现成的示例和可用的版本可以参考 [atsf4g-go](https://github.com/atframework/atsf4g-go) 工程:

- 模板文件: [src/template/config_set.go.mako](https://github.com/atframework/atsf4g-go/blob/main/src/template/config_set.go.mako) 和 [src/template/config_group.go.mako](https://github.com/atframework/atsf4g-go/blob/main/src/template/config_group.go.mako)
- protoc插件: [protoc-gen-mutable](https://github.com/atframework/atsf4g-go/tree/main/atframework/atframe-utils-go/protoc-gen-mutable)
