# SSRN Pages Structure

This folder structure follows the V1 Design Workload Distribution Plan.

## Folder Organization

### Landing/
Landing pages for anonymous and logged-in users
- `anonymous.html` - Landing page for non-authenticated visitors
- `user.html` - Landing page for authenticated users

### Cards/
Reusable card components and their showcases
- `service-cards.html` - Service offering cards (Airport, City-to-city, Hourly)
- `destination-cards.html` - Destination cards with carousel
- `core-value-cards.html` - Core value proposition cards
- `cta-section-card.html` - Call-to-action section cards
- `upcoming-rides-card.html` - User's upcoming rides display

### Overlays/
Modal dialogs and overlay components
- `share-dialog.html` - Share dialog overlay

### Booking/
Booking flow pages and components

#### Booking/ServiceClass/
Service class selection pages
- `anonymous.html` - Service class selection for non-authenticated users
- `signed-in.html` - Service class selection for authenticated users

#### Booking/Overlays/
Booking-related overlay dialogs
- `standard-business-first.html` - Standard/Business/First class overlays
- `suv-class.html` - SUV class overlays (2 variants)
- `booking-form.html` - Booking form overlay
- `confirmation-dialog.html` - Booking confirmation dialog

#### Booking/PickupInfo/
Pickup information pages
- `anonymous.html` - Pickup info for non-authenticated users
- `signed-in.html` - Pickup info for authenticated users

#### Booking/
- `map-component.html` - Interactive map component

### Auth/
Authentication and account management flows

#### Auth/Login/
Login flow pages
- `email.html` - Email entry page
- `password.html` - Password entry page

#### Auth/Signup/
Registration flow pages
- `email.html` - Email registration page
- `password.html` - Password creation page
- `completing-profile.html` - Profile completion page

#### Auth/Verification/
Account verification pages
- `mobile.html` - Mobile number verification
- `success.html` - Verification success (2 variants)

#### Auth/Password/
Password recovery flow
- `forgot.html` - Forgot password email entry
- `update.html` - Password update page
- `reset-link-sent.html` - Confirmation page after reset link sent
- `update-confirm.html` - Password update confirmation

## Development Milestones

### M1: Foundation & Core Layout (2 weeks) - COMPLETED
- Design Tokens (CSS Variables) ✓
- Navigation Bar (2 states) ✓
- Footer Component ✓
- Button Components ✓

### M2: Browsing & Discovery UI (3 weeks)
Focus: Landing, Cards, Overlays folders

### M3: Booking & Account UI (3 weeks)
Focus: Auth and Booking folders

### M4: Stabilization & Final Delivery (2 weeks)
Focus: Error states, loaders, validation, cross-browser fixes

## Developer Assignments

- **Dev 1**: Core Layout, Landing pages, Card components
- **Dev 2**: Auth flow, Forms, Verification
- **Dev 3**: Booking flow, Service selection, Pickup info

## Notes

- M1 must complete before M2/M3 can begin
- M2 and M3 can run in parallel
- All pages use shared components from `/includes/` and `/css/components/`
- CSS organized in `/css/` with tokens, components, layout, and page-specific styles
- JavaScript organized in `/js/` with components, layout, pages, and utilities
