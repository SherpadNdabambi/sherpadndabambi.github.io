# Hamburger Menu Navigation Implementation Plan

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Pre-Implementation Repository Findings](#1-pre-implementation-repository-findings)
1. [2. Executive Summary](#2-executive-summary)
1. [3. Background](#3-background)
1. [4. Goals and Non-Goals](#4-goals-and-non-goals)
   1. [Goals](#goals)
   1. [Non-Goals](#non-goals)
1. [5. Implementation Constraints](#5-implementation-constraints)
1. [6. Implementation Details](#6-implementation-details)
   1. [6.1 HTML & ARIA Semantics](#61-html--aria-semantics)
   1. [6.2 Visual Styling & Dropdown Layout (`assets/css/styles.css`)](#62-visual-styling--dropdown-layout-assetscssstylescss)
   1. [6.3 TypeScript Behavioural Specifications (`assets/ts/hamburgermenu.ts`)](#63-typescript-behavioural-specifications-assetstshamburgermenuts)
   1. [6.4 Preserved Site Functionality & Non-Regression](#64-preserved-site-functionality--non-regression)
1. [7. Proposed Changes](#7-proposed-changes)
   1. [[MODIFY] [index.html](./index.html)](#modify-indexhtmlindexhtml)
   1. [[MODIFY] [online-sneaker-shop.html](./projects/online-sneaker-shop.html)](#modify-online-sneaker-shophtmlprojectsonline-sneaker-shophtml)
   1. [[MODIFY] [styles.css](./assets/css/styles.css)](#modify-stylescssassetscssstylescss)
   1. [[NEW] [hamburgermenu.ts](./assets/ts/hamburgermenu.ts)](#new-hamburgermenutsassetstshamburgermenuts)
1. [8. Procedure (Implementation-Ready Steps)](#8-procedure-implementation-ready-steps)
   1. [Step 1: HTML Markup Refactoring](#step-1-html-markup-refactoring)
   1. [Step 2: CSS Responsive Dropdown Styling](#step-2-css-responsive-dropdown-styling)
   1. [Step 3: TypeScript Event Handler Implementation](#step-3-typescript-event-handler-implementation)
   1. [Step 4: Build Integration](#step-4-build-integration)
   1. [Step 5: End-to-End Verification](#step-5-end-to-end-verification)
1. [9. Success Criteria & Verification Plan](#9-success-criteria--verification-plan)
   1. [Acceptance & Success Criteria](#acceptance--success-criteria)
   1. [Verification Steps](#verification-steps)
1. [10. Risks and Mitigation](#10-risks-and-mitigation)
1. [11. Rollback Plan](#11-rollback-plan)
1. [12. Estimated Timeline](#12-estimated-timeline)

</details>

---

## 1. Pre-Implementation Repository Findings

A thorough inspection of the repository codebase reveals the following baseline configurations and design patterns:

1. **Header Structure (`index.html` lines 32–54, `projects/online-sneaker-shop.html` lines 28–47)**:
   - `<header>` is fixed at the top of the viewport (`position: fixed; top: 0; left: 0; right: 0; z-index: 2; padding: 20px; background-color: var(--light-grey);`).
   - `<nav>` uses `display: flex; justify-content: space-between; align-items: center; width: 100%;`.
   - An un-wrapped FontAwesome icon `<i class="fa-solid fa-bars"></i>` sits directly between the brand link and the navigation list `<ul>`.
2. **Established Breakpoint (`assets/css/styles.css` line 464)**:
   - `@media (min-width: 769px)` is the single established breakpoint for desktop header navigation.
   - On screens `< 769px`, `nav ul` is hidden by default (`display: none; margin: 0; padding: 0;`) while `nav .fa-bars` is displayed.
   - On screens `>= 769px`, `nav .fa-bars` is hidden (`display: none;`) and `nav ul` is displayed inline (`display: flex; gap: 30px; list-style: none;`).
3. **Existing Design System Tokens (`assets/css/styles.css` lines 5–13)**:
   - Colors: `--light-grey` (`rgb(233, 236, 239)`), `--dark-grey` (`rgb(51, 51, 51)`), `--silver` (`rgb(220, 225, 228)`), `--primary` (`rgb(37, 99, 235)`).
   - Box Shadow: `0 2px 5px rgba(0, 0, 0, 0.1)` (used on `header.scrolled`).
4. **TypeScript & Build Pipeline (`tsconfig.json`, `package.json`, `.gitignore`)**:
   - `tsconfig.json` compiles TypeScript files from `rootDir: "./assets/ts"` to `outDir: "./dist"` targeting `es2015`.
   - `package.json` defines `"build": "tsc"`.
   - `.gitignore` explicitly ignores `dist/` as a generated build output directory.
   - Scripts in `index.html` are loaded before `</body>` (e.g. `<script src="./dist/headerscrolleffect.js"></script>`). `assets/ts/*.ts` files initialize logic inside a `DOMContentLoaded` event listener wrapper.

---

## 2. Executive Summary

This plan describes a conservative, production-ready enhancement to enable mobile navigation for the personal portfolio website. Currently, on mobile viewports (`< 769px`), primary navigation links are hidden (`display: none;`) while an un-interactive icon (`<i class="fa-solid fa-bars"></i>`) is displayed without toggle event handling or accessibility support.

The proposed change is strictly additive: it wraps the existing icon in a semantic `<button>`, adds a simple responsive CSS dropdown menu for mobile viewports using established design tokens, and creates a lightweight TypeScript module (`assets/ts/hamburgermenu.ts`) following existing project script patterns. Desktop navigation (`>= 769px`) remains 100% unchanged.

---

## 3. Background

The personal portfolio is a fast, lightweight website constructed with plain HTML5, vanilla CSS3, and modular TypeScript.

While desktop viewports (`>= 769px`) display a complete inline navigation bar, mobile viewports (`< 769px`) display `nav .fa-bars` without an interactive wrapper or attached event handlers, rendering mobile navigation inaccessible. Implementing a simple, responsive dropdown menu restores mobile navigation while respecting the site's zero-dependency footprint and lightweight architecture.

---

## 4. Goals and Non-Goals

### Goals

- **Mobile Navigation Usability**: Enable mobile visitors (`< 769px`) to expand and collapse header navigation links smoothly.
- **Strict Preservation of Desktop Layout**: Retain the exact visual appearance, inline layout (`display: flex; gap: 30px;`), alignment, and spacing of desktop navigation on viewports `>= 769px`.
- **Minimal, Low-Disruption UI**: Implement a simple responsive dropdown positioned directly beneath the fixed header container. Avoid modals, drawers, backdrop blurs, or body scroll locking.
- **Specific Accessibility Enhancements**:
  - Wrap the toggle icon in a semantic `<button>` providing a minimum $44 \times 44\text{px}$ touch target.
  - Dynamically synchronize `aria-expanded` (`"true"` / `"false"`) and `aria-controls="primary-navigation"`.
  - Provide clear keyboard focus styling via `:focus-visible`.
  - Close the menu on `Escape` key press and return focus to the toggle button.
  - Disable CSS transitions when `prefers-reduced-motion: reduce` is active.
- **Auto-Close Rules**: Automatically close the open dropdown when:
  - A navigation link is selected.
  - A click occurs outside the open dropdown menu.
  - The viewport is resized to desktop width (`>= 769px`).
- **Reuse Existing Patterns**: Follow existing TypeScript initialization conventions (`DOMContentLoaded`) and existing build commands (`npm run build`).

### Non-Goals

- Redesigning desktop navigation or changing existing route destinations/anchors.
- Introducing drawers, side panels, overlays, backdrop blurs, or focus traps.
- Adding third-party JavaScript dependencies or CSS frameworks.
- Modifying page content outside header navigation components.

---

## 5. Implementation Constraints

- **Plain Tech Stack Only**: Use vanilla HTML5, CSS3, and TypeScript only.
- **Zero New Dependencies**: No external npm packages or UI frameworks.
- **No Desktop Redesign**: Zero visual or structural changes on screen widths `>= 769px`.
- **No Route Alterations**: Preserve all existing anchor destinations (`#about`, `#capabilities`, `#microsoft-cloud`, `#projects`, `#contact`).
- **Reuse Existing Tokens & Breakpoints**: Reuse existing CSS color variables (`--light-grey`, `--dark-grey`, `--silver`, `--primary`), shadow styles (`0 2px 5px rgba(0, 0, 0, 0.1)`), and the established breakpoint (`769px`).
- **Strict Scope Boundary**: Modify only `index.html`, `projects/online-sneaker-shop.html`, `assets/css/styles.css`, and create `assets/ts/hamburgermenu.ts`.

---

## 6. Implementation Details

### 6.1 HTML & ARIA Semantics

Wrap the FontAwesome icon in a semantic `<button>` and assign explicit IDs for ARIA linkage:

```html
<button
  id="hamburger-toggle"
  class="hamburger-menu"
  aria-label="Toggle navigation menu"
  aria-expanded="false"
  aria-controls="primary-navigation"
>
  <i class="fa-solid fa-bars" aria-hidden="true"></i>
</button>
<ul id="primary-navigation" class="nav-links">
  <!-- Nav items -->
</ul>
```

**Accessibility Behavior**:

- On mobile when closed: `nav ul` has `display: none;`, natively hiding links from both layout and screen reader accessibility trees.
- `aria-expanded` clearly conveys open/closed state to assistive technology.

### 6.2 Visual Styling & Dropdown Layout (`assets/css/styles.css`)

- **Toggle Button (`.hamburger-menu`)**:
  - Transparent background, zero border, color matching `--dark-grey`.
  - Minimum height and width of $44\text{px}$ to guarantee touch target accessibility.
  - Outlined with existing focus style via `:focus-visible`.
- **Mobile Dropdown (`< 769px`)**:
  - Positioned absolutely directly beneath `<header>` (`position: absolute; top: 100%; left: 0; right: 0;`).
  - Styled with existing design tokens: `background-color: var(--light-grey);`, `border-bottom: 1px solid var(--silver);`, `box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);`.
  - Flex direction column with $15\text{px}$ vertical padding.
  - Toggled between `display: none;` (closed) and `display: flex;` (open via `.is-open` class).
- **Desktop Breakpoint (`>= 769px`)**:
  - `.hamburger-menu` set to `display: none;`.
  - `#primary-navigation` reset to `display: flex; position: static; flex-direction: row; gap: 30px; box-shadow: none; border: none;`.

### 6.3 TypeScript Behavioural Specifications (`assets/ts/hamburgermenu.ts`)

Following `headerscrolleffect.ts` and `typewriter.ts` conventions, the module registers `initHamburgerMenu()` on `DOMContentLoaded`:

- **State Management**:
  - Toggles `is-open` class on `#primary-navigation`.
  - Synchronizes `aria-expanded` attribute on `#hamburger-toggle` between `"true"` and `"false"`.
- **Keyboard Handling**:
  - When `Escape` is pressed while menu is open: close menu and set focus back to `#hamburger-toggle`.
- **Click-Away Handling**:
  - When a click occurs outside `#primary-navigation` and `#hamburger-toggle` while menu is open: close menu.
- **Link Click Handling**:
  - When any `a` inside `#primary-navigation` is clicked: close menu immediately, allowing natural anchor jumping.
- **Resize Handling**:
  - When `window.innerWidth >= 769`: automatically close menu state so it does not persist if returning to mobile width.

### 6.4 Preserved Site Functionality & Non-Regression

The implementation explicitly guarantees no regression on:

- Existing navigation anchor destinations (`#about`, `#capabilities`, `#microsoft-cloud`, `#projects`, `#contact`).
- Desktop header navigation alignment and spacing on screens `>= 769px`.
- Fixed header scrolling background transition (`headerscrolleffect.ts`).
- Typewriter text animation (`typewriter.ts`).
- Back-to-top button activation.
- External links and case study page structure.
- Clean console execution without runtime JS errors.

---

## 7. Proposed Changes

### [MODIFY] [index.html](./index.html)

- Wrap `<i class="fa-solid fa-bars"></i>` in `<button id="hamburger-toggle" class="hamburger-menu" ...>`.
- Add `id="primary-navigation"` and `class="nav-links"` to `<nav> <ul>`.
- Add `<script src="./dist/hamburgermenu.js"></script>` before `</body>`.

### [MODIFY] [online-sneaker-shop.html](./projects/online-sneaker-shop.html)

- Wrap `<i class="fa-solid fa-bars"></i>` in `<button id="hamburger-toggle" class="hamburger-menu" ...>`.
- Add `id="primary-navigation"` and `class="nav-links"` to `<nav> <ul>`.
- Add `<script src="../dist/hamburgermenu.js"></script>` before `</body>`.

### [MODIFY] [styles.css](./assets/css/styles.css)

- Add `.hamburger-menu` button reset and $44 \times 44\text{px}$ touch target styles.
- Add mobile dropdown rules under default/mobile block and update `@media (min-width: 769px)` desktop overrides.

### [NEW] [hamburgermenu.ts](./assets/ts/hamburgermenu.ts)

- Create standalone TypeScript file implementing `initHamburgerMenu()`.

---

## 8. Procedure (Implementation-Ready Steps)

### Step 1: HTML Markup Refactoring

- **Files Modified**: [index.html](./index.html), [online-sneaker-shop.html](./projects/online-sneaker-shop.html)
- **What is Being Changed**:
  - Wrap existing `<i class="fa-solid fa-bars"></i>` in `<button id="hamburger-toggle" class="hamburger-menu" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="primary-navigation">`.
  - Add `id="primary-navigation"` and `class="nav-links"` to `nav ul`.
  - Add script tags referencing compiled JS before `</body>`.
- **What Must NOT Change**:
  - Logo images, anchor `href` attributes, section IDs, hero content, case study body.
- **Verification**:
  - Inspect HTML output in browser dev tools to ensure clean DOM structure without duplicate IDs.

### Step 2: CSS Responsive Dropdown Styling

- **Files Modified**: [styles.css](./assets/css/styles.css)
- **What is Being Changed**:
  - Add `.hamburger-menu` button styles (transparent, borderless, min $44\text{px}$ size, `:focus-visible`).
  - Add `#primary-navigation.nav-links` mobile dropdown styling (`position: absolute; top: 100%; left: 0; right: 0; background: var(--light-grey); border-bottom: 1px solid var(--silver); box-shadow: 0 2px 5px rgba(0,0,0,0.1); flex-direction: column; padding: 15px 20px;`).
  - Add `display: none;` when closed and `display: flex;` when `.is-open` is active.
  - Update `@media (min-width: 769px)` block to hide `.hamburger-menu` and reset `#primary-navigation` to desktop inline layout.
- **What Must NOT Change**:
  - Existing desktop navigation styles on screens `>= 769px`.
  - Existing header position, padding, or scroll effect styles.
- **Verification**:
  - Resize browser viewport to $< 769\text{px}$ to verify toggle button appearance and dropdown positioning. Expand to $\ge 769\text{px}$ to verify exact desktop header layout preservation.

### Step 3: TypeScript Event Handler Implementation

- **Files Created**: [hamburgermenu.ts](./assets/ts/hamburgermenu.ts)
- **What is Being Changed**:
  - Write `initHamburgerMenu()` listening for `DOMContentLoaded`.
  - Attach click handler to `#hamburger-toggle` to alternate `is-open` class and `aria-expanded` state.
  - Attach click handler to dropdown links to close menu on click.
  - Attach `document` click handler to close menu when clicking outside.
  - Attach `document` keydown handler to close menu on `Escape` key press and return focus to toggle button.
  - Attach `window` resize listener to close menu if width exceeds `768px`.
- **What Must NOT Change**:
  - Existing script behavior in `headerscrolleffect.ts` or `typewriter.ts`.
- **Verification**:
  - Manual interaction testing in browser developer tools console and viewport emulator.

### Step 4: Build Integration

- **Files Modified**: `dist/hamburgermenu.js` (generated by build)
- **What is Being Changed**:
  - Run `npm run build` (`tsc`) to compile `assets/ts/hamburgermenu.ts` into `dist/hamburgermenu.js`.
- **What Must NOT Change**:
  - Existing `tsconfig.json` compiler configuration.
- **Verification**:
  - Verify clean compilation output without TypeScript compiler errors.

### Step 5: End-to-End Verification

- **Files Involved**: All modified files.
- **What is Being Tested**: Full mobile and desktop navigation workflows, keyboard interaction, and regression suite.
- **Verification**: Execute Verification Plan in Section 9.

---

## 9. Success Criteria & Verification Plan

### Acceptance & Success Criteria

- [ ] `<button id="hamburger-toggle">` is visible on viewports $< 769\text{px}$ and hidden on viewports $\ge 769\text{px}$.
- [ ] Toggle button provides a minimum touch target size of $44 \times 44\text{px}$.
- [ ] Toggling the hamburger button opens and closes the mobile dropdown menu.
- [ ] `aria-expanded` dynamically reflects state (`"true"` when open, `"false"` when closed).
- [ ] Pressing `Escape` key closes an open dropdown and returns focus to `#hamburger-toggle`.
- [ ] Clicking outside an open dropdown closes the menu.
- [ ] Clicking any link inside the mobile dropdown closes the menu and navigates to the target section smoothly.
- [ ] Resizing window from mobile to desktop width ($\ge 769\text{px}$) automatically resets mobile menu state.
- [ ] Desktop navigation on viewports $\ge 769\text{px}$ remains completely identical to baseline layout.
- [ ] Header scroll background effect (`headerscrolleffect.ts`) and typewriter animation (`typewriter.ts`) function without error.
- [ ] TypeScript compilation (`npm run build`) runs cleanly without errors.

### Verification Steps

1. **Build Check**:
   ```bash
   npm run build
   ```
2. **Mobile Viewport Test ($375\text{px}$)**:
   - Click hamburger button $\rightarrow$ verify dropdown expands, `aria-expanded="true"`.
   - Click `#capabilities` link $\rightarrow$ verify dropdown closes and page scrolls smoothly.
   - Re-open dropdown, press `Escape` key $\rightarrow$ verify dropdown closes and focus returns to button.
   - Re-open dropdown, click outside $\rightarrow$ verify dropdown closes.
3. **Desktop Viewport Test ($1024\text{px}$)**:
   - Verify hamburger button is hidden (`display: none`).
   - Verify links display inline with $30\text{px}$ gap.
4. **Console & Regression Test**:
   - Verify developer console shows zero JavaScript errors or warnings.

---

## 10. Risks and Mitigation

| Risk                                                | Impact | Mitigation Strategy                                                                                                                |
| :-------------------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Dropdown overlapping content under fixed header** | Low    | Dropdown is positioned `position: absolute; top: 100%` relative to `<header>`, inheriting `z-index: 2` to stay above page content. |
| **Desktop layout shift if breakpoint mismatched**   | Low    | Explicitly reuse established `@media (min-width: 769px)` breakpoint for all desktop styling.                                       |
| **Focus loss on Escape key close**                  | Low    | Explicitly invoke `toggleButton.focus()` upon closing via `Escape` key.                                                            |

---

## 11. Rollback Plan

If unexpected regressions occur:

1. Revert modifications to `index.html`, `projects/online-sneaker-shop.html`, and `assets/css/styles.css`.
2. Remove `assets/ts/hamburgermenu.ts`.
3. Run `npm run build` to compile the baseline TypeScript files.

---

## 12. Estimated Timeline

| Phase                                | Description                                                       | Target Duration |
| :----------------------------------- | :---------------------------------------------------------------- | :-------------- |
| **Phase 1: Markup & CSS Styling**    | Add semantic toggle button, ARIA attributes, and dropdown CSS     | 20 minutes      |
| **Phase 2: TypeScript Event Module** | Create `hamburgermenu.ts` with toggle, keyboard, click-away logic | 20 minutes      |
| **Phase 3: Build & Verification**    | Run `npm run build`, perform mobile/desktop verification          | 20 minutes      |
| **Total Estimated Time**             |                                                                   | **1.0 Hour**    |
