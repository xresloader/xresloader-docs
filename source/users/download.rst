下载工具集
===============

+-------------------------------------+---------------------------------------------------------+
|                模块或工具           |                            下载地址                     |
+=====================================+=========================================================+
| 转表工具-xresloader                 | `xresloader release`_                                   |
+-------------------------------------+---------------------------------------------------------+
| 命令行批量转表工具-xresconv-cli     | `xresconv-cli release`_                                 |
+-------------------------------------+---------------------------------------------------------+
| GUI批量转表工具-xresconv-gui        | `xresconv-gui release`_                                 |
+-------------------------------------+---------------------------------------------------------+
| 批量转表配置模板仓库-xresconv-conf  | `xresconv-conf`_                                        |
+-------------------------------------+---------------------------------------------------------+

.. _xresloader release: https://github.com/xresloader/xresloader/releases
.. _xresconv-cli release: https://github.com/xresloader/xresconv-cli/releases
.. _xresconv-gui release: https://github.com/xresloader/xresconv-gui/releases
.. _xresconv-conf: https://github.com/xresloader/xresconv-conf

- **转表工具-xresloader** 下载任意jar文件即可
- **命令行批量转表工具-xresconv-cli** 下载压缩包并使用里面的*xresconv-cli.py*文件
- **GUI批量转表工具-xresconv-gui** 下载对应平台的发布包即可
- **批量转表配置模板仓库-xresconv-conf** 是给 `xresconv-cli release`_ 或 `xresconv-gui release`_ 使用的配置列表文件。
  `sample.xml <https://github.com/xresloader/xresconv-conf/blob/master/sample.xml>`_ 文件是功能完整的配置示例。
  同时，配置文件支持include其他xml配置并做一些配置覆盖，`sample_include.xml <https://github.com/xresloader/xresconv-conf/blob/master/sample_include.xml>`_ 文件是include功能的示例。
  批量转表配置文件里配置的路径必须是绝对路径或者相对于xml配置文件的路径。
