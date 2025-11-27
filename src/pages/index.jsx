import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const features = [
  {
    title: '跨平台覆盖',
    description: '基于 Java 17+ 的 CLI/GUI，支持 include 复用，Windows、macOS、Linux 一致体验。',
    icon: 'layers',
  },
  {
    title: '多格式导出',
    description: 'Excel 可导出 protobuf、MsgPack、Lua、JavaScript、JSON、XML 以及 UE DataTable(JSON/CSV)。',
    icon: 'data_object',
  },
  {
    title: '协议结构支持',
    description: '兼容 proto v2/v3、嵌套 message、数组嵌套、oneof、map 与 plain 字符串转复杂结构。',
    icon: 'hub',
  },
  {
    title: '枚举与描述导出',
    description: '可输出 proto 枚举值与 descriptor 到 Lua/JavaScript/JSON/XML，并可扩展自定义反射插件。',
    icon: 'emoji_objects',
  },
  {
    title: '流程编排',
    description: 'xresconv CLI/GUI 支持 include、多模板/class 分流，轻松应对多项目流水线。',
    icon: 'integration_instructions',
  },
  {
    title: '别名与校验',
    description: '别名表提升策划可读性，validator 直接识别 proto 字段与枚举，导出前自动校验数据。',
    icon: 'fact_check',
  },
  {
    title: '版本对比',
    description: '配合 xresloader-dump-bin 可快速比较不同版本数据包，追踪差异来源。',
    icon: 'compare_arrows',
  },
  {
    title: '插件与合表',
    description: '通过 protobuf 插件控制部分输出，并可自动将多张 Excel 合并成单一目标文件。',
    icon: 'schema',
  },
  {
    title: '内容生态',
    description: '支持 UE JSON/CSV，自动生成 DataTable 加载代码，适配 Lua/JavaScript 多模块形态。',
    icon: 'view_in_ar',
  },
];

const featureIcons = {
  layers: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M24 6l16 9-16 9-16-9 16-9zm0 21l13.9-7.8 4.1 2.3-18 10-18-10 4.1-2.3L24 27zm0 8l13.9-7.8 4.1 2.3-18 10-18-10 4.1-2.3L24 35z"
        fill="currentColor"
      />
    </svg>
  ),
  data_object: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M10 12c0-3.31 6.27-6 14-6s14 2.69 14 6-6.27 6-14 6-14-2.69-14-6zm0 12c0-3.31 6.27-6 14-6s14 2.69 14 6v12c0 3.31-6.27 6-14 6s-14-2.69-14-6V24z"
        fill="currentColor"
      />
    </svg>
  ),
  hub: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      <circle cx="9" cy="12" r="4" fill="currentColor" />
      <circle cx="39" cy="12" r="4" fill="currentColor" />
      <circle cx="9" cy="34" r="4" fill="currentColor" />
      <circle cx="39" cy="34" r="4" fill="currentColor" />
      <path
        d="M24 18V8m0 32v-10m10-6h10M4 24h10m-4.5-8.5l10 5m13 5 10 5m-30 0 10-5m13-5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  emoji_objects: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M24 6l3.24 9.96h10.48L29.48 22.6l3.24 9.96L24 29.92 15.28 32.56 18.52 22.6 10.28 15.96h10.48z"
        fill="currentColor"
      />
      <rect x="20" y="34" width="8" height="8" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  integration_instructions: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M18 6h12l12 12v18a6 6 0 01-6 6H12a6 6 0 01-6-6V12a6 6 0 016-6zm4 14h-4v8h4v-2h-2v-4h2zm8 0v2h2v4h-2v2h4v-8z"
        fill="currentColor"
      />
      <path d="M21 12h6v6h-6z" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  fact_check: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M24 6l16 8v12c0 10-7 14.5-16 20-9-5.5-16-10-16-20V14z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M20 24l3.5 3.5 8.5-8.5"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  compare_arrows: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M34 14l6 6-6 6v-4H12v-4h22zM14 26l-6 6 6 6v-4h22v-4H14z"
        fill="currentColor"
      />
    </svg>
  ),
  schema: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="3" fill="currentColor" />
      <rect x="28" y="8" width="12" height="12" rx="3" fill="currentColor" opacity="0.7" />
      <rect x="18" y="28" width="12" height="12" rx="3" fill="currentColor" opacity="0.5" />
      <path
        d="M14 20v6h10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M34 20v6H24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
  view_in_ar: (
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M24 6l16 9v18l-16 9-16-9V15l16-9zm0 5.2l-11 6.2v13.2l11 6.2 11-6.2V17.4z"
        fill="currentColor"
      />
      <path d="M24 17l6 3.5v7L24 31l-6-3.5v-7z" fill="#fff" opacity="0.7" />
    </svg>
  ),
};

const featureAccents = {
  layers: {background: 'linear-gradient(120deg,#c7d2fe,#818cf8)', color: '#312e81'},
  data_object: {background: 'linear-gradient(120deg,#fde68a,#f97316)', color: '#7c2d12'},
  hub: {background: 'linear-gradient(120deg,#a5f3fc,#06b6d4)', color: '#0f172a'},
  emoji_objects: {background: 'linear-gradient(120deg,#fcd34d,#fb7185)', color: '#7f1d1d'},
  integration_instructions: {background: 'linear-gradient(120deg,#bbf7d0,#34d399)', color: '#064e3b'},
  fact_check: {background: 'linear-gradient(120deg,#f5d0fe,#c084fc)', color: '#581c87'},
  compare_arrows: {background: 'linear-gradient(120deg,#fed7aa,#f97316)', color: '#7c2d12'},
  schema: {background: 'linear-gradient(120deg,#fbcfe8,#f472b6)', color: '#831843'},
  view_in_ar: {background: 'linear-gradient(120deg,#bfdbfe,#60a5fa)', color: '#1e3a8a'},
};

const downloadLinks = [
  {
    title: 'xresloader',
    description: '核心转表工具，下载 jar 文件即可使用',
    link: 'https://github.com/xresloader/xresloader/releases',
    badge: '核心',
  },
  {
    title: 'xresconv-cli',
    description: '命令行批量转表工具，适合 CI/CD 集成',
    link: 'https://github.com/xresloader/xresconv-cli/releases',
    badge: 'CLI',
  },
  {
    title: 'xresconv-gui',
    description: 'GUI 批量转表工具，可视化操作更便捷',
    link: 'https://github.com/xresloader/xresconv-gui/releases',
    badge: 'GUI',
  },
  {
    title: 'xresconv-conf',
    description: '批量转表配置模板仓库，包含完整示例',
    link: 'https://github.com/xresloader/xresconv-conf',
    badge: '模板',
  },
];

const quickLinks = [
  {
    title: '下载与安装',
    description: '准备 CLI/GUI 运行环境与示例工程。',
    to: '/docs/users/download',
  },
  {
    title: '快速上手',
    description: '三步完成 Excel -> protobuf/JSON 的导出流程。',
    to: '/docs/users/quick-start',
  },
  {
    title: '了解核心',
    description: '深入数据映射、校验及生成工具的组合玩法。',
    to: '/docs/users/xresloader-core',
  },
];

const cliDemos = [
  {
    badge: 'CLI',
    title: '批量脚本式导出',
    description: 'xresconv-cli 在构建机上批量驱动 xresloader，适合自动化流水线与版本对比。',
    image: 'img/users/quick_start_cli_sample.gif',
    link: '/docs/users/xresconv',
    linkLabel: '查看 CLI 演示',
  },
  {
    badge: 'GUI',
    title: '所见即所得配置',
    description: 'xresconv-gui 以树形结构管理模板，便于运营与策划自行开关导出项。',
    image: 'img/users/quick_start_gui_sample.gif',
    link: '/docs/users/xresconv',
    linkLabel: '查看 GUI 指南',
  },
];

const mappingDemos = [
  {
    badge: 'Mapping',
    title: '数据源绑定',
    description: '“数据源”章节演示如何声明 Excel 文件、工作表以及行列范围，让转表器精准定位输入。',
    image: 'img/users/data_mapping_data_source.png',
    link: '/docs/users/data-mapping',
    linkLabel: '查看数据源示例',
  },
  {
    badge: 'Mapping',
    title: 'Key 与 proto 对应',
    description: '“数据索引”把 Excel Key 与 proto 字段成对绑定，涵盖枚举、常量与多列拼接等配置模式。',
    image: 'img/users/data_mapping_data_key_and_proto.png',
    link: '/docs/users/data-mapping',
    linkLabel: '查看字段映射',
  },
  {
    badge: 'Mapping',
    title: '嵌套 Message',
    description: '“数据嵌套和 Message 嵌套”章节展示 record/message 复用写法，子结构可以跨表共享。',
    image: 'img/users/data_mapping_rec_message.png',
    link: '/docs/users/data-mapping',
    linkLabel: '了解嵌套配置',
  },
  {
    badge: 'Mapping',
    title: '数组嵌套',
    description: '“数组嵌套”示例通过 scheme 组合把二维 Excel 区域映射为 repeated message，适配复杂表格导出。',
    image: 'img/users/data_mapping_arr_in_arr.png',
    link: '/docs/users/data-mapping',
    linkLabel: '查看数组嵌套',
  },
];


function HomepageHeader() {
  const heroImage = useBaseUrl('img/logo.png');

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <span className={styles.sectionTag}>xresloader · 游戏配置管理解决方案</span>
          <h1 className="hero__title">xresloader 转表工具套件</h1>
          <p className="hero__index_subtitle">
            xresloader 是一个面向游戏团队的数据转表工具链：把 Excel 中的策划数据转换为 protobuf、JSON、MsgPack、Lua、JavaScript、XML 等多种结构化格式，并配套批量化、校验和代码生成工具。
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--lg button--secondary" to="/docs/intro">
              文档概览
            </Link>
            <Link className="button button--lg button--primary" to="/docs/users/quick-start">
              快速上手
            </Link>
            <Link className="button button--lg button--outline button--light" to="/docs/users/download">
              立即下载
            </Link>
            <Link
              className="button button--lg button--outline button--light"
              to="https://github.com/xresloader/xresloader"
            >
              GitHub
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src={heroImage} alt="xresloader logo" className={styles.heroImage} />
          <p className={styles.heroCaption}>跨平台 Excel 转表工具</p>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({title, description, icon}) {
  const accent = featureAccents[icon] || {};
  return (
    <div className={clsx('col col--4', styles.featureItem)}>
      <div className={clsx('card', styles.materialCard)}>
        <div
          className={styles.featureIllustration}
          style={{background: accent.background, color: accent.color}}
        >
          {featureIcons[icon]}
        </div>
        <h3>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <section className={styles.materialSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTag}>项目特点 · 功能与优势</p>
          <h2>让 Excel 数据一键落地任意运行时</h2>
        </div>
        <div className="row">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={clsx(styles.materialSection, styles.quickStartSection)}>
      <div className="container">
        <div className={styles.quickStartCard}>
          <div className={styles.quickStartContent}>
            <p className={styles.sectionTag}>快速上手</p>
            <h2>几分钟构建第一条导出流水线</h2>
            <p>
              按照下载、配置、导出的顺序即可完成最小可用流程。文档提供脚本、模板与常见问题解答，贴合 mkdocs-material
              风格的阅读体验。
            </p>
            <div className={styles.quickActions}>
              <Link className="button button--lg button--secondary" to="/docs/users/quick-start">
                查看操作步骤
              </Link>
              <Link className="button button--lg button--outline button--primary" to="/docs/users/download">
                准备运行环境
              </Link>
            </div>
          </div>
          <ul className={styles.quickList}>
            {quickLinks.map((item) => (
              <li key={item.title} className={styles.quickListItem}>
                <Link to={item.to} className={styles.quickListLink}>
                  <span className={styles.quickListTitle}>{item.title}</span>
                  <span className={styles.quickListDescription}>{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({badge, title, description, image, link, linkLabel}) {
  const media = useBaseUrl(image);
  return (
    <div className={styles.showcaseCard}>
      <div className={styles.showcaseMedia}>
        <img src={media} alt={`${title} 演示`} loading="lazy" />
      </div>
      <div className={styles.showcaseBody}>
        <span className={styles.showcaseBadge}>{badge}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="button button--sm button--secondary" to={link}>
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <section className={clsx(styles.materialSection, styles.showcaseSection)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTag}>功能演示</p>
          <h2>CLI + GUI 命令行集成工具和图形化客户端</h2>
          <p>
            首页即可预览 xresconv-cli 与 xresconv-gui 的真实操作动图<br />
            <Link to="/docs/users/xresconv">查阅文档</Link> 前就能体会脚本自动化与 GUI 工作台的差异化体验
          </p>
        </div>
        <div className={styles.showcaseGrid}>
          {cliDemos.map((demo) => (
            <ShowcaseCard key={demo.title} {...demo} />
          ))}
        </div>
        <div className={clsx(styles.sectionHeader, styles.mappingHeader)}>
          <h2>支持 Excel 数组和复杂结构映射和多种配置模式</h2>
          <p>
            下列示意来自 <Link to="/docs/users/data-mapping">数据映射</Link>，涵盖数据源、Key 映射、Message 复用与数组嵌套等配置场景。<br />
            帮助评估 scheme 在复杂策划表中的扩展能力。
          </p>
        </div>
        <div className={clsx(styles.showcaseGrid, styles.mappingGrid)}>
          {mappingDemos.map((demo) => (
            <ShowcaseCard key={demo.title} {...demo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCard({title, description, link, badge}) {
  return (
    <div className={styles.downloadCard}>
      <div className={styles.downloadCardHeader}>
        <span className={styles.downloadBadge}>{badge}</span>
        <h3>{title}</h3>
      </div>
      <p className={styles.downloadDescription}>{description}</p>
      <Link className="button button--sm button--primary" to={link}>
        前往下载
      </Link>
    </div>
  );
}

function DownloadSection() {
  return (
    <section className={clsx(styles.materialSection, styles.downloadSection)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTag}>工具下载</p>
          <h2>获取 xresloader 工具套件</h2>
          <p>
            选择适合你工作流程的工具组合，核心转表引擎 + CLI/GUI 批量工具 + 配置模板
          </p>
        </div>
        <div className={styles.downloadGrid}>
          {downloadLinks.map((item) => (
            <DownloadCard key={item.title} {...item} />
          ))}
        </div>
        <div className={styles.downloadMore}>
          <Link className="button button--lg button--outline button--secondary" to="/docs/users/download">
            查看完整下载指南
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <FeatureSection />
        <DownloadSection />
        <QuickStartSection />
        <ShowcaseSection />
      </main>
    </Layout>
  );
}
