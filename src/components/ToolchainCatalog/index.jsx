import { translate } from "@docusaurus/Translate";
import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import { componentLabels } from "../../data/toolchain-translations";
import { components } from "../../data/toolchain.mjs";
import styles from "./styles.module.css";
import { latestRelease, latestReleaseUrl } from "../../data/latest-release.mjs";

function ComponentCard({ component, release }) {
  const labels = componentLabels[component.id];
  return (
    <article className={styles.card} data-component={component.id}>
      <p className={styles.role}>{labels.role}</p>
      <h3>{component.id}</h3>
      <p className={styles.purpose}>{labels.purpose}</p>
      <div className={styles.links}>
        <a href={component.repository}>{translate({"id":"site.message.71","message":"Repository ↗"})}</a>
        <Link to={component.guide}>{translate({"id":"site.message.72","message":"Guide ↗"})}</Link>
      </div>
      <div className={styles.downloads}>
        <p className={styles.status} aria-live="polite">
          {release?.data
            ? translate({ id: "catalog.latest", message: "Latest stable release {version}" }, { version: release.data.tag_name })
            : release?.notFound
              ? translate({"id":"site.message.77","message":"This project has no stable release. Download the current main branch source."})
              : release?.error
              ? translate({"id":"site.message.74","message":"Version information is unavailable. The latest release link remains available."})
              : translate({"id":"site.message.75","message":"Checking the latest stable release…"})}
        </p>
        <a
          href={release?.notFound
            ? `${component.repository}/archive/refs/heads/main.zip`
            : latestReleaseUrl(component.id)}
          data-download
        >{release?.notFound
          ? translate({"id":"site.message.78","message":"Download latest source ↓"})
          : translate({ id: "catalog.downloadLatest", message: "Download latest release ↓" })}</a>
      </div>
    </article>
  );
}

export default function ToolchainCatalog() {
  const [releases, setReleases] = useState({});
  useEffect(() => {
    let active = true;
    components
      .forEach((component) => {
        latestRelease(component.id)
          .then((data) => {
            if (active)
              setReleases((previous) => ({
                ...previous,
                [component.id]: { data },
              }));
          })
          .catch((error) => {
            if (active)
              setReleases((previous) => ({
                ...previous,
                [component.id]: error.status === 404 ? { notFound: true } : { error: true },
              }));
          });
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className={styles.catalog}>
      <div className={styles.grid}>
        {components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            release={releases[component.id]}
          />
        ))}
      </div>
      <p className={styles.note}>{translate({"id":"site.message.84","message":"Choose the package for your system on the latest release page. Projects without a stable release offer their current source."})}</p>
    </div>
  );
}
