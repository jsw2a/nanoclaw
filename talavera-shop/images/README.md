# Product photos

The site renders beautifully out of the box using hand-drawn Talavera SVG
illustrations (in `../assets/`). To swap in your real product photography,
just drop JPGs into this folder with these exact names:

| File | Photo |
|------|-------|
| `pitchers.jpg` | The grouping of cobalt & terracotta pitchers (hero) |
| `vases.jpg`    | The row of bud vases with white flowers |
| `dishes.jpg`   | The trinket / ring dishes on linen |
| `tumblers.jpg` | The six painted tumblers |
| `bowls.jpg`    | The nesting bowls (blue florals + clay) |

No code change needed — each `<img>` falls back to the SVG art if the photo
is missing, and uses the photo automatically once it's here.

**Tip:** a portrait crop around 1000×1250px (4:5) looks best in the grid.
