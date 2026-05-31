/* ===== Para Ruth — storefront ===== */
/* Products are server-rendered in index.html (so search engines and AI
   answer engines see them without running JS). This script only
   progressively enhances that markup: it reads each piece from the DOM
   and wires up the bag. */

const PIECES = [...document.querySelectorAll(".piece")].map((el) => {
  const name = el.querySelector(".piece-name").textContent.trim().replace(/\s+/g, " ");
  const price = parseFloat(el.querySelector(".piece-price").textContent.replace(/[^0-9.]/g, ""));
  const img = el.querySelector(".piece-figure img");
  return {
    id: el.id,
    name,
    price,
    src: img.getAttribute("src"),
    fallback: img.getAttribute("onerror").match(/'([^']+)'/)[1],
  };
});
const byId = (id) => PIECES.find((p) => p.id === id);

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
  for (const [id, qty] of bag) { n += qty; sum += byId(id).price * qty; }
  $count.textContent = `(${n})`;
  $total.textContent = "$" + sum;
  if (bag.size === 0) { $items.innerHTML = '<p class="drawer-empty">Your bag is empty.</p>'; return; }
  $items.innerHTML = [...bag.entries()].map(([id, qty]) => {
    const p = byId(id);
    return `
      <div class="line-item">
        <img src="${p.src}" alt="" onerror="this.onerror=null;this.src='${p.fallback}'" />
        <div>
          <div class="li-name">${p.name}</div>
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
