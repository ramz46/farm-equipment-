/**
 * AVITECH POULTRY EQUIPMENT - FORMS & VALIDATION SYSTEM
 * Form Validations, Equipment Quote Modal, Newsletter & Toast Feedback
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  window.showToast = function (title, message, iconType = 'check') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconHtml = '<i class="fa-solid fa-circle-check toast-icon"></i>';
    if (iconType === 'error') {
      iconHtml = '<i class="fa-solid fa-circle-exclamation toast-icon" style="color: #ef4444;"></i>';
    } else if (iconType === 'palette') {
      iconHtml = '<i class="fa-solid fa-circle-half-stroke toast-icon"></i>';
    } else if (iconType === 'globe') {
      iconHtml = '<i class="fa-solid fa-earth-americas toast-icon"></i>';
    }

    toast.innerHTML = `
      ${iconHtml}
      <div>
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  };

  /* --------------------------------------------------------------------------
     2. GLOBAL EQUIPMENT QUOTE REQUEST MODAL
     -------------------------------------------------------------------------- */
  function ensureQuoteModalExists() {
    let modal = document.getElementById('quote-request-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'quote-request-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 680px;">
        <button type="button" class="modal-close-btn" aria-label="Close modal">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div style="margin-bottom: 1.5rem;">
          <span class="section-tag"><i class="fa-solid fa-calculator"></i> Direct Commercial Pricing</span>
          <h2 style="font-size: 1.75rem; margin-top: 0.35rem;">Request Equipment Quotation</h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary);">Fill in your farm details and our agricultural engineers will prepare a technical proposal within 24 hours.</p>
        </div>
        <form id="global-quote-form" novalidate>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="quote-name">Full Name <span class="required">*</span></label>
              <input type="text" id="quote-name" name="name" class="form-control" placeholder="e.g. John Miller" required>
              <span class="form-error">Please enter your full name.</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="quote-email">Email Address <span class="required">*</span></label>
              <input type="email" id="quote-email" name="email" class="form-control" placeholder="john@farmname.com" required>
              <span class="form-error">Please enter a valid email address.</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="quote-phone">Phone / WhatsApp <span class="required">*</span></label>
              <input type="tel" id="quote-phone" name="phone" class="form-control" placeholder="+1 (555) 019-2834" inputmode="tel" autocomplete="tel" required>
              <span class="form-error">Please enter a valid phone number (numbers only, 7–15 digits).</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="quote-farm">Farm or Company Name <span class="required">*</span></label>
              <input type="text" id="quote-farm" name="farm_name" class="form-control" placeholder="Highland Poultry Farm LLC" required>
              <span class="form-error">Please enter your farm or business name.</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="quote-category">Equipment Category <span class="required">*</span></label>
              <select id="quote-category" name="category" class="form-control" required>
                <option value="">Select Category...</option>
                <option value="Poultry Feeders">Poultry Feeders</option>
                <option value="Poultry Cages">Poultry Cages</option>
                <option value="Egg Incubators">Egg Incubators</option>
                <option value="Drinking Systems">Drinking Systems</option>
                <option value="Brooding Equipment">Brooding Equipment</option>
                <option value="Ventilation Systems">Ventilation Systems</option>
                <option value="Farm Automation Equipment">Farm Automation Equipment</option>
                <option value="Turnkey Poultry House">Full Turnkey Poultry House</option>
              </select>
              <span class="form-error">Please select an equipment category.</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="quote-product">Specific Model / System</label>
              <input type="text" id="quote-product" name="product" class="form-control" placeholder="e.g. Pan Feeder Line (120m)">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="quote-capacity">Estimated Bird Capacity / Quantity</label>
              <input type="text" id="quote-capacity" name="capacity" class="form-control" placeholder="e.g. 20,000 Broilers or 4 Lines">
            </div>
            <div class="form-group">
              <label class="form-label" for="quote-location">Farm Location / Country <span class="required">*</span></label>
              <input type="text" id="quote-location" name="location" class="form-control" placeholder="City, State / Country" required>
              <span class="form-error">Please specify your delivery location.</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="quote-message">Project Notes / Requirements</label>
            <textarea id="quote-message" name="message" class="form-control" rows="3" placeholder="Describe shed dimensions, power voltage (e.g. 380V/220V), or installation timeline..."></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-outline modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">
              Submit Quotation Request <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close-btn');
    const cancelBtn = modal.querySelector('.modal-cancel-btn');
    closeBtn.addEventListener('click', closeQuoteModal);
    cancelBtn.addEventListener('click', closeQuoteModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuoteModal();
    });

    // Form submit handler
    const form = modal.querySelector('#global-quote-form');
    form.addEventListener('submit', handleQuoteFormSubmit);

    // Real-time clearance of is-invalid for modal inputs
    form.querySelectorAll('.form-control').forEach(input => {
      const clearError = () => {
        if (!input.classList.contains('is-invalid')) return;
        if (input.type === 'email') {
          if (validateEmail(input.value.trim())) input.classList.remove('is-invalid');
        } else if (input.type === 'tel' || input.name === 'phone') {
          if (validatePhone(input.value.trim())) input.classList.remove('is-invalid');
        } else if (input.value.trim().length > 0) {
          input.classList.remove('is-invalid');
        }
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });

    // Attach phone restriction to quote phone input
    const quotePhoneInput = form.querySelector('#quote-phone');
    if (quotePhoneInput && window.setupPhoneInput) {
      window.setupPhoneInput(quotePhoneInput);
    }

    return modal;
  }

  window.openQuoteModal = function (productName = '', categoryName = '') {
    const modal = ensureQuoteModalExists();
    const productInput = modal.querySelector('#quote-product');
    const categorySelect = modal.querySelector('#quote-category');

    if (productInput && productName) {
      productInput.value = productName;
    }
    if (categorySelect && categoryName) {
      for (let i = 0; i < categorySelect.options.length; i++) {
        if (categorySelect.options[i].text.toLowerCase().includes(categoryName.toLowerCase())) {
          categorySelect.selectedIndex = i;
          break;
        }
      }
    }

    modal.classList.add('active');
    document.body.classList.add('drawer-open');
  };

  window.closeQuoteModal = function () {
    const modal = document.getElementById('quote-request-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  };

  function handleQuoteFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let isValid = true;

    // Validate inputs
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const val = input.value.trim();
      if (!val) {
        input.classList.add('is-invalid');
        isValid = false;
      } else if (input.type === 'email' && !validateEmail(val)) {
        input.classList.add('is-invalid');
        isValid = false;
      } else if ((input.type === 'tel' || input.name === 'phone') && !validatePhone(val)) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!isValid) return;

    const farmName = form.querySelector('#quote-farm').value;
    closeQuoteModal();
    form.reset();

    window.showToast(
      'Quote Request Received!',
      `Thank you, ${farmName}. Our engineering team is preparing your custom quote. Check your inbox shortly.`,
      'check'
    );
  }

  /* --------------------------------------------------------------------------
     3. CONTACT PAGE FORM VALIDATION (FOR INNER PAGES / INDEX-2 RAPID ENQUIRY)
     -------------------------------------------------------------------------- */
  function initContactPageForm() {
    const contactForm = document.getElementById('contact-page-form');
    if (!contactForm) return;
    if (document.getElementById('contact-success-state')) return; // Handled by enhanced contact handler in main.js

    // Real-time clearance of is-invalid on typing
    contactForm.querySelectorAll('.form-control').forEach(field => {
      const clearError = () => {
        if (!field.classList.contains('is-invalid')) return;
        if (field.type === 'email') {
          if (validateEmail(field.value.trim())) field.classList.remove('is-invalid');
        } else if (field.type === 'tel' || field.name === 'phone') {
          if (validatePhone(field.value.trim())) field.classList.remove('is-invalid');
        } else if (field.value.trim().length > 0) {
          field.classList.remove('is-invalid');
        }
      };
      field.addEventListener('input', clearError);
      field.addEventListener('change', clearError);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const val = field.value.trim();
        if (!val) {
          field.classList.add('is-invalid');
          isValid = false;
        } else if (field.type === 'email' && !validateEmail(val)) {
          field.classList.add('is-invalid');
          isValid = false;
        } else if ((field.type === 'tel' || field.name === 'phone') && !validatePhone(val)) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (!isValid) return;

      const nameField = contactForm.querySelector('[name="name"]');
      const senderName = nameField ? nameField.value : 'Customer';

      contactForm.reset();
      window.showToast(
        'Message Sent Successfully',
        `Thank you ${senderName}. Your message has reached our support desk. We will respond shortly.`,
        'check'
      );
    });
  }

  /* --------------------------------------------------------------------------
     4. NEWSLETTER FORMS
     -------------------------------------------------------------------------- */
  function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !validateEmail(emailInput.value)) {
          window.showToast('Invalid Email', 'Please enter a valid email address to subscribe.', 'error');
          return;
        }

        form.reset();
        window.showToast(
          'Subscribed to Farming Insights!',
          'You will receive our latest poultry equipment catalogs and farming management guides.',
          'check'
        );
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. GLOBAL VALIDATION HELPERS & PHONE INPUT RESTRICTION SYSTEM
     -------------------------------------------------------------------------- */
  window.validateEmail = function (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validateEmail = window.validateEmail;

  window.validatePhone = function (phone) {
    if (!phone) return false;
    const digits = String(phone).replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };
  const validatePhone = window.validatePhone;

  /**
   * Restricts any phone input to STRICT NUMBERS ONLY across the whole website.
   * Blocks alphabets (a-z, A-Z) and unallowed symbols on keydown, paste, and input.
   */
  window.setupPhoneInput = function (input) {
    if (!input || input.dataset.phoneRestricted === 'true') return;
    input.dataset.phoneRestricted = 'true';
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', 'tel');

    // 1. Block alphabets and illegal characters on keydown
    input.addEventListener('keydown', (e) => {
      // Allow navigation and edit controls
      const controlKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];
      if (controlKeys.includes(e.key)) return;

      // Allow standard Ctrl/Cmd shortcuts (Copy, Cut, Paste, Select All, Undo)
      if (e.ctrlKey || e.metaKey) return;

      // Allow digits 0-9
      if (/^[0-9]$/.test(e.key)) return;

      // Allow '+' ONLY as the very first character (position 0 and no '+' yet)
      if (e.key === '+') {
        const hasPlus = input.value.includes('+');
        const isAtStart = (input.selectionStart === 0);
        if (!hasPlus && isAtStart) return;
      }

      // Allow space, hyphen, parentheses
      if ([' ', '-', '(', ')'].includes(e.key)) return;

      // STRICTLY BLOCK ALL ALPHABETS (a-z, A-Z) AND ANY OTHER SYMBOLS
      e.preventDefault();
    });

    // 2. Real-time sanitize on input event (handles drag-and-drop, autofill, voice typing)
    input.addEventListener('input', () => {
      let val = input.value;
      // Strip any letters / alphabets immediately
      val = val.replace(/[a-zA-Z]/g, '');
      // Strip any illegal characters
      val = val.replace(/[^0-9+\s\-()]/g, '');

      // Ensure '+' only appears at index 0
      if (val.indexOf('+') > 0) {
        val = (val.charAt(0) === '+' ? '+' : '') + val.replace(/\+/g, '');
      }

      if (input.value !== val) {
        input.value = val;
      }

      // Real-time clearance of error when valid phone number is typed
      if (input.classList.contains('is-invalid') && validatePhone(val)) {
        input.classList.remove('is-invalid');
      }
    });

    // 3. Paste event sanitization
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      if (!pasted) return;
      const cleanPasted = pasted.replace(/[a-zA-Z]/g, '').replace(/[^0-9+\s\-()]/g, '');
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const cur = input.value;
      input.value = cur.slice(0, start) + cleanPasted + cur.slice(end);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // 4. Blur validation
    input.addEventListener('blur', () => {
      const val = input.value.trim();
      if (input.required || val.length > 0) {
        if (!validatePhone(val)) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      }
    });
  };

  window.initGlobalPhoneRestrictions = function () {
    const selector = 'input[type="tel"], input[name="phone"], input[name="tel"], input[id*="phone"], input[id*="tel"]';
    document.querySelectorAll(selector).forEach(window.setupPhoneInput);

    // MutationObserver to auto-protect dynamically inserted phone fields
    if (window.MutationObserver && !window._phoneMutationObserved) {
      window._phoneMutationObserved = true;
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.matches && node.matches(selector)) {
                window.setupPhoneInput(node);
              }
              if (node.querySelectorAll) {
                node.querySelectorAll(selector).forEach(window.setupPhoneInput);
              }
            }
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    ensureQuoteModalExists();
    initContactPageForm();
    initNewsletterForms();
    window.initGlobalPhoneRestrictions();

    // Hook buttons with data-open-quote
    document.querySelectorAll('[data-open-quote]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prod = btn.getAttribute('data-product-name') || '';
        const cat = btn.getAttribute('data-category') || '';
        window.openQuoteModal(prod, cat);
      });
    });
  });
})();
