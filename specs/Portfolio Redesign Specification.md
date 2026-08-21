# Portfolio Redesign Specification

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Purpose](#1-purpose)
1. [2. Core Positioning](#2-core-positioning)
1. [3. Existing Site Preservation](#3-existing-site-preservation)
1. [Requirements](#requirements)
   1. [Software Engineering](#software-engineering)
   1. [Cloud & DevOps](#cloud--devops)
   1. [Microsoft 365 & Identity](#microsoft-365--identity)
   1. [Business Solutions](#business-solutions)
1. [Objective](#objective)
1. [Required sections](#required-sections)
   1. [Overview](#overview)
   1. [The Challenge](#the-challenge)
   1. [Architecture](#architecture)
   1. [Architecture Diagram](#architecture-diagram)
   1. [Key Engineering Decisions](#key-engineering-decisions)
   1. [Challenges & Solutions](#challenges--solutions)
   1. [Deployment](#deployment)
   1. [Results](#results)
   1. [Lessons Learned](#lessons-learned)
   1. [Functional](#functional)
   1. [Visual](#visual)
   1. [Technical](#technical)
   1. [Content](#content)

</details>

## 1. Purpose

Redesign and evolve the existing personal portfolio website from a collection of small development projects into a professional engineering portfolio that communicates:

1. software engineering capability
2. systems and problem-solving ability
3. cloud and DevOps experience
4. growing Microsoft ecosystem specialization
5. ability to design, build, deploy, and operate real-world systems

The portfolio should feel like the portfolio of an engineer who builds practical solutions, rather than a student portfolio demonstrating individual programming exercises.

The existing visual identity should be preserved and refined rather than replaced wholesale.

---

## 2. Core Positioning

The portfolio should communicate the following professional identity:

> **A software engineer.**  
> **A problem solver.**

"Software engineer" replaces the current "An app developer" positioning.

"Problem solver" should remain.

The typewriter effect must no longer require all phrases to contain the same number of characters. The implementation should support strings of different lengths naturally and smoothly.

The implementation should not use artificial whitespace, invisible characters, hard-coded padding, or duplicated strings solely to equalize character counts.

The animation itself should serve the content rather than constrain the wording.

---

## 3. Existing Site Preservation

Before making changes, inspect the entire existing website and understand its current:

1. HTML structure
2. CSS architecture
3. JavaScript behaviour
4. navigation
5. responsive layout
6. typewriter implementation
7. project presentation
8. assets
9. typography
10. animations
11. links
12. accessibility considerations

Do not replace working implementation merely for stylistic preference.

Preserve the existing visual identity unless a change is necessary to satisfy this specification.

Do not introduce a frontend framework or build system unless the existing implementation genuinely requires one.

The website should remain lightweight and fast-loading.

Avoid unnecessary dependencies.

---

# 4. Hero Section

## Requirements

Replace the current primary identity of:

> An app developer

with:

> A software engineer

Retain:

> A problem solver

The hero should continue to function correctly on desktop and mobile.

The typewriter/rotating-title implementation must support phrases of arbitrary length.

It must:

1. animate smoothly
2. avoid layout instability where practical
3. avoid excessive horizontal movement
4. work with different title lengths
5. remain readable during animation
6. not depend on equal character counts

Do not redesign the entire hero unless necessary.

---

# 5. About Section

The existing About content already communicates several important aspects of the intended positioning.

Refine it where necessary so that it presents the user as someone working across:

1. software engineering
2. cloud technologies
3. DevOps
4. Microsoft technologies
5. business-oriented technology solutions

The wording must remain truthful.

Do not imply:

1. certifications that have not been earned
2. expertise that has not been demonstrated
3. client work that has not occurred
4. Microsoft partnership benefits or designations that have not been earned
5. employment or professional experience that has not occurred

The portfolio should communicate direction and capability without exaggeration.

---

# 6. Capabilities / What I Do

Introduce a dedicated capabilities section if the existing site structure supports it naturally.

The section should communicate the major areas in which the portfolio is positioned.

Potential capability categories include:

### Software Engineering

Full-stack web application development, APIs, application architecture, databases, and modern web technologies.

### Cloud & DevOps

Cloud deployment, distributed application architecture, CI/CD, infrastructure, storage, databases, and operational considerations.

### Microsoft 365 & Identity

Microsoft 365, Microsoft Entra, identity and access management, collaboration technologies, and related business solutions.

### Business Solutions

Technology solutions designed around practical business requirements rather than technology for its own sake.

The exact visual presentation and wording may be refined during implementation.

Do not present these categories as formal certifications or claims of mastery.

---

# 7. Projects Section

## Objective

Transform the Projects section from a collection of small programming exercises into a showcase of meaningful engineering work.

The primary project presentation should no longer be dominated by small projects such as:

- calculator
- timer
- color mixer
- Rock Paper Scissors
- phone number generator
- similar learning exercises

These projects may remain accessible through GitHub or an archived/secondary presentation if appropriate, but they should not be the primary evidence of professional capability.

Do not unnecessarily delete existing project source code or repositories.

---

# 8. Featured Project: Online Sneaker Shop

The Online Sneaker Shop should become the primary featured project.

Live deployment:

https://sneakers.jindasoftconsulting.com/

The project source repository is private.

The portfolio must not imply that the source code is publicly available.

The project should be presented as a substantial engineering project rather than simply as an e-commerce website.

Suggested positioning:

> A production-oriented e-commerce platform demonstrating full-stack engineering, distributed architecture, cloud deployment, and the practical challenges of taking an application from development to production.

The exact wording may be improved during implementation.

---

# 9. Sneaker Shop Project Card

The featured project should communicate at minimum:

1. project name
2. concise description
3. key technologies or engineering areas
4. live deployment status
5. link to the live application
6. link to the case study

Do not add a fake GitHub/source-code link.

If a source-code link is useful, it may instead be represented as:

> Source code: Private repository

Do not expose repository URLs, credentials, secrets, environment variables, internal infrastructure information, or other private information.

The project must not be presented as a client project unless explicitly established elsewhere.

---

# 10. Sneaker Shop Case Study

Create a dedicated case-study page for the Online Sneaker Shop.

Suggested route:

`/projects/online-sneaker-shop`

Use a route consistent with the existing site's architecture if a different convention is more appropriate.

The case study should focus on engineering decisions and problems rather than functioning as a chronological development diary.

## Required sections

### Overview

Explain what the project is and why it was built.

The case study should establish that the storefront is the visible application used to demonstrate broader engineering capabilities.

### The Challenge

Explain the engineering objective.

Focus on building and taking a modern full-stack application beyond local development toward a production-oriented deployment.

### Architecture

Explain the system at a high level.

The architecture should document the major components and their relationships.

The current deployment architecture includes, where applicable:

1. frontend
2. backend/API
3. PostgreSQL database
4. object storage
5. deployment platforms
6. custom domain

The implementation should verify the actual current architecture rather than assuming the above remains unchanged.

### Architecture Diagram

Include a clear architecture diagram showing the major application and infrastructure components.

The diagram should be understandable to a technical reader without requiring access to the source code.

Do not expose secrets, private endpoints, credentials, or sensitive infrastructure information.

### Key Engineering Decisions

Explain meaningful technical decisions such as:

1. database architecture and migration
2. image/object storage
3. frontend/backend separation
4. deployment architecture
5. monorepo/workspace decisions
6. dependency boundaries
7. infrastructure choices
8. other significant architectural decisions discovered during inspection

For each important decision, prefer this structure:

**Problem → Decision → Reasoning → Result**

Do not merely list technologies.

### Challenges & Solutions

Document genuine engineering problems encountered during development.

Examples may include:

1. dependency/version conflicts
2. workspace architecture
3. migration from local infrastructure
4. deployment issues
5. storage migration
6. production configuration
7. networking or service-boundary issues

Only document challenges that can be verified from the project history/source/configuration.

Do not invent difficulties or fabricate results.

### Deployment

Explain how the application is deployed in production.

Include the relevant services and their responsibilities.

The live deployment should be linked.

### Results

Describe what the completed system demonstrates.

Avoid fabricated metrics such as performance improvements, user counts, revenue, uptime, or scalability figures unless those figures are actually available.

### Lessons Learned

Summarize the most important engineering lessons from building and deploying the system.

Focus on:

1. production engineering
2. architecture
3. cloud infrastructure
4. deployment
5. trade-offs
6. operational considerations

---

# 11. Case Study Tone

The case study should sound like an engineer explaining engineering work.

Prefer:

> "The original workspace contained applications with incompatible React requirements, so the workspace boundaries were changed to allow the applications to evolve independently."

Avoid:

> "I had a problem with React so I changed some stuff."

Prefer:

> "The database was migrated from local PostgreSQL to Neon to provide a remotely accessible production database."

Avoid:

> "I put my database on Neon because local databases aren't good."

The writing should be:

1. concise
2. technical where useful
3. understandable to non-specialists
4. honest
5. evidence-based
6. focused on decisions and trade-offs

Do not turn the case study into marketing copy.

---

# 12. Microsoft Section

Create a dedicated section for the Microsoft ecosystem.

This section should make Microsoft's importance to the user's professional direction visible without overstating current qualifications.

Possible title:

> Microsoft & Cloud

Alternative titles may be used if they fit the existing design better.

The section should communicate interests and developing capabilities around areas such as:

1. Microsoft 365
2. Microsoft Entra
3. identity and access management
4. SharePoint
5. cloud technologies
6. business collaboration solutions
7. automation

The exact technologies and claims must be verified against the existing portfolio content and actual project/certification status.

Do not claim:

1. Microsoft certifications that have not been earned
2. Microsoft Solutions Partner status/designations that have not been earned
3. Microsoft expertise that cannot reasonably be supported
4. client implementations that do not exist

The section should leave room for future credentials and projects to be added without requiring a redesign.

---

# 13. Certification / Credential Readiness

The design should accommodate future Microsoft certifications and credentials.

Do not create prominent empty certification cards simply to fill space.

Instead, structure the Microsoft section so that credentials can be added naturally when they become relevant.

Credentials should distinguish between:

1. certifications actually earned
2. exams planned/in progress
3. technologies currently being studied
4. practical experience

These categories must never be conflated.

---

# 14. Future Projects

The project architecture should support adding additional substantial projects later.

The design should not assume that the Online Sneaker Shop will remain the only featured project indefinitely.

Future projects may include:

1. Microsoft 365 solutions
2. SharePoint solutions
3. identity/Entra projects
4. cloud infrastructure
5. business systems
6. other substantial software engineering projects

The implementation should make adding another project straightforward without requiring significant structural changes.

---

# 15. Project Selection Philosophy

The portfolio should prioritize:

> **Depth over quantity.**

A smaller number of substantial projects is preferable to a large collection of trivial projects.

Do not add placeholder projects solely to make the portfolio appear fuller.

Do not manufacture case studies.

A project should be promoted to the primary portfolio when it demonstrates meaningful engineering, problem-solving, architecture, or business value.

---

# 16. Visual Design

Preserve the existing site's identity.

The redesign should feel like an evolution of the current portfolio rather than a completely unrelated template.

Maintain where appropriate:

1. current typography
2. visual hierarchy
3. general colour palette
4. card language
5. spacing philosophy
6. responsive behaviour
7. overall simplicity

Improve visual hierarchy where necessary to make the new content more prominent.

The Featured Project should receive substantially more visual emphasis than minor historical projects.

The Microsoft section should feel like a first-class part of the portfolio without visually overwhelming the rest of the site.

Do not introduce:

1. unnecessary glassmorphism
2. excessive gradients
3. excessive animations
4. generic SaaS-template aesthetics
5. unnecessary UI libraries
6. decorative components that harm performance

---

# 17. Responsive Design

The website must remain fully usable across:

1. desktop
2. tablet
3. mobile

Verify:

1. hero text
2. typewriter animation
3. project cards
4. case-study layout
5. architecture diagram
6. navigation
7. buttons/links
8. images
9. typography
10. spacing

There must be no unintended horizontal scrolling.

The case study must be readable on a narrow mobile viewport without requiring users to zoom.

---

# 18. Accessibility

Preserve and improve accessibility where practical.

Verify:

1. semantic HTML
2. appropriate heading hierarchy
3. keyboard navigation
4. visible focus states
5. meaningful link text
6. useful image alt text
7. sufficient text contrast
8. reduced-motion considerations for animations

The typewriter animation must not make the content inaccessible.

The meaningful professional titles should remain available as readable text even if animation is disabled.

---

# 19. Performance

The portfolio should remain lightweight.

Avoid adding dependencies unless they provide meaningful value.

Prefer:

1. existing HTML/CSS/JS
2. optimized images
3. lazy loading where appropriate
4. minimal JavaScript
5. no unnecessary runtime libraries

The case-study architecture diagram and screenshots should not unnecessarily inflate page size.

---

# 20. SEO / Metadata

Preserve existing useful metadata and improve it where appropriate.

The site should have meaningful:

1. page titles
2. meta descriptions
3. heading structure
4. Open Graph metadata where already supported

The Sneaker Shop case-study page should have its own meaningful title and description.

Do not keyword-stuff.

---

# 21. Privacy & Security

Do not expose:

- private GitHub repository URLs
- credentials
- API keys
- environment variables
- database connection strings
- private service URLs
- internal infrastructure details
- deployment secrets
- personally sensitive information

Inspect the repository for accidental exposure before considering the implementation complete.

Public URLs may be included where they are intentionally public.

---

# 22. Implementation Constraints

Before implementing:

1. Inspect the entire existing codebase.
2. Identify the current architecture.
3. Identify existing reusable components/styles/scripts.
4. Identify potential regressions.
5. Produce an implementation plan.
6. Do not modify files during the planning phase.

After the plan is reviewed/approved, implement the changes.

Prefer modifying the existing implementation over rebuilding the site from scratch.

Do not migrate the site to a framework unless there is a demonstrated technical reason to do so.

Do not rewrite unrelated code merely for stylistic consistency.

---

# 23. Verification Requirements

After implementation, verify the site rather than assuming that successful code modification means the task is complete.

At minimum verify:

### Functional

- [ ] Navigation works.
- [ ] All internal links work.
- [ ] External links work.
- [ ] Sneaker Shop live link works.
- [ ] Case-study link works.
- [ ] Typewriter animation works.
- [ ] Typewriter works with differently sized strings.
- [ ] No project links point to nonexistent resources.
- [ ] No private repository is accidentally exposed.

### Visual

- [ ] Desktop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] No horizontal overflow.
- [ ] Featured project has appropriate visual prominence.
- [ ] Microsoft section is visually integrated.
- [ ] Case-study page is readable and visually consistent.
- [ ] Images do not distort or overflow containers.

### Technical

- [ ] No JavaScript console errors.
- [ ] No obvious CSS errors.
- [ ] No broken asset references.
- [ ] No unnecessary new dependencies.
- [ ] Existing functionality has not regressed.

### Content

- [ ] "A software engineer" is used instead of "An app developer".
- [ ] "A problem solver" remains.
- [ ] Small tutorial-style projects are no longer the primary portfolio focus.
- [ ] Online Sneaker Shop is the featured project.
- [ ] The live Sneaker Shop deployment is linked.
- [ ] Source code is correctly described as private.
- [ ] Microsoft has its own section.
- [ ] No unsupported certifications, partnerships, clients, or expertise are claimed.

---

# 24. Definition of Done

The redesign is complete when:

1. The portfolio presents the user primarily as a software engineer and problem solver.
2. The hero typewriter no longer depends on equal-length phrases.
3. The portfolio's primary project presentation has shifted from small programming exercises to substantial engineering work.
4. The Online Sneaker Shop is presented as the flagship project.
5. The Sneaker Shop has a dedicated engineering-focused case study.
6. The case study explains architecture, decisions, challenges, deployment, results, and lessons without exposing private information.
7. Microsoft has a dedicated, truthful section reflecting the user's professional direction.
8. The site remains lightweight, responsive, accessible, and visually consistent.
9. Existing functionality has not regressed.
10. The implementation has been verified against the acceptance criteria above.

---

# 25. Agent Behaviour

The implementation agent should exercise engineering judgement.

Do not blindly follow this document when doing so would conflict with the existing architecture or cause unnecessary complexity.

Where implementation details are unspecified, choose the simplest solution that satisfies the requirements.

If an existing implementation already satisfies a requirement, preserve it.

If a requirement cannot be satisfied without a significant architectural change, explain the trade-off before proceeding.

Do not invent content, credentials, metrics, clients, project outcomes, or technical details that cannot be established from the available project information.

The goal is not to maximize the amount of code changed.

The goal is to produce the smallest, cleanest change that transforms the portfolio into a credible professional engineering portfolio.

---

# 26. Expected Workflow

Follow this workflow:

**Phase 1 — Inspect**

Understand the existing website and repository.

**Phase 2 — Plan**

Produce a concrete implementation plan mapped to this specification.

**Phase 3 — Review**

Wait for approval before making substantial changes.

**Phase 4 — Implement**

Implement the approved plan while preserving existing functionality.

**Phase 5 — Verify**

Run appropriate checks and inspect the website at desktop and mobile sizes.

**Phase 6 — Report**

Report:

1. files changed
2. major implementation decisions
3. tests/checks performed
4. any remaining issues
5. any assumptions made

Do not claim something was verified if it was not actually verified.
