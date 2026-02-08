/**
 * SSRN Icon Library
 * SVG icons from Figma design system
 * Usage: import { icons } from './js/icons.js'
 *        element.innerHTML = icons.user
 */

export const icons = {
  // ============================================
  // BASIC UI ICONS
  // ============================================
  user: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
    <path d="M6 21C6 17 8.5 14 12 14C15.5 14 18 17 18 21" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  visibility: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  visibilityOff: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3L21 21M10.5 10.7C9.8 11.5 9.5 12.4 9.5 13.5C9.5 15.7 11.3 17.5 13.5 17.5C14.6 17.5 15.5 17.2 16.3 16.5M19.5 16.2C20.9 14.9 22.1 13.3 23 11.5C21.27 7.11 17 4 12 4C10.5 4 9.1 4.3 7.8 4.8M12 7C14.76 7 17 9.24 17 12C17 12.7 16.85 13.37 16.58 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  favorite: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="11" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  location: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
    <path d="M15 15L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  calendar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 10H21M8 3V6M16 3V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  anchor: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 7V21M5 13C5 16.87 8.13 20 12 20C15.87 20 19 16.87 19 13M5 13H8M19 13H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  more: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
  </svg>`,

  // ============================================
  // NAVIGATION ICONS
  // ============================================
  chevronUp: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 15L12 9L18 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronDown: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronRight: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronSmallLeft: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 16L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronSmallRight: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 16L14 12L10 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  doubleChevronLeft: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  doubleChevronRight: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  arrowForward: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  arrowBackward: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  hamburgerMenu: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ============================================
  // ACTION ICONS
  // ============================================
  add: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  cancel: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  tick: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  remove: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  edit: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  delete: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  share: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  // ============================================
  // STATUS ICONS
  // ============================================
  successCircle: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  error: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  info: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  questionMark: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ============================================
  // TRAVEL & SERVICE ICONS
  // ============================================
  flight: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  hotel: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 17H22V21H2V17ZM4 11C4 8.79 5.79 7 8 7H9C10.1 7 11 7.9 11 9V17H2V11H4ZM13 7H20C21.1 7 22 7.9 22 9V17H13V7Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  trainStation: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5V21H8L11 18H13L16 21H18V20.5L16.5 19C18.43 19 20 17.43 20 15.5V5C20 2.24 16.42 2 12 2C7.58 2 4 2.24 4 5V15.5Z" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="8.5" cy="16" r="1.5" fill="currentColor"/>
    <circle cx="15.5" cy="16" r="1.5" fill="currentColor"/>
    <path d="M5 11H19V6H5V11Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  airport: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  touristAttraction: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6L10 11H14V18L18 13H14V6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  duration: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 6V12H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  car: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11L6.5 6.5H17.5L19 11M5 11H19M5 11V18H19V11M8 18V20M16 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
  </svg>`,

  luggage: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M6 12H18M10 8V4H14V8M10 22V20M14 22V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  passengers: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="17" cy="7" r="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 18C3 15 5.5 13 9 13C12.5 13 15 15 15 18V21H3V18ZM17 13C19 13 21 14.5 21 17V21H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  childSeat: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 10H17C18.1 10 19 10.9 19 12V20H5V12C5 10.9 5.9 10 7 10Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 15H17M9 20V22M15 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  accessible: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="2" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="18" r="4" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 10V14M16 10H8L12 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  pets: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8.5" cy="7" rx="2" ry="2.5" fill="currentColor"/>
    <ellipse cx="15.5" cy="7" rx="2" ry="2.5" fill="currentColor"/>
    <ellipse cx="5" cy="12" rx="1.5" ry="2" fill="currentColor"/>
    <ellipse cx="19" cy="12" rx="1.5" ry="2" fill="currentColor"/>
    <path d="M12 13C15.31 13 18 15.24 18 18C18 19.1 17.1 20 16 20H8C6.9 20 6 19.1 6 18C6 15.24 8.69 13 12 13Z" fill="currentColor"/>
  </svg>`,

  proDriver: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M6 21V19C6 16.79 7.79 15 10 15H14C16.21 15 18 16.79 18 19V21" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 12L14 10L12 8L10 10L12 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  safety: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  waitTime: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 6V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8 2H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  discount: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 5H3C1.9 5 1 5.9 1 7V17C1 18.1 1.9 19 3 19H21C22.1 19 23 18.1 23 17V7C23 5.9 22.1 5 21 5Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 15L17 9M8 10H8.01M16 14H16.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // ============================================
  // MAP & LOCATION ICONS
  // ============================================
  startLocation: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
  </svg>`,

  myLocation: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  mapSearch: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3L9 6L3 3V18L9 21L15 18L21 21V6L15 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="10.5" cy="11.5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 13L14 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  zoomOut: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 10H13M15 15L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  estimatedTime: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 6V12H18M9 2H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  distance: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 12L7 8M3 12L7 16M21 12L17 8M21 12L17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ============================================
  // OTHER ICONS
  // ============================================
  email: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  linkNewTab: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  folder: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  textAreaIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 9H17M7 13H17M7 17H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  maintenance: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L10.6 4.4L13.6 7.4L14.7 6.3ZM3 17.2V20.2H6L16.8 9.4L13.8 6.4L3 17.2Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M18 11L22 7M20 14V20M17 17H23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  circleLoader: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="60 20"/>
  </svg>`,

  circleLoaderDots: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="4" r="2" fill="currentColor" opacity="1"/>
    <circle cx="21.9" cy="7.1" r="2" fill="currentColor" opacity="0.85"/>
    <circle cx="24.9" cy="14" r="2" fill="currentColor" opacity="0.7"/>
    <circle cx="21.9" cy="20.9" r="2" fill="currentColor" opacity="0.55"/>
    <circle cx="14" cy="24" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="6.1" cy="20.9" r="2" fill="currentColor" opacity="0.25"/>
    <circle cx="3.1" cy="14" r="2" fill="currentColor" opacity="0.1"/>
    <circle cx="6.1" cy="7.1" r="2" fill="currentColor" opacity="0"/>
  </svg>`,

  // ============================================
  // SOCIAL MEDIA ICONS
  // ============================================
  facebook: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12C9 10.34 10.34 9 12 9V5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19V15C10.34 15 9 13.66 9 12Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M15 5C15 6.66 16.34 8 18 8V12C16.34 12 15 10.66 15 9V5Z" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,
};

/**
 * Helper function to get icon HTML
 * @param {string} iconName - Name of the icon (e.g., 'user', 'chevronDown')
 * @param {string} className - Optional CSS class to add to the SVG
 * @returns {string} SVG HTML string
 */
export function getIcon(iconName, className = '') {
  const icon = icons[iconName];
  if (!icon) {
    console.warn(`Icon "${iconName}" not found in icon library`);
    return '';
  }

  if (className) {
    return icon.replace('<svg', `<svg class="${className}"`);
  }

  return icon;
}

/**
 * Insert icon into a DOM element
 * @param {HTMLElement} element - Target DOM element
 * @param {string} iconName - Name of the icon
 * @param {string} className - Optional CSS class
 */
export function insertIcon(element, iconName, className = '') {
  element.innerHTML = getIcon(iconName, className);
}
