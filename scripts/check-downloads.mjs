import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { latestRelease, latestReleaseUrl } from "../src/data/latest-release.mjs";
import { components } from "../src/data/toolchain.mjs";

let checks = 0;
const equal = (actual, expected) => { assert.equal(actual, expected); checks++; };
const asset = (id, version, suffix) => {
  const name = `${id}-${version}${suffix}`;
  return { name, browser_download_url: `https://github.com/xresloader/${id}/releases/download/v${version}/${name}` };
};
const release = (version, assets) => ({ tag_name: `v${version}`, draft: false, prerelease: false, assets });

for (const component of components)
  equal(latestReleaseUrl(component.id), `${component.repository}/releases/latest`);

const originalFetch = globalThis.fetch;
const oldRelease = release("2.23.7", [asset("xresloader", "2.23.7", ".jar")]);
const newRelease = release("9.4.0", [asset("xresloader", "9.4.0", ".jar")]);
let calls = 0;
let response = oldRelease;
globalThis.fetch = async (url, options) => {
  equal(url, "https://api.github.com/repos/xresloader/xresloader/releases/latest");
  equal(options.cache, "no-store");
  calls++;
  return { ok: true, json: async () => response };
};
try {
  equal((await latestRelease("xresloader")).tag_name, "v2.23.7");
  response = newRelease;
  equal((await latestRelease("xresloader")).tag_name, "v2.23.7");
  equal(calls, 1);
  equal((await latestRelease("xresloader", { fresh: true })).tag_name, "v9.4.0");
  equal(calls, 2);
  for (const status of [403, 404]) {
    globalThis.fetch = async () => ({ ok: false, status });
    await assert.rejects(latestRelease("xresloader", { fresh: true }), (error) => error.status === status);
    checks++;
  }
  globalThis.fetch = async () => ({ ok: false, status: 404 });
  await assert.rejects(latestRelease("xres-code-generator", { fresh: true }), (error) => error.status === 404);
  checks++;
  globalThis.fetch = async () => ({ ok: true, json: async () => release("1.0.0", []) });
  equal((await latestRelease("xres-code-generator", { fresh: true })).tag_name, "v1.0.0");
  for (const invalid of [{ ...newRelease, prerelease: true }, { ...newRelease, draft: true }, { ...newRelease, tag_name: "" }, { ...newRelease, assets: null }]) {
    globalThis.fetch = async () => ({ ok: true, json: async () => invalid });
    await assert.rejects(latestRelease("xresloader", { fresh: true }), /Invalid release/);
    checks++;
  }
  globalThis.fetch = async () => { throw new TypeError("Network unavailable"); };
  await assert.rejects(latestRelease("xresloader", { fresh: true }), /Network unavailable/);
  checks++;
} finally {
  globalThis.fetch = originalFetch;
}
for (const path of ["docs/users/download.md", "i18n/en/docusaurus-plugin-content-docs/current/users/download.md"]) {
  const text = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  assert.doesNotMatch(text, /github\.com\/xresloader\/[^\s)]+\/releases\/(?:tag|download)\//);
  assert.doesNotMatch(text, /(?:original-)?xres(?:loader|conv-cli|conv-gui|loader-dump-bin)-\d+(?:\.\d+)+/);
  checks += 2;
}
console.log(`${checks} latest-download checks passed (stable links, release updates, first release, request failures and bilingual docs).`);
