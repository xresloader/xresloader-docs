import { translate } from "@docusaurus/Translate";
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";
import ToolchainCatalog from "../components/ToolchainCatalog";
import ThemedImage from "@theme/ThemedImage";

const references = [
  {
    title: translate({"id":"site.message.1","message":"Data mapping"}),
    text: translate({"id":"site.message.2","message":"Fields, arrays, nested messages and data ranges"}),
    to: "/docs/users/data-mapping",
  },
  {
    title: translate({"id":"site.message.3","message":"Manifests and output matrices"}),
    text: translate({"id":"site.message.4","message":"Includes, directories, renaming and tag filters"}),
    to: "/docs/users/xresconv",
  },
  {
    title: translate({"id":"site.message.5","message":"Validation and extensions"}),
    text: translate({"id":"site.message.6","message":"Validators, scripts, events and custom buttons"}),
    to: "/docs/users/validator",
  },
  {
    title: translate({"id":"site.message.7","message":"Development and integration"}),
    text: translate({"id":"site.message.8","message":"Dependencies, builds, processes and interfaces"}),
    to: "/docs/development/build",
  },
];

const features = [
  [
    "01",
    translate({"id":"site.message.9","message":"Batch conversion across platforms"}),
    translate({"id":"site.message.10","message":"A Java engine, native Rust CLI and Tauri GUI work together on Windows, macOS and Linux. Designers and build pipelines use the same manifests."}),
    "/docs/users/xresconv",
  ],
  [
    "02",
    translate({"id":"site.message.11","message":"Multiple output formats"}),
    translate({"id":"site.message.12","message":"Export protobuf, MsgPack, Lua, JavaScript, JSON, XML and Unreal Engine DataTable JSON / CSV for clients and servers."}),
    "/docs/users/output-format",
  ],
  [
    "03",
    translate({"id":"site.message.13","message":"Nested messages and field types"}),
    translate({"id":"site.message.14","message":"Use proto2 / proto3, nested messages, repeated fields, oneof, map and in-cell Plain structures to describe your data model."}),
    "/docs/users/data-types",
  ],
  [
    "04",
    translate({"id":"site.message.15","message":"Export enums and descriptors"}),
    translate({"id":"site.message.16","message":"Export schema enums, constants and descriptors as Lua / JavaScript code or JSON / XML data, with custom options for reflection."}),
    "/docs/users/advance-usage",
  ],
  [
    "05",
    translate({"id":"site.message.17","message":"Aliases and validation"}),
    translate({"id":"site.message.18","message":"Field and enum aliases, macros, ranges, cross-table references and composed validators catch input errors during conversion."}),
    "/docs/users/validator",
  ],
  [
    "06",
    translate({"id":"site.message.19","message":"Field mapping and merged tables"}),
    translate({"id":"site.message.20","message":"Merge Excel sources, map field names with regular expressions, select ranges and transpose data. Schema options control export behavior."}),
    "/docs/users/data-mapping",
  ],
  [
    "07",
    translate({"id":"site.message.21","message":"Output controls"}),
    translate({"id":"site.message.22","message":"Choose cached or explicitly evaluated formulas, trim or retain empty data, set data versions, and filter outputs by format, directory and tags."}),
    "/docs/users/xresloader-core",
  ],
  [
    "08",
    translate({"id":"site.message.23","message":"Data loaders and indexes"}),
    translate({"id":"site.message.24","message":"Integrate with C++, C#, Go, upb, pbc or lua-protobuf. Lua supports global / require / module; JavaScript supports global / Node.js / AMD."}),
    "/docs/users/xres-code-generator",
  ],
  [
    "09",
    translate({"id":"site.message.25","message":"Unreal Engine and project extensions"}),
    translate({"id":"site.message.26","message":"Export UE DataTables and generate loaders. Connect project tools through GUI events, custom buttons and Node.js scripts; inspect binary data with dump-bin."}),
    "/docs/users/ecosystem-and-tools",
  ],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const imagePrefix = currentLocale === "en" ? "/img/en/users" : "/img/users";
  const screenshot = useBaseUrl(`${imagePrefix}/gui-main-light.png`);
  const darkScreenshot = useBaseUrl(`${imagePrefix}/gui-main-dark.png`);
  const cliPreview = useBaseUrl(`${imagePrefix}/cli-preview.png`);
  const cliConversion = useBaseUrl(`${imagePrefix}/cli-conversion.png`);
  const sampleDownload = useBaseUrl(currentLocale === "en" ? "/examples/quick-start-en.zip" : "/examples/quick-start.zip");
  return (
    <Layout
      title={translate({"id":"site.message.27","message":"Excel game data conversion tools"})}
      description={translate({"id":"site.message.28","message":"Excel game data conversion with schema mapping, validation, batch tools and data loader generation. Quick start and technical reference."})}
    >
      <main className={styles.home}>
        <section className={styles.hero}>
          <div className={`container ${styles.wide} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} /> XRESLOADER TOOLCHAIN
              </p>
              <h1>{translate({"id":"site.message.29","message":"Excel game data"})}<br />
                <span>{translate({"id":"site.message.30","message":"conversion tools"})}</span>
              </h1>
              <p className={styles.lead}>{translate({"id":"site.message.31","message":"Convert Excel workbooks into structured game configuration."})}<br />{translate({"id":"site.message.32","message":"Map and validate fields against schemas, convert batches with the CLI or GUI, and generate data loaders."})}</p>
              <div className={styles.actions}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/users/quick-start"
                >{translate({"id":"site.message.33","message":"Quick start"})}<Arrow />
                </Link>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="/docs/users/download"
                >{translate({"id":"site.message.34","message":"Download tools"})}</Link>
              </div>
              <p className={styles.heroNote}>{translate({"id":"site.message.35","message":"Ready-to-use Excel, schema and XML · No protoc needed to get started"})}</p>
            </div>
            <div
              className={styles.pipeline}
              aria-label={translate({"id":"site.message.36","message":"Spreadsheet mapping, validation and conversion workflow"})}
            >
              <div className={styles.pipelineHeader}>
                <span>{translate({"id":"site.message.37","message":"Inputs and output formats"})}</span>
                <span className={styles.pipelineBadge}>{translate({"id":"site.message.38","message":"Configuration workflow"})}</span>
              </div>
              <div className={styles.sources}>
                <div>
                  <span className={styles.sourceIcon}>X</span>
                  <strong>Excel</strong>
                  <small>{translate({"id":"site.message.39","message":"Design data"})}</small>
                </div>
                <span className={styles.plus}>+</span>
                <div>
                  <span className={styles.protoIcon}>P</span>
                  <strong>Protobuf</strong>
                  <small>{translate({"id":"site.message.40","message":"Structure and constraints"})}</small>
                </div>
              </div>
              <div className={styles.connector} aria-hidden="true">
                ↓
              </div>
              <div className={styles.engine}>
                <strong>xresloader</strong>
                <span>{translate({"id":"site.message.41","message":"Field mapping / validation / conversion"})}</span>
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
              <p className={styles.pipelineFoot}>{translate({"id":"site.message.42","message":"Use the CLI in pipelines and select tables interactively in the desktop app."})}</p>
            </div>
          </div>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section}`}
          aria-labelledby="tools-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{translate({"id":"site.message.43","message":"Components"})}</p>
              <h2 id="tools-heading">{translate({"id":"site.message.44","message":"Tools and downloads"})}</h2>
            </div>
            <Link to="/docs/intro">{translate({"id":"site.message.45","message":"Toolchain overview"})}<Arrow />
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
              <p className={styles.eyebrow}>{translate({"id":"site.message.46","message":"Game configuration"})}</p>
              <h2 id="features-heading">{translate({"id":"site.message.47","message":"Capabilities"})}</h2>
            </div>
            <Link to="/docs/intro">{translate({"id":"site.message.48","message":"Explore all capabilities"})}<Arrow />
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
                <Link to={to}>{translate({"id":"site.message.49","message":"Read the guide and examples"})}<Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.startBand} aria-labelledby="start-heading">
          <div className={`container ${styles.wide} ${styles.startGrid}`}>
            <div>
              <p className={styles.eyebrow}>{translate({"id":"site.message.50","message":"Quick start"})}</p>
              <h2 id="start-heading">{translate({"id":"site.message.51","message":"Conversion example"})}</h2>
              <p>{translate({"id":"site.message.53","message":"The example includes Excel workbooks, schema descriptors and XML manifests, with bin and JSON outputs."})}<br />{translate({"id":"site.message.54","message":"The quick start covers conversion, data checks and loading."})}</p>
              <a
                className="button button--primary"
                href={sampleDownload}
                download
              >{translate({"id":"site.message.55","message":"Download example ZIP"})}<span aria-hidden="true">↓</span>
              </a>
            </div>
            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <div>
                  <h3>{translate({"id":"site.message.56","message":"Prepare the tools"})}</h3>
                  <p>{translate({"id":"site.message.57","message":"Install Java and the xresloader JAR, then choose the CLI or GUI."})}</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>{translate({"id":"site.message.58","message":"Preview conversion tasks"})}</h3>
                  <p>{translate({"id":"site.message.59","message":"One XML manifest connects workbooks, schemas and outputs."})}</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>{translate({"id":"site.message.60","message":"Check and load the data"})}</h3>
                  <p>{translate({"id":"site.message.61","message":"Compare with Excel, inspect bin files, and use the sample loaders for JSON or protobuf."})}</p>
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
            <h2 id="gui-heading">{translate({"id":"site.message.62","message":"Desktop batch conversion"})}</h2>
            <p>{translate({"id":"site.message.64","message":"Select entries in a tree, configure output formats, and inspect conversion progress and logs. Filter logs or cancel a running conversion."})}</p>
            <Link to="/docs/users/xresconv-gui">{translate({"id":"site.message.65","message":"Explore the interface"})}<Arrow />
            </Link>
            <Link to="/docs/users/xresconv-scripts">{translate({"id":"site.message.66","message":"Connect project scripts"})}<Arrow />
            </Link>
          </div>
          <figure className={styles.screenshot}>
            <ThemedImage
              sources={{ light: screenshot, dark: darkScreenshot }}
              alt={translate({"id":"site.message.67","message":"xresconv-gui 3.0 release with three entries selected, showing a completed conversion and six successful outputs"})}
              width="1980"
              height="1320"
              loading="lazy"
            />
            <figcaption>{translate({"id":"site.message.68","message":"3.0 release · Actual conversion of the full configuration example"})}</figcaption>
          </figure>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section} ${styles.consoleSection}`}
          aria-labelledby="cli-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>XRESCONV-CLI</p>
              <h2 id="cli-heading">{translate({ id: "home.cli.title", message: "Command-line batch conversion" })}</h2>
            </div>
            <Link to="/docs/users/xresconv-cli">{translate({ id: "home.cli.guide", message: "CLI reference" })}<Arrow /></Link>
          </div>
          <p className={styles.consoleIntro}>{translate({ id: "home.cli.description", message: "Preview the commands for an XML manifest with --test. Run the same manifest to export bin and JSON files; the exit status and logs report the result." })}</p>
          <div className={styles.consoleGallery}>
            {[
              {
                src: cliPreview,
                title: translate({ id: "home.cli.preview", message: "Task preview" }),
                command: "xresconv-cli --test -p 1 convert.xml",
                alt: translate({ id: "home.cli.previewAlt", message: "Actual xresconv-cli 2.0.2 preview output: four commands for two tables, with no data written" }),
              },
              {
                src: cliConversion,
                title: translate({ id: "home.cli.conversion", message: "Conversion results" }),
                command: "xresconv-cli -p 1 convert.xml",
                alt: translate({ id: "home.cli.conversionAlt", message: "Actual xresconv-cli 2.0.2 conversion output: four successful bin and JSON exports, three records per output, zero failed jobs" }),
              },
            ].map(({ src, title, command, alt }) => (
              <figure className={styles.consoleFigure} key={src}>
                <h3>{title}</h3>
                <code className={styles.consoleCommand}>{command}</code>
                <div className={styles.consoleViewport} tabIndex={0} role="region" aria-label={title}>
                  <a href={src} target="_blank" rel="noopener noreferrer" aria-label={translate({ id: "home.cli.fullImage", message: "View full-size image: {title}" }, { title })}>
                    <img src={src} alt={alt} width="2640" height={currentLocale === "en" ? 924 : 930} loading="lazy" />
                  </a>
                </div>
                <figcaption>{translate({ id: "home.cli.caption", message: "Actual output snapshot · Paths shortened; tool diagnostics retain their original language. Scroll horizontally on narrow screens or open the image at full size." })}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className={`container ${styles.wide} ${styles.section} ${styles.referenceSection}`}
          aria-labelledby="reference-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{translate({"id":"site.message.69","message":"Technical reference"})}</p>
              <h2 id="reference-heading">{translate({"id":"site.message.70","message":"Configuration and integration"})}</h2>
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
