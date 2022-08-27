环境和依赖项
===============

.. _xresloader: https://github.com/xresloader/xresloader
.. _xresconv-cli: https://github.com/xresloader/xresconv-cli
.. _xresconv-gui: https://github.com/xresloader/xresconv-gui
.. _xres-code-generator: https://github.com/xresloader/xres-code-generator
.. _DynamicMessage-net: https://github.com/xresloader/DynamicMessage-net
.. _protobuf-net: https://github.com/mgravell/protobuf-net
.. _mako: https://www.makotemplates.org/

转表工具- `xresloader`_
-----------------------------------------

+ `xresloader`_ 项目使用[apache maven](https://maven.apache.org/)管理包依赖和打包构建流程。
+ JDK 需要11或以上版本

命令行批量转表工具- `xresconv-cli`_
-----------------------------------------

+ `xresconv-cli`_ 项目使用 `python <https://www.python.org/>`_ 开发。
+ 支持python 2.7和python 3

GUI批量转表工具- `xresconv-gui`_ 
-----------------------------------------

+ `xresconv-gui`_ 项目使用 `nodejs <https://nodejs.org/en/>`_ 和 `npm <https://www.npmjs.com/>`_ 做包管理。
+ 使用 `electronjs <https://electronjs.org/>`_ 实现用户界面

代码生成工具- `xres-code-generator`_ 
-----------------------------------------

+ `xres-code-generator`_ 项目使用 `python <https://www.python.org/>`_ 开发。
+ 支持python 2.7和python 3
+ 使用 `mako`_ 模板引擎

C#的动态Message支持- `DynamicMessage-net`_
----------------------------------------------

+ `DynamicMessage-net`_ 项目使用 `.net core <https://github.com/dotnet/core>`_ 或 `.net framework <http://www.microsoft.com/net>`_ 开发。
+ 依赖 `protobuf-net`_ 的解码层