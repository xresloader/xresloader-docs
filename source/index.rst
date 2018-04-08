xresloader文档
===============================================

`xresloader`_ 是一组用于把Excel数据结构化并导出为程序可读的数据文件的导表工具集。它包含了一系列跨平台的工具、协议描述和数据读取代码。

`xresloader`_ 可以把Excel数据按开发者指定的结构输出成 **基于协议的二进制** 、**Msgpack二进制** 、**Lua代码** 、**Javascript代码** 、**XML** 和 **JSON** 等格式。并且提供一系列读取数据的方法。

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