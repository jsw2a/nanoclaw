/* ===== Casa Talavera — storefront ===== */

const PRODUCTS = [
  {
    id: "pitchers",
    name: "Talavera Pitchers",
    tag: "Pitchers",
    price: 68,
    img: "images/pitchers.jpg",
    fallback: "assets/art-pitchers.svg",
    desc: "Hand-thrown jarras in cobalt and terracotta. A pour-worthy centerpiece for water, wine, or a fistful of branches — sold individually, so you can mix the palettes.",
  },
  {
    id: "vases",
    name: "Bud Vases",
    tag: "Vases",
    price: 34,
    img: "images/vases.jpg",
    fallback: "assets/art-vases.svg",
    desc: "Little vessels for a single stem or a gathered handful of wildflowers. Cobalt florals or warm clay — each one a small painted world.",
  },
  {
    id: "dishes",
    name: "Trinket Dishes",
    tag: "Dishes",
    price: 22,
    img: "images/dishes.jpg",
    fallback: "assets/art-dishes.svg",
    desc: "Catch-all dishes for rings, salt, olives, or a stray earring. Each is a tiny hand-painted medallion — the easiest way to start a collection.",
  },
  {
    id: "tumblers",
    name: "Painted Tumblers",
    tag: "Drinkware",
    price: 28,
    img: "images/tumblers.jpg",
    fallback: "assets/art-tumblers.svg",
    desc: "Stout little cups for mezcal, agua fresca, or the morning café. Sold as a set of two — they stack the cobalt and the clay side by side.",
  },
  {
    id: "bowls",
    name: "Nesting Bowls",
    tag: "Bowls",
    price: 56,
    img: "images/bowls.jpg",
    fallback: "assets/art-bowls.svg",
    desc: "Serving and prep bowls that nest neatly together. Mix the bold blue florals with the creamy clay relief — beautiful enough to leave on the counter.",
  },
];

/* ---- Nav links ---- */
document.getElementById("nav").innerHTML =
  PRODUCTS.map((p) => `<a href="#${p.id}">${p.tag}</a>`).join("") +
  `<a href="#story">Story</a>`;

/* ---- Render immersive ware spreads ---- */
document.getElementById("wares").innerHTML = PRODUCTS.map((p, i) => `
  <section class="ware" id="${p.id}">
    <div class="ware-media">
      <span class="ware-num">${String(i + 1).padStart(2, "0")}</span>
      <div class="ware-frame">
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${p.fallback}'" />
      </div>
      <span class="ware-chip" aria-hidden="true"></span>
    </div>
    <div class="ware-body">
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="ware-desc">${p.desc}</p>
      <div class="ware-row">
        <span class="price">$${p.price}</span>
        <button class="add" data-id="${p.id}">Add to bag</button>
      </div>
    </div>
  </section>
`).join("");

/* ---- Cart ---- */
const cart = new Map();
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("cartOverlay");

function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
}

function render() {
  let count = 0, total = 0;
  for (const [id, qty] of cart) {
    count += qty;
    total += PRODUCTS.find((p) => p.id === id).price * qty;
  }
  cartCount.textContent = count;
  cartTotal.textContent = "$" + total;

  if (cart.size === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your bag is empty.</p>';
    return;
  }
  cartItems.innerHTML = [...cart.entries()].map(([id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="" onerror="this.onerror=null;this.src='${p.fallback}'" />
        <div>
          <div class="ci-name">${p.name}</div>
          <div class="ci-meta">$${p.price} × ${qty}</div>
        </div>
        <button class="ci-remove" data-remove="${id}">Remove</button>
      </div>`;
  }).join("");
}

document.getElementById("wares").addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  cart.set(btn.dataset.id, (cart.get(btn.dataset.id) || 0) + 1);
  render();
  openCart();
});

cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest(".ci-remove");
  if (!btn) return;
  cart.delete(btn.dataset.remove);
  render();
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

/* ---- Newsletter ---- */
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("newsNote").hidden = false;
});

/* ---- Footer year ---- */
document.getElementById("year").textContent = new Date().getFullYear();

render();
