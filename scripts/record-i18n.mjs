import {createHash} from "node:crypto";
import {readFileSync, readdirSync, writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const statusPath = path.join(root, "i18n/translation-status.json");
const walk = (dir) => readdirSync(dir, {withFileTypes: true}).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const documents = walk(path.join(root, "docs")).filter((file) =>
  /\.mdx?$/.test(file) && !path.relative(path.join(root, "docs"), file).startsWith(`ai${path.sep}`));
const names = documents.map((file) => path.relative(path.join(root, "docs"), file).replaceAll(path.sep, "/")).sort();
const requested = process.argv.slice(2);
if (!requested.length) throw new Error("After reviewing both languages, supply document paths or --all.");
const selected = requested.length === 1 && requested[0] === "--all" ? names : requested;
let status;
try { status = JSON.parse(readFileSync(statusPath, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; status = {}; }
const digest = (file) => createHash("sha256").update(readFileSync(file, "utf8").replaceAll("\r\n", "\n")).digest("hex");
for (const name of selected) {
  if (!names.includes(name)) throw new Error(`Unknown public document: ${name}`);
  status[name] = {
    source: digest(path.join(root, "docs", name)),
    en: digest(path.join(root, "i18n/en/docusaurus-plugin-content-docs/current", name)),
  };
}
status = Object.fromEntries(names.filter((name) => status[name]).map((name) => [name, status[name]]));
writeFileSync(statusPath, JSON.stringify(status, null, 2) + "\n", "utf8");
console.log(`Recorded ${selected.length} reviewed translation pairs.`);
