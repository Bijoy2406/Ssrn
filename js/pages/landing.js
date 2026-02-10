/**
 * SSRN Landing Page Scripts
 * Handles booking form tabs, destination carousel, and filter buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    initBookingTabs();
    initDestinationsCarousel();
    initDestinationFilters();
});

// Also initialize when includes are loaded (in case DOM is ready before includes)
document.addEventListener('includes:loaded', function() {
    // Re-initialize if needed
});

/**
 * Booking Form Tabs
 */
function initBookingTabs() {
    const tabs = document.querySelectorAll('.booking-form__tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('booking-form__tab--active'));

            // Add active class to clicked tab
            this.classList.add('booking-form__tab--active');

            // Handle tab content switching if needed
            const tabType = this.dataset.tab;
            handleTabSwitch(tabType);
        });
    });
}

/**
 * Handle tab content switching
 * @param {string} tabType - The type of tab selected ('one-way' or 'hourly')
 */
function handleTabSwitch(tabType) {
    const toField = document.querySelector('.booking-form .form-group:nth-child(2)');

    if (tabType === 'hourly') {
        // For hourly rides, hide the "To" field or change its label
        if (toField) {
            const label = toField.querySelector('.form-label');
            if (label) {
                label.textContent = 'Pickup Location';
            }
        }
    } else {
        // For one-way rides, show the "To" field
        if (toField) {
            const label = toField.querySelector('.form-label');
            if (label) {
                label.textContent = 'To';
            }
        }
    }
}

/**
 * Destinations Carousel
 */
function initDestinationsCarousel() {
    const track = document.getElementById('destinations-track');
    const prevBtn = document.getElementById('destinations-prev');
    const nextBtn = document.getElementById('destinations-next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentPosition = 0;
    const cardWidth = 408; // Card width + gap
    const visibleCards = getVisibleCards();
    const totalCards = track.children.length;
    const maxPosition = Math.max(0, totalCards - visibleCards);

    // Update buttons state
    function updateButtons() {
        prevBtn.disabled = currentPosition <= 0;
        nextBtn.disabled = currentPosition >= maxPosition;
    }

    // Get number of visible cards based on viewport
    function getVisibleCards() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1200) return 3;
        return 4;
    }

    // Move carousel
    function moveCarousel(direction) {
        const visibleCards = getVisibleCards();
        const maxPosition = Math.max(0, totalCards - visibleCards);

        if (direction === 'next' && currentPosition < maxPosition) {
            currentPosition++;
        } else if (direction === 'prev' && currentPosition > 0) {
            currentPosition--;
        }

        // For now, we'll use CSS scroll behavior
        // In a real implementation, you might want to use transform
        updateButtons();
    }

    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    nextBtn.addEventListener('click', () => moveCarousel('next'));

    // Handle window resize
    window.addEventListener('resize', () => {
        const visibleCards = getVisibleCards();
        const maxPosition = Math.max(0, totalCards - visibleCards);
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        updateButtons();
    });

    // Initial button state
    updateButtons();
}

/**
 * Destination Filter Buttons
 */
function initDestinationFilters() {
    const filters = document.querySelectorAll('.destinations__filter');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('destinations__filter--active'));

            // Add active class to clicked filter
            this.classList.add('destinations__filter--active');

            // Handle filter logic
            const filterType = this.dataset.filter;
            filterDestinations(filterType);
        });
    });
}

/**
 * Filter destinations by type
 * @param {string} filterType - The type of filter ('cities' or 'attractions')
 */
function filterDestinations(filterType) {
    // This would filter the destination cards based on the selected filter
    // For now, it's a placeholder for future implementation
    console.log('Filtering destinations by:', filterType);
}

/**
 * Initialize date picker for booking form
 * This is a placeholder - you would integrate a date picker library
 */
function initDatePicker() {
    const dateInput = document.getElementById('booking-date');
    if (!dateInput) return;

    // Set min date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    // Convert to date input
    dateInput.type = 'date';
    dateInput.min = minDate;

    // Format display value
    dateInput.addEventListener('change', function() {
        const date = new Date(this.value);
        const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
        // Display formatted date (would need custom implementation)
    });
}
