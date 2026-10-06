export const components = [
  {
    id: "xresloader",
    role: "Excel 转表引擎",
    purpose:
      "按协议映射和校验表格，输出 protobuf、MsgPack、Lua、JavaScript、JSON、XML 与 UE DataTable。",
    guide: "/docs/users/xresloader-core",
  },
  {
    id: "xresconv-cli",
    role: "CLI 批量转表工具",
    purpose:
      "用 XML 批量转换多张表，预览任务、控制并发并接入构建流水线。Rust 原生程序，无需 Python。",
    guide: "/docs/users/xresconv-cli",
  },
  {
    id: "xresconv-gui",
    role: "GUI 批量转表工具",
    purpose:
      "在桌面界面选表、预览和批量转换，查看日志与进度，接入项目事件和自定义按钮。",
    guide: "/docs/users/xresconv-gui",
  },
  {
    id: "xresloader-dump-bin",
    role: "二进制数据查看工具",
    purpose:
      "按 descriptor 展示已经转出的 bin 文件，核对头信息和记录，提取字符串或带标签的数据。",
    guide: "/docs/users/ecosystem-and-tools",
  },
  {
    id: "xres-code-generator",
    role: "读表代码生成器",
    purpose:
      "生成 C++、C#、Go、Lua、upb、lua-protobuf 和 Unreal Engine 的读表代码与索引。",
    guide: "/docs/users/xres-code-generator",
  },
  {
    id: "xresconv-conf",
    role: "批量转表配置与扩展示例",
    purpose: "XML 清单、include、分组、输出规则及 GUI 事件和按钮的配置示例。",
    guide: "/docs/users/xresconv",
  },
  {
    id: "xresloader-protocol",
    role: "数据头与协议扩展",
    purpose:
      "提供 bin 包装结构和 protobuf 自定义选项，供数据加载、校验及代码生成使用。",
    guide: "/docs/users/output-format",
  },
].map((entry) => ({
  ...entry,
  repository: `https://github.com/xresloader/${entry.id}`,
}));
