const Profile = {
    // Country code database with inline SVG flags
    countryCodes: [],

    async loadCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            this.countryCodes = [];
            data.forEach(country => {
                if (!country.idd || !country.idd.root) return;

                const root = country.idd.root;
                const suffixes = country.idd.suffixes || [];

                if (suffixes.length === 0) {
                    this.countryCodes.push({ code: root, name: country.name.common, flagUrl: country.flags.svg });
                } else if (suffixes.length === 1) {
                    this.countryCodes.push({ code: root + suffixes[0], name: country.name.common, flagUrl: country.flags.svg });
                } else {
                    this.countryCodes.push({ code: root, name: country.name.common, flagUrl: country.flags.svg });
                    suffixes.forEach(suffix => {
                        this.countryCodes.push({ code: root + suffix, name: country.name.common, flagUrl: country.flags.svg });
                    });
                }
            });

            this.countryCodes.sort((a, b) => b.code.length - a.code.length);

            if (this.mobileInput && this.mobileInput.value) {
                this.detectCountryCode();
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    },

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
        this.mobilePrefix = document.getElementById('mobile-prefix');
        this.mobileFlag = document.getElementById('mobile-flag');
        this.mobileCode = document.getElementById('mobile-code');

        this.continueBtn = document.getElementById('continue-btn');
        this.errorBanner = document.getElementById('error-banner');
        this.skeletonLoader = document.getElementById('skeleton-loader');

        // Fetch countries on load
        this.loadCountries();
        this.bindEvents();
    },

    bindEvents() {
        // Title Dropdown
        if (this.titleContainer) {
            this.titleContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(this.titleOptions);
            });
        }

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

        document.addEventListener('click', () => {
            this.closeDropdown(this.titleOptions);
        });

        this.addInputListeners(this.firstnameInput, this.firstnameContainer, this.firstnameHelper);
        this.addInputListeners(this.lastnameInput, this.lastnameContainer, this.lastnameHelper);

        if (this.mobileInput) {
            this.mobileInput.addEventListener('input', () => {
                this.detectCountryCode();
                if (this.mobileInput.value.length > 0) {
                    this.clearError(this.mobileGroup, this.mobileHelper);
                }
            });
        }

        if (this.mobileGroup) {
            this.mobileGroup.addEventListener('click', () => {
                this.mobileInput.focus();
            });
        }

        if (this.continueBtn) {
            this.continueBtn.addEventListener('click', () => {
                this.handleSubmit();
            });
        }
    },

    detectCountryCode() {
        const value = this.mobileInput.value.trim();

        let searchCode = value;
        if (searchCode.length > 0 && !searchCode.startsWith('+')) {
            searchCode = '+' + searchCode;
        }

        let matched = null;
        if (searchCode.startsWith('+')) {
            for (const country of this.countryCodes) {
                if (searchCode.startsWith(country.code)) {
                    matched = country;
                    break;
                }
            }
        }

        if (matched) {
            if (this.mobilePrefix) this.mobilePrefix.style.display = 'flex';
            if (this.mobileFlag) {
                if (matched.flagUrl) {
                    this.mobileFlag.innerHTML = `<img src="${matched.flagUrl}" alt="${matched.name} flag" style="width: 24px; height: 16px; object-fit: cover; border-radius: 2px;">`;
                } else {
                    this.mobileFlag.textContent = matched.name;
                }
            }
            if (this.mobileCode) this.mobileCode.textContent = matched.code;
        } else {
            if (value.length > 0) {
                if (this.mobilePrefix) this.mobilePrefix.style.display = 'flex';
            } else {
                if (this.mobilePrefix) this.mobilePrefix.style.display = 'none';
            }
            if (this.mobileFlag) this.mobileFlag.innerHTML = '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" rx="2" fill="#E0E0E0"/><circle cx="12" cy="8" r="5" fill="none" stroke="#999" stroke-width="1.5"/><path d="M12 3V13M7 8H17M8 4.5Q12 7 16 4.5M8 11.5Q12 9 16 11.5" fill="none" stroke="#999" stroke-width="0.8"/></svg>';
            if (this.mobileCode) this.mobileCode.textContent = '';
        }
    },

    toggleDropdown(dropdown) {
        if (dropdown) dropdown.classList.toggle('show');
    },

    closeDropdown(dropdown) {
        if (dropdown) dropdown.classList.remove('show');
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
            container.classList.remove('error', 'error-filled', 'error-empty');
            if (filled) {
                container.classList.add('error');
            } else {
                container.classList.add('error-empty');
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

        if (this.errorBanner) this.errorBanner.classList.remove('show');

        if (!this.firstnameInput.value.trim()) {
            this.showError(this.firstnameContainer, this.firstnameHelper, 'Please enter you first name');
            isValid = false;
        }

        if (!this.lastnameInput.value.trim()) {
            this.showError(this.lastnameContainer, this.lastnameHelper, 'Please enter you last name');
            isValid = false;
        }

        const mobileValue = this.mobileInput.value.trim();
        if (!mobileValue) {
            this.showError(this.mobileGroup, this.mobileHelper, 'Please enter your mobile number');
            isValid = false;
        } else if (!/^\+?\d[\d\s-]{6,}$/.test(mobileValue)) {
            this.showError(this.mobileGroup, this.mobileHelper, 'Invalid mobile number. Please enter a valid mobile number.', true);
            isValid = false;
        } else if (this.firstnameInput.value.toLowerCase() === 'timeout') {
            if (this.errorBanner) this.errorBanner.classList.add('show');
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
            setTimeout(() => {
                window.location.href = '/Ssrn/pages/Auth/Verification/mobile-verification.html';
            }, 2000);
        }
    },

    showSkeletonLoader() {
        if (this.skeletonLoader) this.skeletonLoader.classList.add('show');
    }
};
