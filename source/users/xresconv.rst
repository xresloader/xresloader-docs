批量转表工具
=============================================

.. _xresloader: https://github.com/xresloader/xresloader
.. _xresconv-cli: https://github.com/xresloader/xresconv-cli
.. _xresconv-gui: https://github.com/xresloader/xresconv-gui
.. _xresconv-conf: https://github.com/xresloader/xresconv-conf

在实际项目中，我们一般会同时涉及几十甚至上百张表。为了统一配置，我们提供了批量转表工具。
批量转表分为 `命令行批量转表工具-xresconv-cli <xresconv-cli>`_ 和 `GUI批量转表工具-xresconv-gui <xresconv-gui>`_ 两个工具。

前者用于服务器和客户端发布流程的集成，后者主要提供给临时转表和策划验证数据时可以拿来转出部分数据。
这两个工具都以 `批量转表配置模板仓库-xresconv-conf <xresconv-conf>`_ 中的配置为配置规范。

我们在 :ref:`快速上手-配置批量转表配置文件 <quick-start-configure-sheme>` 章节里也提供了一个简单的例子：

.. literalinclude:: ../sample/quick_start/sample-conf/sample.xml
    :language: xml
    :encoding: utf-8

更多具体的配置说明如下： 

.. literalinclude:: ../sample/xresconv_conf.xml
    :language: xml
    :encoding: utf-8

如上时所有支持的标签的说明及示例配置。

除了前面章节提及过的字段外，还有一些特别的配置。

+ ``//root/include`` : 包含其他配置文件。相当于把其他配置文件离得配置复制过来。然后这个文件里有重复得配置则覆盖之。
+ ``//root/global/work_dir`` : 运行 `xresloader`_ 的目录。如果是相对目录的话相对于xml配置文件。
+ ``//root/global/xresloader_path`` : `xresloader`_ 的jar包的路径。如果是相对目录的话相对于xml配置文件。
+ ``//root/global/java_option`` : 用于传给java命令。所有的条目都会附加到java选项种。比如示例种的 ``-Xmx2048m`` 用于设置最大堆为2GB，用于对于比较大的Excel导表的时候可能会临时占用较高内存。
+ ``//root/global/default_scheme`` : 默认的导表映射关系的配置（详见 :ref:`data-mapping-available-options` ）。对所有转换条目都会附加这里面的配置项。可多个。
+ ``//root/list/item/scheme`` : 导表映射关系的配置（详见 :ref:`data-mapping-available-options` ）。如果和上面 ``default_scheme``  冲突则会覆盖默认配置，仅对这个条目生效。可多个。
+ ``//root/list/item/option`` : 运行 `xresloader`_ 的额外附加参数（详见 :doc:`./xresloader_core` ）。比如使用 ``--enable-empty-list`` 可以不移除Excel里的空数据，仅对这个条目生效。可多个。


其他得配置看内容应该比较容易理解，唯一有个仅用于 `GUI工具 <xresconv-gui>`_ 的配置： ``//root/gui/set_name`` 需要特别说明一下。
这是里面必须是一个有效的javascript函数，参数只有一个，结构是

.. code-block:: javascript

    {
        id: "ID",
        file: "文件名",
        scheme: "涉及的scheme表名称",
        name: "该条目名称，将显示在GUI得树形展示区",
        cat: "该条目的分类",
        options: [ "选项列表，对应option配置" ],
        desc: 描述信息,
        scheme_data: { "转换规则数据，对应scheme和default_scheme配置" }
    }

这个结构。在 `GUI工具 <xresconv-gui>`_ 显示每个条目的时候会运行这个函数并传入上述结构，在函数离我们可以通过改变 ``name`` 和 ``desc`` 来改变 `GUI工具 <xresconv-gui>`_ 工具的显示内容。

比如 `批量转表配置模板仓库-xresconv-conf <xresconv-conf>`_ 中的 ``sample.xml`` 文件，我们给所有条目的名字附加上了不带后缀的文件名。
