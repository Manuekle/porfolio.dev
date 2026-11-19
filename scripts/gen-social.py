# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11,<14", "fonttools[woff]>=4.56,<5"]
# ///
"""Generate social artwork with the portfolio's bundled Myriad Pro and Myriad Pro Light fonts.
Run: uv run scripts/gen-social.py
"""
from io import BytesIO
from pathlib import Path
from shutil import copyfile
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOCIAL = PUBLIC / "social"
OUTPUT = ROOT / "output" / "linkedin"
SCALE = 2
PAPER = "#faf9f6"
INK = "#1d1b19"
MUTED = "#695d47"
SURFACE = "#f0e8e0"
LINE = "#ded3c6"
FONTS = {}
for weight in ("light", "regular", "semibold", "bold"):
    font = TTFont(PUBLIC / "fonts" / "myriad-pro" / f"{weight}.woff2")
    font.flavor = None
    data = BytesIO()
    font.save(data)
    FONTS[weight] = data.getvalue()


def face(size, weight="regular"):
    return ImageFont.truetype(BytesIO(FONTS[weight]), round(size * SCALE))


def canvas(width, height):
    image = Image.new("RGB", (width * SCALE, height * SCALE), PAPER)
    return image, ImageDraw.Draw(image)


def text(draw, xy, value, size, color=INK, max_width=None, weight="regular"):
    f = face(size, weight)
    if max_width:
        while draw.textlength(value, font=f) > max_width * SCALE:
            size -= 1
            f = face(size, weight)
    x, y = xy
    box = draw.textbbox((0, 0), value, font=f)
    draw.text((x * SCALE, y * SCALE - box[1]), value, font=f, fill=color)
    width = draw.textlength(value, font=f) / SCALE
    height = (box[3] - box[1]) / SCALE
    assert x >= 0 and y >= 0 and x + width <= draw._image.width / SCALE + 1
    assert y + height <= draw._image.height / SCALE + 1
    return width


def line(draw, xy, fill=LINE, width=1):
    draw.line(tuple(round(v * SCALE) for v in xy), fill=fill, width=width * SCALE)


def round_photo(image, position, size):
    photo = Image.open(PUBLIC / "assets" / "avatar.webp").convert("RGB")
    side = min(photo.size)
    left, top = (photo.width - side) // 2, (photo.height - side) // 2
    photo = photo.crop((left, top, left + side, top + side)).resize((size*SCALE, size*SCALE), Image.Resampling.LANCZOS)
    mask = Image.new("L", photo.size)
    ImageDraw.Draw(mask).rounded_rectangle((0,0,photo.width,photo.height), radius=40*SCALE, fill=255)
    image.paste(photo, tuple(v*SCALE for v in position), mask)


def mark(image, xy, size):
    source = Image.open(PUBLIC / "assets" / "mark.png").convert("RGBA")
    source.thumbnail((size*SCALE,size*SCALE),Image.Resampling.LANCZOS)
    image.paste(source, tuple(v*SCALE for v in xy), source)


def save(image, path, size):
    path.parent.mkdir(parents=True, exist_ok=True)
    image.resize(size, Image.Resampling.LANCZOS).save(path, optimize=True)
    print(f"{path.relative_to(ROOT)}: {size[0]} x {size[1]}, {path.stat().st_size:,} bytes")


def og(lang):
    image, draw = canvas(1200,630)
    # Business-card layout: name, role, one human line, portrait. No links, projects or rules.
    role = "Full-stack developer & AI specialist" if lang == "en" else "Desarrollador full-stack y especialista en IA"
    tagline = "I build thoughtful products people enjoy using." if lang == "en" else "Construyo productos cuidados que da gusto usar."
    text(draw,(80,206),"Manuel Erazo Medina",76,max_width=720)
    text(draw,(83,312),role,34,"#727272",max_width=700,weight="light")
    text(draw,(83,376),tagline,28,"#818181",max_width=700,weight="light")
    round_photo(image,(868,185),260)
    save(image,SOCIAL/f"portfolio-og-{lang}-2026-11.png",(1200,630))


def linkedin():
    image, draw = canvas(1584,396)
    # Flat bone-white field. Three centered lines; no texture, marks or rules.
    def centered(value, y, size, color, weight="regular"):
        width=draw.textlength(value,font=face(size,weight))/SCALE
        text(draw,((1584-width)/2,y),value,size,color,weight=weight)
    centered("Manuel Erazo Medina",104,72,INK)
    centered("Full-stack developer & AI specialist",194,40,"#727272","light")
    centered("Next.js   |   TypeScript   |   React   |   Node.js   |   AI Agents",278,26,"#818181","light")
    path=OUTPUT/"manuel-erazo-linkedin-banner.png"
    save(image,path,(1584,396))


if __name__ == "__main__":
    og("en")
    og("es")
    linkedin()
    copyfile(SOCIAL/"portfolio-og-en-2026-11.png",PUBLIC/"og-banner.png")
