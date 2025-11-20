---
title: 生态与工具链
description: 生态项目与常用辅助工具
---
# 生态和周边工具

## 二进制转可读文本工具: [xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin)

使用 `xresloader` 时，如果输出的数据时协议二进制，那么在需要调试和对比不同版本的内容的时候时非常不方便的。为了解决这一问题，我们提供了一个命令行工具 [xresloader-dump-bin](https://github.com/xresloader/xresloader-dump-bin) 来把导出的二进制文件转换成文本内容展示出来。

`xresloader` 使用 [Rust语言](https://www.rust-lang.org/) 开发，按照 [Rust语言](https://www.rust-lang.org/) 标准的包管理模式。

使用示例: `./xresloader-dump-bin --pretty -p kind.pb -b arr_in_arr_cfg.bin`
