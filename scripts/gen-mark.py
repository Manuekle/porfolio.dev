# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11,<14", "fonttools[woff]>=4.56,<5"]
# ///
"""Portfolio mark: a Myriad Pro Semibold "M" monogram.
Writes public/new-icon.png (bone M on ink, source for every app icon) and
public/assets/mark.png (transparent M, used as a CSS mask).
Run: uv run scripts/gen-mark.py && node scripts/gen-icons.cjs
"""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
INK, BONE = "#1d1b19", "#faf9f6"
S = 1024

f = TTFont(ROOT / "public/fonts/myriad-pro/semibold.woff2"); f.flavor = None
buf = BytesIO(); f.save(buf)
font = ImageFont.truetype(BytesIO(buf.getvalue()), 640)

def glyph(color):
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(layer).text((S / 2, S / 2), "M", font=font, fill=color, anchor="mm")
    return layer

def centered(layer):
    box = layer.getbbox(); w, h = box[2] - box[0], box[3] - box[1]
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(layer.crop(box), ((S - w) // 2, (S - h) // 2))
    return out

icon = Image.new("RGBA", (S, S), INK)
icon.alpha_composite(centered(glyph(BONE)))
icon.convert("RGB").save(ROOT / "public/new-icon.png", optimize=True)

mark = glyph("#000000"); mark = mark.crop(mark.getbbox())
mark.save(ROOT / "public/assets/mark.png", optimize=True)
print("new-icon.png, mark.png", mark.size)
