/**
 * SSRN Footer Component Loader
 * Dynamically loads the Footer.html component into any page
 * Usage: Add <div id="site-footer-container"></div> where the footer should appear
 *        and include this script: <script src="/Ssrn/js/components/footer.js"></script>
 */
(function () {
    'use strict';

    function loadFooter() {
        const container = document.getElementById('site-footer-container');
        if (!container) return;

        // Determine the base path for the component
        const basePath = '/Ssrn/components/Footer.html';

        fetch(basePath)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load footer component: ' + response.status);
                }
                return response.text();
            })
            .then(function (html) {
                container.innerHTML = html;
            })
            .catch(function (error) {
                console.error('Footer component error:', error);
                // Fallback: try relative path
                const relativePath = '../../components/Footer.html';
                fetch(relativePath)
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error('Failed to load footer component (relative): ' + response.status);
                        }
                        return response.text();
                    })
                    .then(function (html) {
                        container.innerHTML = html;
                    })
                    .catch(function (err) {
                        console.error('Footer component fallback error:', err);
                    });
            });
    }

    // Load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
