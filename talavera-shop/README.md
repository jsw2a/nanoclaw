# Casa Talavera — storefront

A beautiful, simple, elegant single-page shop for hand-painted Talavera
pottery. Pure static HTML/CSS/JS — no build step, no dependencies.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
cd talavera-shop
python3 -m http.server 8080
# visit http://localhost:8080
```

## What's inside

```
talavera-shop/
├── index.html        # the whole page
├── css/styles.css    # design system (cobalt + terracotta + cream)
├── js/main.js        # product data, grid render, working cart drawer
├── assets/           # hand-drawn Talavera SVG tiles, logo, product art
└── images/           # drop real product photos here (see images/README.md)
```

## Design

- **Palette** — Talavera cobalt `#1c3aa0`, terracotta `#bd6a3c`, warm plaster
  cream. Pulled straight from the pottery.
- **Type** — Cormorant Garamond (display serif) over Jost (clean sans).
- **Motifs** — authentic radial floral and border tiles drawn as SVG, used
  for the hero accent, section dividers, and care cards.

## Features

- Responsive layout (3-up grid → 2-up → 1-up)
- Working cart: add to bag, slide-out drawer, remove items, live subtotal
- Newsletter capture, smooth-scroll nav, sticky header
- Graceful image fallback — shows SVG art until you add real photos

## Editing products

All products live in the `PRODUCTS` array at the top of `js/main.js`
(name, price, description, image). Change prices or copy there.
