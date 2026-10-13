# -*- coding: utf-8 -*-
"""
单词音频生成器（gTTS 英音标准女声版）—— 按月分卷
用途：edge-tts 的 wss 接口 403 失效后的替代通道。音色 = Google TTS 英音（tld=co.uk），
      成年女声、发音标准清晰，适合背单词（不像 Maisie 是童声）。
输出：audio/words/gb/m1.mp3 ... m18.mp3 + index.json（结构与 ana/maisie 完全一致，
      index.html 的切片播放逻辑不用改，只要 wordDir() 认这个目录）。

用法：python tools_tts_words_gtts.py [月份，如 3；不传则全部]
"""
import asyncio, os, re, sys, json, subprocess, tempfile
from concurrent.futures import ThreadPoolExecutor

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, 'audio', 'words', 'gb')
FFMPEG = r"D:\codeX\软件与缓存\安装文件\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg.exe"
NODE = r"C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-2\node.exe"
TLD = 'co.uk'          # 英音
GAP_MS = 260           # 词间静音，和 edge-tts 版保持一致
CONC = 5               # gTTS 并发太高容易 429

os.makedirs(OUT, exist_ok=True)


def load_words():
    code = ('const fs=require("fs"),vm=require("vm");const s={window:{}};'
            'vm.createContext(s);'
            'vm.runInContext(fs.readFileSync(process.argv[1],"utf8"),s);'
            'process.stdout.write(JSON.stringify(s.window.WORDS));')
    r = subprocess.run([NODE, '-e', code, os.path.join(BASE, 'data', 'words.js')],
                       capture_output=True)
    return json.loads(r.stdout.decode('utf-8'))


def synth(word, path):
    """gTTS 同步调用，重试 3 次"""
    from gtts import gTTS
    for attempt in range(3):
        try:
            gTTS(text=word, lang='en', tld=TLD).save(path)
            if os.path.exists(path) and os.path.getsize(path) > 400:
                return True
        except Exception:
            pass
        import time
        time.sleep(1.0 * (attempt + 1))
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
    return 0.0


def silence(path, ms):
    subprocess.run([FFMPEG, '-y', '-f', 'lavfi', '-i',
                    'anullsrc=r=24000:cl=mono', '-t', f'{ms/1000:.3f}',
                    '-ac', '1', '-ar', '24000', '-b:a', '40k',
                    '-loglevel', 'error', path], capture_output=True)


def build_month(month, words, tmpdir):
    out_mp3 = os.path.join(OUT, f'm{month}.mp3')
    idx = {}
    sem = asyncio.Semaphore(CONC)
    pool = ThreadPoolExecutor(max_workers=CONC)

    async def run_all():
        loop = asyncio.get_running_loop()

        async def job(i, w):
            async with sem:
                p = os.path.join(tmpdir, f'w{i:04d}.mp3')
                return await loop.run_in_executor(pool, synth, w['w'], p)

        await asyncio.gather(*[job(i, w) for i, w in enumerate(words)])

    asyncio.run(run_all())
    pool.shutdown(wait=True)

    # 顺序拼接
    cur = 0.0
    parts = []
    for i, w in enumerate(words):
        p = os.path.join(tmpdir, f'w{i:04d}.mp3')
        if not os.path.exists(p) or os.path.getsize(p) < 400:
            continue
        d = probe(p)
        if d <= 0:
            continue
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


def main():
    words = load_words()
    only = sys.argv[1] if len(sys.argv) > 1 else None
    index_path = os.path.join(OUT, 'index.json')
    index = {}
    if os.path.exists(index_path):
        try:
            index = json.load(open(index_path, encoding='utf-8'))
        except Exception:
            index = {}
    tmpdir = tempfile.mkdtemp(prefix='ketgb_')
    for mk in sorted(words.keys(), key=lambda x: int(x)):
        if only and str(mk) != only:
            continue
        ws = words[mk]
        print(f'M{mk} 开始（{len(ws)} 词）', flush=True)
        _, idx = build_month(mk, ws, tmpdir)
        index[str(mk)] = idx
        json.dump(index, open(index_path, 'w', encoding='utf-8'),
                  ensure_ascii=False, separators=(',', ':'))
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f'完成：gTTS 英音（{TLD}）{total/1048576:.2f} MB，索引 {sum(len(v) for v in index.values())} 词', flush=True)


if __name__ == '__main__':
    main()
