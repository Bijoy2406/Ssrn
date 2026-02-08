/**
 * SSRN Include Loader - Simplified
 * Loads HTML components (header, footer) into pages
 */

const Includes = {
  /**
   * Load an HTML component into a placeholder
   * @param {string} id - ID of placeholder element (without #)
   * @param {string} path - Path to the HTML file
   */
  async loadComponent(id, path) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Includes: Element #${id} not found`);
      return;
    }

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }

      const html = await response.text();
      element.innerHTML = html;

      // Execute scripts in the loaded HTML
      const scripts = element.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

    } catch (error) {
      console.error(`Includes error:`, error);
    }
  },

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  isLoggedIn() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).name;
  },

  /**
   * Get current user data
   * @returns {Object|null}
   */
  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Reload header (after login/logout)
   */
  async reloadHeader() {
    const headerPath = this.isLoggedIn()
      ? '/includes/header-logged-in.html'
      : '/includes/header-logged-out.html';

    await this.loadComponent('header', headerPath);
  }
};
