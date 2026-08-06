function submitFeedback(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Заявка отправлена ✓';
  btn.disabled = true;
  btn.style.opacity = '.85';
  setTimeout(() => { e.target.reset(); btn.textContent = 'Отправить заявку'; btn.disabled = false; btn.style.opacity = ''; }, 2500);
  return false;
}
