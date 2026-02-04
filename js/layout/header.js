/**
 * SSRN Header / Navigation
 * Mobile menu toggle and user dropdown functionality
 */

const Header = (function() {
  'use strict';

  let isInitialized = false;

  /**
   * Initialize mobile navigation toggle
   */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('active');

      menu.classList.toggle('active');
      toggle.classList.toggle('nav__toggle--active');
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('nav__toggle--active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.classList.remove('nav__toggle--active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /**
   * Initialize user dropdown (logged-in state)
   */
  function initUserDropdown() {
    const userToggle = document.querySelector('.nav__user');
    const dropdown = document.querySelector('.nav__user-dropdown');

    if (!userToggle || !dropdown) return;

    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('nav__dropdown--visible');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('nav__dropdown--visible');
    });
  }

  /**
   * Initialize smooth scroll for navigation links
   */
  function initSmoothScroll() {
    document.querySelectorAll('.nav__link[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Close mobile menu if open
          const menu = document.querySelector('.nav__menu');
          const toggle = document.querySelector('.nav__toggle');
          if (menu?.classList.contains('active')) {
            menu.classList.remove('active');
            toggle?.classList.remove('nav__toggle--active');
          }

          // Scroll to target with header offset
          const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Set active navigation link based on current page
   */
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('nav__link--active');
      }
    });
  }

  /**
   * Initialize all header functionality
   */
  function init() {
    if (isInitialized) return;

    initMobileNav();
    initUserDropdown();
    initSmoothScroll();
    setActiveLink();

    isInitialized = true;
  }

  /**
   * Reinitialize header (after include reload)
   */
  function reinit() {
    isInitialized = false;
    init();
  }

  // Listen for includes loaded event
  document.addEventListener('includes:loaded', init);
  document.addEventListener('includes:header-reloaded', reinit);

  // Also init on DOM ready in case includes aren't used
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    init,
    reinit
  };
})();

// Export for module usage if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Header;
}
