/**
 * SSRN Tabs Component
 * Reusable tab navigation component
 */

const Tabs = (function() {
  'use strict';

  /**
   * Initialize tabs within a container
   * @param {HTMLElement|string} container - Container element or selector
   * @param {Object} options - Configuration options
   */
  function init(container, options = {}) {
    const el = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!el) return null;

    const config = {
      tabSelector: options.tabSelector || '.tabs__tab, .booking-form__tab',
      panelSelector: options.panelSelector || '.tabs__panel',
      activeClass: options.activeClass || 'tabs__tab--active',
      activePanelClass: options.activePanelClass || 'tabs__panel--active',
      onChange: options.onChange || null,
      ...options
    };

    const tabs = el.querySelectorAll(config.tabSelector);
    const panels = el.querySelectorAll(config.panelSelector);

    if (!tabs.length) return null;

    // Handle tab click
    function handleTabClick(e) {
      const clickedTab = e.currentTarget;
      const tabIndex = Array.from(tabs).indexOf(clickedTab);
      const tabId = clickedTab.dataset.tab || clickedTab.getAttribute('aria-controls');

      // Update tab states
      tabs.forEach((tab, index) => {
        const isActive = index === tabIndex;

        // Handle both custom and booking-form tabs
        tab.classList.remove(config.activeClass, 'booking-form__tab--active');
        if (isActive) {
          tab.classList.add(config.activeClass);
          if (tab.classList.contains('booking-form__tab')) {
            tab.classList.add('booking-form__tab--active');
          }
        }

        tab.setAttribute('aria-selected', isActive);
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Update panel states if panels exist
      if (panels.length) {
        panels.forEach((panel, index) => {
          const isActive = index === tabIndex || panel.id === tabId;
          panel.classList.toggle(config.activePanelClass, isActive);
          panel.setAttribute('aria-hidden', !isActive);
        });
      }

      // Callback
      if (config.onChange) {
        config.onChange({
          tab: clickedTab,
          tabId,
          index: tabIndex
        });
      }
    }

    // Handle keyboard navigation
    function handleKeydown(e) {
      const currentIndex = Array.from(tabs).indexOf(document.activeElement);
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      tabs[newIndex].focus();
      tabs[newIndex].click();
    }

    // Bind events
    tabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
      tab.addEventListener('keydown', handleKeydown);
    });

    // Set initial ARIA attributes
    tabs.forEach((tab, index) => {
      const isActive = tab.classList.contains(config.activeClass) ||
                       tab.classList.contains('booking-form__tab--active');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach(panel => {
      const isActive = panel.classList.contains(config.activePanelClass);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', !isActive);
    });

    // Return controller object
    return {
      selectTab: (index) => {
        if (tabs[index]) {
          tabs[index].click();
        }
      },
      getActiveIndex: () => {
        return Array.from(tabs).findIndex(tab =>
          tab.classList.contains(config.activeClass) ||
          tab.classList.contains('booking-form__tab--active')
        );
      },
      destroy: () => {
        tabs.forEach(tab => {
          tab.removeEventListener('click', handleTabClick);
          tab.removeEventListener('keydown', handleKeydown);
        });
      }
    };
  }

  /**
   * Auto-initialize all tab containers on the page
   */
  function initAll(selector = '.tabs, .booking-form') {
    const containers = document.querySelectorAll(selector);
    return Array.from(containers).map(container => init(container));
  }

  // Public API
  return {
    init,
    initAll
  };
})();

// Export for module usage if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Tabs;
}
