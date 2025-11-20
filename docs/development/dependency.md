---
title: 依赖说明
description: 构建工具链所需的依赖与环境
---
# 环境和依赖项

## 转表工具- [xresloader](https://github.com/xresloader/xresloader)

- [xresloader](https://github.com/xresloader/xresloader) 项目使用\[apache maven\]([https://maven.apache.org/)管理包依赖和打包构建流程](https://maven.apache.org/)管理包依赖和打包构建流程)。
- JDK 需要17或以上版本

## 命令行批量转表工具- [xresconv-cli](https://github.com/xresloader/xresconv-cli)

- [xresconv-cli](https://github.com/xresloader/xresconv-cli) 项目使用 [python](https://www.python.org/) 开发。
- 支持python 2.7和python 3

## GUI批量转表工具- [xresconv-gui](https://github.com/xresloader/xresconv-gui)

- [xresconv-gui](https://github.com/xresloader/xresconv-gui) 项目使用 [nodejs](https://nodejs.org/en/) 和 [npm](https://www.npmjs.com/) 做包管理。
- 使用 [electronjs](https://electronjs.org/) 实现用户界面

## 代码生成工具- [xres-code-generator](https://github.com/xresloader/xres-code-generator)

- [xres-code-generator](https://github.com/xresloader/xres-code-generator) 项目使用 [python](https://www.python.org/) 开发。
- 支持python 2.7和python 3
- 使用 [mako](https://www.makotemplates.org/) 模板引擎

## C#的动态Message支持- [DynamicMessage-net](https://github.com/xresloader/DynamicMessage-net)

- [DynamicMessage-net](https://github.com/xresloader/DynamicMessage-net) 项目使用 [.net core](https://github.com/dotnet/core) 或 [.net framework](http://www.microsoft.com/net) 开发。
- 依赖 [protobuf-net](https://github.com/mgravell/protobuf-net) 的解码层
