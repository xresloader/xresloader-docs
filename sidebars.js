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
        {
          type: 'category',
          label: '读表代码生成',
          link: {
            type: 'doc',
            id: 'users/xres-code-generator',
          },
          items: [
            'users/xres-code-generator/cpp',
            'users/xres-code-generator/unreal',
            'users/xres-code-generator/lua',
            'users/xres-code-generator/csharp',
            'users/xres-code-generator/lua-upb',
            'users/xres-code-generator/lua-protobuf',
          ],
        },
        'users/xresloader-core',
        'users/data-mapping',
        'users/output-format',
        'users/xresconv',
        'users/data-types',
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
