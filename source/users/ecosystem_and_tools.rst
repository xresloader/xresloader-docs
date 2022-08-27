生态和周边工具
===============

.. _xresloader: https://github.com/xresloader
.. _xresloader-dump-bin: https://github.com/xresloader/xresloader-dump-bin

二进制转可读文本工具: `xresloader-dump-bin`_
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

使用 `xresloader_` 时，如果输出的数据时协议二进制，那么在需要调试和对比不同版本的内容的时候时非常不方便的。为了解决这一问题，我们提供了一个命令行工具 `xresloader-dump-bin`_ 来把导出的二进制文件转换成文本内容展示出来。

`xresloader_` 使用 `Rust语言 <https://www.rust-lang.org/>`_ 开发，按照 `Rust语言 <https://www.rust-lang.org/>`_ 标准的包管理模式。

使用示例: ``./xresloader-dump-bin --pretty -p kind.pb -b arr_in_arr_cfg.bin``
