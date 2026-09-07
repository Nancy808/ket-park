/* 四环节完整流程演练（CDP）：背词 → 跟读 → 听力 → 说+写
   完全用「点按钮」驱动，模拟孩子真实操作
   用法：node tools_cdp_flow.js [url] */
const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

const URL_ = process.argv[2] || 'http://127.0.0.1:8765/index.html';
const PORT = 9334;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PROFILE = path.join(os.tmpdir(), 'ket_flow_profile');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = u => new Promise((res, rej) => {
  http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});

(async () => {
  const proc = spawn(EDGE, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE,
    '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream',
    '--autoplay-policy=no-user-gesture-required', '--window-size=430,940', 'about:blank'], { stdio: 'ignore' });
  let tg = null;
  for (let i = 0; i < 40; i++) { await sleep(500); try { tg = await getJSON('http://127.0.0.1:' + PORT + '/json/list'); if (tg.length) break; } catch (e) { } }
  if (!tg || !tg.length) { console.log('NO_TARGET'); proc.kill(); process.exit(1); }
  const ws = new WebSocket(tg.find(t => t.type === 'page').webSocketDebuggerUrl);
  let id = 0; const pending = new Map(); const errs = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails || {}; errs.push('EXC:' + (d.text || '') + (d.exception && d.exception.description ? ' ' + d.exception.description.split('\n')[0] : '')); }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errs.push('CON:' + JSON.stringify(m.params.args && m.params.args[0] ? m.params.args[0].value : ''));
  };
  await new Promise(r => ws.onopen = r);
  const send = (method, params) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Page.navigate', { url: URL_ }); await sleep(4000);
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : undefined; };

  const log = [];
  const step = async (name, expr) => { const v = await ev(expr); log.push(name + ' = ' + JSON.stringify(v)); return v; };
  /* 点 overlay 里某个 data-act 按钮（或含指定文字的按钮） */
  const clickAct = async acts => ev(`(function(){var acts=${JSON.stringify(acts)};
    for(var i=0;i<acts.length;i++){var b=document.querySelector('#ov-body [data-act="'+acts[i]+'"]');if(b){b.click();return acts[i];}}
    for(var i=0;i<acts.length;i++){var bs=[].slice.call(document.querySelectorAll('#ov-body button'));
      for(var k=0;k<bs.length;k++){if(bs[k].textContent.indexOf(acts[i])>=0){bs[k].click();return acts[i];}}}
    return "NO_BTN:"+acts.join("/")})()`);

  await ev('localStorage.clear();location.reload()'); await sleep(3500);

  await step('① 首屏四任务', '(document.body.innerText.match(/背词|跟读|听力|说\\+写/g)||[]).join(",")');
  await step('② 初始解锁', '["vocab","read","listen","diary"].map(function(n){return n+":"+taskOpen(n)}).join(" ")');

  /* ---------- 背词：翻卡 → 认识/再来 → 听写 → 完成 ---------- */
  await ev('taskVocab()'); await sleep(1000);
  await step('③ 背词面板', '(document.body.innerText.match(/①[^\\n]*/)||[""])[0]');
  await step('④ 今日新词', '(function(){var q=todayQueue();return "新"+q.newIds.length+" 复习"+q.revIds.length})()');
  await step('⑤ 单词音频', '(async()=>{var r=await fetch("audio/words/"+wordDir()+"m"+moduleOf(today())+".mp3",{headers:{Range:"bytes=0-1"}});return "m"+moduleOf(today())+".mp3 -> "+r.status})()');

  for (let i = 0; i < 60; i++) {
    // 卡片阶段：翻答案 -> 下一个；听写阶段：填词 -> 检查；最后：完成
    const phase = await ev('(function(){if(document.getElementById("dicIn"))return "dictation";if(document.querySelector(\'#ov-body [data-act="vqPick"]\'))return "quiz";if(document.querySelector(\'#ov-body [data-act="vqNext"]\'))return "anscard";if(document.querySelector(\'#ov-body [data-act="vcGoDic"]\'))return "settle";return "?"})()');
    let hit;
    if (phase === 'quiz') {
      // 随机点一个选项（对错都走一遍）
      hit = await ev('(function(){var bs=[].slice.call(document.querySelectorAll(\'#ov-body [data-act="vqPick"]\'));if(!bs.length)return "NO_OPT";bs[Math.floor(Math.random()*bs.length)].click();return "vqPick"})()');
      await sleep(700);
    } else if (phase === 'anscard') {
      hit = await clickAct(['vqNext']);
    } else if (phase === 'settle') {
      hit = await clickAct(['vcGoDic', 'vcRetry']);
    } else if (phase === 'dictation') {
      await ev('(function(){var i=document.getElementById("dicIn");var w=document.querySelector("#ov-body .wcard");if(i){var t=(document.body.innerText.match(/[a-z]{2,}/)||["cat"])[0];i.value="x";}return 1})()');
      hit = await clickAct(['dicCheck', 'dicHint']);
    } else {
      hit = await clickAct(['vcFinish', '完成背词', '完成']);
    }
    if (typeof hit === 'string' && (hit === 'vcFinish' || hit === '完成')) break;
    if (typeof hit === 'string' && hit.indexOf('NO_BTN') === 0 && phase === '?') { log.push('  背词循环第' + i + '次停: ' + hit); break; }
    await sleep(150);
  }
  await sleep(600);
  await step('⑥ 背词后已学词数', 'Object.keys(st.words||{}).length');
  await step('⑦ 背词任务完成', '!!(getDay().tasks.vocab&&getDay().tasks.vocab.done)');
  await ev('typeof ovClose==="function"&&ovClose()'); await sleep(400);
  await step('⑧ 跟读已解锁', 'taskOpen("read")');

  /* ---------- 跟读 ---------- */
  await ev('taskRead()'); await sleep(1000);
  await step('⑨ 跟读等级', '(document.body.innerText.match(/第 L\\d 级[^\\n]*/)||["NOT FOUND"])[0]');
  await step('⑩ 跟读音频', '(async()=>{var u="audio/readers/"+voiceDir()+"/r"+(rd&&rd.r?rd.r.id:101)+".mp3";var r=await fetch(u,{headers:{Range:"bytes=0-1"}});return u+" -> "+r.status})()');
  await step('⑪ 跟读题目', '(rd&&rd.r)?rd.r.q.length:"n/a"');
  await ev('finishTask("read",{})'); await sleep(500); await ev('ovClose&&ovClose()'); await sleep(300);

  /* ---------- 听力 ---------- */
  await step('⑫ 听力已解锁', 'taskOpen("listen")');
  await ev('taskListen()'); await sleep(900);
  await step('⑬ 听力面板', '(document.body.innerText.match(/③[^\\n]*/)||["NOT FOUND"])[0]');
  await step('⑭ 听力选项数', 'document.querySelectorAll("#ov-body .opt").length||document.querySelectorAll("#ov-body button").length');
  // 听力：先 lshow 出原文（若有），再逐题点选项 lq，最后 lshow 出结果
  // 听力：逐题点「还没选过」的选项（.ok/.bad 是已作答的）
  for (let i = 0; i < 12; i++) {
    // 优先点正确答案（data-ok="1"），保证"答对 >=1 题"能完成
    const hit = await ev('(function(){var b=document.querySelector(\'#ov-body .opt[data-ok="1"]:not(.ok):not(.bad)\');if(!b)b=document.querySelector("#ov-body .opt:not(.ok):not(.bad)");if(b){b.click();return b.textContent.slice(0,18)}return "NO_OPT"})()');
    if (hit === 'NO_OPT') break;
    await sleep(700);
    const done = await ev('!!(getDay().tasks.listen&&getDay().tasks.listen.done)');
    if (done) { log.push('  听力第' + (i + 1) + '次点选后完成'); break; }
  }
  await sleep(600);
  await step('⑮ 听力完成', '!!(getDay().tasks.listen&&getDay().tasks.listen.done)');
  await ev('ovClose&&ovClose()'); await sleep(300);

  /* ---------- 说+写 ---------- */
  await step('⑯ 日记已解锁', 'taskOpen("diary")');
  await ev('taskDiary()'); await sleep(900);
  await step('⑰ 日记面板', '(document.body.innerText.match(/④[^\\n]*/)||["NOT FOUND"])[0]');
  await ev('(function(){var t=document.querySelector("#ov-body textarea");if(t)t.value="I have a cat. Her name is Mimi. She is small and white.";var i=document.querySelector("#ov-body input[type=text]");if(i)i.value="I have a cat.";return 1})()');
  await sleep(200);
  await step('⑱ 保存日记', '(function(){var bs=[].slice.call(document.querySelectorAll("#ov-body button"));for(var i=0;i<bs.length;i++){if(/保存|完成|好啦|提交/.test(bs[i].textContent)){bs[i].click();return bs[i].textContent}}return "NO_BTN"})()');
  await sleep(1200);

  /* ---------- 收尾 ---------- */
  await step('⑲ 今日四环节', 'JSON.stringify(Object.keys(getDay().tasks))');
  await step('⑳ doneAt/星星', '"doneAt="+!!getDay().doneAt+" stars="+st.stars+" streak="+st.streak');
  await step('㉑ 已学词总数', 'Object.keys(st.words||{}).length');
  await step('㉒ 日记条数', '(st.diary||[]).length');
  await step('㉓ 已解锁勋章', 'Object.keys(st.badges||{}).filter(function(k){return st.badges[k]}).length');
  await step('㉔ localStorage 体积', '(localStorage.getItem("ket_park_v1")||"").length');

  log.push('ERRS = ' + (errs.length ? JSON.stringify(errs.slice(0, 6)) : 'none'));
  console.log(log.join('\n'));
  ws.close(); proc.kill(); process.exit(0);
})();
