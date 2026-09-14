#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-banner.png"
ASSETS = ROOT / "public" / "assets"

W, H = 1200, 630
PAPER = (233, 231, 222, 255)
SHEET = (246, 244, 238, 255)
INK = (26, 25, 23, 255)
INK3 = (110, 106, 96, 255)
RULE = (26, 25, 23, 36)
GRID = (28, 31, 33, 18)


def rounded(im: Image.Image, radius: int) -> Image.Image:
    im = im.convert("RGBA")
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, im.size[0] - 1, im.size[1] - 1), radius=radius, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im, mask=mask)
    return out


def main() -> None:
    canvas = Image.new("RGBA", (W, H), PAPER)
    draw = ImageDraw.Draw(canvas)

    for x in range(0, W + 1, 48):
        draw.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H + 1, 48):
        draw.line([(0, y), (W, y)], fill=GRID, width=1)

    panel = Image.new("RGBA", (W - 80, H - 80), SHEET)
    canvas.alpha_composite(panel, (40, 40))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((40, 40, W - 41, H - 41), outline=(26, 25, 23, 40), width=1)

    mark = Image.open(ASSETS / "mark.png").convert("RGBA")
    mark.thumbnail((92, 86), Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark, (88, 86))

    serif = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 64)
    sans = ImageFont.truetype("/System/Library/Fonts/Supplemental/Times New Roman.ttf", 22)
    small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Times New Roman.ttf", 18)

    draw.text((88, 210), "Manuel Erazo", font=serif, fill=INK)
    draw.line((88, 300, 560, 300), fill=RULE, width=1)
    draw.text((88, 322), "Full-Stack & AI Developer", font=sans, fill=INK3)
    draw.text((88, 356), "Next.js  ·  TypeScript  ·  LLMs", font=small, fill=INK3)
    draw.text((88, 510), "manudev.vercel.app", font=small, fill=INK3)

    shots = [
        (ASSETS / "screenshots" / "gym01.png", (0.0, -8)),
        (ASSETS / "screenshots" / "senka01.png", (0.0, 0)),
        (ASSETS / "screenshots" / "agent01.png", (0.0, 8)),
    ]
    size = 196
    origins = [(760, 168), (852, 214), (944, 172)]
    rotations = [-9, 3, 8]

    for (src, _), origin, rot in zip(shots, origins, rotations):
        im = Image.open(src).convert("RGBA")
        im = im.resize((size, size), Image.Resampling.LANCZOS)
        im = rounded(im, 22)
        shadow = Image.new("RGBA", (size + 24, size + 24), (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rounded_rectangle((8, 10, size + 8, size + 12), radius=24, fill=(26, 25, 23, 40))
        shadow = shadow.filter(ImageFilter.GaussianBlur(8))
        card = Image.new("RGBA", (size + 24, size + 24), (0, 0, 0, 0))
        card.alpha_composite(shadow, (0, 0))
        card.alpha_composite(im, (4, 2))
        card = card.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True)
        canvas.alpha_composite(card, origin)

    canvas.convert("RGB").save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
