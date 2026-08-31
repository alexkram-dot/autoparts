/* ── Режим работы: открыто ли сейчас ──────────
   Считается от локального времени посетителя. Часы одни на все дни,
   поэтому таблица дней не нужна — при переходе на разное расписание
   по дням замените OPEN/CLOSE на массив по getDay(). */
(() => {
  'use strict';

  const OPEN = 9;    // час открытия
  const CLOSE = 21;  // час закрытия

  const state = document.getElementById('hours-state');
  const dot   = document.getElementById('hours-dot');
  if (!state || !dot) return;

  function render() {
    const now = new Date();
    const h = now.getHours();
    const open = h >= OPEN && h < CLOSE;

    dot.classList.toggle('is-open', open);
    dot.classList.toggle('is-closed', !open);

    if (open) {
      const left = CLOSE - h - 1;
      state.textContent = left >= 1
        ? `Сейчас открыто — до ${CLOSE}:00`
        : 'Сейчас открыто — закрываемся в течение часа';
    } else {
      state.textContent = h < OPEN
        ? `Сейчас закрыто — откроется в ${OPEN}:00`
        : `Сейчас закрыто — откроется завтра в ${OPEN}:00`;
    }
  }

  render();
  setInterval(render, 60_000);   // обновляем раз в минуту
})();
