/**
 * ThanniGo — Interactions & Animations
 * Main interactive logic for the landing page.
 */

'use strict';

/* ── Scroll Progress Bar ─────────────────────────── */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Scroll-shrink Navbar ────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });
})();

/* ── Mobile Nav Toggle ───────────────────────────── */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
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
    if (isOpen) { closeMenu(); }
    else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ── Smooth Scroll ───────────────────────────────── */
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

/* ── Intersection Observer — Scroll Reveals ──────── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  document.querySelectorAll('.problems-grid, .features-grid, .why-benefits, .contact-grid, .about-pillars, .download-features, .steps-flow, .stats-row').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal');
        child.style.transitionDelay = `${i * 80}ms`;
        observer.observe(child);
      }
    });
  });
})();

/* ── Feature Tabs ────────────────────────────────── */
(function () {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.feature-item').forEach((item, i) => {
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

/* ── Animated Counters ───────────────────────────── */
(function () {
  function animateCounter(el, duration = 1800, ease = t => 1 - Math.pow(1 - t, 3)) {
    const target = parseInt(el.dataset.count, 10);
    const original = el.textContent;
    const suffix = el.dataset.suffix || original.replace(/\d+/, '').trim();
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.round(ease(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const isHero = entry.target.classList.contains('hero-stat-number');
        animateCounter(
          entry.target,
          isHero ? 1500 : 1800,
          isHero ? t => 1 - Math.pow(1 - t, 2.5) : t => 1 - Math.pow(1 - t, 3)
        );
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count]').forEach(counter => counterObserver.observe(counter));
})();

/* ── Active Nav Link on Scroll ───────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('nav-active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/* ── Back to Top ─────────────────────────────────── */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Hero Particle Canvas ────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width = hero ? hero.offsetWidth : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function Particle() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a = Math.random() * 0.5 + 0.15;
      this.hue = Math.random() > 0.5 ? '0,119,182' : '72,202,228';
    };
    this.reset();
  }

  function init() {
    resize();
    particles = Array.from({ length: 70 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  draw();
})();

/* ── Steps Active Highlight ──────────────────────── */
(function () {
  const fill = document.getElementById('steps-fill');
  const steps = document.querySelectorAll('.step[data-step]');
  if (!fill || !steps.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const n = parseInt(entry.target.dataset.step, 10);
        fill.style.width = ((n / steps.length) * 100) + '%';
        steps.forEach((s, i) => s.classList.toggle('step-active', i < n));
      }
    });
  }, { threshold: 0.6 });

  steps.forEach(s => obs.observe(s));
})();

/* ── Social link hover colors ────────────────────── */
(function () {
  const hoverMap = {
    instagram: { color: '#E1306C', border: '#E1306C', bg: 'rgba(225,48,108,0.12)' },
    twitter: { color: '#1DA1F2', border: '#1DA1F2', bg: 'rgba(29,161,242,0.12)' },
    linkedin: { color: '#0A66C2', border: '#0A66C2', bg: 'rgba(10,102,194,0.12)' },
    facebook: { color: '#1877F2', border: '#1877F2', bg: 'rgba(24,119,242,0.12)' },
    whatsapp: { color: '#25D366', border: '#25D366', bg: 'rgba(37,211,102,0.12)' },
    youtube: { color: '#FF0000', border: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
  };
  document.querySelectorAll('[class*="social-link"]').forEach(el => {
    const cls = Array.from(el.classList).find(c => hoverMap[c]);
    if (!cls) return;
    const { color, border, bg } = hoverMap[cls];
    el.addEventListener('mouseenter', () => {
      el.style.color = color;
      el.style.borderColor = border;
      el.style.background = bg;
      el.style.transform = 'translateY(-3px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.color = '';
      el.style.borderColor = '';
      el.style.background = '';
      el.style.transform = '';
    });
  });
})();
