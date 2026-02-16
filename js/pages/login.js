/**
 * SSRN Login Flow
 * Handles email input, password input, validation, and authentication
 */

const Login = {
  /**
   * Initialize email page
   */
  initEmailPage() {
    const emailInput = document.getElementById('email-input');
    const continueBtn = document.getElementById('continue-btn');
    const inputContainer = document.getElementById('input-container');
    const inputHelper = document.getElementById('input-helper');
    const errorBanner = document.getElementById('error-banner');

    // Check if there's a stored email from previous attempt
    const storedEmail = sessionStorage.getItem('loginEmail');
    if (storedEmail) {
      emailInput.value = storedEmail;
    }

    // Check if we should show timeout error
    const showTimeoutError = sessionStorage.getItem('showTimeoutError');
    if (showTimeoutError === 'true') {
      errorBanner.classList.add('show');
      sessionStorage.removeItem('showTimeoutError');
    }

    // Handle Continue button click
    continueBtn.addEventListener('click', () => {
      this.handleEmailSubmit(emailInput, inputContainer, inputHelper, errorBanner);
    });

    // Handle Enter key press
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleEmailSubmit(emailInput, inputContainer, inputHelper, errorBanner);
      }
    });

    // Hide error on input
    emailInput.addEventListener('input', () => {
      inputContainer.classList.remove('error-empty', 'error-filled');
      inputHelper.classList.remove('show');
      inputHelper.textContent = '';
      errorBanner.classList.remove('show');
    });
  },

  /**
   * Initialize password page
   */
  initPasswordPage() {
    const passwordInput = document.getElementById('password-input');
    const continueBtn = document.getElementById('continue-btn');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const inputContainer = document.getElementById('input-container');
    const inputHelper = document.getElementById('input-helper');
    const errorBanner = document.getElementById('error-banner');

    // Check if email exists in session
    const storedEmail = sessionStorage.getItem('loginEmail');
    if (!storedEmail) {
      // Redirect back to email page if no email stored
      window.location.href = '/pages/Auth/Login/email.html';
      return;
    }

    // Check if we should show timeout error
    const showTimeoutError = sessionStorage.getItem('showTimeoutError');
    if (showTimeoutError === 'true') {
      errorBanner.classList.add('show');
      sessionStorage.removeItem('showTimeoutError');
    }

    // Handle password visibility toggle
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', () => {
        this.togglePasswordVisibility(passwordInput);
      });
    }

    // Handle Continue button click
    continueBtn.addEventListener('click', () => {
      this.handlePasswordSubmit(passwordInput, inputContainer, inputHelper, errorBanner);
    });

    // Handle Enter key press
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handlePasswordSubmit(passwordInput, inputContainer, inputHelper, errorBanner);
      }
    });

    // Hide error on input
    passwordInput.addEventListener('input', () => {
      inputContainer.classList.remove('error-empty', 'error-filled');
      inputHelper.classList.remove('show');
      inputHelper.textContent = '';
      errorBanner.classList.remove('show');
    });
  },

  /**
   * Handle email submission
   */
  handleEmailSubmit(emailInput, inputContainer, inputHelper, errorBanner) {
    const email = emailInput.value.trim();

    // Clear previous errors
    inputContainer.classList.remove('error-empty', 'error-filled');
    inputHelper.classList.remove('show');
    inputHelper.textContent = '';
    errorBanner.classList.remove('show');

    // Check if email is empty
    if (!email) {
      inputContainer.classList.add('error-empty');
      inputHelper.textContent = 'Please enter an email address';
      inputHelper.classList.add('show');
      emailInput.focus();
      return;
    }

    // Validate email format
    if (!this.validateEmail(email)) {
      inputContainer.classList.add('error-filled');
      inputHelper.textContent = 'Invalid email address. Please enter a valid email address.';
      inputHelper.classList.add('show');
      emailInput.focus();
      return;
    }

    // Store email in session storage
    sessionStorage.setItem('loginEmail', email);

    // Show skeleton loader and navigate to password page
    this.showSkeletonLoader();

    // Simulate API call delay
    setTimeout(() => {
      window.location.href = '/pages/Auth/Login/password.html';
    }, 800);
  },

  /**
   * Handle password submission
   */
  async handlePasswordSubmit(passwordInput, inputContainer, inputHelper, errorBanner) {
    const password = passwordInput.value.trim();
    const email = sessionStorage.getItem('loginEmail');

    // Clear previous errors
    inputContainer.classList.remove('error-empty', 'error-filled');
    inputHelper.classList.remove('show');
    inputHelper.textContent = '';
    errorBanner.classList.remove('show');

    // Validate password (non-empty)
    if (!password) {
      inputContainer.classList.add('error-empty');
      inputHelper.textContent = 'Password is required*';
      inputHelper.classList.add('show');
      passwordInput.focus();
      return;
    }

    // Show skeleton loader
    this.showSkeletonLoader();

    // Call authentication API
    try {
      const result = await this.authenticateUser(email, password);
      this.handleAuthenticationResult(result, inputContainer, inputHelper, passwordInput);
    } catch (error) {
      this.handleAuthenticationError(error, inputContainer, inputHelper, passwordInput);
    }
  },

  /**
   * Authenticate user via API
   * BACKEND DEV: Replace this method with actual API call
   */
  async authenticateUser(email, password) {
    // ============================================================
    // TODO: BACKEND INTEGRATION
    // Replace this simulation with your actual API call
    // ============================================================
    // Example real implementation:
    /*
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return await response.json();
    */

    // ============================================================
    // DEMO ONLY: Simulated API response (remove this in production)
    // ============================================================
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random timeout (10% chance) - REMOVE IN PRODUCTION
        if (Math.random() < 0.1) {
          reject({ type: 'TIMEOUT', message: 'Request timeout' });
          return;
        }

        // Simulate random server error (5% chance) - REMOVE IN PRODUCTION
        if (Math.random() < 0.05) {
          reject({ type: 'SERVER_ERROR', message: 'Internal server error' });
          return;
        }

        // Check password - DEMO ONLY (remove in production)
        // Only password "123456" will work
        if (password !== '123456') {
          resolve({
            success: false,
            message: 'Incorrect password. Please try again.'
          });
          return;
        }

        // Simulate successful authentication - REMOVE IN PRODUCTION
        resolve({
          success: true,
          user: {
            name: email.split('@')[0],
            email: email
          }
        });
      }, 800);
    });
  },

  /**
   * Handle successful or failed authentication result
   */
  handleAuthenticationResult(result, inputContainer, inputHelper, passwordInput) {
    if (result.success && result.user) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(result.user));

      // Clear session storage
      sessionStorage.removeItem('loginEmail');

      // Redirect to user landing page
      window.location.href = '/pages/User/landing-user.html';
    } else {
      // Authentication failed - show filled error state (pink background)
      this.hideSkeletonLoader();
      inputContainer.classList.add('error-filled');
      inputHelper.textContent = result.message || 'Incorrect password. Please try again.';
      inputHelper.classList.add('show');
      passwordInput.focus();
    }
  },

  /**
   * Handle authentication errors (network, timeout, server errors)
   */
  handleAuthenticationError(error, inputContainer, inputHelper, passwordInput) {
    console.error('Authentication error:', error);

    // Handle different error types
    if (error.type === 'TIMEOUT') {
      // Timeout error - reload page to show banner
      sessionStorage.setItem('showTimeoutError', 'true');
      window.location.reload();
    } else if (error.type === 'SERVER_ERROR') {
      // Server error - show server-side error page
      window.location.href = '/pages/Auth/Login/server-error.html';
    } else if (error.name === 'TypeError') {
      // Network error - show client-side error page
      window.location.href = '/pages/Auth/Login/error.html';
    } else {
      // Other errors - show inline error with filled state
      this.hideSkeletonLoader();
      if (inputContainer && inputHelper) {
        inputContainer.classList.add('error-filled');
        inputHelper.textContent = error.message || 'An error occurred. Please try again.';
        inputHelper.classList.add('show');
        if (passwordInput) {
          passwordInput.focus();
        }
      }
    }
  },

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(passwordInput) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  },

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Show skeleton loader
   */
  showSkeletonLoader() {
    const loader = document.getElementById('skeleton-loader');
    if (loader) {
      loader.classList.add('show');
    }
  },

  /**
   * Hide skeleton loader
   */
  hideSkeletonLoader() {
    const loader = document.getElementById('skeleton-loader');
    if (loader) {
      loader.classList.remove('show');
    }
  }
};
