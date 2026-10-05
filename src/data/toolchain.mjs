export const components = [
  {
    id: "xresloader",
    role: "Excel 转表引擎",
    purpose:
      "按协议映射和校验表格，输出 protobuf、MsgPack、Lua、JavaScript、JSON、XML 与 UE DataTable。",
    guide: "/docs/users/xresloader-core",
    release: true,
  },
  {
    id: "xresconv-cli",
    role: "CLI 批量转表工具",
    purpose:
      "用 XML 批量转换多张表，预览任务、控制并发并接入构建流水线。Rust 原生程序，无需 Python。",
    guide: "/docs/users/xresconv-cli",
    release: true,
  },
  {
    id: "xresconv-gui",
    role: "GUI 批量转表工具",
    purpose:
      "在桌面界面选表、预览和批量转换，查看日志与进度，接入项目事件和自定义按钮。",
    guide: "/docs/users/xresconv-gui",
    release: true,
  },
  {
    id: "xresloader-dump-bin",
    role: "二进制数据查看工具",
    purpose:
      "按 descriptor 展示已经转出的 bin 文件，核对头信息和记录，提取字符串或带标签的数据。",
    guide: "/docs/users/ecosystem-and-tools",
    release: true,
  },
  {
    id: "xres-code-generator",
    role: "读表代码生成器",
    purpose:
      "生成 C++、C#、Go、Lua、upb、lua-protobuf 和 Unreal Engine 的读表代码与索引。",
    guide: "/docs/users/xres-code-generator",
    release: false,
  },
  {
    id: "xresconv-conf",
    role: "批量转表配置与扩展示例",
    purpose: "XML 清单、include、分组、输出规则及 GUI 事件和按钮的配置示例。",
    guide: "/docs/users/xresconv",
    release: false,
  },
  {
    id: "xresloader-protocol",
    role: "数据头与协议扩展",
    purpose:
      "提供 bin 包装结构和 protobuf 自定义选项，供数据加载、校验及代码生成使用。",
    guide: "/docs/users/output-format",
    release: false,
  },
].map((entry) => ({
  ...entry,
  repository: `https://github.com/xresloader/${entry.id}`,
}));

export function detectPlatform(navigatorLike) {
  const identity = `${navigatorLike?.userAgentData?.platform || ""} ${navigatorLike?.platform || ""} ${navigatorLike?.userAgent || ""}`;
  if (
    /Android|iPhone|iPad|iPod/i.test(identity) ||
    (/Mac/i.test(identity) && navigatorLike?.maxTouchPoints > 1)
  )
    return "all";
  if (/Windows|Win32|Win64/i.test(identity)) return "windows";
  if (/Mac/i.test(identity)) return "macos";
  if (/Linux/i.test(identity)) return "linux";
  return "all";
}

export function assetPlatform(name) {
  if (/windows|pc-windows/i.test(name)) return "windows";
  if (/macos|apple-darwin/i.test(name)) return "macos";
  if (/linux/i.test(name) && !/android/i.test(name)) return "linux";
  return "other";
}

export function assetArchitecture(name) {
  if (/x86_64|(?:^|-)x64(?:-|\.)/i.test(name)) return "x64";
  if (/aarch64|(?:^|-)arm64(?:-|\.)/i.test(name)) return "arm64";
  return "other";
}

export function selectAssets(id, assets, platform, architecture) {
  return assets.filter((asset) => {
    if (!/^https:\/\/github\.com\//.test(asset.browser_download_url || ""))
      return false;
    const name = asset.name || "";
    if (id === "xresloader")
      return (
        /^xresloader-[\d.]+\.jar$/.test(name) ||
        ["protocols.zip", "tools.zip"].includes(name)
      );
    if (!/\.(zip|tar\.gz|tar\.zst|7z|dmg|AppImage)$/.test(name)) return false;
    return (
      (platform === "all" || assetPlatform(name) === platform) &&
      (architecture === "all" || assetArchitecture(name) === architecture)
    );
  });
}

export function assetLabel(id, name) {
  if (id === "xresloader")
    return name === "protocols.zip"
      ? "协议包"
      : name === "tools.zip"
        ? "Python 辅助工具包"
        : "完整 JAR · 各系统通用";
  const os = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    other: "其他平台",
  }[assetPlatform(name)];
  const cpu = {
    x64: "x64",
    arm64: "ARM64",
    other:
      name.split("-").find((part) => /riscv|loongarch/.test(part)) ||
      "其他架构",
  }[assetArchitecture(name)];
  const variant = /bootstrap/.test(name)
    ? "bootstrap"
    : /offline/.test(name)
      ? "offline"
      : /musl/.test(name)
        ? "musl"
        : /linux-gnu/.test(name)
          ? "GNU"
          : "";
  const format =
    name.match(/(?:tar\.gz|tar\.zst|zip|7z|dmg|AppImage)$/)?.[0] || "";
  return [os, cpu, variant, format].filter(Boolean).join(" · ");
}
