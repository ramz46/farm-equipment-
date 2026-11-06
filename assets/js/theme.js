/**
 * AVITECH POULTRY EQUIPMENT - THEME & RTL MANAGER
 * Manages Dark/Light Mode and LTR/RTL Layout Switching
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'avitech-theme';
  const DIR_STORAGE_KEY = 'avitech-dir';

  // Initialize Theme
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeToggleIcons(initialTheme);
  }

  // Toggle Theme
  window.toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateThemeToggleIcons(nextTheme);

    // Trigger visual toast
    if (window.showToast) {
      window.showToast('Theme Updated', `Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'palette');
    }
  };

  // Update Theme Toggle Button Icons
  function updateThemeToggleIcons(theme) {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Initialize RTL / LTR Direction
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRtlButtonText(savedDir);
  }

  // Toggle RTL / LTR
  window.toggleDirection = function () {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem(DIR_STORAGE_KEY, nextDir);
    updateRtlButtonText(nextDir);

    if (window.showToast) {
      window.showToast('Direction Switched', `Layout set to ${nextDir.toUpperCase()}`, 'globe');
    }
  };

  function updateRtlButtonText(dir) {
    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
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
      btn.addEventListener('click', window.toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', window.toggleDirection);
    });
  });
})();
