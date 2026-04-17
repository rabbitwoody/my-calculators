/* ============================================
   CalcHub — Головний файл скриптів
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
});

/* ===== БУРГЕР МЕНЮ ===== */
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('burger');
  if (nav) nav.classList.toggle('open');
  if (burger) burger.classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('burger');
  if (!nav || !burger) return;
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
    burger.classList.remove('open');
  }
});

/* ===== FAQ АКОРДЕОН ===== */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ===== ФОРМАТУВАННЯ ЧИСЕЛ ===== */
function formatNumber(num) {
  if (isNaN(num)) return '0';
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function parseNumber(str) {
  return parseFloat(String(str).replace(/\s/g, '').replace(',', '.')) || 0;
}

function formatCurrency(num, currency) {
  currency = currency || 'UAH';
  const symbols = { UAH: '₴', USD: '$', EUR: '€' };
  return (symbols[currency] || '') + ' ' + formatNumber(num);
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatNumber(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}