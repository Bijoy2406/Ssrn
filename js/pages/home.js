/**
 * SSRN Home Page
 * Page-specific functionality for the landing page
 */

(function() {
  'use strict';

  /**
   * Initialize booking form
   */
  function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    // Initialize tabs
    const tabsContainer = form.closest('.booking-form');
    if (tabsContainer && typeof Tabs !== 'undefined') {
      Tabs.init(tabsContainer, {
        onChange: ({ tabId }) => {
          updateFormForTabType(tabId);
        }
      });
    }

    // Set default date to today
    const dateInput = form.querySelector('#date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
      dateInput.value = today;
    }

    // Set default time to next hour
    const timeInput = form.querySelector('#time');
    if (timeInput) {
      const now = new Date();
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
      timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    // Handle form submission
    form.addEventListener('submit', handleBookingSubmit);
  }

  /**
   * Update form fields based on booking type
   */
  function updateFormForTabType(type) {
    const dropoffGroup = document.querySelector('#dropoff')?.closest('.form-group');
    if (!dropoffGroup) return;

    const label = dropoffGroup.querySelector('.form-label');
    const input = dropoffGroup.querySelector('.form-input');

    switch (type) {
      case 'hourly':
        if (label) label.textContent = 'Duration';
        if (input) input.placeholder = 'Select duration (hours)';
        break;
      default:
        if (label) label.textContent = 'Drop-off Location';
        if (input) input.placeholder = 'Enter drop-off address';
    }
  }

  /**
   * Handle booking form submission
   */
  function handleBookingSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const activeTab = form.closest('.booking-form')?.querySelector('.booking-form__tab--active');

    // Collect form data
    const data = {
      pickup: form.querySelector('#pickup')?.value,
      dropoff: form.querySelector('#dropoff')?.value,
      date: form.querySelector('#date')?.value,
      time: form.querySelector('#time')?.value,
      tripType: activeTab?.dataset.tab || 'one-way'
    };

    // Validate
    const errors = validateBookingData(data);

    if (Object.keys(errors).length > 0) {
      if (typeof Validation !== 'undefined') {
        Validation.showFormErrors(errors, form);
      } else {
        showLegacyErrors(errors, form);
      }
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.booking-form__submit');
    const originalContent = submitBtn.innerHTML;
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
      console.log('Booking search:', data);
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;

      // In production, redirect to search results
      // window.location.href = `/pages/booking/results.html?${new URLSearchParams(data)}`;
      alert('Search complete! This would redirect to results in production.');
    }, 1500);
  }

  /**
   * Validate booking form data
   */
  function validateBookingData(data) {
    const errors = {};

    if (!data.pickup?.trim()) {
      errors.pickup = 'Please enter a pick-up location';
    }

    if (!data.dropoff?.trim() && data.tripType !== 'hourly') {
      errors.dropoff = 'Please enter a drop-off location';
    }

    if (!data.date) {
      errors.date = 'Please select a date';
    }

    if (!data.time) {
      errors.time = 'Please select a time';
    }

    return errors;
  }

  /**
   * Legacy error display (fallback if Validation module not loaded)
   */
  function showLegacyErrors(errors, form) {
    // Clear existing errors
    form.querySelectorAll('.form-input--error').forEach(el => {
      el.classList.remove('form-input--error');
    });
    form.querySelectorAll('.form-error').forEach(el => el.remove());

    // Show errors
    for (const [field, message] of Object.entries(errors)) {
      const input = form.querySelector(`#${field}`);
      if (input) {
        input.classList.add('form-input--error');

        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = message;
        errorEl.style.cssText = `
          color: #cc455c;
          font-size: 12px;
          margin-top: 4px;
          display: block;
        `;
        input.closest('.form-group')?.appendChild(errorEl);
      }
    }

    // Focus first error
    const firstField = Object.keys(errors)[0];
    if (firstField) {
      form.querySelector(`#${firstField}`)?.focus();
    }
  }

  /**
   * Initialize destinations carousel
   */
  function initDestinationsCarousel() {
    if (typeof Carousel !== 'undefined') {
      Carousel.init('.destinations__carousel');
    }
  }

  /**
   * Initialize all home page functionality
   */
  function init() {
    initBookingForm();
    initDestinationsCarousel();
  }

  // Initialize when includes are loaded (if using includes)
  document.addEventListener('includes:loaded', init);

  // Also initialize on DOM ready as fallback
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
