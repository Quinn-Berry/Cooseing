/* ==========================================================
   COOSEING — main.js
   Vanilla JS. IntersectionObserver for reveals + counters.
   ========================================================== */

(function () {
  'use strict';

  /* Always land at the top of the page on load/refresh.
     Preserves in-page anchor links (they still scroll to their target). */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Page load intro ---------- */
  window.addEventListener('load', () => {
    const intro = $('#intro');
    const hero = $('.hero');
    setTimeout(() => {
      if (intro) intro.classList.add('is-hidden');
      if (hero) hero.classList.add('is-loaded');
      // Reveal nav after intro
      setTimeout(() => $('#nav')?.classList.add('is-visible'), 400);
    }, 1100);
  });

  /* ---------- Nav: hide on hero, show after scroll, style on scroll ---------- */
  const nav = $('#nav');
  const hero = $('.hero');
  const onScroll = () => {
    if (!nav) return;
    const y = window.scrollY;
    const heroHeight = hero ? hero.offsetHeight : 0;
    if (y > heroHeight * 0.6) {
      nav.classList.add('is-visible', 'is-scrolled');
    } else if (y > 80) {
      nav.classList.add('is-visible');
      nav.classList.remove('is-scrolled');
    } else {
      // Keep visible if already revealed (after intro), but remove scrolled styling
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = $('#navToggle');
  const mobileMenu = $('#mobileMenu');
  const toggleMenu = (open) => {
    const isOpen = open ?? !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  navToggle?.addEventListener('click', () => toggleMenu());
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') toggleMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---------- Counter animation ---------- */
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.round(easeOut(p) * target);
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  $$('[data-count]').forEach((el) => counterObserver.observe(el));

  /* ---------- Hero parallax (subtle) ---------- */
  const heroBgImg = $('.hero__bg img');
  if (heroBgImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const y = window.scrollY;
            const heroH = hero?.offsetHeight || 1;
            if (y < heroH) {
              // subtle: move image at 0.3x the scroll
              heroBgImg.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1)`;
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Close mobile menu on resize up ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && mobileMenu?.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
})();
