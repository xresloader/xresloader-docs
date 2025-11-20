/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '用户文档',
      collapsed: false,
      items: [
        'users/download',
        'users/quick-start',
        'users/xresloader-core',
        'users/data-mapping',
        'users/output-format',
        'users/xresconv',
        'users/data-types',
        'users/xres-code-generator',
        'users/advance-usage',
        'users/ecosystem-and-tools',
        'users/faq',
      ],
    },
    {
      type: 'category',
      label: '开发文档',
      collapsed: false,
      items: [
        'development/dependency',
        'development/build',
        'development/pkg-source',
        'development/design-xresloader',
        'development/design-xresconv',
      ],
    },
    {
      type: 'category',
      label: '关于项目',
      collapsed: false,
      items: [
        'about/license',
        'about/about',
      ],
    },
  ],
};

module.exports = sidebars;
