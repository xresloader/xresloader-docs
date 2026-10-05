import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";
import ToolchainCatalog from "../components/ToolchainCatalog";
import ThemedImage from "@theme/ThemedImage";

const references = [
  {
    title: "数据如何映射",
    text: "字段、数组、嵌套结构与数据源范围",
    to: "/docs/users/data-mapping",
  },
  {
    title: "清单与输出矩阵",
    text: "include、目录、重命名与标签筛选",
    to: "/docs/users/xresconv",
  },
  {
    title: "校验与项目扩展",
    text: "验证器、脚本、事件和自定义按钮",
    to: "/docs/users/validator",
  },
  {
    title: "开发与集成",
    text: "依赖、构建、进程架构与接口",
    to: "/docs/development/build",
  },
];

const features = [
  [
    "01",
    "跨平台批量转换",
    "Java 引擎、原生 Rust CLI 与 Tauri GUI 协作，支持 Windows、macOS 和 Linux，让策划选表与构建流水线复用清单。",
    "/docs/users/xresconv",
  ],
  [
    "02",
    "一份表格，多种格式",
    "protobuf、MsgPack、Lua、JavaScript、JSON、XML，以及 Unreal Engine DataTable JSON / CSV，满足客户端和服务端的不同需求。",
    "/docs/users/output-format",
  ],
  [
    "03",
    "复杂协议，直接表达",
    "proto2 / proto3、嵌套 message、repeated、oneof、map 和单元格 Plain 结构，让配置按业务模型组织。",
    "/docs/users/data-types",
  ],
  [
    "04",
    "枚举与描述信息导出",
    "导出协议枚举、常量和 descriptor，生成 Lua / JavaScript 代码或 JSON / XML 数据，配合自定义插件扩展反射信息。",
    "/docs/users/advance-usage",
  ],
  [
    "05",
    "校验与策划可读性",
    "字段和枚举别名、宏、范围、跨表引用与逻辑组合校验，把输入错误提前暴露在转表环节。",
    "/docs/users/validator",
  ],
  [
    "06",
    "灵活映射与合表",
    "多张 Excel 合并输出，支持字段名正则映射、范围、转置和数组；协议插件控制输出行为。",
    "/docs/users/data-mapping",
  ],
  [
    "07",
    "按项目控制数据输出",
    "公式缓存或显式实时计算、空数据裁剪与定长保留、数据版本号、多格式输出目录和标签筛选。",
    "/docs/users/xresloader-core",
  ],
  [
    "08",
    "多语言加载与索引",
    "配套 C++、C#、Go、upb、pbc、lua-protobuf 等接入方式；Lua 支持 global / require / module，JavaScript 支持 global / Node.js / AMD。",
    "/docs/users/xres-code-generator",
  ],
  [
    "09",
    "Unreal Engine 与项目扩展",
    "输出 UE DataTable，生成加载代码；通过 GUI 事件、自定义按钮和 Node.js 脚本接入项目工具。dump-bin 用于查看二进制数据。",
    "/docs/users/ecosystem-and-tools",
  ],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const screenshot = useBaseUrl("/img/users/gui-main-light.png");
  const darkScreenshot = useBaseUrl("/img/users/gui-main-dark.png");
  const sampleDownload = useBaseUrl("/examples/quick-start.zip");
  return (
    <Layout
      title="Excel 数据转表工具链"
      description="xresloader、Rust CLI 与 Tauri GUI：从 Excel 到结构化游戏配置，快速上手与完整参考。"
    >
      <main className={styles.home}>
        <section className={styles.hero}>
          <div className={`container ${styles.wide} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} /> XRESLOADER TOOLCHAIN
              </p>
              <h1>
                从 Excel 到<br />
                <span>游戏数据。</span>
              </h1>
              <p className={styles.lead}>
                让策划专注表格，让程序获得结构化配置。
                <br />
                协议、校验、批量转换和读表代码，在一条清晰的流程里协作。
              </p>
              <div className={styles.actions}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/users/quick-start"
                >
                  开始第一次转换 <Arrow />
                </Link>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="/docs/users/download"
                >
                  下载工具
                </Link>
              </div>
              <p className={styles.heroNote}>
                准备好的 Excel、协议和 XML · 入门无需安装 protoc
              </p>
            </div>
            <div
              className={styles.pipeline}
              aria-label="从表格到结构化配置的转换流程"
            >
              <div className={styles.pipelineHeader}>
                <span>一份数据，多种输出</span>
                <span className={styles.pipelineBadge}>配置工作流</span>
              </div>
              <div className={styles.sources}>
                <div>
                  <span className={styles.sourceIcon}>X</span>
                  <strong>Excel</strong>
                  <small>策划数据</small>
                </div>
                <span className={styles.plus}>+</span>
                <div>
                  <span className={styles.protoIcon}>P</span>
                  <strong>Protobuf</strong>
                  <small>结构与约束</small>
                </div>
              </div>
              <div className={styles.connector} aria-hidden="true">
                ↓
              </div>
              <div className={styles.engine}>
                <strong>xresloader</strong>
                <span>字段映射 / 数据校验 / 转换</span>
              </div>
              <div className={styles.connector} aria-hidden="true">
                ↓
              </div>
              <div className={styles.outputs}>
                {[
                  "protobuf",
                  "JSON",
                  "Lua",
                  "MsgPack",
                  "JavaScript",
                  "UE DataTable",
                ].map((format) => (
                  <span key={format}>{format}</span>
                ))}
              </div>
              <div className={styles.command}>
                <span aria-hidden="true">$</span>
                <code>xresconv-cli -p 1 convert.xml</code>
              </div>
              <p className={styles.pipelineFoot}>
                命令行接入流水线，桌面工具交互选表。
              </p>
            </div>
          </div>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section}`}
          aria-labelledby="tools-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>选择适合你的入口</p>
              <h2 id="tools-heading">工具链组件与最新下载</h2>
            </div>
            <Link to="/docs/intro">
              工具链概览 <Arrow />
            </Link>
          </div>
          <ToolchainCatalog />
        </section>

        <section
          className={`container ${styles.wide} ${styles.section} ${styles.featureSection}`}
          aria-labelledby="features-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>为游戏配置工作流设计</p>
              <h2 id="features-heading">从数据表达，到可靠的运行时配置</h2>
            </div>
            <Link to="/docs/intro">
              完整能力概览 <Arrow />
            </Link>
          </div>
          <div className={styles.featureGrid}>
            {features.map(([number, title, text, to]) => (
              <article className={styles.featureCard} key={title}>
                <span className={styles.featureNumber} aria-hidden="true">
                  {number}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to={to}>
                  查看功能与示例 <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.startBand} aria-labelledby="start-heading">
          <div className={`container ${styles.wide} ${styles.startGrid}`}>
            <div>
              <p className={styles.eyebrow}>第一次使用</p>
              <h2 id="start-heading">
                先跑通示例，
                <br />
                再接入自己的项目。
              </h2>
              <p>
                准备好的示例只包含基础数据和两种输出，
                <br />
                详细功能可以在需要时逐项查阅。
              </p>
              <a
                className="button button--primary"
                href={sampleDownload}
                download
              >
                下载示例 ZIP <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <div>
                  <h3>准备工具</h3>
                  <p>Java、xresloader JAR，再选 CLI 或 GUI。</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>打开配置，检查预览</h3>
                  <p>用同一份 XML 关联表格、协议与输出。</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>核对并加载数据</h3>
                  <p>对照 Excel、查看 bin，用示例代码加载 JSON 或 protobuf。</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section} ${styles.showcase}`}
          aria-labelledby="gui-heading"
        >
          <div className={styles.showcaseCopy}>
            <p className={styles.eyebrow}>XRESCONV-GUI 3.0</p>
            <h2 id="gui-heading">
              看清条目，
              <br />
              掌握转换进度。
            </h2>
            <p>
              树形选择、输出矩阵、可筛选日志与取消控制集中在一个工作台。轻量桌面壳与独立业务进程各司其职。
            </p>
            <Link to="/docs/users/xresconv-gui">
              查看界面与操作 <Arrow />
            </Link>
            <Link to="/docs/users/xresconv-scripts">
              接入项目脚本 <Arrow />
            </Link>
          </div>
          <figure className={styles.screenshot}>
            <ThemedImage
              sources={{ light: screenshot, dark: darkScreenshot }}
              alt="xresconv-gui 3.0 正式版选择人物表和升级表，真实转换完成并显示四个输出的成功日志"
              width="1980"
              height="1320"
              loading="lazy"
            />
            <figcaption>3.0 正式版 · 使用入门示例实际转换</figcaption>
          </figure>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section} ${styles.referenceSection}`}
          aria-labelledby="reference-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>按需查阅</p>
              <h2 id="reference-heading">从基础映射到项目集成</h2>
            </div>
          </div>
          <div className={styles.referenceGrid}>
            {references.map((ref) => (
              <Link className={styles.referenceCard} key={ref.to} to={ref.to}>
                <div>
                  <h3>{ref.title}</h3>
                  <p>{ref.text}</p>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
