# Hamburger Menu Navigation Implementation Plan (Slide-In Right Drawer)

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Executive Summary](#1-executive-summary)
1. [2. Background & Feature Refinement](#2-background--feature-refinement)
1. [3. Goals and Non-Goals](#3-goals-and-non-goals)
   1. [Goals](#goals)
   2. [Non-Goals](#non-goals)
1. [4. Implementation Details](#4-implementation-details)
   1. [4.1 Icon Transition (`fa-bars` to `fa-xmark`)](#41-icon-transition-fa-bars-to-fa-xmark)
   2. [4.2 Right Slide-In Side Drawer (`assets/css/styles.css`)](#42-right-slide-in-side-drawer-assetscssstylescss)
   3. [4.3 TypeScript State Logic (`assets/ts/hamburgermenu.ts`)](#43-typescript-state-logic-assetstshamburgermenuts)
1. [5. Proposed Changes](#5-proposed-changes)
   1. [[MODIFY] index.html](./index.html)
   2. [[MODIFY] online-sneaker-shop.html](./projects/online-sneaker-shop.html)
   3. [[MODIFY] styles.css](./assets/css/styles.css)
   4. [[MODIFY] hamburgermenu.ts](./assets/ts/hamburgermenu.ts)
1. [6. Verification & Non-Regression Plan](#6-verification--non-regression-plan)

</details>

---

## 1. Executive Summary

This refined implementation plan outlines the update of the mobile navigation menu on `< 769px` viewports to a **right slide-in side drawer**, paired with an interactive **hamburger-to-X icon transition**.

When the mobile menu button is activated:
1. The FontAwesome icon smoothly transitions from `fa-bars` (hamburger) to `fa-xmark` (close X).
2. The navigation menu slides in from off-screen right (`translateX(100%)` $\rightarrow$ `translateX(0)`).
3. On desktop (`>= 769px`), all mobile drawer styles and toggle icons are hidden, preserving the original inline header navigation intact.

---

## 2. Background & Feature Refinement

The initial hamburger menu implementation utilized a vertical dropdown overlay directly beneath the header. The user has requested two specific visual and interactive enhancements:
1. **Side Menu**: Mobile navigation drawer should slide in from the right edge of the viewport.
2. **Icon Transformation**: The toggle icon should switch from the 3-line hamburger bar (`fa-bars`) into a close X icon (`fa-xmark`) while the menu is open.

---

## 3. Goals and Non-Goals

### Goals
- **Right Slide-In Drawer (`< 769px`)**:
  - Position `#primary-navigation` as a fixed panel flush with the right screen edge (`top: 0; right: 0; bottom: 0; width: 280px; max-width: 80vw;`).
  - Animate entrance using `transform: translateX(100%)` (closed) to `transform: translateX(0)` (open) with a smooth $0.3\text{s}$ CSS transition.
  - Apply `box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15)` for visual elevation over page content.
- **Icon Transition (`fa-bars` $\leftrightarrow$ `fa-xmark`)**:
  - Dynamically toggle FontAwesome icon classes in TypeScript when menu state changes.
  - Maintain button `z-index: 101` so the toggle button stays accessible above the drawer.
- **Accessibility & Reduced Motion**:
  - Keep `aria-expanded` synchronized.
  - Support `Escape` key close and return focus to button.
  - Support click-away outside drawer close.
  - Respect `@media (prefers-reduced-motion: reduce)` by disabling slide transitions.

### Non-Goals
- Changing desktop navigation (`>= 769px`).
- Adding external animation frameworks or npm packages.

---

## 4. Implementation Details

### 4.1 Icon Transition (`fa-bars` to `fa-xmark`)

Inside `#hamburger-toggle`, the nested `<i class="fa-solid fa-bars"></i>` icon dynamically swaps classes in `assets/ts/hamburgermenu.ts`:
- **Closed**: `<i class="fa-solid fa-bars" aria-hidden="true"></i>`
- **Open**: `<i class="fa-solid fa-xmark" aria-hidden="true"></i>`

### 4.2 Right Slide-In Side Drawer (`assets/css/styles.css`)

```css
/* Mobile Toggle Button */
.hamburger-menu {
  position: relative;
  z-index: 101; /* Keep button above sliding drawer */
  min-width: 44px;
  min-height: 44px;
  background: transparent;
  border: none;
  color: var(--dark-grey);
  cursor: pointer;
}

/* Right Slide-In Drawer (< 769px) */
nav ul.nav-links {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 80vw;
  height: 100vh;
  background-color: var(--light-grey);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 90px 30px 30px;
  gap: 20px;
  z-index: 100;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  list-style: none;
  margin: 0;
}

nav ul.nav-links.is-open {
  display: flex;
  transform: translateX(0);
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  nav ul.nav-links {
    transition: none;
  }
}

/* Desktop Reset (>= 769px) */
@media (min-width: 769px) {
  .hamburger-menu {
    display: none;
  }
  nav ul.nav-links {
    position: static;
    width: auto;
    max-width: none;
    height: auto;
    background: transparent;
    box-shadow: none;
    transform: none;
    flex-direction: row;
    padding: 0;
    gap: 30px;
  }
}
```

### 4.3 TypeScript State Logic (`assets/ts/hamburgermenu.ts`)

```typescript
function setMenuState(open: boolean): void {
  toggle.setAttribute("aria-expanded", String(open));
  const icon = toggle.querySelector("i");
  
  if (open) {
    nav.classList.add("is-open");
    toggle.classList.add("is-open");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  } else {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
}
```

---

## 5. Proposed Changes

### [MODIFY] [styles.css](./assets/css/styles.css)
- Update `nav ul.nav-links` to fixed right slide-in drawer layout (`position: fixed; top: 0; right: 0; transform: translateX(100%); transition: transform 0.3s ease-in-out;`).
- Add `.is-open` rule `transform: translateX(0);`.
- Elevate `.hamburger-menu` `z-index: 101` so the toggle button stays visible and clickable above the slide drawer.

### [MODIFY] [hamburgermenu.ts](./assets/ts/hamburgermenu.ts)
- Update `setMenuState` to swap `fa-bars` and `fa-xmark` icon classes dynamically when opening/closing.

---

## 6. Verification & Non-Regression Plan

1. **Build Verification**:
   - Run `npm run build` (`tsc`) and ensure zero errors.
2. **Side Drawer Test ($375\text{px}$)**:
   - Click hamburger button $\rightarrow$ icon transforms to `fa-xmark`, menu slides in smoothly from the right side.
   - Click `fa-xmark` icon or outside drawer $\rightarrow$ icon transforms back to `fa-bars`, menu slides out to the right.
3. **Desktop Test ($\ge 769\text{px}$)**:
   - Verify hamburger button is hidden and desktop inline layout is preserved without transform or fixed positioning artifacts.
