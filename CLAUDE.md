# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page landing for **Интербригады** (Interbrigady) — a Russian volunteer movement website. No build tools, no framework, no package manager. Pure HTML + CSS + vanilla JS.

## Running / Previewing

Open `index.html` directly in a browser — no server or build step needed. For live reload during development, use VS Code Live Server extension or any static file server:

```powershell
# Quick static server via Python (if available)
python -m http.server 8080
```

## Deploying

```powershell
.\deploy.ps1
```

The script creates/updates the GitHub repo `JollyJ83/interbrigady` and pushes. Cloudflare Pages picks up the push automatically. **The GitHub PAT in the script may be expired — update `$TOKEN` in `deploy.ps1` before running.**

Note: `deploy.ps1` is listed in `.gitignore` and is not committed to the repo.

## Architecture

### Single-page Structure

`index.html` is one long page with 12 anchor-linked sections navigated via a sticky navbar:

| Anchor | Section |
|--------|---------|
| `#about` | 01 — О нас (about) |
| `#history` | 02 — История (timeline) |
| `#limonov` | 03 — Лимонов (portrait + text) |
| `#directions` | 04 — Направления (direction cards) |
| `#stats` | 05 — Статистика (animated counters) |
| `#school` | 06 — Школа |
| `#awards` | 07 — Грамоты |
| `#faces` | 08 — Наши лица |
| `#memory` | 09 — Память |
| `#partners` | 10 — Партнёры |
| `#help` | 11 — Помочь (donation details + copy buttons) |
| `#resources` | 12 — Ресурсы |

### CSS (`style.css`)

- BEM-inspired class naming: `.section__header`, `.dir-card__title`, `.hero__content`
- CSS custom properties on `:root` for theming — key ones: `--color-gold`, `--color-dark`, `--color-bg`, `--container-width`
- Alternating section backgrounds via `.section--dark` modifier
- `.reveal` class + `.visible` added by JS drives scroll-in animations
- Responsive: mobile burger menu, fluid grid layouts

### JS (`script.js`)

Four self-contained IIFE modules — no imports, no bundler:

1. **Navbar** — `.scrolled` class on scroll > 40px; burger toggle with `aria-expanded`
2. **Reveal on scroll** — `IntersectionObserver` adds `.visible` to `.reveal` elements with cascading 60ms delay
3. **Stat counters** — `IntersectionObserver` triggers `easeOutExpo` animation on `.stat-card__num[data-target]`
4. **Copy buttons** — `.copy-btn[data-copy="<id>"]` copies text of `#<id>` to clipboard, with `execCommand` fallback

### Images

| File | Used in |
|------|---------|
| `emblem.jpg` | Navbar logo + hero background watermark |
| `Limonov4-1200x800.png` | Section 03 portrait (prefer `.png` over `.jpg` version) |
| `multicam-camouflage.jpg` | CSS background (hero or section) |
| `photo_2026-05-26_11-53-00.jpg` | Faces section |

### Content Security Policy

Set via `<meta http-equiv="Content-Security-Policy">` in `<head>`. Allowed external origins: Google Fonts, Telegram (`t.me`, `telegram.org`), Wikipedia images. Any new external resource must be added here.
