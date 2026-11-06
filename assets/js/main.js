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
    const hamburgerBtn = document.querySelector('.hamburger-btn, #hamburgerBtn');
    const drawer = document.querySelector('.mobile-drawer, .mobile-nav-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close-btn, #closeMobileDrawer');

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

  /* --------------------------------------------------------------------------
     10. SPECIALIZED SERVICES INTERACTIVE SELECTOR
     -------------------------------------------------------------------------- */
  function initSpecializedServicesSection() {
    const serviceCards = document.querySelectorAll('[data-service-select]');
    const section = document.getElementById('specialized-services-section');
    if (!section) return;

    function activateServiceTab(paneId) {
      const tabBtn = section.querySelector(`.service-tab-btn[data-tab-target="${paneId}"]`);
      if (tabBtn) {
        tabBtn.click();
      }
    }

    serviceCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const targetPane = card.getAttribute('data-service-select');
        if (!targetPane) return;
        e.preventDefault();

        activateServiceTab(targetPane);

        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 20);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });

    // Check for hash or url param (?service=...)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const hash = window.location.hash.replace('#', '');
    const targetService = serviceParam ? (serviceParam.startsWith('pane-') ? serviceParam : `pane-${serviceParam}`) : (hash ? (hash.startsWith('pane-') ? hash : `pane-${hash}`) : null);

    if (targetService) {
      setTimeout(() => {
        activateServiceTab(targetService);
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 20);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 250);
    }
  }

  /* --------------------------------------------------------------------------
     11. SERVICE DETAILS DYNAMIC CONTENT RENDERER
     -------------------------------------------------------------------------- */
  function initServiceDetailsPage() {
    const serviceTitleEl = document.getElementById('sd-section-title');
    if (!serviceTitleEl) return;

    const urlParams = new URLSearchParams(window.location.search);
    let serviceKey = urlParams.get('service');
    if (!serviceKey) return;
    serviceKey = serviceKey.replace(/^pane-/, '').toLowerCase();

    const services = {
      supply: {
        title: "Poultry Equipment Supply",
        heroTag: '<i class="fa-solid fa-truck-ramp-box"></i> Direct OEM Supply',
        heroTitle: 'Direct OEM Supply. <br><span class="text-gradient">Precision Equipment Sourcing.</span>',
        heroDesc: 'Containerized worldwide export of commercial pan feeders, 304-stainless drinking lines, H-frame layer cages, and automated egg handling systems.',
        breadcrumb: 'Equipment Supply',
        narrativeTag: '<i class="fa-solid fa-shield-halved"></i> Global Supply Chain & Manufacturing',
        sectionTitle: 'Factory-Direct Procurement with Guaranteed International Logistics',
        desc1: 'AviTech manages complete end-to-end manufacturing, crating, container stuffing, and maritime shipping for commercial poultry operations worldwide.',
        desc2: 'From smallholder expanders to 500,000-bird integrated complexes, our manufacturing facilities adhere to strict ISO9001 and CE quality standards. We deliver certified 275g/m² zinc hot-dip galvanized steel components engineered to resist corrosive ammonia shed environments for decades.',
        image: 'assets/images/poultry/poultry-manufacturing-plant.jpg',
        imageAlt: 'AviTech Automated Poultry Equipment Manufacturing Facility',
        checklist: [
          'ISO9001 & CE Certified Modular Poultry Equipment Manufacturing',
          'Custom Shed Sizing and Tailored Bill of Materials (BOM)',
          'Export Packaging & Container Stuffing for Zero Transit Distortion',
          'Door-to-Port / Door-to-Farm CIF & DDP Logistics Management',
          'Comprehensive OEM Spare Parts Buffer Kit Included with Every Order',
          'Complete Bilingual Installation Manuals & Schematics'
        ],
        quoteTitle: 'Equipment Supply Proposal',
        quoteProduct: 'Poultry Equipment Supply',
        quoteCategory: 'OEM Equipment Supply',
        quoteBtn: 'Request Supply Quote <i class="fa-solid fa-paper-plane"></i>',
        specs: [
          { k: 'Lead Time:', v: '14–21 Days Standard Production' },
          { k: 'Container Sizing:', v: '20ft GP, 40ft HQ, or LCL Shared' },
          { k: 'Steel Coating:', v: '275g/m² Hot-Dip Galvanized Zinc' },
          { k: 'Compliance:', v: 'CE, ISO9001, RoHS Compliant' }
        ]
      },
      installation: {
        title: "Farm Setup & Installation",
        heroTag: '<i class="fa-solid fa-hammer"></i> Turnkey Service Division',
        heroTitle: 'Precision Alignment. <br><span class="text-gradient">Turnkey Farm Installation.</span>',
        heroDesc: 'Structural cage erection, automated feeder winching lines, computerized ventilation calibration, and IoT climate commissioning.',
        breadcrumb: 'Turnkey Installation',
        narrativeTag: '<i class="fa-solid fa-shield-check"></i> Factory Certified Engineers',
        sectionTitle: 'Zero Hassle On-Site Erection and System Commissioning',
        desc1: "Even the most durable equipment can fail if assembled with misaligned pulleys, uneven cage foundations, or improperly calibrated static pressure sensors. AviTech's field installation leads oversee every single bolt, weld, and wire connection on your farm.",
        desc2: 'Our certified technicians work alongside local labor teams to anchor silo pads, balance high-tensile flex augers, install ceiling winch trusses, leak-test 304-stainless drinking lines under 4-bar pressure, and program digital PID climate computers for automated stage transitions.',
        image: 'assets/images/poultry/farm-setup.jpg',
        imageAlt: 'AviTech Turnkey Commercial Poultry Shed Complete Equipment Assembly',
        checklist: [
          'Civil Silo Foundation Anchoring & Weight Scale Calibration',
          'Automated Pan Feeder Line Ceiling Suspension & Alignment',
          'Multi-Tier Layer Cage Leveling & Manure Belt Tensioning',
          'Nipple Line Hydrostatic Pressure Testing (Zero-Leak Guarantee)',
          '50" Exhaust Fan Aerodynamic Wall Flange Sealing & Belt Tuning',
          'Complete Dry-Run Testing with Full Batch Simulation'
        ],
        quoteTitle: 'Turnkey Installation Quote',
        quoteProduct: 'Turnkey Farm Setup Service',
        quoteCategory: 'Turnkey Poultry House',
        quoteBtn: 'Book Installation Survey <i class="fa-solid fa-calendar-check"></i>',
        specs: [
          { k: 'Deployment Time:', v: '7–14 days per 100m house' },
          { k: 'Engineers Deployed:', v: '1–2 Leads + Local Team' },
          { k: 'Warranty Coverage:', v: '3-Year Comprehensive Workmanship' },
          { k: 'Post-Install Support:', v: '1st Batch Hands-on Monitoring' }
        ]
      },
      consultation: {
        title: "Poultry Farm Consultation",
        heroTag: '<i class="fa-solid fa-compass-drafting"></i> Architectural Advisory',
        heroTitle: 'Engineering Blueprints. <br><span class="text-gradient">Poultry Farm Consultation.</span>',
        heroDesc: 'CFD ventilation modeling, biosecurity buffer zoning, structural shed sizing, and flock density calculations for maximum ROI.',
        breadcrumb: 'Farm Consultation',
        narrativeTag: '<i class="fa-solid fa-chart-line"></i> Agro-Engineering Advisory',
        sectionTitle: 'Scientific Engineering Consultation for Modern Broiler & Layer Houses',
        desc1: 'A high-yielding commercial poultry operation starts long before equipment arrives on site. Shed orientation, prevailing wind angles, air velocity gradients, and biosecurity buffers directly determine bird FCR, mortality, and power bills.',
        desc2: 'Our senior poultry engineers evaluate your land topography, climate data, and utility availability to craft millimeter-accurate 2D/3D CAD layouts and Computational Fluid Dynamics (CFD) airflow models, ensuring zero dead zones and minimum heat stress.',
        image: 'assets/images/poultry/poultry-farm-consultation-blueprints.jpg',
        imageAlt: 'Poultry Farm Consultation, CAD Blueprints & Biosecurity Design',
        checklist: [
          'Site Topography Assessment & Prevailing Wind Analysis',
          'Computational Fluid Dynamics (CFD) Airflow Modeling',
          'Biosecurity Buffer Zoning & Perimeter Disinfection Architecture',
          'Electrical Load, Transformer Sizing & Backup Generator Calculations',
          'Water Sourcing, Filtration Architecture & Flow-Rate Audits',
          'Complete 2D/3D CAD Structural & Equipment Layout Drawings'
        ],
        quoteTitle: 'Consultation & Blueprint Quote',
        quoteProduct: 'Poultry Farm Consultation & Blueprints',
        quoteCategory: 'Engineering Blueprints',
        quoteBtn: 'Schedule Consultation <i class="fa-solid fa-comments"></i>',
        specs: [
          { k: 'Turnaround Time:', v: '3–5 Business Days for Initial Draft' },
          { k: 'Deliverables:', v: '2D/3D CAD + Full PDF Blueprint Pack' },
          { k: 'Simulation:', v: 'Computational Fluid Dynamics (CFD)' },
          { k: 'Consultants:', v: 'Senior Agricultural Engineers & Agronomists' }
        ]
      },
      maintenance: {
        title: "Equipment Maintenance",
        heroTag: '<i class="fa-solid fa-wrench"></i> Field Maintenance Division',
        heroTitle: 'Flock Security. <br><span class="text-gradient">Preventative Equipment Maintenance.</span>',
        heroDesc: 'Scheduled pre-batch inspections, flex-auger tensioning, fan belt alignment, and hydrostatic pressure audits.',
        breadcrumb: 'Equipment Maintenance',
        narrativeTag: '<i class="fa-solid fa-screwdriver-wrench"></i> Operational Continuity',
        sectionTitle: 'Proactive Maintenance to Eliminate Costly Batch Downtime',
        desc1: 'Equipment failures during mid-flock growth can result in catastrophic mortality or stunted feed conversion ratios. AviTech maintenance contracts ensure every mechanical bearing, drive gearbox, winch cable, and static pressure sensor is thoroughly calibrated between batches.',
        desc2: 'Our service engineers perform 48-point diagnostic audits between flocks, dynamically replacing worn drive pulleys, re-lubricating high-torque motors, verifying water line pressure regulators, and confirming seamless generator-to-mains changeover.',
        image: 'assets/images/poultry/maintenance-service.jpg',
        imageAlt: 'Preventative Poultry Equipment Maintenance and Service',
        checklist: [
          '48-Point Inter-Flock Mechanical & Electrical Audit',
          'Flex-Auger Spring Tensioning & Wear Inspection',
          'Exhaust Cone Fan Motor Amperage & Belt Deflection Tuning',
          'Evaporative Cooling Pad Descaling & Water Distribution Flushes',
          'Emergency High/Low Temp Alarm Trip Testing & Backup Simulation',
          'Digital Inspection Report with Photo Log and Recommendations'
        ],
        quoteTitle: 'Maintenance SLA Quote',
        quoteProduct: 'Preventative Equipment Maintenance SLA',
        quoteCategory: 'Service Contracts',
        quoteBtn: 'Request SLA Agreement <i class="fa-solid fa-shield-halved"></i>',
        specs: [
          { k: 'Inspection Cadence:', v: 'Quarterly / Semi-Annual / Annual' },
          { k: 'Audit Scope:', v: '48-Point Mechanical & Electrical Check' },
          { k: 'Emergency SLA:', v: 'Guaranteed On-Site Dispatch < 24 Hours' },
          { k: 'Parts Discount:', v: '15% Off All Genuine OEM Replacement Parts' }
        ]
      },
      support: {
        title: "Technical Remote Support",
        heroTag: '<i class="fa-solid fa-headset"></i> Cloud Telemetry Support',
        heroTitle: 'Real-Time Telemetry. <br><span class="text-gradient">24/7 Technical Remote Support.</span>',
        heroDesc: 'Round-the-clock agricultural emergency helpline and remote cloud diagnostics for AviSmart IoT climate controllers.',
        breadcrumb: 'Remote Support',
        narrativeTag: '<i class="fa-solid fa-satellite-dish"></i> Always-On Cloud Support',
        sectionTitle: 'Continuous Climate Diagnostics and Instant Telemetry Response',
        desc1: 'Our agricultural engineering helpline operates 24/7/365 to safeguard flock welfare across timezones. With AviSmart IoT cloud connectivity, our technical engineers can remotely audit shed temperature graphs, static pressure curves, fan cycle stages, and water meter consumption logs to resolve issues in minutes.',
        desc2: 'Whether your farm encounters an unexplained static pressure drop during high-wind events, sudden heater lockouts during sub-zero nights, or sensor communication glitches, our remote specialists dial into your climate computer over encrypted cellular links to diagnose and restore nominal setpoints without delay.',
        image: 'assets/images/poultry/poultry-rd-lab.jpg',
        imageAlt: 'Technical Remote Support and IoT Cloud Monitoring Lab',
        checklist: [
          '24/7 Direct Telephone, WhatsApp, and Web Portal Support Hotline',
          'Real-Time Cloud Telemetry Diagnostics for Temperature & Static Pressure',
          'Over-the-Air Firmware Updates and Sensor Calibration Assistance',
          'Immediate Root-Cause Diagnosis to Prevent Heat Stress Mortality',
          'Weekly Automated Environmental Efficiency & Energy Reports',
          'Multi-Language Agricultural Support Desk (English, French, Spanish, Arabic)'
        ],
        quoteTitle: '24/7 Support Plan',
        quoteProduct: '24/7 Technical Remote Support',
        quoteCategory: 'IoT Remote Telemetry',
        quoteBtn: 'Enroll in Remote Support <i class="fa-solid fa-headset"></i>',
        specs: [
          { k: 'Availability:', v: '24 Hours / 7 Days / 365 Days' },
          { k: 'Critical Response Time:', v: '< 15 Minutes for Emergency Alerts' },
          { k: 'Connectivity Modes:', v: '4G LTE Cellular / Wi-Fi / RS485 Modbus' },
          { k: 'Support Staff:', v: 'Senior Electrical & Automation Engineers' }
        ]
      },
      automation: {
        title: "Farm Automation Upgrades",
        heroTag: '<i class="fa-solid fa-microchip"></i> Modernization Division',
        heroTitle: 'Brownfield Modernization. <br><span class="text-gradient">Farm Automation Upgrades.</span>',
        heroDesc: 'Transform legacy curtain-sided or manual poultry houses into computerized negative-pressure closed-environment facilities.',
        breadcrumb: 'Farm Automation',
        narrativeTag: '<i class="fa-solid fa-bolt"></i> High-Efficiency Modernization',
        sectionTitle: 'Converting Manual Poultry Sheds into State-of-the-Art Automated Facilities',
        desc1: 'Do not rebuild from scratch—retrofit. AviTech specializes in upgrading aging open-sided or semi-automated broiler and layer sheds into fully enclosed, high-density negative pressure houses with 40% lower labor overhead and drastically superior FCR.',
        desc2: 'We install custom sidewall drop curtains with high-torque gear winches, 50-inch fiberglass or galvanized cone exhaust fans, automated tunnel inlet doors, and modern digital climate computers that integrate seamlessly with your existing electrical infrastructure.',
        image: 'assets/images/poultry/turnkey-poultry-project.jpg',
        imageAlt: 'Poultry Farm Modernization and Automation Upgrade',
        checklist: [
          'Conversion of Open Curtain Sheds to Sealed Negative-Pressure Houses',
          'Retrofit of 50" Direct-Drive or Belt-Drive Exhaust Cone Fans',
          'Installation of Computerized Air Inlets with Wind-Compensated Baffles',
          'Replacement of Manual Feed Hoppers with Automated Auger Pan Lines',
          'Integration of Nipple Drinker Pressure Regulators & Flush Solenoids',
          'Installation of Central AviSmart Climate & Variable-Speed Fan Controls'
        ],
        quoteTitle: 'Automation Retrofit Quote',
        quoteProduct: 'Farm Automation Upgrade Retrofit',
        quoteCategory: 'Automation Retrofits',
        quoteBtn: 'Request Retrofit Assessment <i class="fa-solid fa-microchip"></i>',
        specs: [
          { k: 'Typical ROI Period:', v: '8–14 Months via FCR & Energy Savings' },
          { k: 'Labor Reduction:', v: 'Up to 65% Less Daily Manual Labor' },
          { k: 'Ventilation Boost:', v: 'Up to 2.5 m/s Wind Chill Tunnel Velocity' },
          { k: 'Compatibility:', v: 'Fits Any Steel, Timber, or Concrete Shed' }
        ]
      },
      replacement: {
        title: "Equipment Replacement",
        heroTag: '<i class="fa-solid fa-rotate"></i> Rapid Spare Parts',
        heroTitle: 'Zero Idle Hours. <br><span class="text-gradient">OEM Equipment Replacement.</span>',
        heroDesc: 'Immediate dispatch of factory-original broiler pans, stainless nipple drinkers, auger coils, gear motors, and temperature probes.',
        breadcrumb: 'Equipment Replacement',
        narrativeTag: '<i class="fa-solid fa-boxes-stacked"></i> Factory OEM Sourcing',
        sectionTitle: 'Precision-Matched Replacement Components with Same-Day Dispatch',
        desc1: 'When a motor burns out or an auger snaps mid-grow, every hour of feeding interruption impacts uniform flock weight. AviTech maintains massive regional warehouse stocks of genuine OEM components engineered to exact manufacturer specifications.',
        desc2: 'From high-tensile carbon-steel coreless auger coils and industrial gearhead drive units to stainless 360-degree nipple valves and high-precision thermistor probes, our express parts department ensures your automated lines are back in service without delay.',
        image: 'assets/images/poultry/layer-farm.jpg',
        imageAlt: 'AviTech Commercial Layer Farm and Replacement Components',
        checklist: [
          'Guaranteed Compatibility with AviTech & Leading Commercial Brands',
          'High-Tensile Carbon Steel & Stainless Steel Augers in Stock',
          'Heavy-Duty IP55 Flange-Mounted Drive Motors & Worm Gearboxes',
          '360-Degree Action 304 Stainless Steel Nipple Drinkers with Drip Cups',
          'Calibrated PT100 Temperature & High-Accuracy Humidity Sensor Probes',
          'Same-Day Expedited Air Courier Dispatch Worldwide'
        ],
        quoteTitle: 'Spare Parts Order Quote',
        quoteProduct: 'OEM Equipment Replacement',
        quoteCategory: 'Spare Parts',
        quoteBtn: 'Order Replacement Parts <i class="fa-solid fa-boxes-stacked"></i>',
        specs: [
          { k: 'Dispatch Speed:', v: 'Same-Day / Next-Day Express Dispatch' },
          { k: 'Inventory SKUs:', v: 'Over 10,000 Genuine Parts Maintained in Stock' },
          { k: 'Express Couriers:', v: 'DHL / FedEx Express Worldwide Air Shipping' },
          { k: 'Compatibility:', v: 'AviTech & Universal Major Brand Systems' }
        ]
      },
      bulk: {
        title: "Bulk Commercial Supply",
        heroTag: '<i class="fa-solid fa-boxes-packing"></i> Enterprise Procurement',
        heroTitle: 'Enterprise Volume. <br><span class="text-gradient">Bulk Commercial Supply.</span>',
        heroDesc: 'Container-load procurement and standardized equipment packages for multi-million bird integrators and agricultural co-operatives.',
        breadcrumb: 'Bulk Commercial Supply',
        narrativeTag: '<i class="fa-solid fa-handshake"></i> Corporate & Integrator Programs',
        sectionTitle: 'Volume Contract Manufacturing for Commercial Integrators and Co-ops',
        desc1: 'Designed for multi-million bird broiler integrators, commercial layer complexes, and government agricultural development programs. We provide container-load volume pricing, standardized shed fleet replication, customized private label options, and dedicated enterprise account directors.',
        desc2: 'Whether developing a 10-house broiler complex or replacing equipment across hundreds of contract growers, our enterprise program ensures uniform bill of materials, predictable delivery schedules, and factory-direct volume pricing discounts.',
        image: 'assets/images/poultry/multi-million-bird-integrator.jpg',
        imageAlt: 'Large Scale Commercial Poultry Integration Project',
        checklist: [
          'Tiered Container-Load Factory Pricing for Large-Scale Developments',
          'Standardized Bill of Materials (BOM) for Rapid Multi-Shed Replication',
          'Dedicated Enterprise Account Director & Priority Factory Production Slots',
          'Custom Silo Decals, Equipment Color Codes, and Private Labeling',
          'Consolidated Sea Freight Shipping with Palletized Assembly Kits',
          'Flexible Commercial Financing Options Including Letters of Credit (L/C)'
        ],
        quoteTitle: 'Enterprise Volume Quote',
        quoteProduct: 'Bulk Commercial Supply',
        quoteCategory: 'Enterprise Supply',
        quoteBtn: 'Request Enterprise Proposal <i class="fa-solid fa-handshake"></i>',
        specs: [
          { k: 'Minimum Volume:', v: '1 Full Container Load (20ft / 40ft HQ)' },
          { k: 'Account Executive:', v: 'Dedicated Enterprise Account Director' },
          { k: 'Custom Branding:', v: 'Custom Colors, Silo Logos & Private Labeling' },
          { k: 'Logistics Terms:', v: 'FOB, CIF, & Door-to-Farm DDP Options' }
        ]
      }
    };

    const data = services[serviceKey];
    if (!data) return;

    document.title = `${data.title} | AviTech Commercial Poultry Services`;

    const heroTag = document.getElementById('sd-hero-tag');
    if (heroTag) heroTag.innerHTML = data.heroTag;

    const heroTitle = document.getElementById('sd-hero-title');
    if (heroTitle) heroTitle.innerHTML = data.heroTitle;

    const heroDesc = document.getElementById('sd-hero-desc');
    if (heroDesc) heroDesc.textContent = data.heroDesc;

    const breadcrumbLabel = document.getElementById('sd-breadcrumb-label');
    if (breadcrumbLabel) breadcrumbLabel.textContent = data.breadcrumb;

    const narrativeTag = document.getElementById('sd-narrative-tag');
    if (narrativeTag) narrativeTag.innerHTML = data.narrativeTag;

    const sectionTitle = document.getElementById('sd-section-title');
    if (sectionTitle) sectionTitle.textContent = data.sectionTitle;

    const desc1 = document.getElementById('sd-desc-1');
    if (desc1) desc1.textContent = data.desc1;

    const desc2 = document.getElementById('sd-desc-2');
    if (desc2) desc2.textContent = data.desc2;

    const img = document.getElementById('sd-image');
    if (img) {
      img.src = data.image;
      img.alt = data.imageAlt;
    }

    const checklist = document.getElementById('sd-checklist');
    if (checklist && data.checklist) {
      checklist.innerHTML = data.checklist.map(item => `
        <div class="checklist-item"><i class="fa-solid fa-circle-check"></i> ${item}</div>
      `).join('');
    }

    const quoteTitle = document.getElementById('sd-quote-title');
    if (quoteTitle) quoteTitle.textContent = data.quoteTitle;

    const quoteBtn = document.getElementById('sd-quote-btn');
    if (quoteBtn) {
      quoteBtn.setAttribute('data-product-name', data.quoteProduct);
      quoteBtn.setAttribute('data-category', data.quoteCategory);
      quoteBtn.innerHTML = data.quoteBtn;
    }

    if (data.specs) {
      data.specs.forEach((spec, idx) => {
        const kEl = document.getElementById(`sd-spec-k${idx + 1}`);
        const vEl = document.getElementById(`sd-spec-v${idx + 1}`);
        if (kEl) kEl.textContent = spec.k;
        if (vEl) vEl.textContent = spec.v;
      });
    }
  }

  /* --------------------------------------------------------------------------
     12. BLOG PAGINATION, FILTERING & SEARCH CONTROLS
     -------------------------------------------------------------------------- */
  function initBlogPage() {
    const gridEl = document.getElementById('blog-articles-grid');
    const paginationEl = document.getElementById('blog-pagination');
    if (!gridEl || !paginationEl) return;

    const blogPosts = [
      {
        id: 1,
        slug: "feed-wastage",
        title: "Reducing Feed Wastage: Pan Feeder Height Calibration from Day 1 to 42",
        category: "feeding",
        categoryName: "Feeding Systems",
        date: "Oct 28, 2026",
        readTime: "5 min read",
        image: "assets/images/blog/blog-2.jpg",
        imageAlt: "Optimizing FCR with Pan Feeders",
        snippet: "A step-by-step checklist on winching pan feeder lines so pans rest at bird back height, preventing spillage into bedding.",
        link: "blog-details.html?article=feed-wastage"
      },
      {
        id: 2,
        slug: "incubation-humidity",
        title: "Multi-Stage Incubation: Critical PID Humidity Settings for High Hatchability",
        category: "hatchery",
        categoryName: "Hatchery",
        date: "Oct 20, 2026",
        readTime: "7 min read",
        image: "assets/images/blog/blog-3.jpg",
        imageAlt: "Hatchery Incubation Best Practices",
        snippet: "How ultrasonic cool moisture systems prevent egg dehydration while protecting embryonic gas exchange in multi-stage setters.",
        link: "blog-details.html?article=incubation-humidity"
      },
      {
        id: 3,
        slug: "silo-condensation",
        title: "Condensation Control in Galvanized Steel Silos: Preventing Mold & Clumping",
        category: "storage",
        categoryName: "Bulk Storage",
        date: "Oct 15, 2026",
        readTime: "6 min read",
        image: "assets/images/blog/blog-4.jpg",
        imageAlt: "Bulk Feed Silo Management",
        snippet: "Best engineering practices for pneumatic silo filling, boot inspection, and thermal condensation barriers in humid climates.",
        link: "blog-details.html?article=silo-condensation"
      },
      {
        id: 4,
        slug: "manure-belts",
        title: "Automated Polypropylene Manure Belts: Reducing Ammonia Below 10 PPM",
        category: "biosecurity",
        categoryName: "Biosecurity",
        date: "Oct 09, 2026",
        readTime: "4 min read",
        image: "assets/images/blog/blog-5.jpg",
        imageAlt: "Automated Manure Handling",
        snippet: "Why daily manure belt clearing extends the lifespan of cage steel and drastically lowers respiratory disease in high-density layers.",
        link: "blog-details.html?article=manure-belts"
      },
      {
        id: 5,
        slug: "static-pressure",
        title: "Static Pressure Control in Tunnel Ventilated Broiler Houses",
        category: "ventilation",
        categoryName: "Ventilation",
        date: "Oct 03, 2026",
        readTime: "6 min read",
        image: "assets/images/products/ventilation-fan.jpg",
        imageAlt: "Tunnel Ventilation Exhaust Cone Fans",
        snippet: "Maintaining between 0.08 and 0.12 inches of water column (20–30 Pa) static pressure to ensure high-velocity air reaches the shed ceiling before dropping.",
        link: "blog-details.html?article=static-pressure"
      },
      {
        id: 6,
        slug: "nipple-drinking",
        title: "Automated Nipple Drinking Line Flushing: Biofilm Prevention & Flow Rates",
        category: "biosecurity",
        categoryName: "Drinking Systems",
        date: "Sep 28, 2026",
        readTime: "5 min read",
        image: "assets/images/products/nipple-drinker.jpg",
        imageAlt: "Automated Stainless Nipple Drinking Line",
        snippet: "High-pressure automatic line flushing protocols that dissolve mineral deposits and maintain 90ml/min nipple discharge for peak flock hydration.",
        link: "blog-details.html?article=nipple-drinking"
      },
      {
        id: 7,
        slug: "chick-brooding",
        title: "Chick Brooding Thermal Curves & Infrared Radiant Heating Protocols",
        category: "feeding",
        categoryName: "Brooding",
        date: "Sep 22, 2026",
        readTime: "8 min read",
        image: "assets/images/blog/blog-6.jpg",
        imageAlt: "Chick Brooding Radiant Gas Brooder",
        snippet: "Managing radiant floor temperatures from 34°C down to 24°C over 21 days with zone-controlled gas brooders and canopy sensors.",
        link: "blog-details.html?article=chick-brooding"
      },
      {
        id: 8,
        slug: "layer-cages",
        title: "A-Frame vs H-Frame Layer Cages: Structural Longevity & Bird Density",
        category: "cages",
        categoryName: "Layer Cages",
        date: "Sep 16, 2026",
        readTime: "7 min read",
        image: "assets/images/products/battery-cages.jpg",
        imageAlt: "Commercial Hot-Dip Galvanized Layer Battery Cages",
        snippet: "Engineering comparison of vertical footprint, manure removal clearance, and egg roll-out conveyor angles for multi-tier layer complexes.",
        link: "blog-details.html?article=layer-cages"
      },
      {
        id: 9,
        slug: "iot-controllers",
        title: "IoT Microclimate Controllers: Modbus Sensor Calibration & Cloud Alerts",
        category: "automation",
        categoryName: "Automation",
        date: "Sep 10, 2026",
        readTime: "6 min read",
        image: "assets/images/products/climate-controller.jpg",
        imageAlt: "AviSmart IoT Climate Controller",
        snippet: "Integrating PT100 temperature probes, relative humidity sensors, and backup high/low thermostat interlocks into cloud telemetry dashboards.",
        link: "blog-details.html?article=iot-controllers"
      },
      {
        id: 10,
        slug: "cooling-pads",
        title: "Evaporative Cellulose Cooling Pad Descaling and Algae Prevention",
        category: "ventilation",
        categoryName: "Cooling Pads",
        date: "Sep 04, 2026",
        readTime: "5 min read",
        image: "assets/images/products/cooling-pad.jpg",
        imageAlt: "Evaporative Cellulose Cooling Pad Wall",
        snippet: "Water treatment regimes, blowdown bleed-off rates, and seasonal drying cycles to extend 150mm cellulose pad life beyond 5 years.",
        link: "blog-details.html?article=cooling-pads"
      },
      {
        id: 11,
        slug: "egg-collection",
        title: "Centralized Egg Collection Conveyor Speed Synchronization",
        category: "cages",
        categoryName: "Egg Handling",
        date: "Aug 28, 2026",
        readTime: "4 min read",
        image: "assets/images/products/egg-collector.jpg",
        imageAlt: "Automated Centralized Egg Collection Conveyor",
        snippet: "Balancing variable-frequency motor drives across multi-tier conveyor cross-transfers to eliminate hairline eggshell micro-cracks.",
        link: "blog-details.html?article=egg-collection"
      },
      {
        id: 12,
        slug: "chick-vaccination",
        title: "Day-Old Chick Dual Subcutaneous Vaccination: Speed & Precision",
        category: "hatchery",
        categoryName: "Hatchery",
        date: "Aug 21, 2026",
        readTime: "5 min read",
        image: "assets/images/products/chick-vaccinator.jpg",
        imageAlt: "Pneumatic Day-Old Chick Dual Vaccinator",
        snippet: "Pneumatic dual-syringe calibration standards for administering Mareks and ND/IB vaccines to 3,000+ chicks per hour with zero stress.",
        link: "blog-details.html?article=chick-vaccination"
      }
    ];

    let currentPage = 1;
    const postsPerPage = 4;
    let currentCategory = 'all';
    let searchQuery = '';

    function getFilteredPosts() {
      return blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = !searchQuery ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }

    function renderArticles(scrollUp = false) {
      const filtered = getFilteredPosts();
      const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));

      if (currentPage > totalPages) currentPage = totalPages;

      const startIndex = (currentPage - 1) * postsPerPage;
      const currentPosts = filtered.slice(startIndex, startIndex + postsPerPage);

      if (currentPosts.length === 0) {
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 0.75rem;"><i class="fa-solid fa-magnifying-glass"></i></div>
            <h3 style="margin-bottom: 0.5rem;">No matching articles found</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">Try adjusting your keyword or clearing the filter.</p>
            <button type="button" id="blog-clear-search-btn" class="btn btn-sm btn-primary">Clear Search & Filters</button>
          </div>
        `;
        const clearBtn = document.getElementById('blog-clear-search-btn');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            currentCategory = 'all';
            searchQuery = '';
            currentPage = 1;
            const searchInput = document.getElementById('blog-search-input');
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.blog-cat-item').forEach(item => {
              item.classList.toggle('active', item.getAttribute('data-cat') === 'all');
            });
            renderArticles(true);
          });
        }
        paginationEl.innerHTML = '';
        return;
      }

      gridEl.innerHTML = currentPosts.map(post => `
        <article class="blog-card hover-float" style="animation: fadeIn 0.3s ease;">
          <div class="blog-img-box">
            <img src="${post.image}" alt="${post.imageAlt}" class="blog-img" loading="lazy">
            <span class="blog-tag">${post.categoryName}</span>
          </div>
          <div class="blog-body">
            <div class="blog-meta">
              <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
              <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
            </div>
            <h3 class="blog-title">
              <a href="${post.link}">${post.title}</a>
            </h3>
            <p class="blog-snippet">
              ${post.snippet}
            </p>
            <a href="${post.link}" class="btn-text">Read Article <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      `).join('');

      renderPagination(totalPages);

      if (scrollUp) {
        const headerOffset = document.querySelector('.site-header')?.offsetHeight || 80;
        const rect = gridEl.getBoundingClientRect();
        const offsetPosition = rect.top + window.pageYOffset - (headerOffset + 20);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    function renderPagination(totalPages) {
      if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
      }

      let html = '';

      // Prev button
      html += `
        <button type="button" class="blog-page-btn blog-prev-btn" aria-label="Previous Page" ${currentPage === 1 ? 'disabled' : ''}>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      `;

      // Page numbers
      for (let p = 1; p <= totalPages; p++) {
        html += `
          <button type="button" class="blog-page-btn blog-num-btn ${p === currentPage ? 'active' : ''}" data-page="${p}" aria-label="Page ${p}">
            ${p}
          </button>
        `;
      }

      // Next button
      html += `
        <button type="button" class="blog-page-btn blog-next-btn" aria-label="Next Page" ${currentPage === totalPages ? 'disabled' : ''}>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      `;

      paginationEl.innerHTML = html;

      // Event listeners for pagination buttons
      const prevBtn = paginationEl.querySelector('.blog-prev-btn');
      if (prevBtn && currentPage > 1) {
        prevBtn.addEventListener('click', () => {
          currentPage--;
          renderArticles(true);
        });
      }

      const nextBtn = paginationEl.querySelector('.blog-next-btn');
      if (nextBtn && currentPage < totalPages) {
        nextBtn.addEventListener('click', () => {
          currentPage++;
          renderArticles(true);
        });
      }

      paginationEl.querySelectorAll('.blog-num-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pageNum = parseInt(btn.getAttribute('data-page'), 10);
          if (pageNum && pageNum !== currentPage) {
            currentPage = pageNum;
            renderArticles(true);
          }
        });
      });
    }

    // Category click listeners
    const categoryLinks = document.querySelectorAll('.blog-cat-item');
    const resetFilterBtn = document.getElementById('blog-reset-filter');

    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        currentCategory = link.getAttribute('data-cat') || 'all';
        currentPage = 1;

        if (resetFilterBtn) {
          resetFilterBtn.style.display = currentCategory === 'all' && !searchQuery ? 'none' : 'inline-block';
        }

        renderArticles(true);
      });
    });

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        currentPage = 1;
        const searchInput = document.getElementById('blog-search-input');
        if (searchInput) searchInput.value = '';
        categoryLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-cat') === 'all');
        });
        resetFilterBtn.style.display = 'none';
        renderArticles(true);
      });
    }

    // Search input listener
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = e.target.value.trim();
          currentPage = 1;
          if (resetFilterBtn) {
            resetFilterBtn.style.display = currentCategory === 'all' && !searchQuery ? 'none' : 'inline-block';
          }
          renderArticles(false);
        }, 200);
      });
    }

    // Initial render
    renderArticles(false);
  }


  /* --------------------------------------------------------------------------
     12B. DYNAMIC BLOG DETAILS ARTICLE RENDERER
     -------------------------------------------------------------------------- */
  function initBlogDetailsPage() {
    const articleBodyEl = document.getElementById('bd-article-body');
    if (!articleBodyEl) return; // Only runs on blog-details.html

    const articlesData = {
  "tunnel-ventilation": {
    "id": 0,
    "slug": "tunnel-ventilation",
    "title": "Complete Guide to Tunnel Ventilation, Wind Chill & Air Speed in Broiler Houses",
    "category": "Ventilation Engineering",
    "categoryIcon": "fa-solid fa-fan",
    "heroTag": "<i class=\"fa-solid fa-fan\"></i> Ventilation Engineering",
    "heroTitle": "Optimizing Negative Pressure & <br><span class=\"text-gradient\">Air Speed in Broiler Houses</span>",
    "heroDesc": "A deep technical analysis of static pressure differential, tunnel fan CFM staging, and inlet velocity curves required to eliminate bird heat stress.",
    "heroBg": "assets/images/hero/hero-blog-details.jpg",
    "coverImg": "assets/images/blog/blog-1.jpg",
    "coverAlt": "Commercial Poultry Exhaust Cone Fans in Broiler House",
    "author": {
      "name": "Dr. Marcus Vance",
      "role": "Chief Agricultural Engineer",
      "avatar": "assets/images/team/team-1.jpg",
      "bio": "Specializes in negative-pressure tunnel ventilation design, psychrometric airflow, and IoT climate automation."
    },
    "date": "Nov 02, 2026",
    "readTime": "8 min read",
    "badge": "Agronomy Field Certified",
    "toc": [
      {
        "id": "sec-intro",
        "title": "1. The Physics of Negative Pressure Ventilation"
      },
      {
        "id": "sec-speed",
        "title": "2. Calculating Target Air Speed & Wind Chill Effect"
      },
      {
        "id": "sec-static",
        "title": "3. Static Pressure Settings Across House Widths"
      },
      {
        "id": "sec-cooling",
        "title": "4. Evaporative Cooling Pad Operational Timing"
      },
      {
        "id": "sec-maintenance",
        "title": "5. Maintenance Checkpoints for 50-Inch Cone Fans"
      }
    ],
    "calloutTitle": "The Rule of Thumb CFM Calculation:",
    "calloutBody": "<strong>Total Air Volume (CFM)</strong> = Bird Count &times; Max Bird Weight (lbs) &times; 1.8 CFM/lb. For a 40,000-bird flock at 6.0 lbs, total peak CFM needed = 40,000 &times; 6.0 &times; 1.8 = <strong>432,000 CFM</strong>. Dividing by 44,000 CFM per 50\" fan results in <strong>10 exhaust cone fans</strong>.",
    "sectionsHtml": "\n      <h2 id=\"sec-intro\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. The Physics of Negative Pressure Ventilation</h2>\n      <p>\n        In a modern enclosed poultry house, fans do not blow air onto the birds; instead, high-capacity exhaust cone fans extract air from one end of the building, creating a slight vacuum (negative static pressure). Atmospheric pressure outside the shed then forces fresh air to surge through carefully calibrated inlet louvers or evaporative cooling pad tunnels.\n      </p>\n      <p>\n        When static pressure is maintained precisely (typically between 20 and 28 Pascals, depending on shed width), the incoming air enters with sufficient momentum to hug the ceiling apex. Here, it mixes with the warm air generated by heaters and bird body heat before gently descending into the bird breathing zone without chilling the litter.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-calculator\"></i> The Rule of Thumb CFM Calculation:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>Total Air Volume (CFM)</strong> = Bird Count &times; Max Bird Weight (lbs) &times; 1.8 CFM/lb. For a 40,000-bird flock at 6.0 lbs, total peak CFM needed = 40,000 &times; 6.0 &times; 1.8 = <strong>432,000 CFM</strong>. Dividing by 44,000 CFM per 50\" fan results in <strong>10 exhaust cone fans</strong>.\n        </p>\n      </div>\n\n      <h2 id=\"sec-speed\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Calculating Target Air Speed & Wind Chill Effect</h2>\n      <p>\n        During extreme summer heat (&gt;35°C), high air velocity across bird feathers produces a cooling effect equivalent to a 5°C to 8°C temperature drop. However, this wind chill requires a minimum air velocity of 2.5 meters per second (500 feet per minute) uniformly distributed across the house cross-section.\n      </p>\n      <p>\n        If dead air pockets or low-velocity zones occur along the sidewalls, heavy birds in those areas will suffer severe heat prostration and respiratory alkalosis. AviTech's 50-inch butterfly shutter cone fans utilize precision aerodynamic fiberglass diffusers to maintain laminar flow with zero back-draft turbulence.\n      </p>\n\n      <h2 id=\"sec-static\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Static Pressure Settings Across House Widths</h2>\n      <p>\n        Shed width dictates the required static pressure. The wider the building, the higher the pressure required to project air to the center:\n      </p>\n      <ul style=\"margin-left: 1.5rem; margin-block: 1rem; display: flex; flex-direction: column; gap: 0.5rem;\">\n        <li><strong>12-meter shed width:</strong> 18 – 22 Pa static pressure</li>\n        <li><strong>15-meter shed width:</strong> 22 – 26 Pa static pressure</li>\n        <li><strong>18-meter shed width:</strong> 28 – 35 Pa static pressure</li>\n      </ul>\n\n      <h2 id=\"sec-cooling\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Evaporative Cooling Pad Operational Timing</h2>\n      <p>\n        A common mistake made by farm operators is activating evaporative cellulose cooling pads too early in the morning when ambient relative humidity is still above 75%. Adding moisture to already saturated air creates a humid sauna that stifles the birds' panting mechanism.\n      </p>\n      <p>\n        Always ensure that cooling pumps only engage when ambient temperatures exceed 28°C AND shed relative humidity is below 70%. In our automated climate controllers, this interlock is programmed by default to safeguard bird health.\n      </p>\n\n      <h2 id=\"sec-maintenance\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Maintenance Checkpoints for 50-Inch Cone Fans</h2>\n      <p>\n        Exhaust fan throughput drops by up to 25% if V-belts stretch or butterfly dampers gather dust. Inspect drive pulley alignment monthly, lubricate sealed double-row bearings, and check motor amp draw under full load against factory nameplates.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-fan\"></i>",
      "title": "Need a Ventilation Calculation?",
      "desc": "Send us your poultry house dimensions and bird target weight for an engineered CFM analysis.",
      "btnText": "Get Ventilation Quote",
      "product": "Tunnel Ventilation Sizing",
      "category": "Ventilation Systems"
    },
    "relatedSlugs": [
      "feed-wastage",
      "static-pressure",
      "cooling-pads"
    ]
  },
  "feed-wastage": {
    "id": 1,
    "slug": "feed-wastage",
    "title": "Reducing Feed Wastage: Pan Feeder Height Calibration from Day 1 to 42",
    "category": "Feeding Systems",
    "categoryIcon": "fa-solid fa-wheat-awn",
    "heroTag": "<i class=\"fa-solid fa-wheat-awn\"></i> Feeding Systems & FCR",
    "heroTitle": "Precision Feeder Winching: <br><span class=\"text-gradient\">Eliminating Broiler Feed Spillage</span>",
    "heroDesc": "Calibrating pan lip height from brooding litter level to final harvest weight to lower FCR by 3.5 points and protect feed margins.",
    "heroBg": "assets/images/products/pan-feeder.jpg",
    "coverImg": "assets/images/blog/blog-2.jpg",
    "coverAlt": "Automated Pan Feeder Calibration Line in Commercial Shed",
    "author": {
      "name": "Elena Rostova",
      "role": "Poultry Nutrition & Equipment Specialist",
      "avatar": "assets/images/team/team-2.jpg",
      "bio": "Focuses on broiler feed conversion optimization, mechanical winching alignment, and drinking line sanitation."
    },
    "date": "Oct 28, 2026",
    "readTime": "5 min read",
    "badge": "FCR Benchmark Certified",
    "toc": [
      {
        "id": "sec-economics",
        "title": "1. The Economics of Feed Spillage in Commercial Broiler Sheds"
      },
      {
        "id": "sec-day1-7",
        "title": "2. Day 1 to Day 7: Flood Feeding and Paper Run Protocols"
      },
      {
        "id": "sec-day8-21",
        "title": "3. Day 8 to Day 21: Winching to Bird Breast & Crop Level"
      },
      {
        "id": "sec-day22-42",
        "title": "4. Day 22 to Day 42: Maintaining Lip Level with Bird Backs"
      },
      {
        "id": "sec-anti-perch",
        "title": "5. Anti-Perch Wire Tension and End-Line Ultrasonic Sensor Calibration"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-economics\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. The Economics of Feed Spillage in Commercial Broiler Sheds</h2>\n      <p>\n        Feed represents 65% to 70% of total broiler production expenses. When pan feeders are set even two inches too low, birds flick mash and crumbles into wood shavings, where it becomes soiled, fermented, and permanently unrecoverable.\n      </p>\n      <p>\n        Field data confirms that a mere 1.5% feed wastage rate increases Feed Conversion Ratio (FCR) by 0.035 points. On a 50,000-bird flock reaching 2.5 kg, this silently discards nearly 4 metric tons of high-protein feed directly into the litter bedding.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-calculator\"></i> The Commercial Feed Spillage Cost Formula:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>Financial Waste</strong> = Total Flock Feed Intake (Tons) &times; Spillage Rate (%) &times; Feed Price/Ton. At $460/ton with 250 tons consumed, 1.5% waste equates to <strong>$1,725 wasted per house per batch</strong>, or over $10,350 annually per building.\n        </p>\n      </div>\n\n      <h2 id=\"sec-day1-7\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Day 1 to Day 7: Flood Feeding and Paper Run Protocols</h2>\n      <p>\n        During the initial 72 hours post-placement, day-old chicks must find feed effortlessly. AviTech pan feeders feature adjustable flood gates that drop a 360-degree mound of starter crumbs directly onto the pan cone while resting flat on the litter bedding.\n      </p>\n      <p>\n        Complementing the pans with degradable brooding paper runners under drinker lines ensures chicks ingest sufficient nutrition within 6 hours of placement, accelerating vital yolk-sac absorption.\n      </p>\n\n      <h2 id=\"sec-day8-21\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Day 8 to Day 21: Winching to Bird Breast & Crop Level</h2>\n      <p>\n        From Day 8 onwards, the entire feeding line must be hoisted daily using synchronized ceiling winches. The pan lip must align exactly with the bird’s breast height.\n      </p>\n      <p>\n        At this height, broilers must reach slightly over the lip rather than climbing into the pan, eliminating defecation into the feed and preventing billing-out actions.\n      </p>\n\n      <h2 id=\"sec-day22-42\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Day 22 to Day 42: Maintaining Lip Level with Bird Backs</h2>\n      <p>\n        In the finishing phase (Day 22 through Day 42), the feeder lip must match the level of the average bird's back when standing upright. Birds stretch comfortably to eat from the outer perimeter, while the internal V-shaped cone prevents feed over-accumulation.\n      </p>\n\n      <h2 id=\"sec-anti-perch\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Anti-Perch Wire Tension and End-Line Ultrasonic Sensor Calibration</h2>\n      <p>\n        Birds perching on feed pipes deposit manure directly into pans. Electrified anti-perch wires charged with a pulsed 1.5J energizer deter perching without harm. Additionally, the end-line pan proximity sensor must be cleaned weekly to ensure feed augers cycle promptly before pans run empty.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-wheat-awn\"></i>",
      "title": "Looking to Upgrade Pan Feeders?",
      "desc": "Calculate exact pan feeder line lengths, drop tubes, and winching motor capacities for your house.",
      "btnText": "Get Feeder Line Quote",
      "product": "Automated Pan Feeder Pro",
      "category": "Feeding Systems"
    },
    "relatedSlugs": [
      "silo-condensation",
      "chick-brooding",
      "nipple-drinking"
    ]
  },
  "incubation-humidity": {
    "id": 2,
    "slug": "incubation-humidity",
    "title": "Multi-Stage Incubation: Critical PID Humidity Settings for High Hatchability",
    "category": "Hatchery",
    "categoryIcon": "fa-solid fa-egg",
    "heroTag": "<i class=\"fa-solid fa-egg\"></i> Hatchery Engineering",
    "heroTitle": "Embryonic Moisture Loss: <br><span class=\"text-gradient\">PID Humidity Control in Incubation</span>",
    "heroDesc": "Targeting 11.8% to 12.2% egg weight loss across 18 days of setter incubation using closed-loop ultrasonic moisture atomization.",
    "heroBg": "assets/images/poultry/hatchery-room.jpg",
    "coverImg": "assets/images/blog/blog-3.jpg",
    "coverAlt": "Commercial Multi-Stage Setter and Hatcher Units",
    "author": {
      "name": "Dr. Henrik Lindqvist",
      "role": "Hatchery Systems Director",
      "avatar": "assets/images/team/team-3.jpg",
      "bio": "Leading researcher in embryonic thermal management, single-stage vs multi-stage staging, and chick vigor."
    },
    "date": "Oct 20, 2026",
    "readTime": "7 min read",
    "badge": "Hatchability Tested",
    "toc": [
      {
        "id": "sec-biology",
        "title": "1. The Biology of Eggshell Gas Exchange & Moisture Evaporation"
      },
      {
        "id": "sec-rh-curves",
        "title": "2. Wet-Bulb vs Relative Humidity (%RH) Target Curves"
      },
      {
        "id": "sec-thermal-balance",
        "title": "3. Multi-Stage Setter Thermal Balancing Across Old & Young Embryos"
      },
      {
        "id": "sec-atomization",
        "title": "4. High-Pressure Nozzle vs Ultrasonic Cold Water Atomization"
      },
      {
        "id": "sec-transfer",
        "title": "5. Hatcher Transfer RH Ramp: Preventing Membrane Leathery Desiccation"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-biology\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. The Biology of Eggshell Gas Exchange & Moisture Evaporation</h2>\n      <p>\n        An avian eggshell is not an impermeable barrier; it is punctured by 7,000 to 17,000 microscopic pores that permit continuous oxygen uptake and carbon dioxide release. During incubation, the egg must lose a predictable quantity of water vapor to carve out an internal air cell large enough for the chick's pulmonary respiration prior to piping.\n      </p>\n      <p>\n        If setter relative humidity is excessively high, the embryo retains water, resulting in bloated \"red-hock\" chicks and drowning at internal piping. Conversely, low humidity desiccates the embryo, fusing delicate inner membranes to developing feathers.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-calculator\"></i> The Egg Moisture Weight Loss Equation:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>Weight Loss %</strong> = [(Egg Weight at Setting - Egg Weight at Day 18 Transfer) / Egg Weight at Setting] &times; 100%. The global gold standard for commercial broiler lines is <strong>11.5% to 12.5%</strong>.\n        </p>\n      </div>\n\n      <h2 id=\"sec-rh-curves\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Wet-Bulb vs Relative Humidity (%RH) Target Curves</h2>\n      <p>\n        In multi-stage setters, wet-bulb temperature is kept steady at 82°F to 84°F (27.8°C to 28.9°C), corresponding to 50% to 53% RH at a dry bulb setpoint of 99.5°F (37.5°C).\n      </p>\n      <p>\n        AviTech incubators employ proportional-integral-derivative (PID) controllers that modulate moisture pulsing within &plusmn;0.5% RH tolerances, preventing the wide temperature-overshoot swings typical of crude on/off solenoid valves.\n      </p>\n\n      <h2 id=\"sec-thermal-balance\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Multi-Stage Setter Thermal Balancing Across Old & Young Embryos</h2>\n      <p>\n        In multi-stage machines, endothermic fresh eggs (Days 1–9) absorb the excess heat released by exothermic older embryos (Days 10–18). Careful geometric egg cart positioning maintains uniform airflow velocity (1.5 m/s) across all setter flats, preventing hot spots and uneven embryonic maturation.\n      </p>\n\n      <h2 id=\"sec-atomization\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. High-Pressure Nozzle vs Ultrasonic Cold Water Atomization</h2>\n      <p>\n        Older pneumatic nozzles spray coarse 80-micron water droplets that wet egg surfaces, creating thermal shock and bacterial ingress through shell pores. Modern ultrasonic mist heads vibrate at 1.7 MHz, releasing sub-5-micron micro-aerosols that vaporize instantly into the airflow without wetting shells.\n      </p>\n\n      <h2 id=\"sec-transfer\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Hatcher Transfer RH Ramp: Preventing Membrane Leathery Desiccation</h2>\n      <p>\n        Upon transferring eggs to the hatcher baskets at Day 18.5, humidity is initially dropped to 48% to encourage rapid shell fracture. As soon as the first chicks pip the outer shell, humidity is elevated to 70%–75% RH to lubricate the piping action and keep the inner shell membrane elastic until emergence.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-egg\"></i>",
      "title": "Commercial Hatchery Planning?",
      "desc": "Request industrial incubator capacities from 19,200 to 120,000 eggs with automated egg turning and PID control.",
      "btnText": "Get Incubator Quote",
      "product": "Commercial Egg Incubator Pro",
      "category": "Incubation Systems"
    },
    "relatedSlugs": [
      "chick-vaccination",
      "chick-brooding",
      "iot-controllers"
    ]
  },
  "silo-condensation": {
    "id": 3,
    "slug": "silo-condensation",
    "title": "Condensation Control in Galvanized Steel Silos: Preventing Mold & Clumping",
    "category": "Bulk Storage",
    "categoryIcon": "fa-solid fa-warehouse",
    "heroTag": "<i class=\"fa-solid fa-warehouse\"></i> Bulk Storage & Quality",
    "heroTitle": "Galvanized Silo Aeration: <br><span class=\"text-gradient\">Preventing Moisture & Mycotoxins</span>",
    "heroDesc": "Combatting diurnal thermal swings in metal grain bins to prevent feed caking, boot blockages, and fatal Aspergillus contamination.",
    "heroBg": "assets/images/products/feed-silo.jpg",
    "coverImg": "assets/images/blog/blog-4.jpg",
    "coverAlt": "Hot-Dip Galvanized Corrugated Feed Storage Silo",
    "author": {
      "name": "Marcus Vance",
      "role": "Poultry Structural Engineer",
      "avatar": "assets/images/team/team-1.jpg",
      "bio": "Specializes in silo structural wind-load engineering, high-tensile flex augers, and automated bin telemetry."
    },
    "date": "Oct 15, 2026",
    "readTime": "6 min read",
    "badge": "Feed Safety Certified",
    "toc": [
      {
        "id": "sec-thermal-swings",
        "title": "1. How Diurnal Heat Shifts Create Sweating on Inner Silo Walls"
      },
      {
        "id": "sec-mycotoxins",
        "title": "2. The Dangers of Bridging, Rat-Holing, and Mycotoxin Spores"
      },
      {
        "id": "sec-aeration",
        "title": "3. Forced-Air Aeration Fans vs High-Volume Roof Mushroom Vents"
      },
      {
        "id": "sec-pressure-fill",
        "title": "4. Pneumatic Truck Fill Pressure Limits to Prevent Pellet Shatter"
      },
      {
        "id": "sec-inspection",
        "title": "5. Inspection Regimes: Clear Boots, Slide Gates, and Load Cells"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-thermal-swings\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. How Diurnal Heat Shifts Create Sweating on Inner Silo Walls</h2>\n      <p>\n        External corrugated steel silos endure severe diurnal temperature swings. During hot daylight hours, the enclosed air above the feed mass expands and warms to upwards of 45°C, drawing moisture upward through convection.\n      </p>\n      <p>\n        As sunset brings rapid cooling, the thin galvanized steel sheets lose heat almost instantly. The warm interior vapor condenses on the underside of the bin roof and walls, cascading liquid water down the inner corrugations directly into stored broiler pellets.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-triangle-exclamation\"></i> Critical Dew-Point Threshold:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Whenever ambient air plunges by more than <strong>10°C in under 3 hours</strong>, relative humidity in unvented silo headspaces reaches 100%, causing interior condensation that fuels rapid fungal proliferation.\n        </p>\n      </div>\n\n      <h2 id=\"sec-mycotoxins\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. The Dangers of Bridging, Rat-Holing, and Mycotoxin Spores</h2>\n      <p>\n        Wet feed quickly binds into hardened crusted bridges over the lower 60-degree discharge cone. When augers operate underneath, feed empties only through a narrow center column (rat-holing), leaving stagnant pockets along the perimeter to decompose into deadly Aspergillus ochratoxin and aflatoxins.\n      </p>\n\n      <h2 id=\"sec-aeration\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Forced-Air Aeration Fans vs High-Volume Roof Mushroom Vents</h2>\n      <p>\n        AviTech silos feature dual 300mm aerodynamic roof mushroom exhaust hoods that expel hot headspace air before condensation can form. In high-humidity tropical zones, secondary low-pressure aeration blowers deliver 0.1 CFM per bushel to maintain grain equilibrium moisture below 12.5%.\n      </p>\n\n      <h2 id=\"sec-pressure-fill\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Pneumatic Truck Fill Pressure Limits to Prevent Pellet Shatter</h2>\n      <p>\n        Bulk feed delivery trucks commonly blast feed at 1.8 to 2.2 bar pressure to unload quickly. This excessive velocity shatters extruded pellets against the silo roof, generating 15% fine dust that accelerates crusting. Enforce a delivery pressure cap of <strong>0.8 to 1.1 bar</strong>.\n      </p>\n\n      <h2 id=\"sec-inspection\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Inspection Regimes: Clear Boots, Slide Gates, and Load Cells</h2>\n      <p>\n        Every AviTech silo includes high-impact transparent polycarbonate transfer boots. Operators can verify free feed flow visually without opening access covers. Load cells fitted under the four support legs communicate exact hourly feed draw to IoT farm controllers.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-warehouse\"></i>",
      "title": "Need Bulk Feed Silos & Augers?",
      "desc": "Configure hot-dip galvanized corrugated feed silos from 5 to 35 tons with load cells and pneumatic fill pipes.",
      "btnText": "Get Silo System Quote",
      "product": "Corrugated Feed Storage Silo",
      "category": "Bulk Feed Storage"
    },
    "relatedSlugs": [
      "feed-wastage",
      "manure-belts",
      "iot-controllers"
    ]
  },
  "manure-belts": {
    "id": 4,
    "slug": "manure-belts",
    "title": "Automated Polypropylene Manure Belts: Reducing Ammonia Below 10 PPM",
    "category": "Biosecurity",
    "categoryIcon": "fa-solid fa-shield-halved",
    "heroTag": "<i class=\"fa-solid fa-shield-halved\"></i> Biosecurity & Air Quality",
    "heroTitle": "Ammonia Mitigation: <br><span class=\"text-gradient\">Automated Polypropylene Manure Belts</span>",
    "heroDesc": "Drastically lowering NH3 atmospheric concentrations to safeguard avian respiratory cilia, improve laying persistence, and extend cage steel life.",
    "heroBg": "assets/images/products/manure-belt.jpg",
    "coverImg": "assets/images/blog/blog-5.jpg",
    "coverAlt": "Multi-Tier Polypropylene Manure Belt Extraction Drive",
    "author": {
      "name": "Eng. David Kempton",
      "role": "Biosecurity Field Engineer",
      "avatar": "assets/images/team/team-4.jpg",
      "bio": "Expert in poultry house waste management, air quality monitoring, and mechanical belt drive alignment."
    },
    "date": "Oct 09, 2026",
    "readTime": "4 min read",
    "badge": "Air Quality Certified",
    "toc": [
      {
        "id": "sec-cilia",
        "title": "1. Avian Tracheal Cilia Paralysis from Atmospheric Ammonia Above 15 PPM"
      },
      {
        "id": "sec-polymer",
        "title": "2. 1.0mm vs 1.2mm High-Tear Polypropylene (PP) Polymer Performance"
      },
      {
        "id": "sec-tracking",
        "title": "3. Rubber Lagged Drive Drums and Anti-Drift Centering Tracking"
      },
      {
        "id": "sec-frequency",
        "title": "4. Frequency of Clearance: Why Daily Removal Cuts Moisture by 65%"
      },
      {
        "id": "sec-scrapers",
        "title": "5. Cross-Conveyor Interlocks and Self-Tensioning Scraper Blades"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-cilia\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Avian Tracheal Cilia Paralysis from Atmospheric Ammonia Above 15 PPM</h2>\n      <p>\n        Ammonia (NH3) gas is generated when uric acid in bird excreta interacts with bacterial enzymes in high-moisture environments. Birds inhale air at breast level; when atmospheric ammonia exceeds 15 parts per million (PPM), the microscopic cilia lining their upper trachea become paralyzed.\n      </p>\n      <p>\n        Without active cilia to sweep away dust particles, airborne E. coli and infectious bronchitis viruses penetrate deep into air sacs, causing chronic respiratory disease and significant egg production drops.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-wind\"></i> Shed Ammonia Impact Thresholds:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>0 – 10 PPM:</strong> Optimum healthy avian respiration.<br>\n          <strong>15 – 25 PPM:</strong> Tracheal cilia paralysis; feed consumption drops 5%.<br>\n          <strong>&gt; 50 PPM:</strong> Severe cornea burn, kerato-conjunctivitis, and catastrophic flock mortality.\n        </p>\n      </div>\n\n      <h2 id=\"sec-polymer\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. 1.0mm vs 1.2mm High-Tear Polypropylene (PP) Polymer Performance</h2>\n      <p>\n        Thin 0.8mm belts stretch and fold under the weight of accumulated droppings over 100-meter rows. AviTech specifies 1.2mm virgin high-density polypropylene (PP) with UV-stabilizers and antistatic additives. The slick low-friction surface allows droppings to glide smoothly into scrapers without tearing.\n      </p>\n\n      <h2 id=\"sec-tracking\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Rubber Lagged Drive Drums and Anti-Drift Centering Tracking</h2>\n      <p>\n        Belt slippage occurs when liquid manure contaminates drive rollers. Our motorized drive stations utilize vulcanized diamond-groove rubber lagging that grips the underside of the belt securely, accompanied by self-centering polyurethane guide rollers that prevent lateral drift.\n      </p>\n\n      <h2 id=\"sec-frequency\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Frequency of Clearance: Why Daily Removal Cuts Moisture by 65%\"</h2>\n      <p>\n        Droppings left for 48 hours decompose rapidly, evaporating moisture into the shed air. Running manure belts for 12 minutes every 24 hours expels 90% of volatile uric acid before fermentation begins, cutting in-house heating loads in winter batches.\n      </p>\n\n      <h2 id=\"sec-scrapers\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Cross-Conveyor Interlocks and Self-Tensioning Scraper Blades</h2>\n      <p>\n        Dual counter-weighted stainless scraper blades clean both sides of the belt as it rounds the discharge roller. Interlocked electrical safety sensors halt tier motors instantly if the external cross-conveyor experiences a jam, preventing manure pile-ups.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-recycle\"></i>",
      "title": "Automate Layer Manure Removal",
      "desc": "Equip your cage tiers with industrial polypropylene belts, vulcanized drive drums, and inclined cross-conveyors.",
      "btnText": "Get Manure System Quote",
      "product": "Automated Manure Belt System",
      "category": "Waste Management"
    },
    "relatedSlugs": [
      "layer-cages",
      "tunnel-ventilation",
      "static-pressure"
    ]
  },
  "static-pressure": {
    "id": 5,
    "slug": "static-pressure",
    "title": "Static Pressure Control in Tunnel Ventilated Broiler Houses",
    "category": "Ventilation",
    "categoryIcon": "fa-solid fa-gauge-high",
    "heroTag": "<i class=\"fa-solid fa-gauge-high\"></i> Fluid Dynamics & Inlets",
    "heroTitle": "Negative Static Pressure: <br><span class=\"text-gradient\">Fluid Dynamics of Broiler Inlets</span>",
    "heroDesc": "Achieving optimal inlet air projection to ensure fresh air reaches the building center before falling, preventing litter dampness and draft.",
    "heroBg": "assets/images/hero/hero-blog-details.jpg",
    "coverImg": "assets/images/products/ventilation-fan.jpg",
    "coverAlt": "Negative Pressure Exhaust Fan Wall",
    "author": {
      "name": "Dr. Marcus Vance",
      "role": "Chief Agricultural Engineer",
      "avatar": "assets/images/team/team-1.jpg",
      "bio": "Specializes in negative-pressure tunnel ventilation design, psychrometric airflow, and IoT climate automation."
    },
    "date": "Oct 03, 2026",
    "readTime": "6 min read",
    "badge": "Fluid Dynamics Certified",
    "toc": [
      {
        "id": "sec-differentials",
        "title": "1. Understanding Differential Static Pressure (Pascals & Inches WC)"
      },
      {
        "id": "sec-coanda",
        "title": "2. Inlet Jet Momentum: Coanda Effect Along Ceiling Surfaces"
      },
      {
        "id": "sec-width-rules",
        "title": "3. Determining Operating Pressure by House Width (12m to 20m)"
      },
      {
        "id": "sec-smoke-test",
        "title": "4. Air Leakage Diagnostics: The 5-Minute Static Pressure Smoke Test"
      },
      {
        "id": "sec-actuators",
        "title": "5. Modulating Actuator Motors and Linear Rack-and-Pinion Linkages"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-differentials\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Understanding Differential Static Pressure (Pascals & Inches WC)</h2>\n      <p>\n        Static pressure in poultry ventilation refers to the pressure difference between the indoor shed environment and atmospheric pressure outside. Expressed in Pascals (Pa) or hundredths of an inch water column (in. WC), it dictates the velocity at which air enters through wall inlets.\n      </p>\n      <p>\n        Too little static pressure causes incoming cold air to fall straight to the floor, creating wet shavings, ammonia spikes, and chilling chicks. Excessive static pressure strains fan motors and starves the shed of fresh air volume.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-arrows-to-dot\"></i> Pressure Unit Conversion Reference:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>1.0 inch water column (in. WC)</strong> = 249.08 Pascals.<br>\n          Typical commercial poultry operational sweet spot = <strong>0.08 to 0.12 in. WC (20 to 30 Pa)</strong>.\n        </p>\n      </div>\n\n      <h2 id=\"sec-coanda\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Inlet Jet Momentum: Coanda Effect Along Ceiling Surfaces</h2>\n      <p>\n        When inlet baffles open at sufficient velocity (at least 4.5 to 5.5 m/s), air hugs the ceiling via the aerodynamic Coanda effect. It travels all the way to the peak of the roof truss, picking up trapped heat from the ceiling before sinking gently into the bird zone as tempered fresh air.\n      </p>\n\n      <h2 id=\"sec-width-rules\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Determining Operating Pressure by House Width (12m to 20m)</h2>\n      <p>\n        The required static pressure increases with house width because incoming air must travel a greater distance to reach the center line:\n      </p>\n      <ul style=\"margin-left: 1.5rem; margin-block: 1rem; display: flex; flex-direction: column; gap: 0.5rem;\">\n        <li><strong>12-meter wide shed:</strong> Target 18 – 22 Pa (0.07 – 0.09 in. WC)</li>\n        <li><strong>15-meter wide shed:</strong> Target 22 – 26 Pa (0.09 – 0.11 in. WC)</li>\n        <li><strong>18-meter wide shed:</strong> Target 28 – 35 Pa (0.11 – 0.14 in. WC)</li>\n      </ul>\n\n      <h2 id=\"sec-smoke-test\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Air Leakage Diagnostics: The 5-Minute Static Pressure Smoke Test</h2>\n      <p>\n        Uncontrolled air entering through loose curtain edges, cracked wall joints, or loose tunnel doors short-circuits negative pressure. Close all inlets, start one 50-inch exhaust fan, and observe the static pressure gauge. A tight house should easily achieve &gt;37.5 Pa (0.15 in. WC).\n      </p>\n\n      <h2 id=\"sec-actuators\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Modulating Actuator Motors and Linear Rack-and-Pinion Linkages</h2>\n      <p>\n        AviTech rack-and-pinion actuators deliver positive mechanical drive to every wall inlet simultaneously, preventing cable stretch variations and guaranteeing uniform openings down the full 150-meter length of the shed.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-gauge-high\"></i>",
      "title": "Need Pressure & Inlets Calibrated?",
      "desc": "Audit your house tightness, air inlet sizing, and high-precision static pressure differential transmitters.",
      "btnText": "Request Inlet Audit",
      "product": "Automated Air Inlets & Actuators",
      "category": "Ventilation Systems"
    },
    "relatedSlugs": [
      "tunnel-ventilation",
      "cooling-pads",
      "iot-controllers"
    ]
  },
  "nipple-drinking": {
    "id": 6,
    "slug": "nipple-drinking",
    "title": "Automated Nipple Drinking Line Flushing: Biofilm Prevention & Flow Rates",
    "category": "Drinking Systems",
    "categoryIcon": "fa-solid fa-faucet-drip",
    "heroTag": "<i class=\"fa-solid fa-faucet-drip\"></i> Hydration & Biosecurity",
    "heroTitle": "Biofilm Elimination: <br><span class=\"text-gradient\">Automated Nipple Drinking Protocols</span>",
    "heroDesc": "Preventing pathogenic bacterial colonization in closed water lines while delivering 80-100 ml/min discharge for optimal modern broiler genetics.",
    "heroBg": "assets/images/products/cat-drinking-system.jpg",
    "coverImg": "assets/images/products/nipple-drinker.jpg",
    "coverAlt": "Stainless Steel Nipple Drinking Line Assembly",
    "author": {
      "name": "Elena Rostova",
      "role": "Poultry Nutrition & Equipment Specialist",
      "avatar": "assets/images/team/team-2.jpg",
      "bio": "Focuses on broiler feed conversion optimization, mechanical winching alignment, and drinking line sanitation."
    },
    "date": "Sep 28, 2026",
    "readTime": "5 min read",
    "badge": "Biosecurity Certified",
    "toc": [
      {
        "id": "sec-biofilm-risks",
        "title": "1. Why Medication Residues and Warm Shed Temps Accelerate Biofilm"
      },
      {
        "id": "sec-360-pins",
        "title": "2. 360-Degree Stainless Pin Dynamics: Brooding vs Finishing Sensitivity"
      },
      {
        "id": "sec-auto-flushing",
        "title": "3. High-Pressure Automated Solenoid Flushing Schedules"
      },
      {
        "id": "sec-manometers",
        "title": "4. Measuring Water Column Pressure via Transparent Sight Manometers"
      },
      {
        "id": "sec-acidification",
        "title": "5. Organic Acid Sanitization Protocols (pH 5.8 to 6.2 Optimization)"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-biofilm-risks\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Why Medication Residues and Warm Shed Temps Accelerate Biofilm</h2>\n      <p>\n        Inside a commercial poultry shed maintained at 30°C to 33°C during brooding, closed square PVC drinking lines provide an ideal incubator for bacterial biofilm. Vitamin additives, vaccines, and electrolyte carriers leave organic residues that coat internal pipe walls with an impenetrable protective slime.\n      </p>\n      <p>\n        Within 48 hours, Salmonella, Pseudomonas, and E. coli colonize the line, inoculating every drop of drinking water consumed by chicks.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-droplet\"></i> Broiler Water-to-Feed Intake Ratio:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Healthy broilers drink <strong>1.8 to 2.0 times their feed weight</strong> in clean water. Any restriction in flow rate or bacterial contamination directly curbs feed consumption within 12 hours.\n        </p>\n      </div>\n\n      <h2 id=\"sec-360-pins\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. 360-Degree Stainless Pin Dynamics: Brooding vs Finishing Sensitivity</h2>\n      <p>\n        AviTech drinking lines utilize German-engineered 304 stainless steel nipples. During the first 7 days, the trigger pin activates from 360-degree side contact with only 25 grams of chick pressure. As birds mature, vertical lift triggers higher volume discharge (up to 95 ml/min) without dripping.\n      </p>\n\n      <h2 id=\"sec-auto-flushing\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. High-Pressure Automated Solenoid Flushing Schedules</h2>\n      <p>\n        Manual hose flushing is time-consuming and often neglected by farm hands. Our automated system triggers a 2.5-bar high-velocity purge through terminal solenoid valves twice daily, purging stale water and tearing away nascent biofilm before it solidifies.\n      </p>\n\n      <h2 id=\"sec-manometers\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Measuring Water Column Pressure via Transparent Sight Manometers</h2>\n      <p>\n        Pressure regulators at the head of each line feature calibrated transparent sight tubes. Maintain 10cm to 15cm of water column during brooding, gradually increasing to 30cm to 40cm for heavy broilers to ensure adequate flow at the far end of 120-meter lines.\n      </p>\n\n      <h2 id=\"sec-acidification\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Organic Acid Sanitization Protocols (pH 5.8 to 6.2 Optimization)</h2>\n      <p>\n        Dosing organic acids (such as buffered formic and propionic acids) stabilizes drinking water pH between 5.8 and 6.2. This acidity suppresses bacterial multiplication while optimizing digestive enzyme activity in the avian gizzard.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-faucet-drip\"></i>",
      "title": "Equip Precision Drinking Lines",
      "desc": "304 stainless steel nipple drinkers with high-pressure automated flush regulators and anti-perch suspension.",
      "btnText": "Get Drinking Line Quote",
      "product": "Precision Nipple Drinking Line",
      "category": "Drinking Systems"
    },
    "relatedSlugs": [
      "feed-wastage",
      "chick-brooding",
      "manure-belts"
    ]
  },
  "chick-brooding": {
    "id": 7,
    "slug": "chick-brooding",
    "title": "Chick Brooding Thermal Curves & Infrared Radiant Heating Protocols",
    "category": "Brooding",
    "categoryIcon": "fa-solid fa-temperature-arrow-up",
    "heroTag": "<i class=\"fa-solid fa-temperature-arrow-up\"></i> Brooding & Heating",
    "heroTitle": "Radiant Heat Curves: <br><span class=\"text-gradient\">Mastering Day 1 to 14 Brooding</span>",
    "heroDesc": "Optimizing deep litter floor temperatures with radiant gas heaters to accelerate yolk sac absorption and gut development.",
    "heroBg": "assets/images/poultry/chick-brooding.jpg",
    "coverImg": "assets/images/blog/blog-6.jpg",
    "coverAlt": "Chick Brooding Gas Radiant Heaters",
    "author": {
      "name": "Eng. David Kempton",
      "role": "Field Automation Lead",
      "avatar": "assets/images/team/team-4.jpg",
      "bio": "Expert in poultry house waste management, air quality monitoring, and mechanical belt drive alignment."
    },
    "date": "Sep 22, 2026",
    "readTime": "8 min read",
    "badge": "Thermal Science Certified",
    "toc": [
      {
        "id": "sec-chick-physiology",
        "title": "1. Physiology of the Day-Old Chick: Immature Thermoregulation"
      },
      {
        "id": "sec-radiant-vs-furnace",
        "title": "2. Radiant Floor Heat vs Convective Forced-Air Furnaces"
      },
      {
        "id": "sec-step-down",
        "title": "3. Temperature Step-Down Curves: Day 1 (34°C) to Day 21 (24°C)"
      },
      {
        "id": "sec-scatter-patterns",
        "title": "4. Reading Chick Scatter Behavior: Spotting Drafts and Cold Spots"
      },
      {
        "id": "sec-co2-limits",
        "title": "5. Minimum Ventilation Interlocks to Keep Carbon Dioxide < 2,500 PPM"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-chick-physiology\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Physiology of the Day-Old Chick: Immature Thermoregulation</h2>\n      <p>\n        A newly hatched chick lacks the neurological and metabolic capability to self-regulate internal body temperature until 14 days of age. If concrete litter floor temperatures are cold, heat conducts out through their bare feet, causing gut motility to stall and suppressing the immune response.\n      </p>\n      <p>\n        Internal chick vent temperature must measure 40.0°C to 40.5°C (104°F to 105°F). Below 39.5°C, chicks huddle together and refuse to seek out feed or water, stunting early weight gain.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-temperature-high\"></i> Concrete Pre-Heating Mandate:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Heaters must be activated at least <strong>48 hours prior to placement in winter</strong> (24 hours in summer) so concrete floor temperatures reach <strong>30°C to 32°C</strong> before wood shavings are spread.\n        </p>\n      </div>\n\n      <h2 id=\"sec-radiant-vs-furnace\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Radiant Floor Heat vs Convective Forced-Air Furnaces</h2>\n      <p>\n        Forced-air furnaces heat ceiling air first, relying on fans to push heat down. In contrast, AviTech circular canopy radiant gas brooders emit infrared electromagnetic waves that warm the concrete, shavings, and chick backs directly without wasting fuel heating high rafters.\n      </p>\n\n      <h2 id=\"sec-step-down\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Temperature Step-Down Curves: Day 1 (34°C) to Day 21 (24°C)</h2>\n      <p>\n        As chicks develop feathers, house ambient temperature targets are stepped down systematically:\n      </p>\n      <ul style=\"margin-left: 1.5rem; margin-block: 1rem; display: flex; flex-direction: column; gap: 0.5rem;\">\n        <li><strong>Day 1 to 3:</strong> 34°C (93°F) at chick level</li>\n        <li><strong>Day 4 to 7:</strong> 31°C (88°F)</li>\n        <li><strong>Day 8 to 14:</strong> 28°C (82°F)</li>\n        <li><strong>Day 15 to 21:</strong> 25°C (77°F)</li>\n        <li><strong>Day 22+:</strong> 21°C to 23°C (70°F to 73°F) for finishing broilers</li>\n      </ul>\n\n      <h2 id=\"sec-scatter-patterns\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Reading Chick Scatter Behavior: Spotting Drafts and Cold Spots</h2>\n      <p>\n        Even calibrated sensors cannot replace observing chick distribution. Evenly distributed chicks eating, drinking, and sleeping in loose groups indicate perfect thermal balance. Huddling under brooders indicates chilling; packing away toward walls indicates overheating; clustering on one side indicates a cold air draft from an inlet.\n      </p>\n\n      <h2 id=\"sec-co2-limits\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Minimum Ventilation Interlocks to Keep Carbon Dioxide < 2,500 PPM</h2>\n      <p>\n        Gas brooders consume oxygen and emit carbon dioxide (CO2) and water vapor. Never seal a brooding house completely; automated minimum ventilation cycle timers must run exhaust fans for 60 seconds every 5 minutes to maintain CO2 below 2,500 PPM and relative humidity between 55% and 65%.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-fire\"></i>",
      "title": "Upgrade Brooding Heating Systems",
      "desc": "Radiant gas brooders, stainless canopy emitters, and precision PID zone thermal computers for broiler chicks.",
      "btnText": "Get Brooder Quote",
      "product": "Radiant Gas Brooder Pro",
      "category": "Heating & Brooding"
    },
    "relatedSlugs": [
      "feed-wastage",
      "nipple-drinking",
      "chick-vaccination"
    ]
  },
  "layer-cages": {
    "id": 8,
    "slug": "layer-cages",
    "title": "A-Frame vs H-Frame Layer Cages: Structural Longevity & Bird Density",
    "category": "Layer Cages",
    "categoryIcon": "fa-solid fa-table-cells",
    "heroTag": "<i class=\"fa-solid fa-table-cells\"></i> Commercial Layer Equipment",
    "heroTitle": "Layer Housing Geometry: <br><span class=\"text-gradient\">A-Frame vs H-Frame Battery Systems</span>",
    "heroDesc": "A rigorous structural and economic breakdown of tier configurations, automated egg belts, and hot-dip galvanization durability.",
    "heroBg": "assets/images/poultry/layer-farm.jpg",
    "coverImg": "assets/images/products/battery-cages.jpg",
    "coverAlt": "Commercial H-Frame Layer Battery Cage System",
    "author": {
      "name": "Marcus Vance",
      "role": "Commercial Ag Systems Engineer",
      "avatar": "assets/images/team/team-1.jpg",
      "bio": "Specializes in silo structural wind-load engineering, high-tensile flex augers, and automated bin telemetry."
    },
    "date": "Sep 16, 2026",
    "readTime": "7 min read",
    "badge": "Cage Engineering Certified",
    "toc": [
      {
        "id": "sec-vertical-density",
        "title": "1. Vertical Building Volume Utilization: 3-Tier A-Frame vs 8-Tier H-Frame"
      },
      {
        "id": "sec-manure-handling",
        "title": "2. Manure Handling Mechanisms: Deep Pit Drops vs Tier Polypropylene Belts"
      },
      {
        "id": "sec-egg-rollout",
        "title": "3. Egg Collection Dynamics: Conveyor Roll-Out Angle (7.5 Degrees Ideal)"
      },
      {
        "id": "sec-galvanization",
        "title": "4. Hot-Dip Galvanizing Standards (275 g/m² Zinc) vs Ammonia Corrosion"
      },
      {
        "id": "sec-feeding-hoppers",
        "title": "5. Feed Cart Distribution Hoppers vs Stationary Flex Auger Lines"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-vertical-density\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Vertical Building Volume Utilization: 3-Tier A-Frame vs 8-Tier H-Frame</h2>\n      <p>\n        In traditional stepped A-frame layer cages, tiers overlap diagonally so droppings fall directly into a deep pit below. While mechanically simple, A-frame systems waste massive building cubic volume and are rarely built higher than 3 or 4 tiers without cumbersome catwalk platforms.\n      </p>\n      <p>\n        Modern H-frame battery cage systems stack tiers vertically in a rigid structural column up to 8 tiers high. This triples the bird capacity within the identical foundation footprint, making environmentally controlled high-density egg production cost-efficient.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-chart-line\"></i> Stocking Density Comparison:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          In a 100m &times; 14m house, a 4-tier A-frame accommodates approx. <strong>32,000 layers</strong>, whereas an 8-tier H-frame complex houses over <strong>85,000 to 100,000 layers</strong> in superior biosecure comfort.\n        </p>\n      </div>\n\n      <h2 id=\"sec-manure-handling\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Manure Handling Mechanisms: Deep Pit Drops vs Tier Polypropylene Belts</h2>\n      <p>\n        Deep pit A-frame houses store droppings beneath the birds for up to 12 months, producing massive continuous ammonia evaporation. H-frame batteries feature automated polypropylene belts under each tier, extracting dry manure outside the shed every 24 to 48 hours to preserve air quality.\n      </p>\n\n      <h2 id=\"sec-egg-rollout\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Egg Collection Dynamics: Conveyor Roll-Out Angle (7.5 Degrees Ideal)</h2>\n      <p>\n        Bottom cage wire slopes must balance two competing forces: steep enough for eggs to roll immediately away from hen feet, yet gentle enough to avoid high-impact collision against the front conveyor belt buffer. AviTech cages utilize an engineered 7.5-degree slope with cushioned PVC wire coating.\n      </p>\n\n      <h2 id=\"sec-galvanization\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Hot-Dip Galvanizing Standards (275 g/m² Zinc) vs Ammonia Corrosion</h2>\n      <p>\n        Electrolytic electroplated zinc coatings (typically 40–60 g/m²) fail within 3 to 5 years under exposure to warm chicken manure. AviTech structural frames and partition meshes are treated with heavy <strong>275 g/m² hot-dip zinc galvanization</strong>, delivering a 20-year structural lifespan.\n      </p>\n\n      <h2 id=\"sec-feeding-hoppers\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Feed Cart Distribution Hoppers vs Stationary Flex Auger Lines</h2>\n      <p>\n        Motorized traveling feed carts traverse the length of the battery cages, dropping an exact layer of feed mash into deep galvanized troughs simultaneously. Adjustable slide gates prevent feed overfilling, eliminating billing-out waste and ensuring uniform nutrient intake across all tiers.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-table-cells\"></i>",
      "title": "Plan Your Layer Cage Facility",
      "desc": "Modular 3-tier to 8-tier H-frame battery cage layouts with automated egg collection and manure removal.",
      "btnText": "Get Cage System Quote",
      "product": "Commercial Layer Battery Cage",
      "category": "Layer Housing"
    },
    "relatedSlugs": [
      "manure-belts",
      "egg-collection",
      "iot-controllers"
    ]
  },
  "iot-controllers": {
    "id": 9,
    "slug": "iot-controllers",
    "title": "IoT Microclimate Controllers: Modbus Sensor Calibration & Cloud Alerts",
    "category": "Automation",
    "categoryIcon": "fa-solid fa-microchip",
    "heroTag": "<i class=\"fa-solid fa-microchip\"></i> Smart Farm Telemetry",
    "heroTitle": "Automated Microclimate: <br><span class=\"text-gradient\">IoT Sensor Networks & Cloud Telemetry</span>",
    "heroDesc": "Connecting multi-zone temperature probes, static pressure transducers, and variable-speed fan staging into centralized agritech dashboards.",
    "heroBg": "assets/images/poultry/poultry-rd-lab.jpg",
    "coverImg": "assets/images/products/climate-controller.jpg",
    "coverAlt": "AviSmart IoT Climate Computer Panel",
    "author": {
      "name": "Dr. Henrik Lindqvist",
      "role": "IoT Systems Lead",
      "avatar": "assets/images/team/team-3.jpg",
      "bio": "Leading researcher in embryonic thermal management, single-stage vs multi-stage staging, and chick vigor."
    },
    "date": "Sep 10, 2026",
    "readTime": "6 min read",
    "badge": "IoT Architecture Certified",
    "toc": [
      {
        "id": "sec-modbus-bus",
        "title": "1. Industrial Modbus RS-485 Daisy Chaining in High-Interference Sheds"
      },
      {
        "id": "sec-probe-placement",
        "title": "2. Multi-Zone Sensor Topography: Placing Probes for Accurate Averages"
      },
      {
        "id": "sec-pid-tuning",
        "title": "3. Proportional-Integral-Derivative (PID) Variable Speed Fan Tuning"
      },
      {
        "id": "sec-fail-safes",
        "title": "4. Hardwired Electromechanical Backup Alarms (High/Low Temp & Power)"
      },
      {
        "id": "sec-cloud-telemetry",
        "title": "5. Cloud Telemetry: Cellular 4G Uplinks and Instant SMS/Push Notifications"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-modbus-bus\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Industrial Modbus RS-485 Daisy Chaining in High-Interference Sheds</h2>\n      <p>\n        Commercial poultry sheds are hostile electrical environments. Massive 1.5 kW exhaust fan electric motors and variable-frequency drives (VFDs) generate significant electromagnetic interference (EMI).\n      </p>\n      <p>\n        AviSmart controllers employ differential RS-485 Modbus industrial serial communication shielded in twisted pair cabling. Probes transmit digital packets rather than noisy low-voltage analog millivolt signals, preventing phantom sensor drift over 150-meter cable runs.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-shield-halved\"></i> Critical Hardware Fail-Safe Rule:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Never rely exclusively on microprocessor chips. Always wire an independent, mechanical dual-contact thermostat directly to an emergency 12V battery-backed siren and automatic curtain drop winch.\n        </p>\n      </div>\n\n      <h2 id=\"sec-probe-placement\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Multi-Zone Sensor Topography: Placing Probes for Accurate Averages</h2>\n      <p>\n        A single temperature sensor near the center door provides an inaccurate picture of flock comfort. Install at least 4 to 6 PT100 temperature sensors at bird head height (two near tunnel inlets, two at the house center, and two before the exhaust fan wall), plus outdoor psychrometric dry-bulb and humidity stations.\n      </p>\n\n      <h2 id=\"sec-pid-tuning\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Proportional-Integral-Derivative (PID) Variable Speed Fan Tuning</h2>\n      <p>\n        Abruptly clicking 50-inch exhaust fans on and off creates violent static pressure shocks and causes flock flightiness. Closed-loop PID algorithms ramp EC variable-speed fans smoothly from 20% to 100% capacity, matching air exchange precisely to heat production.\n      </p>\n\n      <h2 id=\"sec-fail-safes\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Hardwired Electromechanical Backup Alarms (High/Low Temp & Power)</h2>\n      <p>\n        If main line voltage drops or an internal microcontroller experiences a freeze, an independent electromechanical relay trips. Within 3 seconds, emergency magnetic drop curtains disengage, opening sidewall curtains to supply natural air before suffocation can occur.\n      </p>\n\n      <h2 id=\"sec-cloud-telemetry\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Cloud Telemetry: Cellular 4G Uplinks and Instant SMS/Push Notifications</h2>\n      <p>\n        Encrypted cellular modems stream shed parameters (temperatures, water meter pulses, bird weights, and feed silo levels) directly to farm manager smartphones. If temperature departs &gt;1.5°C from target curve, multi-channel voice calls and instant push alarms wake on-duty engineers.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-microchip\"></i>",
      "title": "Automate Shed Microclimates",
      "desc": "AviSmart multi-stage climate computers with 32 relay stages, 0-10V analog speed control, and cloud dashboard.",
      "btnText": "Get Controller Quote",
      "product": "AviSmart IoT Climate Controller",
      "category": "Climate Automation"
    },
    "relatedSlugs": [
      "tunnel-ventilation",
      "static-pressure",
      "cooling-pads"
    ]
  },
  "cooling-pads": {
    "id": 10,
    "slug": "cooling-pads",
    "title": "Evaporative Cellulose Cooling Pad Descaling and Algae Prevention",
    "category": "Cooling Pads",
    "categoryIcon": "fa-solid fa-droplet",
    "heroTag": "<i class=\"fa-solid fa-droplet\"></i> Evaporative Cooling",
    "heroTitle": "Evaporative Pad Longevity: <br><span class=\"text-gradient\">Descaling & Algae Eradication</span>",
    "heroDesc": "Extending the operational lifespan of 150mm cross-fluted cellulose wet walls through water mineral management and strict dry-out timing.",
    "heroBg": "assets/images/hero/hero-blog-details.jpg",
    "coverImg": "assets/images/products/cooling-pad.jpg",
    "coverAlt": "Cellulose Evaporative Cooling Pad Wall System",
    "author": {
      "name": "Eng. David Kempton",
      "role": "Field Automation Lead",
      "avatar": "assets/images/team/team-4.jpg",
      "bio": "Expert in poultry house waste management, air quality monitoring, and mechanical belt drive alignment."
    },
    "date": "Sep 04, 2026",
    "readTime": "5 min read",
    "badge": "Evaporative Science Certified",
    "toc": [
      {
        "id": "sec-evap-efficiency",
        "title": "1. Evaporative Efficiency: How 7090 Cellulose Flutes Cool Inflow Air"
      },
      {
        "id": "sec-mineral-cycle",
        "title": "2. The Mineral Concentration Cycle: Hardness and Carbonate Encrustation"
      },
      {
        "id": "sec-bleed-off",
        "title": "3. Bleed-Off Bleed Valves: Continuously Draining 10% Sump Volume"
      },
      {
        "id": "sec-drying-cycle",
        "title": "4. The Daily Complete Drying Cycle: Denying Photosynthetic Algae Moisture"
      },
      {
        "id": "sec-sanitizers",
        "title": "5. Safe Chemical Sanitizers vs Acid Washes That Destroy Resin Binders"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-evap-efficiency\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Evaporative Efficiency: How 7090 Cellulose Flutes Cool Inflow Air</h2>\n      <p>\n        Evaporative cooling pads operate on the fundamental thermodynamic principle of latent heat of vaporization: as dry ambient air is drawn through a wet, porous cellulose matrix, water evaporates into vapor, absorbing heat energy from the air and lowering dry-bulb temperatures by 6°C to 12°C.\n      </p>\n      <p>\n        AviTech 7090 cross-fluted paper pads combine 70-degree and 90-degree flute angles. This geometry maximizes wet surface contact area while maintaining an ultra-low static pressure resistance (&lt;30 Pa at 1.5 m/s air face velocity).\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-faucet\"></i> Cooling Pad Sizing Guideline:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          <strong>Pad Surface Area (sq. ft.)</strong> = Total Tunnel Ventilation CFM / 400 FPM (for standard 150mm / 6-inch thick pads). Sizing too small increases air velocity above 450 FPM, dragging raw water droplets directly into the poultry house.\n        </p>\n      </div>\n\n      <h2 id=\"sec-mineral-cycle\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. The Mineral Concentration Cycle: Hardness and Carbonate Encrustation</h2>\n      <p>\n        As pure H2O evaporates, dissolved calcium and magnesium carbonates remain in the recirculating sump water. Over days of hot weather, mineral concentration reaches saturation, depositing rock-hard white scale inside pad flutes that permanently strangles air intake.\n      </p>\n\n      <h2 id=\"sec-bleed-off\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Bleed-Off Bleed Valves: Continuously Draining 10% Sump Volume</h2>\n      <p>\n        The most effective preventative measure is continuous water bleed-off. Installing a metered drain valve that purges 8% to 12% of the water volume circulated by the pump continually discharges concentrated minerals before they precipitate into crystalline scale.\n      </p>\n\n      <h2 id=\"sec-drying-cycle\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. The Daily Complete Drying Cycle: Denying Photosynthetic Algae Moisture</h2>\n      <p>\n        Green algae requires moisture and sunlight to photosynthesize. Program cooling pumps to shut down completely for at least 60 to 90 minutes before sunset while exhaust fans continue running. Fully desiccating the cellulose paper every single evening shrivels algae cells before they form dense slimy mats.\n      </p>\n\n      <h2 id=\"sec-sanitizers\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Safe Chemical Sanitizers vs Acid Washes That Destroy Resin Binders</h2>\n      <p>\n        Never use harsh hydrochloric acid or high concentrations of chlorine (&gt;3 PPM); strong acids dissolve the structural phenolic resins that stiffen the cellulose paper, causing pads to sag and collapse. Use quaternary ammonium biocides formulated specifically for agricultural evaporative wet walls.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-droplet\"></i>",
      "title": "Need Replacement Cooling Pads?",
      "desc": "High-absorption 100mm and 150mm cellulose cooling pads with aluminum frame distribution headers and sumps.",
      "btnText": "Get Cooling Pad Quote",
      "product": "Cellulose Evaporative Cooling Pad Wall",
      "category": "Cooling Systems"
    },
    "relatedSlugs": [
      "tunnel-ventilation",
      "static-pressure",
      "iot-controllers"
    ]
  },
  "egg-collection": {
    "id": 11,
    "slug": "egg-collection",
    "title": "Centralized Egg Collection Conveyor Speed Synchronization",
    "category": "Egg Handling",
    "categoryIcon": "fa-solid fa-arrows-split-up-and-left",
    "heroTag": "<i class=\"fa-solid fa-arrows-split-up-and-left\"></i> Egg Conveying & Quality",
    "heroTitle": "Zero-Crack Conveying: <br><span class=\"text-gradient\">Synchronized Multi-Tier Egg Belts</span>",
    "heroDesc": "Synchronizing variable-frequency drives across cage rows to eliminate shell micro-fissures and transport 40,000 eggs/hour to sorting tables.",
    "heroBg": "assets/images/products/cat-egg-incubator.jpg",
    "coverImg": "assets/images/products/egg-collector.jpg",
    "coverAlt": "Automated Centralized Egg Collection Conveyor System",
    "author": {
      "name": "Elena Rostova",
      "role": "Poultry Equipment Specialist",
      "avatar": "assets/images/team/team-2.jpg",
      "bio": "Focuses on broiler feed conversion optimization, mechanical winching alignment, and drinking line sanitation."
    },
    "date": "Aug 28, 2026",
    "readTime": "4 min read",
    "badge": "Shell Integrity Certified",
    "toc": [
      {
        "id": "sec-crack-thresholds",
        "title": "1. Micro-Cracking Thresholds: Deceleration Shock Above 0.15 m/s"
      },
      {
        "id": "sec-vfd-ramps",
        "title": "2. Variable Frequency Drive (VFD) Ramp Tuning on Cross-Conveyors"
      },
      {
        "id": "sec-de-escalators",
        "title": "3. De-Escalator Soft-Touch Silicone Fingers and Tension Adjustment"
      },
      {
        "id": "sec-jam-sensors",
        "title": "4. Sensor Interlocks: Infrared Jam Detection and Row Feed Controls"
      },
      {
        "id": "sec-cleaning-regimes",
        "title": "5. Scheduled Belt Cleaning, Degreasing, and Tension Calibration"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-crack-thresholds\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Micro-Cracking Thresholds: Deceleration Shock Above 0.15 m/s</h2>\n      <p>\n        In modern commercial layer complexes housing 100,000+ hens, automated collection systems transport tens of thousands of eggs per hour. Shell micro-cracks (hairline fractures invisible to the naked eye until candled) frequently occur at high-impact transfer points where longitudinal cage belts dump onto cross-conveyors.\n      </p>\n      <p>\n        Accelerations or impacts exceeding 0.15 m/s compromise eggshell cuticle integrity, permitting Salmonella colonization and drastically reducing table egg market value.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-chart-pie\"></i> Financial Impact of Micro-Crack Reduction:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Reducing shell crack rates by just <strong>1.2% across a 100,000-bird flock</strong> producing 30 million eggs annually recovers over <strong>360,000 prime Grade-A eggs</strong>, adding upwards of $45,000 straight to farm gross revenue.\n        </p>\n      </div>\n\n      <h2 id=\"sec-vfd-ramps\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Variable Frequency Drive (VFD) Ramp Tuning on Cross-Conveyors</h2>\n      <p>\n        Sudden jerky motor start-stops knock eggs into one another. AviTech conveyor motors are coupled to soft-start Variable Frequency Drives (VFDs) that ramp up over 2.5 seconds, ensuring gradual belt acceleration without jarring momentum.\n      </p>\n\n      <h2 id=\"sec-de-escalators\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. De-Escalator Soft-Touch Silicone Fingers and Tension Adjustment</h2>\n      <p>\n        Vertical de-escalator towers lower eggs from upper battery tiers down to main collection tables. Flexible silicone-tipped transfer fingers cup each egg gently, preventing eggs from tumbling or contacting adjacent eggs during height descent.\n      </p>\n\n      <h2 id=\"sec-jam-sensors\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Sensor Interlocks: Infrared Jam Detection and Row Feed Controls</h2>\n      <p>\n        Optical photo-eyes mounted over transfer bridges scan for pile-ups. If an egg pivots sideways or hesitates at a junction, the sensor halts the longitudinal cage belt immediately while allowing the cross-conveyor to clear the bridge, preventing pile-ups and breakage.\n      </p>\n\n      <h2 id=\"sec-cleaning-regimes\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Scheduled Belt Cleaning, Degreasing, and Tension Calibration</h2>\n      <p>\n        Woven polypropylene egg belts accumulate egg yolk stains and feather dust. Rotating soft nylon brushes installed at the return roller continuously sweep debris away, while daily automatic tracking adjustments ensure belts remain perfectly centered in their side channels.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-boxes-packing\"></i>",
      "title": "Automate Egg Collection Lines",
      "desc": "Synchronized longitudinal belts, soft de-escalator towers, and cross-conveyors delivering eggs directly to grading tables.",
      "btnText": "Get Conveyor Quote",
      "product": "Centralized Egg Collection System",
      "category": "Egg Handling"
    },
    "relatedSlugs": [
      "layer-cages",
      "incubation-humidity",
      "manure-belts"
    ]
  },
  "chick-vaccination": {
    "id": 12,
    "slug": "chick-vaccination",
    "title": "Day-Old Chick Dual Subcutaneous Vaccination: Speed & Precision",
    "category": "Hatchery",
    "categoryIcon": "fa-solid fa-syringe",
    "heroTag": "<i class=\"fa-solid fa-syringe\"></i> Hatchery Biosecurity",
    "heroTitle": "Precision Hatchery Delivery: <br><span class=\"text-gradient\">Dual Subcutaneous Chick Vaccination</span>",
    "heroDesc": "Administering Marek's disease and Newcastle vaccines simultaneously with pneumatic twin-needle injectors at 3,200 chicks per hour.",
    "heroBg": "assets/images/poultry/hatchery-room.jpg",
    "coverImg": "assets/images/products/chick-vaccinator.jpg",
    "coverAlt": "Pneumatic Day-Old Chick Dual Vaccinator Machine",
    "author": {
      "name": "Dr. Henrik Lindqvist",
      "role": "Hatchery Systems Director",
      "avatar": "assets/images/team/team-3.jpg",
      "bio": "Leading researcher in embryonic thermal management, single-stage vs multi-stage staging, and chick vigor."
    },
    "date": "Aug 21, 2026",
    "readTime": "5 min read",
    "badge": "Immunology Certified",
    "toc": [
      {
        "id": "sec-subcutaneous-route",
        "title": "1. Subcutaneous Neck Injection: Reaching the Cervical Space Safely"
      },
      {
        "id": "sec-dual-pneumatics",
        "title": "2. Dual Syringe Pneumatics: 0.2ml and 0.5ml Precise Volumetric Dosing"
      },
      {
        "id": "sec-bevel-guards",
        "title": "3. Bevel Angle & Needle Depth Guards to Prevent Muscle Tissue Penetration"
      },
      {
        "id": "sec-dye-audits",
        "title": "4. Dye Indicators and Quality Audit Regimes (99.5% Site Accuracy)"
      },
      {
        "id": "sec-sterilization",
        "title": "5. Autoclaving, Alcohol Line Flushes, and Teflon O-Ring Maintenance"
      }
    ],
    "sectionsHtml": "\n      <h2 id=\"sec-subcutaneous-route\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">1. Subcutaneous Neck Injection: Reaching the Cervical Space Safely</h2>\n      <p>\n        In modern commercial hatcheries, day-old chicks must be immunized against Marek's Disease, Infectious Bursal Disease (Gumboro), and Newcastle/Infectious Bronchitis before dispatch to broiler farms. The subcutaneous pocket at the back of the chick's neck provides rapid lymphatic uptake with minimal systemic stress.\n      </p>\n      <p>\n        Precision mechanical placement is paramount: an injection delivered too deeply penetrates cervical musculature or vertebra, causing spinal trauma, while an injection delivered too shallowly causes vaccine to leak out into chick down feathers.\n      </p>\n\n      <div style=\"background: var(--color-accent-soft); border-inline-start: 4px solid var(--color-accent); border-radius: var(--radius-md); padding: 1.5rem; margin-block: 2rem;\">\n        <h4 style=\"font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary-dark);\"><i class=\"fa-solid fa-syringe\"></i> Vaccination Speed Benchmark:</h4>\n        <p style=\"margin: 0; font-size: 0.95rem; color: var(--text-main);\">\n          Trained operators using the AviTech pneumatic dual vaccinator routinely achieve <strong>2,800 to 3,400 chicks per hour</strong> with documented injection accuracy exceeding <strong>99.5%</strong>.\n        </p>\n      </div>\n\n      <h2 id=\"sec-dual-pneumatics\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">2. Dual Syringe Pneumatics: 0.2ml and 0.5ml Precise Volumetric Dosing</h2>\n      <p>\n        Administering two separate biologicals simultaneously requires isolated fluid circuits. The AviTech unit couples twin micro-machined glass syringes actuated by an oil-free pneumatic cylinder, delivering simultaneous 0.2 ml and 0.5 ml doses in a single 0.15-second stroke.\n      </p>\n\n      <h2 id=\"sec-bevel-guards\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">3. Bevel Angle & Needle Depth Guards to Prevent Muscle Tissue Penetration</h2>\n      <p>\n        The unit employs ultra-sharp 20-gauge 45-degree short-bevel surgical needles set behind an ergonomic contoured neck mold. When the operator presses the chick gently against the contact sensor, the needle advances exactly 3.2mm beneath the skin fold before injecting and retracting instantly.\n      </p>\n\n      <h2 id=\"sec-dye-audits\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">4. Dye Indicators and Quality Audit Regimes (99.5% Site Accuracy)</h2>\n      <p>\n        Quality control teams mix sterile food-grade blue or green dye into the vaccine diluent. Every hour, 100 chicks from each station are examined by parting neck down; the dye confirms exact subcutaneous delivery and zero wet-neck leakage.\n      </p>\n\n      <h2 id=\"sec-sterilization\" style=\"font-size: 1.75rem; margin-block: 2rem 1rem;\">5. Autoclaving, Alcohol Line Flushes, and Teflon O-Ring Maintenance</h2>\n      <p>\n        At the conclusion of each shift, syringes and delivery lines are flushed with 70% isopropanol followed by sterile distilled water. The all-stainless manifold is autoclavable at 121°C, and Teflon O-rings are replaced every 100,000 cycles to guarantee zero dose drift.\n      </p>\n    ",
    "cta": {
      "icon": "<i class=\"fa-solid fa-syringe\"></i>",
      "title": "Industrial Chick Vaccinators",
      "desc": "Pneumatic twin-syringe day-old chick vaccinators with automatic counters, syringe guards, and foot-pedal or touch actuation.",
      "btnText": "Get Vaccinator Quote",
      "product": "Pneumatic Day-Old Chick Vaccinator",
      "category": "Hatchery Automation"
    },
    "relatedSlugs": [
      "incubation-humidity",
      "chick-brooding",
      "nipple-drinking"
    ]
  }
};
    const idToSlugMap = {
  "0": "tunnel-ventilation",
  "1": "feed-wastage",
  "2": "incubation-humidity",
  "3": "silo-condensation",
  "4": "manure-belts",
  "5": "static-pressure",
  "6": "nipple-drinking",
  "7": "chick-brooding",
  "8": "layer-cages",
  "9": "iot-controllers",
  "10": "cooling-pads",
  "11": "egg-collection",
  "12": "chick-vaccination"
};

    const urlParams = new URLSearchParams(window.location.search);
    let rawKey = urlParams.get('article') || urlParams.get('id') || 'tunnel-ventilation';
    rawKey = rawKey.trim().toLowerCase();

    // Map numeric IDs or aliases to canonical slug
    const resolvedSlug = idToSlugMap[rawKey] || rawKey;
    const article = articlesData[resolvedSlug] || articlesData['tunnel-ventilation'];
    if (!article) return;

    // 1. Browser Title
    document.title = `${article.title} | AviTech Poultry Systems`;

    // 2. Hero Elements
    const heroBgEl = document.getElementById('bd-hero-bg');
    const heroTagEl = document.getElementById('bd-hero-tag');
    const heroTitleEl = document.getElementById('bd-hero-title');
    const heroDescEl = document.getElementById('bd-hero-desc');
    const authorNameEl = document.getElementById('bd-author-name');
    const articleDateEl = document.getElementById('bd-article-date');
    const readTimeEl = document.getElementById('bd-read-time');
    const breadcrumbTitleEl = document.getElementById('bd-breadcrumb-title');

    if (heroBgEl && article.heroBg) {
      heroBgEl.src = article.heroBg;
      heroBgEl.alt = article.title;
    }
    if (heroTagEl && article.heroTag) heroTagEl.innerHTML = article.heroTag;
    if (heroTitleEl && article.heroTitle) heroTitleEl.innerHTML = article.heroTitle;
    if (heroDescEl && article.heroDesc) heroDescEl.textContent = article.heroDesc;
    if (authorNameEl && article.author) authorNameEl.textContent = article.author.name;
    if (articleDateEl && article.date) articleDateEl.textContent = article.date;
    if (readTimeEl && article.readTime) readTimeEl.textContent = article.readTime;
    if (breadcrumbTitleEl && article.category) breadcrumbTitleEl.textContent = article.category;

    // 3. Cover Image
    const coverImgEl = document.getElementById('bd-cover-img');
    if (coverImgEl && article.coverImg) {
      coverImgEl.src = article.coverImg;
      coverImgEl.alt = article.coverAlt || article.title;
    }

    // 4. Table of Contents
    const tocListEl = document.getElementById('bd-toc-list');
    if (tocListEl && article.toc && article.toc.length > 0) {
      tocListEl.innerHTML = article.toc.map(item => `
        <li><a href="#${item.id}" style="color: var(--c-slate-blue); font-weight: 600;">${item.title}</a></li>
      `).join('');
    }

    // 5. Article Main Content
    if (article.sectionsHtml) {
      articleBodyEl.innerHTML = article.sectionsHtml;
    }

    // 6. Article Badge
    const badgeEl = document.getElementById('bd-article-badge');
    if (badgeEl && article.badge) {
      badgeEl.textContent = article.badge;
    }

    // 7. Sidebar Author Bio Widget
    const sideAvatarEl = document.getElementById('bd-sidebar-author-avatar');
    const sideNameEl = document.getElementById('bd-sidebar-author-name');
    const sideRoleEl = document.getElementById('bd-sidebar-author-role');
    const sideBioEl = document.getElementById('bd-sidebar-author-bio');

    if (article.author) {
      if (sideAvatarEl) {
        sideAvatarEl.src = article.author.avatar;
        sideAvatarEl.alt = article.author.name;
      }
      if (sideNameEl) sideNameEl.textContent = article.author.name;
      if (sideRoleEl) sideRoleEl.textContent = article.author.role;
      if (sideBioEl) sideBioEl.textContent = article.author.bio;
    }

    // 8. Sidebar Quote / CTA Box
    if (article.cta) {
      const ctaIconEl = document.getElementById('bd-sidebar-cta-icon');
      const ctaTitleEl = document.getElementById('bd-sidebar-cta-title');
      const ctaDescEl = document.getElementById('bd-sidebar-cta-desc');
      const ctaBtnEl = document.getElementById('bd-sidebar-cta-btn');

      if (ctaIconEl) ctaIconEl.innerHTML = article.cta.icon;
      if (ctaTitleEl) ctaTitleEl.textContent = article.cta.title;
      if (ctaDescEl) ctaDescEl.textContent = article.cta.desc;
      if (ctaBtnEl) {
        ctaBtnEl.textContent = article.cta.btnText;
        if (article.cta.product) ctaBtnEl.setAttribute('data-product-name', article.cta.product);
        if (article.cta.category) ctaBtnEl.setAttribute('data-category', article.cta.category);
      }
    }

    // 9. Related Field Guides Widget
    const relatedListEl = document.getElementById('bd-related-list');
    if (relatedListEl && article.relatedSlugs && article.relatedSlugs.length > 0) {
      relatedListEl.innerHTML = article.relatedSlugs.map(rSlug => {
        const rel = articlesData[rSlug];
        if (!rel) return '';
        return `
          <div style="display: flex; gap: 1rem; align-items: center;">
            <img src="${rel.coverImg || rel.heroBg}" alt="${rel.title}" style="width: 65px; height: 65px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;" loading="lazy">
            <div>
              <h5 style="font-size: 0.92rem; line-height: 1.35; margin-bottom: 0.25rem;">
                <a href="blog-details.html?article=${rel.slug}">${rel.title}</a>
              </h5>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${rel.date} · ${rel.readTime}</span>
            </div>
          </div>
        `;
      }).filter(Boolean).join('');
    }
  }

  /* --------------------------------------------------------------------------
     13. CONTACT PAGE INTERACTIVE STORE LOCATOR & ADVANCED FORM
     -------------------------------------------------------------------------- */
  function initContactPageFeatures() {
    // 1. Copy Buttons
    document.querySelectorAll('.copy-text-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHtml = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color: #16A34A;"></i> Copied!';
          if (window.showToast) {
            window.showToast('Copied to Clipboard', textToCopy, 'check');
          }
          setTimeout(() => {
            btn.innerHTML = originalHtml;
          }, 2000);
        }).catch(() => {
          const temp = document.createElement('textarea');
          temp.value = textToCopy;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          if (window.showToast) {
            window.showToast('Copied to Clipboard', textToCopy, 'check');
          }
        });
      });
    });

    // 2. Interactive Store Locator Map (Authentic Google Maps Live Embed)
    const googleMapsIframe = document.getElementById('google-maps-iframe');
    if (googleMapsIframe) {
      const locations = {
        atlanta: {
          name: "AviTech Global Headquarters & Campus",
          state: "Georgia, United States",
          address: "742 Agritech Boulevard, Industrial Ag Zone, Atlanta, GA 30318, USA",
          query: "742+Agritech+Blvd,+Atlanta,+GA+30318",
          phone: "+1 (800) 459-2848 / +1 (404) 555-0198",
          hours: "Mon–Sat: 07:00 AM – 06:00 PM EST",
          status: "Open Now · Visiting Welcome",
          zoom: 14,
          directions: "https://www.google.com/maps/dir/?api=1&destination=742+Agritech+Blvd,+Atlanta,+GA+30318",
          googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=742+Agritech+Blvd,+Atlanta,+GA+30318",
          features: [
            '<i class="fa-solid fa-microchip"></i> Live Testing Shed',
            '<i class="fa-solid fa-boxes-stacked"></i> Spare Parts Depot',
            '<i class="fa-solid fa-truck"></i> Drive-In Loading Bay'
          ]
        },
        desmoines: {
          name: "Midwest Poultry Equipment Hub & Silo Depot",
          state: "Iowa, United States",
          address: "1250 Agribank Way, Des Moines, IA 50309, USA",
          query: "1250+Agribank+Way,+Des+Moines,+IA+50309",
          phone: "+1 (515) 555-0142",
          hours: "Mon–Fri: 07:00 AM – 05:30 PM CST",
          status: "Open Now · Commercial Depot",
          zoom: 14,
          directions: "https://www.google.com/maps/dir/?api=1&destination=1250+Agribank+Way,+Des+Moines,+IA+50309",
          googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=1250+Agribank+Way,+Des+Moines,+IA+50309",
          features: [
            '<i class="fa-solid fa-warehouse"></i> Silo Buffer Yard',
            '<i class="fa-solid fa-rotate"></i> Bulk Auger Stock',
            '<i class="fa-solid fa-van-shuttle"></i> Field Service Vans'
          ]
        },
        salisbury: {
          name: "Delmarva Broiler Integration Support Hub",
          state: "Maryland, United States",
          address: "400 Delmarva Logistics Pkwy, Salisbury, MD 21804, USA",
          query: "400+Delmarva+Logistics+Pkwy,+Salisbury,+MD+21804",
          phone: "+1 (410) 555-0187",
          hours: "Mon–Fri: 07:00 AM – 05:00 PM EST",
          status: "Open Now · Technical Station",
          zoom: 14,
          directions: "https://www.google.com/maps/dir/?api=1&destination=400+Delmarva+Logistics+Pkwy,+Salisbury,+MD+21804",
          googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=400+Delmarva+Logistics+Pkwy,+Salisbury,+MD+21804",
          features: [
            '<i class="fa-solid fa-fan"></i> Ventilation Testing Lab',
            '<i class="fa-solid fa-faucet-drip"></i> Nipple Line Spares',
            '<i class="fa-solid fa-truck-medical"></i> 24/7 Breakdown Dispatch'
          ]
        },
        rotterdam: {
          name: "EMEA Maritime Ocean Export Terminal",
          state: "Rotterdam, Netherlands",
          address: "Havenhaven 88, Port Industrial Complex, 3011 Rotterdam, Netherlands",
          query: "Port+of+Rotterdam,+Netherlands",
          phone: "+31 10 555 0122",
          hours: "Mon–Fri: 08:00 AM – 06:00 PM CET",
          status: "Open Now · International Logistics",
          zoom: 13,
          directions: "https://www.google.com/maps/dir/?api=1&destination=Port+of+Rotterdam+Netherlands",
          googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Port+of+Rotterdam+Netherlands",
          features: [
            '<i class="fa-solid fa-ship"></i> Ocean Freight Staging',
            '<i class="fa-solid fa-certificate"></i> CE Certification Lab',
            '<i class="fa-solid fa-plane-departure"></i> Global Air Express'
          ]
        }
      };

      let activeLocationKey = 'atlanta';
      let currentMapMode = 'm'; // 'm' for standard Google roadmap, 'k' for satellite

      function renderGoogleMapsFrame(key, mode) {
        const loc = locations[key];
        if (!loc) return;
        const newSrc = `https://maps.google.com/maps?q=${loc.query}&t=${mode}&z=${loc.zoom}&ie=UTF8&iwloc=&output=embed`;
        if (googleMapsIframe.src !== newSrc) {
          googleMapsIframe.src = newSrc;
        }
        const openDirectLink = document.getElementById('open-gmaps-direct');
        if (openDirectLink) {
          openDirectLink.href = loc.googleMapsUrl;
        }
      }

      function updateCardDetails(key) {
        const data = locations[key];
        if (!data) return;

        const statusEl = document.getElementById('loc-status');
        const stateEl = document.getElementById('loc-state');
        const nameEl = document.getElementById('loc-name');
        const addrEl = document.getElementById('loc-address');
        const phoneEl = document.getElementById('loc-phone');
        const hoursEl = document.getElementById('loc-hours');
        const featuresEl = document.getElementById('loc-features');
        const dirBtn = document.getElementById('loc-directions-btn');

        if (statusEl) statusEl.textContent = data.status;
        if (stateEl) stateEl.textContent = data.state;
        if (nameEl) nameEl.textContent = data.name;
        if (addrEl) addrEl.textContent = data.address;
        if (phoneEl) phoneEl.textContent = data.phone;
        if (hoursEl) hoursEl.textContent = data.hours;
        if (dirBtn) dirBtn.href = data.directions;

        if (featuresEl) {
          featuresEl.innerHTML = data.features.map(f => `<span class="store-feature-chip">${f}</span>`).join('');
        }
      }

      // Copy active store address button
      const copyAddrBtn = document.getElementById('loc-copy-addr-btn');
      if (copyAddrBtn) {
        copyAddrBtn.addEventListener('click', () => {
          const data = locations[activeLocationKey];
          if (!data) return;
          navigator.clipboard.writeText(data.address).then(() => {
            const original = copyAddrBtn.innerHTML;
            copyAddrBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #16A34A;"></i> Copied!';
            if (window.showToast) {
              window.showToast('Address Copied', data.address, 'check');
            }
            setTimeout(() => {
              copyAddrBtn.innerHTML = original;
            }, 2000);
          }).catch(() => {
            const temp = document.createElement('textarea');
            temp.value = data.address;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            if (window.showToast) {
              window.showToast('Address Copied', data.address, 'check');
            }
          });
        });
      }

      // Card Collapse / Expand Toggle
      const toggleCardBtn = document.getElementById('toggle-store-card-btn');
      const storeCard = document.getElementById('store-floating-card');
      if (toggleCardBtn && storeCard) {
        toggleCardBtn.addEventListener('click', () => {
          storeCard.classList.toggle('collapsed');
        });
      }

      // Google Map View Switcher (Standard Map 'm' vs Satellite 'k')
      document.querySelectorAll('.map-view-btn[data-map-layer]').forEach(btn => {
        btn.addEventListener('click', () => {
          const layerKey = btn.getAttribute('data-map-layer');
          document.querySelectorAll('.map-view-btn[data-map-layer]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          if (layerKey === 'satellite') {
            currentMapMode = 'k';
          } else {
            currentMapMode = 'm';
          }
          renderGoogleMapsFrame(activeLocationKey, currentMapMode);
        });
      });

      function switchStore(key) {
        if (!locations[key]) return;
        activeLocationKey = key;

        // Update tab buttons
        document.querySelectorAll('.store-tab-pill').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-location') === key);
        });

        // Update card info
        updateCardDetails(key);

        // Update Google Maps iframe
        renderGoogleMapsFrame(key, currentMapMode);
      }

      // Hook tab pills
      document.querySelectorAll('.store-tab-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const locKey = btn.getAttribute('data-location');
          if (locKey) switchStore(locKey);
        });
      });
    }

    // 3. Project Estimation Form & Success State
    const contactForm = document.getElementById('contact-page-form');
    const successCard = document.getElementById('contact-success-state');

    if (contactForm && successCard) {
      // Timeline pills
      const timelinePills = contactForm.querySelectorAll('.timeline-pill');
      const timelineInput = document.getElementById('contact-timeline');

      timelinePills.forEach(pill => {
        pill.addEventListener('click', () => {
          timelinePills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          if (timelineInput) {
            timelineInput.value = pill.getAttribute('data-timeline') || '';
          }
        });
      });

      // Blueprint dropzone simulation
      const dropzone = document.getElementById('blueprint-dropzone');
      const fileInput = document.getElementById('blueprint-file-input');
      const dropText = document.getElementById('dropzone-text');

      if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            dropText.innerHTML = `<strong style="color: #16A34A;"><i class="fa-solid fa-file-circle-check"></i> ${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB attached)`;
          }
        });
      }

      // Real-time clearance of is-invalid as user types valid info
      const formFields = contactForm.querySelectorAll('.form-control, select.form-control');
      formFields.forEach(field => {
        const clearErrorIfValid = () => {
          if (!field.classList.contains('is-invalid')) return;
          const val = field.value.trim();
          if (field.type === 'email') {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
              field.classList.remove('is-invalid');
            }
          } else if (field.type === 'tel' || field.name === 'phone') {
            const digits = val.replace(/\D/g, '');
            if (digits.length >= 7 && digits.length <= 15) {
              field.classList.remove('is-invalid');
            }
          } else if (val.length > 0) {
            field.classList.remove('is-invalid');
          }
        };

        field.addEventListener('input', clearErrorIfValid);
        field.addEventListener('change', clearErrorIfValid);
      });

      // Ensure phone restriction is bound to contact-phone
      const contactPhoneInput = document.getElementById('contact-phone');
      if (contactPhoneInput && window.setupPhoneInput) {
        window.setupPhoneInput(contactPhoneInput);
      }

      // Form submit handler
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          const val = field.value.trim();
          if (!val) {
            field.classList.add('is-invalid');
            isValid = false;
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            field.classList.add('is-invalid');
            isValid = false;
          } else if (field.type === 'tel' || field.name === 'phone') {
            const digits = val.replace(/\D/g, '');
            if (digits.length < 7 || digits.length > 15) {
              field.classList.add('is-invalid');
              isValid = false;
            } else {
              field.classList.remove('is-invalid');
            }
          } else {
            field.classList.remove('is-invalid');
          }
        });

        if (!isValid) return;

        const submitBtn = document.getElementById('contact-submit-btn');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Formulating Official Quotation...';
        }

        setTimeout(() => {
          const nameVal = contactForm.querySelector('[name="name"]')?.value || 'Customer';
          const locVal = contactForm.querySelector('[name="location"]')?.value || 'Georgia, USA';
          const randomTicket = Math.floor(1000 + Math.random() * 9000);

          const clientNameEl = document.getElementById('success-client-name');
          const ticketIdEl = document.getElementById('success-ticket-id');
          const deliveryLocEl = document.getElementById('success-delivery-loc');

          if (clientNameEl) clientNameEl.textContent = nameVal;
          if (ticketIdEl) ticketIdEl.textContent = `#AVI-2026-${randomTicket}`;
          if (deliveryLocEl) deliveryLocEl.textContent = locVal;

          contactForm.style.display = 'none';
          successCard.style.display = 'block';

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }

          if (window.showToast) {
            window.showToast('Quotation Request Received', `Ticket #AVI-2026-${randomTicket} logged for ${nameVal}.`, 'check');
          }

          const headerOffset = document.querySelector('.site-header')?.offsetHeight || 80;
          const rect = successCard.getBoundingClientRect();
          window.scrollTo({
            top: rect.top + window.pageYOffset - (headerOffset + 20),
            behavior: 'smooth'
          });
        }, 600);
      });

      // Reset form button
      const resetBtn = document.getElementById('reset-contact-form-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          contactForm.reset();
          timelinePills.forEach((p, idx) => p.classList.toggle('active', idx === 0));
          if (dropText) {
            dropText.textContent = 'Click to browse or drag & drop PDF, DWG, PNG up to 25MB';
          }
          successCard.style.display = 'none';
          contactForm.style.display = 'block';
        });
      }
    }
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
    initSpecializedServicesSection();
    initServiceDetailsPage();
    initBlogPage();
    initBlogDetailsPage();
    initContactPageFeatures();
    if (window.initGlobalPhoneRestrictions) {
      window.initGlobalPhoneRestrictions();
    }
  });
})();
