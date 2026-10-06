# xresloader 文档站点

本仓库承载了 [xresloader](https://github.com/xresloader/xresloader) 工具链的官方文档，现已使用 [Docusaurus](https://docusaurus.io/) 结合 Material 风格重写。线上站点地址保持不变：<https://xresloader.atframe.work>。

## 快速开始

1. 安装依赖：`npm install`
2. 启动英文开发服务器：`npm start -- --locale en`
3. 访问 <http://localhost:3000/?persistLocale=true>，明确选择英文并预览，支持热重载。

Docusaurus 开发服务器每次只启动一个语言；中文使用 `npm start -- --locale zh-Hans` 并访问 <http://localhost:3000/zh-Hans/>。跨语言切换与首次自动选择使用 `npm run build` 后的 `npm run serve` 验证，两个语言的产物均会提供。

## 构建与部署

- 生成静态站点：`npm run build`
- 检查翻译覆盖、资源和语言入口：`npm run check:i18n`，build 前自动执行。
- 检查最新下载入口与版本查询：`npm run check:downloads`，build 前自动执行。每组件一个 latest 发布页入口；包和摘要在发布页选择，无需因组件发布而重建本站。
- 预览构建产物：`npm run serve`
- 产物默认输出到 `build/`，可直接部署到任意静态站托管服务。

## 仓库结构

站点提供英文和简体中文。英文为默认 `/docs/...`，中文为 `/zh-Hans/docs/...`；首次进入首页读取浏览器语言偏好，无匹配时英文。语言菜单支持保存手动选择和恢复跟随系统。GUI 语言独立设置，使用对应语言示例包；CLI / Java / dump-bin 的原始英文诊断保持真实输出。

- `docs/`：公开 Markdown/MDX 文档，按“用户文档 / 开发文档 / 关于” 分类组织；`docs/ai/` 为不发布的工程维护资料。
- `i18n/en/docusaurus-plugin-content-docs/current/`：全部公开文档的英文版本，与中文源同步。
- `static/`：静态资源，主要为 Material 风格的插图与示意图。
- `src/`：自定义页面与样式，其中 `src/css/custom.css` 调整为类似 mkdocs-material 的观感。
- `source/sample/`：历史示例工程及测试数据，供文档引用或下载。
- `source/sample/current/` 与其 `en/`：中文/英文可复现示例，分别生成 quick-start.zip / quick-start-en.zip。

修改公开文档后复核两个语言，并用 `node scripts/record-i18n.mjs users/页面.md` 更新同步摘要。详见 [多语言维护](.agents/skills/docs-maintenance/references/localization.md) 和 [进度与证据](docs/ai/multilingual-plan.md)。

## 许可证

文档内容遵循仓库根目录的 [LICENSE.md](LICENSE.md)。
