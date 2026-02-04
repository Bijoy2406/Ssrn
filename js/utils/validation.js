/**
 * SSRN Form Validation Utilities
 * Reusable validation rules and form handling
 */

const Validation = (function() {
  'use strict';

  /**
   * Built-in validation rules
   */
  const rules = {
    required: (value, message = 'This field is required') => {
      const isValid = value !== null && value !== undefined && value.toString().trim() !== '';
      return isValid ? null : message;
    },

    email: (value, message = 'Please enter a valid email address') => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : message;
    },

    minLength: (min, message) => (value) => {
      if (!value) return null;
      const isValid = value.length >= min;
      return isValid ? null : (message || `Must be at least ${min} characters`);
    },

    maxLength: (max, message) => (value) => {
      if (!value) return null;
      const isValid = value.length <= max;
      return isValid ? null : (message || `Must be no more than ${max} characters`);
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
      if (!value) return null;
      return regex.test(value) ? null : message;
    },

    phone: (value, message = 'Please enter a valid phone number') => {
      if (!value) return null;
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      return phoneRegex.test(value) ? null : message;
    },

    date: (value, message = 'Please enter a valid date') => {
      if (!value) return null;
      const date = new Date(value);
      return !isNaN(date.getTime()) ? null : message;
    },

    futureDate: (value, message = 'Date must be in the future') => {
      if (!value) return null;
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today ? null : message;
    }
  };

  /**
   * Validate a single field
   * @param {*} value - Field value
   * @param {Array} validators - Array of validator functions
   * @returns {string|null} - Error message or null if valid
   */
  function validateField(value, validators) {
    for (const validator of validators) {
      const error = typeof validator === 'function'
        ? validator(value)
        : rules[validator]?.(value);

      if (error) return error;
    }
    return null;
  }

  /**
   * Validate an entire form
   * @param {Object} data - Form data object
   * @param {Object} schema - Validation schema { fieldName: [validators] }
   * @returns {Object} - { isValid, errors }
   */
  function validateForm(data, schema) {
    const errors = {};

    for (const [field, validators] of Object.entries(schema)) {
      const error = validateField(data[field], validators);
      if (error) {
        errors[field] = error;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Show error message on a form field
   * @param {HTMLElement} input - Input element
   * @param {string} message - Error message
   */
  function showFieldError(input, message) {
    // Remove existing error
    clearFieldError(input);

    // Add error class
    input.classList.add('form-input--error');

    // Create error message element
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;

    // Insert after input wrapper or input
    const wrapper = input.closest('.form-input-wrapper') || input;
    wrapper.parentNode.appendChild(errorEl);
  }

  /**
   * Clear error message from a form field
   * @param {HTMLElement} input - Input element
   */
  function clearFieldError(input) {
    input.classList.remove('form-input--error');

    const group = input.closest('.form-group');
    const error = group?.querySelector('.form-error');
    error?.remove();
  }

  /**
   * Show all form errors
   * @param {Object} errors - Errors object { fieldName: message }
   * @param {HTMLFormElement} form - Form element
   */
  function showFormErrors(errors, form) {
    // Clear all existing errors
    form.querySelectorAll('.form-input--error').forEach(input => {
      clearFieldError(input);
    });

    // Show new errors
    for (const [field, message] of Object.entries(errors)) {
      const input = form.querySelector(`[name="${field}"], #${field}`);
      if (input) {
        showFieldError(input, message);
      }
    }

    // Focus first error field
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const input = form.querySelector(`[name="${firstErrorField}"], #${firstErrorField}`);
      input?.focus();
    }
  }

  /**
   * Clear all form errors
   * @param {HTMLFormElement} form - Form element
   */
  function clearFormErrors(form) {
    form.querySelectorAll('.form-input--error').forEach(input => {
      clearFieldError(input);
    });
  }

  // Public API
  return {
    rules,
    validateField,
    validateForm,
    showFieldError,
    clearFieldError,
    showFormErrors,
    clearFormErrors
  };
})();

// Export for module usage if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Validation;
}
