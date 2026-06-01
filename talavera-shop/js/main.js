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

/* ===== Motion (progressive enhancement) ===========================
   Content is visible without JS; these effects only switch on once we
   add `js-ready`, and CSS disables them under prefers-reduced-motion. */
(function () {
  const root = document.documentElement;
  root.classList.add("js-ready");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* hero entrance — type rises in sequence, tiles drift in */
  const hero = document.querySelector(".hero");
  if (hero) {
    [...hero.querySelectorAll(".hero-type > *")].forEach((el, i) => el.style.setProperty("--i", i));
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-in")));
  }

  /* scroll reveals */
  const sels = [
    ".manifesto .m-statement", ".manifesto .m-note",
    ".ledger", ".piece", ".cenefa-band",
    ".story-eyebrow", ".story-quote",
    ".about-talavera .at-head", ".about-talavera .at-body",
    ".signup h2", ".signup-form",
  ];
  const targets = [];
  sels.forEach((s) => document.querySelectorAll(s).forEach((el) => { el.classList.add("reveal"); targets.push(el); }));
  document.querySelectorAll(".story-facts > div").forEach((el, i) => {
    el.classList.add("reveal"); el.style.setProperty("--i", i); targets.push(el);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("in"));
  }

  /* condensing masthead */
  const mast = document.querySelector(".masthead");
  if (mast) {
    const onScroll = () => mast.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* subtle hero-tile parallax */
  const tiles = document.querySelector(".hero-tiles");
  if (tiles && !reduce) {
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        tiles.style.backgroundPositionY = Math.min(window.scrollY, 800) * 0.16 + "px";
        ticking = false;
      });
    }, { passive: true });
  }
})();
