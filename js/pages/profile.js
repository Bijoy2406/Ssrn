const Profile = {
    init() {
        this.titleContainer = document.getElementById('title-container');
        this.titleOptions = document.getElementById('title-options');
        this.titleValue = document.getElementById('title-value');

        this.firstnameInput = document.getElementById('firstname-input');
        this.firstnameContainer = document.getElementById('firstname-container');
        this.firstnameHelper = document.getElementById('firstname-helper');

        this.lastnameInput = document.getElementById('lastname-input');
        this.lastnameContainer = document.getElementById('lastname-container');
        this.lastnameHelper = document.getElementById('lastname-helper');

        this.mobileGroup = document.getElementById('mobile-group');
        this.mobileInput = document.getElementById('mobile-input');
        this.mobileHelper = document.getElementById('mobile-helper');

        this.countryTrigger = document.getElementById('country-trigger');
        this.countryOptions = document.getElementById('country-options');

        this.continueBtn = document.getElementById('continue-btn');
        this.errorBanner = document.getElementById('error-banner');
        this.skeletonLoader = document.getElementById('skeleton-loader');

        this.bindEvents();
    },

    bindEvents() {
        // Title Dropdown
        if (this.titleContainer) {
            this.titleContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(this.titleOptions);
                this.closeDropdown(this.countryOptions);
            });
        }

        // Handle Title Selection
        if (this.titleOptions) {
            this.titleOptions.querySelectorAll('.dropdown-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = e.target.getAttribute('data-value');
                    this.titleValue.textContent = value;
                    this.closeDropdown(this.titleOptions);
                });
            });
        }

        // Country Dropdown (simplified)
        if (this.countryTrigger) {
            this.countryTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(this.countryOptions);
                this.closeDropdown(this.titleOptions);
            });
        }

        if (this.countryOptions) {
            this.countryOptions.querySelectorAll('.dropdown-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeDropdown(this.countryOptions);
                    // Set value if we had multiple countries
                });
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown(this.titleOptions);
            this.closeDropdown(this.countryOptions);
        });

        // Input Validation on Focus/Input
        this.addInputListeners(this.firstnameInput, this.firstnameContainer, this.firstnameHelper);
        this.addInputListeners(this.lastnameInput, this.lastnameContainer, this.lastnameHelper);

        // special handling for mobile
        if (this.mobileInput) {
            this.mobileInput.addEventListener('input', () => {
                if (this.mobileInput.value.length > 0) {
                    this.clearError(this.mobileGroup, this.mobileHelper);
                }
            });
        }

        // Continue Button
        if (this.continueBtn) {
            this.continueBtn.addEventListener('click', () => {
                this.handleSubmit();
            });
        }
    },

    toggleDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    },

    closeDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    },

    addInputListeners(input, container, helper) {
        if (!input) return;
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                this.clearError(container, helper);
            }
        });
    },

    showError(container, helper, message, filled = false) {
        if (container) {
            container.classList.add(filled ? 'error-filled' : 'error');
            // For mobile group, we use specific classes
            if (container.id === 'mobile-group') {
                if (filled) {
                    container.classList.add('error');
                    container.classList.remove('error-empty');
                } else {
                    container.classList.add('error-empty');
                    container.classList.remove('error');
                }
            } else if (filled) {
                container.classList.remove('error-empty'); // ensure we don't have both
            } else {
                container.classList.add('error-empty'); // use error-empty style
                container.classList.remove('error-filled');
            }
        }
        if (helper) {
            helper.textContent = message;
            helper.classList.add('show');
        }
    },

    clearError(container, helper) {
        if (container) {
            container.classList.remove('error', 'error-filled', 'error-empty');
        }
        if (helper) {
            helper.classList.remove('show');
        }
    },

    handleSubmit() {
        let isValid = true;

        // Reset banner
        if (this.errorBanner) this.errorBanner.classList.remove('show');

        // Validate First Name
        if (!this.firstnameInput.value.trim()) {
            this.showError(this.firstnameContainer, this.firstnameHelper, 'Please enter you first name');
            isValid = false;
        }

        // Validate Last Name
        if (!this.lastnameInput.value.trim()) {
            this.showError(this.lastnameContainer, this.lastnameHelper, 'Please enter you last name');
            isValid = false;
        }

        // Validate Mobile
        const mobileValue = this.mobileInput.value.trim();
        if (!mobileValue) {
            this.showError(this.mobileGroup, this.mobileHelper, 'Please enter your mobile number');
            isValid = false;
        } else if (!/^\d+$/.test(mobileValue)) {
            // Invalid format specific error from Figma
            this.showError(this.mobileGroup, this.mobileHelper, 'Invalid mobile number. Please enter a valid mobile number.', true);
            isValid = false;
        }
        // Trigger special simulation for 'timeout' or 'server'
        else if (this.firstnameInput.value.toLowerCase() === 'timeout') {
            // Simulate timeout error
            if (this.errorBanner) {
                this.errorBanner.classList.add('show');
            }
            return;
        } else if (this.firstnameInput.value.toLowerCase() === 'server') {
            window.location.href = '/Ssrn/pages/Auth/Signup/server-error.html';
            return;
        } else if (this.firstnameInput.value.toLowerCase() === 'client') {
            window.location.href = '/Ssrn/pages/Auth/Signup/error.html';
            return;
        }

        if (isValid) {
            this.showSkeletonLoader();
            // Simulate API call
            setTimeout(() => {
                // Redirect to Mobile Verification
                window.location.href = '/Ssrn/pages/Auth/Verification/mobile-verification.html';
            }, 2000);
        }
    },

    showSkeletonLoader() {
        if (this.skeletonLoader) {
            this.skeletonLoader.classList.add('show');
        }
    }
};
