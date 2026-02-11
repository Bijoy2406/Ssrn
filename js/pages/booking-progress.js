/**
 * Booking Progress Demo Page
 * Handles step navigation and active state toggling
 */

document.addEventListener('DOMContentLoaded', () => {
  // For each booking-progress component, wire up step button clicks
  document.querySelectorAll('.booking-progress').forEach(progress => {
    const buttons = progress.querySelectorAll('.booking-progress__buttons .btn');
    const dots = progress.querySelectorAll('.booking-progress__track .booking-step');
    const stepTitle = progress.querySelector('.booking-progress__step-title');
    const stepCounter = progress.querySelector('.booking-progress__step-counter');
    const totalSteps = buttons.length;

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Update button styles
        buttons.forEach((b, i) => {
          b.classList.remove('btn--neutral-outline');
          b.classList.remove('btn--neutral-transparent');
          if (i === index) {
            b.classList.add('btn--neutral-outline');
          } else {
            b.classList.add('btn--neutral-transparent');
          }
        });

        // Update progress dots
        dots.forEach((dot, i) => {
          dot.classList.remove('booking-step--current', 'booking-step--completed', 'booking-step--disabled');
          if (i < index) {
            dot.classList.add('booking-step--current', 'booking-step--completed');
          } else if (i === index) {
            dot.classList.add('booking-step--current');
          } else {
            dot.classList.add('booking-step--disabled');
          }
        });

        // Update mobile header
        if (stepTitle) {
          stepTitle.textContent = btn.textContent.trim();
        }
        if (stepCounter) {
          stepCounter.textContent = 'Step ' + (index + 1) + ' of ' + totalSteps;
        }
      });
    });
  });
});
