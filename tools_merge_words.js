/* 合并词表 → 按难度均摊到 18 个月
   输入：data/words.js（原有 965）+ data/words_extra.js（官方表补全 1251）
   输出：data/words.js（覆盖，原文件备份为 data/words.bak2.js）
   排序键：难度 d（1 最易 → 6 最难），同难度内按拼读难度分 + 字母序
   分配：每月词数按 0.8→1.2 线性递增（前期少、多复习；后期多、冲量）
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const BASE = __dirname;

function load(p, v) {
  const s = { window: {} };
  vm.createContext(s);
  vm.runInContext(fs.readFileSync(path.join(BASE, p), 'utf8'), s);
  return s.window[v];
}

/* ---------- 拼读/构词难度 ---------- */
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
const SPELL_HARD = /(ough|augh|eigh|ei|ie|que|gue|ps|rh|gn|kn|wr|bt|mn|sc[iu])/;
function spell(w) {
  const x = String(w).toLowerCase();
  let s = syllables(x) * 2.2 + Math.max(0, x.length - 4) * 0.55;
  if (HARD_SUFFIX.test(x)) s += 4.2;
  if (PREFIX.test(x)) s += 2.4;
  if (SPELL_HARD.test(x)) s += 1.8;
  if (x.length >= 10) s += 1.2;
  return s;
}
const tier = d => (d < 7 ? 1 : d < 11 ? 2 : 3);

/* ---------- 收集 ---------- */
const OLD = load('data/words.js', 'WORDS');
const EXTRA = load('data/words_extra.js', 'WORDS_EXTRA');
const all = [];
for (let m = 1; m <= 18; m++) (OLD[m] || []).forEach(w => all.push(Object.assign({ _old: 1 }, w)));
const seen = new Set(all.map(w => String(w.w).toLowerCase()));
let added = 0;
EXTRA.forEach(w => {
  const k = String(w.w).toLowerCase();
  if (seen.has(k)) return;
  seen.add(k); added++; all.push(Object.assign({ _old: 0 }, w));
});

all.forEach(w => {
  if (w.ip === 'undefined' || w.ip == null) w.ip = '';
  w._s = spell(w.w);
});
/* 旧词没有人工难度，用"拼读难度分位"补到统一的 1-6 档，
   这样旧词和新词（人工 d）落在同一把尺子上 */
const sortedS = all.map(w => w._s).sort((a, b) => a - b);
const q = p => sortedS[Math.min(sortedS.length - 1, Math.floor(sortedS.length * p))];
const CUT = [q(1 / 6), q(2 / 6), q(3 / 6), q(4 / 6), q(5 / 6)];
const bucket = s => { for (let i = 0; i < 5; i++) if (s < CUT[i]) return i + 1; return 6; };
all.forEach(w => { if (w._old) w.d = bucket(w._s); w.d = Math.min(6, Math.max(1, +w.d || 1)); });

/* 连续难度分 = 拼读难度 + 人工难度档，保证是一条平滑上升的曲线，
   而不是"先把所有简单词排完再排难词"（那会让前 8 个月都一个味） */
all.forEach(w => { w._k = 0.55 * w._s + 1.9 * (w.d - 1); });
all.sort((a, b) => a._k - b._k || a._s - b._s || String(a.w).localeCompare(String(b.w)));
/* 最终展示用的 d 按最终排序重新分 6 档，保证每月难度是阶梯上升的可见信号 */
all.forEach((w, i) => { w.d = Math.min(6, Math.floor(i / (all.length / 6)) + 1); });

/* ---------- 按月分配（0.8 → 1.2 线性递增） ---------- */
const N = all.length;
const wts = [];
for (let m = 1; m <= 18; m++) wts.push(0.8 + 0.4 * (m - 1) / 17);
const sum = wts.reduce((a, b) => a + b, 0);
const out = {};
let i = 0;
const counts = wts.map(w => Math.round(N * w / sum));
counts[17] += N - counts.reduce((a, b) => a + b, 0);
for (let m = 1; m <= 18; m++) {
  out[m] = all.slice(i, i + counts[m - 1]);
  i += counts[m - 1];
}

/* ---------- 输出 ---------- */
function jstr(w) {
  const f = [['w', w.w], ['ip', w.ip], ['p', w.p], ['cn', w.cn]];
  if (w.ex) { f.push(['ex', w.ex]); if (w.ec) f.push(['ec', w.ec]); }
  f.push(['d', w.d]);
  return '{' + f.map(([k, v]) => k + ":'" + String(v == null ? '' : v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'").join(',') + '}';
}
let body = '';
for (let m = 1; m <= 18; m++) {
  const arr = out[m];
  const dd = arr.map(x => x.d);
  const avg = (dd.reduce((a, b) => a + b, 0) / dd.length).toFixed(2);
  const c = [1, 2, 3, 4, 5, 6].map(k => dd.filter(x => x === k).length).join('/');
  body += `\n/* ============ M${m}（${arr.length} 词 · 平均难度 ${avg} · 难度分布 1-6 为 ${c}） ============ */\n${m}:[\n`;
  body += arr.map(w => ' ' + jstr(w)).join(',\n');
  body += '\n],';
}
const header = `/* =========================================================
   剑桥 A2 Key / A2 Key for Schools 官方词表（2025 版）· 全量 ${N} 词
   来源：Cambridge A2 Key Vocabulary List（25 个主题）+ 高频补充词
   编排：全部词按难度排序后均摊到 18 个月
         d = 难度 1（最易，日常高频）→ 6（最难，抽象/长词）
         每月内部也是从易到难；月与月之间难度阶梯式上升
         每月词数前少后多（M1 约 ${counts[0]} 词 → M18 约 ${counts[17]} 词）
   合计 ${N} 词（原有 ${all.length - added} + 官方表补全 ${added}）
   生成时间：${new Date().toISOString().slice(0, 10)}
   ========================================================= */
window.WORDS = {`;

fs.copyFileSync(path.join(BASE, 'data', 'words.js'), path.join(BASE, 'data', 'words.bak2.js'));
fs.writeFileSync(path.join(BASE, 'data', 'words.js'), header + body.replace(/,$/, '') + '\n};\n', 'utf8');

console.log('总词数', N, '（新增', added, '）');
console.log('月份  词数  平均难度  难度分布(1/2/3/4/5/6)  首词 → 末词');
for (let m = 1; m <= 18; m++) {
  const arr = out[m];
  const dd = arr.map(x => x.d);
  const c = [1, 2, 3, 4, 5, 6].map(k => dd.filter(x => x === k).length).join('/');
  console.log('M' + String(m).padEnd(3), String(arr.length).padEnd(5),
    (dd.reduce((a, b) => a + b, 0) / dd.length).toFixed(2).padEnd(9), c.padEnd(20),
    arr[0].w + ' → ' + arr[arr.length - 1].w);
}
