/* ── Car diagram data ─────────────────────── */
const PINS = [
  { id:'engine',   n:'02', label:'Двигатель',         ax:33, ay:46, lx:17, ly:40, side:'l', items:'ДВС в сборе · ГБЦ · поршневая · навесное', count:'1 240 шт' },
  { id:'optics',   n:'01', label:'Оптика',            ax:42, ay:58, lx:17, ly:67, side:'l', items:'Фары · фонари · ПТФ · корпуса',             count:'1 510 шт' },
  { id:'glass',    n:'03', label:'Стёкла',            ax:45, ay:32, lx:38, ly:11, side:'t', items:'Лобовое · боковые · заднее · люк',          count:'540 шт'   },
  { id:'interior', n:'04', label:'Салон',             ax:54, ay:30, lx:60, ly:11, side:'t', items:'Сиденья · торпедо · обшивки · airbag',      count:'2 100 шт' },
  { id:'fuel',     n:'06', label:'Топливная система', ax:74, ay:44, lx:83, ly:34, side:'r', items:'Бензонасос · ТНВД · форсунки · бак',        count:'720 шт'   },
  { id:'body',     n:'05', label:'Кузовные',          ax:62, ay:48, lx:83, ly:57, side:'r', items:'Капот · двери · крылья · бамперы',          count:'3 880 шт' },
  { id:'trans',    n:'08', label:'Трансмиссия',       ax:46, ay:65, lx:34, ly:89, side:'b', items:'АКПП · МКПП · редуктор · привод',          count:'830 шт'   },
  { id:'wheels',   n:'07', label:'Шины и диски',      ax:53, ay:70, lx:60, ly:89, side:'b', items:'Литьё · штамповка · шины б/у',             count:'960 компл'},
];

const TRANSFORMS = {
  l: 'translate(calc(-100% - 14px), -50%)',
  r: 'translate(14px, -50%)',
  t: 'translate(-50%, calc(-100% - 13px))',
  b: 'translate(-50%, 13px)',
};

/* ── Build diagram ────────────────────────── */
(function buildDiagram() {
  const wrap = document.getElementById('diagram');
  const svg  = document.getElementById('diagram-svg');
  if (!wrap || !svg) return;

  PINS.forEach(p => {
    /* SVG line */
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p.lx); line.setAttribute('y1', p.ly);
    line.setAttribute('x2', p.ax); line.setAttribute('y2', p.ay);
    line.setAttribute('stroke', 'rgba(11,23,48,.32)');
    line.setAttribute('stroke-width', '1.4');
    line.setAttribute('vector-effect', 'non-scaling-stroke');
    line.dataset.pin = p.id;
    svg.appendChild(line);

    /* Dot */
    const dot = document.createElement('div');
    dot.className = 'diagram-dot';
    dot.dataset.pin = p.id;
    dot.style.left = p.ax + '%';
    dot.style.top  = p.ay + '%';
    wrap.appendChild(dot);

    /* Label */
    const lbl = document.createElement('a');
    lbl.href = 'catalog.html';
    lbl.className = 'diagram-label';
    lbl.dataset.pin = p.id;
    lbl.style.left = p.lx + '%';
    lbl.style.top  = p.ly + '%';
    lbl.style.transform = TRANSFORMS[p.side];
    lbl.innerHTML = `
      <div class="diagram-label-title">${p.label}</div>
      <div class="diagram-label-body">
        <div class="diagram-label-items">${p.items}</div>
        <div class="diagram-label-count">${p.count}</div>
      </div>`;

    lbl.addEventListener('mouseenter', () => activatePin(p.id));
    lbl.addEventListener('mouseleave', () => deactivatePin(p.id));
    wrap.appendChild(lbl);
  });
})();

function activatePin(id) {
  document.querySelectorAll(`[data-pin="${id}"]`).forEach(el => {
    el.classList.add('active');
    if (el.tagName === 'line') el.setAttribute('stroke', '#ff6a1a');
  });
}
function deactivatePin(id) {
  document.querySelectorAll(`[data-pin="${id}"]`).forEach(el => {
    el.classList.remove('active');
    if (el.tagName === 'line') el.setAttribute('stroke', 'rgba(11,23,48,.32)');
  });
}

/* ── Build categories grid ────────────────── */
(function buildCats() {
  const grid = document.getElementById('cats-grid');
  if (!grid) return;
  PINS.forEach(p => {
    const a = document.createElement('a');
    a.href = 'catalog.html';
    a.className = 'cat-card';
    a.innerHTML = `
      <div class="cat-card-hdr">
        <div class="cat-card-num">${p.n}</div>
        <span class="cat-card-arrow">→</span>
      </div>
      <div class="cat-card-title">${p.label}</div>
      <div class="cat-card-desc">${p.items}</div>
      <div class="cat-card-count">${p.count}</div>`;
    grid.appendChild(a);
  });
})();
