xresloader文档
===============================================

`xresloader`_ 是一组用于把Excel数据结构化并导出为程序可读的数据文件的导表工具集。它包含了一系列跨平台的工具、协议描述和数据读取代码。

主要功能特点：

* 跨平台（java 1.8 or upper）
* Excel => protobuf/msgpack/lua/javascript/json/xml
* 完整支持协议结构，包括嵌套结构和数组嵌套
* 同时支持protobuf proto v2 和 proto v3
* 支持导出proto枚举值到lua/javascript代码和json/xml数据
* 支持别名表，用于给数据内容使用一个易读的名字
* 支持验证器，可以在数据里直接填写proto字段名或枚举名，或者验证填入数据的是否有效
* 支持自动合表，把多个Excel数据表合并成一个输出文件
* 支持公式
* 支持空数据压缩（裁剪）或保留定长数组
* 支持基于正则表达式分词的字段名映射转换规则
* 支持设置数据版本号
* 提供CLI批量转换工具（支持python 2.7/python 3 @ Windows、macOS、Linux）
* 提供GUI批量转换工具（支持Windows、macOS、Linux）
* CLI/GUI批量转换工具支持include来实现配置复用

同时为了方便开发者在不同的开发环境和平台中使用同一份配置， `xresloader`_  还提供了把协议里的某些枚举量导出成协议层所没有原生支持的代码的功能。
比如，我们可以把protobuf描述的枚举类型导出成 ``json`` 或者 ``lua`` 代码，方便项目中使用。

+----------------------------------------------+--------------------------------------------------------------------------------------+
|                    构建环境                  |                               Linux (Oracle JDK 8)                                   |
+==============================================+======================================================================================+
|         `xresloader`_ 当前构建状态           | .. image:: https://travis-ci.org/xresloader/xresloader.svg?branch=master             |
|                                              |    :alt: Build Status                                                                | 
|                                              |    :target: https://travis-ci.org/xresloader/xresloader                              |
+----------------------------------------------+--------------------------------------------------------------------------------------+
|                  文档构建状态                | .. image:: https://readthedocs.org/projects/xresloader-docs/badge/?version=latest    |
|                                              |    :alt: Documentation Status                                                        |
|                                              |    :target: https://readthedocs.org/projects/xresloader-docs/                        |
+----------------------------------------------+--------------------------------------------------------------------------------------+

.. _xresloader: https://github.com/xresloader
.. _xresloader-core: https://github.com/xresloader/xresloader
.. _xresconv-cli: https://github.com/xresloader/xresconv-cli
.. _xresconv-gui: https://github.com/xresloader/xresconv-gui
.. _xresconv-conf: https://github.com/xresloader/xresconv-conf
.. _dynamic-message-net: https://github.com/xresloader/DynamicMessage-net

`xresloader`_ 主要文档分为以下几个模块:

* :ref:`user-docs`
* :ref:`development-docs`
* :ref:`about-docs`

.. _user-docs:

.. toctree::
   :maxdepth: 2
   :caption: 用户文档

   users/download
   users/quick_start
   users/xresloader_core
   users/data_mapping
   users/output_format
   users/xresconv
   users/data_types
   users/advance_usage
   users/faq

.. _development-docs:

.. toctree::
   :maxdepth: 2
   :caption: 开发文档

   development/dependency
   development/build
   development/pkg_source
   development/design_xresloader
   development/design_xresconv

.. _about-docs:

.. toctree::
   :caption: 其他

   about

.. 
    * :ref:`genindex`
    * :ref:`modindex` 
    * :ref:`search`