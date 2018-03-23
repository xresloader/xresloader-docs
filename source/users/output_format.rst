数据的输出类型和数据加载
=============================================

所有输出的数据的结构都是按照 https://github.com/xresloader/xresloader/blob/master/header/pb_header_v3.proto 的 ``xresloader_datablocks`` 的结构。

转表功能和二进制数据读取的示例见： https://github.com/xresloader/xresloader/tree/master/sample

文本和Msgpack数据读取示例见： https://github.com/xresloader/xresloader/tree/master/loader-binding

下面我们对转出数据和加载进一步说明。

输出类型
-----------------------------------------------

在 :doc:`./xresloader_core` 里可以看到，转表工具可以把Excel数据源导出成多种输出。下面列举重要的几种，项目可以根据自己的情况选择一种或几种导出方式。比如如果做Web端的GM工具，可以使用导出成xml或者javascript代码。

.. _output-format-export binary:

导出为协议二进制数据 (推荐)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

对应 ``-t bin`` 。这是推荐的转出方式，导出的是 ``xresloader_datablocks`` 打包后的二进制数据，文件占用最小。任何支持protobuf的语言和开发环境都可以读取。

其中每个 ``data_block`` 数据块都对应Excel里的一行数据，里面的数据格式是用户指定的协议打包成二进制后的数据。

.. _output-format-export text:

导出为json、xml、lua代码等文本数据 (可选)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _output-format-export msgpack:

导出为Msgpack打包的二进制数据 (可选)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _output-format-export enum:

导出枚举类型成代码 (可选)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


数据加载
-----------------------------------------------

加载数据可以有多种方法，项目可以根据自己的需要选择任意一种或几种合适的加载方法。

Step-6-1(推荐): 使用C++加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`output-format-export binary`

Step-6-2(推荐): 使用lua-pbc加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`output-format-export binary`

Step-6-3(推荐): 使用C#和DynamicMessage-net加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`output-format-export binary`

Step-6-4(可选): 使用node.js加载javascript文本数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`output-format-export text`

Step-6-5(可选): 使用lua加载导出的枚举类型
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`output-format-export enum`