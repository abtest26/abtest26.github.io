/* ---------------------------------------------------------------
   Angie Bolea — portfolio
   Para añadir un proyecto: copia un objeto en PROJECTS.
   img: ruta a la imagen (local en /images o URL). ratio: ancho/alto.
   cats: categorías (deben existir en CAT_NAMES).
--------------------------------------------------------------- */

const CAT_NAMES = {
  direction:   "Direction",
  research:    "Creative Research",
  visualist:   "Visualist",
  commercial:  "Commercial",
  musicvideo:  "Music Video",
  fashionfilm: "Fashion Film",
  photography: "Photography",
  shortfilm:   "Short Film",
};

const PROJECTS = [
  {
    title: "Renaldo & Clara — Nit Tropical",
    url: "https://angiebolea.com/renaldo-clara-nit-tropical",
    img: "https://angiebolea.com/wp-content/uploads/2024/06/RenaldoClara-NitTropical2.gif",
    ratio: 1.333, year: 2024, cats: ["direction", "musicvideo"],
  },
  {
    title: "Hornbach — No Project Without Drama",
    url: "https://angiebolea.com/hornbach-no-project-without-drama",
    img: "https://angiebolea.com/wp-content/uploads/2025/10/LopeSerranoNoProjectWithoutDramaCANADA.gif",
    ratio: 1.777, year: 2025, cats: ["commercial", "research"],
  },
  {
    title: "Renaldo & Clara — El Riu",
    url: "https://angiebolea.com/renaldo-clara-el-riu",
    img: "https://angiebolea.com/wp-content/uploads/2023/05/ElRiu_videoclip_RC_GIFS8.gif",
    ratio: 1.331, year: 2023, cats: ["direction", "musicvideo"],
  },
  {
    title: "Rosalía, Rauw Alejandro — Vampiros",
    url: "https://angiebolea.com/rosalia-rauw-alejandro-vampiros",
    img: "https://angiebolea.com/wp-content/uploads/2025/11/tumblr_9aad6c178356dbc80bac7031cc902eca_72ebc00a_540.gif",
    ratio: 1.333, year: 2025, cats: ["research", "visualist"],
  },
  {
    title: "Camila Cabello — I Luv It",
    url: "https://angiebolea.com/camila-cabello-_-luv-it",
    img: "https://angiebolea.com/wp-content/uploads/2024/07/nicolasmendezILUVITCANADAvideo-converter.com-ezgif.com-optimize.gif",
    ratio: 1.770, year: 2024, cats: ["research", "visualist"],
  },
  {
    title: "Dua Lipa — Love Again",
    url: "https://angiebolea.com/dua-lipa-love-again",
    img: "https://angiebolea.com/wp-content/uploads/2024/06/LopeSerranoLoveAgainDCCANADA-ezgif.com-optimize.gif",
    ratio: 1.775, year: 2024, cats: ["research", "visualist"],
  },
  {
    title: "Dua Lipa — Dance The Night (Barbie)",
    url: "https://angiebolea.com/dua-lipa-barbie",
    img: "https://angiebolea.com/wp-content/uploads/2024/07/DuaLipa-DanceTheNightFromBarbieTheAlbumOfficialMusicVideo-ezgif.com-optimize.gif",
    ratio: 1.775, year: 2024, cats: ["research", "visualist"],
  },
  {
    title: "Maria Roch AW14",
    url: "https://angiebolea.com/maria-roch-aw14",
    img: "https://angiebolea.com/wp-content/uploads/2021/10/mariaroch14.gif",
    ratio: 1.775, year: 2021, cats: ["direction", "fashionfilm"],
  },
  {
    title: "Cuba",
    url: "https://angiebolea.com/cuba",
    img: "https://angiebolea.com/wp-content/uploads/2021/09/02650030-1024x679.jpg",
    ratio: 1.507, year: 2021, cats: ["photography"],
  },
  {
    title: "Vinils Canada — Editorial",
    url: "https://angiebolea.com/vinils-canada-editorial",
    img: "https://angiebolea.com/wp-content/uploads/2021/12/Extraperlo_Delirio-Especifico_vinilo_IMG_1037_edit-1620x1080-1-1024x683.jpg",
    ratio: 1.500, year: 2021, cats: ["photography"],
  },
];



const grid    = document.getElementById("grid");
const filters = document.querySelector(".filters");
const body    = document.body;
const store   = window.localStorage;

/* ------------------------------ Render -------------------------------- */

function catLabel(cats) {
  return cats.map((c) => CAT_NAMES[c] || c).join(", ");
}

function buildItem(p, index) {
  const el = document.createElement("article");
  el.className = "item";
  el.dataset.cats = p.cats.join(" ");
  el.dataset.index = index;

  el.innerHTML = `
    <a class="item__link" href="${p.url}" target="_blank" rel="noopener">
      <div class="item__frame" style="aspect-ratio:${p.ratio}">
        <img class="item__img" alt="${p.title}" loading="lazy"
             data-src="${p.img}">
        <div class="item__overlay">
          <span class="item__overlay-title">${p.title}</span>
        </div>
      </div>
      <div class="item__meta">
        <span class="item__title">${p.title}</span>
        <span class="item__cats">${catLabel(p.cats)} · ${p.year}</span>
      </div>
    </a>`;
  return el;
}

function render() {
  const frag = document.createDocumentFragment();
  PROJECTS.forEach((p, i) => frag.appendChild(buildItem(p, i)));
  grid.appendChild(frag);
  observeImages();
}

/* --------------------------- Lazy loading ----------------------------- */

function observeImages() {
  const imgs = grid.querySelectorAll("img[data-src]");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
      obs.unobserve(img);
    });
  }, { rootMargin: "400px 0px" });
  imgs.forEach((img) => io.observe(img));
}

/* ------------------------------ Filtros ------------------------------- */

function buildFilters() {
  const used = new Set();
  PROJECTS.forEach((p) => p.cats.forEach((c) => used.add(c)));

  const all = makeFilterBtn("all", "All.");
  all.classList.add("is-active");
  filters.appendChild(all);

  Object.keys(CAT_NAMES)
    .filter((c) => used.has(c))
    .forEach((c) => filters.appendChild(makeFilterBtn(c, CAT_NAMES[c] + ".")));
}

function makeFilterBtn(cat, label) {
  const b = document.createElement("button");
  b.className = "btn filter";
  b.type = "button";
  b.dataset.filter = cat;
  b.textContent = label;
  b.addEventListener("click", () => applyFilter(cat, b));
  return b;
}

function applyFilter(cat, btn) {
  filters.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");

  grid.querySelectorAll(".item").forEach((item) => {
    const match = cat === "all" || item.dataset.cats.split(" ").includes(cat);
    item.classList.toggle("is-hidden", !match);
  });
}

/* --------------------------- Orden / shuffle -------------------------- */

function shuffle() {
  const items = [...grid.children];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach((el) => grid.appendChild(el));
}

function reorder() {
  [...grid.children]
    .sort((a, b) => a.dataset.index - b.dataset.index)
    .forEach((el) => grid.appendChild(el));
}

/* ------------------------------ Tamaño -------------------------------- */

const MIN_COLS = 1, MAX_COLS = 5;

function setCols(n) {
  const cols = Math.min(MAX_COLS, Math.max(MIN_COLS, n));
  document.documentElement.style.setProperty("--cols", cols);
  store.setItem("ab-cols", cols);
}
function changeCols(delta) {
  const current = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue("--cols")) || 3;
  setCols(current + delta);
}

/* ------------------------------ Retícula ------------------------------ */

function toggleGrid() {
  const on = body.classList.toggle("grid-on");
  store.setItem("ab-grid", on ? "1" : "0");
}

/* ---------------------------- Info / bio ------------------------------ */

function toggleInfo() {
  const btn = document.querySelector(".info__toggle");
  const bio = document.querySelector(".bio");
  const open = bio.hasAttribute("hidden");
  bio.toggleAttribute("hidden", !open);
  btn.setAttribute("aria-expanded", String(open));
  btn.classList.toggle("is-active", open);
}

/* ---------------------------- Menú móvil ------------------------------ */

function toggleMenu() {
  const controls = document.querySelector(".controls");
  const btn = document.querySelector(".masthead__toggle");
  const open = controls.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", String(open));
}

/* ------------------------------ Eventos ------------------------------- */

function bindToolkit() {
  document.querySelectorAll(".toolkit .btn").forEach((btn) => {
    const action = btn.dataset.action;
    btn.addEventListener("click", () => {
      if (action === "grid")    toggleGrid();
      if (action === "shuffle") shuffle();
      if (action === "reset")   reorder();
      if (action === "smaller") changeCols(+1);   // más columnas = imágenes más pequeñas
      if (action === "larger")  changeCols(-1);
    });
  });
  document.querySelector(".info__toggle").addEventListener("click", toggleInfo);
  document.querySelector(".masthead__toggle").addEventListener("click", toggleMenu);
}

function bindKeys() {
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    switch (e.key) {
      case "g": toggleGrid(); break;
      case "Enter": shuffle(); break;
      case "Backspace": e.preventDefault(); reorder(); break;
      case "+": case "=": changeCols(-1); break;
      case "-": case "_": changeCols(+1); break;
      case "Escape":
        applyFilter("all", filters.querySelector('[data-filter="all"]'));
        break;
    }
  });
}

/* ---------------------- Preferencias guardadas ------------------------ */

function restorePrefs() {
  const cols = store.getItem("ab-cols");
  if (cols) document.documentElement.style.setProperty("--cols", cols);
  if (store.getItem("ab-grid") === "1") body.classList.add("grid-on");
}

/* -------------------------------- Init -------------------------------- */

render();
buildFilters();
bindToolkit();
bindKeys();
restorePrefs();