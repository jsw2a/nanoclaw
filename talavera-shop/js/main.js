/* ===== Para Ruth — storefront ===== */

const PIECES = [
  {
    id: "pitchers", name: "Jarras", en: "Pitchers", cat: "Jarra · Pitcher", price: 68,
    img: "images/pitchers.jpg", fallback: "assets/art-pitchers.svg",
    desc: "Thrown on the wheel and painted in cobalt or warm clay. A pour-worthy centrepiece for water, wine, or a fistful of branches.",
    material: "Glazed earthenware", origin: "Puebla, MX", size: "≈ 22 cm",
    caption: "Loza vidriada · pintada a mano · pieza única",
  },
  {
    id: "vases", name: "Floreros", en: "Bud Vases", cat: "Florero · Vase", price: 34,
    img: "images/vases.jpg", fallback: "assets/art-vases.svg",
    desc: "Small vessels for a single stem or a gathered handful of wildflowers — each a little painted world of its own.",
    material: "Glazed earthenware", origin: "Puebla, MX", size: "14–18 cm",
    caption: "Loza vidriada · pintada a mano · pieza única",
  },
  {
    id: "dishes", name: "Platitos", en: "Trinket Dishes", cat: "Platito · Dish", price: 22,
    img: "images/dishes.jpg", fallback: "assets/art-dishes.svg",
    desc: "Catch-alls for rings, salt, olives, or a stray earring. Each a tiny hand-painted medallion — the easiest way to begin a collection.",
    material: "Glazed earthenware", origin: "Puebla, MX", size: "≈ 10 cm",
    caption: "Loza vidriada · pintada a mano · pieza única",
  },
  {
    id: "tumblers", name: "Vasos", en: "Tumblers", cat: "Vaso · Tumbler", price: 28,
    img: "images/tumblers.jpg", fallback: "assets/art-tumblers.svg",
    desc: "Stout little cups for mezcal, agua fresca, or the morning café. Sold as a pair — the cobalt and the clay, side by side.",
    material: "Glazed earthenware", origin: "Puebla, MX", size: "Set of two",
    caption: "Loza vidriada · pintada a mano · pieza única",
  },
  {
    id: "bowls", name: "Tazones", en: "Nesting Bowls", cat: "Tazón · Bowl", price: 56,
    img: "images/bowls.jpg", fallback: "assets/art-bowls.svg",
    desc: "Serving and prep bowls that nest neatly together. Mix the bold blue florals with the creamy clay relief — too lovely to put away.",
    material: "Glazed earthenware", origin: "Puebla, MX", size: "12–24 cm",
    caption: "Loza vidriada · pintada a mano · pieza única",
  },
];

/* ---- Nav ---- */
document.getElementById("nav").innerHTML =
  PIECES.map((p) => `<a href="#${p.id}">${p.en}</a>`).join("") + `<a href="#story">Story</a>`;

/* ---- Editorial spreads (alternating sides) ---- */
document.getElementById("wares").innerHTML = PIECES.map((p, i) => `
  <article class="piece ${i % 2 ? "flip" : ""}" id="${p.id}">
    <span class="piece-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
    <figure class="piece-figure">
      <span class="piece-cat">${p.cat}</span>
      <img src="${p.img}" alt="${p.name} — ${p.en}"
           onerror="this.onerror=null;this.src='${p.fallback}'" />
      <figcaption class="piece-caption">${p.caption}</figcaption>
    </figure>
    <div class="piece-detail">
      <h3 class="piece-name">${p.name} <em>${p.en}</em></h3>
      <p class="piece-desc">${p.desc}</p>
      <dl class="piece-spec">
        <div><dt>Material</dt><dd>${p.material}</dd></div>
        <div><dt>Origin</dt><dd>${p.origin}</dd></div>
        <div><dt>Size</dt><dd>${p.size}</dd></div>
      </dl>
      <div class="piece-buy">
        <span class="piece-price">$${p.price}</span>
        <button class="btn-line add" data-id="${p.id}">Add to bag</button>
      </div>
    </div>
  </article>
`).join("");

/* ---- Bag ---- */
const bag = new Map();
const $count = document.getElementById("cartCount");
const $items = document.getElementById("cartItems");
const $total = document.getElementById("cartTotal");
const drawer = document.getElementById("cartDrawer");
const veil = document.getElementById("cartOverlay");

const openBag = () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); veil.hidden = false; };
const closeBag = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); veil.hidden = true; };

function render() {
  let n = 0, sum = 0;
  for (const [id, qty] of bag) { n += qty; sum += PIECES.find((p) => p.id === id).price * qty; }
  $count.textContent = `(${n})`;
  $total.textContent = "$" + sum;
  if (bag.size === 0) { $items.innerHTML = '<p class="drawer-empty">Your bag is empty.</p>'; return; }
  $items.innerHTML = [...bag.entries()].map(([id, qty]) => {
    const p = PIECES.find((x) => x.id === id);
    return `
      <div class="line-item">
        <img src="${p.img}" alt="" onerror="this.onerror=null;this.src='${p.fallback}'" />
        <div>
          <div class="li-name">${p.name} <em>${p.en}</em></div>
          <div class="li-meta">$${p.price} × ${qty}</div>
        </div>
        <button class="li-remove" data-remove="${id}">Remove</button>
      </div>`;
  }).join("");
}

document.getElementById("wares").addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  bag.set(btn.dataset.id, (bag.get(btn.dataset.id) || 0) + 1);
  render();
  openBag();
});
$items.addEventListener("click", (e) => {
  const btn = e.target.closest(".li-remove");
  if (!btn) return;
  bag.delete(btn.dataset.remove);
  render();
});
document.getElementById("cartBtn").addEventListener("click", openBag);
document.getElementById("cartClose").addEventListener("click", closeBag);
veil.addEventListener("click", closeBag);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBag(); });

/* ---- Newsletter ---- */
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("newsNote").hidden = false;
});

/* ---- Year ---- */
document.getElementById("year").textContent = new Date().getFullYear();

render();
