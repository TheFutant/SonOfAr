#!/usr/bin/env python3
"""Regenerate prologue panel WebPs from the masters in assets/prologue/.

The prologue (src/data/prologue.ts) renders one image per beat. Masters are
1536x1024 (3:2) PNGs; we downscale to 1280px wide and encode to WebP so the
offline PWA precache stays small (see docs/prologue-art-briefs.md for the
budget). Mirrors scripts/build-pwa-icons.py.

Sources (committed; assets/ is .dockerignore'd so masters never bloat the image):
  assets/prologue/p1-ash.png ... p6-punctuate.png

Outputs (committed, served + precached from public/):
  public/prologue/p1-ash.webp ... p6-punctuate.webp

Run from repo root: python3 scripts/build-prologue-art.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "assets/prologue"
OUT_DIR = ROOT / "public/prologue"

# Panel slugs, in story order. Filenames match `art` paths in src/data/prologue.ts.
PANELS = ["p1-ash", "p2-you", "p3-note", "p4-smoke", "p5-name", "p6-punctuate"]

TARGET_WIDTH = 1280  # 3:2 -> 1280x853; plenty for a phone, easy on the precache
WEBP_QUALITY = 74    # noir/dark art compresses well; keeps each panel ~<100 KB


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total = 0
    for slug in PANELS:
        src = SRC_DIR / f"{slug}.png"
        img = Image.open(src).convert("RGB")
        w, h = img.size
        out = img.resize((TARGET_WIDTH, round(h * TARGET_WIDTH / w)), Image.LANCZOS)
        dst = OUT_DIR / f"{slug}.webp"
        out.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
        kb = dst.stat().st_size / 1024
        total += kb
        print(f"  {slug + '.webp':22s} {out.size[0]}x{out.size[1]}  {kb:6.1f} KB")
    print(f"  {'total':22s} {'':12s}{total:6.1f} KB")


if __name__ == "__main__":
    main()
