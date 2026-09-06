/* 用 CDP 真机验证 index.html 运行时状态（Node 22 自带全局 WebSocket）
   用法：node tools_cdp_smoke.js [url] */
const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

const URL_ = process.argv[2] || 'http://127.0.0.1:8765/index.html';
const PORT = 9333;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PROFILE = path.join(os.tmpdir(), 'ket_cdp_profile');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});

(async () => {
  const proc = spawn(EDGE, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE,
    '--window-size=430,940', 'about:blank'
  ], { stdio: 'ignore' });

  let targets = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { targets = await getJSON('http://127.0.0.1:' + PORT + '/json/list'); if (targets.length) break; } catch (e) { }
  }
  if (!targets || !targets.length) { console.log('NO_TARGET'); proc.kill(); process.exit(1); }
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const errs = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails || {};
      errs.push('EXC:' + (d.text || '') + (d.exception && d.exception.description ? ' | ' + d.exception.description : ''));
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      errs.push('CONSOLE:' + JSON.stringify(m.params.args && m.params.args[0] ? m.params.args[0].value : ''));
    }
  };
  await new Promise(r => ws.onopen = r);
  const send = (method, params) => new Promise(r => {
    const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method: method, params: params || {} }));
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: URL_ });
  await sleep(4500);

  const evalJS = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : undefined;
  };

  const out = {};
  out.title = await evalJS('document.title');
  out.appChildren = await evalJS('document.getElementById("app")?document.getElementById("app").children.length:-1');
  out.textLen = await evalJS('(document.body.innerText||"").length');
  out.words = await evalJS('(function(){var t=0;for(var m=1;m<=18;m++)t+=(window.WORDS[m]||[]).length;return t;})()');
  out.readers = await evalJS('(window.READERS_EASY||[]).length+(window.READERS||[]).length');
  out.voice = await evalJS('(function(){try{return (JSON.parse(localStorage.getItem("ket_park_v1"))||{}).voice||"(未保存)"}catch(e){return "ERR"}})()');
  out.voiceDir = await evalJS('typeof wordDir==="function"?wordDir():"(no fn)"');
  out.readerURL = await evalJS('typeof readerURL==="function"?readerURL(101):"(no fn)"');
  out.levelLabel = await evalJS('typeof curLevel==="function"?("L"+curLevel()+" · "+(LV_NAME[curLevel()]||"")+" · "+(LV_WORD[curLevel()]||"")):"(no fn)"');
  out.todayReader = await evalJS('(function(){var r=typeof todayReader==="function"?todayReader():null;return r?("L"+r.lv+" id="+r.id+" "+r.title+" "+r.text.split(/\\s+/).length+"词"):"null"})()');
  out.voiceOpts = await evalJS('typeof VOICE_OPT!=="undefined"?VOICE_OPT.map(function(v){return v.id}).join(","):""');
  out.readPanel = await evalJS('(function(){try{taskRead();var m=(document.body.innerText||"").match(/第 L\\d 级 · [^\\n]*/);return m?m[0]:"NO MATCH"}catch(e){return "ERR "+e.message}})()');
  out.errs = errs.length ? errs.slice(0, 5) : 'none';

  console.log(JSON.stringify(out, null, 1));
  ws.close(); proc.kill();
  process.exit(0);
})();
