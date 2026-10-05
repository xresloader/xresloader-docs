# 当前事实与来源索引

核验日期：2026-10-05。此文件按事实/升级任务读取，不是启动上下文或完整目录树。责任 owner 为本仓库维护者；相关任务前与每季度复核易变项，升级、弃用、安全公告、加载失败或行为变化立即触发更新。当前有效记录维护一份，历史、审计和回滚由 Git 保留；不自动升级依赖或工具。

## 仓库事实

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| 本站 Docusaurus、React、Node 合同 | [package.json](../../package.json)、[npm 锁](../../package-lock.json)、[pnpm 锁](../../pnpm-lock.yaml)、[Yarn 锁](../../yarn.lock) / 初始 commit bad551a | 2026-10-05 / 文件与已安装包 | Docusaurus 3.10.2、React 19.3.0、Node 24.21.0 / npm 构建通过 | 相关任务/季度；依赖升级 | AGENTS、site-change、工程工作流 / 仓库维护者 |
| CI Node 24 / pnpm 9；本机 pnpm 11 与之不同 | [main.yml](../../.github/workflows/main.yml) / bad551a；实际 --version | 2026-10-05 / 文件、版本与命令 | pnpm 11.13.0 / 本地 pnpm build 失败；CI 未执行 | 包管理变化/CI 维护 | 命令与覆盖证据 / 仓库维护者 |
| 中文路由、显式侧栏及本地搜索 | [配置](../../docusaurus.config.js)、[侧栏](../../sidebars.js)、[首页](../../src/pages/index.jsx) / 当前工作区 | 2026-10-05 / 源码、构建 | 3.10.2 / 本地构建核验；浏览器未测 | 配置/页面/搜索变化 | 两个业务 Skill / 仓库维护者 |
| 样例为历史配置、源与生成产物，不是当前上游行为证明 | [样例](../../source/sample/)、[更新脚本](../../source/sample/update-pb-codes.sh) / bad551a | 2026-10-05 / 文件结构与脚本 | 上游运行时未探测 / 示例执行未验证 | 示例或上游版本变化 | docs-maintenance / 仓库维护者 |
| 许可为 CC BY-SA 4.0 | [LICENSE.md](../../LICENSE.md) / bad551a | 2026-10-05 / 正文 | 文档已核验 | 许可证变化 | 文档、Skill 许可 / 仓库维护者 |

## 实际采用的外部依据

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| Codex 项目规则发现与默认 32 KiB 合并边界 | [官方 AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) / rolling | 2026-10-05 / 官方正文与 CLI 诊断 | CLI 0.160.0 / 发现已验证，调用另列 | 季度/客户端升级与加载失败 | AGENTS、clients / 仓库维护者 |
| Codex 共享 Skills 发现与按需正文 | [Build skills](https://learn.chatgpt.com/docs/build-skills) / rolling | 2026-10-05 / 官方正文与诊断 | CLI 0.160.0 / 元数据已验证，触发未测 | 季度/版本和同名冲突 | Skills、clients、评估 / 仓库维护者 |
| Agent Skills 必需字段、名称与资源格式 | [规范](https://agentskills.io/specification) / rolling | 2026-10-05 / 官方正文、frontmatter 检查 | 三个项目 Skill / 静态格式核验，客户端验收另列 | 季度/字段与解析器变化 | maintenance、三个 Skill / 仓库维护者 |
| CLAUDE.md 条件回退、原生读取版本及四跳导入 | [Claude memory](https://code.claude.com/docs/en/memory) / rolling | 2026-10-05 / 官方正文 | 未确认安装/使用 / 文档已核验，运行未测 | 启用前/版本变化 | clients、条件兼容 / 仓库维护者 |
| VS Code Skills 与 Local/Agent Host prompt files 边界 | [Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills)、[Prompt files](https://code.visualstudio.com/docs/agent-customization/prompt-files) / rolling | 2026-10-05 / 官方正文 | VS Code 1.140.0；未确认目标 Copilot / 运行未测 | 启用前/harness 变化 | clients、maintenance / 仓库维护者 |
| Kilo、Pi 支持共享 Skill 位置，但安装不证明仓库使用 | [Kilo](https://kilo.ai/docs/customize/skills)、[Pi](https://pi.dev/docs/latest/skills) / rolling | 2026-10-05 / 官方正文与 --version | Kilo CLI 7.4.20、Pi 1.0.2 / 文档已核验、运行未测 | 启用前/信任及加载变化 | clients、供应链边界 / 仓库维护者 |
| Docusaurus exclude 的 glob 语义与保留默认排除 | [官方 plugin-content-docs](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs)、node_modules/@docusaurus/utils/lib/globUtils.js 与 plugin-content-docs/lib/options.js / 已安装 3.10.2 | 2026-10-05 / 官方正文、安装源码与构建产物 | 3.10.2 / 本地静态输出验证 | 配置/插件升级 | 内部资料排除及门禁 / 仓库维护者 |
| 默认 Markdown lint 规则与固定工具入口 | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) / 0.23.3 | 2026-10-05 / 维护者 README、npm 元数据与实际 lint | 0.23.3（npm 缓存工具） / 运行结果见覆盖记录 | 规则/工具升级 | .markdownlint-cli2.jsonc、质量门禁 / 仓库维护者 |
| Skill 质量需可比真实输出与失败分类 | [输出评估](https://agentskills.io/skill-creation/evaluating-skills) / rolling | 2026-10-05 / 官方正文 | 当前模型回放未执行 / 实验已设计，未验证效果 | Skill 描述或模型/harness 变化 | skill-evaluation / 仓库维护者 |
| MCP current 与旧版本兼容分别核验 | [Versioning](https://modelcontextprotocol.io/docs/learn/versioning) / 2026-07-28 | 2026-10-05 / 官方正文 | 仓库未接入 SDK/服务 / 未做接入验收 | 实际接入/协议升级 | operations / 仓库维护者 |
| GitHub Actions 供应链与秘密边界 | [Secure use](https://docs.github.com/en/actions/reference/security/secure-use) / rolling；仓库现有 main.yml | 2026-10-05 / 官方正文与现有 CI | 当前 tag Actions / 现状不等于满足建议，发布未执行 | CI/发布维护与安全公告 | operations、后续发布维护 / 仓库维护者 |
| 第三方 Skill 候选只读 API 与审计范围 | [ClawHub API](https://docs.openclaw.ai/clawhub/api) / API v1 rolling | 2026-10-05 / 官方正文 | 未检索/安装候选 / 仅机制核验 | 需要候选时 | maintenance / 仓库维护者 |
| cargo-binstall 可能回退 cargo install；作为 CLI 第31项项目补充 | [维护者 README](https://github.com/cargo-bins/cargo-binstall) / main rolling | 2026-10-05 / 官方正文与 PATH 探测 | PATH 未找到 / 不安装，采用正确回退 | 实际安装任务前 | cli-tools、候选计数 / 仓库维护者 |

十三个客户端逐一使用/入口/未测状态与官方入口见 [clients](../../.agents/skills/ai-agent-maintenance/references/clients.md)，不在此复制兼容表。OpenSpec、Superpowers 与第三方候选未采用；没有从附件旧 release 声明推导当前版本。完整 CLI 使用边界及本机探测见 [cli-tools](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md)，低频产品未逐项复核，使用前查对应官方入口。

## 写作规范的本地来源

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| 按读者与文体写作，保护事实、技术含义和作者声音；词表只是复核线索 | 用户指定 `D:/Nextcloud/owent/Documents/Obsidian/Personal/01.Work/1.2.AI/1.2.3.AI-Writing-Guidance.md` / 577 行，标题“AI 写作规范：准确、自然，保留作者声音”；源文件研究日期 2026-09-25；SHA-256 `E099262BEE5BFC4F2C3E24FC1C0FCE667D450B337FE1AAE8A66C87AA51E26CE4` | 2026-10-05 / 分段完整读取源文件，按本站用途改编并逐节核对；未重新核验源文列出的论文或编辑指南 | [writing-guidance](../../.agents/skills/writing-guidance/SKILL.md) 与仓库内细则/示例 / 可脱离外部笔记使用；实际模型效果未测 | 写作模型或文体变化、反复误改、源指南更新时复核；3—6 个月为可选频率 | 写作 Skill、docs-maintenance、入口与评估 / 仓库维护者 |

外部路径仅用于追溯用户提供的原稿，不是客户端加载入口。规则按编辑建议采用，不继承“本仓库已经核验全部研究”的结论；不把研究中的模型、语料或语言结果推广成通用禁词表。当前验证范围见唯一覆盖记录的 C24 与 [质量评估](skill-evaluation.md)。

## 维护规则

关键结论必须有 scope、版本及实际方法；搜索摘要只用于定位。官方正文和安装源码冲突时继续追发行版本/测试，不能挑有利一条。无法核验保留未验证与缺失条件，不以近似产品或旧日期替代。更新权威合同后同步受影响规则、Skill、命令、图示和覆盖记录，回读实际产物，再更新状态。
