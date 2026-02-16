/**
 * SSRN Landing Page - Anonymous User
 * Interactive functionality for the anonymous landing page
 * Based on Figma node: 855-17949
 */

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener('load', function() {
  setTimeout(function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('page-loader-overlay--hidden');
    }
  }, 2000);
});

// ============================================
// NAVIGATION DROPDOWNS
// ============================================
function toggleNavDropdown(menuId) {
  const navItem = document.getElementById(menuId + 'Nav');
  if (!navItem) return;

  const isOpen = navItem.classList.contains('nav-item--open');

  // Close all dropdowns
  document.querySelectorAll('.nav-item--open').forEach(item => {
    item.classList.remove('nav-item--open');
  });

  // Toggle current dropdown
  if (!isOpen) {
    navItem.classList.add('nav-item--open');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item--open').forEach(item => {
      item.classList.remove('nav-item--open');
    });
  }
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
function toggleMobileNav() {
  const navFill = document.getElementById('navFill');
  const navOverlay = document.getElementById('navOverlay');

  if (navFill) {
    navFill.classList.toggle('nav-bar__fill--open');
  }
  if (navOverlay) {
    navOverlay.classList.toggle('nav-overlay--visible');
  }
}

// ============================================
// BOOKING FORM TABS
// ============================================
function switchTab(tab) {
  const tabs = document.querySelectorAll('.booking-card__tab');
  tabs.forEach(t => t.classList.remove('booking-card__tab--active'));

  // Find the clicked tab and activate it
  const clickedTab = event.target.closest('.booking-card__tab');
  if (clickedTab) {
    clickedTab.classList.add('booking-card__tab--active');
  }
}

// ============================================
// BOOKING FORM VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const pickup = document.getElementById('pickupLocation')?.value.trim();
    const dropoff = document.getElementById('dropoffLocation')?.value.trim();
    const date = document.getElementById('pickupDate')?.value;
    const time = document.getElementById('pickupTime')?.value;

    // Validation
    if (!pickup || !dropoff || !date || !time) {
      alert('Please fill in all fields');
      return;
    }

    if (pickup.toLowerCase() === dropoff.toLowerCase()) {
      alert('Pickup and dropoff locations must be different');
      return;
    }

    // Success - would normally redirect to booking flow
    alert('Searching for available prices...');
  });
});

// ============================================
// DESTINATIONS FILTER
// ============================================
function filterDestinations(category) {
  const buttons = document.querySelectorAll('.destinations__filter-btn');
  buttons.forEach(btn => btn.classList.remove('destinations__filter-btn--active'));

  const clickedButton = event.target.closest('.destinations__filter-btn');
  if (clickedButton) {
    clickedButton.classList.add('destinations__filter-btn--active');
  }

  // In a real implementation, this would filter the destinations
  // For now, it just updates the UI state
  console.log('Filter changed to:', category);
}

// ============================================
// DESTINATIONS CAROUSEL
// ============================================
let carouselPosition = 0;
let cardsVisible = 3; // Default for desktop

// Calculate visible cards based on viewport
function updateVisibleCards() {
  const width = window.innerWidth;
  if (width <= 768) {
    cardsVisible = 1;
  } else if (width <= 1024) {
    cardsVisible = 2;
  } else {
    cardsVisible = 3;
  }
}

function scrollCarousel(direction) {
  const track = document.getElementById('destinationsTrack');
  if (!track || track.children.length === 0) return;

  updateVisibleCards();

  // Calculate card width dynamically
  const firstCard = track.children[0];
  const cardWidth = firstCard.offsetWidth;
  const gap = 20; // Default gap in pixels
  const scrollAmount = cardWidth + gap;

  carouselPosition += direction * scrollAmount;

  // Calculate max scroll based on number of cards and visible cards
  const totalCards = track.children.length;
  const maxScroll = -(totalCards - cardsVisible) * scrollAmount;

  // Boundaries
  if (carouselPosition > 0) carouselPosition = 0;
  if (carouselPosition < maxScroll) carouselPosition = maxScroll;

  track.style.transform = `translateX(${carouselPosition}px)`;
}

// Reset carousel on window resize
window.addEventListener('resize', function() {
  updateVisibleCards();
  carouselPosition = 0;
  const track = document.getElementById('destinationsTrack');
  if (track) {
    track.style.transform = 'translateX(0)';
  }
});

// ============================================
// SCROLL TO BOOKING
// ============================================
function scrollToBooking() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  setTimeout(function() {
    const pickupInput = document.getElementById('pickupLocation');
    if (pickupInput) {
      pickupInput.focus();
    }
  }, 500);
}

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================
window.toggleNavDropdown = toggleNavDropdown;
window.toggleMobileNav = toggleMobileNav;
window.switchTab = switchTab;
window.filterDestinations = filterDestinations;
window.scrollCarousel = scrollCarousel;
window.scrollToBooking = scrollToBooking;
