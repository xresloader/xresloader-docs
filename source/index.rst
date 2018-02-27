.. xresloader-document documentation master file, created by
   sphinx-quickstart on Tue Feb 27 14:29:08 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

xresloader文档
===============================================

`xresloader`_ 是一组用于把Excel数据结构化并导出为程序可读的数据文件的导表工具集。它包含了一系列的工具、协议描述和数据读取代码。

+----------------------------------------------+--------------------------------------------------------------------------------------+
|                    构建环境                  |                               Linux (Oracle JDK 8)                                   |
+==============================================+======================================================================================+
|         `xresloader`_ 当前构建状态           | .. image:: https://travis-ci.org/xresloader/xresloader.svg?branch=master             |
|                                              |    :alt: Build Status                                                                |
+----------------------------------------------+--------------------------------------------------------------------------------------+
|                  文档构建状态                | .. image:: https://readthedocs.org/projects/xresloader-docs/badge/?version=latest    |
|                                              |    :alt: Documentation Status                                                        |
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
   users/data_loading
   users/data_types
   users/advance_usage
   users/xresconv
   users/faq

.. _development-docs:

.. toctree::
   :maxdepth: 2
   :caption: 开发文档

   development/dependency
   development/build
   development/maven_source
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
