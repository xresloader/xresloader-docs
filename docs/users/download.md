---
title: 下载与安装
description: 获取转表工具链及依赖的指南
---
# 下载工具集

| 模块或工具 | 下载地址 |
| --- | --- |
| 模块或工具 | 下载地址 |
| 转表工具-xresloader | [xresloader release](https://github.com/xresloader/xresloader/releases) |
| 命令行批量转表工具-xresconv-cli | [xresconv-cli release](https://github.com/xresloader/xresconv-cli/releases) |
| GUI批量转表工具-xresconv-gui | [xresconv-gui release](https://github.com/xresloader/xresconv-gui/releases) |
| 批量转表配置模板仓库-xresconv-conf | [xresconv-conf](https://github.com/xresloader/xresconv-conf) |
| 读表代码生成工具 | [xres-code-generator](https://github.com/owent/xres-code-generator) |
| 二进制输出Dump成文本工具 | [xresloader-dump-bin](https://github.com/owent/xresloader-dump-bin/releases) |

- [**转表工具-xresloader**](https://github.com/xresloader/xresloader/releases) 下载jar文件即可，如果要使用插件，请下载 *protocols.zip*

- [**命令行批量转表工具-xresconv-cli**](https://github.com/xresloader/xresconv-cli/releases) 下载压缩包并使用里面的*xresconv-cli.py* 文件

- [**GUI批量转表工具-xresconv-gui**](https://github.com/xresloader/xresconv-gui/releases) 下载对应平台的发布包即可

- [**批量转表配置模板仓库-xresconv-conf**](https://github.com/xresloader/xresconv-conf) 是给 [xresconv-cli release](https://github.com/xresloader/xresconv-cli/releases) 或 [xresconv-gui release](https://github.com/xresloader/xresconv-gui/releases) 使用的配置列表文件。 [sample.xml](https://github.com/xresloader/xresconv-conf/blob/main/sample.xml) 文件是功能完整的配置示例。 同时，配置文件支持include其他xml配置并做一些配置覆盖，[sample_include.xml](https://github.com/xresloader/xresconv-conf/blob/main/sample_include.xml) 文件是include功能的示例。 批量转表配置文件里配置的路径必须是绝对路径或者相对于xml配置文件的路径。
