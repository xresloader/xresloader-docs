const fs = require('node:fs');
const file = process.argv[2] || 'output/role_upgrade_cfg.json';
const [header, data, messageType] = JSON.parse(fs.readFileSync(file, 'utf8'));
const rows = data[messageType];
if (!Array.isArray(rows) || header.count !== rows.length) {
  throw new Error('数据结构或记录数不一致');
}
// 升级表以角色 ID + 等级作为联合键。
const byKey = new Map(rows.map((row) => [`${row.Id}:${row.Level}`, row]));
console.log(`version=${header.data_ver}, count=${rows.length}`);
console.log(byKey.get('10001:2'));
