# 现代 CLI 候选与执行约定

核验日期：2026-10-05。尽可能优先使用已安装且适合当前任务的现代 CLI；harness 文件读取/补丁合同和稳定脚本语义优先。工具缺失、平台或参数不匹配时正确回退，不因习惯改用传统命令，不批量安装候选或改写无关脚本。性能需用真实数据测量，语言实现和营销基准不能证明速度。

## 原始候选、用途与回退

附件声称 31 项，但原表实际仅有 30 项（原文 390–419 行）。所有原始条目均保留；第 31 项 cargo-binstall 来自同节 443 行，由本项目显式补入。此前已向用户提示差异；未收到偏好回复后采用这一可逆整理方案，不能把补充条目称为原表内容。缺失状态来自 PATH 探测；存在只代表命令可解析，不代表所有选项已测试。

| 候选与来源 | 优先场景 | 对照、回退和边界 |
| --- | --- | --- |
| [ripgrep / rg](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md) | 首选文本搜索、`rg --files` 枚举 | grep / Select-String；注意忽略、隐藏与二进制，`--max-count` 是每文件限制 |
| [ugrep](https://github.com/Genivia/ugrep) | 需要其搜索能力或 grep 兼容选项 | 本机缺失；回退 rg/Select-String，验证具体选项，自动化不进 TUI |
| [fd](https://github.com/sharkdp/fd) | 文件名、路径、类型筛选 | find / Get-ChildItem；注意隐藏、忽略、正则与字面语义 |
| [bat](https://github.com/sharkdp/bat) | 文件、行号和范围阅读 | cat / 原生读取/Get-Content；关闭分页和颜色 |
| [sd](https://github.com/chmln/sd) | 符合其字符串/正则语义的替换 | sed；核对范围、捕获组和编码，修改用 harness 补丁优先 |
| [eza](https://github.com/eza-community/eza) | 目录列表及树 | ls/tree；查平台，限制深度，不解析图标/颜色为数据 |
| [erdtree / erd](https://github.com/solidiquis/erdtree) | 目录树结合占用 | tree/du；有界扫描，展示不能替代精确统计 |
| [dust](https://github.com/bootandy/dust) | 大文件与占用分布 | du；区分逻辑/分配空间及权限遗漏 |
| [duf](https://github.com/muesli/duf) | 文件系统容量与挂载 | df；容器、网络盘和可见挂载以实际环境为准 |
| [hyperfine](https://github.com/sharkdp/hyperfine) | 重复测量与候选对比 | time/Measure-Command；控制缓存/预热，Windows 依赖 pwsh 语义时显式 `--shell pwsh` |
| [tokei](https://github.com/XAMPPRocky/tokei) | 语言/代码/注释统计 | cloc；记录排除与口径，行数不是质量 |
| [hexyl](https://github.com/sharkdp/hexyl) | 有界十六进制阅读 | xxd/hexdump；转换/编辑另查工具，不输出敏感数据 |
| [jq](https://jqlang.org/manual/) | JSON 查询、转换和条件判断 | 项目解析库/PowerShell JSON；不以正则解析，保留类型/退出码 |
| [jaq](https://github.com/01mf02/jaq) | 已验证过滤器兼容时替代 jq | 不保证全部等价，测试模块/过滤器/错误语义 |
| [Mike Farah yq](https://github.com/mikefarah/yq) | YAML 等结构化配置 | 核验实现/版本，不与同名实现混用；写回查注释/样式/语义 |
| [Miller / mlr](https://github.com/johnkerl/miller) | CSV/TSV/JSON 记录转换 | awk/cut；遵守引号、类型和真实格式，不按逗号简单切 CSV |
| [qsv](https://github.com/dathere/qsv) | CSV 校验、处理与统计 | CSV 解析脚本；核对发行变体/子命令/资源，不假定恒定内存 |
| [git-delta / delta](https://github.com/dandavison/delta) | 人工 diff 阅读 | 普通 diff；机器保留 git 原始差异，关闭分页 |
| [difftastic / difft](https://github.com/Wilfred/difftastic) | 支持语言的结构比较 | 逐行 diff；辅助视图不替代 git 补丁/范围审阅 |
| [tailspin / tspin](https://github.com/bensadeh/tailspin) | 人工日志高亮 | tail/less；核验跟随、分页与颜色，机器使用原日志 |
| [plocate 上游 README 存档](https://sources.debian.org/src/plocate/1.1.18-1/README) | Linux 已有索引的文件名搜索 | 本机缺失；有新鲜度/覆盖边界，回退 fd/rg，不为局部查找建全盘索引 |
| [pigz](https://zlib.net/pigz/) | 需要 gzip 格式的并行压缩 | 本机缺失；回退 gzip，收益不推广到所有解压，查线程/内存预算 |
| [zstd](https://github.com/facebook/zstd) | 消费端支持时的压缩 | gzip/xz；先测格式、率、耗时及内存，不自动改制品格式 |
| [ouch](https://github.com/ouch-org/ouch) | 支持归档格式的统一入口 | tar/unzip；核验选项/格式，解压校验目标与路径安全 |
| [aria2 / aria2c](https://aria2.github.io/) | 下载、续传和适合的并发 | wget/curl；限流、制品校验，凭据不进参数/日志 |
| [fzf](https://github.com/junegunn/fzf) | 候选模糊筛选 | 自动化用 `--filter`，精确筛选优先 rg，不等待 TTY |
| [xh](https://github.com/ducaale/xh) | HTTP 请求与调试 | curl/HTTPie；核验请求体、认证、重定向及失败退出码 |
| [doggo](https://github.com/mr-karan/doggo) | DNS 查询 | dig/nslookup；明确解析器、类型及传输 |
| [procs](https://github.com/dalance/procs) | 进程查看与筛选 | ps/Get-Process；按平台核对字段与权限可见性 |
| [watchexec](https://github.com/watchexec/watchexec) | 有意持续运行的文件监听 | 轮询；限制忽略范围，管理子进程与退出清理 |
| [cargo-binstall（项目补充）](https://github.com/cargo-bins/cargo-binstall) | 授权内需要安装 Rust CLI 时优先寻找可信预编译制品 | 本机 PATH 未找到；可回退 cargo install，禁止编译时先查仅二进制策略；不自动安装或直接执行远程安装脚本 |

前 30 项用途边界继承用户输入并按本仓库任务选用；cargo-binstall 的回退行为另经官方 README 核验。未宣称逐一联网核验全部产品能力或跨平台实测。链接是复核入口，plocate 链接是指定上游历史存档，不是最新版本证据。

## 实际环境与日常探测

高频程序已实际运行 `--version`：rg 15.0.0、fd 10.4.2、sd 1.0.0、jq 1.8.2、Mike Farah yq 4.54.1、bat 0.26.1，退出码均为 0。rg/fd 位于用户 `.kimi-code/bin`，其余在 Scoop shims。完整候选除 ugrep、plocate、pigz、cargo-binstall 外均在 PATH 解析到应用；低频工具版本/必要能力在使用前再测。

Node 24.21.0、npm 11.19.0、pnpm 11.13.0、Python 3.14.8、PowerShell 7.6.6；实际路径/版本的脱敏记录见覆盖证据。`Get-Command` 查程序类型/Source，优先显式程序路径避免别名/同名实现；日常只探测将用工具，环境变化再刷新。

必要安装在已有授权内按需进行，选官方发布制品/可信包渠道，核对架构、平台、版本和可用签名/校验。可选工具直接回退；不能将 mise/aqua 统称为保证免编译渠道。`cargo binstall` 找不到二进制可能回退 `cargo install`，任务禁止编译时先核验仅二进制策略并检查结果。

输出有界并尽量结构化，关闭颜色/分页/交互。原生命令退出码按语义：rg 1 为无匹配而 2 是错误；jq `-e` 最后输出 false/null 为 1，无有效输出为 4。参数以参数传递；不把外部文本拼成代码，不打印含秘密完整命令。

## Windows 执行

优先已验证 PowerShell 7；受限环境只有其他 shell 时验证兼容路径并报告差异，一次操作不跨 shell 混用。独立进程用 `-NoLogo -NoProfile`，自动化按需 `-NonInteractive`；用明确程序或全名 cmdlet。

不插值的文本用单引号，多行用 here-string；路径用 `-LiteralPath`，语句块输出管道用 `& { ... } | ...`。原生参数数组 splatting；当前 `$PSNativeCommandArgumentPassing` 为 Windows，部分程序仍回退 Legacy，不保证所有引号自动正确；`--%` 不是通用修复。

新文本 UTF-8，修改保留已有 BOM/换行/末尾换行；PowerShell 5.1 默认编码因命令而异。关键 cmdlet 用 `-ErrorAction Stop`，原生命令后立即保存 `$LASTEXITCODE`。后台助手隐藏窗口并记录 PID/日志/退出；平台启动失败与脚本错误分别诊断，走平台允许重试，不降低安全设置。
