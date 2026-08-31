/* ── Tab switching ─────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
  });
});

/* ── Gallery thumbnails ────────────────────── */
document.getElementById('thumbs').addEventListener('click', e => {
  const thumb = e.target.closest('.gallery-thumb');
  if (!thumb) return;
  document.querySelectorAll('.gallery-thumb').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-current', 'false');
  });
  thumb.classList.add('active');
  thumb.setAttribute('aria-current', 'true');

  const main = document.getElementById('gallery-main-img');
  const full = thumb.dataset.full;
  if (main && full) main.src = full;
});

/* ── Related products data ─────────────────── */
const EX = { cond:'Отличное', cls:'cond-ex' };
const GD = { cond:'Хорошее',  cls:'cond-gd' };

const PH = `<svg width="42" height="42" viewBox="0 0 48 48" fill="none"><rect x="4" y="10" width="40" height="28" rx="5" stroke="#b8c5de" stroke-width="2.5"/><circle cx="24" cy="24" r="8" stroke="#b8c5de" stroke-width="2.5"/></svg>`;

const SIMILAR = [
  { name:'Капот в сборе', donor:'Kia Sportage · 2018', price:'11 200 ₽', ...EX },
  { name:'Капот в сборе', donor:'VW Tiguan · 2017',    price:'12 800 ₽', ...GD },
  { name:'Капот в сборе', donor:'Hyundai Tucson · 2020', price:'13 400 ₽', ...EX },
  { name:'Капот в сборе', donor:'Toyota Camry · 2016', price:'10 600 ₽', ...GD },
];

const DONOR = [
  { group:'Оптика',    name:'Фара правая',           price:'7 100 ₽',  ...EX },
  { group:'Кузовные',  name:'Бампер передний',       price:'9 800 ₽',  ...GD },
  { group:'Кузовные',  name:'Крыло переднее левое',  price:'6 400 ₽',  ...EX },
  { group:'Трансмиссия', name:'АКПП в сборе',        price:'52 000 ₽', ...GD },
];

/* Фото для карточек «похожие» — по группе детали */
const GROUP_IMG = {
  'Оптика':'optics', 'Двигатель':'engine', 'Стёкла':'glass', 'Салон':'interior',
  'Кузовные':'body', 'Топливная':'fuel', 'Шины и диски':'wheels', 'Трансмиссия':'transmission',
};
/* Шкала состояния: 3 деления, при наведении раскрывается словом.
   На тач-устройствах наведения нет — слово дублируется в title/aria-label. */
function condPill(p) {
  return `<span class="prod-cond ${p.cls}" title="Состояние: ${p.cond.toLowerCase()}" aria-label="Состояние: ${p.cond.toLowerCase()}">
        <span class="cond-bars" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="cond-label" aria-hidden="true">${p.cond}</span>
      </span>`;
}

function smallImg(p) {
  const slug = GROUP_IMG[p.group];
  if (!slug) return `<div class="prod-img-ph prod-img-ph--sm">${PH}</div>`;
  return `<img src="images/parts/${slug}.webp" alt="${p.name}" class="prod-img-photo prod-img-ph--sm"
    width="1200" height="600" loading="lazy" decoding="async">`;
}

function smallCard(p, showGroup) {
  return `<a href="product.html" class="prod-card">
    <div class="prod-img">
      ${smallImg(p)}
      <div class="prod-img-actions">
        ${condPill(p)}
        <button class="prod-fav" aria-label="В избранное" onclick="event.preventDefault()">♡</button>
      </div>
    </div>
    <div class="prod-body">
      ${showGroup ? `<div class="prod-group">${p.group}</div>` : ''}
      <div class="prod-name prod-name--auto">${p.name}</div>
      ${p.donor ? `<div class="prod-donor">${p.donor}</div>` : ''}
      <div class="prod-footer prod-footer--top">
        <div class="prod-price">${p.price}</div>
        <button class="prod-cart" onclick="event.preventDefault()">В корзину</button>
      </div>
    </div>
  </a>`;
}

document.getElementById('related-same-part').innerHTML = SIMILAR.map(p => smallCard(p, false)).join('');
document.getElementById('related-donor').innerHTML = DONOR.map(p => smallCard(p, true)).join('');
