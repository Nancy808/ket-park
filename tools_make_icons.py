from PIL import Image, ImageDraw
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(OUT, exist_ok=True)

PEACH = (255, 138, 101)
PEACH_D = (232, 106, 51)
CREAM = (255, 253, 247)
BODY = (240, 207, 164)
DARK = (138, 90, 59)
EYE = (58, 42, 32)
BLUSH = (247, 168, 160)

def hamster(d, cx, cy, r):
    # ears
    er = r * 0.30
    for sx in (-1, 1):
        d.ellipse([cx + sx * r * 0.72 - er, cy - r * 0.72 - er,
                   cx + sx * r * 0.72 + er, cy - r * 0.72 + er],
                  fill=BODY, outline=DARK, width=max(2, int(r * 0.055)))
    # head
    d.ellipse([cx - r, cy - r * 0.95, cx + r, cy + r * 0.98],
              fill=BODY, outline=DARK, width=max(3, int(r * 0.065)))
    # eyes
    er2 = r * 0.11
    for sx in (-1, 1):
        ex, ey = cx + sx * r * 0.36, cy - r * 0.10
        d.ellipse([ex - er2, ey - er2 * 1.3, ex + er2, ey + er2 * 1.3], fill=EYE)
        d.ellipse([ex - er2 * 0.35 + er2 * 0.35, ey - er2 * 1.3 + er2 * 0.35,
                   ex + er2 * 0.35, ey - er2 * 1.3 + er2 * 0.95], fill=(255, 255, 255))
    # blush
    br = r * 0.17
    for sx in (-1, 1):
        d.ellipse([cx + sx * r * 0.66 - br, cy + r * 0.22 - br * 0.6,
                   cx + sx * r * 0.66 + br, cy + r * 0.22 + br * 0.6], fill=BLUSH)
    # nose + mouth
    nr = r * 0.075
    d.ellipse([cx - nr * 1.3, cy + r * 0.22 - nr, cx + nr * 1.3, cy + r * 0.22 + nr], fill=(90, 58, 40))
    d.arc([cx - r * 0.22, cy + r * 0.30, cx + r * 0.22, cy + r * 0.66],
          start=20, end=160, fill=DARK, width=max(2, int(r * 0.055)))

def make(size, maskable=False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        # full bleed + safe zone (inner 80%)
        d.rectangle([0, 0, size, size], fill=PEACH)
        inner = int(size * 0.62)
        off = (size - inner) // 2
        d.ellipse([off, off, off + inner, off + inner], fill=CREAM)
        d.ellipse([off, off, off + inner, off + inner], outline=PEACH_D, width=max(3, int(size * 0.018)))
        hamster(d, size // 2, size // 2 + int(size * 0.01), int(inner * 0.36))
    else:
        pad = int(size * 0.04)
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.22), fill=PEACH)
        inner = int(size * 0.62)
        off = (size - inner) // 2
        d.ellipse([off, off, off + inner, off + inner], fill=CREAM)
        d.ellipse([off, off, off + inner, off + inner], outline=PEACH_D, width=max(2, int(size * 0.014)))
        hamster(d, size // 2, size // 2 + int(size * 0.01), int(inner * 0.36))
    return img

for s in (192, 512):
    make(s).save(os.path.join(OUT, f'icon-{s}.png'))
make(512, maskable=True).save(os.path.join(OUT, 'icon-maskable-512.png'))
print('icons ok:', os.listdir(OUT))
