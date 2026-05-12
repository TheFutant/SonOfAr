#!/usr/bin/env python3
"""Regenerate PWA icon variants from the masters in assets/icons/.

Sources (committed):
  assets/icons/source-any.png       — 1024x1024, tight face crop
  assets/icons/source-maskable.png  — 1024x1024, face shrunk to 80% safe zone on solid bg

Outputs (committed, served from public/):
  public/icons/icon-192.png
  public/icons/icon-512.png
  public/icons/icon-maskable-192.png
  public/icons/icon-maskable-512.png
  public/icons/apple-touch-icon.png   (180x180, non-maskable)
  public/icons/favicon-32.png

Run from repo root: python3 scripts/build-pwa-icons.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_ANY = ROOT / "assets/icons/source-any.png"
SRC_MASK = ROOT / "assets/icons/source-maskable.png"
OUT_DIR = ROOT / "public/icons"

TARGETS = [
    ("icon-192.png", 192, "any"),
    ("icon-512.png", 512, "any"),
    ("icon-maskable-192.png", 192, "maskable"),
    ("icon-maskable-512.png", 512, "maskable"),
    ("apple-touch-icon.png", 180, "any"),
    ("favicon-32.png", 32, "any"),
]

def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    any_src = Image.open(SRC_ANY).convert("RGB")
    mask_src = Image.open(SRC_MASK).convert("RGB")
    for name, size, kind in TARGETS:
        base = mask_src if kind == "maskable" else any_src
        out = base.resize((size, size), Image.LANCZOS)
        out.save(OUT_DIR / name, optimize=True)
        print(f"  {name:30s} {size}x{size}")

if __name__ == "__main__":
    main()
