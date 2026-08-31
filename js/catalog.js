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
  { id:'p12', group:'Кузовные',     name:'Зеркало правое',      donor:'Toyota RAV4 · 2018',       oem:'87910-42E10', price:'3 900 ₽',  stock:'1 шт',  ...DF },
];

/* Вторая партия — подгружается кнопкой «Показать ещё» */
const PRODUCTS_MORE = [
  { id:'p13', group:'Оптика',       name:'Фара правая в сборе',   donor:'VW Tiguan · 2018',        oem:'5NA-941-036', price:'7 200 ₽',  stock:'1 шт',    ...EX },
  { id:'p14', group:'Салон',        name:'Торпедо в сборе',       donor:'Kia Sportage · 2017',     oem:'84710-F1000', price:'18 400 ₽', stock:'1 шт',    ...GD },
  { id:'p15', group:'Двигатель',    name:'ГБЦ 1.8 4ZZ-FE',        donor:'Toyota Corolla · 2015',   oem:'11101-0D040', price:'21 000 ₽', stock:'1 шт',    ...GD },
  { id:'p16', group:'Кузовные',     name:'Дверь передняя левая',  donor:'Hyundai Solaris · 2019',  oem:'76003-H5000', price:'11 300 ₽', stock:'1 шт',    ...EX },
  { id:'p17', group:'Шины и диски', name:'Комплект дисков R16',   donor:'Toyota Camry · 2016',     oem:'42611-06D40', price:'16 800 ₽', stock:'1 компл', ...GD },
  { id:'p18', group:'Стёкла',       name:'Стекло двери заднее',   donor:'BMW X3 · 2015',           oem:'51-35-7-289', price:'4 600 ₽',  stock:'2 шт',    ...EX },
  { id:'p19', group:'Топливная',    name:'Топливный бак',         donor:'Kia Rio · 2018',          oem:'31150-H5000', price:'6 300 ₽',  stock:'1 шт',    ...GD },
  { id:'p20', group:'Трансмиссия',  name:'МКПП 5-ступенчатая',    donor:'VW Polo · 2017',          oem:'0AF-300-041', price:'32 000 ₽', stock:'1 шт',    ...GD },
  { id:'p21', group:'Оптика',       name:'Фонарь задний левый',   donor:'Hyundai Creta · 2020',    oem:'92401-M0000', price:'3 400 ₽',  stock:'2 шт',    ...EX },
  { id:'p22', group:'Кузовные',     name:'Крыло переднее правое', donor:'Toyota RAV4 · 2017',      oem:'53801-42180', price:'7 900 ₽',  stock:'1 шт',    ...DF },
  { id:'p23', group:'Салон',        name:'Блок управления климатом', donor:'Kia Ceed · 2019',      oem:'97250-A2000', price:'5 100 ₽',  stock:'1 шт',    ...EX },
  { id:'p24', group:'Двигатель',    name:'Генератор 110А',        donor:'VW Polo · 2019',          oem:'04E-903-023', price:'6 900 ₽',  stock:'2 шт',    ...EX },
];

/* ── Icon placeholder SVG ─────────────────── */
const PH_ICON = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="10" width="40" height="28" rx="5" stroke="#b8c5de" stroke-width="2.5"/><circle cx="24" cy="24" r="8" stroke="#b8c5de" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#b8c5de"/><path d="M15 10l3-6h10l3 6" stroke="#b8c5de" stroke-width="2.5" stroke-linejoin="round"/></svg>`;

/* ── Фото по группам ──────────────────────── */
const GROUP_IMG = {
  'Оптика':       'optics',
  'Двигатель':    'engine',
  'Стёкла':       'glass',
  'Салон':        'interior',
  'Кузовные':     'body',
  'Топливная':    'fuel',
  'Шины и диски': 'wheels',
  'Трансмиссия':  'transmission',
};

/* Фото детали. Если группа неизвестна — остаётся SVG-заглушка.
   width/height заданы явно, чтобы блок не «прыгал» при загрузке. */
function partImg(p, cls) {
  const slug = GROUP_IMG[p.group];
  if (!slug) return `<div class="prod-img-ph ${cls}">${PH_ICON}</div>`;
  return `<img src="images/parts/${slug}.webp" alt="${p.name}" class="prod-img-photo ${cls}"
    width="1200" height="600" loading="lazy" decoding="async">`;
}


/* Шкала состояния: 3 деления, при наведении раскрывается словом.
   На тач-устройствах наведения нет — слово дублируется в title/aria-label. */
function condPill(p) {
  return `<span class="prod-cond ${p.cls}" title="Состояние: ${p.cond.toLowerCase()}" aria-label="Состояние: ${p.cond.toLowerCase()}">
        <span class="cond-bars" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="cond-label" aria-hidden="true">${p.cond}</span>
      </span>`;
}

/* ── Filter & sort state ─────────────────── */
let currentView  = 'grid';
let activeGroup  = 'Все';
let activeSort   = 'cheap';
let activeChecks = new Set();

/* Показана ли вторая партия */
let showAll = false;

/* Цена берётся из самой карточки — отдельной таблицы цен не держим */
const priceOf = p => Number(p.price.replace(/[^\d]/g, ''));

function visibleProducts() {
  return showAll ? PRODUCTS.concat(PRODUCTS_MORE) : PRODUCTS.slice();
}

function filteredProducts() {
  let list = visibleProducts();
  if (activeGroup !== 'Все') list = list.filter(p => p.group === activeGroup);
  if (activeChecks.size) list = list.filter(p => activeChecks.has(p.cond));
  if (activeSort === 'cheap') list.sort((a, b) => priceOf(a) - priceOf(b));
  if (activeSort === 'exp')   list.sort((a, b) => priceOf(b) - priceOf(a));
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
    : '<p class="review-empty">Ничего не найдено — попробуйте снять часть фильтров.</p>';
  document.querySelector('.found-count').textContent = list.length.toLocaleString('ru');
  syncLoadMore();
}

/* Кнопка «Показать ещё»: подгружает вторую партию, затем гаснет */
function syncLoadMore() {
  const btn = document.getElementById('load-more');
  if (!btn) return;
  btn.textContent = showAll ? 'Показаны все 24 из 12 480' : 'Показать ещё 12';
  btn.disabled = showAll;
  btn.classList.toggle('btn-blue', !showAll);
  btn.classList.toggle('btn-ghost', showAll);
}

function gridCard(p) {
  return `<a href="product.html" class="prod-card">
    <div class="prod-img">
      ${partImg(p, "prod-img-ph--grid")}
      <div class="prod-img-actions">
        ${condPill(p)}
        <button class="prod-fav" aria-label="В избранное" onclick="event.preventDefault()">♡</button>
      </div>
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
      ${partImg(p, "")}
      <div class="prod-img-actions">${condPill(p)}</div>
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
        <button class="prod-fav-btn" aria-label="В избранное" onclick="event.preventDefault()">♡</button>
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

/* ── Load more ────────────────────────────── */
document.getElementById('load-more')?.addEventListener('click', () => {
  if (showAll) return;
  showAll = true;
  renderProducts();
});
