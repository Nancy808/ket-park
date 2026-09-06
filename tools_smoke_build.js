const fs = require('fs'), path = require('path');
const dir = __dirname;
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// 注意：exportAlbum() 内含 `</body>` / `<head>` 字符串，必须用唯一锚点 + lastIndexOf
const TITLE = '<title>英语萌宠乐园</title>';
if (html.indexOf(TITLE) < 0) throw new Error('未找到唯一锚点 <title>');
html = html.replace(TITLE, TITLE +
  '\n<script>window.__errs=[];window.onerror=function(m,s,l,c,e){window.__errs.push(m+" @"+l+":"+c);return false;};</script>');

const test = `
<script>
(function(){
 var out=[];
 function log(k,v){out.push(String(k)+' -> '+v);}
 function q(s){return document.querySelector(s);}
 function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
 function click(el){if(el)el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}
 function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
 function dump(){
   var pre=document.getElementById('SMOKEOUT')||document.createElement('pre');
   pre.id='SMOKEOUT';
   pre.textContent='SMOKERESULT\\n'+out.join('\\n')+'\\nERRORS: '+((window.__errs&&window.__errs.length)?window.__errs.join(' | '):'none');
   document.body.appendChild(pre);
 }
 (async function(){
  try{
   if(sessionStorage.getItem('smokePhase')==='2'){
     out=JSON.parse(sessionStorage.getItem('smokeOut1')||'[]');
     await sleep(500);
     var d0=st.day[today()]||{tasks:{}};
     log('19 刷新后恢复','name='+st.name+' / 今日完成 '+Object.keys(d0.tasks).length+'/4 / 星星='+st.stars+
        ' / 已学词='+Object.keys(st.words).length+' / 引导弹窗'+(document.getElementById('modal').className.indexOf('on')>=0?'仍在(异常)':'未出现(正确)'));
     log('20 今日页重建', qa('.tk').length+' 任务 / 完成 '+qa('.tk.done').length+' / 锁定 '+qa('.tk.lock').length);
     log('21 存储占用', Math.round(localStorage.getItem('ket_park_v1').length/1024)+'KB');
     dump(); return;
   }
   log('1 首启弹窗', q('#mbox h3').textContent.trim());
   document.getElementById('nmIn').value='二姐';
   click(q('[data-act="frSave"]')); await sleep(150);

   log('2 今日页', qa('.tk').length+' 个任务 / 锁定 '+qa('.tk.lock').length+' 个 / '+q('#subTitle').textContent);

   /* ---- ① 背词 ---- */
   click(q('.tk.now')); await sleep(200);
   log('3 背词卡', q('.wcard .w').textContent+'  '+q('.wcard .ipa').textContent+' · 队列 '+vc.ids.length+' 词');
   click(q('[data-act="vcAns"][data-v="1"]')); await sleep(150);
   log('4 翻面', q('.wcard .cn')?q('.wcard .cn').textContent+' | '+(q('.wcard .ex')?q('.wcard .ex').textContent.slice(0,26):'无例句'):'FAIL');
   var n=qa('[data-act="vcNext"]'); click(n[n.length-1]); await sleep(150);

   vc.dic={list:vc.ids.slice(0,3),i:0,ok:0}; vc.mode='dic'; dictCard(); await sleep(200);
   log('5 听写', q('#dicIn')?'已进入，词='+wById(vc.dic.list[0]).w:'FAIL');
   document.getElementById('dicIn').value='wrongword';
   click(q('[data-act="dicCheck"]')); await sleep(250);
   log('6 拼错反馈', q('#dicMsg').textContent.trim());
   await sleep(1900);
   log('6b 自动续下一词', q('#dicIn')?('索引 '+vc.dic.i+'/'+vc.dic.list.length):'FAIL');
   for(var k=vc.dic.i;k<vc.dic.list.length;k++){
     document.getElementById('dicIn').value=wById(vc.dic.list[k]).w;
     click(q('[data-act="dicCheck"]')); await sleep(300);
   }
   log('7 听写结算', q('[data-act="vcFinish"]')?q('.wcard').textContent.replace(/\\s+/g,' ').slice(0,30):'FAIL');
   click(q('[data-act="vcFinish"]')); await sleep(350);
   log('8 背词完成', qa('.tk.done').length+' 完成 / 下一个：'+(q('.tk.now .tx b')?q('.tk.now .tx b').textContent:'无'));

   /* ---- ② 跟读 ---- */
   click(q('.tk.now')); await sleep(300);
   log('9 跟读页', q('.paper h3')?('《'+q('.paper h3').textContent+'》 正文 '+q('.paper').textContent.length+' 字'):'FAIL');
   log('9a 录音环境', canRec()?'MediaRecorder 可用':'不可用（真机 HTTPS 下可用）');
   finishTask('read',{secs:35}); ovClose(); await sleep(300);
   log('9b 跟读完成', qa('.tk.done').length+' 完成 / 下一个：'+(q('.tk.now .tx b')?q('.tk.now .tx b').textContent:'无'));

   /* ---- ③ 听力 ---- */
   click(q('.tk.now')); await sleep(350);
   log('10 听力页', q('#ovTitle').textContent+' / 选项 '+qa('.opt').length+' 个');
   var r0=q('[data-act="lq"][data-q="0"][data-ok="1"]'); if(r0){click(r0);await sleep(400);}
   var r1=q('[data-act="lq"][data-q="1"][data-ok="1"]'); if(r1){click(r1);await sleep(1000);}
   log('10b 听力完成', qa('.tk.done').length+' 完成 / 下一个：'+(q('.tk.now .tx b')?q('.tk.now .tx b').textContent:'无'));

   /* ---- ④ 说 + 写 ---- */
   click(q('.tk.now')); await sleep(300);
   log('11 日记页', q('#ovTitle').textContent+' / 本周新词 '+qa('.pill.b').length+' 个');
   document.getElementById('dText').value='I like reading English stories with my brother.';
   click(q('[data-act="dSave"]')); await sleep(600);
   log('12 今日全完成', '完成 '+qa('.tk.done').length+'/4 · 星星='+st.stars+' · 连续='+st.streak+' · 日记='+st.diary.length+' 条 · 名言卡'+(q('.quote')?'有':'无'));

   /* ---- 各页 ---- */
   click(q('[data-nav="badges"]')); await sleep(250);
   log('13 勋章墙', qa('.bdg').length+' 枚 / 已解锁 '+qa('.bdg:not(.lk)').length+' / SVG '+qa('.bdg svg').length);
   click(q('[data-nav="progress"]')); await sleep(250);
   log('14 进度页', q('.card b').textContent+' / 日历 '+qa('.cal .c').length+' 格 / 已打卡 '+qa('.cal .c.d1,.cal .c.d2').length);
   click(q('[data-nav="me"]')); await sleep(250);
   log('15 我的页', qa('.sec-t').map(function(e){return e.textContent;}).join(' / '));

   /* ---- 家长端 ---- */
   click(q('[data-nav="parent"]')); await sleep(200);
   document.getElementById('pinIn').value='1234'; click(q('[data-act="pinGo"]')); await sleep(250);
   log('16 家长端', qa('.sec-t').map(function(e){return e.textContent;}).join(' / '));
   click(q('[data-act="addReward"]')); await sleep(200);
   document.getElementById('rName').value='一本绘本'; document.getElementById('rCost').value='30';
   click(q('[data-act="rSave"]')); await sleep(250);
   click(q('[data-act="album"]')); await sleep(250);
   document.getElementById('alNote').value='下个月我要把 Part 1 全做对！';
   click(q('[data-act="alSave"]')); await sleep(300);
   log('17 奖励+相册', st.rewards.length+' 项奖励 / 相册 M'+moduleOf(today())+' 寄语已存');

   var s=JSON.parse(localStorage.getItem('ket_park_v1'));
   log('18 落盘', 'name='+s.name+' stars='+s.stars+' streak='+s.streak+' 已学词='+Object.keys(s.words).length+' 日记='+s.diary.length+' 小测='+s.quiz.length+' 存储='+Math.round(localStorage.getItem('ket_park_v1').length/1024)+'KB');

   /* ---- 刷新后恢复 ---- */
   sessionStorage.setItem('smokeOut1',JSON.stringify(out));
   sessionStorage.setItem('smokePhase','2');
   location.reload();
  }catch(e){ out.push('EXCEPTION: '+e.message+' | '+String(e.stack||'').split('\\n')[1]); dump(); }
 })();
})();
</script>`;
const i = html.lastIndexOf('</body>');
html = html.slice(0, i) + test + '\n' + html.slice(i);
fs.writeFileSync(path.join(dir, 'tools_smoke_app.html'), html);
console.log('built');
