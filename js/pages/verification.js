const Verification = {
    init() {
        this.otpInputs = document.querySelectorAll('.otp-field');
        this.verifyBtn = document.getElementById('verify-btn');
        this.resendBtn = document.getElementById('resend-btn');
        this.errorText = document.getElementById('otp-error');
        this.errorBanner = document.getElementById('error-banner');
        this.skeletonLoader = document.getElementById('skeleton-loader');

        this.bindEvents();

        // Focus first input on load
        if (this.otpInputs.length > 0) {
            this.otpInputs[0].focus();
        }
    },

    bindEvents() {
        // OTP Input Logic
        this.otpInputs.forEach((input, index) => {
            // Handle input
            input.addEventListener('input', (e) => {
                // Clear errors on typing
                this.clearErrors();

                const value = e.target.value;

                // Allow only numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }

                // If value entered (length 1), move to next
                if (value.length === 1) {
                    if (index < this.otpInputs.length - 1) {
                        this.otpInputs[index + 1].focus();
                    }
                }
                // Handle paste or longer input if needed (simple version here)
            });

            // Handle Keydown (Backspace, Arrows)
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    if (input.value === '') {
                        // Move to previous if empty
                        if (index > 0) {
                            this.otpInputs[index - 1].focus();
                        }
                    } else {
                        // Just clear current (defualt behavior, but we might want to stay focused)
                    }
                }
                else if (e.key === 'ArrowLeft') {
                    if (index > 0) this.otpInputs[index - 1].focus();
                }
                else if (e.key === 'ArrowRight') {
                    if (index < this.otpInputs.length - 1) this.otpInputs[index + 1].focus();
                }
            });

            // Handle Paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text');
                if (!/^\d+$/.test(text)) return; // Only numbers

                const digits = text.split('');
                this.otpInputs.forEach((inp, i) => {
                    if (i >= index && digits.length > 0) {
                        inp.value = digits.shift();
                        if (i < this.otpInputs.length - 1) {
                            this.otpInputs[i + 1].focus(); // Focus next
                        }
                    }
                });
                // Clear errors
                this.clearErrors();
            });
        });

        // Verify Button
        if (this.verifyBtn) {
            this.verifyBtn.addEventListener('click', () => {
                this.handleVerify();
            });
        }

        // Resend Button
        if (this.resendBtn) {
            this.resendBtn.addEventListener('click', () => {
                // Simulate resend
                this.clearErrors();
                this.otpInputs.forEach(input => input.value = '');
                this.otpInputs[0].focus();
                alert("Code resent successfully!");
            });
        }
    },

    clearErrors() {
        this.otpInputs.forEach(input => input.classList.remove('error'));
        if (this.errorText) this.errorText.classList.remove('show');
        if (this.errorBanner) this.errorBanner.classList.remove('show');
    },

    handleVerify() {
        let code = '';
        this.otpInputs.forEach(input => {
            code += input.value;
        });

        // Check for empty or partial code
        if (code.length < 6) {
            // If completely empty, show specific message
            if (code.length === 0) {
                this.showError('Please enter a verification code');
            } else {
                // Partial code
                this.showError('Please enter a valid 6-digit code');
            }
            return;
        }

        // Logic to simulate states based on code
        // 000000 -> Invalid Code
        if (code === '000000') {
            this.showError('Incorrect verification code. Please check and try again.');
            return;
        }

        // 999999 -> Timeout Error
        if (code === '999999') {
            this.showTimeoutError();
            return;
        }

        // 555555 -> Server Error page
        if (code === '555555') {
            window.location.href = '/Ssrn/pages/Auth/Signup/server-error.html';
            return;
        }

        // 444444 -> Client Error page
        if (code === '444444') {
            window.location.href = '/Ssrn/pages/Auth/Signup/error.html';
            return;
        }

        // Success -> Show loader and finish
        this.showSkeletonLoader();
        setTimeout(() => {
            // Redirect to Success Page
            window.location.href = '/Ssrn/pages/Auth/Verification/success.html';
        }, 1500);
    },

    showError(message) {
        this.otpInputs.forEach(input => input.classList.add('error'));
        if (this.errorText) {
            this.errorText.textContent = message;
            this.errorText.classList.add('show');
        }
    },

    showTimeoutError() {
        if (this.errorBanner) this.errorBanner.classList.add('show');
    },

    showSkeletonLoader() {
        if (this.skeletonLoader) this.skeletonLoader.classList.add('show');
    }
};
