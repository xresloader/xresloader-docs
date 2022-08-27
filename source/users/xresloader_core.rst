转表引擎-xresloader
=============================================

.. _xresloader: https://github.com/xresloader/xresloader
.. _xresloader sample: https://github.com/xresloader/xresloader/tree/master/sample
.. _gen_sample_output.bat: https://github.com/xresloader/xresloader/blob/master/sample/gen_sample_output.bat
.. _gen_sample_output.ps1: https://github.com/xresloader/xresloader/blob/master/sample/gen_sample_output.ps1
.. _gen_sample_output.sh: https://github.com/xresloader/xresloader/blob/master/sample/gen_sample_output.sh
.. _gen_protocol.py: https://github.com/xresloader/xresloader/blob/master/sample/gen_protocol.py
.. _gen_protocol_v3.py: https://github.com/xresloader/xresloader/blob/master/sample/gen_protocol_v3.py

在 :doc:`./quick_start` 章节里我们提供了一个基本的转表使用流程。整个流程图示如下：

.. image:: ../_static/development/xresconv_process.png

无论GUI工具还是CLI工具还是数据和配置，最终都是汇聚到调用 `xresloader`_ 转表引擎命令进行汇总和执行转换。
本章节主要是针对 `xresloader`_ 转表引擎的说明。

xresloader-可用参数列表
---------------------------------------------

+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| 参数选项                             | 描述                             | 说明                                                          |
+======================================+==================================+===============================================================+
| ``-h --help``                        | 帮助信息                         | 显示帮助和支持的参数列表                                      |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-t --output-type``                 | 输出类型                         | + bin（默认值）                                               |
|                                      |                                  | + lua                                                         |
|                                      |                                  | + msgpack                                                     |
|                                      |                                  | + json                                                        |
|                                      |                                  | + xml                                                         |
|                                      |                                  | + javascript                                                  |
|                                      |                                  | + js                                                          |
|                                      |                                  | + ue-csv  (>=2.0.0版本)                                       |
|                                      |                                  | + ue-json (>=2.0.0版本)                                       |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-p --proto``                       | 协议描述类型                     | protobuf(默认值),capnproto(暂未实现),flatbuffer(暂未实现)     |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-f --proto-file``                  | 协议描述文件                     |                                                               |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-o --output-dir``                  | 输出目录                         | 默认为当前目录                                                |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-d --data-src-dir``                | 数据源根目录                     | 默认为当前目录                                                |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-s --src-file``                    | 数据源描述文件                   | 后缀可以是 .xls, .xlsx, .cvs, .xlsm                           |
|                                      | (scheme)                         |            .ods, .ini, .cfg, .conf, .json                     |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-m --src-meta``                    | 数据源描述                       | 可多个                                                        |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| 如果设置了 ``数据源描述文件`` ，这里填表名，否则这里可以直接填Key=主配置\|此配置\|补充配置的字符串。                                    |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-v --version``                     | 打印版本号                       |                                                               |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-n --rename``                      | 重命名输出文件名                 | 正则表达式 （如：``/(?i)\.bin$/\.lua/`` ）                    |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-c --const-print``                 | 输出协议描述中的常量             | 参数为字符串，表示输出的文件名                                |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-i --option-print``                | 输出协议描述中的选项             | 参数为字符串，表示输出的文件名                                |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``-a --data-version``                | 设置数据版本号                   | 参数为字符串，表示输出的数据的data_ver字段。                  |
|                                      |                                  | 如果不设置将按执行时间自动生成一个。                          |
|                                      |                                  | 会写出到转出数据的header中。                                  |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--pretty``                         | 格式化输出                       | 参数为整数，0代表关闭美化输出功能，大于0表示格式化时的缩进量  |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--enable-excel-formular``          | 开启Excel公式实时计算            | 默认开启                                                      |
|                                      |                                  | 2003版本的excel（\*\.xls）文件使用公式会大幅减慢转表速度      |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--disable-excel-formular``         | 关闭Excel公式支持                | 2003版的excel（\*\.xls）关闭公式会大幅加快转表速度            |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--disable-empty-list``             | 禁止空列表项                     | 默认开启。自动删除Excel中的空数据，不会转出到输出文件中       |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--enable-empty-list``              | 开启空列表项                     | 开启空列表项。未填充数据将使用默认值，并转出到输出文件中      |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--stdin``                          | 通过标准输入批量转表             | 通过标准输入批量转表，参数和上面的一样，每行都执行一次转表。  |
|                                      |                                  | 字符串参数可以用单引号或双引号包裹，但是都不支持转义。        |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--lua-global``                     | lua输出写到全局表                | 输出协议描述中的常量到Lua脚本时，同时导入符号到全局表_G中     |
|                                      |                                  | （仅对常量导出有效）                                          | 
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--lua-module``                     | lua输出使用module写出            | 输出Lua脚本时，使用 module(模块名, package.seeall) 导出到全局 |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--xml-root``                       | xml输出的根节点tag               | 输出格式为xml时的根节点的TagName                              |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--javascript-export``              | 导出javascript数据的模式         | 可选项：                                                      | 
|                                      |                                  |                                                               |
|                                      |                                  | * nodejs: 使用兼容nodejs的exports                             |
|                                      |                                  | * amd: 使用兼容amd的define                                    |
|                                      |                                  | * 其他: 写入全局（window或global）                            |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--javascript-global``              | 导出javascript全局空间           | 导出数据到全局时，可以指定写入的名字空间                      |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+
| ``--ignore-unknown-dependency``      | 忽略未知的协议的依赖             | 忽略未知的输入协议的依赖项(>=2.9.0版本)                       |
+--------------------------------------+----------------------------------+---------------------------------------------------------------+

批处理
---------------------------------------------

如果我们需要一次性转出多个表，可以使用 ``--stdin`` 选项，然后再标准输入里输入其他的配置参数。这时候我们认为每个非空行都是一个数据转换组。

比如在 `xresloader sample`_ 的bash命令中:

.. code-block:: bash

    echo '
        -t lua -p protobuf -o '$proto_dir'     -f '$proto_dir/kind.pb' --pretty 2 -i kind.desc.lua
        -t json -p protobuf -o '$proto_dir'    -f '$proto_dir/kind.pb' --pretty 2 -i kind.desc.json
        -t json -p protobuf -o '$proto_dir'    -f '$proto_dir/kind.pb' -s '$XLSX_FILE' -m scheme_kind -n "/(?i)\.bin$/\.json/"
        -t xml -p protobuf -o '$proto_dir'     -f '$proto_dir/kind.pb' -s '$XLSX_FILE' -m scheme_kind -n "/(?i)\.bin$/\.xml/"
        -t msgpack -p protobuf -o '$proto_dir' -f '$proto_dir/kind.pb' -s '$XLSX_FILE' -m scheme_kind -n "/(?i)\.bin$/\.msgpack.bin/"
        -t js -p protobuf -o '$proto_dir'      -f '$proto_dir/kind.pb' --pretty 2 -s '$XLSX_FILE' -m scheme_kind -n "/(?i)\.bin$/\.js/" --javascript-global sample 
        -t js -p protobuf -o '$proto_dir'      -f '$proto_dir/kind.pb' --pretty 2 -m DataSource='$XLSX_FILE'|kind|3,1 -m MacroSource='$XLSX_FILE'|macro|2,1 -m ProtoName=role_cfg -m OutputFile=role_cfg.n.js -m KeyRow=2 -m KeyCase=lower -m KeyWordSplit=_ -m "KeyWordRegex=[A-Z_\$ \t\r\n]|[_\$ \t\r\n]|[a-zA-Z_\$]" --javascript-export nodejs 
        -t js -p protobuf -o '$proto_dir'      -f '$proto_dir/kind.pb' --pretty 2 -s '$XLSX_FILE' -m scheme_kind -n "/(?i)\.bin$/\.amd\.js/" --javascript-export amd 
        -t lua -p protobuf -o '$proto_dir'     -f '$proto_dir/kind.pb' --pretty 2 -m DataSource='$XLSX_FILE'|arr_in_arr|3,1 -m MacroSource='$XLSX_FILE'|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=arr_in_arr_cfg.lua -m KeyRow=2 -o proto_v3
        -t bin -p protobuf -o '$proto_dir'     -f '$proto_dir/kind.pb' -m DataSource='$XLSX_FILE'|arr_in_arr|3,1 -m MacroSource='$XLSX_FILE'|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=arr_in_arr_cfg.bin -m KeyRow=2 -o proto_v3
        -t json -p protobuf -o '$proto_dir'    -f '$proto_dir/kind.pb' -s '$XLSX_FILE' -m scheme_upgrade -n "/(?i)\.bin$/\.json/"
        -t lua -p protobuf -o '$proto_dir'     -f '$proto_dir/kind.pb' -s '$XLSX_FILE' -m scheme_upgrade -n "/(?i)\.bin$/\.lua/"
        -t ue-csv -o '$proto_dir' -f '$proto_dir/kind.pb' -c KindConst.csv
        -t ue-json -o '$proto_dir' -f '$proto_dir/kind.pb' -c KindConst.json
        -t ue-csv -o '$proto_dir' -f '$proto_dir/kind.pb' -m DataSource='$XLSX_FILE'|arr_in_arr|3,1 -m MacroSource='$XLSX_FILE'|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=ArrInArrCfg.csv -m KeyRow=2 -m UeCfg-CodeOutput=|Public/Config|Private/Config
        -t ue-json -o '$proto_dir' -f '$proto_dir/kind.pb' -m DataSource='$XLSX_FILE'|arr_in_arr|3,1 -m MacroSource='$XLSX_FILE'|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=ArrInArrCfg.json -m KeyRow=2 -m UeCfg-CodeOutput=|Public/Config|Private/Config
    ' | java -client -jar "$XRESLOADER" --stdin;

这里就有10项转出文件。批处理有个优势是java在运行时会对字节码做JIT，批处理则会只对字节码编译一次，能比每个转出文件运行一次命令快很多。

| 我们之前的一个项在profile时发现每次运行java编译时间大约在1.5s，JIT编译前（一般Excel数据行的前10行）转表运行时间大约是0.5s，JIT编译后（即便是成百上千行数据行）运行时间大约是0.2s。
| 所以增加了批量转表功能，总体上把转表时间缩减到了分开执行的10%。这样我们在最后转出50多个表的时候也只需要几秒钟。


直接使用xresloader
---------------------------------------------

直接使用转表引擎（ `xresloader`_ ）的示例可以参见 `xresloader sample`_ 。里面有几乎所有的使用方法。
包括但不限于转出到代码、转出枚举量、使用proto2、使用proto3、转出加载代码、批量转出等等。

Windows下的执行入口是 `gen_sample_output.bat`_ 或 `gen_sample_output.ps1`_ 。 Linux/macOS/BSD 的执行入口是 `gen_sample_output.sh`_ 。

使用前需要先使用 `gen_protocol.py`_ 生成proto v2的协议描述文件和使用 `gen_protocol_v3.py`_ 生成proto v3的协议描述文件。
