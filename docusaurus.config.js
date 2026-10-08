// @ts-check
const { themes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "xresloader Documentation",
  tagline: "Cross-platform game data conversion tools",
  favicon: "img/brand-mark.svg",
  url: "https://xresloader.atframe.work",
  baseUrl: "/",
  organizationName: "xresloader",
  projectName: "xresloader-docs",
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-Hans"],
    localeConfigs: {
      en: { label: "English", htmlLang: "en", translate: true },
      "zh-Hans": { label: "简体中文", htmlLang: "zh-Hans" },
    },
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
          // Preserve the docs plugin defaults while keeping maintenance records private.
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
            "ai/**",
          ],
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/xresloader/xresloader-docs/edit/main/",
          editLocalizedFiles: true,
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
    require.resolve("./plugins/locale-preference.cjs"),
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
        src: "img/brand-mark.svg",
        srcDark: "img/brand-mark-dark.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "文档",
        },
        { to: "/docs/users/quick-start", label: "快速上手", position: "left" },
        { to: "/docs/development/build", label: "开发", position: "left" },
        {
          type: "localeDropdown",
          position: "right",
          queryString: "?persistLocale=true",
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
            { label: "快速上手", to: "/docs/users/quick-start" },
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
      theme: {
        plain: { color: "#354655", backgroundColor: "#e7edf3" },
        styles: [
          {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: { color: "#596d7d", fontStyle: "italic" },
          },
          {
            types: ["namespace", "punctuation", "operator"],
            style: { color: "#354655" },
          },
          {
            types: ["string", "attr-value"],
            style: { color: "#66508d" },
          },
          {
            types: [
              "entity", "url", "symbol", "number", "boolean", "variable",
              "constant", "property", "regex", "inserted",
            ],
            style: { color: "#176978" },
          },
          {
            types: ["atrule", "keyword", "attr-name", "selector"],
            style: { color: "#285f8f" },
          },
          {
            types: ["function", "deleted", "tag"],
            style: { color: "#984650" },
          },
          {
            types: ["function-variable"],
            style: { color: "#6f4894" },
          },
        ],
      },
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

module.exports = () => {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE || "en";
  return {
    ...config,
    title: currentLocale === "zh-Hans" ? "xresloader 文档" : config.title,
    tagline: currentLocale === "zh-Hans" ? "跨平台游戏数据转表工具链" : config.tagline,
    themeConfig: {
      ...config.themeConfig,
      footer: {
        ...config.themeConfig.footer,
        copyright: `${currentLocale === "zh-Hans" ? "版权所有" : "Copyright"} © ${new Date().getFullYear()} owent & xresloader contributors.`,
      },
    },
  };
};
