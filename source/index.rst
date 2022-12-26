xresloader文档
===============================================

`xresloader`_ 是一组用于把Excel数据结构化并导出为程序可读的数据文件的导表工具集。它包含了一系列跨平台的工具、协议描述和数据读取代码。

主要功能特点：

+ 跨平台（java 11 or upper）
+ Excel => protobuf/msgpack/lua/javascript/json/xml
+ 完整支持协议结构，包括嵌套结构和数组嵌套
+ 同时支持protobuf proto v2 和 proto v3
+ 支持导出proto枚举值到lua/javascript代码和json/xml数据
+ 支持导出proto描述信息值到lua/javascript代码和json/xml数据（支持自定义插件，方便用户根据proto描述自定义反射功能）
+ 支持导出 UnrealEngine 支持的json或csv格式，支持自动生成和导出 UnrealEngine 的 ``DataTable`` 加载代码
+ 支持别名表，用于给数据内容使用一个易读的名字
+ 支持验证器，可以在数据里直接填写proto字段名或枚举名，或者验证填入数据的是否有效
+ 支持通过protobuf协议插件控制部分输出
+ 支持自动合表，把多个Excel数据表合并成一个输出文件
+ 支持公式
+ 支持oneof,支持plain模式输入字符串转为数组或复杂结构,支持map
+ 支持空数据压缩（裁剪）或保留定长数组
+ 支持基于正则表达式分词的字段名映射转换规则
+ 支持设置数据版本号
+ Lua输出支持全局导出或导出为 ``require`` 模块或导出为 ``module`` 模块。
+ Javascript输出支持全局导出或导出为 ``nodejs`` 模块或导出为 ``AMD`` 模块。
+ 提供CLI批量转换工具（支持python 2.7/python 3 @ Windows、macOS、Linux）
+ 提供GUI批量转换工具（支持Windows、macOS、Linux）
+ CLI/GUI批量转换工具支持include来实现配置复用

+----------------------------+-------------------------------------------------+
|   构建环境                 |                构建状态                         |
+============================+=================================================+
|   `xresloader`_            | Linux (OpenJDK 11): |xresloader-ci|             |
+----------------------------+-------------------------------------------------+
|   `xresconv-cli`_          | 直接下载发布包即可，无需构建打包                |
+----------------------------+-------------------------------------------------+
|   `xresconv-gui`_          | |xresconv-gui-ci|                               |
+----------------------------+-------------------------------------------------+
|   `xres-code-generator`_   | 读表代码生成工具，直接下载即可，无需构建打包    |
+----------------------------+-------------------------------------------------+
|   `xresloader-dump-bin`_   | 导出二进制转文本工具。|xresloader-dump-bin|     |
+----------------------------+-------------------------------------------------+
|    文档                    | |xresloader-docs|                               |
+----------------------------+-------------------------------------------------+

.. |xresloader-ci|         image:: https://github.com/xresloader/xresloader/workflows/Master%20Building/badge.svg
                           :alt: Build Status
                           :target: https://github.com/xresloader/xresloader/actions?query=workflow%3A%22Master+Building%22
.. |xresconv-gui-ci|       image:: https://github.com/xresloader/xresconv-gui/workflows/build/badge.svg
                           :alt: Build Status
                           :target: https://github.com/xresloader/xresconv-gui/actions?query=workflow%3Abuild
.. |xresloader-docs|       image:: https://readthedocs.org/projects/xresloader-docs/badge/?version=latest
                           :alt: Documentation Status
                           :target: https://readthedocs.org/projects/xresloader-docs/
.. |xresloader-dump-bin|   image:: https://github.com/xresloader/xresloader-dump-bin/actions/workflows/main.yml/badge.svg
                           :alt: Build Status
                           :target: https://github.com/xresloader/xresloader-dump-bin

.. image:: https://img.shields.io/github/v/release/xresloader/xresloader
.. image:: https://img.shields.io/github/languages/code-size/xresloader/xresloader
.. image:: https://img.shields.io/github/repo-size/xresloader/xresloader
.. image:: https://img.shields.io/github/downloads/xresloader/xresloader/total
.. image:: https://img.shields.io/github/forks/xresloader/xresloader?style=social
.. image:: https://img.shields.io/github/stars/xresloader/xresloader?style=social

.. _xresloader: https://github.com/xresloader
.. _xresloader-core: https://github.com/xresloader/xresloader
.. _xresconv-cli: https://github.com/xresloader/xresconv-cli
.. _xresconv-gui: https://github.com/xresloader/xresconv-gui
.. _xresconv-conf: https://github.com/xresloader/xresconv-conf
.. _dynamic-message-net: https://github.com/xresloader/DynamicMessage-net
.. _xres-code-generator: https://github.com/xresloader/xres-code-generator
.. _xresloader-dump-bin: https://github.com/xresloader/xresloader-dump-bin


v2.11.0-rc2及以前版本更新迁移指引
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

由于 v2.11.0-rc3 版本变更了默认的索引器，导致对Excel一些内置的数据类型处理和先前有一些差异。比如对于日期时间类型、百分率等。
现在会先转出原始的文本，再根据protocol的目标类型做转换。如果需要回退到老的POI索引，可以使用 ``--enable-excel-formular`` 选项切换到老的索引器。

新版本开始使用JDK 11打包，如果仍然需要 JDK1.8打包请自行下载源码并修改 ``pom.xml`` 内 ``maven-compiler-plugin`` 的 ``source`` 和 ``target`` 后使用 ``mvn package`` 命令打包。


`xresloader`_ 主要文档分为以下几个模块:

* :ref:`user-docs`
* :ref:`development-docs`
* :ref:`about-docs`

.. _user-docs:

.. toctree::
   :maxdepth: 3
   :caption: 用户文档

   users/download
   users/quick_start
   users/xresloader_core
   users/data_mapping
   users/output_format
   users/xresconv
   users/data_types
   users/xres_code_generator
   users/advance_usage
   users/ecosystem_and_tools
   users/faq

.. _development-docs:

.. toctree::
   :maxdepth: 3
   :caption: 开发文档

   development/dependency
   development/build
   development/pkg_source
   development/design_xresloader
   development/design_xresconv

.. _about-docs:

.. toctree::
   :caption: 其他

   LICENSE
   about

.. 
    * :ref:`genindex`
    * :ref:`modindex` 
    * :ref:`search`
