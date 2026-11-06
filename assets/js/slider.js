/**
 * AVITECH POULTRY EQUIPMENT - SLIDER SYSTEM
 * Autoplay Hero Slider with Ken Burns, Touch Gestures, and Testimonials
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. HERO SLIDER INITIALIZATION
     -------------------------------------------------------------------------- */
  function initHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider-section');
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroSlider.querySelectorAll('.indicator-dot');
    const prevBtn = heroSlider.querySelector('.slider-prev');
    const nextBtn = heroSlider.querySelector('.slider-next');
    const progressFill = heroSlider.querySelector('.hero-progress-fill');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 5000; // 5 seconds per slide
    let slideTimer = null;
    let progressStartTime = 0;
    let progressAnimFrame = null;
    let isPaused = false;

    // Show specific slide
    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = index;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');

      resetProgressBar();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Progress bar animation
    function resetProgressBar() {
      if (!progressFill) return;
      cancelAnimationFrame(progressAnimFrame);
      progressFill.style.width = '0%';
      progressStartTime = performance.now();

      function updateProgress(currentTime) {
        if (!isPaused) {
          const elapsed = currentTime - progressStartTime;
          const percentage = Math.min((elapsed / slideDuration) * 100, 100);
          progressFill.style.width = `${percentage}%`;

          if (elapsed >= slideDuration) {
            nextSlide();
            return;
          }
        } else {
          progressStartTime = performance.now() - (parseFloat(progressFill.style.width) / 100) * slideDuration;
        }
        progressAnimFrame = requestAnimationFrame(updateProgress);
      }

      progressAnimFrame = requestAnimationFrame(updateProgress);
    }

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => goToSlide(idx));
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', () => { isPaused = true; });
    heroSlider.addEventListener('mouseleave', () => { isPaused = false; });

    // Touch / Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isPaused = true;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      isPaused = false;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance < 0) {
          // Swiped left
          isRTL ? prevSlide() : nextSlide();
        } else {
          // Swiped right
          isRTL ? nextSlide() : prevSlide();
        }
      }
    }

    // Keyboard navigation when hero is in view
    document.addEventListener('keydown', (e) => {
      const rect = heroSlider.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Start initial slide
    goToSlide(0);
  }

  /* --------------------------------------------------------------------------
     2. TESTIMONIAL CAROUSEL INITIALIZATION
     -------------------------------------------------------------------------- */
  function initTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-slider-wrap');
    if (!sliderContainer) return;

    const track = sliderContainer.querySelector('.testimonial-track');
    const cards = sliderContainer.querySelectorAll('.testimonial-card');
    const prevBtn = sliderContainer.querySelector('.testimonial-prev');
    const nextBtn = sliderContainer.querySelector('.testimonial-next');
    const dots = sliderContainer.querySelectorAll('.testimonial-dot');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    function getItemsPerView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1100) return 2;
      return 3;
    }

    function updateSlider() {
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, cards.length - itemsPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      const cardWidthPercent = 100 / itemsPerView;
      const offset = currentIndex * cardWidthPercent;
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      track.style.transform = `translateX(${isRTL ? offset : -offset}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function next() {
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, cards.length - itemsPerView);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }

    function prev() {
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, cards.length - itemsPerView);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateSlider();
      });
    });

    window.addEventListener('resize', updateSlider);

    // Auto rotate every 6s
    autoPlayTimer = setInterval(next, 6000);
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    sliderContainer.addEventListener('mouseleave', () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(next, 6000);
    });

    updateSlider();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initTestimonialSlider();
  });
})();
