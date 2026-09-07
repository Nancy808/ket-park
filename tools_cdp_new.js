/* 新功能验收：①背词题型分布 ②跟读评分 ③回看模式
   用法：node tools_cdp_new.js [url] */
const http = require('http');
const { spawn } = require('child_process');
const os = require('os'); const path = require('path');
const URL_ = process.argv[2] || 'http://127.0.0.1:8899/index.html';
const PORT = 9335;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PROFILE = path.join(os.tmpdir(), 'ket_new_profile');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = u => new Promise((res, rej) => { http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej); });

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
  ws.onmessage = e => { const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails || {}; errs.push('EXC:' + (d.text || '')); }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errs.push('CON:' + JSON.stringify(m.params.args && m.params.args[0] ? m.params.args[0].value : '')); };
  await new Promise(r => ws.onopen = r);
  const send = (m, p) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Page.navigate', { url: URL_ }); await sleep(4000);
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : undefined; };
  await ev('localStorage.clear();location.reload()'); await sleep(3500);

  console.log('【一】背词题型分布（今日 5 个新词 × 40 次抽题）');
  console.log(await ev(`(function(){
    var q=todayQueue();var cnt={},i,k,id,w;
    for(k=0;k<40;k++){for(i=0;i<q.newIds.length;i++){
      id=q.newIds[i];w=wById(id);if(!w)continue;
      var t=makeQ(id,w).t;cnt[t]=(cnt[t]||0)+1;}}
    return JSON.stringify(cnt)})()`));
  console.log('  选项示例:', await ev(`(function(){var q=todayQueue();var out=[];
    for(var i=0;i<3;i++){var id=q.newIds[i],w=wById(id);if(!w)continue;var c=makeQ(id,w);
      out.push(w.w+' ['+c.t+'] '+c.opts.join('/')+' ans='+c.opts[c.ans]);}
    return out.join(' | ')})()`));
  console.log('  干扰项长度差 <=6:', await ev(`(function(){var q=todayQueue();var bad=0,n=0;
    for(var k=0;k<30;k++){var id=q.newIds[0],w=wById(id);var o=makeOpts(id,w,'cn');
      for(var i=1;i<o.length;i++){n++;if(Math.abs(o[i].length-w.w.length)>6)bad++;}}
    return (n-bad)+'/'+n})()`));

  console.log('\n【二】跟读评分函数（构造不同录音特征）');
  console.log('  完美:', JSON.stringify(await ev('scoreRead({dur:14,db:-20,voiced:0.8},31,1).score')));
  console.log('  小声:', JSON.stringify(await ev('scoreRead({dur:14,db:-45,voiced:0.8},31,1).score')));
  console.log('  只读一点:', JSON.stringify(await ev('scoreRead({dur:3,db:-20,voiced:0.8},31,1).score')));
  console.log('  空白多:', JSON.stringify(await ev('scoreRead({dur:14,db:-20,voiced:0.2},31,1).score')));
  console.log('  分析失败兜底:', JSON.stringify(await ev('scoreRead(null,31,1).score')));
  console.log('  档位文案:', await ev(`[95,88,75,65,55].map(function(s){var g=readGrade(s);return s+':'+g.e+g.t}).join(' ')`));

  console.log('\n【三】回看模式（先做完四环节，再点回去）');
  await ev(`(function(){var d=getDay();d.tasks={vocab:{done:true,at:Date.now()},read:{done:true,at:Date.now(),score:88,times:2,secs:15},listen:{done:true,at:Date.now()},diary:{done:true,at:Date.now()}};st.diary.push({d:today(),t:'I like my cat. It is very cute and funny.',rec:12});save();render();return 1})()`);
  await sleep(500);
  const rv = async (task) => { await ev(`(function(){var e=document.querySelector('[data-act="task"][data-t="${task}"]');if(e)e.click();return 1})()`); await sleep(900);
    return await ev(`(function(){var b=document.getElementById('ov-body');return (document.getElementById('ovTitle').textContent||'')+' :: '+(b?b.innerText:'').replace(/\\n+/g,' / ').slice(0,180)})()`); };
  console.log('  背词回看:', await rv('vocab'));
  console.log('  跟读回看:', await rv('read'));
  console.log('  听力回看:', await rv('listen'));
  console.log('  日记回看:', await rv('diary'));
  console.log('  回看不计分(背词前/后已学词数):', await ev('Object.keys(st.words||{}).length'));

  console.log('\nERRS = ' + (errs.length ? errs.join(' | ') : 'none'));
  proc.kill(); process.exit(0);
})();
