# AviTech – Commercial Poultry Farm Equipment Supplier HTML5 Template

A premium, modern, fully responsive commercial poultry farming and agricultural equipment website template built purely with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

Zero frameworks or dependencies required (No React, Vue, Angular, Bootstrap, or Tailwind CSS).

---

## 🌾 Overview & Highlights

- **Industry-Specific Design**: Tailored specifically for commercial poultry equipment suppliers, agritech integrators, hatchery manufacturers, and agricultural engineering contractors.
- **2 Complete Homepage Variations**:
  - `index.html`: Modern Agricultural Landing Page with cinematic hero slider, featured product catalog, split about story, animated statistics, client reviews, and blog highlights.
  - `index-2.html`: Specialized Poultry Equipment Showcase focusing on automated pan feeders, layer battery cages, multi-stage egg incubators, equipment comparison tables, and direct engineering RFQ tools.
- **11 Complete HTML5 Pages**:
  - `index.html` – Modern Agricultural Landing Page
  - `index-2.html` – Specialized Poultry Equipment Landing Page
  - `about.html` – About Us, History Timeline & Engineering Specialists
  - `products.html` – Interactive Equipment Catalog with Category Filters, Live Search & Sorting
  - `product-details.html` – Detailed Technical Specs, Photo Gallery, Dimensions & Review Tabs
  - `farming-tips.html` – Educational Agronomy Hub with Temperature Matrix & FAQ Accordion
  - `services.html` – 8 Commercial Farm Services with Turnkey Process Steps
  - `service-details.html` – Deep-Dive Turnkey Installation Service Blueprint
  - `blog.html` – Technical Journal with Sidebar & Categories
  - `blog-details.html` – In-depth Reading Experience with Table of Contents & Formula Callouts
  - `contact.html` – Comprehensive Quotation RFQ Form & Interactive Map
- **Vanilla JavaScript Architecture**:
  - Autoplay cinematic hero slider with Ken Burns zoom, progress timer, and swipe gestures
  - Dark Mode & Light Mode toggle with `localStorage` persistence
  - RTL (Right-to-Left) direction toggle with logical CSS property support (Arabic/Hebrew ready)
  - Interactive Quick View modal for every piece of equipment
  - Dynamic equipment quotation request modal auto-populating selected equipment
  - Live category filtering, instant debounced search, and sorting
  - Animated statistics counters using `requestAnimationFrame` with ease-out curves
  - Sticky glassmorphism header with active link detection and mobile drawer menu
  - Client-side form validation with inline feedback and animated toast notifications
- **Typography**: Google Fonts (`Manrope`, `DM Sans`, `Outfit`)
- **Icons**: Font Awesome 6 (SVG CDN)

---

## 📁 Project File Structure

```text
poultry-equipment-template/
├── index.html                  # Home 1 - Modern Agricultural Landing
├── index-2.html                # Home 2 - Specialized Equipment Showcase
├── about.html                  # About Us & Engineering Team
├── products.html               # Products Catalog & Filters
├── product-details.html        # Product Technical Specifications
├── farming-tips.html           # Poultry Tips & Management Guides
├── services.html               # Farm Services & Setup
├── service-details.html        # Turnkey Installation Service Details
├── blog.html                   # Blog Articles Listing
├── blog-details.html           # Technical Article Reading Experience
├── contact.html                # Contact Us & Equipment Quotation Form
├── assets/
│   ├── css/
│   │   ├── style.css           # Core Design System, Variables, Layouts & Components
│   │   ├── animations.css      # Keyframes, Scroll Reveal Observer, Hover Effects
│   │   └── responsive.css      # Responsive Breakpoints (1400px down to 380px)
│   ├── js/
│   │   ├── theme.js            # Light/Dark Theme & RTL Direction Switcher
│   │   ├── slider.js           # Autoplay Hero Slider & Testimonial Carousel
│   │   ├── animations.js       # Intersection Observer Scroll Reveals & Counters
│   │   ├── products.js         # 12-Product Catalog Database, Filters, Search & Quick View
│   │   ├── forms.js            # RFQ Modal, Contact Form Validation & Toasts
│   │   └── main.js             # Sticky Nav, Mobile Drawer, Accordions, Tabs & Back-to-Top
│   └── images/
│       ├── hero/               # High-resolution farm & machinery hero slides
│       ├── products/           # Authentic equipment photos (feeders, cages, fans, incubators)
│       ├── poultry/            # Broiler, layer, brooding, and installation scenes
│       ├── blog/               # Agronomy and technical ventilation photography
│       └── team/               # Engineers, agronomists, and farmer portraits
└── README.md                   # Documentation Guide
```

---

## 🎨 Design System & Color Palette

| Color Name | HEX Code | Website Application |
| :--- | :--- | :--- |
| **Deep Navy** | `#0D1B2A` | Hero sections, site footer, dark backgrounds, high-contrast headings |
| **Midnight Blue** | `#1B263B` | Navbar, cards, dark surfaces, primary body text |
| **Slate Blue** | `#415A77` | Secondary sections, primary buttons, subheadings, interactive links |
| **Sage Green** | `#778D7A` | Highlights, badges, icons, accents, secondary buttons |
| **Warm Sand** | `#D4C4A8` | Card borders, dividers, badges, feature highlights, rating stars |
| **Soft Ivory** | `#F4F1DE` | Main canvas background, light text sections, button text |

---

## 🚀 How to Run & Deploy

### 1. Local Preview
Because this template uses standard HTML5, CSS3, and Vanilla JavaScript, no build tools or package managers are required.

Simply open `index.html` in any modern web browser, or use a local development server:

```bash
# Using Python 3 built-in server
python3 -m http.server 8000

# Open in your browser:
# http://localhost:8000/
```

### 2. Customizing Products
To add or modify equipment items in the catalog:
1. Open `assets/js/products.js`.
2. Edit or append new objects to `PRODUCTS_DATA`.
3. Provide realistic specifications (`Capacity`, `Motor Power`, `Material`, etc.).
4. The catalog filtering, live search, sorting, and quick-view modals will automatically update across all pages.

### 3. Deploying to Production
You can host this static template directly on:
- **Netlify** / **Vercel** / **Cloudflare Pages** (drag & drop the folder)
- **GitHub Pages**
- **Apache** / **Nginx** / Traditional cPanel Web Hosting

---

## ♿ Accessibility & Performance

- **Semantic HTML5 Elements**: Uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Keyboard Navigation**: Complete ARIA attributes, modal focus traps, and keyboard listeners for `Escape` and arrow keys.
- **Reduced Motion Support**: Includes `@media (prefers-reduced-motion: reduce)` rules that automatically disable transitions and keyframes for users with motion sensitivity.
- **Responsive Typography**: Built with CSS `clamp()` for smooth font scaling without layout jumps.
- **Lazy Loading**: Native `loading="lazy"` on catalog imagery for rapid First Contentful Paint (FCP).

---

## 📄 License
Commercial Template License. Suitable for ThemeForest, TemplateMonster, client deliverables, and commercial agribusiness web projects.

&copy; 2026 AviTech Poultry Systems Inc. Engineered with precision.
