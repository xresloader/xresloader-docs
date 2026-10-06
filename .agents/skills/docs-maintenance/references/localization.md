# 多语言文档维护

公开源是 `docs/` 中的中文及 `i18n/en/docusaurus-plugin-content-docs/current/` 中的完整英文覆盖。默认 `en` 也会加载翻译目录，这是已安装 Docusaurus 3.10.2 的行为；不能靠缺少英文文件时的中文回退交付。31 篇的数量是本次基线，新增页面须同时增加两个版本和显式侧栏。`docs/ai/` 不进入任何语言的路由、sitemap 或索引。

英文使用 `/`、`/docs/...`，中文使用 `/zh-Hans/`、`/zh-Hans/docs/...`。页面 ID、路径后缀及跨语言可用的标题锚点保持一致；目前英文标题显式保留中文源锚点，正文可用相对链接。站内文档跳转遵循当前语言；静态 ZIP 和资源是共享路径，不能给下载文件增加不存在的语言前缀。

入口 `/` 在 hydration 前读取 navigator.languages；网页不能直接读取操作系统设置。有效手动选择优先，无匹配时英文；直接文档链接遵循链接语言。测试包括有序偏好、Hans/Hant 区分、localStorage 禁用、手动持久化、跟随系统、直接链接及保留 query/hash。语言下拉使用 Docusaurus 的整页切换，query marker 被入口脚本保存后移除。

正文改动先核对两个语言的事实、完整示例与术语，随后执行 `node scripts/record-i18n.mjs users/页面.md` 记录已复核的内容摘要，再运行 `npm run check:i18n` 和 `npm run build`。摘要检查用于发现尚未同步的改动；更新摘要本身不证明翻译正确。初次完整复核可用 `--all`，不能在未复核时批量解除失败。

首页和组件目录用 Translate，中文文字在 `i18n/zh-Hans/code.json`，英文默认消息在源文件；导航、侧栏、页脚配置标签的英文翻译分别维护在 en 的 JSON。下载状态与单一 latest / 源码入口也需对应语言。修改默认消息时同步已有翻译并实测两个页面；删除交互时清理不用的翻译键。

开发服务器一次只提供一个语言，显式传 --locale。英文开发入口可用 `/?persistLocale=true` 固定选择；多语言切换与自动选择验收使用 build + serve，不把单语言 dev server 的路由能力当成完整站点。

资源与采集来源在 [localized-assets.json](../../../../docs/ai/localized-assets.json)。GUI 原生截图明确设置 en / zh-CN；输入使用 current/en / current 的 XML 和 selectors，项目字段与脚本不由应用翻译。规则表表头必须使用解析器支持的 header/major/minor/addition 或中文别名，不能自由翻译。CLI、Java 和 dump-bin 无语言开关，原始诊断保留英文；排版快照的标题、说明与输入数据匹配页面语言，并披露路径缩写。历史英文 UE 截图可共享；中文映射截图在英文页使用明确标为 illustration 的英文 SVG，不能冒充真实 Excel 窗口。

重新生成工作簿、descriptor 和 ZIP 使用源 JSON / proto 与现有脚本的 `--locale en` / `-Locale en` 参数，中文沿用默认值。验收在全新解压目录运行两个版本，检查记录数、ID、数值与真实加载结果，区分应相同的数字和应不同的显示名。真实 GUI、控制台、站点浏览器和生产发布各有证据边界。当前合同和执行进度见 [多语言计划](../../../../docs/ai/multilingual-plan.md)。
