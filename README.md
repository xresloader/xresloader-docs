# xresloader 文档站点

本仓库承载了 [xresloader](https://github.com/xresloader/xresloader) 工具链的官方文档，现已使用 [Docusaurus](https://docusaurus.io/) 结合 Material 风格重写。线上站点地址保持不变：<https://xresloader.atframe.work>。

## 快速开始

1. 安装依赖：`npm install`
2. 启动本地开发服务器：`npm start`
3. 访问 <http://localhost:3000> 预览文档，支持热重载。

## 构建与部署

- 生成静态站点：`npm run build`
- 预览构建产物：`npm run serve`
- 产物默认输出到 `build/`，可直接部署到任意静态站托管服务。

## 仓库结构

- `docs/`：全部 Markdown/MDX 文档，按“用户文档 / 开发文档 / 关于” 分类组织。
- `static/`：静态资源，主要为 Material 风格的插图与示意图。
- `src/`：自定义页面与样式，其中 `src/css/custom.css` 调整为类似 mkdocs-material 的观感。
- `source/sample/`：历史示例工程及测试数据，供文档引用或下载。

## 许可证

文档内容遵循仓库根目录的 [LICENSE.md](LICENSE.md)。
