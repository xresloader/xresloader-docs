---
title: GUI 脚本与选择器
description: GUI 3.0 的扩展上下文、事件、树镜像、弹窗和自定义按钮
---

# GUI 脚本与选择器

脚本在独立 Node.js worker 中执行，可访问本地模块与进程。进程监督提供故障隔离，不能限制恶意脚本的系统访问；只加载可信项目的配置。CLI 不执行这些扩展。

## 事件与完成方式

| 入口 | 完成方式 | data 生命周期 |
| --- | --- | --- |
| set_name | 同步修改 item_data.name | 每个条目新上下文 |
| on_before_convert / on_after_convert | resolve / reject | 每次事件重新初始化 |
| 命名按钮脚本 | resolve / reject | 同按钮连续调用共享 |
| on_append_log | 同步修改 data | 同条日志的钩子链共享 |

事件和按钮必须显式完成；返回 Promise 不代表完成。缺省超时 30000 毫秒，可配置 1–2147481647，超时、异常和 worker 退出进入日志。

on_after_convert 仅在转换与前置钩子没有失败、且未取消时执行。它不是无条件的 finally 清理入口。

```xml
<gui>
  <set_name><![CDATA[
    if (item_data.file) item_data.name += " / " + item_data.file;
  ]]></set_name>
  <on_before_convert name="检查所选条目" checked="true" mutable="true"
                     timeout="15000"><![CDATA[
    log_info("本次选择 " + selected_items.length + " 项");
    resolve();
  ]]></on_before_convert>
  <script name="显示选择"><![CDATA[
    data.calls = (data.calls || 0) + 1;
    log_info("按钮调用次数: " + data.calls);
    resolve();
  ]]></script>
</gui>
```

name 为事件开关提供显示名称，checked 设置初始启用状态，mutable 控制是否可修改。运行开始固定所选集合，转换前事件结束后构造命令；条目字段修改影响本次命令，选择变化供后续事件与下次运行读取。

## 上下文与模块

事件和按钮提供 work_dir、configure_file、global_options、selected_items、selected_nodes、data、计时器、require、日志与弹窗函数。set_name 提供 item_data、data、日志和弹窗，不提供 require、resolve、reject。

require 以配置目录解析相对模块，优先查附近 node_modules，再查发行包模块；可用 Node 内置模块。没有 DOM、jQuery、Electron 或默认 console，输出使用 log_info、log_notice、log_warning、log_error。

```js
const path = require("node:path");
log_info(path.join(work_dir, "output"));
resolve();
```

## 树镜像

selected_items 的条目包含 id、file、scheme、name、cat、options、desc、scheme_data、tags、classes 等兼容字段。`item.ft_node` 与 `node.data.item` 在 worker 内保持别名关系，不与 UI 共享对象。

支持读取 title、key、tooltip、data，导航 getTree、getRootNode、getParent、getChildren、visit、getSelectedNodes，检查 isFolder、isSelected、isPartsel、isExpanded、isRootNode，以及 setSelected、toggleSelected、setExpanded。render 可调用但不绘制页面，分组节点没有条目 data。

操作先更新镜像，再按树版本提交后端。依赖 DOM、动态增删节点或直接改核心字段的旧代码需迁移。日志钩子的树只读；取消、重载后的过期操作与回调会被拒绝。

## 日志与弹窗

on_append_log 可同步修改 data.message、data.module_name、data.style；原始消息保留。钩子串行处理，递归日志跳过钩子，过载会绕过并报告数量。

alert_error(content, title) 显示错误。alert_warning(content, title, options) 可配置 yes、no、on_close；先执行选择回调，再执行关闭回调，不传入 DOM 事件。

```js
alert_warning("继续转换？", "确认", {
  yes: function () { resolve(); },
  no: function () { reject("用户取消"); }
});
```

## 自定义选择器

```sh
xresconv-gui --custom-selector selectors.json
```

等待按钮出现后，在界面打开 convert.xml。3.0.0 同时自动加载 XML 与选择器可能丢失选择器接线，见 [FAQ](./faq#gui-启动时没有显示自定义按钮)。

```json title="selectors.json"
[
  {
    "name": "选择升级表",
    "by_schemes": [{ "file": "tables.xlsx", "scheme": "scheme_upgrade" }],
    "default_selected": false,
    "style": "outline-primary"
  },
  { "name": "显示选择", "action": ["script: 显示选择"] },
  { "name": "刷新按钮", "action": ["unselect_all", "reload"] }
]
```

by_schemes 按 file 和可选 scheme 匹配，by_sheets 按 DataSource 的 file 和可选 sheet 匹配。值支持完全匹配、`glob: <pattern>` 和 `regex: <pattern>`；无效正则报告诊断并回退文本匹配。没有有效规则的普通选择器不改变选择。

例如内联 DataSource 的按钮可写为：

```json
{ "name": "选择内联升级表", "by_sheets": [{ "file": "tables.xlsx", "sheet": "upgrade" }], "style": "outline-info" }
```

by_schemes 与 by_sheets 可同时配置；file 必填，省略 scheme / sheet 则匹配该文件的相应条目。JSON 文件本身不能写注释，可选项的含义如下：

| 字段 | 含义 |
| --- | --- |
| name | 按钮名称，必须提供 |
| by_schemes / by_sheets | 普通选择器至少提供一组有效匹配 |
| default_selected | 初始选择，默认 false |
| style | 默认 outline-secondary；支持 primary / secondary / success / danger / warning / info / light / dark 及 outline 形式 |
| action | 按顺序执行的特殊动作数组；可只提供动作而不提供匹配规则 |

action 顺序执行 select_all、unselect_all、reload、`script: <name>`。reload 只重读选择器并重建按钮，不重载 XML；失败或 reject 中止动作链。按钮名称应唯一，重建后 data 重新初始化。

完整 [sample.xml 与 sample_include.xml](./xresconv#批量转表---配置示例) 保留条目名去后缀、启动子进程、转换后弹窗、五秒计时器和按钮计数示例。样例的延时按钮会在计时结束后复位 data.running，允许再次点击；示例 ZIP 中还包含七个按钮的 selectors.json。事件提供 xresloader_path 和 run_seq；命名按钮提供 xresloader_path，set_name 通过 item_data 读取条目。弹窗回调不接收 DOM 事件。

![GUI 3.0 正式版的自定义按钮和转换前事件实际日志](/img/users/gui-scripts-selectors.png)

完整上下文以 [上游调用 Schema](https://github.com/xresloader/xresconv-gui/blob/main/packages/contracts/schema/script-invoke.json) 为准；架构和接口见 [开发文档](../development/design-xresconv)。
