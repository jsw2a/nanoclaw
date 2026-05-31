/* ===== Casa Talavera — storefront ===== */

const PRODUCTS = [
  {
    id: "pitchers",
    name: "Talavera Pitchers",
    tag: "Pitchers",
    price: 68,
    img: "images/pitchers.jpg",
    fallback: "assets/art-pitchers.svg",
    desc: "Hand-thrown jarras in cobalt and terracotta. A pour-worthy centerpiece, sold individually.",
  },
  {
    id: "vases",
    name: "Bud Vases",
    tag: "Vases",
    price: 34,
    img: "images/vases.jpg",
    fallback: "assets/art-vases.svg",
    desc: "Little vessels for a single stem or a fistful of wildflowers. Cobalt or clay.",
  },
  {
    id: "dishes",
    name: "Trinket Dishes",
    tag: "Dishes",
    price: 22,
    img: "images/dishes.jpg",
    fallback: "assets/art-dishes.svg",
    desc: "Catch-all dishes for rings, salt, or olives. Each one a tiny painted medallion.",
  },
  {
    id: "tumblers",
    name: "Painted Tumblers",
    tag: "Drinkware",
    price: 28,
    img: "images/tumblers.jpg",
    fallback: "assets/art-tumblers.svg",
    desc: "Stout little cups for mezcal, agua fresca, or morning café. Set of two.",
  },
  {
    id: "bowls",
    name: "Nesting Bowls",
    tag: "Bowls",
    price: 56,
    img: "images/bowls.jpg",
    fallback: "assets/art-bowls.svg",
    desc: "Serving and prep bowls that nest together. Mix the blue florals with the clay.",
  },
];

/* ---- Render product grid ---- */
const grid = document.getElementById("productGrid");
grid.innerHTML = PRODUCTS.map((p) => `
  <article class="card">
    <div class="card-media">
      <span class="card-tag">${p.tag}</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.onerror=null;this.src='${p.fallback}'" />
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-row">
        <span class="price">$${p.price}</span>
        <button class="add" data-id="${p.id}">Add to bag</button>
      </div>
    </div>
  </article>
`).join("");

/* ---- Cart state ---- */
const cart = new Map(); // id -> qty
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

/* ---- Events ---- */
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const id = btn.dataset.id;
  cart.set(id, (cart.get(id) || 0) + 1);
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
