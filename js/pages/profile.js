/**
 * SSRN Account Management Page
 * Handles edit/cancel toggling for account cards
 */
(function () {
  'use strict';

  const cards = document.querySelectorAll('.account-card');

  cards.forEach(function (card) {
    const editBtn = card.querySelector('[data-action="edit"]');
    const cancelBtn = card.querySelector('[data-action="cancel"]');
    const form = card.querySelector('.account-card__form');

    // Edit button → switch to editing state
    if (editBtn) {
      editBtn.addEventListener('click', function () {
        card.classList.add('account-card--editing');
        var firstInput = form && form.querySelector('input, select');
        if (firstInput) firstInput.focus();
      });
    }

    // Cancel button → switch back to default state
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        card.classList.remove('account-card--editing');
        if (form) form.reset();
      });
    }

    // Form submit → save and switch back
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var formName = form.getAttribute('data-form');

        // Update display values from form inputs
        formData.forEach(function (value, key) {
          var displayEl = card.querySelector('[data-field="' + key + '"]');
          if (displayEl) displayEl.textContent = value;
        });

        // Update notification status badges
        if (formName === 'notifications') {
          updateNotificationDisplay(card);
        }

        card.classList.remove('account-card--editing');
      });
    }
  });

  // Update notification On/Off badges from switch states
  function updateNotificationDisplay(card) {
    var displayItems = card.querySelectorAll('.account-card__display .notification-item');
    var formSwitches = card.querySelectorAll('.account-card__form .switch__input');

    formSwitches.forEach(function (switchInput, index) {
      var statusEl = displayItems[index] && displayItems[index].querySelector('.notification-status');
      if (statusEl) {
        if (switchInput.checked) {
          statusEl.textContent = 'On';
          statusEl.className = 'notification-status notification-status--on';
        } else {
          statusEl.textContent = 'Off';
          statusEl.className = 'notification-status notification-status--off';
        }
      }
    });
  }

  // Password visibility toggle
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-toggle-password');
      var input = document.getElementById(targetId);
      if (input) {
        var isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      }
    });
  });
})();
