# 2026-10 工具链文档与界面更新

## 合同

目标：按当前正式版与本地实现核验 xresloader、xresconv-cli、xresconv-gui、dump-bin 的用户和开发文档，修正旧运行时、路径、脚本与界面描述；快速上手包含首次转换、核对 Excel 和加载数据，详细功能分到参考页，保留能力宣传与所有示例的有效用途。

范围：本站公开文档、侧栏、首页、样式、可公开的示例与截图，以及受影响的维护指引和来源索引。保留既有页面 URL、配置参考页章节和快速上手显式锚点；内部资料继续排除路由和搜索。引擎、CLI、GUI、dump-bin、xresconv-conf 和 xres-code-generator 六个上游仓库只读，不提交、推送或部署，不执行真实项目原始输出和事件脚本。保留开始时已有的三处 AI 资料修改及所有锁文件。

依赖：现有 Node 24、Java、本地 JAR/CLI、当前 GUI 发行包、浏览器与原生驱动。示例运行使用系统临时目录；产物、日志及采集脚本与站点 build 分离。无对应平台时只报告本机验证，不推导跨平台验收。

失败模式：旧文档或上游 README 与源码冲突时追溯实现并实际运行；预览不计为转换成功；批次成功不虚构逐条结果；截图必须来自真实界面或明确标注的实际终端输出。回滚通过撤销本任务对应源文件差异恢复，不覆盖用户原有修改。

## 进度

| ID | 验收内容 | 状态 | 证据 / 下一步 |
| --- | --- | --- | --- |
| R01 | 当前发布版本、迁移合同与源码差距 | 已完成 | 官方 API 2.23.7 / 2.0.2 / 3.0.0；正式 GUI 包 SHA256、manifest commit 与本地 HEAD 一致 |
| R02 | 简短快速上手与可下载、可复现示例 | 已完成 | current 源 + ZIP；全新目录、4 输出、每表 3 条、JAR/CLI/原生 GUI 字节一致 |
| R03 | CLI 选项、路径、输出矩阵与 Python 迁移 | 已完成 | 新 CLI 页、共用 XML；migration-contract、cli/xml_conf/plan/runner；预览与执行 exit 0 |
| R04 | GUI 安装、界面、脚本、选择器与迁移 | 已完成 | 新 GUI/脚本页；原生正式版转换、事件与按钮示例；启动竞争及规避写入 FAQ |
| R05 | 核心引擎参数、数据源与校验文档复核 | 已完成 | 源码/Schema/近期 HISTORY；默认值、范围、转置、Duration、验证器、插件、packed 与 UE 更新 |
| R06 | 开发依赖、构建、架构、接口、打包与验证 | 已完成 | 四页重写；当前 Maven/Gradle、Cargo、GUI commands/Schema；新增可编辑 SVG 架构源 |
| R07 | 截图更新、首页和文档 UI | 已完成 | 5 张原生 GUI + CLI 实际输出图；响应式首页、亮暗主题、文档布局、侧栏；最终浏览器 91 项通过，SVG/原生图目视检查 |
| R08 | 维护指引、来源同步及最终门禁 | 已完成 | Skill 按需参考、来源/样例/评估同步；build、Markdown、diff、公开路由和搜索隔离全部通过 |

## 补充要求与复核进度

上一轮过度缩减了能力介绍和详细示例。以下补充验收覆盖恢复内容、数据加载、latest 下载和宽屏布局；R01–R08 记录上一轮验证范围，不代表补充要求已经验收。

| ID | 验收内容 | 状态 | 证据 / 下一步 |
| --- | --- | --- | --- |
| S01 | 保留能力宣传、完整组件及正确用途 | 已完成 | 九项首页能力、概览十项能力、七组件仓库 / 用途 / 下载；dump-bin 源码和 2.6.0 实际读取 |
| S02 | 根据目标 OS 提供 latest Release 实际下载资产 | 已完成 | 官网 API 资产；Windows / macOS / Linux × all / x64 / ARM64，错误 / 无 JS 回退和真实浏览器请求 |
| S03 | 快速上手包含 Excel 数据核对和程序加载 | 已完成 | 入门表格与 Node 标准库加载实测；加载参考页与原 11 行表、两种 C++ 源和生成命令保留 |
| S04 | 完整 XML、include、注释、可选项和脚本 | 已完成 | 两份完整 XML 与文档逐字一致；CLI 真正执行、原生 GUI 六输出与重复按钮、旧 XML 七输出、Bash 隔离生成 |
| S05 | 4K / 2K / 1080p / 平板 / 手机布局 | 已完成 | 最终 113 项浏览器检查；3840 到 320 px 两主题与 DPR 2，4K 组件区 2560、正文 1680；主题实际切换和首页目视检查 |
| S06 | 示例保留清单、构建、下载与运行验证 | 已完成 | 33 个原样例 / 图片文件保留、三锁不变；31 公开文档、AI 隔离；build、内部 Markdown 和 diff 通过 |
| L01 | 原生 Lua 加载：入门、详细章节与可运行源 | 已完成 | 可选 convert-lua.xml 与 load-lua.lua；标准 Lua 5.4.8 执行 13 个实际命令，章节代码、缓存重载及计数失败检查通过；ZIP 十四成员 |
| G01 | 最推荐的生成器加载独立章节与 C++ / Lua 索引节选 | 已完成 | 当前模板重新生成 C++ / Lua；文档选项、API 返回类型与参数核对；文档 Lua 节选实测 50 / 三等级，并修正原生 Lua 集成页运行时说明 |

## 初始基线

- 文档仓库已有修改：`.agents/skills/ai-agent-maintenance/references/clients.md`、`docs/ai/initialization-coverage.md`、`docs/ai/source-index.md`。
- 本地上游 HEAD：xresloader `f5ab9146`，CLI `f1c90ee`，GUI `4b4f55a`。CLI README/示例有未提交修改，只读参考并核对运行。
- `xresconv-cli.exe --version` 与 `java -jar xresloader-2.23.7.jar --version` 均 exit 0，分别返回 2.0.2、2.23.7。
- Node 24.21.0、Java Microsoft OpenJDK 25.0.4.1；不声称已运行 Java 17、CI 或其他操作系统。
- 沙箱启动器 `CreateProcessAsUserW failed: 5`，通过执行层允许的 PowerShell 路径完成读取。Web 工具无法访问 GitHub API，改用 PowerShell HTTPS API 查询正式版本和资产。

## 已修正的主要问题

- CLI 的 Python 主程序、GUI 的 Electron 架构与安装方式已经过时；分别补 Rust 转发迁移、Tauri / WebView 与完整介质依赖。
- 旧文档把路径均视为 XML 相对路径；补 include 和工作目录的不同基准、多值重新分组、数据版本与重复 include 差异。
- 引擎帮助的公式默认提示与初始化代码不符，字段别名默认描述也过时；按 ProgramOptions 初始化和 reset 路径修正，未将 CSV/ODS 后缀提示当成实际读取能力证明。
- 补结束坐标、转置与 Duration 单位、2.23.1–2.23.7 校验和 UE 修复；更正 protobuf packed 语义、插件命名空间、bool/int64/repeated 类型与验证器错误介绍。
- 旧快速上手含协议工具链和大段加载代码，样例隐藏校验器依赖；改为可下载基础数据，详细内容由参考页承载。历史文件保留并标记来源，不直接修补生成代码。
- 原生测试连续三次发现 GUI 3.0.0 同时加载 input / custom-selector 的接线竞争；参数解析正常，snapshot.customSelectors 为空。源码 sessionEpoch 与 wired 能解释提前返回。仅在本站记录问题、可复现顺序和规避，不修改独立上游。

## 示例和截图来源

当前示例有 kind.proto / tables.json 源，scripts/generate-docs-sample.py 用标准库生成 OOXML，再调用 protoc 36.2 生成 descriptor。数据取上游 sample 基础人物三条及本站历史升级三条，具体来源见 current/README。第一轮 ZIP 为六文件；S01–S06 补充后为十二文件，增加 JSON / C++ 加载源、完整 XML / include 与选择器。L01 再加入原生 Lua 的可选转换清单和加载源，最终 scripts/package-docs-sample.ps1 打包十四个明确文件。当前 ZIP SHA256：76309440a90aa7dc5e5eecf279bdd493939fa92ff34ac5d1aa4ae68b4b9d845c。

GUI 下载官方 3.0.0 Windows x64 bootstrap 包，并匹配官方 .sha256：fd256760c87ce9ae20c089caa621233770a4b68fe093fc795b2c55f3a11345ce。runtime-manifest sourceCommit 为 4b4f55aa122945c20a6ccf100f09c9631f950cda，自带 Node 24.21.0。截图使用 WebView2 154、匹配的 msedgedriver、tauri-driver，窗口操作后采集亮色、暗色、输出矩阵与显示设置四张图。

第五张 gui-scripts-selectors.png 来自正式版扩展示例验收，展示真实按钮、条目命名与转换前事件日志；XML 通过已核验的原生 loadConfig RPC 加载，按钮与转换均从实际界面操作。

第六张 gui-config-example.png 来自完整 sample.xml：正式版以 input 启动后，通过已核验 setCustomSelectors 原生 RPC 注册选择器，随后键盘操作真实按钮和转换。before 事件真实启动 Node 子进程，六个 bin / JSON 字节与 CLI 一致；计时器连续两次、按钮计数 1→2 均通过。此轮未覆盖系统文件选择框，include 的实际转换由 CLI 验证。

dump-bin-output.png 将 2.6.0 对入门升级 bin 的真实完整输出排版为快照，未改写头信息或记录；alt 明确说明方法。首页随主题展示对应的原生亮 / 暗截图。

CLI 图片由成功运行的原始日志和 --version 排版为快照，缩写工作目录并去除终端 ANSI 颜色控制码，保留日志文字；公开 alt 已说明为输出快照。架构 SVG 为本站代码源并带 title/desc；品牌 mark / mark-inverse 来自上游 doc/brand。既有图片保留，不把新版本改动套到历史截图上。

## 第一轮实际验证（R01–R08）

目录为本站根，命令为本机执行。临时证据根：`C:/Users/owt50/AppData/Local/Temp/xresloader-docs-review-20261005`；该目录不作为后续客户端必需上下文。

| 检查 | 命令 / 方式 | 结果和证据 |
| --- | --- | --- |
| 基线与最终 MDX、资源和链接 | npm run build | exit 0；保留既有 blogDir 缺少的警告。中途新增的 ZIP Link / intro 关于页链接错误已修正后重建 |
| 内部 Markdown | npx --yes markdownlint-cli2@0.23.3 | exit 0；20 文件、0 问题；未宣称全站历史 Markdown lint 通过 |
| 入门包 | verify-sample.py：全新 clean-room-final，CLI --test/-p 1，直接 Java 四次，protoc 解码和 JSON 断言 | exit 0；两表各 3 条、4 文件；CLI 与直接 Java、原生 GUI 相同；内联 scheme 示例可执行 |
| 范围、转置与 stdin | verify-mapping.py：隔离 Excel / descriptor + 真实 Java | exit 0；范围与转置各 2 条，正文 stdin 两任务成功、3 条数据 |
| GUI 正式版转换和截图 | capture-gui.cjs：选两项、预览、开始；4 任务完成 | exit 0；真实原生窗口和输出文件，未使用浏览器 mock |
| GUI 扩展示例 | verify-gui-scripts.cjs：只加载选择器，再通过已核验 native loadConfig RPC 加载 XML，随后点击实际按钮 | exit 0；set_name、scheme 选择、按钮 data 1→2、重建后 1、before 事件 resolve；每表 3 条。未声称自动化覆盖系统文件选择框 |
| 产物与内部隔离 | verify-site-artifacts.py：doc metadata、sitemap、search-index、下载包、SVG、Skill frontmatter/引用 | exit 0；27→30 个公开文档，仅新增 CLI/GUI/脚本 3 页；AI 未进入路由或搜索；新页已索引 |
| 浏览器与视觉 | check-site.cjs final：20 页 × 桌面/390 px × 亮暗主题；首页 1440/390/320 px 两主题、搜索、键盘、手机导航、SVG 渲染 | exit 0；91 项、无横向溢出或缺失图片、无 pageerror；SVG、首页、原生截图另有目视检查。历史远端图片未额外抓取 |
| 最终截图展示 | inspect-doc-images.cjs：滚动到入门 GUI/CLI 图，脚本图以桌面/390 px × 亮暗主题加载 | exit 0；6 项，decode 完成且实际可见，无页面溢出；避免把全页截图尚未绘制的 lazy 图片误判为缺图 |
| 差异格式 | git diff --check | exit 0；Git 现有 LF/CRLF 提示不属于 whitespace 错误；最终记录更新后再核对 |

新增业务页和 UI 检查继续以真实页面和结果验证。未执行上游全套构建/测试、Java 17 本机验收、Linux/macOS、CI、生产部署；未对其他独立代码生成器做新版完整验收。没有运行 Skill 等预算路由或有/无对照，原初始化未测项不被此次业务验证覆盖。

## 示例保留与修正清单

对照 Git HEAD 的文档代码块、source/sample 与 static/img。原 33 个样例 / 图片文件全部存在；没有删除原配置、脚本、表格、绑定或二进制。生成绑定和旧 bin 保留作历史参考，按源文件重新生成，不手改产物。

| 原内容 | 当前入口与修正 | 核验范围 |
| --- | --- | --- |
| 工具链能力与组件宣传 | 首页九项能力、概览十项能力，七组件用途 / 仓库 / 下载 | 源码、官方发布、浏览器与目视 |
| 快速上手协议、枚举别名、货币和 Excel | quick-start 展示三条；data-loading 保留完整协议与原 11 等级表，修正误写的货币值 1001→10001 | 真正 descriptor 生成、11 行转换及别名结果 |
| C++ 手动与 libresloader key/value、key/list | data-loading、两套加载源及下载包；修正解析失败、load_file 与缺失记录处理 | 接口 / 生成代码读取；生成成功，未链接执行 C++ |
| 原入门 XML 与完整清单 | quick_start/sample-conf/sample.xml 与 xresconv_conf.xml 保留；新完整 sample.xml / sample_include.xml 含注释和可选项 | 旧 XML 七数据文件 + UE 配套代码，当前基础 / 完整 / include 真正转换 |
| 16 行 stdin 多格式批处理 | core-batch.ps1 保留全部任务；默认前 11 有效行，可选完整失败 scheme | 默认 16 项通过；两项严格失败，其他任务继续；未关闭验证器 |
| 名称、子进程、事件、弹窗、计时及按钮 | xresconv-scripts、完整 XML 和 selectors.json；弃用 DOM / Electron 用法迁移为 Node worker 和树镜像 | 原生 set_name、真实 before 子进程、after 弹窗、计时两次、计数 1→2、by_sheets |
| 更新协议 Bash 脚本 | update-pb-codes.sh：路径、依赖包含、错误退出与标准运行库文件去重 | bash -n、隔离目录真实 descriptor 和四套 C++ .cc 生成 |
| 镜像和开发命令 | 保留阿里云 / 腾讯 / npmmirror 示例，修为 HTTPS 与当前包管理器合同 | 官方正文与元数据可达性；未改机器包源或安装上游依赖 |
| 原截图、Draw.io 与生成样例 | 历史资源保留；新增六张正式 GUI 图、CLI / dump-bin 输出图与架构 SVG | 真实采集、排版方法注明、渲染和文件保留检查 |

## 补充要求最终验证（S01–S06）

临时证据根：`C:/Users/owt50/AppData/Local/Temp/xresloader-docs-followup-20261005`。以下脚本为本机验收辅助，后续使用不依赖该临时目录；公开可复现源保存在本站 scripts 和 source/sample。

| 检查 | 实际命令 / 方法 | 结果 |
| --- | --- | --- |
| 新配置、加载、查看与保留批处理 | python verify-examples.py | exit 0；15 个实际命令，ZIP 十二成员；入门每表 3 条、旧表 11 条；完整清单六数据输出，include 三 Lua；Node 加载与 dump-bin 字符串提取断言；16 项转换全通过 |
| 原配置与 shell、失败模式 | python verify-retained.py | exit 0；旧 XML 预览 / 执行均 0，七数据输出与 UE 代码；bash -n / 真实生成均 0；可选失败模式预期 PowerShell 1、引擎累计 2，其他任务继续 |
| 原生完整 GUI | node verify-native.cjs；正式 3.0.0 + tauri-driver | exit 0；input 后注册选择器，真实 UI 六输出与 CLI 字节相同；子进程、名称、两次计时和按钮计数通过。未覆盖系统文件选择框和原生 include |
| 站点构建 | npm run build，本站根 | exit 0；只有既有缺少 blogDir 警告，没有新增链接警告 |
| 最终浏览器 | node check-final-responsive.cjs；生产静态站点 127.0.0.1:3197 | exit 0；113 项：五路由 × 九尺寸 × 两主题、九个 OS / CPU 组合、403 / 无 JS、五类系统识别、真实 latest API、实际主题切换、DPR 2、键盘、数据加载搜索与手机导航 |
| 产物、示例与锁文件 | python verify-site-artifacts.py | exit 0；27→31 公开文档，新四页均索引；AI 无路由 / 搜索；ZIP、SVG 和新截图与源一致；原 33 文件保留、三锁不变、Skill 引用有效 |
| 内部 Markdown | npx --yes markdownlint-cli2@0.23.3，本站根 | exit 0；20 文件、0 问题；未宣称历史全站 Markdown lint |
| 差异格式 | git diff --check，本站根 | exit 0；保留历史 XML 的 CRLF，以该文件的 whitespace 属性识别行末 CR，其他空白检查继续生效 |

嵌套数组示例仍有上游缺字段 WARN；Java 25 的 MsgPack 依赖有 Unsafe 弃用警告。这些与预期失败样例分别记录，不被包装成错误已全部修复。C++ 仅生成并审阅代码，未链接执行；跨平台下载筛选已测，不代表 Linux / macOS 原生应用验收。所有未执行项继续沿用上节边界，没有提交、推送或部署。

## 原生 Lua 补充验证（L01）

来源为当前引擎 DataDstLua / ProgramOptions 与 Lua 官方手册，默认 return table 不使用旧式 lua-module。快速上手保留 bin / JSON 的四输出流程，另以 convert-lua.xml 复用清单并切换两份 Lua；详细章节展示完整加载源、联合键、路径、require 缓存和重载后索引更新。

本机没有已安装的 Lua CLI，使用官方 lua-5.4.8.tar.gz，匹配官方 SHA256 `4f18ddae154e793e46eeab727c59ef1c0c0c2b744e7b94219710d76f530629ae`，在临时目录用现有 Clang 构建标准 Lua 5.4.8；没有安装全局工具或修改上游。证据根为 `C:/Users/owt50/AppData/Local/Temp/xresloader-docs-lua-20261005`。

`python verify-lua.py` exit 0：全新目录解压十四成员并逐字节比对源；CLI 预览与实际 Lua 转换、JAR 等价命令、默认 bin / JSON 转换保持有效。两章全部 Lua 代码、默认 / 显式加载路径、两表各三行、中文、默认零值、require 复用与清缓存重载通过。错误记录数预期 Lua exit 1，其余十二命令 exit 0；没有把失败检查计为转换失败。

`npm run build` exit 0，保留既有缺少 blogDir 警告；内部 Markdown 20 文件、0 问题，`git diff --check` exit 0；产物、十四文件 ZIP、31 文档与 AI 路由 / 搜索隔离通过。未重新运行 GUI 或 113 项页面 UI 验收：未修改默认清单、界面或样式，此次实际转换验收使用 CLI 与 JAR。未声明其他 Lua 版本或平台已通过。

## 推荐生成器加载补充验证（G01，2026-10-06）

data-loading 第一节单独介绍最推荐的 xres-code-generator 加载方式，使用同一协议声明 id 列表索引和 id_level 联合键索引，展示 C++ 与原生 Lua 的便利调用。生成器索引和运行时以同级干净 HEAD `c563a1627f63cdb8eb2071a59bcb7f59c6d2fe8b` 的当前模板为准，未将仓库中较早的生成样例当作最新接口。

证据根为 `C:/Users/owt50/AppData/Local/Temp/xresloader-docs-codegen-20261005`。因生成器在脚本目录建立 Mako 缓存，只将入口、模板、工具和扩展复制到临时目录执行；上游保持只读。`python verify-generation.py` exit 0：从文档原样提取索引选项，经 protoc 生成包含包装头与依赖的 descriptor，当前模板生成 C++ 管理器 / 便捷 API、Lua 索引和协议 C++ 源；核对 me() 共享指针及两类查询签名。

标准 Lua 5.4.8 实际执行文档 Lua 节选，单条查询输出 50，列表输出等级 / 消耗 1/0、2/50、3/100；另验证不存在的联合键为 nil、列表为零条。C++ 只生成并核对接口，未链接执行。同步纠正生成器原生 Lua 页的 C protobuf 运行时误标，以及公共协议示例遗漏的索引字段和 descriptor 的依赖 / 包装头前提。最终 `npm run build`、内部 Markdown（20 文件、0 问题）、`git diff --check` 与产物 / AI 隔离检查均 exit 0，只有原有 blogDir 警告；上游 Git 状态保持干净，不将站点构建称作 C++ 验收。
