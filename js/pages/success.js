const Success = {
    init() {
        this.bookRideBtn = document.getElementById('book-ride-btn');
        this.successContent = document.getElementById('success-content');
        this.loader = document.getElementById('success-loader');

        this.bindEvents();
    },

    bindEvents() {
        if (this.bookRideBtn) {
            this.bookRideBtn.addEventListener('click', () => {
                this.handleBookRide();
            });
        }
    },

    handleBookRide() {
        // Show Loader
        this.successContent.classList.add('hidden');
        this.loader.classList.add('show');

        // Simulate delay then redirect
        setTimeout(() => {
            window.location.href = '/Ssrn/pages/Landing/landing-page-user.html';
        }, 2000);
    }
};
