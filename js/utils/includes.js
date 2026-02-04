/**
 * SSRN Include Loader
 * Loads HTML partials (header, footer) via fetch and injects them into the page
 */

const Includes = (function() {
  'use strict';

  /**
   * Load an HTML partial into a placeholder element
   * @param {string} selector - CSS selector for placeholder element
   * @param {string} path - Path to the HTML file
   * @returns {Promise<boolean>} - Success status
   */
  async function load(selector, path) {
    const element = document.querySelector(selector);

    if (!element) {
      console.warn(`Include: Element "${selector}" not found`);
      return false;
    }

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }

      const html = await response.text();
      element.innerHTML = html;
      return true;
    } catch (error) {
      console.error(`Include error:`, error);
      return false;
    }
  }

  /**
   * Check if user is logged in (via localStorage)
   * @returns {boolean}
   */
  function isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  /**
   * Get current user data
   * @returns {Object|null}
   */
  function getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Load the appropriate header based on auth state
   * @returns {Promise<boolean>}
   */
  async function loadHeader() {
    const headerPath = isLoggedIn()
      ? '/includes/header-logged-in.html'
      : '/includes/header-logged-out.html';

    return await load('#header-placeholder', headerPath);
  }

  /**
   * Load the footer
   * @returns {Promise<boolean>}
   */
  async function loadFooter() {
    return await load('#footer-placeholder', '/includes/footer.html');
  }

  /**
   * Initialize all includes and dispatch ready event
   */
  async function init() {
    const results = await Promise.all([
      loadHeader(),
      loadFooter()
    ]);

    // Dispatch event when all includes are loaded
    // Page scripts can listen for this to initialize header-dependent features
    document.dispatchEvent(new CustomEvent('includes:loaded', {
      detail: {
        header: results[0],
        footer: results[1],
        isLoggedIn: isLoggedIn(),
        user: getUser()
      }
    }));

    return results.every(Boolean);
  }

  /**
   * Reload the header (e.g., after login/logout)
   */
  async function reloadHeader() {
    const success = await loadHeader();

    if (success) {
      document.dispatchEvent(new CustomEvent('includes:header-reloaded', {
        detail: { isLoggedIn: isLoggedIn(), user: getUser() }
      }));
    }

    return success;
  }

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    load,
    loadHeader,
    loadFooter,
    reloadHeader,
    isLoggedIn,
    getUser,
    init
  };
})();

// Export for module usage if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Includes;
}
