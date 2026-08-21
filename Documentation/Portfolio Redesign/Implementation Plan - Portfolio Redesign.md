# Portfolio Redesign Implementation Plan

## Table of Contents

<details>

   <summary>Contents</summary>

1. [Executive Summary](#executive-summary)
1. [Key Corrections & Principles Applied](#key-corrections--principles-applied)
1. [Proposed Changes](#proposed-changes)
   1. [Component 1: Hero Section & Typewriter Refactor](#component-1-hero-section--typewriter-refactor)
      1. [[MODIFY] [index.html](./index.html)](#modify-indexhtmlindexhtml)
      1. [[MODIFY] [styles.css](./assets/css/styles.css)](#modify-stylescssassetscssstylescss)
      1. [[NEW] [typewriter.ts](./assets/ts/typewriter.ts)](#new-typewritertsassetststypewriterts)
   1. [Component 2: About & Capabilities Section](#component-2-about--capabilities-section)
      1. [[MODIFY] [index.html](./index.html)](#modify-indexhtmlindexhtml-1)
      1. [[MODIFY] [styles.css](./assets/css/styles.css)](#modify-stylescssassetscssstylescss-1)
   1. [Component 3: Microsoft & Cloud Specialization Section](#component-3-microsoft--cloud-specialization-section)
      1. [[MODIFY] [index.html](./index.html)](#modify-indexhtmlindexhtml-2)
      1. [[MODIFY] [styles.css](./assets/css/styles.css)](#modify-stylescssassetscssstylescss-2)
   1. [Component 4: Flagship Project Showcase & Project List Refactor](#component-4-flagship-project-showcase--project-list-refactor)
      1. [[MODIFY] [index.html](./index.html)](#modify-indexhtmlindexhtml-3)
      1. [[DELETE] [filterbuttons.ts](./assets/ts/filterbuttons.ts)](#delete-filterbuttonstsassetstsfilterbuttonsts)
      1. [[NEW] [online-sneaker-shop.html](./projects/online-sneaker-shop.html)](#new-online-sneaker-shophtmlprojectsonline-sneaker-shophtml)
1. [Verification Plan](#verification-plan)
   1. [Automated Tests](#automated-tests)
   1. [Manual Verification](#manual-verification)

</details>

## Executive Summary

Evolve the personal portfolio from a collection of small learning projects into a clean, credible professional engineering portfolio. The redesign communicates software engineering, problem-solving, cloud & DevOps experience, and Microsoft ecosystem specialization while prioritizing **depth over quantity**.

---

## Key Corrections & Principles Applied

1. **Microsoft & Cloud Section**: Capability- and problem-oriented rather than certification- or curriculum-oriented. Removes all references to "currently studying", "working toward", or empty certification cards. Truthful, concise, and evidence-based.

2. **Removal of Tutorial Projects**: Completely removes the 7 small tutorial/toy projects from `index.html`. No archive drawers, accordions, toggles, or secondary grids. Only a single clean link to GitHub is retained for repository discovery.

3. **Flagship Focus**: The Online Sneaker Shop is the sole featured flagship project.

4. **Dependency & Library Policy**: Do not introduce new third-party libraries or frameworks unless they provide meaningful value. Preserve existing external assets/libraries (such as Font Awesome and `tilting-card`) where appropriate rather than undertaking unrelated dependency cleanup.

5. **Target Page Hierarchy**:
   - Hero / Professional Identity
   - About / Engineering Positioning
   - Capabilities / What I Do
   - Microsoft & Cloud Specialization
   - Featured Project (Online Sneaker Shop)
   - Dedicated Case Study Page (`projects/online-sneaker-shop.html`)
   - Contact & Footer

---

## Proposed Changes

### Component 1: Hero Section & Typewriter Refactor

#### [MODIFY] [index.html](./index.html)

- Update headline positioning from "An app developer." to "A software engineer."
- Provide accessible typewriter HTML structure with a default fallback text span so content is immediately readable if JavaScript is disabled or `prefers-reduced-motion` is active.
- Load `./dist/typewriter.js`.

#### [MODIFY] [styles.css](./assets/css/styles.css)

- Remove old CSS `@keyframes typing` and `@keyframes slide` rules that enforced equal character lengths.
- Add minimal, layout-stable styles for the typewriter cursor and text container.

#### [NEW] [typewriter.ts](./assets/ts/typewriter.ts)

- Self-contained TypeScript module without introducing unnecessary external dependencies.
- Respects `prefers-reduced-motion: reduce` media query.
- Smoothly types, pauses, deletes, and rotates between `"A software engineer."` and `"A problem solver."` regardless of character length differences.

---

### Component 2: About & Capabilities Section

#### [MODIFY] [index.html](./index.html)

- Refine bio text to emphasize software engineering, cloud infrastructure, DevOps, and business solutions.
- Add `<section id="capabilities" class="capabilities">` with four core cards:
  - **Software Engineering**: Full-stack web applications, APIs, application architecture, clean data structures.
  - **Cloud & DevOps**: Cloud deployment, distributed architecture, CI/CD, object storage, operational reliability.
  - **Microsoft 365 & Identity**: Entra ID, identity & access management, collaboration, enterprise workflow automation.
  - **Business Solutions**: Practical, business-oriented engineering solutions.

#### [MODIFY] [styles.css](./assets/css/styles.css)

- Add clean responsive grid styles for the capabilities cards matching existing design language.

---

### Component 3: Microsoft & Cloud Specialization Section

#### [MODIFY] [index.html](./index.html)

- Add `<section id="microsoft-cloud">` section.
- Frame content strictly around business problem areas solved with Microsoft & cloud tools (identity management with Microsoft Entra, M365 collaboration architecture, cloud services integration, workflow automation).
- Completely exclude study tracks, exam preparation, future certifications, or unearned partner designations.

#### [MODIFY] [styles.css](./assets/css/styles.css)

- Style the Microsoft & Cloud section cleanly using the site's primary and silver color accents.

---

### Component 4: Flagship Project Showcase & Project List Refactor

#### [MODIFY] [index.html](./index.html)

- Remove all 7 small tutorial project cards (Timer, CRM Dashboard, Color Mixer, Educational Gaming Site, Rock Paper Scissors, Phone Number Generator, Diffchecker Clone) and category filter buttons.
- Create a prominent **Featured Project** card for **Online Sneaker Shop**:
  - Live deployment link: `https://sneakers.jindasoftconsulting.com/`
  - Case Study link: `projects/online-sneaker-shop.html`
  - Tech tags: React, Node.js, PostgreSQL (Neon), Object Storage, Cloud Deployment.
  - Repository notice: "Source code: Private repository".
- Retain a simple, clean link card pointing to GitHub for exploring other code repositories.

#### [DELETE] [filterbuttons.ts](./assets/ts/filterbuttons.ts)

- Remove category filter script as filter buttons are removed.

#### [NEW] [online-sneaker-shop.html](./projects/online-sneaker-shop.html)

- Create standalone case study page.
- Focus: Technical problem solving, architecture decisions, trade-offs, deployment, and lessons learned.
- Sections:
  1. Overview & Purpose
  2. The Engineering Challenge
  3. System Architecture & Diagram (SVG / clear visual markup)
  4. Key Engineering Decisions (Problem → Decision → Reasoning → Result)
  5. Challenges & Solutions (Monorepo separation, DB migration to Neon)
  6. Production Deployment
  7. Results & Lessons Learned

---

## Verification Plan

### Automated Tests

- Execute `npm run build` (`tsc`) to verify TypeScript compilation without errors.

### Manual Verification

- Test responsiveness on desktop, tablet, and mobile viewports.
- Check typewriter animation behavior (arbitrary length support, no layout shift).
- Test `prefers-reduced-motion` to confirm static text remains readable.
- Verify navigation and internal section links (`#about`, `#capabilities`, `#microsoft-cloud`, `#projects`, `#contact`).
- Verify links to live deployment (`https://sneakers.jindasoftconsulting.com/`) and case study page (`projects/online-sneaker-shop.html`).
- Ensure no private repository links, secret credentials, or internal infrastructure endpoints are exposed.
