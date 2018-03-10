快速上手
===============

.. _kind.proto: https://github.com/xresloader/xresloader/blob/master/sample/proto_v3/kind.proto
.. _资源转换示例.xlsx: https://github.com/xresloader/xresloader/blob/master/sample/%E8%B5%84%E6%BA%90%E8%BD%AC%E6%8D%A2%E7%A4%BA%E4%BE%8B.xlsx
.. _sample.xml: https://github.com/xresloader/xresconv-conf/blob/master/sample.xml

Step-1: 下载转表工具
-----------------------------------------------

#. 打开 :doc:`download` 。下载最新版本的 **转表工具-xresloader** (xresloader-\*.jar)。
#. 如果要使用命令行版本的批量转换工具则要额外下载 **命令行批量转表工具-xresconv-cli**
#. 如果要使用GUI版本的批量转换工具则要额外下载 **GUI批量转表工具-xresconv-gui**
#. 下载或自己编译protobuf官方的protoc工具，可以去 https://github.com/google/protobuf/releases 下载预编译好的protoc


Step-2: 配置结构化的protobuf协议并使用protoc
-----------------------------------------------
我们需要先写协议描述文件，到时候转出的数据也是按这个结构打包的。比如，`kind.proto`_: ::

    syntax = "proto3";
    message role_upgrade_cfg {
        uint32 Id = 1;
        uint32 Level = 2;
        uint32 CostType = 3;
        int32 CostValue = 4;
        int32 ScoreAdd = 5;
    }

proto v2也可以，可以参见 https://github.com/xresloader/xresloader/blob/master/sample/proto_v2/kind.proto 。

然后使用protoc生成描述文件和用于加载的代码文件: ::

    protoc -I . -o kind.pb --cpp_out=. kind.proto ;

这是最终的 **数据转出目标** 。

Step-3: 配置Excel数据源
-----------------------------------------------

按照协议的配置编辑Excel文件，`资源转换示例.xlsx`_ ，我们使用表名 ``upgrade_10001`` 。
第一行设为描述，第二行设置为字段映射列，后面是数据(具体设置请参照 :ref:`quick-start-configure-sheme`)。

+-----------+---------+-------------+--------------+
|  角色ID   |   等级  |   货币类别  |   消耗值     |
+===========+=========+=============+==============+
|   Id      | Level   | CostType    | CostValue    |
+-----------+---------+-------------+--------------+
|   10001   | 1       |             |              |
+-----------+---------+-------------+--------------+
|   10001   | 2       | 10001       | 50           |
+-----------+---------+-------------+--------------+
|   10001   | 3       | 10001       | 100          |
+-----------+---------+-------------+--------------+
|   10001   | 4       | 10001       | 150          |
+-----------+---------+-------------+--------------+
|   10001   | 5       | 10001       | 200          |
+-----------+---------+-------------+--------------+
|   10001   | 6       | 10001       | 250          |
+-----------+---------+-------------+--------------+
|   10001   | 7       | 10001       | 300          |
+-----------+---------+-------------+--------------+
|   10001   | 8       | 10001       | 350          |
+-----------+---------+-------------+--------------+
|   10001   | 9       | 10001       | 400          |
+-----------+---------+-------------+--------------+
|   10001   | 10      | 10001       | 450          |
+-----------+---------+-------------+--------------+
|   10001   | 11      | 10001       | 500          |
+-----------+---------+-------------+--------------+

这是最终的 **数据来源** 。

.. _quick-start-configure-sheme:

Step-4: 配置批量转表配置文件
-----------------------------------------------

编辑配置转表配置，`sample.xml`_ 。这个文件用于告诉批量转表工具，xresloader的位置、工作目录从哪里读协议描述文件，如果映射字段转成什么类型等等。
简而言之就是把 **数据转出目标** 和 **数据来源** 关联起来。

::

    <?xml version="1.0" encoding="UTF-8"?>
    <root>
        <global>
            <work_dir desc="工作目录，相对于当前xml的目录，我们的Excel文件放在这里">../xresloader/sample</work_dir>
            <xresloader_path desc="指向前面下载的 转表工具-xresloader，相对于当前xml的目录">../target/xresloader-1.4.1.jar</xresloader_path>

            <proto desc="协议类型，-p选项">protobuf</proto>
            <output_type desc="输出类型，对饮-t选项，输出二进制">bin</output_type>
            <proto_file desc="协议描述文件，-f选项">proto_v3/kind.pb</proto_file>

            <output_dir desc="输出目录，-o选项"></output_dir>
            <data_src_dir desc="数据源目录，-d选项"></data_src_dir>

            <java_option desc="java选项-最大内存限制2GB">-Xmx2048m</java_option>
            <java_option desc="java选项-客户端模式">-client</java_option>

            <default_scheme name="KeyRow" desc="默认scheme模式参数-Key行号，对应上面Id、Level、CostType、CostValue那一行">2</default_scheme>
        </global>
        
        <groups desc="分组信息（可选）">
            <group id="client" name="客户端"></group>
            <group id="server" name="服务器"></group>
        </groups>

        <category desc="类信息（用于GUI工具的树形结构分类显示）">
            <tree id="all_cats" name="大分类">
                <tree id="kind" name="角色配置"></tree>
            </tree>
        </category>

        <list>
            <item name="升级表" cat="kind" class="client server">
                <scheme name="DataSource" desc="数据源(文件名|表名|数据起始行号,数据起始列号)">资源转换示例.xlsx|upgrade_10001|3,1</scheme>
                <scheme name="ProtoName" desc="协议名">role_upgrade_cfg</scheme>
                <scheme name="OutputFile" desc="输出文件名">role_upgrade_cfg.bin</scheme>
            </item>
        </list>
    </root>

对于``work_dir``和文件路径的说明: 

Step-5: 运行转表工具
-----------------------------------------------

转表工具可以把Excel数据源导出成多种输出。下面列举重要的几种，项目可以根据自己的情况选择一种或几种导出方式。

.. _export binary:

Step-5-1(推荐): 导出为协议二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _export text:

Step-5-2(可选): 导出为json、xml、lua代码等文本数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

如果需要做Web端的工具或者简化加载方式，可以使用导出成xml或者json或者代码。

.. _export enum:

Step-5-3(可选): 导出枚举类型成代码
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

如果有需要，可以选择导出协议里声明的枚举类型。比如导出Lua脚本，用以方便业务里复用。

Step-6: 加载数据
-----------------------------------------------

加载数据可以有多种方法，项目可以根据自己的需要选择任意一种或几种合适的加载方法。

Step-6-1(推荐): 使用C++加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`export binary`

Step-6-2(推荐): 使用lua-pbc加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`export binary`

Step-6-3(推荐): 使用C#和DynamicMessage-net加载二进制数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`export binary`

Step-6-4(可选): 使用node.js加载javascript文本数据
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`export text`

Step-6-5(可选): 使用lua加载导出的枚举类型
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此加载方式需要上面的 :ref:`export enum`