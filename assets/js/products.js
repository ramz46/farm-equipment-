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
      badge: 'Bestseller',
      image: 'assets/images/products/pan-feeder.jpg',
      rating: 5.0,
      reviewsCount: 38,
      priceLabel: 'Quote on Spec',
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
      badge: 'High Uniformity',
      image: 'assets/images/products/nipple-drinker.jpg',
      rating: 4.9,
      reviewsCount: 42,
      priceLabel: 'Quote on Spec',
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
      badge: 'Top Efficiency',
      image: 'assets/images/products/battery-cages.jpg',
      rating: 4.8,
      reviewsCount: 29,
      priceLabel: 'From $14.50 / bird',
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
      badge: 'Microclimate AI',
      image: 'assets/images/products/egg-incubator.jpg',
      rating: 5.0,
      reviewsCount: 19,
      priceLabel: 'Request Custom Quote',
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
      badge: 'High CFM',
      image: 'assets/images/products/ventilation-fan.jpg',
      rating: 4.9,
      reviewsCount: 34,
      priceLabel: 'From $420 / unit',
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
      badge: 'Temperature Drop 8°C',
      image: 'assets/images/products/cooling-pad.jpg',
      rating: 4.7,
      reviewsCount: 22,
      priceLabel: '$38 / sq. meter',
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
      badge: 'Chick Warmth',
      image: 'assets/images/products/gas-brooder.jpg',
      rating: 4.8,
      reviewsCount: 27,
      priceLabel: '$165 / unit',
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
      categoryLabel: 'Farm Automation Equipment',
      badge: 'Zero Cracked Eggs',
      image: 'assets/images/products/egg-collector.jpg',
      rating: 4.9,
      reviewsCount: 16,
      priceLabel: 'Custom Project Quote',
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
      badge: '10–30 Ton',
      image: 'assets/images/products/feed-silo.jpg',
      rating: 4.9,
      reviewsCount: 31,
      priceLabel: 'From $2,800',
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
      categoryLabel: 'Farm Automation Equipment',
      badge: 'Biosecurity First',
      image: 'assets/images/products/manure-belt.jpg',
      rating: 4.8,
      reviewsCount: 18,
      priceLabel: 'Quote on Length',
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
      categoryLabel: 'Farm Automation Equipment',
      badge: 'IoT Cloud Connected',
      image: 'assets/images/products/climate-controller.jpg',
      rating: 5.0,
      reviewsCount: 25,
      priceLabel: '$1,450 / unit',
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
      badge: 'Precision Vet',
      image: 'assets/images/products/chick-vaccinator.jpg',
      rating: 4.7,
      reviewsCount: 14,
      priceLabel: '$2,100 / unit',
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
     1. CREATE PRODUCT HTML CARD
     -------------------------------------------------------------------------- */
  function createProductCardMarkup(item) {
    const starIcons = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(item.rating)) return '<i class="fa-solid fa-star"></i>';
      if (i < item.rating) return '<i class="fa-solid fa-star-half-stroke"></i>';
      return '<i class="fa-regular fa-star"></i>';
    }).join('');

    // Extract first 2 specs for card summary
    const specKeys = Object.keys(item.specs).slice(0, 2);
    const specsHtml = specKeys.map(k => `
      <div class="product-spec-item">
        <span class="product-spec-label">${k}:</span>
        <span class="product-spec-val">${item.specs[k]}</span>
      </div>
    `).join('');

    return `
      <article class="product-card hover-float" data-category="${item.category}" data-id="${item.id}">
        <div class="product-img-box">
          <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy">
          ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
          <button type="button" class="product-quick-view-btn" data-product-id="${item.id}" aria-label="Quick View ${item.name}">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
        </div>
        <div class="product-card-body">
          <div class="product-meta">
            <span class="product-category">${item.categoryLabel}</span>
            <div class="product-rating" title="${item.rating} out of 5 stars">
              ${starIcons}
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-inline-start: 4px;">(${item.reviewsCount})</span>
            </div>
          </div>
          <h3 class="product-title">
            <a href="product-details.html?id=${item.id}">${item.name}</a>
          </h3>
          <p class="product-desc">${item.shortDesc}</p>
          <div class="product-specs-list">
            ${specsHtml}
          </div>
          <div class="product-card-footer">
            <div class="product-quote-badge">${item.priceLabel}</div>
            <button type="button" class="btn btn-sm btn-primary open-quote-modal-btn" data-product-name="${item.name}" data-category="${item.categoryLabel}">
              Quote <i class="fa-solid fa-arrow-right"></i>
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
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;">
            <i class="fa-solid fa-tractor"></i>
          </div>
          <h3>No Equipment Found</h3>
          <p>Try clearing your search query or selecting a different equipment category.</p>
          <button type="button" class="btn btn-primary btn-sm reset-filter-btn" style="margin-top: 1rem;">Show All Equipment</button>
        </div>
      `;
      const resetBtn = container.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const allPill = document.querySelector('.filter-pill[data-filter="all"]');
          if (allPill) allPill.click();
          const searchInput = document.querySelector('.search-input');
          if (searchInput) { searchInput.value = ''; searchInput.dispatchEvent(new Event('input')); }
        });
      }
      return;
    }

    container.innerHTML = items.map(createProductCardMarkup).join('');
    bindQuickViewButtons();
    bindQuoteModalButtons();

    // Trigger smooth staggered entrance for newly rendered cards
    const cards = container.querySelectorAll('.product-card');
    cards.forEach((card, idx) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 60 + 40);
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
    let sortMode = 'default';

    const filterPills = document.querySelectorAll('.filter-pill');
    const searchInput = document.querySelector('.search-input');
    const sortSelect = document.querySelector('.sort-select');

    function applyFilterAndSort() {
      let filtered = PRODUCTS_DATA.filter(p => {
        const matchesCategory = (activeCategory === 'all' || p.category === activeCategory);
        const matchesSearch = !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      // Sorting
      if (sortMode === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortMode === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortMode === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      renderProducts('products-grid', filtered);
    }

    // Filter pills click
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-filter') || 'all';
        applyFilterAndSort();
      });
    });

    // Search input with debounce
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = e.target.value.trim();
          applyFilterAndSort();
        }, 250);
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

  document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initHomepageFeatured();
    initProductDetailsPage();
    bindQuickViewButtons();
    bindQuoteModalButtons();
  });
})();
