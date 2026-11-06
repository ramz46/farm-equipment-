/**
 * AVITECH POULTRY EQUIPMENT - MAIN CONTROLLER
 * Navigation, Mobile Drawer, Accordions, Tabs, Search & Back-to-Top
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STICKY NAVBAR SCROLL BEHAVIOR
     -------------------------------------------------------------------------- */
  function initStickyNavbar() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  function initMobileDrawer() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close-btn');

    if (!hamburgerBtn || !drawer) return;

    function openDrawer() {
      hamburgerBtn.classList.add('active');
      drawer.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('active');
      drawer.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }

    hamburgerBtn.addEventListener('click', () => {
      drawer.classList.contains('active') ? closeDrawer() : openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Mobile submenu toggle
    const dropdownToggles = drawer.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('active');
          const icon = toggle.querySelector('.mobile-chevron');
          if (icon) {
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK HIGHLIGHTING
     -------------------------------------------------------------------------- */
  function highlightActiveNavLink() {
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === pageName || (pageName === '' && href === 'index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. FAQ ACCORDION LOGIC
     -------------------------------------------------------------------------- */
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(acc => {
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close other accordion items if in single-expand mode
          items.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
          });

          // Toggle current
          item.classList.toggle('active', !isActive);
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. TAB SWITCHER SYSTEM
     -------------------------------------------------------------------------- */
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tabs-group]');

    tabGroups.forEach(group => {
      const tabButtons = group.querySelectorAll('.tab-btn');
      const tabPanes = group.querySelectorAll('.tab-pane');

      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTabId = btn.getAttribute('data-tab-target');

          tabButtons.forEach(b => b.classList.remove('active'));
          tabPanes.forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          const targetPane = group.querySelector(`#${targetTabId}`);
          if (targetPane) targetPane.classList.add('active');
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. PRODUCT GALLERY THUMBNAIL SWITCHER
     -------------------------------------------------------------------------- */
  function initProductGallery() {
    const mainImg = document.getElementById('p-detail-main-img');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.getAttribute('data-full-img') || thumb.getAttribute('src');
        if (newSrc) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 200);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. HEADER SEARCH OVERLAY
     -------------------------------------------------------------------------- */
  function initHeaderSearch() {
    const searchOpenBtn = document.querySelector('.header-search-open-btn');
    const searchModal = document.getElementById('header-search-modal');
    if (!searchOpenBtn || !searchModal) return;

    const closeBtn = searchModal.querySelector('.modal-close-btn');
    const input = searchModal.querySelector('.header-search-modal-input');

    function openSearch() {
      searchModal.classList.add('active');
      document.body.classList.add('drawer-open');
      setTimeout(() => { if (input) input.focus(); }, 150);
    }

    function closeSearch() {
      searchModal.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }

    searchOpenBtn.addEventListener('click', openSearch);
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    // Form submit redirects to products.html?q=...
    const form = searchModal.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input ? input.value.trim() : '';
        if (val) {
          window.location.href = `products.html?q=${encodeURIComponent(val)}`;
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     8. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     9. SMOOTH ANCHOR LINK SCROLLING WITH STICKY HEADER OFFSET
     -------------------------------------------------------------------------- */
  function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        try {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 20);

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            if (history.pushState) {
              history.pushState(null, null, targetId);
            }
          }
        } catch (err) {
          // If selector syntax was invalid, fallback to default behavior
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initMobileDrawer();
    highlightActiveNavLink();
    initAccordions();
    initTabs();
    initProductGallery();
    initHeaderSearch();
    initBackToTop();
    initSmoothAnchorScroll();
  });
})();
