# Nexa Mobiles Website

## Student Information
- **Name:** Dimpho Makhene
- **Student Number:** [ST10501982]
- **Module:** WEDE5020 — Web Development (Introduction)
- **Assessment:** Portfolio of Evidence (PoE)

## Project Overview
Nexa Mobiles is a South African-based retailer selling genuine new and pre-owned Apple iPhones. This project is a functional, responsive, SEO-optimised 5-page website built for Nexa Mobiles as part of the WEDE5020 PoE, developed across three parts:
- **Part 1:** HTML structure and content — submitted, 92/100
- **Part 2:** CSS styling and responsive design (current stage)
- **Part 3:** JavaScript functionality and SEO

## Website Goals and Objectives
- Establish a professional online presence beyond social media.
- Showcase current iPhone stock, models and prices clearly.
- Generate qualified enquiries and orders through the website.
- Build customer trust through clear information and easy contact options.

## Key Features and Functionality
- 5-page site: Home, About Us, Products (price list), Enquiry, Contact
- Full navigation menu linking every page to every other page
- External stylesheet (`css/style.css`) with a consistent blue/white brand system
- CSS Grid and Flexbox layout throughout (hero, product catalogue, contact page, forms)
- Fully responsive: breakpoints for desktop, tablet, and mobile; tables reflow into stacked cards on small screens
- Responsive images: `srcset`/`sizes` on product photos, `<picture>` on the price-list graphic
- Enquiry form and contact form (client-side validation to be added in Part 3)
- Embedded map on the Contact page

## Timeline and Milestones
See **Section 8 (Timeline and Milestones)** of `Proposal2_Nexa_Mobiles.docx` for the detailed, week-by-week breakdown covering all three PoE parts.

## Part 1 Details
Part 1 covers the foundational HTML structure of the site: 5 HTML pages (index, about, products, enquiry, contact), a working navigation system, and integration of researched content (iPhone price list, business info, contact details). Submitted and assessed at 92/100 (Level 4).

## Part 2 Details
Part 2 covers the CSS styling and responsive design of the site, and implementing corrections from Part 1 feedback:
- Base styles, design tokens, and typography (Google Fonts: Montserrat + Open Sans)
- Layout built with CSS Grid (product catalogue, hero, contact page) and Flexbox (navigation, forms)
- Visual styling: colour system, borders, hover/focus/active states on all interactive elements
- Responsive breakpoints at 900px, 768px, and 480px, using relative units (`rem`, `%`, `clamp()`)
- Responsive images via `srcset`/`sizes` and `<picture>`
- Screenshots of desktop, tablet, and mobile views: see `/screenshots` *(add your own browser dev-tools screenshots here before submission)*

## Sitemap
```
Home (index.html)
 ├── About Us (about.html)
 ├── Products (products.html)
 ├── Enquiry (enquiry.html)
 └── Contact (contact.html)
```
All pages link to all other pages via the navigation menu.

## Changelog

### Part 1
- **[Date]** — Initial project setup: folder structure, 5 HTML pages with basic content, starter CSS.

### Part 1 feedback corrections (actioned in Part 2)
Following Part 1 feedback (92/100), the following corrections were made to `Proposal2_Nexa_Mobiles.docx`:
- **17 Sep 2026** — Expanded *Current Website Analysis* with competitor landscape, quantified reach, and the trust-signal gap (previously marked "lacks depth").
- **17 Sep 2026** — Expanded *Design and User Experience* with concrete design-system detail: colour usage rules, spacing/grid system, interaction states, and imagery rationale (previously marked "vague or lacks coherence").
- **17 Sep 2026** — Added a **Wireframes** section with 7 low-fidelity wireframes (5 desktop pages + 2 mobile) (previously 0/2, none provided).
- **17 Sep 2026** — Rewrote *Timeline and Milestones* with a realistic, granular week-by-week plan mapped to the three PoE parts (previously marked "vague or unrealistic").
- **17 Sep 2026** — Added an **Alternative Proposal Considered** section documenting the organisation not selected and the rationale for choosing Nexa Mobiles (previously "partially exceeds" on Two Proposals).
- **17 Sep 2026** — Replaced the reference list with a complete, consistently Harvard-formatted set covering every external source used (previously "incomplete or incorrectly formatted").

### Part 2 — CSS styling and responsive design
- **17 Sep 2026** — Created external stylesheet `css/style.css`: reset, design tokens (colour/typography/spacing variables), and base typography.
- **17 Sep 2026** — Linked Google Fonts (Montserrat, Open Sans) on all 5 pages.
- **17 Sep 2026** — Built header/nav (Flexbox), hero section (CSS Grid), mission/vision split (CSS Grid), and the products catalogue (CSS Grid, `auto-fit`/`minmax`) with card-style `.product-series` sections.
- **17 Sep 2026** — Restructured `contact.html` with a `.contact-layout` Grid wrapper (details + form in column 1, map spanning column 2).
- **17 Sep 2026** — Restructured `products.html`: wrapped series sections in `.products-grid`; added `data-label` attributes to table cells for responsive stacking.
- **17 Sep 2026** — Styled tables, forms, and buttons, including hover/focus/active states throughout.
- **17 Sep 2026** — Added responsive breakpoints (900px / 768px / 480px): nav stacks on mobile, hero and product grid collapse to one column, tables reflow into labelled key-value rows.
- **17 Sep 2026** — Renamed `iphone 13.jpeg` → `iphone-13.jpeg` and `price- list.jpeg` → `price-list.jpeg` (removed spaces for clean URLs).
- **17 Sep 2026** — Generated responsive image variants (400w/800w for product photos, 480w/900w for the price-list graphic) and added `srcset`/`sizes` and `<picture>` markup.
- **17 Sep 2026** — Fixed a bug where the mobile table-stacking rule didn't apply (tables use plain `<tr><th>` header rows with no `<thead>`); header rows are now hidden directly on mobile.
- **17 Sep 2026** — Fixed a bug where "Our Vision" displayed before "Our Mission" on mobile (an explicit `grid-row` from the desktop layout wasn't reset in the mobile media query).
- **17 Sep 2026** — Fixed a bug where the Contact page's map didn't stack under the form on mobile (an explicit `grid-column: 2` wasn't reset in the mobile media query).
- **17 Sep 2026** — Removed a premature `:invalid` red-border style that fired on empty required fields before the user had interacted with them.

### Part 3
- **25 Oct 2026, enquiry.html:** Added JavaScript validation (name, SA phone format, optional email, required dropdowns, 300-character message counter) with inline error messages. Added an instant price and availability response based on the selected model, storage and condition.

- **25 Oct 2026, contact.html:** Added JavaScript validation (name, email, SA phone format, message type, 10 to 500 character message) with inline errors. The validated details are compiled into an email draft addressed to the business. Replaced the map placeholder with an embedded Google Map of Alexandra, Johannesburg.

-**27 Oct 2026, products.html: Added JavaScript product search, price sorting, collapsible accordion series sections, a click-to-enlarge image lightbox, and scroll fade-in animations (products.js).
- **31 Oct 2026, SEO:** Added keyword-based title tags and meta descriptions to all five pages, created robots.txt and sitemap.xml, and checked image alt text and heading structure. Keywords targeted: buy iPhone Johannesburg, pre-owned iPhone Johannesburg, iPhone price list South Africa.
- **31 Oct 2026, Deployment:** Deployed the website on Netlify. Live site: https://stellar-gumdrop-c832cb.netlify.app. Updated robots.txt and sitemap.xml with the live address.

## References
- Apple Inc. (2026) *Apple South Africa*. Available at: https://www.apple.com/za/ (Accessed: 8 August 2026).
- Afrihost (2026) *Domain Registration Pricing*. Available at: https://www.afrihost.com (Accessed: 8 August 2026).
- GitHub Inc. (2026) *GitHub Pages Documentation*. Available at: https://pages.github.com (Accessed: 8 August 2026).
- Google (2026) *Google Fonts — Montserrat & Open Sans*. Available at: https://fonts.google.com (Accessed: 2 September 2026).
- Mozilla Developer Network (2026) *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 2 September 2026).
- Mozilla Developer Network (2026) *Responsive images*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Responsive_images (Accessed: 2 September 2026).
- The Independent Institute of Education (2026) *WEDE5020 Web Development Module Manual*. Johannesburg: The IIE.
- Netlify (2026) *Netlify Drop*. Available at: https://app.netlify.com/drop (Accessed: 31 October 2026).

