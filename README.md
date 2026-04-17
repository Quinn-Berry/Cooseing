# Cooseing — Official Website of Max Mancuso

The personal website of Max "Coose" Mancuso — HYROX PRO athlete, online coach, and faith-driven content creator based in Charleston, SC.

**Disciple First. Athlete Second.**

---

## Tech Stack

- **HTML5** — single-page structure
- **CSS3** — custom design system, mobile-first, no framework
- **Vanilla JavaScript** — IntersectionObserver reveals, counter animations, parallax, nav interactions
- **Google Fonts** — DM Serif Display + DM Sans

No build step. No dependencies. No framework bloat.

## Run Locally

Because it's a static site, you have two options:

**Option 1 — open directly:**
```bash
open index.html
```

**Option 2 — serve locally (recommended for fonts/CORS):**
```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```
Then visit `http://localhost:8000`.

## Deployment

Ready for **GitHub Pages** out of the box:

1. Push to `main` on `github.com/Quinn-Berry/Cooseing`
2. In the repo settings → **Pages**, set source to `main` / root
3. Optionally add a `CNAME` file for a custom domain (e.g. `cooseing.com`)

Also works on **Netlify** or **Vercel** with zero configuration — just point them at the root of the repo.

## File Structure

```
Cooseing/
├── index.html          # Single-page site
├── css/
│   └── style.css       # Full design system
├── js/
│   └── main.js         # Interactions
├── assets/             # Images (see assets/README.md)
│   └── sponsors/       # Sponsor logos
└── README.md
```

## Content Sections

1. **Hero** — Cinematic full-bleed intro
2. **Mission / About** — Who Max is, bio, Romans 5:3–5
3. **Compete** — HYROX PRO race results (8 races, stat counters, race cards)
4. **Coaching** — RevitalizeU Training pillars → CTA to `revitalizeutraining.com/apply-now`
5. **Partners** — MyProtein, Dream Recovery
6. **Community** — Run With Christ Charleston (RWC)
7. **Social** — Instagram, TikTok, Linktree
8. **Footer** — Nav, social, credits

## Updating Content

- **Race results** — Edit the `<article class="race">` blocks in `index.html`
- **Bio / copy** — Edit the About section in `index.html`
- **Photos** — Drop files into `assets/` (see `assets/README.md` for filenames)
- **Sponsors** — Add logos to `assets/sponsors/` and update the `.partners__logos` block

## Design Tokens

All colors, fonts, and spacing live in CSS custom properties at the top of `css/style.css`. Change the palette once — it updates everywhere.

---

Built by [Quinn Berry](https://github.com/Quinn-Berry).
