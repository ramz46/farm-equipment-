/**
 * AVITECH POULTRY SYSTEMS - PREMIUM ANIMATIONS ENGINE
 * Fluid Page Transitions, Ultra-Smooth Scroll, Staggered Reveals, Micro-interactions
 */

(function () {
  'use strict';

  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. SEAMLESS PAGE TRANSITION CONTROLLER
     -------------------------------------------------------------------------- */
  function initPageTransitions() {
    // Inject progress bar and curtain if not present
    let progressBar = document.getElementById('page-transition-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'page-transition-bar';
      document.body.appendChild(progressBar);
    }

    let curtain = document.querySelector('.page-transition-curtain');
    if (!curtain) {
      curtain = document.createElement('div');
      curtain.className = 'page-transition-curtain';
      document.body.appendChild(curtain);
    }

    // Mark body loaded smoothly
    requestAnimationFrame(() => {
      document.body.classList.add('page-loaded');
      progressBar.classList.add('complete');
      setTimeout(() => {
        progressBar.classList.remove('loading', 'complete');
        progressBar.style.width = '0%';
      }, 400);
    });

    // Handle browser back/forward navigation cache (bfcache)
    window.addEventListener('pageshow', (event) => {
      document.body.classList.remove('page-exiting');
      document.body.classList.add('page-loaded');
      if (progressBar) {
        progressBar.classList.remove('loading');
        progressBar.classList.add('complete');
        setTimeout(() => {
          progressBar.classList.remove('complete');
          progressBar.style.width = '0%';
        }, 300);
      }
    });

    if (isReducedMotion) return;

    // Intercept internal links for seamless transition
    document.addEventListener('click', (e) => {
      // Find closest anchor tag
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');

      // Ignore conditions:
      // 1. Missing href or javascript pseudo-protocol
      if (!href || href.startsWith('javascript:') || href.startsWith('#')) return;

      // 2. Mailto, tel, or external protocol
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // 3. Target is _blank or modifier keys pressed
      if (link.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // 4. External domain
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin) return;
      } catch (err) {
        return;
      }

      // Valid internal transition target
      e.preventDefault();

      // Start transition animation
      progressBar.classList.remove('complete');
      progressBar.classList.add('loading');
      document.body.classList.add('page-exiting');

      // Navigate after fluid exit
      setTimeout(() => {
        window.location.href = link.href;
      }, 240);
    });
  }

  /* --------------------------------------------------------------------------
     2. SCROLL READING PROGRESS BAR
     -------------------------------------------------------------------------- */
  function initScrollProgressBar() {
    let scrollBar = document.getElementById('scroll-progress-bar');
    if (!scrollBar) {
      scrollBar = document.createElement('div');
      scrollBar.id = 'scroll-progress-bar';
      document.body.appendChild(scrollBar);
    }

    let ticking = false;

    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }, { passive: true });

    updateScrollProgress();
  }

  /* --------------------------------------------------------------------------
     3. INTERSECTION OBSERVER SCROLL REVEALS
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    // Auto-decorate key sections if not already decorated
    document.querySelectorAll('.section-header:not(.reveal-up)').forEach(el => el.classList.add('reveal-up'));
    document.querySelectorAll('.footer-col:not(.reveal-up)').forEach((el, idx) => {
      el.classList.add('reveal-up');
      el.style.transitionDelay = `${idx * 0.08}s`;
    });

    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-stagger'
    );

    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window) || isReducedMotion) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Trigger number counters inside
          const counters = entry.target.querySelectorAll('.stat-counter');
          counters.forEach(counter => animateCounter(counter));

          // Unobserve to free up observer memory
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     4. ANIMATED STATISTICS COUNTERS
     -------------------------------------------------------------------------- */
  function animateCounter(counter) {
    if (counter.classList.contains('counted')) return;
    counter.classList.add('counted');

    const target = parseFloat(counter.getAttribute('data-target')) || 0;
    const duration = isReducedMotion ? 10 : 2000; // 2 seconds
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out expo curve for organic slowdown
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * target;

      if (isDecimal) {
        counter.textContent = currentVal.toFixed(1);
      } else {
        counter.textContent = Math.floor(currentVal).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
      }
    }

    requestAnimationFrame(updateNumber);
  }

  function initCountersObserver() {
    const counters = document.querySelectorAll('.stat-counter:not(.counted)');
    if (!counters.length) return;

    if (isReducedMotion) {
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target')) || 0;
        counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString();
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /* --------------------------------------------------------------------------
     5. SUBTLE PARALLAX ON SCROLL (Desktop only)
     -------------------------------------------------------------------------- */
  function initParallax() {
    if (isReducedMotion || window.innerWidth < 992) return;

    const heroActiveBg = document.querySelector('.hero-slide.active .hero-slide-bg');
    const pageHero = document.querySelector('.page-hero');
    const floatBadges = document.querySelectorAll('.floating-experience-badge');

    if (!heroActiveBg && !pageHero && !floatBadges.length) return;

    let ticking = false;

    function applyParallax() {
      const scrollY = window.scrollY;

      // Subtle parallax on hero background (only while in initial viewport)
      if (scrollY < window.innerHeight) {
        const bg = document.querySelector('.hero-slide.active .hero-slide-bg');
        if (bg) {
          bg.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0) scale(1.08)`;
        }
        if (pageHero) {
          pageHero.style.backgroundPositionY = `${scrollY * 0.25}px`;
        }
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     6. BUTTON RIPPLE & CLICK WAVES
     -------------------------------------------------------------------------- */
  function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');

    buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.className = 'btn-ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. INITIALIZATION
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
    initScrollProgressBar();
    initScrollAnimations();
    initCountersObserver();
    initParallax();
    initButtonRipples();
  });
})();
