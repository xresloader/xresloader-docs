# 项目 Skills 索引

`.agents/skills/` 是本仓库权威源。此文件供维护与不支持原生发现的客户端按需导航，不是启动时的全文导入。

| Skill | 何时读取 | 输出与边界 |
| --- | --- | --- |
| [docs-maintenance](docs-maintenance/SKILL.md) | 修改公开文档、工具链说明、示例、侧栏和图示 | 核实技术合同并验证内容；仅改页面布局转 site-change |
| [writing-guidance](writing-guidance/SKILL.md) | 成段写作、结构调整或语义敏感的措辞修改 | 准确自然的文字、作者声音与语义复核；纯标点修改无需加载 |
| [site-change](site-change/SKILL.md) | 修改页面、样式、配置、依赖或准备部署 | 可观察站点行为和构建证据；实际发布需要当前授权 |
| [ai-agent-maintenance](ai-agent-maintenance/SKILL.md) | 修改 AI 规则、Skill 路由、来源和兼容层 | 简短入口、有效资源、逐项覆盖及真实验收状态 |

跨文档、写作和页面任务按各自职责选择所需 Skill，不要求每个任务调用全部 Skills。客户端的发现、覆盖和权限边界见 [兼容记录](ai-agent-maintenance/references/clients.md)；缺失自动发现时显式读取所选 `SKILL.md`，不得宣称原生兼容通过。
