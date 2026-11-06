/**
 * AVITECH POULTRY EQUIPMENT - PRODUCTS CATALOG DATA & SYSTEM
 * Complete Poultry Equipment Catalog, Live Filtering, Search, Sort & Quick View Modal
 */

(function () {
  'use strict';

  // 12 Authentic Commercial Poultry Farm Equipment Items
  const PRODUCTS_DATA = [
    {
      id: 'pan-feeder-pro',
      name: 'Automated Broiler Pan Feeder System',
      category: 'feeders',
      categoryLabel: 'Poultry Feeders',
      badge: 'BESTSELLER',
      badgeClass: 'badge-dark-green',
      image: 'assets/images/products/pan-feeder.jpg',
      rating: 5.0,
      reviewsCount: 38,
      price: 380.00,
      origPrice: 420.00,
      priceLabel: '$380.00',
      shortDesc: 'Continuous anti-waste feeding pan lines with sensor cut-off and 360-degree feed flooding for high broiler uniformity.',
      fullDesc: 'Designed for high-density broiler grow-out houses, our automated pan feeder features a high-grade copolymer plastic pan with 14 feeding grills, precision feed drop adjustment, and a galvanized drive line. Eliminates feed wastage and optimizes Feed Conversion Ratio (FCR) from day-old chick to harvest.',
      specs: {
        'Capacity': '50–65 birds per pan',
        'Motor Power': '0.75 kW – 1.5 kW Heavy Duty',
        'Pan Diameter': '360 mm (14 Feeder Grills)',
        'Pipe Material': 'Hot-Dip Galvanized Tube (45 mm)',
        'Auger Type': 'Imported South African High-Tensile Steel'
      }
    },
    {
      id: 'nipple-drinking-system',
      name: 'Precision Nipple Drinking Line System',
      category: 'drinking',
      categoryLabel: 'Drinking Systems',
      badge: 'HIGH UNIFORMITY',
      badgeClass: 'badge-emerald',
      image: 'assets/images/products/nipple-drinker.jpg',
      rating: 4.9,
      reviewsCount: 42,
      price: 195.00,
      origPrice: 230.00,
      priceLabel: '$195.00',
      shortDesc: 'Double-sealed stainless steel nipple valves with drip cups, water medicator unit, and auto-flush pressure regulators.',
      fullDesc: 'Ensures hygienic, fresh water delivery to every bird without leaks or wet litter. Manufactured with medical-grade 304 stainless steel pins and triggers, providing 360-degree sensitivity for chicks and high-volume flow for adult layers and broilers.',
      specs: {
        'Water Flow Rate': '80–120 ml/min calibrated',
        'Pressure Range': '10–40 cm water column',
        'Nipple Material': 'SUS 304 Stainless Steel',
        'Water Line Tube': 'UV-Resistant PVC (22x22 mm)',
        'Filtration': 'Dual-Cartridge 5-Micron System'
      }
    },
    {
      id: 'layer-battery-cage',
      name: 'A-Type Commercial Layer Battery Cages',
      category: 'cages',
      categoryLabel: 'Poultry Cages',
      badge: 'TOP EFFICIENCY',
      badgeClass: 'badge-amber',
      image: 'assets/images/products/battery-cages.jpg',
      rating: 4.8,
      reviewsCount: 29,
      price: 850.00,
      origPrice: 940.00,
      priceLabel: '$850.00',
      shortDesc: 'Hot-dip galvanized tier cage structure with automated manure scrapers, egg roll-out ramps, and feed troughs.',
      fullDesc: 'Engineered for commercial layer farms seeking maximum stocking density with superior bird health. Electrostatic zinc-aluminum coating guarantees 20+ years of rust protection. Features egg roll-out slope with cushioning wire to minimize breakage below 0.3%.',
      specs: {
        'Tier Levels': '3-Tier / 4-Tier / 5-Tier Configurable',
        'Galvanization': '275 g/m² Hot-Dip Zinc Coating',
        'Cell Dimensions': '450 mm x 450 mm x 450 mm',
        'Stocking Density': '4–5 birds per cell (450 cm²/bird)',
        'Egg Breakage Rate': '< 0.3% Guaranteed'
      }
    },
    {
      id: 'industrial-egg-incubator',
      name: 'Multi-Stage Commercial Egg Incubator 10K',
      category: 'incubators',
      categoryLabel: 'Egg Incubators',
      badge: 'MICROCLIMATE AI',
      badgeClass: 'badge-dark-green',
      image: 'assets/images/products/egg-incubator.jpg',
      rating: 5.0,
      reviewsCount: 19,
      price: 1850.00,
      origPrice: 2100.00,
      priceLabel: '$1,850.00',
      shortDesc: 'Microprocessor PID-controlled setter and hatcher with dual heating elements, ultrasonic humidity, and automatic egg turning.',
      fullDesc: 'Delivers commercial hatchery success with >92% hatchability rates for chicken, duck, and turkey eggs. Features computerized PID climate regulation, dual-circulation laminar airflow, automatic 90-degree egg turning racks, and independent emergency backup heating.',
      specs: {
        'Egg Capacity': '10,560 Chicken Eggs',
        'Temperature Accuracy': '± 0.1°C Digital Microprocessor',
        'Humidity Accuracy': '± 1% RH Ultrasonic Mist',
        'Turning Interval': 'Programmable 45° to 90° every 90 min',
        'Power Requirement': '380V / 3-Phase / 3.2 kW'
      }
    },
    {
      id: 'tunnel-ventilation-fan',
      name: '50-Inch Heavy Duty Tunnel Exhaust Cone Fan',
      category: 'ventilation',
      categoryLabel: 'Ventilation Systems',
      badge: 'HIGH CFM',
      badgeClass: 'badge-emerald',
      image: 'assets/images/products/ventilation-fan.jpg',
      rating: 4.9,
      reviewsCount: 34,
      price: 420.00,
      origPrice: 475.00,
      priceLabel: '$420.00',
      shortDesc: 'High-volume butterfly shutter cone exhaust fan delivering 44,000 CFM with premium Siemens motor and Krupp stainless blades.',
      fullDesc: 'Crucial for modern negative-pressure tunnel ventilation in hot climates. Aerodynamic fiberglass cone combined with 430 stainless steel punch-pressed blades maximizes air velocity across poultry shed length while minimizing kilowatt electricity draw.',
      specs: {
        'Airflow Output': '44,000 CFM @ 0 Pa static pressure',
        'Blade Material': 'Krupp 430 Stainless Steel (6 Blades)',
        'Motor Brand': 'Siemens / WEG 1.1 kW IP55 Rated',
        'Frame Dimensions': '1380 mm x 1380 mm x 1300 mm',
        'Decibel Rating': '< 68 dB at 3 meters'
      }
    },
    {
      id: 'cooling-pad-wall',
      name: 'Evaporative Cellulose Cooling Pad System',
      category: 'ventilation',
      categoryLabel: 'Ventilation Systems',
      badge: 'COOLING 8°C',
      badgeClass: 'badge-amber',
      image: 'assets/images/products/cooling-pad.jpg',
      rating: 4.7,
      reviewsCount: 22,
      price: 145.00,
      origPrice: 170.00,
      priceLabel: '$145.00',
      shortDesc: 'Virgin Scandinavian kraft paper evaporative wet wall pads with aluminum alloy water distribution gutters.',
      fullDesc: 'Reduces poultry house internal temperatures by 6°C to 10°C during peak summer heat. Corrugated cellulose paper engineered with anti-fungal impregnation prevents algae buildup and resists degradation from chemical disinfection.',
      specs: {
        'Pad Thickness': '150 mm (6-inch) / 100 mm optional',
        'Cooling Efficiency': 'Up to 82% evaporative efficiency',
        'Gutter System': 'Extruded Aluminum Alloy Frame',
        'Water Supply Pump': 'Submersible 0.55 kW Stainless Pump',
        'Flute Angle': '45° x 15° Cross-Fluted'
      }
    },
    {
      id: 'infrared-gas-brooder',
      name: 'Infrared Radiant Gas Brooder 5000',
      category: 'brooding',
      categoryLabel: 'Brooding Equipment',
      badge: 'CHICK WARMTH',
      badgeClass: 'badge-orange',
      image: 'assets/images/products/gas-brooder.jpg',
      rating: 4.8,
      reviewsCount: 27,
      price: 165.00,
      origPrice: 195.00,
      priceLabel: '$165.00',
      shortDesc: 'Directional infrared canopy radiant gas brooder with automatic piezo ignition, flame-out safety, and thermostat control.',
      fullDesc: 'Emulates natural mother hen radiant heat directly to chick floor level without wasting energy heating ceiling air. Promotes rapid feathering, gut development, and lowers chick mortality below 0.8% during crucial 1–14 day brooding phases.',
      specs: {
        'Brooding Capacity': '800–1,200 Day-Old Chicks per unit',
        'Heat Output': '5.5 kW (18,800 BTU/hr)',
        'Gas Consumption': '0.41 kg/hr LPG / 0.52 m³/hr Natural Gas',
        'Safety System': 'Flame Failure Sensor & Auto Shutoff',
        'Thermostat Accuracy': '± 0.5°C Ambient Sensor Probe'
      }
    },
    {
      id: 'central-egg-collector',
      name: 'Automated Centralized Egg Collection Conveyor',
      category: 'automation',
      categoryLabel: 'Farm Automation',
      badge: 'ZERO DAMAGE',
      badgeClass: 'badge-dark-green',
      image: 'assets/images/products/egg-collector.jpg',
      rating: 4.9,
      reviewsCount: 16,
      price: 1250.00,
      origPrice: 1400.00,
      priceLabel: '$1,250.00',
      shortDesc: 'Cross-conveyor table and rod belt system that delivers freshly laid eggs directly into hatchery sorting trays.',
      fullDesc: 'Eliminates 90% of manual egg gathering labor. Features food-grade perforated collection belts, smooth frequency-inverter drives, and soft-rubber transfer fingers that gently lift eggs onto the sorting table without shell hairline fractures.',
      specs: {
        'Conveying Speed': '18,000–24,000 eggs per hour',
        'Belt Width': '100 mm / 250 mm / 400 mm Options',
        'Belt Material': 'UV-Resistant Polypropylene Rods',
        'Drive System': 'SEW Inverter Speed Controller',
        'Counting Sensor': 'Infrared Dual-Beam Counter Unit'
      }
    },
    {
      id: 'bulk-feed-silo',
      name: 'Heavy-Duty Galvanized Bulk Feed Storage Silo',
      category: 'feeders',
      categoryLabel: 'Poultry Feeders',
      badge: '10–30 TON',
      badgeClass: 'badge-amber',
      image: 'assets/images/products/feed-silo.jpg',
      rating: 4.9,
      reviewsCount: 31,
      price: 2800.00,
      origPrice: 3150.00,
      priceLabel: '$2,800.00',
      shortDesc: 'Corrugated galvanized steel storage bin with pneumatic fill pipes, inspection ladder, and direct flex-auger feed boots.',
      fullDesc: 'Protects valuable poultry feed from vermin, moisture, and hot ambient heat. Manufactured with high-strength structural steel sheets galvanized to 350 g/m² standard. Transparent hopper cone allows fast visual monitoring of feed levels.',
      specs: {
        'Storage Capacities': '6 Ton, 10 Ton, 15 Ton, 25 Ton, 30 Ton',
        'Zinc Plating': '350 g/m² Double Hot Galvanized',
        'Cone Angle': '60-degree steep discharge angle',
        'Auger Boot': 'Single / Double / Twin-Way Outlet',
        'Structural Warranty': '15 Years Anti-Corrosion'
      }
    },
    {
      id: 'manure-removal-system',
      name: 'Automated PP Manure Belt Removal System',
      category: 'automation',
      categoryLabel: 'Farm Automation',
      badge: 'BIOSECURITY',
      badgeClass: 'badge-emerald',
      image: 'assets/images/products/manure-belt.jpg',
      rating: 4.8,
      reviewsCount: 18,
      price: 920.00,
      origPrice: 1050.00,
      priceLabel: '$920.00',
      shortDesc: 'Continuous polypropylene drop-belt scraper with drive roller motor to keep poultry cages 100% ammonia free.',
      fullDesc: 'Significantly improves biosecurity and air quality inside cage sheds by clearing droppings daily. Heavy 1.2 mm virgin PP belt runs beneath each cage tier directly into outdoor manure elevators or collection wagons.',
      specs: {
        'Belt Thickness': '1.0 mm – 1.2 mm High Density Virgin PP',
        'Tensile Strength': '> 1500 N/50mm Non-Stretch',
        'Drive Power': '1.5 kW – 3.0 kW Planetary Gear Motor',
        'Scraper Blade': 'Stainless Steel Elastic Dual Blade',
        'Max House Length': 'Up to 150 meters per drive unit'
      }
    },
    {
      id: 'microclimate-controller',
      name: 'AviSmart IoT Environmental Climate Controller',
      category: 'automation',
      categoryLabel: 'Farm Automation',
      badge: 'IOT CLOUD',
      badgeClass: 'badge-dark-green',
      image: 'assets/images/products/climate-controller.jpg',
      rating: 5.0,
      reviewsCount: 25,
      price: 1450.00,
      origPrice: 1600.00,
      priceLabel: '$1,450.00',
      shortDesc: 'Multi-stage climate computer with 10-inch color touchscreen, remote smartphone monitoring, and NH3/CO2 sensor integration.',
      fullDesc: 'The central intelligence brain of your modern poultry house. Automatically coordinates fans, inlet baffles, cooling pads, brooders, and lighting curves according to chick age. Sends instant push alerts for power outages, water pressure dips, or temperature anomalies.',
      specs: {
        'Display': '10.1-inch IP65 Industrial Touchscreen',
        'Sensor Inputs': '8 Temp, 2 Humidity, 1 CO2, 1 Static Pressure',
        'Relay Outputs': '32 Relays + 4 x 0-10V Analog Speed Controls',
        'Connectivity': '4G LTE SIM + Wi-Fi + RS485 Modbus',
        'Mobile App': 'iOS & Android Cloud Dashboard Included'
      }
    },
    {
      id: 'automatic-vaccinator',
      name: 'Pneumatic Day-Old Chick Dual Vaccinator',
      category: 'brooding',
      categoryLabel: 'Brooding Equipment',
      badge: 'PRECISION VET',
      badgeClass: 'badge-orange',
      image: 'assets/images/products/chick-vaccinator.jpg',
      rating: 4.7,
      reviewsCount: 14,
      price: 2100.00,
      origPrice: 2350.00,
      priceLabel: '$2,100.00',
      shortDesc: 'High-speed automated subcutaneous chick injector for Marek and Newcastle vaccines with optical sensor activation.',
      fullDesc: 'Ensures exact 0.1 ml vaccine dosages into the neck of day-old chicks at speeds up to 3,000 birds per hour. Built-in electronic chick counter and gentle positioning plate prevent injury while ensuring complete herd immunity.',
      specs: {
        'Speed Rate': '2,500 – 3,200 chicks per hour',
        'Dose Accuracy': '0.1 ml – 0.2 ml (± 0.01 ml precision)',
        'Actuation': 'Optical Sensor Pneumatic Trigger',
        'Air Pressure': '4–6 Bar Clean Compressed Air',
        'Counter': '6-Digit Resettable LCD Counter'
      }
    }
  ];

  /* --------------------------------------------------------------------------
     1. CREATE PRODUCT HTML CARD (BOVI STYLE EXACT SCREENSHOT MATCH)
     -------------------------------------------------------------------------- */
  function createProductCardMarkup(item) {
    const starIcons = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(item.rating)) return '<i class="fa-solid fa-star"></i>';
      if (i < item.rating) return '<i class="fa-solid fa-star-half-stroke"></i>';
      return '<i class="fa-regular fa-star"></i>';
    }).join('');

    const formattedPrice = item.price ? `$${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : item.priceLabel;
    const formattedOrigPrice = item.origPrice ? `$${Number(item.origPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '';

    return `
      <article class="bovi-product-card" data-category="${item.category}" data-id="${item.id}">
        <div class="bovi-card-media">
          <a href="product-details.html?id=${item.id}" class="bovi-media-link" aria-label="${item.name}">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="bovi-card-img">
          </a>
          ${item.badge ? `<span class="bovi-card-badge ${item.badgeClass || 'badge-dark-green'}">${item.badge}</span>` : ''}
        </div>
        <div class="bovi-card-body">
          <div class="bovi-card-category">${item.categoryLabel}</div>
          <h3 class="bovi-card-title">
            <a href="product-details.html?id=${item.id}">${item.name}</a>
          </h3>
          <div class="bovi-card-rating" title="${item.rating} out of 5 stars">
            <div class="bovi-stars">${starIcons}</div>
            <span class="bovi-reviews-count">(${item.reviewsCount})</span>
          </div>
          <p class="bovi-card-desc">${item.shortDesc}</p>
          <div class="bovi-card-footer">
            <div class="bovi-price-box">
              <span class="bovi-current-price">${formattedPrice}</span>
              ${formattedOrigPrice ? `<span class="bovi-orig-price">${formattedOrigPrice}</span>` : ''}
            </div>
            <button type="button" class="bovi-add-btn" data-product-id="${item.id}" data-product-name="${item.name}" aria-label="Add ${item.name} to equipment order">
              <i class="fa-solid fa-cart-shopping"></i> Add
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* --------------------------------------------------------------------------
     2. RENDER PRODUCTS TO CONTAINER
     -------------------------------------------------------------------------- */
  function renderProducts(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #ffffff; border-radius: 18px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
          <div style="font-size: 2.8rem; color: #1B4332; margin-bottom: 1rem;">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">No Matching Equipment Found</h3>
          <p style="color: #6B7280; font-size: 0.95rem; margin-bottom: 1.5rem;">Try adjusting your search keyword or increasing the maximum price filter.</p>
          <button type="button" class="btn btn-primary btn-sm reset-filter-btn" style="background: #1B4332; border-color: #1B4332; border-radius: 9999px; padding: 0.55rem 1.4rem;">Reset All Filters</button>
        </div>
      `;
      const resetBtn = container.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const allCat = document.querySelector('.bovi-cat-item[data-category="all"]') || document.querySelector('.filter-pill[data-filter="all"]');
          if (allCat) allCat.click();
          const searchInput = document.getElementById('bovi-catalog-search') || document.querySelector('.search-input');
          if (searchInput) { searchInput.value = ''; searchInput.dispatchEvent(new Event('input')); }
          const slider = document.getElementById('bovi-price-slider');
          if (slider) { slider.value = '3000'; slider.dispatchEvent(new Event('input')); }
        });
      }
      return;
    }

    container.innerHTML = items.map(createProductCardMarkup).join('');
    bindQuickViewButtons();
    bindQuoteModalButtons();
    bindAddButtons();

    // Trigger smooth staggered entrance for newly rendered cards
    const cards = container.querySelectorAll('.bovi-product-card, .product-card');
    cards.forEach((card, idx) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 40 + 20);
    });
  }

  function showOrderToast(message) {
    let toast = document.getElementById('bovi-order-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bovi-order-toast';
      toast.className = 'bovi-order-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     CART MANAGEMENT SYSTEM (FULL PERSISTENCE & INTERACTIVE DRAWER)
     -------------------------------------------------------------------------- */
  const Cart = {
    STORAGE_KEY: 'avitech_cart_v1',

    getItems() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
      }
    },

    saveItems(items) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Error saving cart to localStorage', e);
      }
      this.updateBadges();
      this.renderDrawer();
    },

    addItem(productId, qty = 1) {
      const product = PRODUCTS_DATA.find(p => p.id === productId);
      if (!product) return;

      const items = this.getItems();
      const existing = items.find(item => item.id === productId);

      if (existing) {
        existing.qty += qty;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          categoryLabel: product.categoryLabel,
          image: product.image,
          price: product.price || 0,
          qty: qty
        });
      }

      this.saveItems(items);
      this.bounceBadges();
      this.openDrawer();
      showOrderToast(`Added <strong>${product.name}</strong> to equipment cart`);
    },

    updateQty(productId, delta) {
      const items = this.getItems();
      const item = items.find(i => i.id === productId);
      if (!item) return;

      item.qty += delta;
      if (item.qty <= 0) {
        const filtered = items.filter(i => i.id !== productId);
        this.saveItems(filtered);
        showOrderToast(`Removed <strong>${item.name}</strong> from cart`);
      } else {
        this.saveItems(items);
      }
    },

    removeItem(productId) {
      const items = this.getItems();
      const item = items.find(i => i.id === productId);
      const filtered = items.filter(i => i.id !== productId);
      this.saveItems(filtered);
      if (item) {
        showOrderToast(`Removed <strong>${item.name}</strong> from cart`);
      }
    },

    clearCart() {
      this.saveItems([]);
      showOrderToast(`Equipment cart cleared`);
    },

    getTotalCount() {
      return this.getItems().reduce((sum, item) => sum + (item.qty || 0), 0);
    },

    getSubtotal() {
      return this.getItems().reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 0)), 0);
    },

    updateBadges() {
      const count = this.getTotalCount();
      document.querySelectorAll('#header-cart-badge, .header-cart-badge, .mobile-cart-badge-count').forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
          badge.classList.add('has-items');
        } else {
          badge.classList.remove('has-items');
        }
      });
    },

    bounceBadges() {
      document.querySelectorAll('#header-cart-badge, .header-cart-badge').forEach(badge => {
        badge.classList.remove('bounce');
        void badge.offsetWidth;
        badge.classList.add('bounce');
      });
    },

    ensureDrawerDOM() {
      if (document.getElementById('cart-drawer')) return;

      const overlay = document.createElement('div');
      overlay.id = 'cart-drawer-overlay';
      overlay.className = 'cart-drawer-overlay';

      const drawer = document.createElement('aside');
      drawer.id = 'cart-drawer';
      drawer.className = 'cart-drawer';
      drawer.setAttribute('aria-label', 'Equipment Shopping Cart');

      drawer.innerHTML = `
        <div class="cart-drawer-header">
          <div class="cart-header-title-wrap">
            <div class="cart-header-icon"><i class="fa-solid fa-bag-shopping"></i></div>
            <div>
              <h3 class="cart-drawer-title">Equipment Cart</h3>
              <span class="cart-drawer-subtitle"><span id="cart-drawer-count">0</span> items selected</span>
            </div>
          </div>
          <button type="button" class="cart-drawer-close" aria-label="Close Cart">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="cart-drawer-body" id="cart-drawer-body"></div>

        <div class="cart-drawer-footer" id="cart-drawer-footer">
          <div class="cart-subtotal-row">
            <span class="cart-subtotal-label">Estimated Subtotal:</span>
            <span class="cart-subtotal-value" id="cart-subtotal-value">$0.00</span>
          </div>
          <div class="cart-tax-notice">
            <i class="fa-solid fa-circle-info"></i> Commercial freight & turnkey farm setup quoted on checkout.
          </div>
          <div class="cart-action-buttons">
            <button type="button" class="btn btn-primary btn-block cart-quote-btn" id="cart-quote-btn">
              <i class="fa-solid fa-file-invoice-dollar"></i> Request Order Quotation
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm btn-block cart-clear-btn" id="cart-clear-btn">
              <i class="fa-regular fa-trash-can"></i> Clear Cart
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(drawer);

      overlay.addEventListener('click', () => this.closeDrawer());
      const closeBtn = drawer.querySelector('.cart-drawer-close');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());

      const clearBtn = drawer.querySelector('#cart-clear-btn');
      if (clearBtn) clearBtn.addEventListener('click', () => this.clearCart());

      const quoteBtn = drawer.querySelector('#cart-quote-btn');
      if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
          const items = this.getItems();
          if (!items.length) {
            showOrderToast('Your cart is empty');
            return;
          }
          this.closeDrawer();
          const itemsSummary = items.map(i => `${i.name} (x${i.qty})`).join(', ');
          const subtotalStr = this.getSubtotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const quoteNote = `Equipment Order: ${itemsSummary} | Est. Subtotal: $${subtotalStr}`;
          if (window.openQuoteModal) {
            window.openQuoteModal(quoteNote, 'Equipment Order');
          }
        });
      }
    },

    renderDrawer() {
      const body = document.getElementById('cart-drawer-body');
      const countEl = document.getElementById('cart-drawer-count');
      const subtotalEl = document.getElementById('cart-subtotal-value');
      const footer = document.getElementById('cart-drawer-footer');
      if (!body) return;

      const items = this.getItems();
      const totalCount = this.getTotalCount();
      const subtotal = this.getSubtotal();

      if (countEl) countEl.textContent = totalCount;
      if (subtotalEl) {
        subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      if (!items.length) {
        body.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">
              <i class="fa-solid fa-cart-arrow-down"></i>
            </div>
            <h4>Your Cart is Empty</h4>
            <p>You haven't added any poultry equipment or machinery to your order list yet.</p>
            <a href="products.html" class="btn btn-primary btn-sm cart-empty-btn">
              <i class="fa-solid fa-boxes-stacked"></i> Browse Equipment Catalog
            </a>
          </div>
        `;
        if (footer) {
          footer.style.opacity = '0.5';
          footer.style.pointerEvents = 'none';
        }
        return;
      }

      if (footer) {
        footer.style.opacity = '1';
        footer.style.pointerEvents = 'auto';
      }

      body.innerHTML = items.map(item => `
        <div class="cart-item-card" data-product-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-cat">${item.categoryLabel}</div>
            <h4 class="cart-item-name">
              <a href="product-details.html?id=${item.id}">${item.name}</a>
            </h4>
            <div class="cart-item-price-unit">$${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each</div>
            <div class="cart-item-bottom-row">
              <div class="cart-qty-ctrl">
                <button type="button" class="cart-qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="cart-qty-val">${item.qty}</span>
                <button type="button" class="cart-qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="cart-item-total">$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>
          <button type="button" class="cart-item-remove-btn" data-id="${item.id}" aria-label="Remove ${item.name}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `).join('');

      // Wire qty minus
      body.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          this.updateQty(id, -1);
        });
      });

      // Wire qty plus
      body.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          this.updateQty(id, 1);
        });
      });

      // Wire remove
      body.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          this.removeItem(id);
        });
      });
    },

    openDrawer() {
      this.ensureDrawerDOM();
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {
        this.renderDrawer();
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('drawer-open');
      }
    },

    closeDrawer() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('drawer-open');
      }
    },

    init() {
      this.ensureDrawerDOM();
      this.updateBadges();

      // Bind navbar cart buttons
      document.querySelectorAll('.header-cart-btn, .mobile-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      // Listen for cross-tab storage changes
      window.addEventListener('storage', (e) => {
        if (e.key === this.STORAGE_KEY) {
          this.updateBadges();
          this.renderDrawer();
        }
      });
    }
  };

  function bindAddButtons() {
    document.querySelectorAll('.bovi-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        
        // Add to Cart System and Open Drawer
        Cart.addItem(id, 1);

        const origHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
        btn.style.backgroundColor = '#16A34A';
        btn.style.transform = 'scale(0.96)';

        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.style.backgroundColor = '';
          btn.style.transform = '';
        }, 1400);
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. QUICK VIEW MODAL
     -------------------------------------------------------------------------- */
  function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    let modalOverlay = document.getElementById('quick-view-modal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'quick-view-modal';
      modalOverlay.className = 'modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    const starIcons = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(product.rating)) return '<i class="fa-solid fa-star"></i>';
      if (i < product.rating) return '<i class="fa-solid fa-star-half-stroke"></i>';
      return '<i class="fa-regular fa-star"></i>';
    }).join('');

    const specsRows = Object.entries(product.specs).map(([key, val]) => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 0.6rem 0; font-weight: 600; color: var(--text-secondary); width: 40%;">${key}</td>
        <td style="padding: 0.6rem 0; color: var(--text-main); font-weight: 500;">${val}</td>
      </tr>
    `).join('');

    modalOverlay.innerHTML = `
      <div class="modal-content" style="max-width: 850px;">
        <button type="button" class="modal-close-btn" aria-label="Close modal">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: start;">
          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; height: 320px; background-color: var(--bg-surface-secondary); margin-bottom: 1rem;">
              <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <span class="product-badge" style="position: static;">${product.badge || 'Commercial Grade'}</span>
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--c-slate-blue); background: var(--accent-soft); border: 1px solid var(--border-light); padding: 0.3rem 0.75rem; border-radius: var(--radius-full);">
                ${product.categoryLabel}
              </span>
            </div>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--rating-color); font-size: 0.9rem;">
              ${starIcons}
              <span style="color: var(--text-muted); font-size: 0.85rem;">(${product.reviewsCount} verified farms)</span>
            </div>
            <h2 style="font-size: 1.6rem; margin-bottom: 0.75rem;">${product.name}</h2>
            <div style="font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; color: var(--c-slate-blue); margin-bottom: 1rem;">
              ${product.priceLabel}
            </div>
            <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-secondary);">
              ${product.fullDesc}
            </p>
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Key Specifications:</h4>
            <table style="width: 100%; font-size: 0.88rem; margin-bottom: 1.75rem; border-collapse: collapse;">
              <tbody>
                ${specsRows}
              </tbody>
            </table>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary open-quote-modal-btn" data-product-name="${product.name}" data-category="${product.categoryLabel}">
                Request Quotation <i class="fa-solid fa-file-invoice"></i>
              </button>
              <a href="product-details.html?id=${product.id}" class="btn btn-outline">
                Full Details <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.classList.add('drawer-open');

    // Close logic
    const closeBtn = modalOverlay.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeQuickView);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });

    // Wire quote button in quickview
    bindQuoteModalButtons(modalOverlay);
  }

  function closeQuickView() {
    const modalOverlay = document.getElementById('quick-view-modal');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  function bindQuickViewButtons() {
    document.querySelectorAll('.product-quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-product-id');
        openQuickView(id);
      });
    });
  }

  function bindQuoteModalButtons(context) {
    const root = context || document;
    root.querySelectorAll('.open-quote-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodName = btn.getAttribute('data-product-name') || '';
        const prodCat = btn.getAttribute('data-category') || '';
        closeQuickView();
        if (window.openQuoteModal) {
          window.openQuoteModal(prodName, prodCat);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. CATALOG FILTERING, SEARCHING & SORTING LOGIC
     -------------------------------------------------------------------------- */
  function initCatalog() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    let activeCategory = 'all';
    let searchQuery = '';
    let maxPrice = 3000;
    let sortMode = 'featured';

    const catItems = document.querySelectorAll('.bovi-cat-item, .filter-pill');
    const searchInput = document.getElementById('bovi-catalog-search') || document.querySelector('.search-input');
    const priceSlider = document.getElementById('bovi-price-slider');
    const priceValEl = document.getElementById('bovi-price-val');
    const sortSelect = document.getElementById('bovi-sort-select') || document.querySelector('.sort-select');
    const countDisplay = document.getElementById('bovi-products-count') || document.getElementById('catalog-count-display');

    // Dynamically calculate and set category count badges
    document.querySelectorAll('[data-cat-count]').forEach(badge => {
      const cat = badge.getAttribute('data-cat-count');
      if (cat === 'all') {
        badge.textContent = PRODUCTS_DATA.length;
      } else {
        const count = PRODUCTS_DATA.filter(p => p.category === cat).length;
        badge.textContent = count;
      }
    });

    function applyFilterAndSort() {
      let filtered = PRODUCTS_DATA.filter(p => {
        const matchesCategory = (activeCategory === 'all' || p.category === activeCategory);
        const matchesSearch = !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = !p.price || p.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      });

      // Sorting
      if (sortMode === 'price-low') {
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortMode === 'price-high') {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortMode === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortMode === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortMode === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (countDisplay) {
        countDisplay.textContent = filtered.length;
      }

      renderProducts('products-grid', filtered);
    }

    // Category click
    catItems.forEach(item => {
      item.addEventListener('click', () => {
        catItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        activeCategory = item.getAttribute('data-category') || item.getAttribute('data-filter') || 'all';
        applyFilterAndSort();
      });
    });

    // Price slider
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        maxPrice = Number(e.target.value);
        if (priceValEl) {
          priceValEl.textContent = `$${maxPrice.toLocaleString()}`;
        }
        applyFilterAndSort();
      });
    }

    // Search input with debounce
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = e.target.value.trim();
          applyFilterAndSort();
        }, 200);
      });
    }

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortMode = e.target.value;
        applyFilterAndSort();
      });
    }

    // Initial render
    applyFilterAndSort();
  }

  /* --------------------------------------------------------------------------
     5. HOMEPAGE FEATURED PRODUCTS RENDERER
     -------------------------------------------------------------------------- */
  function initHomepageFeatured() {
    const featuredGrid = document.getElementById('featured-products-grid');
    if (featuredGrid) {
      // First 6 products
      const featuredItems = PRODUCTS_DATA.slice(0, 6);
      renderProducts('featured-products-grid', featuredItems);
    }

    const home2Grid = document.getElementById('equipment-showcase-grid');
    if (home2Grid) {
      // Products 4 through 10
      const showcaseItems = PRODUCTS_DATA.slice(2, 8);
      renderProducts('equipment-showcase-grid', showcaseItems);
    }
  }

  /* --------------------------------------------------------------------------
     6. PRODUCT DETAILS PAGE SPECIFIC RENDERER
     -------------------------------------------------------------------------- */
  function initProductDetailsPage() {
    const detailsContainer = document.getElementById('product-details-content');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'pan-feeder-pro';
    const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

    // Populate title, category, breadcrumbs
    const titleEl = document.getElementById('p-detail-title');
    const catEl = document.getElementById('p-detail-category');
    const breadcrumbEl = document.getElementById('p-detail-breadcrumb');
    const mainImgEl = document.getElementById('p-detail-main-img');
    const descEl = document.getElementById('p-detail-desc');
    const priceEl = document.getElementById('p-detail-price');
    const specsTableEl = document.getElementById('p-detail-specs-table');

    if (titleEl) titleEl.textContent = product.name;
    if (catEl) catEl.textContent = product.categoryLabel;
    if (breadcrumbEl) breadcrumbEl.textContent = product.name;
    if (mainImgEl) {
      mainImgEl.src = product.image;
      mainImgEl.alt = product.name;
    }
    const firstThumb = document.querySelector('.gallery-thumb');
    if (firstThumb) {
      firstThumb.setAttribute('data-full-img', product.image);
      const thumbImg = firstThumb.querySelector('img');
      if (thumbImg) {
        thumbImg.src = product.image;
        thumbImg.alt = product.name;
      }
    }
    if (descEl) descEl.textContent = product.fullDesc;
    if (priceEl) priceEl.textContent = product.priceLabel;

    if (specsTableEl) {
      specsTableEl.innerHTML = Object.entries(product.specs).map(([k, v]) => `
        <tr>
          <th style="text-align: left; padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); width: 35%; background: var(--bg-surface-secondary);">${k}</th>
          <td style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); font-weight: 600;">${v}</td>
        </tr>
      `).join('');
    }

    // Hook Add to Cart button on detail page
    const detailAddCartBtn = document.getElementById('p-detail-add-cart-btn');
    if (detailAddCartBtn) {
      detailAddCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Cart.addItem(product.id, 1);
        const origHtml = detailAddCartBtn.innerHTML;
        detailAddCartBtn.innerHTML = `<i class="fa-solid fa-check"></i> Added to Cart`;
        detailAddCartBtn.style.backgroundColor = '#16A34A';
        setTimeout(() => {
          detailAddCartBtn.innerHTML = origHtml;
          detailAddCartBtn.style.backgroundColor = '';
        }, 1400);
      });
    }

    // Hook Request Quote button on detail page
    const detailQuoteBtn = document.getElementById('p-detail-quote-btn');
    if (detailQuoteBtn) {
      detailQuoteBtn.addEventListener('click', () => {
        if (window.openQuoteModal) {
          window.openQuoteModal(product.name, product.categoryLabel);
        }
      });
    }

    // Render Related Products (same category or others)
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
      const related = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 3);
      renderProducts('related-products-grid', related);
    }
  }

  // Export to window for global access
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.openQuickView = openQuickView;
  window.Cart = Cart;

  document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    initCatalog();
    initHomepageFeatured();
    initProductDetailsPage();
    bindQuickViewButtons();
    bindQuoteModalButtons();
  });
})();
