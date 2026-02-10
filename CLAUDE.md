# SSRN Project Architecture & Design Rules

## Folder Architecture
- **HTML:** Save to `pages/[category]/[page-name].html`.
- **CSS (Page-specific):** Always save to `css/pages/[page-name].css`.
- **JS (Page-specific):** Always save to `js/pages/[page-name].js`.
- **Includes:** Shared HTML partials stored in `/includes/` folder.

## Global Components (DO NOT REBUILD)

When generating new pages, **DO NOT** build the header or footer from scratch. Use the existing shared components:

### Header Include
Use one of these patterns for the header placeholder:
```html
<!-- Preferred: ID-based (auto-detects auth state) -->
<div id="header-placeholder"></div>

<!-- Alternative: data-include attribute -->
<div data-include="/includes/header-logged-out.html"></div>
```

Available headers:
- `/includes/header-logged-in.html` - Authenticated user navigation
- `/includes/header-logged-out.html` - Public navigation with sign-in button

The `includes.js` script automatically loads the correct header based on authentication state (checks `localStorage.user`).

### Footer Include
```html
<!-- Preferred: ID-based -->
<div id="footer-placeholder"></div>

<!-- Alternative: data-include attribute -->
<div data-include="/includes/footer.html"></div>
```

### Required Scripts
Every page must include these scripts at the bottom of `<body>`:
```html
<!-- Core Scripts (required for header/footer) -->
<script src="/js/utils/includes.js"></script>
<script src="/js/layout/header.js"></script>

<!-- Page-specific scripts -->
<script src="/js/pages/[page-name].js"></script>
```

### Required Stylesheets
Every page must include these in `<head>`:
```html
<!-- Design System (required) -->
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/layout/grid.css">
<link rel="stylesheet" href="/css/layout/header.css">
<link rel="stylesheet" href="/css/layout/footer.css">

<!-- Components (as needed) -->
<link rel="stylesheet" href="/css/components/buttons.css">
<link rel="stylesheet" href="/css/components/cards.css">
<link rel="stylesheet" href="/css/components/forms.css">
<link rel="stylesheet" href="/css/components/tabs.css">

<!-- Page-specific -->
<link rel="stylesheet" href="/css/pages/[page-name].css">
```

## Design Language (CSS Enforcement)

You MUST maintain the established design language from the following files:
1. **css/tokens.css**: Primary source for variables (colors, spacing, typography). Never hardcode hex codes.
2. **css/components/**: Use existing classes for UI elements (e.g., `buttons.css`, `cards.css`, `forms.css`).
3. **style.css**: Use this for global resets and cross-page utility classes.
4. **css/layout/**: Use `grid.css` for structural layout, `header.css` and `footer.css` for global nav styling.

## Path Convention

**ALWAYS use absolute paths** starting with `/` for all assets:
```html
<!-- Correct -->
<link rel="stylesheet" href="/css/tokens.css">
<script src="/js/utils/includes.js"></script>
<a href="/pages/auth/login.html">

<!-- Incorrect (relative paths break in nested folders) -->
<link rel="stylesheet" href="../../css/tokens.css">
```

## Automatic Execution Instructions

When I select a Figma frame:
- Analyze the structure and map it to existing components in `/css/components/`.
- Automatically save the generated code into the designated folders listed above without asking for the path.
- Reference all assets using absolute paths from root (e.g., `/assets/images/`).
- **Do NOT generate header or footer** - use the placeholder elements described above.

## Page Template

Use this template for new pages:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Page Title] - SSRN</title>

    <!-- Design System -->
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/tokens.css">
    <link rel="stylesheet" href="/css/layout/grid.css">
    <link rel="stylesheet" href="/css/layout/header.css">
    <link rel="stylesheet" href="/css/layout/footer.css">

    <!-- Components -->
    <link rel="stylesheet" href="/css/components/buttons.css">
    <link rel="stylesheet" href="/css/components/cards.css">
    <link rel="stylesheet" href="/css/components/forms.css">

    <!-- Page Specific -->
    <link rel="stylesheet" href="/css/pages/[page-name].css">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="page page--with-header">

    <!-- Header -->
    <div id="header-placeholder"></div>

    <main class="page__main">
        <!-- Page content here -->
    </main>

    <!-- Footer -->
    <div id="footer-placeholder"></div>

    <!-- Core Scripts -->
    <script src="/js/utils/includes.js"></script>
    <script src="/js/layout/header.js"></script>

    <!-- Page Scripts -->
    <script src="/js/pages/[page-name].js"></script>

</body>
</html>
```

## Events

The include system dispatches these events for page scripts to hook into:

```javascript
// Fired when header and footer are loaded
document.addEventListener('includes:loaded', (e) => {
    console.log('Auth state:', e.detail.isLoggedIn);
    console.log('User:', e.detail.user);
});

// Fired when header is reloaded (e.g., after login/logout)
document.addEventListener('includes:header-reloaded', (e) => {
    // Re-initialize any header-dependent features
});
```
