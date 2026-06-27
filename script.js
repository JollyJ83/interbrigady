/* ═══════════════════════════════════════════════════════════════
   ИНТЕРБРИГАДЫ — script.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── NAVBAR: scroll + burger ────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Закрыть меню при клике на ссылку
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ─── REVEAL ON SCROLL ───────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Небольшая задержка для каскадного появления
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
})();

/* ─── СЧЁТЧИКИ СТАТИСТИКИ ────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-card__num[data-target]');
  if (!counters.length) return;

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.round(eased * target);
      el.textContent = value.toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();

/* ─── КОПИРОВАНИЕ РЕКВИЗИТОВ ─────────────────────────────────── */
(function () {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy');
      const sourceEl = document.getElementById(targetId);
      if (!sourceEl) return;

      const text = sourceEl.textContent.trim();

      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Скопировано ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback для браузеров без clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Скопировано ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Скопировать';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
})();

/* ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
        });
        const activeLink = document.querySelector(`.navbar__nav a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.style.color = 'var(--color-gold)';
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
})();
