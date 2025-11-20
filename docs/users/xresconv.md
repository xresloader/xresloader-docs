---
title: 批量转换 xresconv
description: 批量配置转换器 xresconv 的使用方法
---
# 批量转表工具

## 批量转表 - GUI和CLI工具示例

在实际项目中，我们一般会同时涉及几十甚至上百张表。为了统一配置，我们提供了批量转表工具。 批量转表分为 命令行批量转表工具-[xresconv-cli](https://github.com/xresloader/xresconv-cli) 和 GUI批量转表工具-[xresconv-gui](https://github.com/xresloader/xresconv-gui) 两个工具。

前者用于服务器和客户端发布流程的集成，后者主要提供给临时转表和策划验证数据时可以拿来转出部分数据。 这两个工具都以 [批量转表配置模板仓库-xresconv-conf](https://github.com/xresloader/xresconv-conf) 中的配置为配置规范。

![image](/img/users/quick_start_cli_sample.gif)

以上为 命令行批量转表工具-[xresconv-cli](https://github.com/xresloader/xresconv-cli) 的输出示例。

![image](/img/users/quick_start_gui_sample.gif)

以上为 GUI批量转表工具-[xresconv-gui](https://github.com/xresloader/xresconv-gui) 的输出示例。

## 批量转表 - 配置示例

我们在 `[快速上手-配置批量转表配置文件](./quick-start#quick-start-configure-sheme)` 章节里也提供了一个简单的例子：

```xml title="sample/quick_start/sample-conf/sample.xml"
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <global>
        <work_dir desc="工作目录，相对于当前xml的目录，我们的Excel文件放在这里">.</work_dir>
        <xresloader_path desc="指向前面下载的 转表工具-xresloader，相对于当前xml的目录">../xresloader/target/xresloader-2.9.0.jar</xresloader_path>

        <proto desc="协议类型，-p选项">protobuf</proto>
        <output_type desc="输出类型，对应-t选项，输出二进制">bin</output_type>
        <output_type desc="多种输出时可以额外定义某个节点的重命名规则" rename="/(?i)\.bin$/\.json/">json</output_type>
        <proto_file desc="协议描述文件，-f选项">kind.pb</proto_file>

        <output_dir desc="输出目录，-o选项">../sample-data</output_dir>
        <data_src_dir desc="数据源目录，-d选项"></data_src_dir>

        <java_option desc="java选项-最大内存限制2GB">-Xmx2048m</java_option>
        <java_option desc="java选项-客户端模式">-client</java_option>

        <default_scheme name="KeyRow" desc="默认scheme模式参数-Key行号，对应上面Id、Level、CostType、CostValue那一行">2</default_scheme>
        <option desc="全局自定义选项" name="美化文本输出，缩进为2个空格">--pretty 2</option>
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
            <scheme name="DataSource" desc="数据源(文件名|表名|数据起始行号,数据起始列号)">role_tables.xlsx|upgrade_10001|3,1</scheme>
            <scheme name="ProtoName" desc="协议名">role_upgrade_cfg</scheme>
            <scheme name="OutputFile" desc="输出文件名">role_upgrade_cfg.bin</scheme>
        </item>
    </list>
</root>
```

## 批量转表 - 配置结构规范

```xml title="sample/xresconv_conf.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!-- <?xml-stylesheet type="text/xsl" href="helper/view.xsl"?> -->
<root>
    <include desc="可以包含其他文件配置，然后本文件里的配置将会覆盖或合并配置，相对于当前xml的目录">sample.xml</include>
    <global>
        <work_dir desc="工作目录，相对于当前xml的目录">../xresloader/sample</work_dir>
        <xresloader_path desc="xresloader地址，相对于当前xml的目录">../target/xresloader-2.22.3.jar</xresloader_path>

        <proto desc="协议类型，-p选项">protobuf</proto>
        <output_type desc="输出类型，-t选项，支持多个同时配置多种输出">bin</output_type>
        <output_type desc="多种输出时可以额外定义某个节点的重命名规则" rename="/(?i)\.bin$/\.json/">json</output_type>
        <output_type desc="可以通过指定class来限制输出的规则" rename="/(?i)\.bin$/\.csv/" class="client" >ue-csv</output_type>
        <!-- output_type 里的class标签对应下面item里的class标签，均可配置多个，多个用空格隔开，任意一个class匹配都会启用这个输出 -->
        <proto_file desc="协议描述文件，-f选项">proto_v3/kind.pb</proto_file>

        <output_dir desc="输出目录，-o选项"></output_dir>
        <data_src_dir desc="数据源目录，-d选项"></data_src_dir>
        <data_version desc="数据版本号，留空则自动生成">1.0.0.0</data_version>

        <rename desc="重命名规则，正则表达式：/搜索模式/替换内容/，对应xresloader的-n选项, 如果在output_type里设置了rename，以output_type里的rename为准，否则使用这里的全局配置" placeholder="/(?i)\.bin$/\.json/"></rename>

        <java_option desc="java选项-最大内存限制2GB">-Xmx2048m</java_option>
        <java_option desc="java选项-客户端模式">-client</java_option>

        <default_scheme name="KeyRow" desc="默认scheme模式参数-Key行号">2</default_scheme>
        <default_scheme name="MacroSource" desc="默认scheme模式参数-Key行号">资源转换示例.xlsx|macro|2,1</default_scheme>
    </global>

    <groups desc="分组信息">
        <group id="client" name="客户端"></group>
        <group id="server" name="服务器"></group>
    </groups>

    <category desc="类信息">
        <tree id="all_cats" name="大分类">
            <tree id="kind" name="角色配置"></tree>
        </tree>
        <tree id="test" name="测试"></tree>
    </category>

    <list>
        <item file="资源转换示例.xlsx" scheme="scheme_kind" name="人物表" cat="kind" class="server"></item>
        <item file="资源转换示例.xlsx" scheme="scheme_upgrade" name="升级表" cat="kind" class="server">
            <option desc="自定义选项" name="移除空列表项">--disable-empty-list</option>
        </item>
        <item name="嵌套数组测试" cat="test" class="client server">
            <scheme name="DataSource" desc="数据源(文件名|表名|数据起始行号,数据起始列号)">资源转换示例.xlsx|arr_in_arr|3,1</scheme>
            <scheme name="ProtoName" desc="协议名">arr_in_arr_cfg</scheme>
            <scheme name="OutputFile" desc="输出文件名">arr_in_arr_cfg.bin</scheme>
        </item>
    </list>

    <gui>
        <set_name desc="这个脚本用于修改树形节点的显示数据,便于策划核对具体的表名">
            if (item_data.file) {
                item_data.name += " (" + item_data.file.match(/([^.]+)\.\w+$/)[1] + ")"
            }
        </set_name>
        <on_before_convert type="text/javascript" timeout="15000" description="事件执行结束必须调用resolve(value)或reject(reason)函数，以触发进行下一步">
            // 这里可以执行nodejs代码，比如下面是Windows平台执行 echo work_dir
            var os = require("os");
            var spawn = require("child_process").spawn;
            if (os.type().substr(0, 7).toLowerCase() == "windows") {
                var exec = spawn("cmd", ["/c", "echo " + work_dir], {
                    cwd: work_dir,
                    encoding: 'utf-8'
                });
                exec.stdout.on("data", function(data) {
                    log_info(data);
                });
                exec.stderr.on("data", function(data) {
                    log_error(data);
                });
                exec.on("error", function(data) {
                    log_error(data.toString());
                    resolve();
                    // reject("执行失败" + data.toString());
                });
                exec.on("exit", function(code) {
                    if (code === 0) {
                        resolve();
                    } else {
                        resolve();
                        // reject("执行失败");
                    }
                });
            } else {
                resolve();
            }
        </on_before_convert>
        <on_after_convert type="text/javascript" timeout="60000" description="事件执行结束必须调用resolve(value)或reject(reason)函数，以触发进行下一步">
            // 同上
            alert_warning("自定义转表完成后事件，可以执行任意nodejs脚本");
            resolve();
        </on_after_convert>
        <script name="自定义脚本" desc="用于自定义按钮" type="text/javascript">
            // 同上
            resolve();
        </script>
    </gui>
</root>
```

如上是所有支持的标签的说明及示例配置。

除了前面章节提及过的字段外，还有一些特别的配置。

- `//root/include` : 包含其他配置文件。相当于把其他配置文件离得配置复制过来。然后这个文件里有重复得配置则覆盖之。

- `//root/global/work_dir` : 运行 [xresloader](https://github.com/xresloader/xresloader) 的目录。如果是相对目录的话相对于xml配置文件。

- `//root/global/xresloader_path` : [xresloader](https://github.com/xresloader/xresloader) 的jar包的路径。如果是相对目录的话相对于xml配置文件。

- `//root/global/java_option` : 用于传给java命令。所有的条目都会附加到java选项种。比如示例种的 `-Xmx2048m` 用于设置最大堆为2GB，用于对于比较大的Excel导表的时候可能会临时占用较高内存。

- `//root/global/default_scheme` : 默认的导表映射关系的配置（详见 `data-mapping-available-options` ）。对所有转换条目都会附加这里面的配置项。可多个。

- `//root/list/item/scheme` : 导表映射关系的配置（详见 `data-mapping-available-options` ）。如果和上面 `default_scheme` 冲突则会覆盖默认配置，仅对这个条目生效。可多个。

- `//root/list/item/option` : 运行 [xresloader](https://github.com/xresloader/xresloader) 的额外附加参数（详见 `./xresloader_core` ）。比如使用 `--enable-empty-list` 可以不移除Excel里的空数据，仅对这个条目生效。可多个。

- `//root/global/output_type[class]` : 如果 `output_type` 中配置了 `class` 属性，则这个输出类型仅对 `//root/list/item` 中也配置了同名 `class` 属性的条目生效。 此特性可用于比如让 `UE-Csv` 或 `UE-Json` 的输出仅对客户端配置生效。`class` 属性可以设置多个，多个用空格隔开，配置多个时任意一个匹配都会启用 `output_type`。

- `//root/global/output_type[tag]` : 如果 `output_type` 中配置了 `tag` 属性，则这个输出类型仅对 `//root/list/item` 中也配置了同名 `tag` 属性的条目生效。 此特性可用于比如让 `UE-Csv` 或 `UE-Json` 的输出仅对客户端配置生效。`tag` 属性可以设置多个，多个用空格隔开，配置多个时任意一个匹配都会启用 `output_type`。

## CLI批量转表工具 - 启动参数

CLI工具在命令行或终端中执行，可用参数可以直接加 `-h` 查看。

## GUI批量转表工具 - 启动参数

- `--input <文件名>` ： 指定初始的转表清单文件。

- `--debug-mode` ： 开启debug模式并启动开发人员工具。（便于调试自定义事件）

- `--custom-selector/--custom-button <json文件名>` : 增加自定义选择器（自定义按钮）,允许多个。（2.3.0版本及以上）

## GUI批量转表工具 - 特殊事件

GUI工具 [xresconv-gui](https://github.com/xresloader/xresconv-gui) 从2.1.0版本开始提供了一些特殊事件，便于用来做工具集成。事件响应内容必须是 [node.js](https://nodejs.org/) 代码，可以通过 `require('包名')` 来导入所有官方内置的模块。事件响应上下文还额外提供了一些接口用于和框架交互：

### GUI事件 - 显示转表项名称 `//root/gui/set_name`

配置示例:

```xml
<gui>
    <set_name description="设置转表项的名字字段，每个转表项会调用一次">
        if (item_data.file) {
            item_data.name += " (" + item_data.file.match(/([^.]+)\.\w+$/)[1] + ")"; // 显示名称追加数据源文件名
        }
    </set_name>
</gui>
```

事件接口和属性变量:

```javascript
{
    work_dir: "工作目录(要求版本>=2.2.0)",
    configure_file: "载入的配置文件路径(要求版本>=2.2.0)",
    item_data: {
        id: "条目ID",
        file: "数据源文件",
        scheme: "数据源scheme表名",
        name: "描述名称",
        cat: "分类名称",
        options: ["额外选项"],
        desc: "描述信息",
        scheme_data: {"元数据Key": "元数据Value"},
        tags: ["tag列表"],     // 版本 >= 2.2.3
        classes: ["class列表"] // 版本 >= 2.2.3
    },
    data: {},                                               // 绑定在事件上的私有数据,可用于保存全局状态, 版本 >= 2.3.0
    alert_warning: function(content, title, options) {},    // (要求版本>=2.2.0) 警告弹框， options 结构是 {yes: 点击是按钮回调, no: 点击否按钮回调, on_close: 关闭后回调}
    alert_error: function(content, title) {},               // (要求版本>=2.2.0) 错误弹框
    log_info: function (content) {},                        // (要求版本>=2.2.0) 打印info日志
    log_notice: function (content) {},                      // 打印notice日志, 版本 >= 2.3.0
    log_warning: function (content) {},                     // 打印warning日志, 版本 >= 2.3.0
    log_error: function (content) {}                        // (要求版本>=2.2.0) 打印error日志
}
```

比如 [批量转表配置模板仓库-xresconv-conf](https://github.com/xresloader/xresconv-conf) 中的 `sample.xml` 文件，我们给所有条目的名字附加上了不带后缀的文件名。

### GUI事件 - 转表前事件和转表成功后事件 `//root/gui/on_before_convert` 和 `//root/gui/on_after_convert`

**注意在** `//root/gui/on_before_convert` **和** `//root/gui/on_after_convert` **事件中，执行完成以后一定要调用** `resolve()` **来通知上层框架执行成功，或调用** `reject("错误消息")` **来通知上层框架执行失败。** **否则执行会一直等待到超时然后失败结束。**

配置示例(创建子进程):

```html
<gui>
    <on_before_convert name="转表开始前事件" type="text/javascript" timeout="15000" description="事件执行结束必须调用resolve(value)或reject(reason)函数，以触发进行下一步">
        // 这里可以执行nodejs代码，比如下面是Windows平台执行 echo work_dir
        var os = require("os");
        var spawn = require("child_process").spawn;
        if (os.type().substr(0, 7).toLowerCase() == "windows") {
            var exec = spawn("cmd", ["/c", "echo " + work_dir], {
                cwd: work_dir,
                encoding: 'utf-8'
            });
            exec.stdout.on("data", function(data) {
                log_info(data);
            });
            exec.stderr.on("data", function(data) {
                log_error(data);
            });
            exec.on("error", function(data) {
                log_error(data.toString());
                resolve();
                // reject("执行失败" + data.toString());
            });
            exec.on("exit", function(code) {
                if (code === 0) {
                    resolve();
                } else {
                    resolve();
                    // reject("执行失败");
                }
            });
        } else {
            resolve();
        }
    </on_before_convert>

    <on_after_convert name="转表完成后事件" type="text/javascript" timeout="60000" description="事件执行结束必须调用resolve(value)或reject(reason)函数，以触发进行下一步">
        // 同上
        alert_warning("自定义转表完成后事件，可以执行任意nodejs脚本");
        resolve();
    </on_after_convert>
</gui>
```

在这是里面必须是一个有效的nodejs代码，其中 `//root/gui/on_before_convert[timeout]` 和 `//root/gui/on_after_convert[timeout]` 可以用于控制超时时间，单位是毫秒。 传入的参数是：

```javascript
{
    work_dir: "执行xresloader的工作目录",
    configure_file: "载入的配置文件路径(要求版本>=2.2.0)",
    xresloader_path: "xresloader目录",
    global_options: {"全局选项": "VALUE"},
    selected_nodes: ["选中要执行转表的节点集合"],
    selected_items: ["选中要执行转表的item对象集合,数据结构同上面的 item_data"], // 版本 >= 2.2.3
    run_seq: "执行序号",
    data: {},                                               // 绑定在事件上的私有数据,可用于保存全局状态, 版本 >= 2.3.0
    alert_warning: function(content, title, options) {},    // 警告弹框， options 结构是 {yes: 点击是按钮回调, no: 点击否按钮回调, on_close: 关闭后回调}
    alert_error: function(content, title) {},               // 错误弹框
    log_info: function (content) {},                        // 打印info日志
    log_error: function (content) {},                       // 打印error日志
    log_notice: function (content) {},                      // 打印notice日志, 版本 >= 2.3.0
    log_warning: function (content) {},                     // 打印warning日志, 版本 >= 2.3.0
    resolve: function (value) {},                           // 通知上层执行结束,相当于Promise的resolve
    reject: function(reason) {},                            // 通知上层执行失败,相当于Promise的reject
    require: function (name) {}                             // 相当于 nodejs的 require(name) 用于导入nodejs 模块
}
```

在 [批量转表配置模板仓库-xresconv-conf](https://github.com/xresloader/xresconv-conf) 中的 `sample.xml` 文件中也有示例。

## GUI批量转表工具 - 自定义按钮

### GUI自定义按钮 - 基本配置

从 2.3.0 版本开始，GUI工具增加了启动参数 `--custom-selector/--custom-button <json文件名>`来自定义选择器（自定义按钮）。其中 `json` 文件的配置格式如下:

```javascript
[{
    "name": "选择器按钮名称",                           // [必须] 按钮显示名称
    "by_schemes": [{                                    // [必须] item里配置file和scheme属性的选取规则（by_schemes和by_sheets里至少要配置一个）
        "file": "文件名, 比如: 资源转换示例.xlsx",      // [必须]
        "scheme": "转表规则名, 比如: scheme_upgrade"    // [可选] 此项可以为空，如果为空会命中所有file匹配的条目
    }],
    "by_sheets": [{                                     // [必须] item里的DataSource子节点配置DataSource的选取规则（by_schemes和by_sheets里至少要配置一个）
        "file": "文件名, 比如: 资源转换示例.xlsx",      // [必须]
        "sheet": "文件名, 比如: arr_in_arr"             // [可选] 此项可以为空，如果为空会命中所有DataSource中第一个选项和file匹配的条目
    }],
    "default_selected": false,                          // [可选] 默认选中
    "style": "outline-secondary",                       // [可选] 按钮Style。默认: outline-secondary
    // "action": ["unselect_all", "reload"]             // [可选] 特殊行为，具体内容请参考下面的文档。
}]  // 数组，可以多个按钮
```

上面的配置里， `file` 、 `scheme` 、 `sheet` 字段都支持 `完全匹配的名称` 、 `glob: 通配符` 和 `regex: 正则表达式` 三种形式。

特殊行为字段 **action** 可以控制按钮使用一些特殊功能而不是简单地选择和反选匹配项，目前支持的特殊功能如下:

- `reload` : 重新加载自定义按钮
- `select_all` : 全部选中
- `unselect_all` : 全部反选
- `script: <脚本名字>` : 执行脚本，\*\*脚本名字\*\* 为 `//root/gui/script` 节点的 `name` 属性。

### GUI自定义按钮 - 自定义脚本（点击回调）

上述配置中， `script: <脚本名字>` 里的 **脚本名字** 指向输入XML中 `//root/gui/script[name=脚本名字]` 的节点。比如如下配置中:

```xml
<gui>
    <script name="自定义脚本" type="text/javascript">
        // 同上
        data.call_times = (data.call_times || 0) + 1;
        alert_warning("自定义脚本，可用于自定义按钮");
        log_notice(`自定义脚本:\n可用于自定义按钮 - notice日志(${data.call_times})`);
        log_warning("自定义脚本\n可用于自定义按钮 - warning日志");
        // resolve();
        data.running = false;
        resolve();
    </script>
</gui>
```

我们可以把action配置成 `["script: 自定义脚本"]` 来让点击按钮的时候执行这段脚本。和事件一样，这个脚本是一段 [node.js](https://nodejs.org/) 代码，额外提供的函数和属性变量有:

```javascript
{
    work_dir: "执行xresloader的工作目录",
    xresloader_path: "xresloader目录",
    global_options: {"全局选项": "VALUE"},
    selected_nodes: ["选中要执行转表的节点集合"],
    selected_items: ["选中要执行转表的item对象集合,数据结构同上面的 item_data"],
    data: {},                                               // 绑定在按钮上的私有数据,可用于保存全局状态
    alert_warning: function(content, title, options) {},    // 警告弹框， options 结构是 {yes: 点击是按钮回调, no: 点击否按钮回调, on_close: 关闭后回调}
    alert_error: function(content, title) {},               // 错误弹框
    log_info: function (content) {},                        // 打印info日志
    log_notice: function (content) {},                      // 打印notice日志
    log_warning: function (content) {},                     // 打印warning日志
    log_error: function (content) {},                       // 打印error日志
    resolve: function (value) {},                           // 通知上层执行结束,相当于Promise的resolve
    reject: function(reason) {},                            // 通知上层执行失败,相当于Promise的reject
    require: function (name) {}                             // 相当于 nodejs的 require(name) 用于导入nodejs 模块
}
```

### GUI自定义按钮 - 按钮样式

按钮风格默认是 `` `outline-secondary ``` 。可选项为(详见: [https://getbootstrap.com/docs/5.0/components/buttons/](https://getbootstrap.com/docs/5.0/components/buttons/)):

- outline-primary
- outline-secondary
- outline-success
- outline-danger
- outline-warning
- outline-info
- outline-light
- outline-dark
- primary
- secondary
- success
- danger
- warning
- info
- light
- dark

自定义按钮在 [批量转表配置模板仓库-xresconv-conf](https://github.com/xresloader/xresconv-conf) 中的 `sample.xml` 和 [xresconv-gui](https://github.com/xresloader/xresconv-gui) 中的 `doc/custom-selector.json` 文件里也有相应示例。
