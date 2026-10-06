import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync, readdirSync, existsSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");
const walk = (dir) => readdirSync(dir, {withFileTypes: true}).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const names = (base) => walk(path.join(root, base)).filter((file) => /\.mdx?$/.test(file))
  .map((file) => path.relative(path.join(root, base), file).replaceAll(path.sep, "/"))
  .filter((file) => !file.startsWith("ai/")).sort();
const englishRoot = "i18n/en/docusaurus-plugin-content-docs/current";
const documents = names("docs");
assert.deepEqual(names(englishRoot), documents, "Every public document needs a complete English counterpart.");
assert.ok(!existsSync(path.join(root, englishRoot, "ai")), "Internal records must not be translated into public routes.");
const status = JSON.parse(read("i18n/translation-status.json"));
assert.deepEqual(Object.keys(status).sort(), documents, "Translation review registry must cover all public documents.");
const digest = (text) => createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex");
const assetRegistry = JSON.parse(read("docs/ai/localized-assets.json"));
const approved = new Set(assetRegistry.assets.flatMap((item) => [item.en, item.zh]).filter(Boolean));
for (const name of documents) {
  const source = read(`docs/${name}`), english = read(`${englishRoot}/${name}`);
  assert.equal(digest(source), status[name].source, `${name}: source changed; review and update both languages before recording it.`);
  assert.equal(digest(english), status[name].en, `${name}: record the reviewed English update.`);
  const frontmatter = english.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(frontmatter, `${name}: frontmatter is required.`);
  assert.ok(!/\p{Script=Han}|\{#/u.test(frontmatter[1]), `${name}: metadata must be English and contain no heading IDs.`);
  assert.ok(!english.split(/\r?\n/).some((line) => line.includes("{#") && !/^#{1,6} /.test(line)), `${name}: heading IDs must be on headings.`);
  for (const match of english.matchAll(/!\[[^\]]*\]\((\/img\/[^)\s]+)\)/g)) {
    assert.ok(approved.has(match[1]), `${name}: review the language of ${match[1]} in the asset registry.`);
    assert.ok(existsSync(path.join(root, "static", match[1])), `${name}: missing image ${match[1]}.`);
  }
}
for (const asset of approved) assert.ok(existsSync(path.join(root, "static", asset)), `Missing registered asset: ${asset}`);
const messages = JSON.parse(read("i18n/zh-Hans/code.json"));
for (const file of ["src/pages/index.jsx", "src/components/ToolchainCatalog/index.jsx", "src/data/toolchain-translations.js", "src/theme/NavbarItem/LocaleDropdownNavbarItem/index.jsx"]) {
  for (const match of read(file).matchAll(/\bid\s*:\s*"([^"]+)"|"id"\s*:\s*"([^"]+)"/g)) {
    const id = match[1] || match[2];
    assert.ok(messages[id]?.message, `Missing Chinese UI translation ${id}`);
  }
}
for (const file of walk(path.join(root, "i18n")).filter((name) => name.endsWith(".json"))) JSON.parse(readFileSync(file, "utf8"));

// Run the shipped pre-hydration script; browser services are the controlled boundary.
const script = read("static/js/locale-preference.js"), key = "xresloader-docs.locale";
let cases = 0;
function choose({url = "/", languages = ["en-US"], saved, denied = false}) {
  let current = new URL(url, "https://docs.example"), value = saved, redirected = false;
  const storage = {
    getItem: () => {if (denied) throw Error("Storage denied"); return value;},
    setItem: (_key, next) => {if (denied) throw Error("Storage denied"); assert.equal(_key, key); value = next;},
    removeItem: () => {if (denied) throw Error("Storage denied"); value = undefined;},
  };
  vm.runInNewContext(script, {URL, Intl, window: {
    location: {href: current.href, replace: (next) => {current = new URL(next); redirected = true;}},
    navigator: {languages, language: languages[0]}, localStorage: storage,
    history: {state: null, replaceState: (_state, _title, next) => {current = new URL(next);}},
  }});
  cases++;
  return {url: current.pathname + current.search + current.hash, saved: value, redirected};
}
for (const languages of [["en-US"], ["fr-FR"], ["zh-TW"], ["zh-Hant"], ["zh-HK"], ["zh-MO"], ["bad_tag"]]) {
  assert.equal(choose({languages}).url, "/");
}
for (const languages of [["zh"], ["zh-CN"], ["zh-SG"], ["zh-Hans"], ["fr", "zh-CN", "en"]]) {
  assert.equal(choose({languages, url: "/?q=guide#details"}).url, "/zh-Hans/?q=guide#details");
}
assert.equal(choose({languages: ["en", "zh-CN"]}).url, "/");
assert.equal(choose({languages: ["zh-CN"], saved: "en"}).url, "/");
assert.equal(choose({languages: ["en"], saved: "zh-Hans"}).url, "/zh-Hans/");
assert.equal(choose({languages: ["zh-CN"], saved: "invalid"}).url, "/zh-Hans/");
for (const url of ["/docs/users/quick-start#step", "/zh-Hans/docs/users/quick-start", "/zh-Hans/"]) assert.equal(choose({url, saved: "zh-Hans", languages: ["en"]}).url, url);
const manual = choose({url: "/?q=1&persistLocale=true#step", languages: ["zh-CN"]});
assert.equal(manual.url, "/?q=1#step"); assert.equal(manual.saved, "en");
const zhManual = choose({url: "/zh-Hans/docs/users/quick-start?persistLocale=true#step"});
assert.equal(zhManual.saved, "zh-Hans"); assert.equal(zhManual.url, "/zh-Hans/docs/users/quick-start#step");
const system = choose({url: "/?followSystem=true&q=1#step", saved: "en", languages: ["zh-CN"]});
assert.equal(system.saved, undefined); assert.equal(system.url, "/zh-Hans/?q=1#step");
assert.equal(choose({denied: true, languages: ["zh-CN"]}).url, "/zh-Hans/");
assert.equal(choose({denied: true, url: "/?persistLocale=true", languages: ["zh-CN"]}).url, "/");
console.log(`${documents.length} translation pairs, localized assets and ${cases} locale-selection cases passed.`);
