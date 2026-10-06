# 当前事实与来源索引

核验日期：2026-10-06。此文件按事实/升级任务读取，不是启动上下文或完整目录树。责任 owner 为本仓库维护者；相关任务前与每季度复核易变项，升级、弃用、安全公告、加载失败或行为变化立即触发更新。当前有效记录维护一份，历史、审计和回滚由 Git 保留；不自动升级依赖或工具。

## 仓库事实

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| 本站 Docusaurus、React、Node 合同 | [package.json](../../package.json)、[npm 锁](../../package-lock.json)、[pnpm 锁](../../pnpm-lock.yaml)、[Yarn 锁](../../yarn.lock) / 初始 commit bad551a | 2026-10-05 / 文件与已安装包 | Docusaurus 3.10.2、React 19.3.0、Node 24.21.0 / npm 构建通过 | 相关任务/季度；依赖升级 | AGENTS、site-change、工程工作流 / 仓库维护者 |
| CI Node 24 / pnpm 9；本机 pnpm 11 与之不同 | [main.yml](../../.github/workflows/main.yml) / bad551a；实际 --version | 2026-10-05 / 文件、版本与命令 | pnpm 11.13.0 / 本地 pnpm build 失败；CI 未执行 | 包管理变化/CI 维护 | 命令与覆盖证据 / 仓库维护者 |
| 英文默认与中文前缀路由、显式侧栏及本地搜索 | [配置](../../docusaurus.config.js)、[侧栏](../../sidebars.js)、[首页](../../src/pages/index.jsx) / 当前工作区 | 2026-10-06 / 源码、双语言构建、99 项浏览器检查 | 3.10.2 / 桌面与窄屏、亮暗主题及两语言搜索实测；范围见多语言计划 | 配置/页面/搜索变化 | 两个业务 Skill / 仓库维护者 |
| 当前入门示例与历史 sample 分开维护 | [目录说明](../../source/sample/README.md)、[当前源](../../source/sample/current/)、[生成器](../../scripts/generate-docs-sample.py)、[打包器](../../scripts/package-docs-sample.ps1) / 当前工作区 | 2026-10-05 / 生成源、全新目录解压、JAR/CLI/GUI 真实转换及内容比较 | xresloader 2.23.7、CLI 2.0.2、GUI 3.0.0 / 当前样例实测；历史生成代码未重新验收 | 示例或上游版本变化 | docs-maintenance / 仓库维护者 |
| 许可为 CC BY-SA 4.0 | [LICENSE.md](../../LICENSE.md) / bad551a | 2026-10-05 / 正文 | 文档已核验 | 许可证变化 | 文档、Skill 许可 / 仓库维护者 |

## 实际采用的外部依据

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| Codex 项目规则发现与默认 32 KiB 合并边界 | [官方 AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) / rolling | 2026-10-05 / 官方正文与 CLI 诊断 | CLI 0.160.0 / 发现已验证，调用另列 | 季度/客户端升级与加载失败 | AGENTS、clients / 仓库维护者 |
| Codex 共享 Skills 发现与按需正文 | [Build skills](https://learn.chatgpt.com/docs/build-skills) / rolling | 2026-10-05 / 官方正文与诊断 | CLI 0.160.0 / 元数据已验证，触发未测 | 季度/版本和同名冲突 | Skills、clients、评估 / 仓库维护者 |
| Agent Skills 必需字段、名称与资源格式 | [规范](https://agentskills.io/specification) / rolling | 2026-10-05 / 官方正文、frontmatter 检查 | 四个项目 Skill / 静态格式核验，客户端验收另列 | 季度/字段与解析器变化 | maintenance、四个 Skill / 仓库维护者 |
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
| 正式短标题、宣传禁用覆盖/步骤口号、具体能力及统一快速上手名称 | 2026-10-06 用户本次明确反馈；首页、中文 UI、快速上手、CLI/GUI、intro 与页脚实际原文 | 2026-10-06 / 逐项审阅原文、目标路径与真实功能；双语同步及技术顺序反例复核 | [详细规则](../../.agents/skills/writing-guidance/references/writing-rules.md)、[改写对照](../../.agents/skills/writing-guidance/references/examples.md) / 用户写作偏好；独立模型效果未测 | 新标题、页面文案及同类反馈时 | AGENTS、writing-guidance、站点与文档 / 仓库维护者 |

外部路径仅用于追溯用户提供的原稿，不是客户端加载入口。规则按编辑建议采用，不继承“本仓库已经核验全部研究”的结论；不把研究中的模型、语料或语言结果推广成通用禁词表。当前验证范围见唯一覆盖记录的 C24 与 [质量评估](skill-evaluation.md)。

## 2026-10 主要组件与迁移依据

本轮只读核验本站同级的六个仓库：xresloader、xresconv-cli、xresconv-gui、xresloader-dump-bin、xresconv-conf、xres-code-generator。CLI 的 README 与新增示例有本地修改，参考后继续核对实现，不把未提交文字自动当作发行合同。版本与运行记录见 [任务验收](component-refresh-2026-10.md)。

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| 三个组件独立发布，最新正式版为 2.23.7 / 2.0.2 / 3.0.0 | [引擎 release](https://github.com/xresloader/xresloader/releases/tag/v2.23.7)、[CLI release](https://github.com/xresloader/xresconv-cli/releases/tag/v2.0.2)、[GUI release](https://github.com/xresloader/xresconv-gui/releases/tag/v3.0.0) / releases/latest HTTPS API | 2026-10-05 / 查询官方 API、版本和发行资产 | JAR 2.23.7、CLI 2.0.2；用户本地 GUI exe 为 3.0.0-dev.1；正式 GUI 3.0.0 完整包另行校验运行 | 发布/重大迁移时 | 下载、快速上手、首页 / 仓库维护者 |
| Java 17 目标、默认公式关闭与别名开启、数据源范围/转置、近期校验修复 | [源码](https://github.com/xresloader/xresloader/tree/f5ab9146)、HISTORY.md、pom.xml、build.gradle、ProgramOptions.java、DataSrcExcel、DataDstPb、scheme、vfy / f5ab9146 | 2026-10-05 / 追溯定义、重置、调用；真实 bin/JSON、范围/转置/stdin 示例 | JAR 2.23.7 / Java 25 实测；Java 17 与全套上游测试未运行 | 引擎升级/默认或协议变化 | 核心、映射、类型、插件、验证器、开发 / 仓库维护者 |
| CLI 2.x Rust 原生及 Python shim，路径/合并/退出合同 | [迁移合同](https://github.com/xresloader/xresconv-cli/blob/f1c90ee/doc/migration-contract.md)、Cargo.toml、src/cli.rs、xml_conf.rs、plan.rs、runner.rs、process_tree.rs、Python 转发层 / f1c90ee | 2026-10-05 / 子工程文档与源码、版本、预览、真实执行与直接 JAR 比较 | CLI 2.0.2 / Windows x64 实测；其他平台及上游全套测试未运行 | CLI 升级/迁移行为变化 | CLI、共用 XML、自动化、开发 / 仓库维护者 |
| GUI 3.0 Tauri、独立业务内核、脚本/树版本、日志与显示设置 | [子工程用户/开发文档](https://github.com/xresloader/xresconv-gui/tree/4b4f55a/docs)、packages/contracts/schema、backend/src/config 与 service、script-host、guardian、desktop、src-tauri / 4b4f55a | 2026-10-05 / 文档、Schema、实现及正式包原生界面/转换 | 3.0.0 / Windows x64 bootstrap；runtime-manifest sourceCommit 为 4b4f55aa122945c20a6ccf100f09c9631f950cda；其他平台及全套上游测试未运行 | GUI 升级/Schema/介质/原生权限变化 | GUI、脚本、架构、安装、构建、截图 / 仓库维护者 |
| GUI 正式截图来自经摘要验证的完整包；终端图为实际输出排版快照 | 官方 Windows x64 bootstrap .7z 与同名 .sha256 / 3.0.0；SHA256 fd256760c87ce9ae20c089caa621233770a4b68fe093fc795b2c55f3a11345ce | 2026-10-05 / 官方摘要匹配、tauri-driver + WebView2 原生窗口；真实 CLI 和 dump-bin 日志浏览器排版 | Windows WebView2 154、Node 24.21.0、Java 25.0.4.1 / 六张原生 GUI 图、CLI 与 dump-bin 两张注明方法的输出图 | 截图/输入/版本变化 | 截图、首页、组件核验参考 / 仓库维护者 |
| protobuf packed 默认与长度语义 | [官方编码说明](https://protobuf.dev/programming-guides/encoding/) / rolling；输出 schema 与实现 | 2026-10-05 / 官方正文与 pb_header_v3.proto、真实 bin 解码 | protoc 36.2 / 包装 header、记录数与类型已核对；旧 Lua 库逐个兼容性未测 | 解析器/protobuf 变化 | 输出加载与兼容说明 / 仓库维护者 |
| dump-bin 展示已导出的 bin、提取字符串和标签；最低 Rust 不能沿用 CLI 合同 | [源码与 README](https://github.com/xresloader/xresloader-dump-bin/tree/37211ce)、Cargo.toml、exec/options、main、protocol / 37211ce；[latest](https://github.com/xresloader/xresloader-dump-bin/releases/latest) | 2026-10-05 / 官方 API、版本、完整读取与字符串 JSON / 文本断言 | 2.6.0 / Windows x64 实测；上游构建、C++ 编译与其他系统未执行 | 发布/选项或协议变化 | 生态、下载、开发依赖及构建 / 仓库维护者 |
| 七组件各保留一个 latest 下载入口；不检测 OS / CPU，确认 404 时提供源码 | 用户 2026-10-06 明确要求；[共享目录](../../src/components/ToolchainCatalog/index.jsx)、[版本查询](../../src/data/latest-release.mjs)；官方 latest API | 2026-10-06 / 源码核对、当前回归及 Edge 浏览器结果见多语言计划 M11；历史资产解析已删除 | stable href 不依赖 API 成功；403/网络故障不冒充无正式版；版本更新与首次发布为受控响应验收 | 入口行为/组件发布变化 | 首页、下载与多语言维护 / 仓库维护者 |
| 首页 CLI 高清预览与转换为完整真实输出快照 | 当前 CLI 自报 2.0.2、JAR 自报 2.23.7；全新双语言 quick-start ZIP；[资源清单](localized-assets.json) homepageCli | 2026-10-06 / --test 未生成 output，转换四个文件各三条记录，失败数 0；Edge 两倍像素截图与原图复核 | en 2640×924、zh 2640×930；20px 字号、路径缩写、原始诊断保留，未冒充真实终端窗口 | 输入/工具/图片/展示尺寸变化 | 首页、入门图、组件核验参考 / 仓库维护者 |
| 协议 ZIP 为扁平头文件与 extensions 目录；tools ZIP 不含 protoc | xresloader 2.23.7 的 protocols.zip、tools.zip；官方 protoc 包 include；[protobuf C++ 版本](https://protobuf.dev/support/version-support/) | 2026-10-05 / 实际下载和 ZIP 成员、真实 descriptor / C++ 代码生成 | protoc 36.2 / 生成成功；未链接 C++ 程序 | 发行包/生成器布局与运行库变化 | 下载、协议加载、历史 shell 脚本 / 仓库维护者 |
| 完整 XML / include / 注释与可选项、16 项批处理、历史 11 行加载示例保留 | 同级 xresconv-conf/sample.xml、sample_include.xml；Git HEAD 样例和代码块；[示例源](../../source/sample/) | 2026-10-05 / CLI 真实执行、原生完整 GUI 六输出和按钮重复调用；隔离旧 XML 与 Bash 生成 | 当前 ZIP 14 文件（含可选原生 Lua 清单与加载源）、3 条入门 / 11 条旧示例；16 项默认通过、可选严格失败 2 项；旧生成代码不作为新版证明 | 示例和合同变化 | 文档、配置、脚本、维护参考 / 仓库维护者 |
| 默认 Lua table 结构、原生加载与缓存重载 | xresloader DataDstLua.java / f5ab9146；[Lua dofile](https://www.lua.org/manual/5.4/manual.html#pdf-dofile)、[require](https://www.lua.org/manual/5.4/manual.html#pdf-require)；[Lua 官方源码与摘要](https://www.lua.org/ftp/) / 5.4.8 | 2026-10-05 / 源码、官方手册、CLI / JAR 真实生成、全部文档 Lua 代码实际执行 | 标准 Lua 5.4.8 / 官方源码摘要匹配后临时构建；13 个实际命令，头信息 / 记录数 / 中文 / 联合键 / require 缓存重载通过；未做其他 Lua 版本验收 | 引擎输出或 Lua 版本变化 | 入门、数据加载、输出格式、示例包 / 仓库维护者 |
| xres-code-generator 的 C++ / 原生 Lua 索引接口，作为最推荐的项目加载方式 | 用户推荐顺序；[生成器源码](https://github.com/xresloader/xres-code-generator/tree/c563a1627f63cdb8eb2071a59bcb7f59c6d2fe8b)、README、config_manager / config_easy_api / DataTableCustomIndex53 模板、DataTableService53.lua、xrescode 扩展 / c563a162 | 2026-10-06 / 本地干净 HEAD、当前模板重新生成 C++ / Lua，文档选项真实编译、Lua 章节节选直接执行 | me() 返回共享指针；C++ 按 id_level / id 查询单条 / 列表；原生 Lua 标准 require 读取 table；三等级 / 消耗 50 / 缺键结果实测；C++ 未链接运行 | 生成器模板 / 加载接口变化 | 数据加载、生成器公共步骤及原生 Lua 集成 / 仓库维护者 |
| 官网包源、TLS 与当前工具配置入口 | [Maven settings](https://maven.apache.org/settings.html)、[Yarn 4 配置](https://yarnpkg.com/configuration/yarnrc)、[Tauri 前提](https://v2.tauri.app/start/prerequisites/) / rolling；本地构建与打包配置 | 2026-10-05 / 官方正文与上游入口 | 配置建议已核验 / 未改用户包源、未安装依赖或重建上游 | 包管理器/平台前提变化 | 依赖、构建、包源与代理 / 仓库维护者 |

新 SVG 架构图为本站可编辑源；品牌 mark.svg / mark-inverse.svg 来自 GUI 当前 doc/brand，保留其既有路径内品牌设计。按需 [组件核验参考](../../.agents/skills/docs-maintenance/references/component-review.md) 承载复发问题，本轮业务验收不修改 AI 初始化原有未测结论。

## 文档多语言（2026-10-06）

| claim / scope | source_url / source_version | verified_at / method | installed_version / status | review_cadence / update_trigger | impact / owner |
| --- | --- | --- | --- | --- | --- |
| 英文默认语言仍可加载完整翻译覆盖；中文使用语言前缀 | [Docusaurus i18n](https://docusaurus.io/docs/i18n/tutorial)、安装 plugin-content-docs/lib/versions/files.js、core/lib/server/i18n.js、build/buildLocale.js | 2026-10-06 / 官方正文与安装源码 | 3.10.2；使用 DOCUSAURUS_CURRENT_LOCALE，无参数配置工厂；运行见多语言计划 | 路由/插件升级 | 配置、页面与翻译目录 / 仓库维护者 |
| 入口浏览器偏好、手动选择和英文回退 | [Navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)、安装 LocaleDropdownNavbarItem 与 useAlternatePageUtils | 2026-10-06 / 源码、shipped script 的 24 个场景及真实浏览器 | 页面无法直接读 OS；手动存储、恢复系统、保留 query/hash、无 JS/禁用存储通过 | 入口/客户端变化 | site-change / 仓库维护者 |
| GUI 界面与项目内容分别本地化；原始工具日志英文 | GUI apps/desktop/src/i18n/en.ts、localization.md、CLI parser、引擎 ProgramOptions、dump exec/logger.rs | 2026-10-06 / 只读上游源码、正式介质 SHA-256 与双语言原生转换 | GUI 3.0.0、CLI 2.0.2、引擎 2.23.7、dump 2.6.0；来源见 [资源清单](localized-assets.json) | 工具语言/版本/截图变化 | docs-maintenance / 仓库维护者 |
| 英文规则表关键字、数值与加载一致性 | SchemeDataSourceExcel.java、SchemeDataSourceBase.java、current/en、生成与打包脚本 | 2026-10-06 / 首次错误表头失败留存，修正后全新双语言 ZIP 运行；20 命令含预期失败 | header/major/minor/addition；3 条记录、JSON/Lua、CLI/GUI 字节一致 | 示例/解析器变化 | 多语言维护 / 仓库维护者 |
| releases/latest 稳定指向最新正式发布页 | [GitHub release 链接](https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases)、[latest API](https://docs.github.com/en/rest/releases/releases#get-the-latest-release) | 2026-10-06 / 本次重读官方正文；最新入口行为见 M11，旧资产解析验收保留为历史 | 每组件一个最新入口，包及摘要在官方发布页选择；不维护版本资产直链 | 仓库迁移/链接行为变化 | docs-maintenance、组件参考与下载正文 / 仓库维护者 |

执行详情和未验收边界维护在 [多语言计划](multilingual-plan.md)，英文图示为可编辑 SVG，控制台为真实输出排版快照；不把图示称为原生截图。

## 维护规则

关键结论必须有 scope、版本及实际方法；搜索摘要只用于定位。官方正文和安装源码冲突时继续追发行版本/测试，不能挑有利一条。无法核验保留未验证与缺失条件，不以近似产品或旧日期替代。更新权威合同后同步受影响规则、Skill、命令、图示和覆盖记录，回读实际产物，再更新状态。
