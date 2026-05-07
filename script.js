/* ────────────────────────────────────────────────────────────
   ThanniGo Landing Page — Interactions & Animations
   ──────────────────────────────────────────────────────────── */

'use strict';

/* ── Scroll-shrink Navbar ─────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
})();

/* ── Mobile Nav Toggle ────────────────────────────────────── */
(function () {
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ── Smooth Scroll for Anchor Links ──────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Intersection Observer — Scroll Reveals ──────────────── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal').forEach((el, index) => {
    observer.observe(el);
  });

  /* Stagger children within reveal containers */
  document.querySelectorAll('.problems-grid, .features-grid, .why-benefits, .contact-grid, .about-pillars').forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, i) => {
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal');
        child.style.transitionDelay = `${i * 80}ms`;
        observer.observe(child);
      }
    });
  });
})();

/* ── Feature Tabs ─────────────────────────────────────────── */
(function () {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-panel');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');

        /* Animate items into view */
        const items = targetPanel.querySelectorAll('.feature-item');
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.transition = 'opacity 300ms ease, transform 300ms ease';
              item.style.transitionDelay = `${i * 50}ms`;
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          });
        });
      }
    });
  });
})();

/* ── Animated Counters ────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix ?? '';
    const duration = 1800;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutCubic(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
})();

/* ── Hero Stats (separate counter for hero section) ──────── */
(function () {
  const heroStats = document.querySelectorAll('.hero-stat-number[data-count]');
  if (!heroStats.length) return;

  function animateHeroStat(el) {
    const target   = parseInt(el.dataset.count, 10);
    const original = el.textContent;
    const suffix   = original.replace(/\d+/, '').trim();
    const duration = 1500;
    const startTime = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 2.5); }

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateHeroStat(entry.target);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  heroStats.forEach(stat => heroObserver.observe(stat));
})();

/* ── Active Nav Link on Scroll ────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--color-primary-light)';
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
