/**
 * SSRN Signup Flow
 * Handles email input, password input, validation, and account creation
 */

const Signup = {
    /**
     * Initialize email page
     */
    initEmailPage() {
        const emailInput = document.getElementById('email-input');
        const continueBtn = document.getElementById('continue-btn');
        const inputContainer = document.getElementById('input-container');
        const inputHelper = document.getElementById('input-helper');

        // Check if there's a stored email from previous attempt (optional, good UX)
        const storedEmail = sessionStorage.getItem('signupEmail');
        if (storedEmail) {
            emailInput.value = storedEmail;
        }

        // Handle Continue button click
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.handleEmailSubmit(emailInput, inputContainer, inputHelper);
            });
        }

        // Handle Enter key press
        if (emailInput) {
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleEmailSubmit(emailInput, inputContainer, inputHelper);
                }
            });

            // Hide error on input
            emailInput.addEventListener('input', () => {
                inputContainer.classList.remove('error-empty', 'error-filled');
                inputHelper.classList.remove('show');
                inputHelper.textContent = '';
            });
        }
    },

    /**
     * Initialize password page
     */
    initPasswordPage() {
        const passwordInput = document.getElementById('password-input');
        const continueBtn = document.getElementById('continue-btn');
        const inputContainer = document.getElementById('input-container');
        const inputHelper = document.getElementById('input-helper');
        const errorBanner = document.getElementById('error-banner');

        // Check if email exists in session
        const storedEmail = sessionStorage.getItem('signupEmail');
        if (!storedEmail) {
            // Redirect back to email page if no email stored
            window.location.href = '/Ssrn/pages/Auth/Signup/email.html';
            return;
        }

        // Check if we should show timeout error (Simulated state)
        // To trigger this, set 'showTimeoutError' in sessionStorage manually or via logic
        const showTimeoutError = sessionStorage.getItem('showTimeoutError');
        if (showTimeoutError === 'true') {
            if (errorBanner) {
                errorBanner.classList.add('show');
                const errorText = errorBanner.querySelector('.error-banner__text');
                if (errorText) errorText.textContent = "Your sign up attempt timed out. Please try again";
            }
            sessionStorage.removeItem('showTimeoutError');
        }

        // Handle password visibility toggle
        const togglePasswordBtn = document.getElementById('toggle-password');
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', () => {
                this.togglePasswordVisibility(passwordInput);
            });
        }

        // Handle Continue button click
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.handlePasswordSubmit(passwordInput, inputContainer, inputHelper, errorBanner);
            });
        }

        // Handle Enter key press
        if (passwordInput) {
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
                if (errorBanner) errorBanner.classList.remove('show');
            });
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
     * Handle email submission
       */
    handleEmailSubmit(emailInput, inputContainer, inputHelper) {
        const email = emailInput.value.trim();

        // Clear previous errors
        inputContainer.classList.remove('error-empty', 'error-filled');
        inputHelper.classList.remove('show');
        inputHelper.textContent = '';

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
            inputContainer.classList.add('error-filled'); // Pink background
            inputHelper.textContent = 'Invalid email address. Please enter a valid email address.';
            inputHelper.classList.add('show');
            emailInput.focus();
            return;
        }

        // Store email in session storage
        sessionStorage.setItem('signupEmail', email);

        // Show skeleton loader and navigate to password page
        this.showSkeletonLoader();

        // Simulate API call delay
        setTimeout(() => {
            window.location.href = '/Ssrn/pages/Auth/Signup/password.html';
        }, 800);
    },

    /**
     * Handle password submission
     */
    handlePasswordSubmit(passwordInput, inputContainer, inputHelper, errorBanner) {
        const password = passwordInput.value.trim();

        // Clear previous errors
        inputContainer.classList.remove('error-empty', 'error-filled');
        inputHelper.classList.remove('show');
        inputHelper.textContent = '';
        if (errorBanner) errorBanner.classList.remove('show');

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

        // SIMULATED AUTHENTICATION LOGIC
        // You can modify this part to trigger different error states for testing

        setTimeout(() => {
            // DEMO LOGIC: 
            // If password is 'timeout', trigger timeout error
            if (password === 'timeout') {
                sessionStorage.setItem('showTimeoutError', 'true');
                window.location.reload();
                return;
            }

            // If password is 'server', trigger server error page
            if (password === 'server') {
                window.location.href = '/Ssrn/pages/Auth/Signup/server-error.html';
                return;
            }

            // If password is 'client', trigger client error page
            if (password === 'client') {
                window.location.href = '/Ssrn/pages/Auth/Signup/error.html';
                return;
            }

            // Success -> Redirect to profile completion
            window.location.href = '/Ssrn/pages/Auth/Profile/complete-profile.html';
        }, 800);
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
