# 文档示例目录

[current](current/) 是 2026-10 核验的入门示例，包含生成源、Excel、descriptor、XML 与复现方法；公开下载包由仓库 scripts/package-docs-sample.ps1 生成。运行需要另行准备当前 xresloader JAR，不把转换器二进制随文档包分发。

current 为中文源，current/en 为英文源；生成器 `--locale en` 与打包器 `-Locale en` 生成英文工作簿、descriptor 和 quick-start-en.zip。两份示例保留相同 ID、协议字段与数值，名称、注释、GUI 按钮和脚本提示使用对应语言。英文规则表使用解析器关键字 header/major/minor/addition，不能自由翻译；CLI 和 Java 原始诊断仍为英文。

quick_start 保留原 11 行表格、协议、XML、C++ 手动与 libresloader 加载源；XML 路径、JVM 选项和加载错误处理已修正，详见其 README。xresconv_conf.xml 保留上游完整 workbook / descriptor 用法，修正工作目录、验证器、脚本和弃用选项；它面向同级 xresloader/sample，截图和运行验收先复制到隔离目录。旧绑定及二进制保留历史上下文，不代表当前源生成的结果。

core-batch.ps1 保留原文全部 16 项多格式任务，默认限制升级表为前 11 条有效数据；-IncludeValidationFailures 恢复原完整 scheme，观察 custom_rule5 的严格校验失败。没有删除原大数值测试数据。update-pb-codes.sh 保留并修正路径、依赖打包、失败退出和生成入口，避免重复生成运行库自带 descriptor.pb.cc。

重新生成前先核对 proto 源、生成脚本、protoc 和应用运行库版本；不要手改 `.pb.*` 或 descriptor。当前使用方法见 [快速上手](../../docs/users/quick-start.md)。
