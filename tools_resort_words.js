/* 词表按难度重新编排
   1) M1-M3 的 300 个基础词（含音标/例句）→ 按难度重新分成三档，真正从易到难
   2) M4-M18 的 15 个主题块 → 按块的平均难度排序（简单主题在前），块内按难度排序
   3) 每个词写入 d 字段：1 简单 / 2 中等 / 3 较难
   输出：data/words.js（原地覆盖，原文件备份为 data/words.bak.js）
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE = path.join(__dirname);
const SRC = path.join(BASE, 'data', 'words.js');

const s = { window: {} };
vm.createContext(s);
vm.runInContext(fs.readFileSync(SRC, 'utf8'), s);
const W = s.window.WORDS;

/* ---------- 难度打分 ---------- */
function syllables(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  w = w.replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}
const HARD_SUFFIX = /(tion|sion|ment|ness|ity|ous|ive|able|ible|ance|ence|ial|ical|ism|ist|ize|ise|ate|ude|ure|ory|ary)$/;
const PREFIX = /^(un|in|im|dis|mis|re|pre|sub|inter|over|under|non|anti|semi)[a-z]{4,}/;
const COMPOUND = /^(after|bed|bath|some|any|every|foot|week|sun|home|school|birth|class|news|house|time|day|hand|book|work|play|air|fire|rain|snow|sea|water)[a-z]{3,}$/;
const SPELL_HARD = /(ough|augh|eigh|ei|ie|que|gue|ps|rh|gn|kn|wr|bt|mn|sc[iu])/;

/* 最亲切的高频词：孩子生活中天天见到，排到最前面建立信心 */
const CORE = new Set(('cat dog book pen bag school home friend teacher water food milk apple banana bread egg ' +
  'red blue green black white big small happy sad hot cold new good ' +
  'run walk play eat drink sleep read write draw sing jump swim ' +
  'go come see look listen like love have make say tell ask help ' +
  'mum dad baby boy girl man woman child family ' +
  'bed room door window chair desk table clock ' +
  'bus car bike ship train park shop ' +
  'one two three four five six seven eight nine ten ' +
  'day night sun moon star tree flower bird fish horse ' +
  'eye ear nose mouth head hand foot leg hair face ' +
  'this that here there what who when where why how ' +
  'I you he she we they my your his her ' +
  'yes no please thank sorry hello goodbye ' +
  'name game ball song story time today ').split(/\s+/));

function diffOf(w) {
  const x = String(w).toLowerCase();
  let s = 0;
  if (CORE.has(x)) s -= 4.5;
  s += syllables(x) * 2.2;
  s += Math.max(0, x.length - 4) * 0.55;
  if (HARD_SUFFIX.test(x)) s += 4.2;
  if (PREFIX.test(x)) s += 2.4;
  if (COMPOUND.test(x)) s += 1.6;
  if (SPELL_HARD.test(x)) s += 1.8;
  if (x.length >= 10) s += 1.2;
  return s;
}
const tier = d => (d < 7 ? 1 : d < 11 ? 2 : 3);

/* ---------- 1. 前三月基础词 ---------- */
const base = [].concat(W[1] || [], W[2] || [], W[3] || []);
base.forEach(w => { w._d = diffOf(w.w); });
base.sort((a, b) => a._d - b._d || a.w.localeCompare(b.w));

const per = Math.ceil(base.length / 3);
const newBase = [[], [], []];
base.forEach((w, i) => newBase[Math.min(2, Math.floor(i / per))].push(w));

/* ---------- 2. 后十五个主题块 ---------- */
const blocks = [];
for (let m = 4; m <= 18; m++) {
  const arr = (W[m] || []).slice();
  if (!arr.length) continue;
  arr.forEach(w => { w._d = diffOf(w.w); });
  const avg = arr.reduce((a, b) => a + b._d, 0) / arr.length;
  arr.sort((a, b) => a._d - b._d || a.w.localeCompare(b.w));
  blocks.push({ m, arr, avg });
}
blocks.sort((a, b) => a.avg - b.avg);

/* ---------- 3. 组装输出 ---------- */
const out = {};
for (let i = 0; i < 3; i++) out[i + 1] = newBase[i];
blocks.forEach((b, i) => { out[i + 4] = b.arr; });

/* 主题名（用于注释，尽力还原） */
function jstr(w) {
  const f = [['w', w.w], ['ip', w.ip], ['p', w.p], ['cn', w.cn]];
  if (w.ex) { f.push(['ex', w.ex]); f.push(['ec', w.ec]); }
  f.push(['d', tier(w._d)]);
  return '{' + f.map(([k, v]) => k + ":'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'").join(',') + '}';
}

let body = '';
for (let m = 1; m <= 18; m++) {
  const arr = out[m] || [];
  if (!arr.length) continue;
  const from = m <= 3 ? '基础词' : ('主题块·原 M' + blocks[m - 4].m);
  const ds = arr.map(tier);
  const avg = (ds.reduce((a, b) => a + b, 0) / ds.length).toFixed(2);
  body += `\n/* ============ M${m}（${arr.length} 词 · ${from} · 平均难度 ${avg}） ============ */\n${m}:[\n`;
  body += arr.map(w => ' ' + jstr(w)).join(',\n');
  body += '\n],';
}

const header = `/* =========================================================
   剑桥 A2 Key 官方词表（2025.8 版）· 按 18 个月分配
   来源：cambridgeenglish.org/images/506886-a2-key-2020-vocabulary-list.pdf
   编排：按难度递进 —— M1 最易 → M18 最难；每月内部也从易到难
   M1-M3 为 300 个基础词（含音标/词性/中文/例句），M4-M18 为主题词块
   d 字段：1 简单 / 2 中等 / 3 较难（用于背词卡显示星级）
   生成时间：${new Date().toISOString().slice(0, 10)}
   ========================================================= */
window.WORDS = {`;

fs.copyFileSync(SRC, path.join(BASE, 'data', 'words.bak.js'));
fs.writeFileSync(SRC, header + body.replace(/,$/, '') + '\n};\n', 'utf8');

/* 报告 */
console.log('月份  词数  平均难度  难度分布(1/2/3)   示例');
for (let m = 1; m <= 18; m++) {
  const arr = out[m] || [];
  if (!arr.length) continue;
  const ds = arr.map(w => tier(w._d));
  const c = [1, 2, 3].map(k => ds.filter(x => x === k).length);
  console.log(
    'M' + String(m).padEnd(3),
    String(arr.length).padEnd(5),
    (ds.reduce((a, b) => a + b, 0) / ds.length).toFixed(2).padEnd(9),
    (c.join('/')).padEnd(17),
    arr.slice(0, 6).map(w => w.w).join(', ')
  );
}
