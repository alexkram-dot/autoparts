/* ════════════════════════════════════════════════
   Авторазборка23 — Shared JS
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Nav scroll shadow ─────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Elements ──────────────────────────────── */
  const scrim        = document.getElementById('scrim');
  const drawer       = document.getElementById('drawer');
  const drawerClose  = document.getElementById('drawer-close');
  const navBurger    = document.querySelector('.nav-burger');
  const pickerDrop   = document.querySelector('.picker-drop');
  const pickerSheet  = document.getElementById('picker-sheet');

  /* ── State ──────────────────────────────────── */
  let drawerOpen = false;
  let pickerOpen = false;

  /* ── Lock/unlock scroll ─────────────────────── */
  function lockScroll()   { document.body.style.overflow = 'hidden'; }
  function unlockScroll() { document.body.style.overflow = ''; }

  /* ── Drawer ─────────────────────────────────── */
  function openDrawer() {
    if (!drawer) return;
    drawerOpen = true;
    drawer.classList.add('open');
    scrim?.classList.add('visible');
    lockScroll();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawerOpen = false;
    drawer.classList.remove('open');
    if (!pickerOpen) {
      scrim?.classList.remove('visible');
      unlockScroll();
    }
  }

  navBurger   ?.addEventListener('click', openDrawer);
  drawerClose ?.addEventListener('click', closeDrawer);

  /* ── Picker ─────────────────────────────────── */
  function openPicker() {
    pickerOpen = true;
    if (window.innerWidth <= 768) {
      pickerSheet?.classList.add('open');
      scrim?.classList.add('visible');
      lockScroll();
    } else {
      pickerDrop?.classList.add('open');
    }
  }
  function closePicker() {
    pickerOpen = false;
    pickerDrop  ?.classList.remove('open');
    pickerSheet ?.classList.remove('open');
    if (!drawerOpen) {
      scrim?.classList.remove('visible');
      unlockScroll();
    }
  }
  function togglePicker() {
    pickerOpen ? closePicker() : openPicker();
  }

  /* Close on scrim tap */
  scrim?.addEventListener('click', () => {
    closeDrawer();
    closePicker();
  });

  /* Wire up all open/close triggers */
  document.querySelectorAll('[data-picker-open]')
    .forEach(el => el.addEventListener('click', togglePicker));
  document.querySelectorAll('[data-picker-close]')
    .forEach(el => el.addEventListener('click', closePicker));

  /* Expose for page scripts */
  window.AR23 = { openPicker, closePicker, togglePicker, openDrawer, closeDrawer };

  /* ── Smooth-scroll anchor links ─────────────── */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (target) {
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  /* ── Bottom tab "Поиск" opens picker ────────── */
  document.querySelectorAll('[data-tab="search"]')
    .forEach(el => el.addEventListener('click', openPicker));

})();
