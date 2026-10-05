# 客户端兼容与验收

核验日期：2026-10-05。当前会话确认使用 Codex；其他客户端使用情况尚未获团队确认。PATH/扩展安装只证明环境存在，不证明本仓库已采用。以下文档均为 rolling，不能把当前官网推广为本机版本支持或实际加载通过。

## 使用、入口与边界

| 客户端 | 本机/仓库证据 | 入口与采用决定 | 验收状态 |
| --- | --- | --- | --- |
| Codex | 当前会话；CLI 0.160.0，VS Code 扩展 26.930.51102 | 根 AGENTS.md 和共享 Skills；无需 .codex 专属配置 | 根/子目录加载、禁用与冲突诊断通过，真实调用另列 |
| Claude Code | CLI 不在 PATH，无仓库配置；使用情况未验证 | 当前不创建 CLAUDE.md/.claude；条件回退见下文 | [记忆文档](https://code.claude.com/docs/en/memory) 已核验，运行未验证 |
| VS Code Copilot | VS Code 1.140.0；未发现 github.copilot 扩展（其他同名 copilot 扩展不算）；使用未验证 | 已有 .github 仅 CI；不创建 Copilot 副本，确认 harness 后使用共享入口 | [Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) 与 prompt files 会话边界已核验，运行未验证 |
| OpenCode | CLI 不在 PATH，无项目配置；使用未验证 | [规则](https://opencode.ai/docs/rules) 支持 AGENTS.md；Skill 入口启用时复核 | 文档部分已核验，运行未验证 |
| Kilo Code | CLI 7.4.20、VS Code 扩展 7.8.3；本仓库使用未验证 | [Skills](https://kilo.ai/docs/customize/skills) 支持 .agents/skills；不创建 .kilo 副本 | 文档已核验，目标版本/会话运行未验证 |
| Pi | pi 1.0.2；本仓库使用未验证 | [Skills](https://pi.dev/docs/latest/skills) 支持共享目录；先核验 project trust，不改 SYSTEM.md | 文档已核验，运行未验证 |
| Oh My Pi | omp 18.6.0；本仓库使用未验证 | [Skills](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md) 多来源/同名处理，启用时查版本和 context 遮蔽 | main 文档已读取，安装版本发现与运行未验证 |
| Command Code | commandcode 不在 PATH，无配置；使用未验证 | [Skills](https://commandcode.ai/docs/skills)；不创建 .commandcode | 页面已读取，具体优先级启用时复核，运行未验证 |
| Zoo Code | roo 不在 PATH，无 .roo；使用未验证 | [Custom instructions](https://docs.zoocode.dev/features/custom-instructions) 当前 .roo 规则体系；不猜 .zoo 或共享 Skills 能力 | 页面已读取，版本/Skills 运行未验证 |
| OpenClaw | CLI 不在 PATH，无 workspace 配置；使用未验证 | [Skills](https://docs.openclaw.ai/tools/skills) 与 workspace/state/allowlist 启用时核对 | 页面已读取，实际工作区与层级未验证 |
| Hermes Agent | CLI 不在 PATH，无 .hermes；使用未验证 | [Skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)；context first-match/项目 trust 启用时复核 | 页面已读取，安装/加载未验证 |
| Devin Desktop | CLI 不在 PATH，无 .devin/.windsurf；使用未验证 | [Cascade Skills](https://docs.devin.ai/desktop/cascade/skills)；区分 Desktop、Local 与 legacy Cascade | 页面已读取，桌面客户端安装/会话未验证 |
| Antigravity | CLI 不在 PATH，无专属规则；使用未验证 | [Skills](https://antigravity.google/docs/skills)；区分 2.0/CLI/IDE，不据此推断独立 Gemini CLI | 页面已读取，安装/会话未验证 |

CLI 不在 PATH 不证明客户端完全未安装。团队确认采用额外客户端后补安装版本、会话类型、配置开关、实际规则来源和调用轨迹，再选择必要兼容层；不因为表格有名字就生成目录。

## Codex 的实际发现与限制

[官方规则文档](https://learn.chatgpt.com/docs/agent-configuration/agents-md) 规定项目根到 cwd，每目录依次查 AGENTS.override.md、AGENTS.md 和配置回退，默认合并上限 32 KiB；更近指引覆盖较早内容。[官方 Skills 文档](https://learn.chatgpt.com/docs/build-skills) 规定从 cwd 向仓库根扫描 .agents/skills，同名不会自动合并；元数据发现与正文使用分开。

本次 CLI `codex debug prompt-input` 以实际加载器输出 model-visible JSON，没有调用模型。新增写作 Skill 后，根与 docs/users 诊断均发现四个 Skill 的元数据及新仓库路径，写作正文与细则未预载；原三个 Skill 的正文未预载已在初始化诊断核验。不打印完整全局提示或向产物复制个人规则。诊断和时间/路径的脱敏结果保存在覆盖记录。

原三个 Skill 时的实际诊断还验证了临时 CLI 覆盖参数禁用 site-change 后对应元数据消失，其他两个 Skill 仍发现；独立临时 Git fixture 中根与子目录的两个同名 Skill 均发现，局部 AGENTS.override.md 生效而同目录 AGENTS.md 未加载。新增写作 Skill 后没有重跑禁用或冲突诊断，也没有改用户级配置、模型或权限。

这些诊断不能证明 Skill 实际调用、自动触发质量或 shell/MCP 权限拒绝。明确调用与行为验收仍需目标 harness 真实轨迹；临时禁用的发现测试不能代替执行权限测试。

## Claude 的条件兼容

已核验官方正文：原生 AGENTS.md 要求 2.1.277+，还取决于项目指令设置、内置 agents-md 插件和遮蔽文件；2.1.281 之前部分 provider/telemetry 会话有额外限制。cwd/祖先的 CLAUDE.md、.claude/CLAUDE.md 或 CLAUDE.local.md 可能优先。当前未确认使用，所以不生成兼容层，也不宣称“不支持 AGENTS.md”。

需要回退时创建只含 `@AGENTS.md` 与必要专属差异的 CLAUDE.md；不要复制共享全文。相对导入以所在文件为准，最多四跳，导入全文仍进入启动上下文。局部 paths 规则用 .claude/rules 并核验加载。移除已有桥接只能在全部目标会话确认原生加载且没有专属内容后进行。

用当前版本支持的 /memory、/context 和启动加载记录核验来源；普通 Markdown 链接不是导入。Skills 官方入口另核验，不由 AGENTS.md 支持推断 .agents/skills 原生支持。Windows 不默认通过需要额外权限的 symlink 解决。

## 无副作用验收流程

1. 记录客户端、版本、会话、cwd、信任/开关、规则和 Skill 权威路径；从仓库根及相关子目录分别启动或诊断。
2. 查实际加载文件与目录，确认共享规则来源；隔离临时 fixture 测同名与局部覆盖，不在真实工作区制造冲突。
3. 显式调用所选 Skill，保存真实调用事件与引用解析；按 skill-evaluation.md 的查询集评估隐式选择，不能用模型说会调用作证据。
4. 在隔离环境配置禁用/只读，验证真实执行层拒绝与无副作用；不改全局用户配置，不为测试扩大权限。
5. 记录通过、失败和未测；根发现成功不能代替其他客户端、子目录或行为验收。
