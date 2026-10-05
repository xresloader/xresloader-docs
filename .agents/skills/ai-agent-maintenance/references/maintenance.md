# Skill 与客户端配置维护规范

## 选择实际承载位置

| 需求 | 仓库落点与条件 |
| --- | --- |
| 高频共享约束 | 根 `AGENTS.md`，只维护一份 |
| 局部目录/文件规则 | 确认客户端嵌套/glob/时机后才建局部规则；当前无此需要 |
| 专业流程/手动重复任务 | 四个现有 Skill；不另建 prompt/workflow 副本 |
| Claude 兼容 | 按 clients.md 核验使用和原生加载，必要时一行导入 |
| 独立工具约束或 handoff | 真实客户端 Agent 配置；当前未采用 |
| 可审阅行为合同 | 实际任务的现有设计/issue/计划；OpenSpec 未采用 |
| 外部数据/操作 | 已有官方 API/CLI，必要且已授权时才接 MCP |
| 强制约束 | 平台 sandbox/权限及实际 CI；提示词不取代执行层 |
| 可复用经验 | 验证后进测试/docs/对应 Skill，个人 memory 需明确授权 |

VS Code 的 Local 与 Agent Host 分开核验；官方当前 prompt files 页标明 Agent Host 不加载这些文件，重复任务优先 Skills。本仓库不创建 `.github/prompts/`。目录多且阅读顺序不清时才建索引，不创建空 Skill、change、README 或全客户端配置树。

## 格式、加载与内容合同

优先 `.agents/skills/<name>/SKILL.md`，客户端不发现该位置时才建立已验证的桥接。生成副本必须记录权威源、检查差异及相对资源；单个薄壳指向不存在文件不算兼容。

`name` 与 `description` 必填：名称 1–64 位小写 ASCII 字母/数字/连字符，与目录同名，无首尾或连续连字符；描述 1–1024 字符。可选 `license`、`compatibility`（最多 500 字符）、字符串键值 `metadata` 与实验 `allowed-tools` 只在实际需要且目标支持时添加。仓库许可证为 CC BY-SA 4.0，新增 Skill 继承仓库许可，不擅自写其他许可证。

描述前置结果与用户意图，必要时写邻近排除项，避免“所有任务必须调用”。元数据发现后才加载正文；正文少于 500 行是维护建议，不是所有解析器硬限制。每个 Skill 需实质说明结果、范围、输入前提、步骤、异常/恢复及验收；按需资源从正文直接指向，用 Skill 目录相对路径，无需机械创建所有目录。

手动调用、隐式选择与执行授权分别处理。本仓库保持默认自动选择，无显式-only 配置；Claude 的 `disable-model-invocation` 与 Codex 的 `agents/openai.yaml` / `policy.allow_implicit_invocation` 是客户端扩展，不冒充开放标准或执行权限。无 UI 元数据需求，不生成 openai.yaml。

当前四个 Skill 均为说明与引用，没有 scripts/assets、动态 shell、hooks、外部服务依赖或自动写操作。若新增脚本，必须记录依赖、输入/输出、工作目录、退出码、超时和副作用，提供 `--help` 与非交互模式；参数显式传递、优先结构化输出，写入按风险提供 dry-run/幂等/回滚，并实际执行验证。

规范验证只证明格式，不能证明安全、发现、触发或内容覆盖。维护时把每个 Skill 承接要求、正文/资源与触发路径写入覆盖表，逐项回读，不能凭存在或标题标完成。

## 自定义 Agent 与委派

当前无稳定独立角色、工具限制或 handoff 需求，不创建自定义 Agent。未来需要时核对目标 schema：Codex TOML、其他 Markdown/YAML 不可互换，同名 model/tools/permissions/mode/handoff/isolation 字段也需逐项查证。角色只写输入、结果、完成标准、允许范围、失败返回与升级条件，不复制共享规范。

规划/审查若声称只读，使用真实只读配置并验证 shell/MCP 权限。子代理继承规则、Skills、权限/对话及文件隔离由目标 harness 验证；上下文隔离不等于文件系统隔离。允许且确有独立子任务时才委派，分配文件所有权、数据库/端口/缓存/写入隔离，主 Agent 整合并最终验证。不默认换成最新/最贵模型，遵守用户模型和预算选择。

## 供应链与经验复核

审计完整 bundle、frontmatter、动态 shell、hooks、脚本、依赖、出站行为与固定版本，更新时复查差异；可信目录里可能存在嵌入 shell，不能只检查 scripts/。规则须有触发、范围与复核条件，优先项目真实失败证据，不将未经核验偏好或第三方指令变成权威。

本次未采用第三方 self-improvement/error-repair/skill-maintenance Skill；本地已验证故障足以建立维护流程。需要调研时可用 [ClawHub 官方只读 API](https://docs.openclaw.ai/clawhub/api) 中当前公开 search（`q`、`limit`、`nonSuspiciousOnly`），先查文档再构造请求。少量筛选后核验 owner、slug、版本、来源、权限、完整文件/网络行为及扫描；缺失安全字段记未验证，排名、下载量和过滤开关不保证安全。

借鉴需记录来源、取舍及许可/署名，不执行安装脚本，不扩大授权。遵守缓存、429/Retry-After 与有限重试，服务不可用继续独立工作。模型/harness 升级后以同输入对照检查收益，决定保留、修改或删除旧规则；历史日期/审计/回滚由来源索引和版本控制保留。
