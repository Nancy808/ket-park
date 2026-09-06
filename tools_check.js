const fs=require('fs'),vm=require('vm'),path=require('path'),os=require('os');
const dir=__dirname;
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const blocks=html.match(/<script>([\s\S]*?)<\/script>/g)||[];
console.log('inline script blocks:',blocks.length);
const last=blocks[blocks.length-1].replace(/^<script>/,'').replace(/<\/script>$/,'');
try{new vm.Script(last,{filename:'app.js'});console.log('index.html inline JS: OK');}
catch(e){console.log('index.html ERROR:',e.message);}
['data/words.js','data/readers.js','sw.js','manifest.json'].forEach(f=>{
  const src=fs.readFileSync(path.join(dir,f),'utf8');
  try{ if(f.endsWith('.json')){JSON.parse(src);console.log(f,'JSON OK');}
       else{new vm.Script(src,{filename:f});console.log(f,'JS OK');} }
  catch(e){console.log(f,'ERROR:',e.message);}
});
const sandbox={window:{}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(dir,'data/words.js'),'utf8'),sandbox);
vm.runInContext(fs.readFileSync(path.join(dir,'data/readers.js'),'utf8'),sandbox);
const W=sandbox.window.WORDS,R=sandbox.window.READERS;
let tot=0;const counts={};
Object.keys(W).sort((a,b)=>a-b).forEach(k=>{counts[k]=W[k].length;tot+=W[k].length;});
console.log('months:',Object.keys(W).length,'total words:',tot);
console.log('per month:',JSON.stringify(counts));
const dup={},seen={};
Object.keys(W).forEach(k=>W[k].forEach(w=>{const key=w.w.toLowerCase();
  if(seen[key]){(dup[key]=dup[key]||[]).push(k);}seen[key]=1;}));
console.log('duplicate words across months:',Object.keys(dup).length,Object.keys(dup).slice(0,10));
console.log('readers:',R.length,'| L1:',R.filter(r=>r.lv===1).length,'L2:',R.filter(r=>r.lv===2).length,'L3:',R.filter(r=>r.lv===3).length);
const badQ=R.filter(r=>!r.q||r.q.length<3||r.q.some(q=>!q.o||q.o.length<3||typeof q.a!=='number'||q.a>=q.o.length));
console.log('readers with bad questions:',badQ.length);
const noCn=[];Object.keys(W).forEach(k=>W[k].forEach(w=>{if(!w.cn||!w.p)noCn.push(k+':'+w.w);}));
console.log('missing cn/pos:',noCn.length);
