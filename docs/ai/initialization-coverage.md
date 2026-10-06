# AI 初始化覆盖与验收

核验日期：2026-10-05。范围为本仓库 AI 维护入口、四个 Skills、按需参考及内部资料站点隔离；不安装客户端、升级依赖、接入 MCP、提交或发布。本文件为唯一覆盖和交接记录，普通业务维护不重跑初始化。

## 输入、授权与状态

已分段读取用户附件全部 631 行，末行为 `AI-INIT-PROMPT-END`。实际输入没有 `## 初始化提示词` 起始标题，正文从维护 Agent 定义开始；中段和结尾没有发现缺失。原始输入 SHA-256：`DB8D4D9108072D3575A7D85AF63CE81081909C09AA97DA0D08329674A2850BB4`。必要要求已转写为仓库可达内容，不把用户附件路径作为工程入口。
附件写 31 项 CLI，但原表 390–419 行只有 30 项；保留所有原始条目，显式将同节 443 行的 cargo-binstall 补为第 31 项。团队客户端偏好尚未收到回复：当前只确认 Codex，其他客户端逐项记录安装线索与使用未验证，未批量建立专属目录。
状态只使用已覆盖、不适用、待处理、阻塞。规则落地和运行验收拆行；未采用可选工具有替代流程，安装未知不等于不适用。章节按子项汇总，父项和独立子项分开计数，不将二者相加；反复出现的完整交付要求分别保留源章节落点。

## 覆盖统计

当前结论：初始化运行验收部分完成；新增写作 Skill 已编写并完成本地检查。原 24 个源章节及新增写作要求 C24 均已登记和核对；未映射要求 0。章节汇总 25：已覆盖 22，不适用 0，待处理 0，阻塞 3。独立子项 288：已覆盖 272，不适用 11，待处理 0，阻塞 5。真实触发与产物对照继续保留在原运行子项，不能以新增文件或格式校验代替。

## 章节核对目录

| ID | 来源章节 / 原文行号 | 独立子项数 | 状态 |
| --- | --- | --- | --- |
| C00 | 完整覆盖与交付约定 / 4–58 | 9 | 已覆盖 |
| C01 | 目标 / 60–68 | 5 | 已覆盖 |
| C02 | 不可违反的原则 / 70–81 | 10 | 已覆盖 |
| C03 | 调研和实时更新流程 / 83–104 | 14 | 已覆盖 |
| C04 | 推荐产物结构 / 106–128 | 5 | 已覆盖 |
| C05 | 文件选择决策表 / 130–145 | 10 | 已覆盖 |
| C06 | 跨工具兼容规则 / 147–167 | 17 | 阻塞 |
| C07 | AGENTS.md 编写规则 / 169–210 | 7 | 已覆盖 |
| C08 | CLAUDE.md 兼容规则 / 212–229 | 6 | 已覆盖 |
| C09 | Agent Skills 编写规则 / 231–283 | 25 | 已覆盖 |
| C10 | Skill 触发质量评估 / 285–294 | 7 | 阻塞 |
| C11 | 自定义 Agent 规则 / 296–305 | 8 | 已覆盖 |
| C12 | 任务分流与新增功能工作流 / 307–337 | 17 | 已覆盖 |
| C13 | MCP 接入规则 / 339–349 | 9 | 已覆盖 |
| C14 | 本地调试、部署和秘密管理 / 351–360 | 8 | 已覆盖 |
| C15 | 测试、lint 和质量门禁 / 362–371 | 9 | 已覆盖 |
| C16 | 命令超时和重试 / 373–380 | 6 | 已覆盖 |
| C17 | 终端环境与命令行工具 / 382–458 | 48 | 已覆盖 |
| C18 | 文档、路线图和执行计划 / 460–468 | 6 | 已覆盖 |
| C19 | 自我改进机制 / 470–485 | 9 | 已覆盖 |
| C20 | 任务完成前检查清单 / 487–513 | 20 | 已覆盖 |
| C21 | 首次初始化建议 / 515–522 | 7 | 阻塞 |
| C22 | 参考来源 / 524–619 | 4 | 已覆盖 |
| C23 | 维护提示 / 621–631 | 6 | 已覆盖 |
| C24 | 用户补充：按指定 AI 写作指南编写仓库 Skill / 指南 1–577 | 16 | 已覆盖 |

## 验证证据

| 证据 | 实际方法、范围、结果与限制 |
| --- | --- |
| E01 | 全输入按 1–150、151–310、311–470、471–631 分段读取，SHA-256 已核验；初始 git status 为空，79 个跟踪文件，未发现项目/上级规则、Skills、Plan、roadmap。 |
| E02 | 已读 README、package.json、三个锁文件、配置/侧栏/主页/样例入口、tsconfig、gitignore、CI；Node 24.21.0，Docusaurus 3.10.2，React 19.3.0，CI Node24/pnpm9，本机pnpm11.13.0。源码初始 commit bad551a。 |
| E03 | Get-Command 探测全部候选和客户端；rg15.0.0/fd10.4.2（用户 .kimi-code/bin）、sd1.0.0/jq1.8.2/yq4.54.1/bat0.26.1（用户 Scoop shims）--version 均退出0。PowerShell7.6.6，ArgumentPassing=Windows。ugrep/plocate/pigz/cargo-binstall 未在 PATH 找到；其余低频仅确认命令位置。客户端版本/使用状态见 clients.md。 |
| E04 | 2026-10-05 实际打开官方正文：Codex AGENTS/Skills、Agent Skills specification/evaluation、Claude memory、VS Code Skills/prompt files、Kilo/Pi、其余客户端官方入口、Docusaurus docs plugin、MCP versioning、GitHub安全、ClawHub API、markdownlint-cli2 与 cargo-binstall README。采用范围/未复核细节见 source-index.md、clients.md；未引用搜索摘要为证据。 |
| E05 | CLI0.160.0 根与 docs/users 执行 codex debug prompt-input，均退出0；规则与3个Skill元数据存在，Skill正文/覆盖表正文未预加载。单次 -c skills.config 禁用 site-change 后其元数据消失、其他2项保留。独立临时Git fixture 同名Skill元数据2项，ROOT和NESTED_OVERRIDE存在，NESTED_PLAIN不存在，两份Skill正文未加载；无模型调用、无全局配置变化。 |
| E06 | Python3.14.8 / PyYAML6.0.3；python -X utf8 加系统 skill-creator/scripts/quick_validate.py，对三个Skill逐个运行，3/3有效、退出0。最初默认gbk读UTF-8失败，修正验证器调用编码后通过；这是验证环境问题。skills-ref 未安装，未声称运行。 |
| E07 | 初次初始化完整回读15份Markdown与lint配置，校验本地引用/资源、frontmatter、覆盖ID/状态/路径、31项CLI与20条评估样本；新增写作 Skill 后的最终检查见 E11 和下表。 |
| E08 | 配置修改前和修改后在仓库根 npm run build 均退出0；两次都有既有 blogDir 不存在警告。pnpm build 退出1：本机11自动依赖检查试图重装modules，因无TTY中止，未强制清理。未执行CI pnpm9安装/构建；依赖与锁文件未修改。 |
| E09 | 修改后构建doc metadata共29份，其中27份具有source/permalink，为27篇原始公开文档，另2份为plugin/loader元数据；sitemap及1份search-index未含/docs/ai/，内部内容未发布。与git中27篇公开源文档一致。 |
| E10 | 本地静态门禁/无模型诊断没有真实Skill调用、隐式路由、权限拒绝或有/无Skill产物比较；Q01–Q20和T01–T03尚未运行，保留5个阻塞子项。未运行浏览器视觉、上游样例、CI或生产发布；本次没有相关页面/样例行为修改。 |
| E11 | 写作补充：用户指南 577 行完整读取，SHA-256 见 source-index；SKILL.md、详细规则和示例改编后回读。新增后 Markdown lint 为 18 份、0问题，四个 Skill 的 quick_validate 均退出0。根与 docs/users 的 codex debug prompt-input 均退出0、发现四个 Skill 元数据和新仓库路径，写作正文及细则未预载；未调用模型。Q21–Q28、T04–T05 仅建立验收条件，效果未测；未重跑已通过且配置未再改动的站点构建。最终结构与差异复核见下表。 |

## 最终检查命令与结果

全部命令在仓库根执行，除明确标注子目录诊断。静态和构建均为本地检查。

| 检查 | 实际命令或方法 | 结果 |
| --- | --- | --- |
| Markdown | `npx --yes markdownlint-cli2@0.23.3`（根规则集） | 18份Markdown，0问题，退出0 |
| Skill格式 | `python -X utf8 C:/Users/owt50/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/docs-maintenance`；另分别使用 `.agents/skills/site-change`、`.agents/skills/ai-agent-maintenance`、`.agents/skills/writing-guidance` 作为参数 | 4/4有效，退出0 |
| 全文件结构与引用 | 任务临时Python脚本逐份UTF-8读取、解析本地链接/覆盖表/查询表/CLI候选表；YAML格式由quick_validate另验 | 18份Markdown、356个本地引用、25章、288子项、31候选、28查询；无缺路径/重复ID，退出0 |
| 发现/禁用/覆盖 | `codex debug prompt-input`；根、docs/users、单次禁用参数和临时fixture | 新增后根/子目录4份元数据、写作正文/细则不预载；原三Skill时禁用后2份、fixture同名2份及override优先，退出0 |
| 站点构建 | `npm run build` | 成功，退出0；保留既有blogDir警告 |
| 公开产物 | 逐个解析doc metadata，读取sitemap/search-index | 27篇公开源文档、1份搜索索引，无/docs/ai/路由，退出0 |
| 差异 | `git diff --check`、最终Git状态与完整回读 | 空白检查通过；无依赖/锁文件/CI发布改动 |

静态脚本只证明路径、字段、ID、计数和资源结构；内容映射另外回读，模型实际遵循仍须C10实验。最终仅修改Markdown证据时不用重复站点构建；配置改动后已经重建并复查产物。

## 独立要求与落点

每行的来源章节与原文范围由上表确定。链接目标为仓库真实文件，斜杠后的文字是实际章节；证据不足的运行要求保持阻塞。正文已覆盖不代表第三方工具每项能力、本机外所有客户端或生产已验证。

### C00 / 完整覆盖与交付约定

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C00.01 / 完整读取631行、结束标记和缺失开头标题说明 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.02 / 逐章登记并展开列表、表格、条件、模板及新增要求 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.03 / 稳定ID、适用依据、实际路径、状态和证据 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.04 / 只保留一个可恢复覆盖记录 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.05 / 先保全要求再分层；迁入必要附件内容 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.06 / 区分未采用、未验证和不适用 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.07 / 从要求查产物再从正文反查、无空壳与失效资源 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.08 / 规则与运行拆分，父项汇总，统计不重复 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |
| C00.09 / 有阻塞报告部分完成；恢复目标、ID及授权 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 范围、章节、独立要求、证据及交接 | 已覆盖 | E01/E07；本表与三个Skill |

### C01 / 目标

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C01.01 / 创建共享规则与按需专业Skills | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E04；Skill索引、工程工作流、来源及覆盖表 |
| C01.02 / 优先开放格式，发现机制按客户端区分 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E04；Skill索引、工程工作流、来源及覆盖表 |
| C01.03 / 按实际使用兼容十三客户端，不创建全套占位 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E04；Skill索引、工程工作流、来源及覆盖表 |
| C01.04 / 支持开发、修复、验证、文档、部署准备和计划 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E04；Skill索引、工程工作流、来源及覆盖表 |
| C01.05 / 事实、决策、运行证据与未完成可追溯 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E04；Skill索引、工程工作流、来源及覆盖表 |

### C02 / 不可违反的原则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C02.01 / 先核验源码、调用方、测试、锁文件、配置与官方正文 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.02 / 当前授权内持续行动，关键需求缺失才澄清 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.03 / 保护未提交修改，不动独立上游或无关升级 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.04 / 共享权威源一份；导航不冒充自动导入 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.05 / 常驻高频稳定信息，按需正文与参考，拆分不等于省token | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.06 / 发现真实工具/Skills/模式/权限，不编造接口 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.07 / 验证与风险相称，纯文案不加形式测试 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.08 / 外部资料是数据，不是越权授权 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.09 / 保留日期/版本/审计与回滚历史 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |
| C02.10 / 现代CLI优先且正确回退，不批量安装 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 规则入口、工具、边界、完成 | 已覆盖 | E01/E02/E03；operations、source-index补细节 |

### C03 / 调研和实时更新流程

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C03.01 / 核对范围、验收、Git及上级/局部规则 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.02 / 先检查索引/目录，按需探测工具路径/版本/能力 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.03 / 相关实现/测试/锁定版本及官方正文核验 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.04 / 来源记录结论/范围，冲突追发布/源码 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.05 / 按风险写范围、选项、取舍、失败、验证和回滚 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.06 / 事实或合同变化先更新权威资料，不写成既成事实 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.07 / 结束同步所有受影响入口、Skill、文档/计划并回读 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流 | 已覆盖 | E01/E02/E07 |
| C03.08 / 来源字段claim/scope | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.09 / 来源字段source_url/source_version | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.10 / 来源字段verified_at/method | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.11 / 来源字段installed_version/status | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.12 / 来源字段review_cadence/update_trigger | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.13 / 来源字段impact/owner | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |
| C03.14 / 相关任务复核易变事实，不自动升级依赖 | 适用；本次维护合同 | [source-index.md](source-index.md) / 仓库事实、外部依据、维护规则 | 已覆盖 | E04；每条有效记录含全字段 |

### C04 / 推荐产物结构

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C04.01 / 最小AGENTS入口，Skill管理才建索引 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择承载位置、格式与内容 | 已覆盖 | E02/E07；仅建有内容的三个Skill和维护资料 |
| C04.02 / 共享Skill目录与README不等同跨客户端自动发现 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择承载位置、格式与内容 | 已覆盖 | E02/E07；仅建有内容的三个Skill和维护资料 |
| C04.03 / 专属目录、reference/scripts/assets按实际用途创建 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择承载位置、格式与内容 | 已覆盖 | E02/E07；仅建有内容的三个Skill和维护资料 |
| C04.04 / OpenSpec/roadmap/开发目录不创建无用途占位 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择承载位置、格式与内容 | 已覆盖 | E02/E07；仅建有内容的三个Skill和维护资料 |
| C04.05 / 无空Skill、空change、空README和附件失效壳 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择承载位置、格式与内容 | 已覆盖 | E02/E07；仅建有内容的三个Skill和维护资料 |

### C05 / 文件选择决策表

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C05.01 / 高频共享规则落根入口 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.02 / 模块/文件局部规则需先核验嵌套/glob/时机 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.03 / 复用专业流程落Skill | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.04 / Claude桥接条件与共享规则导入 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.05 / 独立角色需真实工具限制/隔离/handoff | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.06 / 手动重复任务用Skill，区分Local/Agent Host prompt files | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.07 / 可审阅行为使用一份权威设计或实际OpenSpec合同 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.08 / 实时数据用已有API/CLI，必要时MCP | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.09 / 强制约束落实sandbox/权限/CI而非提示词 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |
| C05.10 / 可复用经验先验证再入测试/docs/Skills | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 选择实际承载位置 | 已覆盖 | E04/E07；十种需求各有选择与边界 |

### C06 / 跨工具兼容规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C06.01 / Codex的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.02 / Claude Code的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.03 / VS Code Copilot的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.04 / OpenCode的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.05 / Kilo Code的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.06 / Pi的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.07 / Oh My Pi的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.08 / Command Code的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.09 / Zoo Code的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.10 / OpenClaw的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.11 / Hermes Agent的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.12 / Devin Desktop的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.13 / Antigravity的实际使用、版本、入口、采用与未验证状态 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 已覆盖 | E03/E04；安装不等于仓库采用 |
| C06.14 / 从根与相关子目录实际加载规则和Skills | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Codex的实际发现 | 已覆盖 | E05；根与docs/users均发现3个Skill元数据 |
| C06.15 / 同名Skill和局部override实际加载顺序 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Codex的实际发现 | 已覆盖 | E05；独立fixture同名2项；override加载、同目录普通入口未加载 |
| C06.16 / 真实目标客户端明确调用与资源读取 | 适用；格式/发现不代替实际调用 | [skill-evaluation.md](skill-evaluation.md) / 本次结果与未测项 | 阻塞 | 缺独立真实调用轨迹；在受控目标会话显式调用四个Skill |
| C06.17 / 禁用或权限限制实际生效 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Codex的实际发现 | 已覆盖 | E05；单次CLI参数禁用site-change后元数据消失；执行权限拒绝未测 |

### C07 / AGENTS.md 编写规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C07.01 / 项目用途、关键入口、独立项目范围 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.02 / 已核验命令、执行目录、前提与验证范围 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.03 / 运行时、生成文件、迁移/安全/部署边界 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.04 / shell、编码、退出码、临时路径、CLI优先与清单 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.05 / 按任务触发Skill/设计/操作读取 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.06 / 完成条件、同步及有依据的陷阱 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |
| C07.07 / 短共享入口，无未替换骨架，局部约束按加载机制 | 适用；本次维护合同 | [AGENTS.md](../../AGENTS.md) / 全部六个章节 | 已覆盖 | E02/E05/E07；工程/操作约定为按需细节 |

### C08 / CLAUDE.md 兼容规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C08.01 / 按版本、会话设置、遮蔽与实际使用决定桥接 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Claude的条件兼容 | 已覆盖 | E03/E04；未确认采用，不创建或移除桥接 |
| C08.02 / 需要时只导入AGENTS并追加真实差异 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Claude的条件兼容 | 已覆盖 | E03/E04；未确认采用，不创建或移除桥接 |
| C08.03 / 四跳导入与启动上下文消耗、路径规则 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Claude的条件兼容 | 已覆盖 | E03/E04；未确认采用，不创建或移除桥接 |
| C08.04 / 已有桥接仅在所有目标原生确认后移除 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Claude的条件兼容 | 已覆盖 | E03/E04；未确认采用，不创建或移除桥接 |
| C08.05 / 用当前memory/context/加载记录核验而非链接 | 适用；本次维护合同 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / Claude的条件兼容 | 已覆盖 | E03/E04；未确认采用，不创建或移除桥接 |
| C08.06 / 本次实际CLAUDE兼容文件加载验收 | 本次只确认Codex，Claude兼容层未创建；未来采用后验收 | [clients.md](../../.agents/skills/ai-agent-maintenance/references/clients.md) / 使用、入口与边界 | 不适用 | 本次无既有桥接且未确认Claude使用，不生成专属兼容文件 |

### C09 / Agent Skills 编写规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C09.01 / Skill权威共享位置、兼容副本一致性与有效相对资源 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.02 / name/description长度、名称字符/目录一致与可选字段 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.03 / 描述清晰前置意图，邻近边界，不挤占所有任务 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.04 / 元数据/正文/参考渐进加载，500行是建议 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.05 / 正文直接链接真实资源，以Skill目录为基准 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.06 / 脚本依赖、输入输出、cwd、退出码、超时、副作用/help及非交互合同 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.07 / 显式调用、隐式选择、执行授权分开 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.08 / 审计完整bundle/frontmatter/动态shell/hooks/依赖/出站和版本 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.09 / 格式校验与客户端/安全/触发验收分开 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.10 / 覆盖表记录具体Skill正文/资源/加载入口 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 格式、加载与内容；供应链 | 已覆盖 | E06/E07；三个Skill说明与链接，未引入脚本/hooks |
| C09.11 / docs-maintenance的具体结果和完成条件 | 适用；本次维护合同 | [docs-maintenance/SKILL.md](../../.agents/skills/docs-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.12 / docs-maintenance的范围、近似排除及输入/缺失查证 | 适用；本次维护合同 | [docs-maintenance/SKILL.md](../../.agents/skills/docs-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.13 / docs-maintenance的真实步骤、修改/引用和副作用边界 | 适用；本次维护合同 | [docs-maintenance/SKILL.md](../../.agents/skills/docs-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.14 / docs-maintenance的异常、停止条件及恢复 | 适用；本次维护合同 | [docs-maintenance/SKILL.md](../../.agents/skills/docs-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.15 / docs-maintenance的静态/运行验证区分、交付及有效资源 | 适用；本次维护合同 | [docs-maintenance/SKILL.md](../../.agents/skills/docs-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.16 / site-change的具体结果和完成条件 | 适用；本次维护合同 | [site-change/SKILL.md](../../.agents/skills/site-change/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.17 / site-change的范围、近似排除及输入/缺失查证 | 适用；本次维护合同 | [site-change/SKILL.md](../../.agents/skills/site-change/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.18 / site-change的真实步骤、修改/引用和副作用边界 | 适用；本次维护合同 | [site-change/SKILL.md](../../.agents/skills/site-change/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.19 / site-change的异常、停止条件及恢复 | 适用；本次维护合同 | [site-change/SKILL.md](../../.agents/skills/site-change/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.20 / site-change的静态/运行验证区分、交付及有效资源 | 适用；本次维护合同 | [site-change/SKILL.md](../../.agents/skills/site-change/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.21 / ai-agent-maintenance的具体结果和完成条件 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.22 / ai-agent-maintenance的范围、近似排除及输入/缺失查证 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.23 / ai-agent-maintenance的真实步骤、修改/引用和副作用边界 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.24 / ai-agent-maintenance的异常、停止条件及恢复 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |
| C09.25 / ai-agent-maintenance的静态/运行验证区分、交付及有效资源 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 正文对应结果、输入、流程、异常与验收 | 已覆盖 | E06/E07；完整回读 |

### C10 / Skill 触发质量评估

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C10.01 / 至少20条正例、负例、近似、口语、隐式与边界查询 | 适用；本次维护合同及写作补充 | [skill-evaluation.md](skill-evaluation.md) / 路由集合 | 已覆盖 | E07/E11；现有28条，调优18、留出10，仅预期标注 |
| C10.02 / 真实路由轨迹、误触发与漏触发 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 真实路由与产物实验 | 阻塞 | Q01–Q28尚无真实调用；目标客户端多次回放留轨迹 |
| C10.03 / 2–3个代表任务含边界及确定性验收 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 真实路由与产物实验 | 已覆盖 | T01文档、T02窄屏、T03遗漏回放 |
| C10.04 / 同输入有/无Skill产物、正确性、耗时/token对照 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 本次结果与未测项 | 阻塞 | 缺独立可比模型运行；执行T01–T05后记录真实产物和预算 |
| C10.05 / 保持模型/工具/版本/预算与隔离可比，失败归类/必要盲评 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 真实路由与产物实验 | 已覆盖 | 实验合同已写；未将设计称为效果验证 |
| C10.06 / 未调优留出集、拒绝/恶意输入/副作用真实回放 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 本次结果与未测项 | 阻塞 | Q05/06/11/12/16/17/20/22/25/28运行未执行 |
| C10.07 / 如实报告样本、次数、版本、基线和未测，非机械阈值 | 适用；本次维护合同 | [skill-evaluation.md](skill-evaluation.md) / 全部章节 | 已覆盖 | 明确未运行次数；发现诊断与模型回放分开 |

### C11 / 自定义 Agent 规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C11.01 / 只在稳定角色/隔离/工具限制/handoff需要时创建 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.02 / 核验真实schema及同名model/tools/permissions等含义 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.03 / 角色输入、结果、完成、修改范围、失败与升级 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.04 / 只读角色需真实shell/MCP只读而非口头 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.05 / 继承规则/Skills/权限/上下文和文件隔离需验证 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.06 / 委派条件、文件所有权、DB/端口/缓存隔离及主Agent整合 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.07 / 模型按任务预算与已验证能力选，保留用户指定 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 已覆盖 | 无独立角色需求；保留未来采用的具体门禁 |
| C11.08 / 本次创建并运行自定义Agent | 本仓库四个任务Skill已足够；本次会话不委派 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 自定义Agent与委派 | 不适用 | 没有稳定独立职责或工具限制需求；未创建配置 |

### C12 / 任务分流与新增功能工作流

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C12.01 / 文案/格式/局部任务最小流程 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.02 / 缺陷复现、根因、修复与回归 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.03 / 新功能/跨模块/API/数据模型一份合同 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.04 / 安全/迁移/部署权限影响回滚与验收 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.05 / 需求不明时有边界探索与关键澄清 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.06 / OpenSpec/Superpowers采用及版本、profile、命令与schema区分 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.07 / Brainstorming门禁由实际启用流程决定，不强加普通维护 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.08 / 工具组合是项目选择，一份合同，未采用时替代流程 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | 未安装/采用；现有Markdown设计、issue与覆盖记录替代 |
| C12.09 / OpenSpec采用后读取实现/specs/changes/路线图 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.10 / OpenSpec采用后核验profile和客户端命令映射 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.11 / OpenSpec采用后充分探索及具体合同 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.12 / OpenSpec采用后status/show/validate与授权 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.13 / OpenSpec采用后逐项任务及真实行为验收 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.14 / OpenSpec采用后合同纠错不篡改断言 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.15 / OpenSpec采用后delta检查及主specs同步 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.16 / OpenSpec采用后解阻塞再归档、不以命令成功代替正确 | 条件分支：无openspec目录/安装且未决定采用 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 不适用 | 本次未采用，无需初始化命令；八步已保留未来流程 |
| C12.17 / 隔离按风险，worktree不隔离远程；不自动提交/发布 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 任务分级与合同 | 已覆盖 | R边界/O操作共同承载 |

### C13 / MCP 接入规则

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C13.01 / 记录MCP来源/数据流/工具集/路径与读写范围 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.02 / 客户端/服务端/SDK/传输/协议版本匹配再迁移 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.03 / HTTP OAuth与STDIO凭据区分，audience/issuer/发现/redirect，不passthrough | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.04 / 业务状态句柄不可预测、绑定身份授权，不作凭证 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.05 / HTTP Origin/监听/认证、STDIO stdout/stderr及取消/退出清理 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.06 / 校验输入、路径/链接、SSRF、元数据与返回提示注入 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.07 / 调用超时、输出/速率上限、脱敏审计与写授权；annotations非授权 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.08 / 无真实token/cookie/会话入库或模型上下文 | 适用；本次维护合同 | [operations.md](operations.md) / MCP接入 | 已覆盖 | 机制已写；未接入，不推断现有SDK版本 |
| C13.09 / 本次接入迁移及MCP运行验收 | 条件分支未采用；当前harness连接不是仓库接入 | [operations.md](operations.md) / MCP接入 | 不适用 | 无项目MCP需求/配置，不扩大范围；已有只读工具替代 |

### C14 / 本地调试、部署和秘密管理

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C14.01 / 一次性脚本/日志可追踪且不污染正常构建 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.02 / 可选开发/秘密布局结合忽略/权限，名称不构成保护 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.03 / 凭据优先秘密管理器/系统/受控环境，jq/yq非安全通道 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.04 / 秘密不进入提示/参数/日志/普通产物或无关服务 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.05 / 缺配置生成无真实值example并先核验忽略 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.06 / CI短期凭据/最小权限/完整SHA与不可信PR分离 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.07 / 部署准备目标/制品/迁移/健康/回滚，分环境验收 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |
| C14.08 / 清理限本任务路径、绝对范围及链接目标核验 | 适用；本次维护合同 | [operations.md](operations.md) / 临时产物、秘密、部署准备 | 已覆盖 | 现有CI风险如实标记；本次不执行发布或秘密操作 |

### C15 / 测试、lint 和质量门禁

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C15.01 / 从测试/CI入口出发选与风险匹配的门禁 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.02 / 行为关键分支与失败，缺陷补可复现回归/替代证据 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.03 / mock不能代替真实协议/迁移/生命周期 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.04 / 记录目录/命令/环境/退出码/数量，发现编译执行区分 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.05 / Markdown明确规则集、引用/围栏/模板资源，无全局关规则 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.06 / 图表沿用合适工具并验证语法和真实渲染 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.07 / 区分基线与引入失败，不删断言/skip/扩大超时 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.08 / 通过后不重复无依据测试，缺工具如实未执行 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 已核验入口、按变更验证 | 已覆盖 | E02/E06/E07/E08/E09；未改样例或图表不引入相关工具 |
| C15.09 / 本次Markdown、Skill、引用及站点排除实际验证 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 验证证据 | 已覆盖 | E06–E09；最终静态复核完成后更新状态 |

### C16 / 命令超时和重试

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C16.01 / 等待窗口、子进程timeout、任务截止区分 | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |
| C16.02 / 有限预算基于CI/耗时/风险而非统一门槛 | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |
| C16.03 / 超时脱敏诊断并查下载/死锁/限制/残留 | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |
| C16.04 / 只对可恢复错误有限重试、退避抖动/Retry-After | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |
| C16.05 / 副作用超时先查状态/幂等/去重，禁盲重放 | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |
| C16.06 / 自动化无交互阻塞，登录走用户受控界面 | 适用；本次维护合同 | [operations.md](operations.md) / 命令预算和恢复 | 已覆盖 | 平台故障与pnpm版本均先定位，不盲目重试 |

### C17 / 终端环境与命令行工具

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C17.01 / 现代CLI优先、语义/harness优先、回退与不自动安装 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 执行约定、实际环境 | 已覆盖 | E03；R高频工具提示直接可见 |
| C17.02 / rg的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.03 / ugrep的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.04 / fd的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.05 / bat的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.06 / sd的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.07 / eza的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.08 / erd的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.09 / dust的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.10 / duf的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.11 / hyperfine的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.12 / tokei的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.13 / hexyl的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.14 / jq的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.15 / jaq的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.16 / yq的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.17 / mlr的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.18 / qsv的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.19 / delta的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.20 / difft的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.21 / tspin的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.22 / plocate的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.23 / pigz的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.24 / zstd的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.25 / ouch的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.26 / aria2c的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.27 / fzf的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.28 / xh的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.29 / doggo的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.30 / procs的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.31 / watchexec的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；完整候选对应行；存在/缺失与未测边界保留 |
| C17.32 / cargo-binstall的具体用途、优先场景、回退及边界 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 原始候选、用途与回退 | 已覆盖 | E03；原文443行项目补充，官方README核验，PATH未找到 |
| C17.33 / 高频六工具真实路径/版本/能力，日常按需刷新 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.34 / harness文件/补丁合同优先，不改无关稳定脚本 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.35 / 可信渠道按平台架构/版本校验，只安装必要工具 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.36 / cargo-binstall可能回退编译，禁止编译时核验策略 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.37 / 结构化有界输出、无颜色分页/交互，fzf filter | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.38 / rg忽略/隐藏/二进制与每文件max-count语义 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.39 / rg 1/2及jq -e 1/4正确区分 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.40 / 参数作为参数，JSON不是shell转义，不输出秘密命令 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / 实际环境与日常探测 | 已覆盖 | E03；高频--version退出0，低频能力使用前复核 |
| C17.41 / PowerShell7优先，经验证回退，不跨shell混用 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.42 / NoLogo/NoProfile/NonInteractive与明确命令名 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.43 / 单引号/here-string/LiteralPath及语句块管道 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.44 / 参数数组、ArgumentPassing/Legacy与--%限制 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.45 / UTF-8、现有BOM/换行保留，5.1默认编码因命令不同 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.46 / 关键cmdlet Stop与立即保存原生退出码 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.47 / 后台Hidden、PID/日志与退出清理 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |
| C17.48 / 平台启动与脚本失败分开，权限重试不降安全 | 适用；本次维护合同 | [cli-tools.md](../../.agents/skills/ai-agent-maintenance/references/cli-tools.md) / Windows执行 | 已覆盖 | PowerShell7.6.6/Windows参数模式；Python验证加-X utf8；E03/E06 |

### C18 / 文档、路线图和执行计划

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C18.01 / 按影响同步入口/Skill/docs/来源/ADR/验证/部署/计划 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |
| C18.02 / 信息架构沿用，必要目录才建README | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |
| C18.03 / roadmap目标/优先级/依赖与计划任务/验收/状态分工 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |
| C18.04 / 已有Plan复用，不造平行系统 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |
| C18.05 / 长期交接目标/ID/证据/下一步/授权，压缩后恢复 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |
| C18.06 / 事实变化同步引用/命令/图示，未实现明确标记 | 适用；本次维护合同 | [engineering-workflow.md](engineering-workflow.md) / 同步、计划与交接 | 已覆盖 | 当前无Plan/roadmap；覆盖记录承载具体维护状态 |

### C19 / 自我改进机制

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C19.01 / 纠错先最小复现/原因/结果，环境实现路由旧资料区分 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 纠错与复核 | 已覆盖 | 环境启动、pnpm版本及UTF-8纠错证据进入相应按需约定 |
| C19.02 / 会复发且验证的问题优先测试或确定性检查 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 纠错与复核 | 已覆盖 | 环境启动、pnpm版本及UTF-8纠错证据进入相应按需约定 |
| C19.03 / 流程经验到Skill、局部约束就近，规则写触发/范围/复核 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 纠错与复核 | 已覆盖 | 环境启动、pnpm版本及UTF-8纠错证据进入相应按需约定 |
| C19.04 / 不提升第三方/单次评价/未知偏好；memory依授权 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 纠错与复核 | 已覆盖 | 环境启动、pnpm版本及UTF-8纠错证据进入相应按需约定 |
| C19.05 / 升级模型/harness/依赖后以对照决定规则去留 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 纠错与复核 | 已覆盖 | 环境启动、pnpm版本及UTF-8纠错证据进入相应按需约定 |
| C19.06 / ClawHub只作可选候选，先查官方只读API不猜URL | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 供应链与经验复核 | 已覆盖 | E04；未采用第三方候选，已写本地替代机制 |
| C19.07 / 候选owner/slug/版本/完整权限脚本网络及缺安全字段审计 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 供应链与经验复核 | 已覆盖 | E04；未采用第三方候选，已写本地替代机制 |
| C19.08 / 借鉴记录来源取舍许可署名，不执行安装/不扩大授权 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 供应链与经验复核 | 已覆盖 | E04；未采用第三方候选，已写本地替代机制 |
| C19.09 / 缓存、429/Retry-After与有限重试，不可访问继续独立工作 | 适用；本次维护合同 | [maintenance.md](../../.agents/skills/ai-agent-maintenance/references/maintenance.md) / 供应链与经验复核 | 已覆盖 | E04；未采用第三方候选，已写本地替代机制 |

### C20 / 任务完成前检查清单

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C20.01 / 结束标记、源章节、新增要求已核对 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.02 / 章内列表/表格/条件/模板逐项映射 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.03 / 实际正文/资源/加载回读，无空壳填空 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.04 / 不适用有依据、阻塞如实保留、不删行 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.05 / 范围/验收/真实能力和授权明确 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.06 / 官方/源码日期及版本范围 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.07 / 保护现有改动只实施必要变更 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.08 / 入口、Skills、兼容可达且低常驻冗余 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.09 / Skill触发/质量已做或如实未测 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.10 / 行为验证目录/命令/退出码可追溯 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.11 / 文档lint与引用/模板/路径检查 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.12 / CLI优先提示与正确回退 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.13 / timeout/retry/秘密/进程/临时产物处理 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.14 / 受影响docs/部署/计划/来源同步 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.15 / 本地/生产区分及剩余风险 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.16 / 无未映射要求、未达到完整条件不宣称完成 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 本表、验证证据、交接 | 已覆盖 | 与最终产物逐项回读；未运行验收不勾通过 |
| C20.17 / 最终覆盖位置、章节及独立状态计数分开 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 统计、验证证据、交接 | 已覆盖 | 最终答复遵循四项格式 |
| C20.18 / 最终产物实际链接、差异及Skill路由 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 统计、验证证据、交接 | 已覆盖 | 最终答复遵循四项格式 |
| C20.19 / 最终实际验证与未执行运行验收分列 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 统计、验证证据、交接 | 已覆盖 | 最终答复遵循四项格式 |
| C20.20 / 最终不适用依据、未完成ID、阻塞与下一步 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 统计、验证证据、交接 | 已覆盖 | 最终答复遵循四项格式 |

### C21 / 首次初始化建议

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C21.01 / 完整输入/表格/只读现状、客户端/测试及CLI探测 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 独立要求、验证证据 | 已覆盖 | E01–E09；根与子目录已发现 |
| C21.02 / 相关官方资料、来源索引和最小方案，不装全套 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 独立要求、验证证据 | 已覆盖 | E01–E09；根与子目录已发现 |
| C21.03 / 按表落地，共享入口保留CLI优先及完整清单 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 独立要求、验证证据 | 已覆盖 | E01–E09；根与子目录已发现 |
| C21.04 / 条件集成仅实际决定且授权，不造未知change | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 独立要求、验证证据 | 已覆盖 | E01–E09；根与子目录已发现 |
| C21.05 / 回读内容、格式、资源、发现及必要代码门禁 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 独立要求、验证证据 | 已覆盖 | E01–E09；根与子目录已发现 |
| C21.06 / 必需真实调用及质量运行验收全部完成后才声明初始化完成 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 交接与未完成 | 阻塞 | C06.16/C10.02/C10.04/C10.06仍缺独立目标会话运行证据 |
| C21.07 / 按覆盖/产物/验证/例外交付，不依赖阻塞工作已完成 | 适用；本次维护合同 | [initialization-coverage.md](initialization-coverage.md) / 统计、交接 | 已覆盖 | 本次交付为部分完成 |

### C22 / 参考来源

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C22.01 / 实际采用结论逐条官方/源码核验，有日期版本/安装限制 | 适用；本次维护合同 | [source-index.md](source-index.md) / 全部章节 | 已覆盖 | E04；只保留本次采用的可追溯记录 |
| C22.02 / 不机械复制无关来源，rolling/main不当本机版本 | 适用；本次维护合同 | [source-index.md](source-index.md) / 全部章节 | 已覆盖 | E04；只保留本次采用的可追溯记录 |
| C22.03 / 不继承2026-09-23旧核验/未审计ClawHub结论 | 适用；本次维护合同 | [source-index.md](source-index.md) / 全部章节 | 已覆盖 | E04；只保留本次采用的可追溯记录 |
| C22.04 / 来源字段保留，CLI低频未测与工具未采用诚实区分 | 适用；本次维护合同 | [source-index.md](source-index.md) / 全部章节 | 已覆盖 | E04；只保留本次采用的可追溯记录 |

### C23 / 维护提示

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C23.01 / 保留所有适用主题与完整CLI优先清单，精简只分层 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |
| C23.02 / 同步兼容/版本/验证，历史日期审计不删除 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |
| C23.03 / 稳定ID随新增要求增补，唯一表而非平行记录 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |
| C23.04 / 前后按要求比较而非标题/行数 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |
| C23.05 / 遗漏回放涵盖章节/子项/已有规则/迁移与替代，实际效果不作保证 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |
| C23.06 / 最终表/文件/证据核对，有阻塞只部分完成 | 适用；本次维护合同 | [ai-agent-maintenance/SKILL.md](../../.agents/skills/ai-agent-maintenance/SKILL.md) / 输入与工作流、纠错与复核 | 已覆盖 | 本表与E06–E09；真实回放在C10保留阻塞 |

### C24 / 用户补充：仓库写作规范 Skill

| ID / 具体要求 | 适用性与依据 | 实际落点（文件 + 章节） | 状态 | 核验证据或缺口与下一步 |
| --- | --- | --- | --- | --- |
| C24.01 / 完整读取指定指南并记录版本与来源 | 适用；用户指定原稿 | [source-index.md](source-index.md) / 写作规范的本地来源 | 已覆盖 | E11；577行、源研究日期与SHA-256，未写入外部笔记 |
| C24.02 / 简版规则及按需细节，单句修改不扩成全文流程 | 适用；源简版及使用说明1–50 | [SKILL.md](../../.agents/skills/writing-guidance/SKILL.md) / 日常流程、按需细节 | 已覆盖 | E11；短入口与仓库内细则/示例，可脱离外部路径 |
| C24.03 / 事实强度、读者与作者声音 | 适用；源52–79 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 事实、读者与作者声音 | 已覆盖 | E11；不编造、不扩大范围、保留判断及第一人称 |
| C24.04 / 结构、段落、标题和真实逻辑关系 | 适用；源81–118 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 结构与句式 | 已覆盖 | E11；可选顺序、必要摘要与提醒、无固定点数或句数 |
| C24.05 / 对举、转折、递进及语法检查 | 适用；源120–160 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 结构与句式 | 已覆盖 | E11；对举否A肯B，转折/递进保留A，禁止机械换连接词 |
| C24.06 / 用词按含义调整，保护准确术语 | 适用；源162–209 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 用词按语义判断 | 已覆盖 | E11；原词表各类含义与例外已转写，无禁词或全局替换 |
| C24.07 / 英文与双语文风 | 适用；源211–221 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 结构与句式、用词按语义判断 | 已覆盖 | E11；目标语言语序、词义/术语与否定/递进 |
| C24.08 / 注释、接口、教程及日志的技术含义 | 适用；源223–251 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 技术文本与本站格式 | 已覆盖 | E11；次数、时间、范围、状态、错误、承诺及原始输出 |
| C24.09 / 文章、博客、作者判断与图表 | 适用；源253–265 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 事实、读者与作者声音、技术文本与本站格式 | 已覆盖 | E11；保留过程、判断与元数据，不虚构经历或装饰图表 |
| C24.10 / 改写例与应保留的反例 | 适用；源267–365 | [examples.md](../../.agents/skills/writing-guidance/references/examples.md) / 全文 | 已覆盖 | E11；假设性质、数量/状态、作者声音、句式和正常术语 |
| C24.11 / 新写与改写的流程、停止与撤回条件 | 适用；源367–386 | [SKILL.md](../../.agents/skills/writing-guidance/SKILL.md) / 输入与范围、日常流程 | 已覆盖 | E11；先事实论证，再结构措辞，语义退化时停止该轮 |
| C24.12 / 交付检查与真实验证状态 | 适用；源388–405 | [SKILL.md](../../.agents/skills/writing-guidance/SKILL.md) / 验证与交付 | 已覆盖 | E11；按需检查、区分未验证/缺样本/未通过，不以构建证明示例 |
| C24.13 / 研究依据与适用边界 | 适用；源407–445、575–577 | [source-index.md](source-index.md) / 写作规范的本地来源 | 已覆盖 | E11；保留源研究日期，论文未重新核验，模型效果未测 |
| C24.14 / 后续调研、样本对照与规范更新 | 适用；源447–573 | [writing-rules.md](../../.agents/skills/writing-guidance/references/writing-rules.md) / 交付与规则维护 | 已覆盖 | E11；版本/阅读范围/反例、分开新写与润色、调优/留出和语义优先 |
| C24.15 / 本站格式与按需入口同步 | 适用；仓库Docusaurus及现有共享规则 | [AGENTS.md](../../AGENTS.md) / 规则入口；[docs-maintenance](../../.agents/skills/docs-maintenance/SKILL.md) / 工作流 | 已覆盖 | E11；四Skill索引、MDX/frontmatter/资源条件，不复制整份指南 |
| C24.16 / 格式、引用、发现与新增评估条件 | 适用；静态交付与运行效果分开 | [skill-evaluation.md](skill-evaluation.md) / Q21–Q28、T04–T05；本表E11 | 已覆盖 | E11；格式/lint/无模型发现已执行，真实回放沿用C06.16与C10阻塞 |

## 未完成、例外与交接

2026-10-06 窄维护：双语言目录、默认英文、翻译同步摘要与资源合同已同步 AGENTS、docs-maintenance、site-change、writing-guidance 及工程工作流。后续用户反馈已写入短标题、宣传句式、导航命名的细则与反例，覆盖 C24.04、C24.06、C24.07、C24.10、C24.15、C24.16 的受影响内容；CLI 清晰度与单一 latest 入口同步相关参考。实际进度、命令与验证见 [多语言计划](multilingual-plan.md) M09–M11。本表稳定 ID、统计、历史证据和独立模型回放未测状态保留，不重新统计或宣称完成整套初始化。

当前目标：交付可维护AI规则与Skills并完成完整初始化验收。已完成所有不依赖真实模型回放的规则落地、静态/构建验证与无模型发现诊断；授权范围仍为本仓库可逆维护，无发布、全局配置或模型会话委派。

未完成 ID：`C06.16`（明确调用）、`C10.02`（真实路由）、`C10.04`（质量对照）、`C10.06`（留出/拒绝/恶意输入回放）、`C21.06`（完整运行验收）。具体缺失条件为当前会话没有新Skill的独立真实目标调用与可比有/无Skill回放；无模型诊断只验证发现。下一步在团队目标客户端受控独立会话完成 Q01–Q28 和 T01–T05，记录客户端/模型/工具/预算/次数/轨迹/产物，再更新这同一份覆盖表。不把结构检查或预期路由计为运行成功。

11项不适用：Claude专属桥接运行（本次未确认采用/无桥接）、自定义Agent创建运行（无稳定角色需求）、八项OpenSpec实际步骤（未采用/未安装）、MCP接入运行（无仓库接入需求）。各项未来条件流程及替代能力已写，不把缺工具或未知答案当不适用依据。

既有CI使用tag Actions、长期部署密钥、关闭SSH主机校验及force-push，已在operations记录；后续发布维护提交具体改造方案，本次不触发发布或扩大CI改造。三个锁文件保留。pnpm9 CI复现、其他客户端、浏览器及生产验收未执行，不能以本地npm构建代表它们。

回滚仅撤销本任务新增AI文件和README/config对应改动；不清理用户文件或依赖目录。本次隔离fixture/原始prompt诊断包含用户级上下文，脱敏证据已保存在本表；已核验精确绝对路径及无链接后清理fixture、原始诊断、临时检查脚本和日志，退出0。普通构建输出依原忽略规则保留。以后更新保持稳定ID、完整主题与原始30+补充1候选，不因精简删适用要求。
