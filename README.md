# [Your Name] — Digital Marketer Portfolio

A premium, single-page portfolio website for a digital marketer / growth strategist,
built as a **static site** (HTML + CSS + vanilla JS) with a dark-green, beige and
metallic-gold design system.

---

## 1. Project goal

Give a digital marketing professional a high-end agency–grade web presence that feels
dynamic, trustworthy and high-converting — while keeping **all personal data out of the
code**, so the owner can drop in their own details in one file.

**Design language**

| Token | Value | Use |
| --- | --- | --- |
| Primary background | `#1B4D3E` (dark green) | page background, header |
| Deeper green | `#143A31` / `#10302A` | alternating sections, drawer, footer |
| Primary text | `#F7F5F0` (soft beige) | body copy, headings |
| Accent | `#C9A227` → `#E7CE73` gold gradient | buttons, metrics, highlights |
| Crisp white | `#FFFFFF` | hover states, contrast |
| Display font | **Anton** (large, bold, condensed) | headings, `DIGITAL`, `MARKETER` |
| Body font | **Inter** | all readable text |

---

## 2. Currently completed features

**Structure (all 10 sections built)**

1. **Header** — sticky top bar, circular profile photo, "Available for work" pill with a
   pulsing green dot, rounded gold hamburger menu button.
2. **Slide-in nav drawer** — right-hand panel, numbered links `01`–`08`, backdrop,
   Escape-to-close, focus trap, focus returned to the toggle on close.
3. **Hero** — stacked display typography (`[Your First Name] [Your Last Name]` → huge gold
   `DIGITAL` → portrait → outlined `MARKETER`), floating + pulsing circular badge over the
   portrait, rotating raking-light rays, subtitle, two CTAs, scroll cue.
4. **Services** — "What I Can Do For You" accordion, 4 items, single-open behaviour,
   per-service capability tags.
5. **About & Stats** — `Hi, I'm [Your Name]` intro, three large gold **animated counters**,
   phone / email / location list with icons, minimalist social icons, wide pill "My Story" button.
6. **Featured Campaigns** — responsive card grid: image placeholder, category pill, bold
   title, description, highlighted result line.
7. **Testimonials** — 5-star gold ratings, quote cards with client avatar/name/title, plus
   visually distinct **stat cards** mixed in (`98%` Satisfaction, `200%` Revenue Growth).
8. **FAQ** — second accordion, 5 questions.
9. **Insights & Ideas** — blog/case-study cards with category pill, date, headline, "Read article" link.
10. **Contact** — final CTA with portrait, form (Name, Email, Service dropdown, Message) and a
    prominent gold **SUBMIT** button, wired to the RESTful Table API.
11. **Footer** — brand block, email/phone/location, social icons, auto-updating copyright year.

**Animations & interactions**

- Scroll reveals: fade + slide-up via `IntersectionObserver`, with a staggered cascade inside grids.
- Hover: buttons transition colour/lift; project cards elevate with a soft shadow and gold border.
- Hero: continuous gentle float on the portrait, floating + rotating waving-hand badge, expanding pulse ring, slow rotating light rays.
- Counters: count up from zero with `easeOutCubic` when scrolled into view.
- Pulsing green availability dot; sticky header darkens on scroll.
- Full `prefers-reduced-motion: reduce` support — all motion is disabled and content shows instantly.

**Engineering**

- Every string lives in **`js/content.js`** — no personal data hardcoded in markup.
- Responsive at 1280 / 980 / 720 / 480 px breakpoints; verified with no horizontal overflow at 390 px.
- Accessible: skip link, semantic landmarks, real `<button>` accordions with `aria-expanded` /
  `aria-controls`, `aria-live` form status, `aria-label`s on icon-only links, visible focus rings.
- No framework, no build step, no dependencies beyond Google Fonts + Font Awesome via CDN.

---

## 3. Files

```
index.html          markup + section skeleton (content injected by JS)
css/style.css       full design system, layout, responsive rules, animations
js/content.js       ★ ALL editable content lives here
js/main.js          rendering + all interactions (reveal, counters, accordions, drawer, form)
images/profile.jpg  the uploaded portrait photo
images/favicon.svg  generated inline favicon
README.md           this file
```

---

## 4. How to fill in your details

Open **`js/content.js`** and replace every `[bracketed]` placeholder. That is the only file
you need to touch for content. Specifically:

| Array | Controls |
| --- | --- |
| `services` | The four "What I Can Do For You" accordion rows + their tags |
| `stats` | The three About-Me counters |
| `socials` | Social icon links (About section + footer) |
| `campaigns` | Featured campaign / project cards |
| `testimonials` | Client quotes **and** the mixed-in stat cards |
| `faqs` | FAQ accordion questions & answers |
| `insights` | Blog / case-study cards |
| `serviceOptions` | Options in the contact form's "Service Needed" dropdown |

**Text placeholders that live in `index.html`** (name, phone, email, location, page title):

- `<title>` and `<meta name="description">`
- `.brand-name` / `.brand-role` in the header
- `.hero-name` (`[Your First Name]` / `[Your Last Name]`) and `.hero-sub` (`[Location]`)
- The three `.contact-item` values in **both** the About and Contact sections
  (`tel:` and `mailto:` links + visible text)
- `.nav-mail` / `.nav-loc` in the nav drawer
- The footer `.footer-name`, `.footer-meta`, `.footer-role`
- All `placeholder="..."` attributes on the form fields

**Stats — two ways to fill them in:**

```js
// Option A: a number → the figure animates counting up from 0
{ value: 5,  suffix: "+", label: "Years of Experience" }

// Option B: leave it unfilled → shows the bracket token, no misleading "0"
{ value: null, placeholder: "[X]", suffix: "", label: "[X] Years of Experience" }
```

The same applies to the `stat` entries inside `testimonials`.

**Images:** set a `campaigns[].image`, `insights[].image` or `testimonials[].avatar` to a path
like `"images/work-1.jpg"`. Leaving them as `""` renders a clean gradient placeholder tile
rather than a broken image.

**The portrait** is `images/profile.jpg` and appears in four places: header avatar, hero arch,
contact block and footer. It is cropped with `object-position: 50% 18–22%` via CSS — adjust
those values in `css/style.css` if you swap in a different photo with different framing.

---

## 5. Functional entry URIs & parameters

**Pages**

| Path | Description |
| --- | --- |
| `index.html` | The entire site (single page). Sections are anchor targets: `#hero`, `#services`, `#about`, `#campaigns`, `#testimonials`, `#faq`, `#insights`, `#contact`. |

**Data endpoints used (RESTful Table API, relative URLs)**

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `tables/contact_submissions` | Saves a contact-form enquiry |

List/read/update/delete are available on the same resource but are **not** used by the public
site (there is no admin UI).

**Response handling:** on success the form resets and shows a green confirmation. On failure it
**does not lose the enquiry** — the payload is appended to `localStorage.pending_enquiries`
(key `pending_enquiries`) and the visitor is prompted to email directly. Nothing on the page
ever silently discards a lead.

---

## 6. Data models & storage

**Table: `contact_submissions`** (schema in `.tables/schema.json`)

| Field | Type | Notes |
| --- | --- | --- |
| `id` | text | Primary key (required by the platform) |
| `name` | text | From the Name field |
| `email` | text | From the Email field |
| `service` | text | Chosen from the Service Needed dropdown |
| `message` | rich_text | The project brief |
| `submitted_at` | datetime | ISO timestamp set by the browser |

**Storage services**

- **Preview data store** — what the in-editor preview and the published `*.gensparkspace.com`
  page read and write.
- **Live hosted database (Cloudflare D1)** — created empty from the schema at Hosted-Deploy
  time; real visitors write here. The two stores are independent and are never auto-synced.

If you have rows in the editor that you want on the deployed site, use
**HostedDbSyncFromPreview** (one approved copy; live-only rows are always kept).

---

## 7. Public URLs

| Environment | URL |
| --- | --- |
| Production | *Add after deploying (Hosted Deploy → `*.vip.gensparksite.com`, or your custom domain).* |
| Quick-share preview | *Provided by the Publish tab.* |
| API base | Relative — resolves against whatever domain serves the page. |

> To publish, use the **Publish tab** for one-click deployment, or ask for a Hosted Deploy.

---

## 8. Not yet implemented (by design)

- **No backend / no server-side logic** — a static site cannot process files, send server-side
  email, or run scheduled jobs.
- **No client-visible admin dashboard** for browsing submissions. A client-side password gate
  would be **insecure** — anyone can read it in the page source — so it was deliberately not
  built. Read submissions from the table store instead.
- **Insights cards link to `#`** until you supply real article URLs.
- **Social links point to `#`** until you add real profile URLs.
- **No CMS.** Content changes = edit `js/content.js` and re-deploy.
- **No analytics or cookie banner** installed.
- **No blog detail pages** — the insight cards are teasers only.
- **No dark/light theme switch** — the site is single-theme (dark green) by design.

---

## 9. Recommended next steps

1. **Fill in `js/content.js`** and the `index.html` text placeholders (see §4).
2. Replace the three social URLs and add real article URLs for the insight cards.
3. Add real campaign/insight imagery (`images/…`) for a stronger visual result.
4. Swap in your own favicon/logo if you have one.
5. Deploy, then **test the live contact form on the real URL** and confirm the row appears.
6. Optional: point a custom domain at the Hosted worker, and choose **one** public URL so all
   visitor data lands in a single store.
7. Optional: add an analytics snippet in `index.html` if you want traffic reporting.

---

## 10. Notes / caveats

- Personal data is intentionally **not** hardcoded — every detail is a `[placeholder]`.
- A static site cannot host a secure login. Any "admin only" area would be readable in
  the page source; that is a platform limit, not an oversight.
- The contact form depends on the platform's Table API being reachable from the serving
  domain. The `localStorage` fallback covers the case where it is not.
