/* Отзывы: фильтрация, пагинация, форма */
(() => {
  'use strict';

  const REVIEWS = [
    {
      "name": "Сергей М.",
      "car": "Toyota RAV4, 2016",
      "part": "капот",
      "rating": 5,
      "date": "12.08.2026",
      "text": "Искал капот в цвет — нашли за день, прислали фото с трёх ракурсов и указали небольшую вмятину под кромкой. По факту всё совпало. Отправили СДЭКом в тот же день, дошло за трое суток. Красить не пришлось, попали в оттенок."
    },
    {
      "name": "Алина К.",
      "car": "Kia Sportage, 2019",
      "part": "фара левая",
      "rating": 5,
      "date": "04.08.2026",
      "text": "Заказывала фару, сомневалась в состоянии стекла. Менеджер сам предложил снять видео при свете — видно, что помутнений нет. Приехала целая, упакована хорошо: пузырчатка и жёсткий короб."
    },
    {
      "name": "Дмитрий В.",
      "car": "Volkswagen Tiguan, 2014",
      "part": "бампер передний",
      "rating": 4,
      "date": "28.07.2026",
      "text": "Бампер пришёл с более заметной потёртостью, чем на фото. Написал в поддержку — сделали скидку 2 000 ₽, оставил себе, потому что всё равно под покраску. Осадок остался, но вопрос решили быстро.",
      "reply": "Дмитрий, спасибо за честный отзыв. Добавили в регламент обязательное фото при боковом свете — так дефекты лакокрасочного видно лучше."
    },
    {
      "name": "Игорь П.",
      "car": "BMW X3, 2013",
      "part": "АКПП",
      "rating": 5,
      "date": "19.07.2026",
      "text": "Брал коробку — самый рискованный узел. Показали видео проверки на стенде, дали 14 дней. Установили на СТО, отработала месяц без нареканий. Отдельное спасибо за подбор по VIN, сам бы запутался в модификациях."
    },
    {
      "name": "Марина Л.",
      "car": "Hyundai Solaris, 2017",
      "part": "сиденье переднее",
      "rating": 5,
      "date": "11.07.2026",
      "text": "Нужна была водительская сидушка без разрывов. Прислали фото всех имеющихся вариантов на выбор — выбрала лучшую. Цена вышла втрое ниже новой."
    }
  ];

  const PER_PAGE = 3;
  let filter = 'Все';
  let page = 1;

  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  function matches(r) {
    if (filter === '5 звёзд')  return r.rating === 5;
    if (filter === '4 и ниже') return r.rating <= 4;
    if (filter === 'С ответом') return Boolean(r.reply);
    return true;
  }

  function card(r) {
    const reply = r.reply ? `
        <div class="review-reply">
          <div class="review-reply-icon" aria-hidden="true">А</div>
          <div>
            <div class="review-reply-name">Ответ Авторазборка23</div>
            <p class="review-reply-text">${esc(r.reply)}</p>
          </div>
        </div>` : '';
    return `<article class="review-card">
        <div class="review-hdr">
          <div class="review-avatar" aria-hidden="true">${esc(r.name.charAt(0))}</div>
          <div class="review-who">
            <div class="review-name">${esc(r.name)}</div>
            <div class="review-car">${esc(r.car)} · ${esc(r.part)}</div>
          </div>
          <div class="review-meta">
            <div class="stars" aria-label="Оценка ${r.rating} из 5">${stars(r.rating)}</div>
            <div class="review-date">${esc(r.date)}</div>
          </div>
        </div>
        <p class="review-text">${esc(r.text)}</p>${reply}
      </article>`;
  }

  function render() {
    const list = REVIEWS.filter(matches);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (page > pages) page = pages;

    const slice = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const el = document.getElementById('review-list');
    el.innerHTML = slice.length
      ? slice.map(card).join('')
      : '<p class="review-empty">По этому фильтру отзывов пока нет.</p>';

    const nav = document.getElementById('review-pagination');
    if (pages < 2) { nav.innerHTML = ''; return; }
    let html = `<button class="page-btn" data-page="${page - 1}"${page === 1 ? ' disabled' : ''}>← Назад</button>`;
    for (let i = 1; i <= pages; i++) {
      html += `<button class="page-btn${i === page ? ' active' : ''}" data-page="${i}"${i === page ? ' aria-current="page"' : ''}>${i}</button>`;
    }
    html += `<button class="page-btn" data-page="${page + 1}"${page === pages ? ' disabled' : ''}>Вперёд →</button>`;
    nav.innerHTML = html;
  }

  /* Filters */
  document.getElementById('review-filters').addEventListener('click', e => {
    const btn = e.target.closest('.gchip');
    if (!btn) return;
    document.querySelectorAll('#review-filters .gchip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    page = 1;
    render();
  });

  /* Pagination */
  document.getElementById('review-pagination').addEventListener('click', e => {
    const btn = e.target.closest('.page-btn');
    if (!btn || btn.disabled) return;
    page = Number(btn.dataset.page);
    render();
    document.getElementById('review-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* Star rating */
  const rating = document.getElementById('rating');
  let ratingValue = 5;
  function paintStars(n) {
    rating.querySelectorAll('.rating-star').forEach(s => {
      const v = Number(s.dataset.value);
      s.classList.toggle('on', v <= n);
      s.setAttribute('aria-checked', String(v === n));
    });
  }
  rating.addEventListener('click', e => {
    const star = e.target.closest('.rating-star');
    if (!star) return;
    ratingValue = Number(star.dataset.value);
    paintStars(ratingValue);
  });
  paintStars(ratingValue);

  /* Сброс звёзд после общей demo-отправки (main.js) */
  document.getElementById('review-form').addEventListener('demo:reset', () => {
    ratingValue = 5;
    paintStars(5);
  });

  render();
})();
