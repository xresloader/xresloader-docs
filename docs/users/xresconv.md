---
title: XML 配置与输出矩阵
description: xresconv-cli 和 GUI 共用的清单、路径、合并和输出筛选
---

# 批量转表配置

CLI 2.0.2 和 GUI 3.0.0 都采用 [xresconv-conf](https://github.com/xresloader/xresconv-conf)。清单把工作环境、输出格式和转换条目组织到一起；GUI 额外处理分类、脚本和选择器。首次运行见 [快速上手](./quick-start)，工具操作见 [CLI](./xresconv-cli) / [GUI](./xresconv-gui)。

## 批量转表 - GUI和CLI工具示例

CLI 适合自动化，GUI 适合交互选表。它们都调用 xresloader JAR，清单相同不代表 GUI 事件会在 CLI 中执行。

## 批量转表 - 配置示例

```xml title="sample.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!-- 可选：配合 xresconv-conf/helper/view.xsl 查看 XML。
     <?xml-stylesheet type="text/xsl" href="helper/view.xsl"?> -->
<root>
  <!-- 可选 include：路径相对于声明它的 XML；不能包含自己。
       <include>shared.xml</include> -->
  <global>
    <work_dir desc="共享清单的主 XML 工作目录">.</work_dir>
    <xresloader_path desc="相对于工作目录；完整 JAR 重命名后的名称">xresloader.jar</xresloader_path>
    <proto desc="对应 -p">protobuf</proto>
    <proto_file desc="对应 -f，可重复配置">kind.pb</proto_file>
    <output_type desc="对应 -t">bin</output_type>
    <output_type rename="/(?i)\.bin$/\.json/" output_dir="output/json">json</output_type>
    <!-- 可选 UE 输出：协议须有 Name 字段或 key_tag；入门简化协议未定义它们。
    <output_type class="client" rename="/(?i)\.bin$/\.csv/" output_dir="output/ue">ue-csv</output_type>
    -->
    <!-- 一个 class 中任一标签匹配即可；同时有 class 与 tag 时两类都要匹配。 -->
    <output_dir desc="相对于工作目录">output/bin</output_dir>
    <data_src_dir desc="为空时从工作目录查找 Excel"></data_src_dir>
    <data_version desc="留空则自动生成">configuration-sample</data_version>
    <rename desc="局部 output_type.rename 优先于此全局规则"></rename>
    <java_option desc="最大堆 2 GB；放在 -jar 之前">-Xmx2048m</java_option>
    <!-- 旧样例的 -client 是历史 JVM 模式参数；现代 Java 不需要它。 -->
    <default_scheme name="KeyRow" desc="字段所在行，从 1 开始">2</default_scheme>
    <!-- 可选：复制上游资源转换示例.xlsx 后开启宏表。
    <default_scheme name="MacroSource">资源转换示例.xlsx|macro|2,1</default_scheme>
    -->
    <!-- 可选 UE CSV 包裹字符；正确名称是 UeCfg，不是 UeCg。
    <default_scheme name="UeCfg-CsvObjectWrapper">{|}</default_scheme>
    -->
    <!-- 可选：准备好相应 YAML 后开启自定义验证器。
    <option>&#45;&#45;validator-rules custom_validator.yaml</option>
    -->
    <option name="美化文本输出">--pretty 2</option>
  </global>
  <groups desc="分组元数据，可选">
    <group id="client" name="客户端" />
    <group id="server" name="服务器" />
  </groups>
  <category desc="GUI 树形分类，可嵌套">
    <tree id="all_cats" name="全部配置"><tree id="kind" name="角色配置" /></tree>
    <tree id="test" name="内联映射示例" />
  </category>
  <list>
    <item file="tables.xlsx" scheme="scheme_kind" name="人物表" cat="kind" class="server" />
    <item file="tables.xlsx" scheme="scheme_upgrade" name="升级表" cat="kind" class="server">
      <option name="移除空数组项">--list-strip-all-empty</option>
    </item>
    <item name="内联升级表" cat="test" class="client server" tag="public">
      <scheme name="DataSource">tables.xlsx|upgrade|3,1</scheme>
      <scheme name="ProtoName">role_upgrade_cfg</scheme>
      <scheme name="OutputFile">role_upgrade_inline.bin</scheme>
    </item>
    <!-- 可选：使用上游完整 workbook 和 proto_v3/kind.pb 时开启嵌套数组。
    <item name="嵌套数组测试" cat="test" class="client server">
      <scheme name="DataSource">资源转换示例.xlsx|arr_in_arr|3,1</scheme>
      <scheme name="ProtoName">arr_in_arr_cfg</scheme>
      <scheme name="OutputFile">arr_in_arr_cfg.bin</scheme>
    </item>
    -->
  </list>
  <gui>
    <set_name><![CDATA[
      if (item_data.file) {
        const base = item_data.file.replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "");
        item_data.name += " (" + base + ")";
      }
    ]]></set_name>
    <on_before_convert name="打印工作目录" type="text/javascript" timeout="15000"><![CDATA[
      // 参数分别传递；不用 shell 拼接工作目录。Windows 子进程不弹出窗口。
      const spawn = require("node:child_process").spawn;
      const child = spawn(require("node:process").execPath,
        ["-e", "process.stdout.write(process.cwd())"],
        { cwd: work_dir, shell: false, windowsHide: true });
      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");
      child.stdout.on("data", log_info);
      child.stderr.on("data", log_error);
      let finished = false;
      function finish(reason) {
        if (finished) return;
        finished = true;
        if (reason) reject(reason); else resolve();
      }
      child.on("error", error => finish(error.message));
      child.on("close", code => finish(code === 0 ? null : "子进程失败: " + code));
    ]]></on_before_convert>
    <on_after_convert name="转表完成后事件" type="text/javascript" timeout="60000"><![CDATA[
      alert_warning("转表事件完成，请核对日志中的结果。");
      resolve();
    ]]></on_after_convert>
    <script name="delaycall" type="text/javascript" timeout="15000"><![CDATA[
      if (data.running) {
        reject("上一次未完成");
      } else {
        data.running = true;
        let left = 5;
        function counter() {
          if (left > 0) {
            log_notice("定时器计数: " + left--);
            setTimeout(counter, 1000);
          } else {
            data.running = false; // 结束后允许再次点击。
            log_notice("定时器结束");
            resolve();
          }
        }
        counter();
      }
    ]]></script>
    <script name="自定义脚本" type="text/javascript"><![CDATA[
      data.call_times = (data.call_times || 0) + 1;
      alert_warning("自定义脚本，可用于自定义按钮");
      log_notice("自定义脚本调用次数: " + data.call_times);
      log_warning("可用于项目检查或工具集成");
      resolve();
    ]]></script>
  </gui>
</root>
```

上例参考 [xresconv-conf/sample.xml](https://github.com/xresloader/xresconv-conf/blob/main/sample.xml)，使用本站入门包的数据，可直接保存并运行。可选宏、UE 包裹字符、验证器和嵌套数组保留在注释中；启用前准备其引用文件，并将 proto_file 换成匹配的完整 descriptor。`-client` 是历史 JVM 参数，不是当前转表依赖。

`file + scheme` 从 Excel 规则 Sheet 读取映射；第三个条目展示内联 DataSource / ProtoName / OutputFile。默认运行产生 6 个文件，三个条目各 bin / JSON。UE CSV 可选项保留在注释中，需要使用带 Name 或 key_tag 的协议；上游完整嵌套数组协议包含对应扩展。详细映射见 [数据映射](./data-mapping)，GUI 脚本上下文和选择器见 [脚本参考](./xresconv-scripts)。

### include 完整示例

对应 [xresconv-conf/sample_include.xml](https://github.com/xresloader/xresconv-conf/blob/main/sample_include.xml)，保留覆盖输出类型、目录、重命名和追加选项的用法。输出放入示例目录内：

```xml title="sample_include.xml"
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <!-- 先加载 sample.xml，再应用本文件；工作目录仍是示例目录。 -->
  <include>sample.xml</include>
  <global>
    <!-- 此文件的 output_type 组替换被包含文件的组，最终只导出 Lua。 -->
    <output_type desc="对应 -t">lua</output_type>
    <output_dir desc="相对于工作目录">output/lua</output_dir>
    <rename desc="对应 -n">/(?i)\.bin$/\.lua/</rename>
    <option name="美化输出">--pretty 2</option>
  </global>
</root>
```

```sh
xresconv-cli --test -p 1 sample.xml
xresconv-cli -p 1 sample.xml
xresconv-cli --test -p 1 sample_include.xml
xresconv-cli -p 1 sample_include.xml
```

include 示例重新定义 output_type 组，最终只导出 3 个 Lua 文件；并非在 bin / JSON 之外再追加 Lua。两个 XML、selectors.json 和所有加载代码均包含在 [示例 ZIP](/examples/quick-start.zip) 中。基础 convert.xml 保持简单，扩展示例按需使用。

![GUI 3.0 正式版加载完整配置，展示分类、七个按钮、六个实际输出和重复计时日志](/img/users/gui-config-example.png)

## 批量转表 - 配置结构规范

| 位置 | 内容 |
| --- | --- |
| `root/include` | 包含其他 XML，相对于声明文件 |
| `root/global/work_dir` | 后端工作目录 |
| `root/global/xresloader_path` | JAR；相对路径基于工作目录 |
| `root/global/proto` / `proto_file` | 协议类型 / descriptor；proto_file 可多个 |
| `root/global/data_src_dir` | 数据搜索目录，可多个；data_source_dir 为别名 |
| `root/global/output_dir` / `rename` | 全局输出目录 / 文件重命名 |
| `root/global/output_type` | 一个输出矩阵条目，可多个 |
| `root/global/data_version` | 输出 header 的数据版本 |
| `root/global/java_option` | JVM 参数，置于 `-jar` 前，可多个 |
| `root/global/option` | xresloader 参数片段，可多个 |
| `root/global/default_scheme` | 按 name 给条目补默认映射 |
| `root/list/item` | 转换条目，file+scheme 或内联 scheme |
| `root/list/item/scheme` / `option` | 局部映射 / 额外参数，可多个 |
| `root/category/tree` / `groups/group` | GUI 分类 / 分组元数据 |
| `root/gui` | GUI 事件、命名脚本与日志钩子 |

所有文本建议统一 UTF-8，以便两种工具共用。字段名称、XML 标签与值保持各自规定的大小写，不把未知标签当成新的功能。

## 路径基准

| 路径 | CLI 2.x | GUI 3.0 |
| --- | --- | --- |
| include | 声明它的 XML 目录 | 声明它的 XML 目录 |
| work_dir | 主 XML 目录 | 声明该 work_dir 的 XML 目录 |
| JAR、proto_file、数据目录、输出目录 | 工作目录 | 工作目录 |
| 启动参数指定的 XML / JSON | 启动目录 | 启动目录 |

没有配置数据搜索目录时，从工作目录查找 Excel。共享清单尽量在主 XML 指定 work_dir；需要跨目录复用时，先分别检查两个工具的预览。不要把所有路径都写成“相对于 XML”。

## 输出矩阵

```xml
<output_type>bin</output_type>
<output_type class="client" tag="public" output_dir="output/client"
             rename="/(?i)\.bin$/\.json/">json</output_type>
```

任务由已选条目与符合条件的 output_type 组合产生。每个类型的 output_dir 和 rename 优先于全局值。

class 或 tag 内多个词用空格分隔，各自任一匹配即可；同时限定 class 和 tag 时，两类都必须匹配。GUI 中不符合任何输出规则的条目不可选。CLI 处理清单里符合筛选条件的条目，GUI 还要求用户勾选。

多格式输出应设置不同后缀或目录，避免写入同一目标。rename 使用 xresloader 的 `/正则/替换/` 格式，见 [核心参数](./xresloader-core)。

## 合并与两种工具的差异

include 先应用，再应用本文件配置；单值按顺序覆盖，JVM 和 option 追加。output_type、proto_file、data_src_dir 等多值组按来源文件重新分组，不能把 include 简化成全部数组相加。条目局部 scheme 覆盖同名默认值，保留支持的重复配置。

CLI 的全局 data_version 使用首个非空值，`-a` 优先；GUI 按合并顺序更新。CLI 允许重复非循环 include 再次应用，最多 128 层；GUI 通过真实路径检查重复与循环，深度上限 64，加载总期限 30 秒。GUI 加载失败保留原会话。

脚本、UI 选择、GUI 修改后的会话设置不会自动变成 CLI 的 XML 输入。需要两边一致时把配置写回项目维护的清单，并分别验证。

## CLI批量转表工具 - 启动参数

完整选项见 [CLI 参考](./xresconv-cli#命令和参数)。

## GUI批量转表工具 - 启动参数

完整选项见 [GUI 参考](./xresconv-gui#启动参数)。

## GUI批量转表工具 - 特殊事件

`set_name`、`on_before_convert`、`on_after_convert`、`on_append_log` 的上下文与完成方式见 [脚本参考](./xresconv-scripts)。

### GUI事件 - 显示转表项名称 `//root/gui/set_name`

同步修改 item_data.name，不提供 require 或异步完成函数。

### GUI事件 - 转表前事件和转表成功后事件 `//root/gui/on_before_convert` 和 `//root/gui/on_after_convert`

事件必须调用 resolve 或 reject，不能仅返回 Promise。运行集合在开始时固定，转换前事件结束后构造命令。

## GUI批量转表工具 - 自定义按钮

### GUI自定义按钮 - 基本配置

按钮通过 `--custom-selector` 加载 JSON，匹配和动作见 [选择器](./xresconv-scripts#自定义选择器)。

### GUI自定义按钮 - 自定义脚本（点击回调）

使用 `script: 名称` 调用 XML 的命名脚本。同按钮连续调用共享 data；重建后重新初始化。

### GUI自定义按钮 - 按钮样式

沿用 primary、secondary、success、danger 等样式及 outline 形式，由当前 GUI 映射显示；无需在配置中引入 Bootstrap 或操作页面 DOM。
