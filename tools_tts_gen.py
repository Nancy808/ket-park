# -*- coding: utf-8 -*-
"""
英语萌宠乐园 · 音频预录生成器
用 edge-tts 微软神经网络音色批量生成单词 / 读物音频，再用 ffmpeg 压缩。
音色：
  ana   = en-US-AnaNeural   （卡通·可爱，主讲音色）
  libby = en-GB-LibbyNeural （英音·友好，KET 听力口音）
用法（必须用装了 edge_tts 的那个 Python，见下行 PY 常量）：
  D:\\codeX 安装文件\\python.exe tools_tts_gen.py easy            # 入门读物 L1-L3，ana+libby
  D:\\codeX 安装文件\\python.exe tools_tts_gen.py readers ana       # 经典读物，美音
  D:\\codeX 安装文件\\python.exe tools_tts_gen.py readers libby     # 经典读物，英音
  D:\\codeX 安装文件\\python.exe tools_tts_gen.py all
注意：WorkBuddy 自带的 python（~/.workbuddy/binaries/python/...）里没有 edge_tts，
      用它跑会静默失败（生成 0 字节）。必须用 D:\\codeX 安装文件\\python.exe
"""
import asyncio, os, re, sys, json, subprocess, shutil

BASE = os.path.dirname(os.path.abspath(__file__))
TMP = os.path.join(BASE, '_tts_tmp')
OUT = os.path.join(BASE, 'audio')
FFMPEG = r"D:\codeX 安装文件\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg.exe"
CONC = 8

VOICES = {
    'ana':   ('en-US-AnaNeural',    '+0%',  '+0Hz'),   # 美音童声（微软唯一标注 Cute）
    'libby': ('en-GB-LibbyNeural',  '+0%',  '+0Hz'),   # 英音成人，贴近 KET 听力
    'maisie':('en-GB-MaisieNeural', '+0%',  '+0Hz'),   # 英音小女孩，最接近动画童声
}

os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT, exist_ok=True)


def slug(s):
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "_", s).strip('_')
    return s or 'x'


def compress(src, dst):
    """转单声道低码率 MP3，体积降到约 1/10"""
    try:
        subprocess.run([FFMPEG, '-y', '-i', src, '-ac', '1', '-ar', '24000',
                        '-b:a', '40k', '-loglevel', 'error', dst],
                       check=True, capture_output=True)
        return os.path.getsize(dst) if os.path.exists(dst) else 0
    except Exception as e:
        print('compress fail', src, e)
        return 0


NODE = r"C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-2\node.exe"


def load_js(path, var):
    """用 node 执行 js 并把数据以 JSON 输出（js 里是单引号字面量，不能用 json.loads）"""
    code = ('const fs=require("fs"),vm=require("vm");'
            'const s={window:{}};vm.createContext(s);'
            'vm.runInContext(fs.readFileSync(process.argv[1],"utf8"),s);'
            f'process.stdout.write(JSON.stringify(s.window.{var}));')
    r = subprocess.run([NODE, '-e', code, path], capture_output=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.decode('utf-8', 'ignore'))
    return json.loads(r.stdout.decode('utf-8'))


async def one(voice, rate, pitch, text, out_rel):
    """生成一个音频（直接用 edge_tts Python API，不起子进程）"""
    rel = out_rel.replace('\\', '/')
    dst = os.path.join(OUT, rel + '.mp3')
    if os.path.exists(dst) and os.path.getsize(dst) > 300:
        return os.path.getsize(dst)
    tmp = os.path.join(TMP, slug(rel) + '.raw.mp3')
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    ok = False
    for attempt in range(3):
        try:
            import edge_tts
            comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
            with open(tmp, 'wb') as f:
                async for chunk in comm.stream():
                    if chunk['type'] == 'audio':
                        f.write(chunk['data'])
            if os.path.getsize(tmp) > 500:
                ok = True
                break
        except Exception:
            pass
        await asyncio.sleep(0.5 * (attempt + 1))
    if not ok:
        return 0
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    size = compress(tmp, dst)
    # 不删临时文件：逐个 os.remove 会触发沙箱的批量删除保护，原始文件留在 _tts_tmp 即可
    return size


async def run(tasks, label):
    sem = asyncio.Semaphore(CONC)
    done = 0
    total = len(tasks)
    total_bytes = 0

    async def wrap(t):
        nonlocal done, total_bytes
        async with sem:
            n = await one(*t)
        done += 1
        total_bytes += n
        if done % 25 == 0 or done == total:
            print(f'  {label}: {done}/{total}  累计 {total_bytes/1048576:.1f} MB', flush=True)
        return n

    await asyncio.gather(*[wrap(t) for t in tasks])
    fails = [t[4] for t, r in zip(tasks, []) if not r]
    print(f'{label} 完成：{total} 个，{total_bytes/1048576:.2f} MB')
    return total_bytes


async def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'all'
    vkey = sys.argv[2] if len(sys.argv) > 2 else 'ana'
    voice, rate, pitch = VOICES[vkey]

    words = load_js(os.path.join(BASE, 'data', 'words.js'), 'WORDS')
    readers = load_js(os.path.join(BASE, 'data', 'readers.js'), 'READERS')

    if mode in ('words', 'all'):
        tasks = []
        for mk, ws in words.items():
            for w in ws:
                tasks.append((voice, rate, pitch, w['w'], f'words/{slug(w["w"])}'))
        print(f'单词 {len(tasks)} 个，音色 {voice}')
        await run(tasks, '单词')

    if mode in ('readers', 'all'):
        tasks = []
        for r in readers:
            txt = r['text'].replace('\\n', ' ').replace('\n', ' ')
            tasks.append((voice, rate, pitch, txt, f'readers/{vkey}/r{r["id"]}'))
        print(f'读物 {len(tasks)} 篇，音色 {voice}')
        await run(tasks, f'读物-{vkey}')

    if mode in ('easy',):
        """入门读物 L1-L3（data/readers_easy.js），ana + libby + maisie 各生成一遍"""
        easy = load_js(os.path.join(BASE, 'data', 'readers_easy.js'), 'READERS_EASY')
        for vk in ('ana', 'libby', 'maisie'):
            v, rt, pc = VOICES[vk]
            tasks = [(v, rt, pc,
                      r['text'].replace('\\n', ' ').replace('\n', ' '),
                      f'readers/{vk}/r{r["id"]}') for r in easy]
            print(f'入门读物 L1-L3 共 {len(tasks)} 篇，音色 {v}')
            await run(tasks, f'入门-{vk}')


if __name__ == '__main__':
    asyncio.run(main())
