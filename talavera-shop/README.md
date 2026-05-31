# Para Ruth — storefront

A design-forward single-page shop for hand-painted Talavera pottery from
Puebla, México. Hand-coded static HTML/CSS/JS — no build step, no framework.

## Run it

```bash
cd talavera-shop
python3 -m http.server 8080
# visit http://localhost:8080
```

## What's inside

```
talavera-shop/
├── index.html        # the page — products are real HTML (SEO/GEO), + JSON-LD & meta
├── css/styles.css    # editorial design system
├── js/main.js        # progressive enhancement: reads the DOM, wires the bag
├── fonts/            # self-hosted variable fonts (woff2, Latin subset)
├── assets/           # brand mark, paper grain, Talavera rule, og-image, fallback art
├── images/           # product photography
├── robots.txt        # crawl rules (incl. AI answer-engine bots) + sitemap ref
└── sitemap.xml       # image sitemap
```

## Design

Built deliberately against the "AI-template" look.

- **Type** — *Fraunces* (variable display serif with optical sizing and a
  calligraphic italic) over *Hanken Grotesk*. Self-hosted and subset to
  Latin, so the site needs no external CDN and renders instantly.
- **Layout** — a real 12-column editorial grid, composed asymmetrically.
  Each piece is its own spread that alternates sides, with an oversized
  italic index number set into the whitespace, a vertical category label,
  and a gallery-style caption (material · origin · size).
- **Colour** — drawn from the actual glazes: cobalt is the anchor (deep
  cobalt hero and inverted story section) over layered warm-neutral papers,
  with saffron and terracotta as disciplined accents. No pure black/white.
- **Pattern as punctuation** — not wallpaper: a line-art brand mark, a faint
  hero medallion, and a single hairline Talavera rule across the footer,
  over a barely-there paper grain.

## SEO & GEO (generative search)

Built to be visible to both classic search and AI answer engines:

- **Products are server-rendered as real HTML** — not injected by JS — so
  crawlers that don't run JavaScript (most LLM/AI bots) still see every
  piece, price, and description. `js/main.js` only *enhances* that markup.
- **Structured data (JSON-LD):** `Organization`/`Store`, an `ItemList` of
  `Product` + `Offer` (price, currency, availability), and an `FAQPage`
  (clean Q&A that answer engines can quote).
- **Social cards:** Open Graph + Twitter tags and a branded 1200×630
  `assets/og-image.png`.
- **Crawl & index:** `robots.txt` (explicitly welcomes GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, etc.), `sitemap.xml`, canonical URL,
  semantic headings, descriptive `alt` text, and explicit image dimensions.

> **Before launch:** replace the placeholder domain `https://pararuth.com`
> with your real URL in `index.html` (canonical, OG, and the three JSON-LD
> blocks), `robots.txt`, and `sitemap.xml`.

## Features

- Working bag: add to bag → slide-out drawer → remove → live subtotal
- Responsive (asymmetric spreads re-compose to a clean single column)
- Graceful SVG fallback art if a product photo is missing

## Editing

Products are plain HTML `<article class="piece">` blocks in `index.html`.
Edit name, price, description, or specs there; the bag reads them from the
DOM automatically. Keep the matching JSON-LD `Product` entries in sync.
