# -*- coding: utf-8 -*-
"""
单词音频生成器 —— 按月分卷
1200 个单词逐月合并成 18 个 MP3（每月约 270KB）+ 一份时间索引 JSON，
避免生成上千个小文件。播放时按时间轴 seek。

用法：D://codeX 安装文件\python.exe tools_tts_words.py [月份，如 3；不传则全部] [音色，如 maisie]
     不传音色 = ana（写入 audio/words/ 根）；传 maisie = 写入 audio/words/maisie/
"""
import asyncio, os, re, sys, json, subprocess, tempfile

BASE = os.path.dirname(os.path.abspath(__file__))
VOICE_MAP = {'ana': 'en-US-AnaNeural', 'maisie': 'en-GB-MaisieNeural', 'libby': 'en-GB-LibbyNeural'}
# ana 放在 audio/words/ 根目录（保持兼容），其它音色放 audio/words/<voice>/
VOICE = (sys.argv[2] if len(sys.argv) > 2 else 'ana').lower()
OUT = os.path.join(BASE, 'audio', 'words') if VOICE == 'ana' else os.path.join(BASE, 'audio', 'words', VOICE)
FFMPEG = r"D:\codeX 安装文件\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg.exe"
NODE = r"C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-2\node.exe"
VOICE_NAME, RATE, PITCH = VOICE_MAP.get(VOICE, 'en-US-AnaNeural'), '+0%', '+0Hz'
GAP_MS = 260          # 词与词之间静音间隔（毫秒）
TAIL_MS = 120
CONC = 6

os.makedirs(OUT, exist_ok=True)


def load_words():
    code = ('const fs=require("fs"),vm=require("vm");const s={window:{}};'
            'vm.createContext(s);'
            'vm.runInContext(fs.readFileSync(process.argv[1],"utf8"),s);'
            'process.stdout.write(JSON.stringify(s.window.WORDS));')
    r = subprocess.run([NODE, '-e', code, os.path.join(BASE, 'data', 'words.js')],
                       capture_output=True)
    return json.loads(r.stdout.decode('utf-8'))


async def synth(word, path, voice=None):
    for attempt in range(3):
        try:
            import edge_tts
            comm = edge_tts.Communicate(word, voice or VOICE_NAME, rate=RATE, pitch=PITCH)
            with open(path, 'wb') as f:
                async for chunk in comm.stream():
                    if chunk['type'] == 'audio':
                        f.write(chunk['data'])
            if os.path.getsize(path) > 400:
                return True
        except Exception:
            pass
        await asyncio.sleep(0.5 * (attempt + 1))
    return False


def probe(path):
    """返回时长（秒）"""
    try:
        r = subprocess.run([FFMPEG, '-i', path, '-f', 'null', '-'],
                           capture_output=True, text=True, encoding='utf-8', errors='ignore')
        m = re.findall(r'time=(\d+):(\d+):([\d.]+)', r.stderr)
        if m:
            h, mi, s = m[-1]
            return int(h) * 3600 + int(mi) * 60 + float(s)
    except Exception:
        pass
    return 0.8


def silence(path, ms):
    subprocess.run([FFMPEG, '-y', '-f', 'lavfi', '-i',
                    'anullsrc=r=24000:cl=mono', '-t', f'{ms/1000:.3f}',
                    '-ac', '1', '-ar', '24000', '-b:a', '40k',
                    '-loglevel', 'error', path], capture_output=True)


async def build_month(month, words, tmpdir):
    out_mp3 = os.path.join(OUT, f'm{month}.mp3')
    idx = {}
    if os.path.exists(out_mp3) and os.path.exists(os.path.join(OUT, 'index.json')):
        pass
    sem = asyncio.Semaphore(CONC)

    async def job(i, w):
        async with sem:
            p = os.path.join(tmpdir, f'w{i:04d}.mp3')
            return await synth(w['w'], p, VOICE_NAME)

    res = await asyncio.gather(*[job(i, w) for i, w in enumerate(words)])
    # 顺序拼接
    cur = 0.0
    parts = []
    for i, w in enumerate(words):
        p = os.path.join(tmpdir, f'w{i:04d}.mp3')
        if not os.path.exists(p) or os.path.getsize(p) < 400:
            continue
        d = probe(p)
        idx[w['w'].lower()] = [round(cur, 3), round(d, 3)]
        parts.append(p)
        cur += d + GAP_MS / 1000
        gp = os.path.join(tmpdir, f'g{i:04d}.mp3')
        if not os.path.exists(gp):
            silence(gp, GAP_MS)
        parts.append(gp)
    if not parts:
        return 0, {}
    lst = os.path.join(tmpdir, f'list{month}.txt')
    with open(lst, 'w', encoding='utf-8') as f:
        for p in parts:
            f.write(f"file '{p}'\n")
    subprocess.run([FFMPEG, '-y', '-f', 'concat', '-safe', '0', '-i', lst,
                    '-ac', '1', '-ar', '24000', '-b:a', '40k',
                    '-loglevel', 'error', out_mp3], capture_output=True)
    size = os.path.getsize(out_mp3) if os.path.exists(out_mp3) else 0
    print(f'  M{month}: {len(idx)} 词 -> {size/1024:.0f} KB', flush=True)
    return size, idx


async def main():
    words = load_words()
    only = sys.argv[1] if len(sys.argv) > 1 else None
    index_path = os.path.join(OUT, 'index.json')
    index = {}
    if os.path.exists(index_path):
        try:
            index = json.load(open(index_path, encoding='utf-8'))
        except Exception:
            index = {}
    tmpdir = tempfile.mkdtemp(prefix='kettts_')
    for mk in sorted(words.keys(), key=lambda x: int(x)):
        if only and str(mk) != only:
            continue
        ws = words[mk]
        print(f'M{mk} 开始（{len(ws)} 词）', flush=True)
        _, idx = await build_month(mk, ws, tmpdir)
        index[str(mk)] = idx
        json.dump(index, open(index_path, 'w', encoding='utf-8'),
                  ensure_ascii=False, separators=(',', ':'))
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f'完成：音色 {VOICE}（{VOICE_NAME}）{total/1048576:.2f} MB，索引 {sum(len(v) for v in index.values())} 词')


if __name__ == '__main__':
    asyncio.run(main())
