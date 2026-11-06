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
        title: "Reducing Feed Wastage: Pan Feeder Height Calibration from Day 1 to 42",
        category: "feeding",
        categoryName: "Feeding Systems",
        date: "Oct 28, 2026",
        readTime: "5 min read",
        image: "assets/images/blog/blog-2.jpg",
        imageAlt: "Optimizing FCR with Pan Feeders",
        snippet: "A step-by-step checklist on winching pan feeder lines so pans rest at bird back height, preventing spillage into bedding.",
        link: "blog-details.html"
      },
      {
        id: 2,
        title: "Multi-Stage Incubation: Critical PID Humidity Settings for High Hatchability",
        category: "hatchery",
        categoryName: "Hatchery",
        date: "Oct 20, 2026",
        readTime: "7 min read",
        image: "assets/images/blog/blog-3.jpg",
        imageAlt: "Hatchery Incubation Best Practices",
        snippet: "How ultrasonic cool moisture systems prevent egg dehydration while protecting embryonic gas exchange in multi-stage setters.",
        link: "blog-details.html"
      },
      {
        id: 3,
        title: "Condensation Control in Galvanized Steel Silos: Preventing Mold & Clumping",
        category: "storage",
        categoryName: "Bulk Storage",
        date: "Oct 15, 2026",
        readTime: "6 min read",
        image: "assets/images/blog/blog-4.jpg",
        imageAlt: "Bulk Feed Silo Management",
        snippet: "Best engineering practices for pneumatic silo filling, boot inspection, and thermal condensation barriers in humid climates.",
        link: "blog-details.html"
      },
      {
        id: 4,
        title: "Automated Polypropylene Manure Belts: Reducing Ammonia Below 10 PPM",
        category: "biosecurity",
        categoryName: "Biosecurity",
        date: "Oct 09, 2026",
        readTime: "4 min read",
        image: "assets/images/blog/blog-5.jpg",
        imageAlt: "Automated Manure Handling",
        snippet: "Why daily manure belt clearing extends the lifespan of cage steel and drastically lowers respiratory disease in high-density layers.",
        link: "blog-details.html"
      },
      {
        id: 5,
        title: "Static Pressure Control in Tunnel Ventilated Broiler Houses",
        category: "ventilation",
        categoryName: "Ventilation",
        date: "Oct 03, 2026",
        readTime: "6 min read",
        image: "assets/images/products/ventilation-fan.jpg",
        imageAlt: "Tunnel Ventilation Exhaust Cone Fans",
        snippet: "Maintaining between 0.08 and 0.12 inches of water column (20–30 Pa) static pressure to ensure high-velocity air reaches the shed ceiling before dropping.",
        link: "blog-details.html"
      },
      {
        id: 6,
        title: "Automated Nipple Drinking Line Flushing: Biofilm Prevention & Flow Rates",
        category: "biosecurity",
        categoryName: "Drinking Systems",
        date: "Sep 28, 2026",
        readTime: "5 min read",
        image: "assets/images/products/nipple-drinker.jpg",
        imageAlt: "Automated Stainless Nipple Drinking Line",
        snippet: "High-pressure automatic line flushing protocols that dissolve mineral deposits and maintain 90ml/min nipple discharge for peak flock hydration.",
        link: "blog-details.html"
      },
      {
        id: 7,
        title: "Chick Brooding Thermal Curves & Infrared Radiant Heating Protocols",
        category: "feeding",
        categoryName: "Brooding",
        date: "Sep 22, 2026",
        readTime: "8 min read",
        image: "assets/images/blog/blog-6.jpg",
        imageAlt: "Chick Brooding Radiant Gas Brooder",
        snippet: "Managing radiant floor temperatures from 34°C down to 24°C over 21 days with zone-controlled gas brooders and canopy sensors.",
        link: "blog-details.html"
      },
      {
        id: 8,
        title: "A-Frame vs H-Frame Layer Cages: Structural Longevity & Bird Density",
        category: "cages",
        categoryName: "Layer Cages",
        date: "Sep 16, 2026",
        readTime: "7 min read",
        image: "assets/images/products/battery-cages.jpg",
        imageAlt: "Commercial Hot-Dip Galvanized Layer Battery Cages",
        snippet: "Engineering comparison of vertical footprint, manure removal clearance, and egg roll-out conveyor angles for multi-tier layer complexes.",
        link: "blog-details.html"
      },
      {
        id: 9,
        title: "IoT Microclimate Controllers: Modbus Sensor Calibration & Cloud Alerts",
        category: "automation",
        categoryName: "Automation",
        date: "Sep 10, 2026",
        readTime: "6 min read",
        image: "assets/images/products/climate-controller.jpg",
        imageAlt: "AviSmart IoT Climate Controller",
        snippet: "Integrating PT100 temperature probes, relative humidity sensors, and backup high/low thermostat interlocks into cloud telemetry dashboards.",
        link: "blog-details.html"
      },
      {
        id: 10,
        title: "Evaporative Cellulose Cooling Pad Descaling and Algae Prevention",
        category: "ventilation",
        categoryName: "Cooling Pads",
        date: "Sep 04, 2026",
        readTime: "5 min read",
        image: "assets/images/products/cooling-pad.jpg",
        imageAlt: "Evaporative Cellulose Cooling Pad Wall",
        snippet: "Water treatment regimes, blowdown bleed-off rates, and seasonal drying cycles to extend 150mm cellulose pad life beyond 5 years.",
        link: "blog-details.html"
      },
      {
        id: 11,
        title: "Centralized Egg Collection Conveyor Speed Synchronization",
        category: "cages",
        categoryName: "Egg Handling",
        date: "Aug 28, 2026",
        readTime: "4 min read",
        image: "assets/images/products/egg-collector.jpg",
        imageAlt: "Automated Centralized Egg Collection Conveyor",
        snippet: "Balancing variable-frequency motor drives across multi-tier conveyor cross-transfers to eliminate hairline eggshell micro-cracks.",
        link: "blog-details.html"
      },
      {
        id: 12,
        title: "Day-Old Chick Dual Subcutaneous Vaccination: Speed & Precision",
        category: "hatchery",
        categoryName: "Hatchery",
        date: "Aug 21, 2026",
        readTime: "5 min read",
        image: "assets/images/products/chick-vaccinator.jpg",
        imageAlt: "Pneumatic Day-Old Chick Dual Vaccinator",
        snippet: "Pneumatic dual-syringe calibration standards for administering Mareks and ND/IB vaccines to 3,000+ chicks per hour with zero stress.",
        link: "blog-details.html"
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
  });
})();
