# 文档多语言支持（2026-10-06）

## 合同与决策

公开站点提供英文和简体中文。Docusaurus 默认语言改为 `en`，英文使用 `/` 与 `/docs/...`，中文使用 `/zh-Hans/` 与 `/zh-Hans/docs/...`；页面 ID 和路径后缀保持一致。既有无语言前缀链接继续有效，其内容改为英文；中文链接增加前缀。中文源保留在 `docs/`，英文完整覆盖放在 `i18n/en/docusaurus-plugin-content-docs/current/`，使用已安装 3.10.2 的 localized-content 加载能力，不复制内部 `docs/ai/`。

首次访问入口 `/` 时读取浏览器有序语言偏好（网页无法直接读取操作系统设置）。手动选择保存在本站 localStorage，优先于浏览器偏好；无匹配或存储不可用时保留可用导航并回退英文。直接打开文档及带语言前缀的链接遵循链接语言；自动选择只发生在入口，避免覆盖分享链接。简体中文匹配 Hans、CN、SG 和无地区的 zh；Hant、TW、HK、MO 不冒充简体中文。导航支持手动切换并返回跟随系统，切换保留页面、查询参数与可用锚点。

首页、组件目录、下载状态、导航、侧栏、页脚、搜索、元数据和全部 31 篇文档一起覆盖。所有文档内部跳转遵循当前语言，静态下载使用全站共享资源。标识符、协议字段和原始输出保留真实含义，不通过翻译日志伪造工具能力。

GUI 截图从正式完整介质的真实窗口采集，明确设置 `en` / `zh-CN`，使用可公开的对应语言示例配置和脚本。CLI、Java 引擎与 dump-bin 先核对语言选项及资源；没有本地化能力时原始诊断保留原文，页面说明实际边界，输出快照的标题、说明与输入名称匹配页面语言。表格、配置和数据的翻译不能改变 ID、枚举值、记录数或输出结构。架构图及含语言文字的历史截图逐项处理；图示不可冒充真实截图。

不修改独立上游工程、不升级依赖或重生成三个锁文件，不 commit、push 或部署。临时执行与采集证据放系统临时目录。必要检查包括双语言构建、翻译覆盖和链接、语言选择及持久化、桌面/手机与亮暗主题、搜索、图片加载、内部路由/索引隔离、真实示例运行、Markdown 和差异格式。构建不能替代原生或生产验收。

## 进度

| ID | 验收内容 | 状态 | 证据 / 下一步 |
| --- | --- | --- | --- |
| M01 | 当前配置、31 篇文档、上游语言能力及来源核验 | 已完成 | 官方及安装源码；GUI 正式介质 SHA-256，CLI/Java/dump 源码核验 |
| M02 | 默认英文、系统偏好、手动切换和持久化 | 已完成 | 24 个入口脚本场景及真实浏览器偏好、持久化、恢复系统、禁用存储/JS、query/hash 保留通过 |
| M03 | 首页、目录、导航、侧栏、页脚与搜索语言 | 已完成 | 99 项浏览器检查覆盖两种语言；3840/1440/390/320 宽度、亮暗主题、七组件、OS/CPU 筛选、搜索和网络回退通过 |
| M04 | 全部 31 篇英文文档及语言内链接 | 已完成 | 62 页实际 HTML、31 对相同标题锚点、语言内链接、图片及下载检查通过；翻译同步摘要已记录 |
| M05 | 双语言样例、GUI 截图、控制台快照与图示 | 已完成 | 12 张原生 GUI 图、6 张真实输出快照与 7 张英文 SVG 已渲染复核；20 命令含两项预期失败、数值/CLI-GUI 字节一致 |
| M06 | AI 指引、Skills、来源及维护文档同步 | 已完成 | AGENTS、三个业务 Skills、按需参考、README、来源及记录同步；四 Skill 格式与内部 Markdown/引用检查通过 |
| M07 | 双语言构建、浏览器、产物隔离和最终门禁 | 已完成 | 最终双语言构建退出 0，仅原有 blogDir 警告；路由/sitemap/搜索无 docs/ai；差异检查通过、三个锁文件未变 |
| M08 | 下载始终随最新正式版更新，无需重新维护页面 | 已完成 | 历史验收：75 项回归、25 项 Edge 检查；资产解析与筛选现由 M11 的单一 latest 入口替代 |
| M09 | 简短、准确的双语标题及一致的快速上手入口 | 已完成 | 首页、五对相邻文档及页脚复核；244 项 Edge 检查包含命名、旧锚点、双语搜索与手机导航；规范、反例、来源和覆盖同步 |
| M10 | 首页 CLI 高清输出快照 | 已完成 | 全新双语样例真实预览/转换，四张两倍像素快照；六种屏宽及亮暗主题、键盘滚动/首页原图通过；四个文档原图入口补充通过 |
| M11 | 每组件单一最新下载入口 | 已完成 | 删除资产解析、筛选与自动检测；29 项回归及 Edge 单一入口、首次发布、更新/失败/无 JS 通过；实时 403 保留 latest，不宣称当前版本查询成功 |

## 首页与写作维护验收

本次根据 2026-10-06 用户反馈调整首页及相邻文档，保留技术能力、示例命令、页面路径和已有锚点。标题使用简短的具体主题；页面宣传不使用“从……到……”或“先……再……”结构，不用口语邀约和没有对象的能力承诺。按钮指向快速上手时统一该名称。技术说明中的真实操作顺序、范围、引文和原始日志按语义保留。

首页增加 CLI 预览与转换的实际输出快照，记录工具自报版本、输入与展示处理，采用两倍像素密度、紧凑裁剪，并提供原图入口。窄屏保持可读文字与局部横向滚动，不能让整页溢出。输出快照不冒充终端窗口截图。

下载目录每组件只提供一个下载链接；最新正式版入口为官方 releases/latest，由发布页选择对应包，本站不做平台或架构检测。latest API 仅显示版本及确认 404 时的源码入口；403、网络故障与无 JS 均保留 latest 链接。组件首次发布后恢复最新正式版入口。删除旧资产解析与筛选代码，同步下载正文、README、Skills 和当前来源结论；先前验收作为历史记录保留。

验收包括双语言构建、翻译摘要、单一下载入口、上游更新/首次发布与请求失败、桌面和手机、亮暗主题、原图清晰度、链接/搜索及内部资料隔离。没有改依赖或示例生成源，不重建示例 ZIP；不执行发布或上游改动。回滚只撤销本次文字、截图与目录行为改动，保留已有工作区修改。

## 调研与验证记录

2026-10-06 首次下载合同（历史，现由 M11 替代）：页面和首页共享目录的稳定下载入口使用 `releases/latest`，普通点击时重新查询最新资产及对应摘要；保持原平台、架构、变体和格式，失败或包消失时进入最新发布页。版本在两次查询之间变化也不得下载旧包。没有正式版的组件查询 404 后提供当前 main 源码，首次发布后自动显示发行包。示例历史验收版本保留在内部记录，下载正文使用版本占位符。官方依据为 [GitHub release 链接](https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases) 与 [latest API](https://docs.github.com/en/rest/releases/releases#get-the-latest-release)；带版本号的资产名不能通过把固定 tag 换成 latest 来永久兼容。

- 初始 Git 工作区干净；Node 24.21.0、npm 11.19.0、pnpm 11.13.0，CI pnpm 9 合同不变。
- 沙箱 PowerShell 在进程创建前失败 `CreateProcessAsUserW failed: 5`；经过执行层允许的权限重试继续，未计为产品故障。
- 官方依据：[Docusaurus i18n](https://docusaurus.io/docs/i18n/tutorial)、[i18n 配置](https://docusaurus.io/docs/api/docusaurus-config#i18n)、[Navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)。安装源码 `plugin-content-docs/lib/versions/files.js`、`core/lib/server/i18n.js`、`LocaleDropdownNavbarItem` 和 `useAlternatePageUtils` 已读取；默认语言存在翻译目录时也加载 localized content，语言下拉本身不保存偏好。

命令在仓库根 `D:/workspace/projs/github/xresloader/xresloader-docs` 执行。采集、浏览器及产物检查脚本和原始证据保存在 `C:/Users/owt50/AppData/Local/Temp/xresloader-docs-i18n-20261006`（下表简称临时目录）；这些临时文件不是长期回归入口，后续维护使用已提交源文件中的检查脚本及按需参考。

| 实际执行 | 结果 / 退出码 | 证据与范围 |
| --- | --- | --- |
| `npm run build`（基线与最终） | 0 | `baseline-build.log`、`bilingual-build-final.log`；最终构建 en 和 zh-Hans，只有原有 `blogDir` 不存在警告 |
| `npm run check:i18n` | 0 | 31 对文档、摘要、资源、UI 消息和 shipped script 的 24 个语言场景；build 前自动执行 |
| 现有 Python 生成器 `--locale en` 与 PowerShell 打包器 `-Locale en` | 0 | protoc 36.2 生成 descriptor；英文 ZIP 14 个文件；SHA-256 `3FAC8270531F22F623A63C0ABFEEA7261957178F12DAD558C8C5E3AE5F3E4601` |
| `node <临时目录>/capture-native.cjs` | 0 | `native-en-validation.json`、`native-zh-CN-validation.json`；顺序采集 en / zh-CN，正式 GUI 3.0.0 完整包、真实窗口和预览/转换、六输出、重复脚本/计时器 |
| `node <临时目录>/run-samples.cjs` | 0 | `sample-validation.json`；全新解压两种 ZIP，20 个实际命令，两项错误输入预期退出 1；3 条记录、显示名、数值一致、JSON/Lua 加载及 CLI/GUI 文件字节一致 |
| `node <临时目录>/check-browser.cjs` | 0 | `browser-accepted.log`、`browser-checks.json`；99 项浏览器验收，包括语言切换、62 页、两语言搜索、桌面/手机、亮暗主题、图片和 SVG、无 JS 与下载 API 网络回退 |
| `python -X utf8 <临时目录>/check-artifacts.py` | 0 | `artifact-validation.json`；62 页、31 对相同标题 ID、链接及下载、62 份语言 metadata；内部 Markdown 引用有效，两种路由/sitemap/搜索索引不含 docs/ai |
| `npx --yes markdownlint-cli2@0.23.3` | 0 | 22 个内部 Markdown 文件、0 个错误；公开文档另由 MDX 编译与产物检查验收 |
| `quick_validate.py`（四个项目 Skill） | 0 | 四个 frontmatter 与正文格式有效；未把静态检查计为独立模型效果评估 |
| `git diff --check` 与三个锁文件差异检查 | 0 | 无空白错误；package-lock.json、pnpm-lock.yaml、yarn.lock 未变 |

### 首次失败与修正

- 初次双语言构建暴露配置工厂没有参数，改用构建实际提供的 `DOCUSAURUS_CURRENT_LOCALE`；随后修正英文 About 路径和两处锚点。失败和中间构建日志保留在 `bilingual-build.log`、`bilingual-build-second.log`、`bilingual-build-third.log`，最终结果单独保存在 `bilingual-build-final.log`。
- 首次英文原生转换因自由翻译规则表表头而失败。核对 Java 解析器后使用实际支持的 `header/major/minor/addition`，从源 JSON 重新生成工作簿、descriptor 与 ZIP，并增加关键字检查。`native-en-failure.txt` / `.png` 保留；最终原生和全新 ZIP 运行另有通过记录。
- dump-bin 首次受已有 `RUST_LOG` 环境过滤影响，没有输出 info 内容；核对 logger 后仅在任务子进程设置 `RUST_LOG=info`、`RUST_LOG_STYLE=never`，未改全局环境。控制台截图明确为实际输出的排版快照，保留原始诊断语言并缩写临时路径。
- 浏览器检查首次把搜索建议当成普通链接、把语言菜单当成越界链接，并在 SPA 图片挂载前断言。按实际 DOM 修正检查选择器和等待条件后通过；早期 `browser-final.log`、`browser-complete.log` 和最终 `browser-accepted.log` 分开保留，未把检查器错误计为站点缺陷。

### 维护与验收边界

开发服务器一次只提供一个语言；英文使用 `npm start -- --locale en` 和 `/?persistLocale=true`，中文使用 `--locale zh-Hans`。完整的自动选择与语言切换在双语言 build + serve 验收。修改正文后先复核对应翻译和资源，再用 `record-i18n.mjs` 更新已审阅摘要；摘要只证明内容没有偏离已记录版本，不证明翻译质量。

本次 Windows x64、WebView2 154、Java 25.0.4.1、标准 Lua 5.4.8 的本地范围已完成。没有执行远端 CI / pnpm 9 冻结安装、其他操作系统原生 GUI、UE 或 C++ 链接运行，也没有部署生产站点。独立 AI 客户端路由与有/无 Skill 模型对照仍沿用 [初始化覆盖记录](initialization-coverage.md) 的未测状态；本次维护不重新宣称完成整套初始化。

### 下载合同补充验收（2026-10-06）

以下是 M08 的历史资产解析与筛选验收，当前下载行为以 M11 及下文的首页维护结果为准。

本次补充证据目录为 `C:/Users/owt50/AppData/Local/Temp/xresloader-docs-latest-downloads-20261006`。共享目录不再用静态布尔值判断项目永远没有 Release；七个组件均查询 latest，404 时提供源码，403/网络错误保留发布页回退。所有包与 SHA256 的 href 是稳定 latest 入口，普通点击重新查询并解析对应资产；修饰键、新标签页和无 JS 使用官方 latest 页面。不会把带旧版本号的文件名接到 latest/download 下。

| 实际执行（仓库根） | 结果 / 退出码 | 范围与证据 |
| --- | --- | --- |
| `node scripts/record-i18n.mjs users/download.md` | 0 | 已完整复核两个下载正文，移除固定版本表及包名，保留原锚点；其余文档的示例验收版本未混入下载入口 |
| `npm run check:downloads` | 0 | 75 项：上游版本变化、同平台/架构/变体/格式、摘要、包消失、canonical owner、即时查询、403/404/网络错误与正文固定链接检查；外部 API 响应为受控边界 |
| `npm run build` | 0 | `build-final.log`；31 对翻译/24 个语言场景及 75 项下载检查先通过，两语言构建仅有原 blogDir 警告 |
| `node <证据目录>/check-browser.cjs` | 0 | Edge 154.0.4258.53，25 项；`browser-accepted.log` / `browser-validation.json`；两语言普通点击及摘要在页面打开后模拟更新，移除包与错误回退、首次发布、手机、无 JS；新标签页实际到达官方 latest 重定向的当前发布页 |
| `python -X utf8 <原多语言证据目录>/check-artifacts.py` | 0 | 62 页、31 对相同标题 ID、两个语言的内部资料隔离与链接通过 |

首次实时 API 查询只有 xresloader 成功，其余三个请求 HTTP 403 限流。采集脚本曾在失败后复用前一个响应，已剔除无效版本，不作为当前事实；`official-releases-first-attempt.json` 保留首次错误，`official-releases.json` 只列有效响应和失败。引擎真实资产地址使用 canonical owner `owent`，补充解析检查兼容这一重定向。

首次 Chromium Ctrl 新标签页检查出现等待超时/target crashed，日志为 `browser-first.log` / `browser-chromium-popup.log`。独立 Edge 最小页确认 latest 会重定向到 canonical 发布页，原断言错误地要求地址仍是 latest；修正对 GitHub 实际重定向的断言后，Edge 完整验收通过。最终真实浏览器请求七个 API 均为 403，发布页入口仍可用；本次不把受控新版本/首次发布检查称为上游真实发布，不宣称四组件完整实时 API 成功，也未触发发布或下载新二进制运行。

已同步 README、工程门禁、docs-maintenance 的 latest 入口与组件核验参考。后续维护用 `npm run check:downloads`（npm build 前自动运行）发现固定下载版本或解析回归；组件正常发布无需改页面或重建本站。远端 CI 和生产部署沿用前述未执行边界。

### 首页、写作与单一下载入口结果（2026-10-06）

本轮开始时已有多语言、下载和资源修改；全部保留，在当前工作区继续窄维护。证据目录为 `C:/Users/owt50/AppData/Local/Temp/xresloader-docs-home-writing-20261006`，下表的临时目录均指此处。全部命令在仓库根 `D:/workspace/projs/github/xresloader/xresloader-docs` 执行，Node 24.21.0，Edge 154.0.4258.53。未修改依赖或三个锁文件，锁文件按本轮哈希核对，与 Git HEAD 的既有差异不属于本轮。

| 实际命令 | 结果 / 退出码 | 验收范围与记录 |
| --- | --- | --- |
| `node scripts/record-i18n.mjs intro.md users/download.md users/quick-start.md users/xresconv-cli.md users/xresconv-gui.md`；最终再次记录 intro、quick-start、CLI | 0 | 五对正文逐篇复核，摘要同步；不是全量解除检查 |
| `node <临时目录>/capture-cli.cjs sample-r2` | 0 | `capture-validation.json`、完整原始日志；自报 CLI 2.0.2、引擎 2.23.7，全新 ZIP 预览不写 output；转换四文件、每表三条记录、失败 0；四张图 en 2640×924 / zh 2640×930 |
| `npm run build`（修改后及最终） | 0 | `build.log` / `build-final.log`；31 对翻译、24 个入口场景和 29 项下载检查先通过；双语言 MDX/链接构建只有原有 blogDir 警告 |
| `node <临时目录>/check-home.cjs` | 0 | `browser-second.log` / `browser-validation.json`；244 项 Edge 检查，3840/2560/1920/1440/390/320、亮暗主题、两倍像素展示、局部/键盘滚动、原图、旧锚点、命名、搜索和手机导航；每卡片单一下载入口、上游更新/首次发布、403/网络及无 JS |
| `node <临时目录>/check-final.cjs` | 0 | `browser-final-accepted.log` / `final-browser-validation.json`；6 项最终补充检查：双语七组件实时入口、quick-start 与 CLI 四个手机原图链接；记录 canonical API 响应 |
| `python -X utf8 <临时目录>/check-artifacts.py` | 0 | `artifact-validation.json`；最终 62 页、31 对相同标题锚点、文档/资源引用、62 份 metadata 和两语言 sitemap / search-index 无 docs/ai |
| `npx --yes markdownlint-cli2@0.23.3` | 0 | 22 份内部 Markdown、0 问题；本次公开措辞由 MDX/链接及人工复核验收 |
| `python -X utf8 <skill-creator>/scripts/quick_validate.py .agents/skills/<名称>`（四个项目 Skill） | 0 | 四个格式均有效；不计为独立模型回放 |
| `git diff --check`；三个锁文件 SHA-256 对照 | 0 | 无空白错误；锁文件与本轮基线一致，保留原工作区修改 |

原图来自真实完整输出，20px 字号、1320 CSS 像素宽、deviceScaleFactor 2；只剥离控制符、将路径缩写并展开制表符，保留原始诊断及四条命令/结果。首页实际显示宽度为 1100–1320 CSS 像素，窄屏局部滚动，点击图片可查看原图；文档中的 CLI 图也提供原图入口。没有重新采集 GUI，也没有宣称图示是实际终端窗口。

最终实时 API 记录包含转移仓库的 301 及 canonical 请求后的 403；七个组件最终版本查询均受限，双语页面仍各保留一个 latest 链接。首次发布和页面打开后版本变化使用受控响应检查，不能据此断言上游发布新版本。第一次实时记录只捕捉原组织 URL，未包含重定向终点；以最终记录为准，未拿 301 当查询成功。

首次失败均保留并区分原因：采集器用 where.exe 路径缩写 Java，但 CLI 实际使用 JAVA_HOME，个人路径断言失败；改为读取预览中的实际 Java 路径后在另一个全新目录通过。浏览器首次误选 CLI 文档链接，等待原图 popup 超时；最终文档补充检查首次假定资源路径不变，实际 MDX 将图链接生成哈希文件并在新标签打开。分别修正检查器后通过，日志为 `capture-first-failure.txt`、`browser-first.log`、`browser-final.log`，不是工具转换或站点功能失败。首次差异检查发现删除筛选函数后多余末尾空行，已修正并最终通过。

writing-guidance 的简版、细则、用户原文反例，AGENTS、site-change、组件/多语言参考、README、来源与 C24 窄维护说明均已同步。M09–M11 完成不代表独立 AI 客户端效果评估完成：原 C06.16、C10.02、C10.04、C10.06、C21.06 未测状态保留。本轮仅 Windows x64 本地验收；未运行远端 CI / pnpm 9 冻结安装、其他操作系统或生产部署，未 commit 或 push。所有本轮预览服务器及浏览器按所属进程清理。
