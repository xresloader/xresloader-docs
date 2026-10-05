import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import {
  components,
  detectPlatform,
  selectAssets,
  assetLabel,
} from "../../data/toolchain.mjs";
import styles from "./styles.module.css";

const releaseRequests = new Map();
function latestRelease(id) {
  if (
    !releaseRequests.has(id) ||
    Date.now() - releaseRequests.get(id).started > 60000
  ) {
    const request = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(
          `https://api.github.com/repos/xresloader/${id}/releases/latest`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const release = await response.json();
        if (
          !Array.isArray(release.assets) ||
          release.draft ||
          release.prerelease
        )
          throw new Error("Invalid release");
        return release;
      } finally {
        clearTimeout(timer);
      }
    })();
    releaseRequests.set(id, { request, started: Date.now() });
  }
  return releaseRequests.get(id).request;
}

function ComponentCard({ component, release, platform, architecture }) {
  const assets = release?.data
    ? selectAssets(component.id, release.data.assets, platform, architecture)
    : [];
  return (
    <article className={styles.card} data-component={component.id}>
      <p className={styles.role}>{component.role}</p>
      <h3>{component.id}</h3>
      <p className={styles.purpose}>{component.purpose}</p>
      <div className={styles.links}>
        <a href={component.repository}>仓库 ↗</a>
        <Link to={component.guide}>使用文档 ↗</Link>
        {component.release && (
          <a href={`${component.repository}/releases/latest`}>最新 Release ↗</a>
        )}
      </div>
      <div className={styles.downloads}>
        {component.release ? (
          <>
            <p className={styles.status} aria-live="polite">
              {release?.data
                ? `最新正式版 ${release.data.tag_name}`
                : release?.error
                  ? "下载列表暂不可用，请打开最新 Release。"
                  : "正在查询最新正式版…"}
            </p>
            {assets.map((asset) => {
              const checksum = release.data.assets.find(
                (candidate) =>
                  candidate.name === `${asset.name}.sha256` &&
                  /^https:\/\/github\.com\//.test(
                    candidate.browser_download_url || "",
                  ),
              );
              return (
                <div className={styles.asset} key={asset.name}>
                  <a
                    href={asset.browser_download_url}
                    title={asset.name}
                    data-download
                  >
                    {assetLabel(component.id, asset.name)} ↓
                  </a>
                  {checksum && (
                    <a
                      className={styles.checksum}
                      href={checksum.browser_download_url}
                      aria-label={`${asset.name} SHA256`}
                    >
                      SHA256
                    </a>
                  )}
                </div>
              );
            })}
            {release?.data && !assets.length && (
              <p className={styles.status}>
                此平台或架构没有匹配的包，请选择其他平台或查看发布页。
              </p>
            )}
          </>
        ) : (
          <>
            <p className={styles.status}>
              此项目尚未发布 Release，提供最新 main 分支源码。
            </p>
            <a
              href={`${component.repository}/archive/refs/heads/main.zip`}
              data-download
            >
              最新源码 ZIP ↓
            </a>
          </>
        )}
      </div>
    </article>
  );
}

export default function ToolchainCatalog() {
  const [platform, setPlatform] = useState("all");
  const [architecture, setArchitecture] = useState("all");
  const [releases, setReleases] = useState({});
  useEffect(() => {
    setPlatform(detectPlatform(window.navigator));
    let active = true;
    components
      .filter((component) => component.release)
      .forEach((component) => {
        latestRelease(component.id)
          .then((data) => {
            if (active)
              setReleases((previous) => ({
                ...previous,
                [component.id]: { data },
              }));
          })
          .catch(() => {
            if (active)
              setReleases((previous) => ({
                ...previous,
                [component.id]: { error: true },
              }));
          });
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className={styles.catalog}>
      <div className={styles.filters}>
        <label>
          目标操作系统
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="all">所有系统</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
          </select>
        </label>
        <label>
          CPU 架构
          <select
            value={architecture}
            onChange={(event) => setArchitecture(event.target.value)}
          >
            <option value="all">所有架构</option>
            <option value="x64">x64 / Intel</option>
            <option value="arm64">ARM64 / Apple Silicon</option>
          </select>
        </label>
        <p>
          自动识别桌面系统；CPU
          架构请按目标机器选择。手机可选择要安装的电脑系统。
        </p>
      </div>
      <div className={styles.grid}>
        {components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            release={releases[component.id]}
            platform={platform}
            architecture={architecture}
          />
        ))}
      </div>
      <p className={styles.note}>
        下载链接来自各项目 latest 正式发布的资产，版本号独立更新。网络或 GitHub
        API 限流时，使用各卡片的「最新 Release」入口。
      </p>
    </div>
  );
}
