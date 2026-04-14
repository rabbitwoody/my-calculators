/* ============================================
   CalcHub — Головний файл скриптів
   Підключається на КОЖНІЙ сторінці сайту
   ============================================ */

/* ===== МОВНИЙ ПЕРЕМИКАЧ ===== */
function switchLang(lang) {
  localStorage.setItem('lang', lang);
  // Замінюємо /uk/ або /ru/ в поточному URL
  const newPath = window.location.pathname.replace(/^\/(uk|ru)/, '/' + lang);
  window.location.href = newPath + window.location.search;
}

// Підсвічуємо активну кнопку мови при завантаженні
document.addEventListener('DOMContentLoaded', function() {
  const currentLang = window.location.pathname.startsWith('/ru') ? 'ru' : 'uk';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
});

/* ===== БУРГЕР МЕНЮ ===== */
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('burger');
  nav.classList.toggle('open');
  burger.classList.toggle('open');
}

// Закрити меню при кліку поза ним
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('burger');
  if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target)) {
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
      // Закрити всі
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Відкрити поточний якщо був закритий
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ===== ФОРМАТУВАННЯ ЧИСЕЛ ===== */
// 1234567 → "1 234 567"
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// "1 234 567" → 1234567
function parseNumber(str) {
  return parseFloat(str.replace(/\s/g, '').replace(',', '.')) || 0;
}

// Форматування валюти
function formatCurrency(num, currency) {
  currency = currency || 'UAH';
  const symbols = { UAH: '₴', USD: '$', EUR: '€' };
  return (symbols[currency] || '') + ' ' + formatNumber(num);
}

/* ===== АНІМАЦІЯ РЕЗУЛЬТАТУ ===== */
function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    element.textContent = formatNumber(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ===== ІНІЦІАЛІЗАЦІЯ ===== */
document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
});