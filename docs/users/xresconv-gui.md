---
title: GUI 使用与迁移
description: xresconv-gui 3.0 的界面、运行、日志、显示设置及旧版迁移
---

# xresconv-gui 3.0

GUI 用同一份 xresconv-conf XML 管理条目、输出矩阵和转换事件。3.0 采用 Tauri 2 与独立 Node.js 内核，发行包完整解压即可使用。平台包和运行时见 [下载与安装](./download)，入门步骤见 [快速上手](./quick-start)。

## 加载和选择

打开 XML 后，在左侧树展开分类并勾选条目。父节点的半选状态表示只选了部分可选子项；不可选条目不参与全选。搜索只改变可见条目，原有选择保留，运行时仍处理所有已选且符合输出条件的条目。

加载失败会保留已提交的会话。修改文件后使用“重载配置”；开始转换和取消收尾期间不能重新加载。

![亮色主界面与示例转换日志](/img/users/gui-main-light.png)

## 详细设置和输出矩阵

检查工作目录、JAR、协议、数据源与数据版本。设置提交后由后端确认，运行参数以预览和本次运行固定的设置为准。

每种输出可以分别设置重命名、目录和 tag/class 条件，未设置时回退到全局值。预览显示命令、目标路径及输出冲突提示；开始前确认条目和路径，详细规则见 [XML 配置](./xresconv)。

![输出矩阵、重命名与格式目录](/img/users/gui-output-matrix.png)

## 开始、取消和结果

开始后依次执行转换前事件、Java 转换和转换后事件。并行度默认 2，可设置 1–16；界面选择超过 6 时要求确认。取消停止派发并等待脚本、Java 与所属进程收尾，结束后才能开始下一次运行。

批量 stdin 转换未提供可靠逐条确认时，界面展示批次结果和已提交任务数；确定单条产物需检查对应日志和文件。预览不会执行转换，批次状态也不等于每条任务都已独立确认。

## 日志与排障

日志支持级别和文本筛选、虚拟滚动、复制与导出。复制针对界面持有的窗口，导出按当前筛选条件分页读取后端保留的日志；已淘汰的条目无法恢复。需要长期完整日志时使用 `--log-configure` 配置 log4js 文件 appender。

Java 诊断、脚本异常、后端故障和持久化错误都会进入日志，过载会报告跳过或丢弃数量。先核对 Java 和路径，再处理转换或脚本错误；见 [FAQ](./faq)。

## 显示和语言

支持亮色、暗色、跟随系统、字号和字体。语言可选跟随系统、英语、简体中文、繁体中文、日语、德语、法语、西班牙语；系统无匹配语言时回退英文。切换立即生效并保存，保持转换会话与选择。

配置名称、路径、脚本弹窗和转换器原始日志保留原文。Windows 桌面版在枚举字体前允许当前应用来源的 WebView2 LocalFonts 权限；失败时仍可使用预设字体和手动输入。浏览器预览遵循浏览器权限。

![暗色界面](/img/users/gui-main-dark.png)

![显示设置与语言选择](/img/users/gui-display-settings.png)

## 启动参数

```sh
xresconv-gui --input convert.xml
xresconv-gui --custom-selector selectors.json
```

| 参数 | 作用 |
| --- | --- |
| `--input <path>` | 启动后加载 XML |
| `--custom-selector <path>` | 加载选择器 JSON，可多次传入 |
| `--custom-button <path>` | 选择器参数别名 |
| `--log-configure <path>` | 额外 log4js 配置 |
| `--debug-mode` | 调试标志；开发调试方式见上游开发文档 |

相对启动参数基于启动工作目录。`--debug-mode` 不承诺打开旧 Electron 开发者工具。

3.0.0 同时传入 --input 与 --custom-selector 时，启动加载存在竞争，可能没有显示自定义按钮。需要选择器时，先只传入 --custom-selector，等待界面就绪后再打开 XML；原因与排查见 [FAQ](./faq#gui-启动时没有显示自定义按钮)。

```json title="log4js.json"
{
  "appenders": { "file": { "type": "file", "filename": "conversion.log" } },
  "categories": { "default": { "appenders": ["file"], "level": "info" } }
}
```

文件写入有队列和关闭期限；归档日志前正常关闭应用并确认没有持久化错误。自定义 appender 是可执行代码，应来自可信来源。

## 从 Electron 2.x 迁移

- XML、输出矩阵和常见事件仍可沿用；保存为 UTF-8，检查 include 和脚本错误。
- 事件和按钮在独立 Node.js worker 中执行，没有 DOM、jQuery、Electron，也不提供默认 console。输出用 `log_*`，事件必须显式 `resolve()` / `reject()`。
- 兼容树节点是带版本的镜像，不与前端共享对象。依赖 DOM、动态增删树节点或直接修改核心字段的旧扩展需调整。
- 界面以加载、重载和取消组织操作；不再通过“重置”重建 Electron 窗口。
- 发行包格式和 WebView 前提已变化；Linux 当前提供 tar.zst 与 AppImage。

项目扩展迁移见 [脚本与选择器](./xresconv-scripts)，开发结构见 [xresconv 架构](../development/design-xresconv)。
