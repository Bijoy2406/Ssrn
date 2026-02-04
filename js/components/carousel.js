/**
 * SSRN Carousel Component
 * Horizontal scrolling carousel with navigation buttons
 */

const Carousel = (function() {
  'use strict';

  /**
   * Initialize a carousel
   * @param {HTMLElement|string} container - Container element or selector
   * @param {Object} options - Configuration options
   */
  function init(container, options = {}) {
    const el = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!el) return null;

    const config = {
      trackSelector: options.trackSelector || '.destinations__track',
      prevSelector: options.prevSelector || '.destinations__nav-btn--prev',
      nextSelector: options.nextSelector || '.destinations__nav-btn--next',
      itemSelector: options.itemSelector || '.destination-card',
      gap: options.gap || 24,
      scrollBehavior: options.scrollBehavior || 'smooth',
      onChange: options.onChange || null,
      ...options
    };

    const track = el.querySelector(config.trackSelector);
    const prevBtn = el.querySelector(config.prevSelector);
    const nextBtn = el.querySelector(config.nextSelector);

    if (!track) return null;

    let scrollPosition = 0;

    /**
     * Get width of a single item including gap
     */
    function getItemWidth() {
      const item = track.querySelector(config.itemSelector);
      if (!item) return 280;
      return item.offsetWidth + config.gap;
    }

    /**
     * Get maximum scroll position
     */
    function getMaxScroll() {
      return Math.max(0, track.scrollWidth - track.clientWidth);
    }

    /**
     * Update button disabled states
     */
    function updateButtons() {
      const maxScroll = getMaxScroll();

      if (prevBtn) {
        prevBtn.disabled = scrollPosition <= 0;
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
      }

      if (nextBtn) {
        nextBtn.disabled = scrollPosition >= maxScroll;
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
      }
    }

    /**
     * Scroll to a specific position
     */
    function scrollTo(position) {
      const maxScroll = getMaxScroll();
      scrollPosition = Math.max(0, Math.min(position, maxScroll));

      track.style.transform = `translateX(-${scrollPosition}px)`;
      track.style.transition = config.scrollBehavior === 'smooth'
        ? 'transform 0.3s ease'
        : 'none';

      updateButtons();

      if (config.onChange) {
        config.onChange({ position: scrollPosition, maxScroll });
      }
    }

    /**
     * Scroll by one item width
     */
    function scrollPrev() {
      scrollTo(scrollPosition - getItemWidth());
    }

    function scrollNext() {
      scrollTo(scrollPosition + getItemWidth());
    }

    /**
     * Handle keyboard navigation when buttons are focused
     */
    function handleKeydown(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
        prevBtn?.focus();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
        nextBtn?.focus();
      }
    }

    // Bind events
    if (prevBtn) {
      prevBtn.addEventListener('click', scrollPrev);
      prevBtn.addEventListener('keydown', handleKeydown);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', scrollNext);
      nextBtn.addEventListener('keydown', handleKeydown);
    }

    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scrollTo(0);
      }, 150);
    });

    // Initialize
    track.style.transition = 'transform 0.3s ease';
    updateButtons();

    // Return controller object
    return {
      scrollTo,
      scrollPrev,
      scrollNext,
      getPosition: () => scrollPosition,
      destroy: () => {
        prevBtn?.removeEventListener('click', scrollPrev);
        nextBtn?.removeEventListener('click', scrollNext);
        prevBtn?.removeEventListener('keydown', handleKeydown);
        nextBtn?.removeEventListener('keydown', handleKeydown);
      }
    };
  }

  /**
   * Auto-initialize all carousels on the page
   */
  function initAll(selector = '.destinations__carousel') {
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
  module.exports = Carousel;
}
