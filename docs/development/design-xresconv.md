---
title: xresconv 架构与接口
description: Rust CLI 与 Tauri GUI 的职责、配置、通信、转换和扩展边界
---

# xresconv 架构与接口

两种批量工具共享 XML 格式和 xresloader 后端，使用不同的宿主实现。配置语义见 [用户配置参考](../users/xresconv)，运行方式见 [CLI](../users/xresconv-cli) 与 [GUI](../users/xresconv-gui)。

## Rust CLI 2.x

单 Cargo package 按 cli、xml_conf、options、plan、runner、process_tree、color 分工。加载 XML 和 include 后合并环境与条目，构造转换计划，再用有界 Java 进程池通过 stdin 派发命令。

stdout/stderr 分别排空，JVM 参数位于 -jar 前，后端任务参数通过已核验的 token 协议编码。写入失败不盲目重发，以免重复执行；进程启动、管道、转换或剩余任务失败均影响退出状态。Windows 用 Job Object，Unix 用独立进程组回收本次所属子树。

Python 文件仅实现提示、定位/下载原生二进制与转交，不再维护一套独立转表逻辑。迁移合同与源码入口见 [上游](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md)。

## Tauri GUI 3.0

![GUI 3.0 的进程职责与通信](/img/development/xresconv-3-architecture.svg)

| 模块 | 职责与所有权 |
| --- | --- |
| apps/desktop | React、适配器、状态快照、编辑草稿、树和日志表现 |
| src-tauri | 窗口、原生接口、启动和转发 |
| packages/guardian | 监督 backend、worker 与健康状态 |
| packages/backend | 配置、选择、会话设置、转换、日志、RPC |
| packages/script-host | 隔离脚本上下文、树镜像、合法操作、回调 |
| packages/contracts / ipc | JSON Schema、生成类型、有界帧与通信 |
| packages/compat-service | 三态选择、匹配与兼容数据语义 |
| packages/packaging | 平台目标、依赖闭包、清单、打包和验证 |

配置在隔离 helper 中读取和解析，命名与初始化成功后才原子替换会话；失败或取消保留已提交版本。后端拥有业务状态，前端和脚本不能通过共享对象直接修改它。

## 通信与错误

桌面层和 guardian 通过私有 stdin/stdout 字节管道通信，4 字节大端长度加 UTF-8 JSON；stdout 专供协议，诊断走 stderr。默认帧上限 64 MiB。协议结构以 [contracts/schema](https://github.com/xresloader/xresconv-gui/tree/main/packages/contracts/schema) 为准。

envelope 包含 protocol_version、kind、id、role、payload，按消息携带 session_id、revision、run_id、invocation_id、generation 等关联字段。会话、代际和树版本防止迟到响应修改新状态。业务错误返回 RPC 错误；毒帧、失联和监督故障按通道/健康故障处理。

主要 RPC 包括 loadConfig/reload、getSnapshot、applyOps、updateSettings、preview/run、cancel/reset、getLogs、respondDialog、setHookEnabled、setCustomSelectors、invokeCustomButton、checkJava。reset 是后端能力，UI 通过加载、重载和取消组织操作。Schema 变化后生成类型并运行 test:contracts，不直接修改 generated 目录。

## 转换与日志

开始时固定条目集合，转换前事件结束后构造命令。Java 用可执行文件和参数数组启动，不经 shell；stdin 无法准确表示的任务回退 argv。并行度默认 2，范围 1–16，写入遵循背压，取消停止派发并等待进程、管道和子树收尾。

JAR 累计退出码无法可靠还原逐条失败数，没有任务确认时保留批次结果与未知的条目结果。不得把任务已提交记为产物已成功。

后端内存日志默认保留 10000 条，前端窗口最多 2000 条，分页最多 1000 条。按 seq 去重合并，导出只能读取仍保留的数据。log4js 在独立 sink 进程中执行，有队列和关闭期限，失败明确报告。

## 扩展与原生界面

脚本操作在 worker 的镜像中同步发生，再带版本回传；按钮 data 按按钮身份保存，重建改变代际。取消或重载撤销旧弹窗回调。脚本具有本机能力，VM 和监督进程只隔离故障，不能作为恶意脚本的安全沙箱。

显示设置通过 Tauri 持久化，语言目录以英文键集合为基准。Windows 字体枚举前调用 allow_local_fonts，只授权当前应用来源。浏览器适配测试不能证明原生权限持久化，必须用真实 WebView2 profile 验证。

更多实现细节见上游 [架构](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/architecture.md)、[接口](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/interfaces.md)、[前端](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/frontend.md) 与 [多语言](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/localization.md)。

## 3.0.0 启动加载的已知边界

原生正式包实测同时传入 --input 与 --custom-selector 时，参数解析正确，但 getSnapshot 的 customSelectors 仍为空。useCliCustomSelectors 先标记 wired，setCustomSelectors 固定 sessionEpoch；同期 loadConfig 推进 epoch 后，选择器流程会提前返回。本机连续复现三次。

用户流程先只加载选择器，再打开 XML，见 [FAQ](../users/faq#gui-启动时没有显示自定义按钮)。本次仅更新文档与规避步骤，未修改独立 GUI 仓库；后续上游修复后重新验证同时传参和会话加载顺序。
