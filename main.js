/**
 * SSRN Landing Page - Main JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileNav();
  initBookingTabs();
  initDestinationsCarousel();
  initBookingForm();
  initSmoothScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const actions = document.querySelector('.nav__actions');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('active');

    menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);

    // Animate hamburger to X
    const bars = toggle.querySelectorAll('.nav__toggle-bar');
    bars.forEach((bar, index) => {
      if (!isOpen) {
        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) bar.style.opacity = '0';
        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        bar.style.transform = '';
        bar.style.opacity = '';
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      const bars = toggle.querySelectorAll('.nav__toggle-bar');
      bars.forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '';
      });
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/**
 * Booking Form Tabs
 */
function initBookingTabs() {
  const tabs = document.querySelectorAll('.booking-form__tab');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('booking-form__tab--active'));

      // Add active class to clicked tab
      tab.classList.add('booking-form__tab--active');

      // Update form based on selected tab
      const tabType = tab.dataset.tab;
      updateFormForTabType(tabType);
    });
  });
}

/**
 * Update form fields based on booking type
 */
function updateFormForTabType(type) {
  const dropoffGroup = document.querySelector('#dropoff')?.closest('.form-group');

  if (!dropoffGroup) return;

  switch (type) {
    case 'hourly':
      // For hourly, we might want to show duration instead of drop-off
      dropoffGroup.querySelector('.form-label').textContent = 'Duration';
      dropoffGroup.querySelector('.form-input').placeholder = 'Select duration (hours)';
      break;
    case 'round-trip':
      dropoffGroup.querySelector('.form-label').textContent = 'Drop-off Location';
      dropoffGroup.querySelector('.form-input').placeholder = 'Enter drop-off address';
      // Could add return date/time fields here
      break;
    default: // one-way
      dropoffGroup.querySelector('.form-label').textContent = 'Drop-off Location';
      dropoffGroup.querySelector('.form-input').placeholder = 'Enter drop-off address';
  }
}

/**
 * Destinations Carousel
 */
function initDestinationsCarousel() {
  const track = document.querySelector('.destinations__track');
  const prevBtn = document.querySelector('.destinations__nav-btn--prev');
  const nextBtn = document.querySelector('.destinations__nav-btn--next');

  if (!track || !prevBtn || !nextBtn) return;

  let scrollPosition = 0;
  const cardWidth = 280; // Approximate card width + gap

  // Get visible cards count based on viewport
  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 992) return 3;
    return 4;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = scrollPosition <= 0;
    nextBtn.disabled = scrollPosition >= maxScroll;

    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  };

  const scrollTo = (position) => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    scrollPosition = Math.max(0, Math.min(position, maxScroll));
    track.style.transform = `translateX(-${scrollPosition}px)`;
    updateButtons();
  };

  prevBtn.addEventListener('click', () => {
    scrollTo(scrollPosition - cardWidth);
  });

  nextBtn.addEventListener('click', () => {
    scrollTo(scrollPosition + cardWidth);
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === prevBtn || document.activeElement === nextBtn) {
      if (e.key === 'ArrowLeft') {
        scrollTo(scrollPosition - cardWidth);
        prevBtn.focus();
      } else if (e.key === 'ArrowRight') {
        scrollTo(scrollPosition + cardWidth);
        nextBtn.focus();
      }
    }
  });

  // Update on resize
  window.addEventListener('resize', () => {
    scrollTo(0);
  });

  // Initialize button states
  updateButtons();
}

/**
 * Booking Form Submission
 */
function initBookingForm() {
  const form = document.getElementById('bookingForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = {
      pickup: document.getElementById('pickup')?.value,
      dropoff: document.getElementById('dropoff')?.value,
      date: document.getElementById('date')?.value,
      time: document.getElementById('time')?.value,
      tripType: document.querySelector('.booking-form__tab--active')?.dataset.tab || 'one-way'
    };

    // Validate required fields
    const errors = validateBookingForm(data);

    if (errors.length > 0) {
      showFormErrors(errors);
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.booking-form__submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="50" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      Searching...
    `;
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Booking search data:', data);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // In a real app, redirect to results page
      alert('Search complete! In production, this would redirect to search results.');
    }, 1500);
  });

  // Set minimum date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // Set default time to next hour
  const timeInput = document.getElementById('time');
  if (timeInput) {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
  }
}

/**
 * Validate booking form data
 */
function validateBookingForm(data) {
  const errors = [];

  if (!data.pickup?.trim()) {
    errors.push({ field: 'pickup', message: 'Please enter a pick-up location' });
  }

  if (!data.dropoff?.trim() && data.tripType !== 'hourly') {
    errors.push({ field: 'dropoff', message: 'Please enter a drop-off location' });
  }

  if (!data.date) {
    errors.push({ field: 'date', message: 'Please select a date' });
  }

  if (!data.time) {
    errors.push({ field: 'time', message: 'Please select a time' });
  }

  return errors;
}

/**
 * Show form validation errors
 */
function showFormErrors(errors) {
  // Remove previous error states
  document.querySelectorAll('.form-input--error').forEach(el => {
    el.classList.remove('form-input--error');
  });
  document.querySelectorAll('.form-error').forEach(el => el.remove());

  // Add error state to fields
  errors.forEach(error => {
    const input = document.getElementById(error.field);
    if (input) {
      input.classList.add('form-input--error');

      // Add error message
      const errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.textContent = error.message;
      errorEl.style.cssText = `
        color: var(--text-error-on-primary);
        font-size: var(--body-sm-size);
        margin-top: var(--space-100);
        display: block;
      `;
      input.closest('.form-group').appendChild(errorEl);
    }
  });

  // Focus first error field
  if (errors.length > 0) {
    document.getElementById(errors[0].field)?.focus();
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        const menu = document.querySelector('.nav__menu');
        if (menu?.classList.contains('active')) {
          menu.classList.remove('active');
        }

        // Scroll to target with offset for fixed header
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add error state styles dynamically
 */
const style = document.createElement('style');
style.textContent = `
  .form-input--error {
    border-color: var(--border-error-primary) !important;
  }
  .form-input--error:focus {
    box-shadow: 0 0 0 3px rgba(204, 69, 92, 0.1) !important;
  }
`;
document.head.appendChild(style);
