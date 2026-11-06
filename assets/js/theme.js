/**
 * AVITECH POULTRY EQUIPMENT - THEME & RTL MANAGER
 * Manages Dark/Light Mode and LTR/RTL Layout Switching
 * Lite Mode -> Sun Icon (☀️)
 * Dark Mode -> Moon Icon (🌙)
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'avitech-theme';
  const DIR_STORAGE_KEY = 'avitech-dir';

  // Apply saved theme and direction immediately to prevent flash
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
  } catch (e) {}

  // Initialize Theme
  function initTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeToggleIcons(currentTheme);
  }

  let isSwitchingTheme = false;
  // Toggle Theme
  window.toggleTheme = function () {
    if (isSwitchingTheme) return;
    isSwitchingTheme = true;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // 1. Trigger icon spin animation on all theme buttons
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => btn.classList.add('btn-spin'));

    // 2. Set theme attribute and save to localStorage
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) {}

    // 3. Update all button icons and titles
    updateThemeToggleIcons(nextTheme);

    // 4. Custom event for listeners
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: nextTheme } }));

    setTimeout(() => {
      themeButtons.forEach(btn => btn.classList.remove('btn-spin'));
      isSwitchingTheme = false;
    }, 400);

    // 5. Visual toast feedback
    if (window.showToast) {
      window.showToast(
        'Theme Updated',
        `Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`,
        nextTheme === 'dark' ? 'moon' : 'sun'
      );
    }
  };

  // Update Theme Toggle Button Icons & Labels
  // Lite Mode -> Sun Icon (☀️)
  // Dark Mode -> Moon Icon (🌙)
  function updateThemeToggleIcons(theme) {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Dark Mode Active (Click for Light Mode)');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Light Mode Active (Click for Dark Mode)');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }

      // If button has text (e.g. mobile drawer "Theme" or "Light/Dark Mode")
      const textSpan = btn.querySelector('.theme-text-label');
      if (textSpan) {
        textSpan.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
      } else {
        btn.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            node.textContent = theme === 'dark' ? ' Dark Mode' : ' Light Mode';
          }
        });
      }
    });
  }

  // Initialize RTL / LTR Direction
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRtlButtonText(savedDir);
  }

  let isSwitchingDir = false;
  // Toggle RTL / LTR
  window.toggleDirection = function () {
    if (isSwitchingDir) return;
    isSwitchingDir = true;

    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => btn.classList.add('btn-spin'));

    // 1. Temporarily freeze all transitions to prevent jarring horizontal visual jumps / flickering
    document.documentElement.classList.add('is-switching-dir');

    // 2. Close mobile drawer or cart drawer gracefully if open to prevent lateral teleportation
    const openDrawers = document.querySelectorAll('.mobile-drawer.active, .mobile-nav-drawer.active, .cart-drawer.active');
    openDrawers.forEach(drawer => drawer.classList.remove('active'));
    document.body.classList.remove('drawer-open');
    const openOverlays = document.querySelectorAll('.drawer-overlay.active, .cart-overlay.active');
    openOverlays.forEach(overlay => overlay.classList.remove('active'));

    // 3. Set the new direction attribute in the next frame
    requestAnimationFrame(() => {
      document.documentElement.setAttribute('dir', nextDir);
      try {
        localStorage.setItem(DIR_STORAGE_KEY, nextDir);
      } catch (e) {}
      updateRtlButtonText(nextDir);

      window.dispatchEvent(new CustomEvent('directionchange', { detail: { dir: nextDir } }));

      // 4. Cleanly unfreeze transitions after layout has settled
      setTimeout(() => {
        document.documentElement.classList.remove('is-switching-dir');
        rtlButtons.forEach(btn => btn.classList.remove('btn-spin'));
        isSwitchingDir = false;
      }, 90);
    });

    if (window.showToast) {
      window.showToast(
        'Direction Switched',
        `Layout set to ${nextDir.toUpperCase()} (${nextDir === 'rtl' ? 'Right-to-Left' : 'Left-to-Right'})`,
        'globe'
      );
    }
  };

  function updateRtlButtonText(dir) {
    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-text-label');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      } else {
        btn.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            node.textContent = dir === 'rtl' ? ' LTR' : ' RTL';
          }
        });
      }
      btn.setAttribute('title', dir === 'rtl' ? 'RTL Layout Active (Click for LTR)' : 'LTR Layout Active (Click for RTL)');
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  // Attach event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();

    // Listen for system theme changes if user hasn't explicitly chosen
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          updateThemeToggleIcons(newTheme);
        }
      });
    }

    // Attach click handlers to any theme/RTL buttons in DOM
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleDirection();
      });
    });
  });
})();
