// @ts-check
const { themes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "xresloader 文档",
  tagline: "跨平台游戏数据转表工具链",
  favicon: "img/logo.png",
  url: "https://xresloader.atframe.work",
  baseUrl: "/",
  organizationName: "xresloader",
  projectName: "xresloader-docs",
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/xresloader/xresloader-docs/edit/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          filename: "sitemap.xml",
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["zh", "en"],
        highlightSearchTermsOnTargetPage: true,
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: "/docs",
      },
    ],
  ],
  themeConfig: {
    image: "img/logo.png",
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "xresloader",
      logo: {
        alt: "xresloader Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "文档",
        },
        {
          href: "https://github.com/xresloader/xresloader",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "文档",
          items: [
            { label: "快速开始", to: "/docs/users/quick-start" },
            { label: "高级用法", to: "/docs/users/advance-usage" },
            { label: "FAQ", to: "/docs/users/faq" },
          ],
        },
        {
          title: "生态",
          items: [
            {
              label: "xresloader",
              href: "https://github.com/xresloader/xresloader",
            },
            {
              label: "xresconv-cli",
              href: "https://github.com/xresloader/xresconv-cli",
            },
            {
              label: "xresconv-gui",
              href: "https://github.com/xresloader/xresconv-gui",
            },
            {
              label: "读表代码生成",
              href: "https://github.com/xresloader/xres-code-generator",
            },
          ],
        },
        {
          title: "更多",
          items: [
            { label: "用户群", href: "https://github.com/xresloader" },
            {
              label: "问题反馈",
              href: "https://github.com/xresloader/xresloader/issues",
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} owent & xresloader contributors.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: [
        "protobuf",
        "java",
        "lua",
        "csharp",
        "bash",
        "python",
        "typescript",
        "tsx",
        "json",
        "yaml",
        "go",
        "rust",
        "php",
        "ini",
        "toml",
        "properties",
        "powershell",
        "cmake",
        "makefile",
        "ruleslanguage",
      ],
    },
  },
};

module.exports = config;
