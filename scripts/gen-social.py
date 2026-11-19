# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11,<14", "fonttools[woff]>=4.56,<5"]
# ///
"""Generate social artwork with the portfolio's exact bundled Natadecoco font.
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
PAPER = "#fff8f4"
INK = "#1d1b19"
MUTED = "#695d47"
SURFACE = "#f0e8e0"
LINE = "#ded3c6"
font = TTFont(PUBLIC / "fonts" / "Natadecoco-gothic.woff2")
font.flavor = None
font_data = BytesIO()
font.save(font_data)
FONT = font_data.getvalue()


def face(size):
    return ImageFont.truetype(BytesIO(FONT), round(size * SCALE))


def canvas(width, height):
    image = Image.new("RGB", (width * SCALE, height * SCALE), PAPER)
    return image, ImageDraw.Draw(image)


def text(draw, xy, value, size, color=INK, max_width=None):
    f = face(size)
    if max_width:
        while draw.textlength(value, font=f) > max_width * SCALE:
            size -= 1
            f = face(size)
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
    text(draw,(64,58),"manudev.vercel.app",26,MUTED)
    text(draw,(64,170),"Manuel Erazo",88,max_width=780)
    role = "Full stack developer" if lang == "en" else "Desarrollador full stack"
    tagline = "Thoughtful interfaces, SaaS products & AI." if lang == "en" else "Interfaces cuidadas, productos SaaS e IA."
    text(draw,(68,282),role,35,max_width=760)
    text(draw,(68,348),tagline,27,MUTED,max_width=740)
    round_photo(image,(900,156),232)
    line(draw,(68,450,1132,450))
    text(draw,(68,486),"Oruka / Ragis / GymRat+",28)
    text(draw,(68,554),"TypeScript / React / Next.js / Python / PostgreSQL / AWS",21,MUTED,max_width=1064)
    save(image,SOCIAL/f"portfolio-og-{lang}-2026-11.png",(1200,630))


def linkedin():
    image, draw = canvas(1584,396)
    # Lower-left intentionally stays clear of LinkedIn's overlapping avatar.
    mark(image,(102,78),142)
    text(draw,(394,72),"Manuel Erazo",76,max_width=1088)
    text(draw,(398,176),"Full stack developer",32)
    text(draw,(398,234),"SaaS, AI & RAG, and thoughtful interfaces.",26,MUTED,max_width=1086)
    line(draw,(398,298,1488,298))
    text(draw,(398,326),"Oruka / Ragis / GymRat+",23)
    domain="manudev.vercel.app"
    width=draw.textlength(domain,font=face(22))/SCALE
    text(draw,(1488-width,328),domain,22,MUTED)
    path=OUTPUT/"manuel-erazo-linkedin-banner.png"
    save(image,path,(1584,396))


if __name__ == "__main__":
    og("en")
    og("es")
    linkedin()
    copyfile(SOCIAL/"portfolio-og-en-2026-11.png",PUBLIC/"og-banner.png")
