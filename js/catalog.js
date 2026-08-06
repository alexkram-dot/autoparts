/* ── Products data ─────────────────────────── */
const EX = { cond:'Отличное', cls:'cond-ex' };
const GD = { cond:'Хорошее',  cls:'cond-gd' };
const DF = { cond:'Есть дефекты', cls:'cond-def' };

const PRODUCTS = [
  { id:'p1',  group:'Оптика',       name:'Фара левая в сборе',    donor:'Toyota Camry · 2018',      oem:'81170-33B40', price:'6 800 ₽',  stock:'2 шт',  ...EX },
  { id:'p2',  group:'Двигатель',    name:'Двигатель 1.6 G4FG',    donor:'Kia Ceed · 2017',          oem:'21101-2BW04', price:'78 000 ₽', stock:'1 шт',  ...GD },
  { id:'p3',  group:'Стёкла',       name:'Лобовое стекло',        donor:'VW Tiguan · 2019',         oem:'5NN-845-011', price:'9 400 ₽',  stock:'1 шт',  ...EX },
  { id:'p4',  group:'Салон',        name:'Сиденье водителя',      donor:'BMW 3 серии · 2016',       oem:'52-10-7-340', price:'12 500 ₽', stock:'1 шт',  ...GD },
  { id:'p5',  group:'Кузовные',     name:'Капот в сборе',         donor:'Toyota RAV4 · 2019',       oem:'53301-42010', price:'14 500 ₽', stock:'1 шт',  ...EX },
  { id:'p6',  group:'Топливная',    name:'Бензонасос',            donor:'Hyundai Solaris · 2018',   oem:'31110-H5000', price:'4 200 ₽',  stock:'3 шт',  ...EX },
  { id:'p7',  group:'Шины и диски', name:'Диск литой R17',        donor:'Kia Sportage · 2019',      oem:'52910-D9200', price:'5 600 ₽',  stock:'4 шт',  ...GD },
  { id:'p8',  group:'Трансмиссия',  name:'АКПП U340E',            donor:'Toyota Corolla · 2017',    oem:'30500-02850', price:'46 000 ₽', stock:'1 шт',  ...GD },
  { id:'p9',  group:'Кузовные',     name:'Бампер передний',       donor:'VW Polo · 2020',           oem:'2G0-807-221', price:'8 900 ₽',  stock:'1 шт',  ...GD },
  { id:'p10', group:'Оптика',       name:'Фонарь задний правый',  donor:'Kia Rio · 2019',           oem:'92402-H8000', price:'3 100 ₽',  stock:'2 шт',  ...EX },
  { id:'p11', group:'Двигатель',    name:'Стартер',               donor:'Hyundai Creta · 2019',     oem:'36100-2E300', price:'5 400 ₽',  stock:'2 шт',  ...EX },
  { id:'p12', group:'Кузовные',     name:'Зеркало боковое правое',donor:'Toyota RAV4 · 2018',       oem:'87910-42E10', price:'3 900 ₽',  stock:'1 шт',  ...DF },
];

/* ── Icon placeholder SVG ─────────────────── */
const PH_ICON = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="10" width="40" height="28" rx="5" stroke="#b8c5de" stroke-width="2.5"/><circle cx="24" cy="24" r="8" stroke="#b8c5de" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#b8c5de"/><path d="M15 10l3-6h10l3 6" stroke="#b8c5de" stroke-width="2.5" stroke-linejoin="round"/></svg>`;

/* ── Filter & sort state ─────────────────── */
let currentView  = 'grid';
let activeGroup  = 'Все';
let activeSort   = 'cheap';
let activeChecks = new Set();

const PRICE_MAP = {
  'p1':6800,'p2':78000,'p3':9400,'p4':12500,'p5':14500,
  'p6':4200,'p7':5600,'p8':46000,'p9':8900,'p10':3100,
  'p11':5400,'p12':3900
};

function filteredProducts() {
  let list = PRODUCTS.slice();
  if (activeGroup !== 'Все') list = list.filter(p => p.group === activeGroup);
  if (activeChecks.size) list = list.filter(p => activeChecks.has(p.cond));
  if (activeSort === 'cheap') list.sort((a,b) => PRICE_MAP[a.id] - PRICE_MAP[b.id]);
  if (activeSort === 'exp')   list.sort((a,b) => PRICE_MAP[b.id] - PRICE_MAP[a.id]);
  return list;
}

/* ── Render products ──────────────────────── */
function renderProducts() {
  const container = document.getElementById('products-container');
  const isGrid = currentView === 'grid';
  container.className = isGrid ? 'products-grid' : 'products-list';
  const list = filteredProducts();
  container.innerHTML = list.length
    ? list.map(p => isGrid ? gridCard(p) : listCard(p)).join('')
    : '<p style="padding:24px;color:var(--subtle);">Ничего не найдено</p>';
  document.querySelector('.found-count').textContent = list.length.toLocaleString('ru');
}

function gridCard(p) {
  return `<a href="product.html" class="prod-card">
    <div class="prod-img">
      <div class="prod-img-ph prod-img-ph--grid">${PH_ICON}</div>
      <div class="prod-badge ${p.cls}"><span class="badge-dot"></span>${p.cond}</div>
      <button class="prod-fav" onclick="event.preventDefault()">♡</button>
    </div>
    <div class="prod-body">
      <div class="prod-group">${p.group}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-donor">${p.donor}</div>
      <div class="prod-oem">OEM ${p.oem}</div>
      <div class="prod-footer">
        <div>
          <div class="prod-price">${p.price}</div>
          <div class="prod-stock">${p.stock}</div>
        </div>
        <button class="prod-cart" onclick="event.preventDefault()">В корзину</button>
      </div>
    </div>
  </a>`;
}

function listCard(p) {
  return `<a href="product.html" class="prod-card">
    <div class="prod-img">
      <div class="prod-img-ph">${PH_ICON}</div>
      <div class="prod-badge ${p.cls} prod-badge--sm"><span class="badge-dot"></span>${p.cond}</div>
    </div>
    <div class="prod-body">
      <div class="prod-group">${p.group}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-meta">
        <span class="prod-meta-donor">${p.donor}</span>
        <span class="prod-meta-oem">OEM ${p.oem}</span>
        <span class="prod-stock">${p.stock}</span>
      </div>
    </div>
    <div class="prod-aside">
      <div class="prod-price">${p.price}</div>
      <div class="prod-actions">
        <button class="prod-fav-btn" onclick="event.preventDefault()">♡</button>
        <button class="prod-cart" onclick="event.preventDefault()">В корзину</button>
      </div>
    </div>
  </a>`;
}

/* ── View toggle ──────────────────────────── */
document.getElementById('view-grid').addEventListener('click', () => {
  currentView = 'grid';
  document.getElementById('view-grid').classList.add('active');
  document.getElementById('view-list').classList.remove('active');
  renderProducts();
});
document.getElementById('view-list').addEventListener('click', () => {
  currentView = 'list';
  document.getElementById('view-list').classList.add('active');
  document.getElementById('view-grid').classList.remove('active');
  renderProducts();
});

/* ── Group chips ──────────────────────────── */
document.getElementById('group-chips').addEventListener('click', e => {
  const btn = e.target.closest('.gchip');
  if (!btn) return;
  document.querySelectorAll('.gchip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeGroup = btn.dataset.group;
  renderProducts();
});

/* ── Sort ─────────────────────────────────── */
document.getElementById('sort-select').addEventListener('change', e => {
  activeSort = e.target.value;
  renderProducts();
});

/* ── Condition checkboxes ─────────────────── */
activeChecks = new Set(['Отличное', 'Хорошее']);
document.querySelectorAll('.filter-check[data-cond]').forEach(lbl => {
  const cond = lbl.dataset.cond;
  if (activeChecks.has(cond)) lbl.querySelector('.check-box').classList.add('checked');
  lbl.addEventListener('click', () => {
    const box = lbl.querySelector('.check-box');
    const isChecked = box.classList.toggle('checked');
    box.textContent = isChecked ? '✓' : '';
    if (isChecked) activeChecks.add(cond); else activeChecks.delete(cond);
    renderProducts();
  });
});

/* ── Non-condition checkboxes (visual only) ── */
document.querySelectorAll('.filter-check:not([data-cond])').forEach(lbl => {
  lbl.addEventListener('click', () => {
    const box = lbl.querySelector('.check-box');
    const isChecked = box.classList.toggle('checked');
    box.textContent = isChecked ? '✓' : '';
  });
});

/* ── Filter sheet (mobile) ────────────────── */
function openFilterSheet() {
  document.getElementById('filter-sheet').classList.add('open');
  document.getElementById('scrim').classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeFilterSheet() {
  document.getElementById('filter-sheet').classList.remove('open');
  document.getElementById('scrim').classList.remove('visible');
  document.body.style.overflow = '';
}
document.getElementById('filter-close').addEventListener('click', closeFilterSheet);
document.getElementById('scrim').addEventListener('click', closeFilterSheet);

/* ── Init ─────────────────────────────────── */
renderProducts();
