document.addEventListener('DOMContentLoaded', () => {

  // ── Tab switching — 3 tabs: oneway / roundtrip / hourly ───────
  window.switchTab = function (type) {
    const btns = document.querySelectorAll('.booking-form-landing__toggle-btn');
    btns.forEach(btn => btn.classList.remove('booking-form-landing__toggle-btn--active'));

    const activeId = { oneway: 'tab-oneway', roundtrip: 'tab-roundtrip', hourly: 'tab-hourly' }[type];
    if (activeId) document.getElementById(activeId)?.classList.add('booking-form-landing__toggle-btn--active');

    const toField       = document.getElementById('dropoffLocation')?.closest('.booking-form-landing__field');
    const durationField = document.getElementById('durationField');
    const returnField   = document.getElementById('returnDateField');

    if (toField)       toField.style.display       = (type === 'hourly') ? 'none' : 'flex';
    if (durationField) durationField.style.display  = (type === 'hourly') ? 'flex' : 'none';
    if (returnField)   returnField.style.display    = (type === 'roundtrip') ? 'flex' : 'none';
  };

  // ── Location / Duration Dropdowns ─────────────────────────────
  const dropdownConfigs = [
    { inputId: 'pickupLocation', dropdownId: 'fromDropdown' },
    { inputId: 'dropoffLocation', dropdownId: 'toDropdown' },
    { inputId: 'durationInput',   dropdownId: 'durationDropdown' }
  ];

  dropdownConfigs.forEach(({ inputId, dropdownId }) => {
    const input    = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    input.addEventListener('click', e => {
      e.stopPropagation();
      closeAllPickers([dropdownId]);
      dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    dropdown.querySelectorAll('.booking-form-landing__dropdown-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        const text = item.querySelector('.booking-form-landing__dropdown-text')?.textContent;
        if (text) input.value = text;
        dropdown.style.display = 'none';
      });
    });
  });

  // ── Elements ──────────────────────────────────────────────────
  const dateInput        = document.getElementById('pickupDate');
  const inlinePicker     = document.getElementById('inlineDateTimePicker');
  if (!dateInput || !inlinePicker) return;

  const dateWrapper      = dateInput.closest('.booking-form-landing__input-wrapper');
  const chevronEl        = dateWrapper?.querySelector('.booking-form-landing__date-chevron');

  const timeInput        = document.getElementById('pickupTime');
  const inlineTimePicker = document.getElementById('inlineTimePicker');
  const timeWrapper      = timeInput?.closest('.booking-form-landing__input-wrapper');
  const timeChevronEl    = timeWrapper?.querySelector('.booking-form-landing__time-chevron');

  const hourCol          = document.getElementById('hourColumn');
  const minCol           = document.getElementById('minuteColumn');
  const ampmCol          = document.getElementById('ampmColumn');
  const ampmHeaderCol    = document.getElementById('ampmHeaderCol');
  const timeColumnsWrapper = document.getElementById('timeColumnsWrapper');

  // ── State ─────────────────────────────────────────────────────
  let viewDate       = new Date();
  let selectedDate   = null;
  let selectedHour   = 5;
  let selectedMinute = 0;
  let is12h          = true;
  let selectedPeriod = 'PM';

  // ── Date Picker helpers ───────────────────────────────────────
  function openDatePicker() {
    closeAllPickers(['inlineDateTimePicker']);
    inlinePicker.classList.add('booking-form-landing__inline-picker--open');
    if (chevronEl) chevronEl.classList.add('booking-form-landing__date-chevron--open');
    renderCalendar();
  }

  function closeDatePicker() {
    inlinePicker.classList.remove('booking-form-landing__inline-picker--open');
    if (chevronEl) chevronEl.classList.remove('booking-form-landing__date-chevron--open');
  }

  // ── Time Picker helpers ───────────────────────────────────────
  function openTimePicker() {
    closeAllPickers(['inlineTimePicker']);
    if (inlineTimePicker) {
      inlineTimePicker.classList.add('booking-form-landing__inline-picker--open');
      if (timeChevronEl) timeChevronEl.classList.add('booking-form-landing__time-chevron--open');
      populateTimeCols();
    }
  }

  function closeTimePicker() {
    if (inlineTimePicker) {
      inlineTimePicker.classList.remove('booking-form-landing__inline-picker--open');
      if (timeChevronEl) timeChevronEl.classList.remove('booking-form-landing__time-chevron--open');
    }
  }

  window.closeDateTimePicker = function () {
    closeDatePicker();
    closeTimePicker();
  };

  // ── Date wrapper click ────────────────────────────────────────
  if (dateWrapper) {
    dateWrapper.addEventListener('click', e => {
      e.stopPropagation();
      if (inlinePicker.classList.contains('booking-form-landing__inline-picker--open')) {
        closeDatePicker();
      } else {
        openDatePicker();
      }
    });
  }

  // ── Time wrapper click ────────────────────────────────────────
  if (timeWrapper) {
    timeWrapper.addEventListener('click', e => {
      e.stopPropagation();
      if (inlineTimePicker && inlineTimePicker.classList.contains('booking-form-landing__inline-picker--open')) {
        closeTimePicker();
      } else {
        openTimePicker();
      }
    });
  }

  // ── Calendar ──────────────────────────────────────────────────
  const monthYearEl   = document.getElementById('currentMonthYear');
  const daysContainer = document.getElementById('bflCalendarDays');

  function updateDateInput() {
    if (!selectedDate) return;
    const dayName   = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long' });
    const day       = selectedDate.getDate();
    const year      = selectedDate.getFullYear();
    dateInput.value = `${dayName} , ${monthName} ${day}, ${year}`;
  }

  function renderCalendar() {
    if (!monthYearEl || !daysContainer) return;

    const year  = viewDate.getFullYear();
    const month = viewDate.getMonth();
    monthYearEl.textContent =
      viewDate.toLocaleString('en-US', { month: 'long' }) + ' ' + year;

    daysContainer.innerHTML = '';

    const today         = new Date();
    const firstDay      = new Date(year, month, 1).getDay();
    const daysInMonth   = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-picker__day date-picker__day--muted';
      btn.textContent = prevMonthDays - i;
      btn.disabled = true;
      daysContainer.appendChild(btn);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-picker__day';
      btn.textContent = d;

      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year  === today.getFullYear();
      if (isToday) btn.classList.add('date-picker__day--today');

      if (
        selectedDate &&
        d     === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year  === selectedDate.getFullYear()
      ) {
        btn.classList.add('date-picker__day--selected');
      }

      btn.addEventListener('click', e => {
        e.stopPropagation();
        selectedDate = new Date(year, month, d);
        renderCalendar();
        // Auto-confirm: update input and close picker
        updateDateInput();
        closeDatePicker();
      });

      daysContainer.appendChild(btn);
    }

    const total    = firstDay + daysInMonth;
    const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= trailing; d++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-picker__day date-picker__day--muted';
      btn.textContent = d;
      btn.disabled = true;
      daysContainer.appendChild(btn);
    }
  }

  // Month / year navigation
  document.getElementById('prevMonth')?.addEventListener('click', e => {
    e.stopPropagation();
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('nextMonth')?.addEventListener('click', e => {
    e.stopPropagation();
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });
  document.getElementById('prevYear')?.addEventListener('click', e => {
    e.stopPropagation();
    viewDate = new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1);
    renderCalendar();
  });
  document.getElementById('nextYear')?.addEventListener('click', e => {
    e.stopPropagation();
    viewDate = new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1);
    renderCalendar();
  });

  // ── Time columns ──────────────────────────────────────────────
  function populateTimeCols() {
    if (!hourCol || !minCol) return;
    hourCol.innerHTML = '';
    minCol.innerHTML  = '';

    const maxH = is12h ? 12 : 23;
    const minH = is12h ? 1  : 0;

    // Hours
    for (let h = minH; h <= maxH; h++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-picker__item';
      btn.textContent = String(h).padStart(2, '0');
      if (h === selectedHour) btn.classList.add('time-picker__item--selected');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        selectedHour = h;
        hourCol.querySelectorAll('.time-picker__item')
               .forEach(b => b.classList.remove('time-picker__item--selected'));
        btn.classList.add('time-picker__item--selected');
      });
      hourCol.appendChild(btn);
    }

    // Minutes (increments of 5)
    for (let m = 0; m < 60; m += 5) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-picker__item';
      btn.textContent = String(m).padStart(2, '0');
      if (m === selectedMinute) btn.classList.add('time-picker__item--selected');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        selectedMinute = m;
        minCol.querySelectorAll('.time-picker__item')
              .forEach(b => b.classList.remove('time-picker__item--selected'));
        btn.classList.add('time-picker__item--selected');
      });
      minCol.appendChild(btn);
    }

    // AM/PM column: show in 12h, hide in 24h
    if (ampmCol) {
      ampmCol.innerHTML = '';
      if (is12h) {
        ampmCol.style.display = '';
        if (ampmHeaderCol) ampmHeaderCol.style.display = '';
        // Update grid to 3 columns
        if (timeColumnsWrapper) timeColumnsWrapper.style.gridTemplateColumns = '1fr 1fr 1fr';
        const headerEl = document.getElementById('timeColumnsHeader');
        if (headerEl) headerEl.style.gridTemplateColumns = '1fr 1fr 1fr';

        ['AM', 'PM'].forEach(period => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'time-picker__item';
          btn.textContent = period;
          if (selectedPeriod === period) btn.classList.add('time-picker__item--selected');
          btn.addEventListener('click', e => {
            e.stopPropagation();
            selectedPeriod = period;
            ampmCol.querySelectorAll('.time-picker__item')
                   .forEach(b => b.classList.remove('time-picker__item--selected'));
            btn.classList.add('time-picker__item--selected');
          });
          ampmCol.appendChild(btn);
        });
      } else {
        ampmCol.style.display = 'none';
        if (ampmHeaderCol) ampmHeaderCol.style.display = 'none';
        // Update grid to 2 columns
        if (timeColumnsWrapper) timeColumnsWrapper.style.gridTemplateColumns = '1fr 1fr';
        const headerEl = document.getElementById('timeColumnsHeader');
        if (headerEl) headerEl.style.gridTemplateColumns = '1fr 1fr';
      }
    }

    // Scroll selected items into view
    requestAnimationFrame(() => {
      hourCol.querySelector('.time-picker__item--selected')
             ?.scrollIntoView({ block: 'center' });
      minCol.querySelector('.time-picker__item--selected')
            ?.scrollIntoView({ block: 'center' });
    });
  }

  // ── 12h / 24h toggle ──────────────────────────────────────────
  document.getElementById('tp-12h')?.addEventListener('click', e => {
    e.stopPropagation();
    is12h = true;
    if (selectedHour === 0 || selectedHour > 12) selectedHour = 5;
    document.getElementById('tp-12h').classList.add('time-picker__toggle-option--active');
    document.getElementById('tp-12h').classList.remove('time-picker__toggle-option--inactive');
    document.getElementById('tp-24h').classList.remove('time-picker__toggle-option--active');
    document.getElementById('tp-24h').classList.add('time-picker__toggle-option--inactive');
    populateTimeCols();
  });

  document.getElementById('tp-24h')?.addEventListener('click', e => {
    e.stopPropagation();
    is12h = false;
    document.getElementById('tp-24h').classList.add('time-picker__toggle-option--active');
    document.getElementById('tp-24h').classList.remove('time-picker__toggle-option--inactive');
    document.getElementById('tp-12h').classList.remove('time-picker__toggle-option--active');
    document.getElementById('tp-12h').classList.add('time-picker__toggle-option--inactive');
    populateTimeCols();
  });

  // ── Time Confirm button ───────────────────────────────────────
  document.getElementById('confirmTimeBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const h = String(selectedHour).padStart(2, '0');
    const m = String(selectedMinute).padStart(2, '0');
    const timeSuffix = is12h ? ' ' + selectedPeriod : '';
    if (timeInput) {
      timeInput.value = `${h}:${m}${timeSuffix}`;
    }
    closeTimePicker();
  });

  // ── Close all pickers helper ──────────────────────────────────
  function closeAllPickers(exceptIds = []) {
    dropdownConfigs.forEach(({ dropdownId }) => {
      if (!exceptIds.includes(dropdownId)) {
        const el = document.getElementById(dropdownId);
        if (el) el.style.display = 'none';
      }
    });
    if (!exceptIds.includes('inlineDateTimePicker')) {
      closeDatePicker();
    }
    if (!exceptIds.includes('inlineTimePicker')) {
      closeTimePicker();
    }
  }

  // ── Return Date Picker (Round Trip — node 902-23905) ──────────
  const returnDateInput   = document.getElementById('returnDate');
  const returnDatePicker  = document.getElementById('inlineReturnDatePicker');
  const returnChevron     = document.getElementById('returnDateChevron');

  if (returnDateInput && returnDatePicker) {
    let rViewDate     = new Date();
    let rSelectedDate = null;

    const rMonthYearEl   = document.getElementById('rCurrentMonthYear');
    const rDaysContainer = document.getElementById('rCalendarDays');

    function renderReturnCalendar() {
      if (!rMonthYearEl || !rDaysContainer) return;
      const year  = rViewDate.getFullYear();
      const month = rViewDate.getMonth();
      rMonthYearEl.textContent = rViewDate.toLocaleString('en-US', { month: 'long' }) + ' ' + year;
      rDaysContainer.innerHTML = '';

      const today         = new Date();
      const firstDay      = new Date(year, month, 1).getDay();
      const daysInMonth   = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      for (let i = firstDay - 1; i >= 0; i--) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'date-picker__day date-picker__day--muted';
        btn.textContent = prevMonthDays - i;
        btn.disabled = true;
        rDaysContainer.appendChild(btn);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'date-picker__day';
        btn.textContent = d;
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        if (isToday) btn.classList.add('date-picker__day--today');
        if (rSelectedDate && d === rSelectedDate.getDate() && month === rSelectedDate.getMonth() && year === rSelectedDate.getFullYear()) {
          btn.classList.add('date-picker__day--selected');
        }
        btn.addEventListener('click', e => {
          e.stopPropagation();
          rSelectedDate = new Date(year, month, d);
          const dayName   = rSelectedDate.toLocaleDateString('en-US', { weekday: 'short' });
          const monthName = rSelectedDate.toLocaleDateString('en-US', { month: 'long' });
          returnDateInput.value = `${dayName} , ${monthName} ${d}, ${year}`;
          returnDatePicker.classList.remove('booking-form-landing__inline-picker--open');
          if (returnChevron) returnChevron.classList.remove('booking-form-landing__return-chevron--open');
          renderReturnCalendar();
        });
        rDaysContainer.appendChild(btn);
      }
      const total    = firstDay + daysInMonth;
      const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
      for (let d = 1; d <= trailing; d++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'date-picker__day date-picker__day--muted';
        btn.textContent = d;
        btn.disabled = true;
        rDaysContainer.appendChild(btn);
      }
    }

    const returnWrapper = returnDateInput.closest('.booking-form-landing__input-wrapper');
    if (returnWrapper) {
      returnWrapper.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = returnDatePicker.classList.contains('booking-form-landing__inline-picker--open');
        closeAllPickers(['inlineReturnDatePicker']);
        if (!isOpen) {
          returnDatePicker.classList.add('booking-form-landing__inline-picker--open');
          if (returnChevron) returnChevron.classList.add('booking-form-landing__return-chevron--open');
          renderReturnCalendar();
        } else {
          returnDatePicker.classList.remove('booking-form-landing__inline-picker--open');
          if (returnChevron) returnChevron.classList.remove('booking-form-landing__return-chevron--open');
        }
      });
    }

    document.getElementById('rPrevMonth')?.addEventListener('click', e => { e.stopPropagation(); rViewDate = new Date(rViewDate.getFullYear(), rViewDate.getMonth() - 1, 1); renderReturnCalendar(); });
    document.getElementById('rNextMonth')?.addEventListener('click', e => { e.stopPropagation(); rViewDate = new Date(rViewDate.getFullYear(), rViewDate.getMonth() + 1, 1); renderReturnCalendar(); });
    document.getElementById('rPrevYear')?.addEventListener('click',  e => { e.stopPropagation(); rViewDate = new Date(rViewDate.getFullYear() - 1, rViewDate.getMonth(), 1);  renderReturnCalendar(); });
    document.getElementById('rNextYear')?.addEventListener('click',  e => { e.stopPropagation(); rViewDate = new Date(rViewDate.getFullYear() + 1, rViewDate.getMonth(), 1);  renderReturnCalendar(); });
  }

  // ── Click outside to close ────────────────────────────────────
  document.addEventListener('click', e => {
    if (!e.target.closest('.booking-form-landing')) {
      closeAllPickers();
      if (returnDatePicker) {
        returnDatePicker.classList.remove('booking-form-landing__inline-picker--open');
        if (returnChevron) returnChevron.classList.remove('booking-form-landing__return-chevron--open');
      }
    }
  });
});
