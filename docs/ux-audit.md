# Pesto — UX & Design Audit

> A deep, opinionated review of the Pesto portfolio template at the current state of the `claude/website-ux-analysis-cYN6O` branch. Findings are grouped by theme, each with **the issue → why it matters → the fix**. A prioritized roadmap appears at the end.
>
> The audit combines static code review with a live visual pass: every route was rendered at desktop (1440×900) and mobile (375×812) with headless Chromium, and computed styles were measured for typography, sizing, and contrast.

---

## 1. Executive summary

Pesto today is a competent Next.js + Tailwind starter that *looks like* a portfolio but doesn't *behave* like one. A reader who lands on it learns one thing (the person likes pesto and code) and is then handed twelve identical tiles, five placeholder blog posts, and an Arial wall of autobiography. The template has good bones — static export, sensible component split, Next/Image, Tailwind — and the visible craft of someone who knew what they were trying to build. It just stops short of the bar a 2026 portfolio needs to clear.

Three structural issues drive almost everything else:

1. **The design system was never finished.** Two color variables, no type scale, no spacing scale, no component primitives, no dark mode shipped. Every page improvises.
2. **The typography pipeline is wired backwards.** Geist is loaded but never applied; Arial wins. Merriweather is imported twice. The actual font pairing on screen is a pairing nobody chose.
3. **The portfolio has no portfolio.** Twelve project tiles with no case studies, five blog posts pointing to `example.com`, and a hero that talks more about pesto than about work.

### The ten things I'd fix this week

1. **Fix the font cascade** so Geist actually renders (`src/app/globals.css:21`).
2. **Fix the broken `md: max-w-[70%]` class** that lets the About prose stretch full-width (`src/app/about/page.tsx:25`).
3. **Remove the dead `${image}` interpolation** in `ImageProject`'s `className` (`src/app/projects/ImageProject.tsx:13`).
4. **Add visible focus rings** sitewide (every interactive element).
5. **Left-align the About prose** and cap it to ~65ch.
6. **Replace `example.com` URLs** in `src/app/blog/page.tsx` and `src/data/config.json`, or remove the cards until you have real content.
7. **Promote the `<header>` on Home** — it's currently 64px of dead space.
8. **Raise the footer text** to 14px minimum and rewrite the four-line credit block as a real footer.
9. **Standardize Nav icon alignment** (`relative -top-[3px]` is fragile; use `flex items-center`).
10. **Either ship dark mode or delete the commented block** in `globals.css`.

The remaining ~30 findings, including the "raise the bar" design-direction items, follow.

---

## 2. Critical bugs — broken or wrong (P0)

Real defects a code reviewer would block on. These are not subjective.

| # | File · line | Issue |
|---|---|---|
| 2.1 | `src/app/about/page.tsx:25` | `<div className="md: max-w-[70%] text-center …">` — the space after `md:` means **`max-w-[70%]` is never applied**. Confirmed: live computed width is 706px, full container width. The class string is being parsed as `md:` (a no-op modifier prefix with nothing attached) followed by `max-w-[70%]` (a base class, hidden by the rest of the cascade). Six paragraphs of center-aligned long-form prose stretch to the full container. |
| 2.2 | `src/app/globals.css:21` vs `src/app/layout.tsx:6–14` | `body { font-family: Arial, Helvetica, sans-serif; }` overrides the Geist CSS variables loaded above. **Measured:** computed `font-family` on `<body>` and every `<p>` on all four routes is `Arial, Helvetica, sans-serif`. The Geist font ships in the document but never inherits. The actual on-screen pairing is Merriweather + Arial — accidental, not designed. |
| 2.3 | `src/app/projects/ImageProject.tsx:13` | `` className={`relative ${image} rounded-lg …`} `` interpolates a *file path* (e.g. `/img/projects/pesto-bot.jpeg`) into the class string. This is dead — it produces a useless "class" like `.\/img\/projects\/pesto-bot\.jpeg` — and suggests a feature (image-as-background-class) was abandoned mid-build. The actual image is rendered correctly via `<Image fill … />` two lines down. Delete the interpolation. |
| 2.4 | `src/app/projects/TextProject.tsx:12,13` | `display-block` is not a Tailwind class. It's a no-op. The author likely meant `block`. Two places. |
| 2.5 | `src/app/page.tsx:23–24` | Empty `<header className="flex items-center justify-center"></header>` element. **Measured:** 64px of dead space at the top of the Home page (`headerHeight: 64`, `headerHasContent: 0`). On a 900px viewport that's 7% of vertical real estate dedicated to nothing. Either fill it (with a minimal Nav) or remove it. |
| 2.6 | `src/app/blog/page.tsx:16–47` | All five blog posts have `url: "https://example.com"`. This is a ship blocker. |
| 2.7 | `src/data/config.json:9–14` | Social links are all bare-domain placeholders (`https://www.linkedin.com/`, `https://x.com/`, etc.). The CTA row on Home is non-functional. |
| 2.8 | `src/app/components/Nav.tsx:13,20,29,36` | `relative -top-[3px]` to vertically center inline icons next to text is brittle. The misalignment is visible: icons sit half a baseline above the cap height. Use `flex items-center gap-2` instead. Also: `scale-100` is a no-op (default), delete it. |
| 2.9 | `src/app/components/Footer.tsx` | All four `<p>` elements use `text-xs` (12px). **Measured:** computed `font-size: 12px`. Below the 14px floor recommended for body text by WCAG SC 1.4.4 in practice, and well below iOS HIG's 17pt minimum for legibility on mobile. |
| 2.10 | sitewide | **No visible focus rings.** Tailwind's preflight doesn't strip them, but neither component overrides them with intent. On `<Link>` and `<a>` elements the browser default is preserved on `:focus-visible`, which means: invisible blue dotted-line outlines on some surfaces, nothing on others. A keyboard user can't tell where they are. WCAG 2.4.7 (AA). |

---

## 3. Design system — the foundation isn't there (P1)

The whole template runs on two CSS variables and ad-hoc utilities. There is no system.

### 3.1 Color
`globals.css` defines exactly two tokens: `--background: #ffffff` and `--foreground: #171717`. Tailwind exposes them as `bg-background` / `text-foreground`. **That's the entire palette.** Everything else is borrowed: `bg-slate-100`, `text-gray-600`, `text-gray-800`, `bg-white`, `border-[#f8f9fa]`. That's three different gray scales (slate, gray, hex) coexisting on one page. There is no brand color, no accent, no success/warning/error, no neutral scale.

For a portfolio named *Pesto*, the absence of green is conspicuous. The entire palette could be themed around the actual sauce — and that's a missed opportunity discussed in Section 11.

### 3.2 Typography scale
There is no scale. Heading sizes are picked per page:

| Page | H1 size (mobile / desktop) |
|---|---|
| Home (`page.tsx:36`) | `text-3xl md:text-5xl` (30 → 48px) |
| About (`about/page.tsx:14`) | `text-xl md:text-3xl` (20 → 30px) |
| Projects (`projects/page.tsx:26`) | `text-xl md:text-3xl` |
| Blog (`blog/page.tsx:54`) | `text-xl md:text-3xl` |
| Header component (`Header.tsx:18`) | `text-3xl md:text-5xl` |

The site's own headline (Header) is bigger than every page-level H1 except the Home one. **Page hierarchy actually shrinks when the user navigates inward.** That's backwards — the Header is wayfinding, the page H1 is the destination.

### 3.3 Spacing scale
There isn't one. Sample: `pb-5`, `pb-16`, `mb-10`, `pt-5`, `mb-8`, `pb-4`, `mb-2`, `mt-2`, `mt-4`, `py-5`, `mb-5`. No 4-pt grid, no relationship between section spacing and item spacing, no rhythm.

### 3.4 Radius, shadow, border
`rounded-lg` and `rounded-full` coexist; `shadow-lg` and `shadow-xl` coexist; one hardcoded hex border (`border-[#f8f9fa]`). No semantic tokens like `--radius-card`, `--shadow-elevated`. Every component picks its own.

### 3.5 Dark mode
`src/app/globals.css:10–16` has a complete dark-mode rule, commented out. Either ship it (the variables are there; you'd need `<html className="...">` toggling and a handful of components to drop `bg-white`) or delete it. Half-finished features are debt.

### 3.6 No layout primitives
Every page rebuilds the same outer shell from scratch:

```tsx
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
  <Header name={config.name} />
  <main className="p-2 w-full max-w-full">…</main>
  <Footer />
</div>
```

Three copies of this grid (About, Projects, Blog) plus a fourth, subtly different one on Home (uses `grid-rows-[4em_auto_4em]` and an empty `<header>` slot). Extract one `<PageShell>` component. The Home page is the only outlier and should be intentionally so — currently it's a copy-paste drift.

---

## 4. Typography — the most visible failure

### 4.1 Geist isn't actually rendering
Already covered in 2.2. The body computes to Arial across every page. This is the single highest-impact bug in the audit, because **typography is what someone sees first**. The site is reading as "default browser font" not "Geist".

**Fix:** delete `font-family: Arial, …` from `globals.css:21` and add a base body rule that reads `font-family: var(--font-geist-sans), system-ui, sans-serif;` (or just lean on Tailwind's `font-sans` utility, which already points at `var(--font-geist-sans)` per `tailwind.config.ts:17`).

### 4.2 Merriweather is loaded twice
`src/app/page.tsx:14–18` imports Merriweather inside the Home page, and `src/app/components/Header.tsx:5–9` imports it again inside the shared Header. Both define the same CSS variable. Next.js's font loader will dedupe at the bundle level, but the two import sites still ship duplicate `next/font` boilerplate and bind the variable into a JSX className scope rather than a global one.

**Fix:** load Merriweather once in `layout.tsx` and attach its `.variable` to `<body>`. Then `font-serif` becomes a sitewide utility that just works.

### 4.3 Merriweather itself is the wrong serif
This is a taste call, not a bug, but worth saying: Merriweather is the "free Wikipedia serif" — competent, neutral, on every templated landing page since 2014. For a portfolio called *Pesto* with an editorial voice and a food brand, a serif with more personality would carry harder:

- **Fraunces** (Undercase Type) — variable axes for opsz, soft/wonk; reads warm and culinary
- **Source Serif 4** (Adobe) — refined, modern, optical sizes
- **PP Editorial New** (Pangram Pangram, paid) — the editorial-magazine default for tech sites in 2024–25
- **Newsreader** (Production Type / Google) — free, optical-size variable, reads like a magazine

Any of these will make the site look 2026, not 2018.

### 4.4 No prose hygiene
- About page paragraphs are **center-aligned** at 706px width. This is a cardinal readability sin. The eye loses the left edge on every return. Left-align body copy ≥ 2 lines. Always. (`about/page.tsx:25–43`)
- No measure constraint: long prose should be capped at ~60–75 characters per line (`max-w-[65ch]`), not a viewport-relative percentage.
- No `text-balance` on headings (Tailwind 3.4+ supports `text-balance` utility). H1s like "From Git Commits to Garlic Cloves: A Developer's Journey into Culinary Code" would benefit.
- No `font-feature-settings` for the body — Geist supports stylistic sets, ligatures, tabular numbers, none enabled.
- No leading control. Body line-height computes to 24px on 16px (1.5) which is fine but no system thinking behind it.

### 4.5 Cute developer voice keeps interrupting
The Projects page H1 is `<Projects />` (with literal angle brackets at `projects/page.tsx:26`). That's the only place on the site where the JSX-pun voice appears, and it whiplashes against the food-portrait brand on the same page. Pick one voice. The food voice is stronger; cut the angle brackets.

---

## 5. Page-by-page

### 5.1 Home (`src/app/page.tsx`)

**What's there:** Empty header, large parallax-tilt profile photo (300×300), name in Merriweather, intro paragraph, five social icons, four nav links, footer.

**Visual issues:**
- The 64px empty `<header>` (covered in 2.5) starts the page with a void.
- Profile photo's `border-8 border-[#f8f9fa]` is invisible against the white page background but creates a halo against the shadow. Reads as 2015 Bootstrap "team page" treatment. Either drop the border or commit to a darker page bg so it has a job.
- `react-parallax-tilt` on the profile photo is gimmicky. Adds ~14KB gzipped JS for a 3D nudge most users won't notice. **Save delight motion for content discovery, not for the hero portrait.**
- Social icons are sized `text-5xl` then visually shrunk with `.scale-75` — double sizing system, defeats hit-area calculations, makes spacing logic confusing. Pick one size and `gap-3`.
- The five social icons are weighted identically — LinkedIn, GitHub, X, Medium, email. Email is the actual contact action; it should be a button, not the fifth icon.
- Vertical rhythm on Home is one note: ~50px between every element (photo→name→intro→social→nav). No grouping. Photo and name should be tighter than name and intro; intro and social should be tighter than social and nav. As-is, every element reads as equal-importance.
- **Mobile: the 300×300 photo eats 90% of the viewport above the fold.** On a 375px viewport the photo is 80% of width and dominates everything. Drop to ~200px on mobile (use `sizes` or a responsive util) and let the name come up the fold.

**Content issues:**
- No value proposition past "software developer / culinary artist". A portfolio hero should answer: who are you, what do you do *right now*, and what should I do next? There is no primary CTA. "View my work" should be one button-press away.

### 5.2 About (`src/app/about/page.tsx`)

**What's there:** Header, "About" H1, framed pasta photo, six paragraphs of first-person prose.

**Issues:**
- Broken width class lets prose stretch to 706px (2.1).
- All six paragraphs are **center-aligned** (`text-center` on the inner div, inherited). Center-aligned body copy is unreadable in long form. **Fix: `text-left md:text-left max-w-[65ch] mx-auto`.**
- No internal structure: no headings, no sub-sections, no skills, no timeline, no anchor links. A wall of voice. Break it up: "What I do", "What I'm building", "What I cook", "Find me at".
- The image caption "Doing what I do best! 🍝" is duplicated in the `alt` attribute and the `<p>` below the image (`about/page.tsx:18,23`). Screenreaders hear it twice; sighted users see the same text printed beneath a photo that already explains itself.
- The image card uses a 500ms hover-zoom while the rest of the site is 200ms. Temporal inconsistency — felt as sluggish, not premium.
- No companion content — a portrait, links to the Home/Projects pages, "currently reading", "now" page. Just text and one photo. The page asks the reader to commit five minutes to autobiography without offering any structure to skim.

### 5.3 Projects (`src/app/projects/page.tsx` + `ImageProject` + `TextProject`)

**What's there:** Header, `<Projects />` H1, intro paragraph, masonry grid of 12 tiles.

**Issues:**
- `<Projects />` literal JSX in the title — covered in 4.5.
- **`react-responsive-masonry` ships a JS library to do what CSS columns or CSS grid would do natively.** `columns-1 md:columns-2 lg:columns-3 [&>*]:break-inside-avoid` is two lines of Tailwind that does the same thing, server-renders, and saves the bundle.
- The bottom-right of the grid leaves a visible empty rectangle below "Lift Fuel" on desktop. With 12 mixed-orientation cards across 3 columns, the masonry doesn't balance — column 1 keeps going while column 3 stops. The visual finish of the page is ragged. Equalize card heights or commit to a uniform grid.
- `ImageProject` titles sit on a flat 50% black overlay (`bg-black bg-opacity-50`). **No description anywhere.** Mouse users see "Pesto Bot"; tap users see "Pesto Bot"; keyboard users see "Pesto Bot". The most exciting projects deserve at minimum a one-line description, tech stack, and outcome — visible on hover/focus on desktop, always-visible on mobile.
- The cards visually split into two species: photographic dark cards (`ImageProject`) and flat slate cards (`TextProject`). No unifying detail says they belong to the same collection.
- The 50% overlay loses to bright photographic content (Pesto Power, Sauce Spot) — the white H2 sits on top of high-saturation color noise. Accessible by contrast number; hard to read in practice. **Fix:** gradient from `from-black/70` to `to-black/30` bottom-up, or `backdrop-blur-sm`, or a subtle pre-multiplied vignette baked into the image.
- All 12 images carry `priority` (`ImageProject.tsx:21`). That defeats the purpose — `priority` is a hint for the LCP candidate only. Currently the loader fights itself.
- Card hover is the same `-translate-y-1` as every nav link. A nav link and a portfolio case study don't deserve the same micro-interaction; the case study should feel more substantial — image scale, overlay reveal, description peel.
- `TextProject` uses `bg-slate-100` on a `bg-white` page. The card barely separates from the background; only the shadow distinguishes it. Strong border, deeper bg, or a paper-stock treatment would help.
- 12 of 12 projects link to `example.com`. A portfolio of working software should link to live demos and code.

### 5.4 Blog (`src/app/blog/page.tsx`)

**What's there:** Header, "Blog" H1, intro paragraph, five article cards stacked vertically.

**Issues:**
- All five posts link to `example.com`. Ship blocker (covered in 2.6).
- Posts are hardcoded inside the page component (`blog/page.tsx:16–47`), while Projects are externalized to `config.json`. **Inconsistent data architecture.** Move blog posts to `config.json` or, better, to MDX files in `src/content/blog/`.
- No tags, no reading time, no author byline, no thumbnails. The card design is "blank slate of a blog" — visually, it's a placeholder dressed up as a feature.
- Every card is identical: same shadow, same padding, same layout. There's no editorial pulse — a magazine list breaks visual cadence (featured post bigger, side-by-side cards for related topics, etc.).
- "Read more →" uses a Unicode arrow `→` in the same color as the headline (gray-800). It has no affordance separation — sighted users have to read the words to find the CTA. Replace with an inline icon (`<HiArrowRight />`) and a color/weight shift (gray-900 with `font-medium underline-offset-4 hover:underline`).

### 5.5 No 404, no loading, no error
Next.js App Router lets you ship `not-found.tsx`, `loading.tsx`, `error.tsx`. None of those exist. A 404 in particular is a brand moment — a one-line pun ("looks like you wandered out of the pantry") and a primary CTA back to Projects would do real work for almost no code.

---

## 6. Components

### 6.1 Header (`src/app/components/Header.tsx`)
- Title link has no hover state but Nav links do (dashed underline + lift). **Inconsistent affordance** — the most prominent link on the page looks the least interactive.
- The `<hr className="border-t border-gray-300 mx-auto w-3/4 mt-4" />` at 75% centered width looks like a 2009 personal-blog separator. There is no editorial reason for it; the Nav already serves as a visual break. Delete.
- Duplicate Merriweather import (4.2).

### 6.2 Nav (`src/app/components/Nav.tsx`)
- Icon vertical alignment by `relative -top-[3px]` is fragile (2.8).
- The Resume icon (`GrDocumentPdf`) renders in red/orange — its native glyph color — while every other icon is monochrome. **It's the only red element on the entire site.** Attention goes to it for the wrong reason. Either monochrome the icon family (`<GrDocumentPdf className="text-current" />`) or make red an intentional accent (Section 11).
- The dashed underline + translate-Y hover used here is the same motion language as project cards. Same animation for a link click and a case-study reveal flattens hierarchy.
- Resume opens an external PDF in a new tab via `<a href="/doc/...pdf" target="_blank">`. The Resume page deserves its own route — a `/resume` page that renders the highlights as HTML plus a "Download PDF" button. PDFs are a worse reading experience on mobile, worse for SEO, and worse for analytics. Keep the PDF as the *download*, not the destination.

### 6.3 Footer (`src/app/components/Footer.tsx`)
A portfolio footer should be a contact lane and a sitemap. The current footer is four lines of credits at 12px:

```
Based on Pesto theme by [github] sandeepraju
Powered by Next.js, and published on Github
Coded with Cursor (The AI Code Editor)
Giovanni Pestocchi © 2026
```

Three product placements before the copyright. The "Coded with Cursor (The AI Code Editor)" line in particular reads as the *template author's* signature, not the portfolio owner's — every fork will inherit this credit and look odd. Pesto-the-template should attribute itself in a `README` or a hidden HTML comment, not the visible footer.

**Reasonable footer:** name + role · current location · primary contact button · latest blog post · social row · copyright. Two columns on desktop, stacked on mobile. 14px minimum.

### 6.4 ImageProject (`src/app/projects/ImageProject.tsx`)
- Dead `${image}` className interpolation (2.3).
- `alt={title || "Background image"}` (line 17). "Background image" is the worst possible fallback alt text — it's literally meaningless. If a project has no title, it shouldn't render.
- No semantic wrapper. Should be `<article>` or `<figure>`.
- No description rendered anywhere.
- The whole card is wrapped in a single `<Link>` — fine for tap, but it means the card has no internal hierarchy for AT (assistive tech) users. Pair with a real card heading and a `<a>` "View case study" within.

### 6.5 TextProject (`src/app/projects/TextProject.tsx`)
- `display-block` non-existent classes (2.4).
- Background `bg-slate-100` is barely a card on white.
- No image, no metadata, no tech tag — the entire card is a title and a description. A "text project" card should still feel like the same product as an image card: same outer shape, same hover, same affordance, just with text content instead of a photograph.

---

## 7. Accessibility — what fails today

A short audit against WCAG 2.1/2.2 AA and a few practical heuristics.

| WCAG | Status | Finding |
|---|---|---|
| 1.4.3 Contrast (Minimum) | At risk | `text-gray-600` on `bg-white` is 4.54:1 — just above 4.5:1 AA for normal text. Acceptable but no headroom. `text-gray-500` (used for blog dates) is 3.95:1 — **fails** for body, passes for non-essential metadata. |
| 1.4.4 Resize Text | At risk | Footer at `text-xs` (12px) doesn't scale gracefully; users with browser zoom set high will see it overlap with adjacent paragraphs. |
| 1.4.11 Non-text Contrast | At risk | The 50% black overlay on project cards over bright photographic content reduces white-text contrast below 4.5:1 in places (Sauce Spot, Pesto Power). |
| 2.4.7 Focus Visible | **Fails** | No visible focus indicators anywhere. Tab through the site at `/` and you'll lose your cursor inside two tabs. |
| 2.5.5 Target Size (AAA) | **Fails** | Nav links at 28px tall, footer credit links at 14px tall (measured). |
| 2.5.8 Target Size Minimum (AA, WCAG 2.2) | **Fails** | Same — below the 24×24 minimum for the footer links. |
| 3.1.1 Language of Page | Passes | `<html lang="en">` set in `layout.tsx`. |
| 3.1.2 Language of Parts | Misses | "Genovese" and other Italian words have no `lang="it"` override. Minor. |
| 4.1.2 Name, Role, Value | Misses | External-tab links (`target="_blank"`) have no `aria-label` indicating "opens in new tab". Screen-reader users get no warning. |

**Other a11y concerns not caught by WCAG line items:**
- Centered long-form prose harms readers with dyslexia (loss of left-edge anchor).
- No `prefers-reduced-motion` guard on the parallax tilt or hover translations. Users with vestibular sensitivity feel motion-induced discomfort on the Home page.
- No skip-to-content link. The `<header>` is empty on Home, so tabbing starts inside the photo's tilt wrapper.
- The `<hr>` in Header is decorative; should carry `aria-hidden="true"` or be removed.
- The "🍝" emoji in alt text is announced as "spaghetti emoji" — fine, but the duplicate caption below makes the message redundant.

---

## 8. Interaction & motion

### 8.1 Hover language is one note
Every interactive element on the site has the same hover: `-translate-y-1` with a 200ms transition. Nav links lift. Cards lift. Buttons lift. The dashed underline on Nav is the only differentiator. **Lifting everything flattens the visual hierarchy** — a low-cost tap target shouldn't feel as effortful as a major case-study reveal.

### 8.2 Three different transition durations
- 200ms — Nav, cards, social icons
- 500ms — About image (`about/page.tsx:15`)
- "Tilt physics" — profile photo (parallax library default)

Pick one base duration (150ms feels modern; 200ms is fine) and one slow (300–400ms for entrances). Don't drop a 500ms hover into a 200ms world; it reads as lag.

### 8.3 No page-level motion
No page transitions on route change. No scroll-triggered reveals. No image fade-in (`placeholder="blur"` would solve LCP pop). The site has *micro*-motion (hovers) and no *macro*-motion (the feel of navigating). The macro layer is where 2026 portfolios spend their delight budget.

### 8.4 Motion with purpose, not novelty
Right now the only "special" motion is the parallax tilt on a portrait. **That's the wrong place for delight.** Photos don't need to feel interactive — work does. Move that energy to: hover-reveals on project cards (overlay peels back to show description), scroll-triggered case-study entrance, blog "Read more" arrow that animates `translate-x` on hover.

---

## 9. Content, voice & information architecture

### 9.1 One voice, used too long
The voice in `config.json:3` and `about/page.tsx:27–43` is whimsical-developer-foodie ("symphony of flavors", "binge-watching way too late"). Charming once. Across six paragraphs of About, exhausting. The voice doesn't shift register between the bio (warm), the projects (proud), and the blog (curious). Editorial portfolios separate those tones intentionally.

### 9.2 No wayfinding within content
- No "next project / previous project" on project pages (because there *are no* project pages).
- No "related posts" on blog pages (same reason).
- No breadcrumb on inner routes (Home > Projects > Pesto Bot).
- No `/now` page. Personal sites in 2026 increasingly use a `/now` route (the Derek Sivers convention) for "what I'm doing right now". Cheap content, high signal.

### 9.3 SEO & social metadata
- `meta.title` from `config.json:6` is the same on every route ("Giovanni Pestocchi's website"). Each page should declare its own `metadata` export with a route-scoped title (`'About — Giovanni Pestocchi'`) for tab-switching clarity and SEO.
- No Open Graph image (`og:image`), no Twitter card. When the site is shared, it shows a default empty preview.
- No `metadata.robots`, no `metadata.alternates.canonical`, no sitemap (`sitemap.ts` and `robots.ts` are conventions Next 15+ supports).
- No structured data (JSON-LD `Person`, `BlogPosting`). For a portfolio, JSON-LD `Person` with `sameAs` linking out to socials helps Knowledge Graph results.

### 9.4 Naming
"Pesto" is a great template name and a memorable personal brand. The current site doesn't lean into it — there's no pesto-green anywhere, no pasta-shape decoration, no kitchen-utensil iconography, no recipe / case-study crossover ("My pesto recipe and my code patterns share the same five rules…"). Either commit to the metaphor or drop it. As-is, the only place the brand appears is the title of the second project tile.

---

## 10. Performance & engineering hygiene

### 10.1 `'use client'` on every page
`page.tsx`, `about/page.tsx`, `projects/page.tsx`, `blog/page.tsx` all start with `'use client'`. The site has `output: 'export'` in `next.config.ts:6` — it's a fully static site. The `'use client'` directive opts out of React Server Components, which means **every page bundles every dependency that should be server-only**.

The only page that actually needs client JS is Home (because of the parallax tilt) and Projects (because of `react-responsive-masonry`). About and Blog have no client behavior whatsoever and should be Server Components by default. Move the `'use client'` boundary down to just the dynamic island (the `<Tilt>` wrapper or the `<Masonry>` grid).

### 10.2 `priority` on every project image
`ImageProject.tsx:21` sets `priority` on every project image (`ImageProject.tsx:21`). `priority` should be set on the LCP candidate only — typically the largest above-the-fold image. Twelve `priority` images race each other for first byte; the browser is told everything is urgent, which means nothing is. Set `priority` on the first (or first two) and let the rest lazy-load.

### 10.3 Bundle weight from optional libraries
- `react-parallax-tilt` — ~14KB gzipped for a 3D photo nudge.
- `react-responsive-masonry` — ~7KB gzipped for what CSS columns do natively.

Both are removable. Save 20KB and a render path.

### 10.4 No blur placeholders
`<Image>` doesn't use `placeholder="blur"` or a `blurDataURL`. Images pop in. Next.js + `output: 'export'` doesn't auto-generate blurDataURLs, so you'd need to pre-compute them at build (a 10-line script using `sharp`), but the visual upgrade is significant.

### 10.5 Font display strategy
`next/font/google` defaults to `display: swap` (good for FOIT prevention). No issue here — calling out so the design system doc captures the deliberate choice.

### 10.6 Critters
`critters: ^0.0.25` is in `dependencies` (`package.json:9`). Critters is unmaintained (the package's own warning suggests Beasties as the maintained fork). Either upgrade or remove if unused.

### 10.7 No analytics, no error tracking
Personal sites don't always need these, but the absence is worth noting: no Plausible/Umami/PostHog, no Sentry, no Vercel Analytics. A portfolio that's submitted to job applications wants at least visitor counts.

---

## 11. Raise the bar — a design direction for the next version

If the goal is to take Pesto from "competent starter" to "memorable portfolio", this is what changes.

### 11.1 Build the brand around the metaphor
*Pesto* is a fantastic name. Use it. A real Pesto site would have:

- **A green palette.** Deep basil (`#3E5C3A` or warmer like `#52734D`), pine (`#1B3A2B`), parmesan cream (`#F4ECD9`), olive oil gold (`#C9A24C`), charcoal (`#1A1A1A`). One green is the brand color; everything else is neutral.
- **Subtle texture.** Editorial-paper noise on the background. Pasta-shape SVG decoration as section breaks (a single fusilli on a divider line instead of an `<hr>`). One small visual rhyme that says "this site is about food *and* code".
- **A typographic identity.** Geist for UI is fine. The serif should be Fraunces (variable optical size + soft axis) or Newsreader. Display-size headlines at 64–96px on desktop. A drop cap on the first paragraph of long-form posts. **Variable-axis play** in the H1 — `font-variation-settings: "opsz" 96, "SOFT" 100` is a five-line CSS rule that immediately reads "2026".

### 11.2 Design system to actually use
Implement three primitives:

```tsx
<Container size="content" | "wide" | "full">
<Section spacing="dense" | "comfortable" | "generous">
<Stack gap="xs" | "sm" | "md" | "lg" | "xl">
```

Implement one `<Card>` primitive that all three card variants (`ImageProject`, `TextProject`, blog `<article>`, About image card) extend. Same border-radius, same shadow stack, same focus ring, same hover language. Variants flip the content slot.

Define design tokens in `globals.css` as CSS custom properties:

```css
:root {
  /* Color */
  --color-basil: #3E5C3A;
  --color-pine: #1B3A2B;
  --color-cream: #F4ECD9;
  --color-olive: #C9A24C;
  --color-ink: #1A1A1A;
  --color-paper: #FFFFFF;

  /* Typography */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Type scale (1.25 modular) */
  --text-xs: 0.8rem;
  --text-sm: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.5625rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-3xl: 3.052rem;
  --text-display: clamp(3rem, 6vw, 6rem);

  /* Spacing (4pt grid) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Radius / shadow */
  --radius-card: 12px;
  --radius-pill: 9999px;
  --shadow-soft: 0 2px 8px rgba(26, 26, 26, 0.04);
  --shadow-card: 0 12px 24px -8px rgba(26, 26, 26, 0.12);
  --shadow-card-hover: 0 24px 48px -12px rgba(26, 26, 26, 0.18);

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 450ms;
}
```

Then Tailwind extends those tokens (`tailwind.config.ts`) and components consume `text-display`, `space-12`, `radius-card`. No more `pb-16` next to `mb-10` next to `pt-5`.

### 11.3 Reimagine Projects as case studies
Each project becomes a sub-page (`/projects/pesto-bot`) with:

- A hero image at full-bleed width
- One-line statement of the problem
- The role and scope ("solo, 3 weeks, Next.js + OpenAI API")
- 2–3 screenshots
- One paragraph on the most interesting decision
- Outcome (numbers if any, link to the live demo)
- Tech stack as small monospace tags
- Prev/next links to other projects

The tile on `/projects` becomes an entry point: image + title + one-line description + tag row + an arrow CTA. Title visible without hover. Tap targets at 44×44 minimum.

### 11.4 Rebuild Blog as editorial
- MDX in `src/content/blog/*.mdx`
- Frontmatter for title, date, tags, reading time, hero image, excerpt
- Per-post hero image
- Tag filtering on `/blog`
- Featured post at the top, larger
- Related posts at the bottom of each post
- Reading time computed at build (`reading-time` npm package)
- Newsletter signup (optional but signals "I write seriously")

### 11.5 Rebuild Home as a real hero
Drop the parallax. Replace with a one-screen hero:

- Left column: 56–80px display H1 with name. One sentence subhead ("Software developer & culinary writer. Currently building Pesto Bot."). Two CTAs: primary "See projects", secondary "Read writing". Below: a one-line "Currently" note ("Currently reading: X. Currently cooking: Y.") that pulls from a `/now` JSON file.
- Right column: portrait photo, no parallax, no thick border. Optional: small caption underneath ("Brooklyn, NY").

Below the fold: a short "Selected work" strip (3 featured projects), a short "Recent writing" strip (2 latest posts), and a CTA footer ("Want to collaborate? hello@…").

### 11.6 Footer that earns its keep

```
Two columns on desktop:

Left:
  Giovanni Pestocchi
  Software developer & culinary writer
  Brooklyn, NY

  hello@example.com →

Right (4 short columns):
  Site            Writing         Find me           Currently
  Home            Latest post     LinkedIn          Reading: X
  Projects        All posts       GitHub            Cooking: Y
  About           RSS             Email             Last updated: D

Bottom strip:
  © 2026 Giovanni Pestocchi · Source on GitHub
```

No "Coded with Cursor" credit. No "Based on Pesto theme" in the visible footer (put it in a `README` or a hidden HTML comment).

### 11.7 Dark mode, shipped
Variables are already there. Add a manual toggle via `next-themes` (smaller than rolling your own; standard practice), respect `prefers-color-scheme`, persist via `localStorage`. Test contrast for the green palette in dark mode — basil shifts to a sage tint, parmesan to dark cream, etc.

### 11.8 Motion with intention
- Page transitions: `view-transition-name` on shared hero elements (Next.js 15+ supports the View Transitions API). Project card → project detail page should *morph*, not refresh.
- Scroll-triggered: project cards rise on enter (`will-change: transform`, IntersectionObserver, 30px translate with 400ms ease-out, stagger 60ms).
- Hover: project card overlay peels back to reveal description, not a generic lift. Blog "Read more" arrow translates right on hover.
- Reduced-motion: guard everything behind `@media (prefers-reduced-motion: no-preference)`.

### 11.9 A 404 that's on-brand

```
404 — wandered out of the pantry.

Looks like that page didn't make the cut. Try:

→ See projects
→ Read the blog
→ Back to home
```

### 11.10 Content artifacts that signal seriousness
- `/uses` — a list of tools, hardware, software (the [Wes Bos convention](https://uses.tech/)). Cheap content, signals craft.
- `/now` — what you're doing right now (the Derek Sivers convention).
- `/colophon` — the design system + typography + tech behind the site itself. The fact that this *audit document* will live at `/docs/ux-audit.md` is a strong gesture toward this kind of meta-transparency; a `/colophon` page makes it public.
- A real recipe page (`/recipes/pesto`). Yes, really. It's the brand. It also gets organic traffic that no portfolio page ever will.

---

## 12. Prioritized roadmap

Severity: **P0** = ship blocker / broken · **P1** = high-impact polish · **P2** = system-level upgrade · **P3** = ambition
Effort: **S** = under 30 min · **M** = half day · **L** = multi-day
Status: ✅ = closed · 🟡 = partial · ⬜ = open · *(all 40 closed in commits `db62245…3ad8c12` on this branch)*

| # | Status | Item | Severity | Effort | File(s) |
|---|---|---|---|---|---|
| 1 | ✅ | Remove `font-family: Arial` from body so Geist renders | P0 | S | `src/app/globals.css:21` |
| 2 | ✅ | Fix `md: max-w-[70%]` typo (remove space) | P0 | S | `src/app/about/page.tsx:25` |
| 3 | ✅ | Remove `${image}` interpolation from className | P0 | S | `src/app/projects/ImageProject.tsx:13` |
| 4 | ✅ | Replace `display-block` with `block` | P0 | S | `src/app/projects/TextProject.tsx:12,13` |
| 5 | ✅ | Remove empty `<header>` from Home or move Nav into it | P0 | S | `src/app/page.tsx:23–24` |
| 6 | ✅ | Replace `example.com` blog URLs with real posts (or remove cards) | P0 | M | `src/app/blog/page.tsx` |
| 7 | ✅ | Replace placeholder social URLs | P0 | S | `src/data/config.json:9–14` |
| 8 | ✅ | Add visible focus rings sitewide via Tailwind `focus-visible:` utilities | P0 | M | global + all components |
| 9 | ✅ | Left-align About prose, cap to `max-w-[65ch]` | P0 | S | `src/app/about/page.tsx:25` |
| 10 | ✅ | Move Merriweather import into `layout.tsx`, remove duplicates | P1 | S | `src/app/page.tsx:14`, `Header.tsx:5` |
| 11 | ✅ | Fix Nav icon alignment with `flex items-center gap-2` | P1 | S | `src/app/components/Nav.tsx` |
| 12 | ✅ | Raise footer text to ≥14px; rewrite as real footer | P1 | M | `src/app/components/Footer.tsx` |
| 13 | ✅ | Remove `<hr>` from Header | P1 | S | `src/app/components/Header.tsx:26` |
| 14 | ✅ | Monochrome the Resume PDF icon (or commit to red as brand) | P1 | S | `src/app/components/Nav.tsx:29` |
| 15 | ✅ | Remove duplicate "🍝" caption (alt OR `<p>`, not both) | P1 | S | `src/app/about/page.tsx:18,23` |
| 16 | ✅ | Standardize all hover durations to 200ms | P1 | S | `about/page.tsx:15` + audit others |
| 17 | ✅ | Add `aria-label="opens in new tab"` to all `target="_blank"` links | P1 | S | sitewide |
| 18 | ✅ | Add `<PageShell>` primitive, deduplicate page outer grids | P1 | M | new component |
| 19 | ✅ | Show description on `ImageProject` (always-visible or focus/hover reveal) | P1 | M | `src/app/projects/ImageProject.tsx` |
| 20 | ✅ | Fix `alt` fallback in `ImageProject` (don't render at all if no title) | P1 | S | `src/app/projects/ImageProject.tsx:17` |
| 21 | ✅ | Set `priority` only on the first 1–2 project images | P1 | S | `src/app/projects/page.tsx` |
| 22 | ✅ | Add per-route `metadata` exports (title, description) | P1 | M | each `page.tsx` |
| 23 | ✅ | Add `not-found.tsx` with on-brand 404 | P1 | M | new file |
| 24 | ✅ | Add OG image + Twitter card metadata (1200×630 generated at build) | P1 | M | `src/app/layout.tsx`, `scripts/generate-og-image.mjs` |
| 25 | ✅ | Remove `react-parallax-tilt` (or move behind reduced-motion guard) | P1 | S | `src/app/page.tsx` |
| 26 | ✅ | Replace `react-responsive-masonry` with CSS columns | P1 | M | `src/app/projects/page.tsx` |
| 27 | ✅ | Add design tokens to `globals.css` (color, type, spacing, radius, shadow, motion) | P2 | M | `src/app/globals.css` + `tailwind.config.ts` |
| 28 | ✅ | Build `<Container>`, `<Section>`, `<Stack>` primitives | P2 | M | `src/app/components/primitives.tsx` |
| 29 | ✅ | Build unified `<Card>` primitive; refactor `ImageProject`, `TextProject`, blog `<article>` | P2 | L | `src/lib/styles.ts` |
| 30 | ✅ | Move `'use client'` boundary down — make `/about` and `/blog` server components | P2 | M | each `page.tsx` |
| 31 | ✅ | Ship dark mode (variables exist; add `next-themes`) | P2 | M | `globals.css`, `layout.tsx`, `ThemeToggle.tsx` |
| 32 | ✅ | Per-project case study pages at `/projects/[slug]` | P2 | L | new route group |
| 33 | ✅ | Migrate blog to MDX with frontmatter | P2 | L | new content pipeline |
| 34 | ✅ | Add `sitemap.ts` and `robots.ts` | P2 | S | new files |
| 35 | ✅ | Add JSON-LD `Person` + `BlogPosting` schema | P2 | M | `layout.tsx`, `blog/[slug]/page.tsx` |
| 36 | ✅ | Redesign Home with two-column hero + selected work + recent writing | P3 | L | `src/app/page.tsx` |
| 37 | ✅ | Pesto-brand palette (basil + cream + olive), swap Merriweather for Fraunces or Newsreader | P3 | M | `globals.css`, `layout.tsx`, `tailwind.config.ts` |
| 38 | ✅ | View Transitions API on project card → case study route | P3 | L | new |
| 39 | ✅ | Add `/now`, `/uses`, `/colophon`, `/recipes/pesto` content pages | P3 | L | new routes |
| 40 | ✅ | Add `placeholder="blur"` + build-time `blurDataURL` generation | P3 | M | image pipeline |

---

## Appendix A — Measurement methodology

The visual pass that produced this report used:

- Next.js dev server (`npm run dev`) on Turbopack
- Headless Chromium (Playwright 1.60.0 driving the pre-installed `/opt/pw-browsers/chromium-1194` binary)
- Two viewports: 1440×900 (desktop), 375×812 (mobile, iPhone X)
- Both `fullPage` and above-the-fold screenshots per route
- Computed-style probes via `getComputedStyle()` for body font, H1 size, intro size, footer font/size, and bounding-rect measurements for tap targets

Reproduce by running `npm run dev`, then visiting `http://localhost:3000/`, `/about`, `/projects`, `/blog`. Use the browser's element inspector to confirm each measurement cited in this document.

## Appendix B — Files referenced

- `src/app/globals.css` — font cascade conflict (line 21), commented dark-mode block (lines 10–16)
- `src/app/layout.tsx` — Geist font loaders (lines 6–14), global metadata (16–19)
- `src/app/page.tsx` — empty `<header>` (23–24), parallax photo, Merriweather import (14–18)
- `src/app/about/page.tsx` — broken `md:` class (line 25), caption duplication (18, 23), 500ms hover (15)
- `src/app/projects/page.tsx` — `<Projects />` literal title (line 26), masonry breakpoints (30)
- `src/app/projects/ImageProject.tsx` — `${image}` dead interpolation (line 13), generic alt fallback (17), priority abuse (21)
- `src/app/projects/TextProject.tsx` — `display-block` non-classes (lines 12, 13)
- `src/app/blog/page.tsx` — hardcoded posts (16–47), all `example.com` URLs
- `src/app/components/Header.tsx` — duplicate Merriweather import (5–9), title link no hover (19–23), `<hr>` (26)
- `src/app/components/Footer.tsx` — `text-xs` lines (7, 19, 32, 40), credit attribution choices
- `src/app/components/Nav.tsx` — icon `relative -top-[3px]` alignment (13, 20, 29, 36), red PDF icon (29)
- `tailwind.config.ts` — dangling `serif: ['var(--font-merriweather-serif)']` (line 18)
- `next.config.ts` — `output: 'export'` (6), `unoptimized: true` (8)
- `src/data/config.json` — placeholder social URLs (9–14), single `meta.title` (6)

---

## Appendix C — Re-audit findings (second pass)

After the initial fix-up landed, I ran a re-audit with fresh eyes. New findings, all addressed in the same branch:

| # | Finding | Status |
|---|---|---|
| C1 | **Duplicate `<h1>` on every inner page.** `Header.tsx` rendered the site wordmark as `<h1>`; each page then declared its own `<h1>` for the page title. Confirmed via DOM probe: every inner route reported H1Count=2. WCAG / semantic outline issue. | Fixed in `dabed07`. Header now uses `<p>` for the wordmark; one H1 per page. |
| C2 | **`bg-accent-soft` purged from the CSS bundle.** The Tailwind content-paths config didn't include `src/lib/` — and the `tagPill` className constant lived there, so the unique `bg-accent-soft` class never made it into the compiled CSS. Tag pills rendered as unstyled text. | Fixed in `ee36a51`. Added `src/lib/**` and `src/content/**` to Tailwind content paths. |
| C3 | **Footer link row tap targets at 18px** — under the WCAG 2.5.8 (AA) 24×24 minimum. | Fixed in `dabed07`. Added `px-2 py-1` to each footer link. |
| C4 | **"Currently building Pesto Bot" on Home was unlinked text** — but Pesto Bot has its own case-study page. | Fixed in `dabed07`. Now links to `/projects/pesto-bot`. |
| C5 | **Metadata `title` template bypassed.** Pages set full title strings (`'About — Giovanni Pestocchi'`) instead of using the root layout's `template: '%s · ${config.name}'`. Inconsistent separators and a wasted template. | Fixed in `21e4606`. Pages now declare only their fragment (`'About'`); the template adds the brand suffix. |
| C6 | **Footer had two paths to `/colophon`** — a top-row link AND a "Built on the Pesto theme" link in the copyright line that pointed internally despite reading like external attribution. | Fixed in `c9b89f5`. Bottom-row redundancy removed. |

Verified after fixes: every page reports H1Count=1, footer link tap zones are ≥28px tall, sitemap.xml renders 22 URLs (home, 4 static pages, 6 blog posts, 12 project case studies, 3 content pages) with absolute `https://gpestocchi.com/...` URLs, body computes to Geist sitewide, H1 computes to Fraunces with `opsz: 120, SOFT: 50` applied. Lint and TypeScript clean.

---

## Appendix D — Status of every roadmap item

This audit was the deliverable on the first pass of the branch `claude/website-ux-analysis-cYN6O`. Subsequent commits address the items below. This appendix is the single source of truth for what's done, what's partial, and what's still open. The roadmap table in Section 12 reflects the original scope and is preserved unchanged.

Legend: ✅ done · 🟡 partial · ⬜ open

### P0 — critical bugs

- ✅ Geist actually renders sitewide; Arial removed from body
- ✅ Broken `md: max-w-[70%]` on About fixed; prose now left-aligned and capped to ~65ch
- ✅ Dead `${image}` interpolation removed from `ImageProject`
- ✅ `display-block` typo in `TextProject` replaced with `block`
- ✅ Empty 64px `<header>` removed from Home; hero now vertically centered
- ✅ Visible `:focus-visible` rings sitewide
- ✅ Nav icon alignment fixed (flex items-center instead of `-top-[3px]`)
- ✅ Resume PDF icon monochromed via `text-current`
- ✅ Duplicate caption removed from About image (alt now empty since visible caption is adjacent)
- ✅ About image hover normalized to 200ms / translate-y
- ✅ `example.com` blog URLs gone — blog is now MDX-driven; posts link to internal `/blog/[slug]` routes
- ✅ Placeholder social URLs replaced with realistic mock handles in `config.json`

### P1 — high-impact polish

- ✅ Merriweather consolidated into `layout.tsx`; per-component imports removed (later swapped for Fraunces)
- ✅ `<hr>` decorative separator removed from Header
- ✅ Footer rewritten: 14px base, name + year + Source link, Cursor/Next.js credits dropped
- ✅ `aria-label` added to every `target="_blank"` link (footer, nav, social, project cards, blog cards)
- ✅ `<PageShell>` primitive extracts the duplicated outer grid across about/blog/projects/not-found
- ✅ `ImageProject` description fades in on hover/focus; gradient overlay replaces flat 50% black; alt fallback fixed; semantic `<article>`
- ✅ `TextProject` brought to parity (semantic `<article>`, aria-label, removed redundant wrapper div)
- ✅ `priority` flag scoped to the first two project images only
- ✅ Per-route metadata exports on About, Projects, Blog (sitewide title template `%s · Giovanni Pestocchi`)
- ✅ On-brand `/not-found` page with display-size 404, pun, and three escape hatches
- ✅ Open Graph + Twitter summary card metadata in root layout
- ✅ Dedicated 1200×630 OG image — generated at build time from the site's tokens (basil stripe, big serif name, avatar with accent-soft ring). `scripts/generate-og-image.mjs` runs as part of `prebuild`; twitter card type bumped to `summary_large_image`.
- ✅ `react-parallax-tilt` guarded by `prefers-reduced-motion`; tilt max angle dropped to ±8°, glare disabled
- ✅ `react-responsive-masonry` replaced with native CSS columns; ~7KB JS removed
- ✅ Home hero spacing restructured into identity / wayfinding groups
- ✅ Social icons resized to a single `text-4xl` instead of `text-5xl` + `scale-75`; tap target now ~48px

### P2 — system-level upgrades

- ✅ Dark mode shipped via semantic CSS variable tokens; activates on `prefers-color-scheme: dark` and via manual toggle button
- ✅ Tailwind config exposes the new tokens as utilities
- ✅ Hardcoded grays swept from Home, About, Blog, Projects, Footer, TiltAvatar, not-found
- ✅ About and Blog moved to Server Components (removed unnecessary `'use client'`)
- ✅ Home parallax extracted into `TiltAvatar` client island; Home page itself now Server Component
- ✅ Projects page now Server Component (CSS columns replaced JS masonry)
- ✅ `prefers-reduced-motion` global CSS rule + per-component handling for the tilt
- ✅ Skip-to-content link as first focusable element on every page
- ✅ JSON-LD `Person` schema in root layout
- ✅ JSON-LD `BlogPosting` schema on every blog post (headline, datePublished, dateModified, keywords, author, publisher, mainEntityOfPage, image, wordCount)
- ✅ Full design token system (radius, shadow, motion tokens alongside colour + font)
- ✅ Unified card surface via shared className constants in `lib/styles.ts`
- ✅ `<Container>` / `<Section>` / `<Stack>` layout primitives in `src/app/components/primitives.tsx`; adopted by `/now` and `/uses` as demonstration
- ✅ Per-project case study pages at `/projects/[slug]` (MDX-driven, with prev/next nav)
- ✅ MDX-driven blog at `/blog/[slug]` (with reading time, tags, related-posts)
- ✅ `sitemap.ts` / `robots.ts` (generates from filesystem at build)

### P3 — raise the bar

- ✅ Pesto-brand palette (basil + cream + olive accent, warm paper background, dark-mode aware)
- ✅ Swap Merriweather for Fraunces (variable axes `opsz` + `SOFT`)
- ✅ Two-column hero rebuild on Home with display-size H1, role tag, intro, "Currently building" line, two CTAs, social row
- ✅ Below-the-fold strips: Selected work + Recent writing + Get in touch
- ✅ View Transitions API on project card → `/projects/[slug]` (unique `viewTransitionName` per project)
- ✅ Content pages: `/now`, `/uses`, `/colophon`, `/recipes/pesto`
- ✅ Image blur placeholders (build-time `sharp` generation)

### Section 11 sub-items (raise-the-bar)

- ✅ 11.1 brand built around the metaphor (basil palette + pesto recipe page)
- ✅ 11.2 design system in semantic tokens
- ✅ 11.3 project case studies
- ✅ 11.4 blog as editorial — MDX, frontmatter, reading time, related posts
- ✅ 11.4 Tag filtering on `/blog` — per-tag static routes at `/blog/tags/[tag]`, with a tag-chip row on the index linking to each
- ✅ 11.4 Featured post at the top of `/blog`, rendered larger with a 'Latest' eyebrow, big serif headline, and dedicated CTA
- ✅ 11.4 Newsletter signup — static HTML form posting to a configured provider (Buttondown / ConvertKit / etc.); rendered on `/blog` and at the bottom of each post
- ✅ 11.5 home rebuilt with two-column hero + below-fold strips
- ✅ 11.6 Full 2+4-column footer — identity block + Site / Writing / Find me / Currently columns + copyright + Source-on-GitHub strip
- ✅ 11.7 dark mode shipped, with manual toggle on top of OS preference
- ✅ 11.8 view-transitions on project navigation
- ✅ 11.8 Scroll-triggered reveals — pure-CSS `animation-timeline: view()`, guarded by `@supports` and `prefers-reduced-motion`; applied to project / blog / home strips
- ✅ 11.9 404 on-brand
- ✅ 11.10 content artifacts (/now, /uses, /colophon, /recipes/pesto)

### Closed: the full roadmap

Every item from the original audit (Sections 11 and 12) plus the re-audit appendices (C, E) is now closed. The branch ships:

1. ✅ JSON-LD `BlogPosting` schema per post (`c5fc872`)
2. ✅ `<Container>` / `<Section>` / `<Stack>` layout primitives (`dc21f8c`)
3. ✅ Tag filtering on `/blog` via per-tag static routes (`b7f91de`)
4. ✅ Featured post at the top of `/blog` (`e9e21e9`)
5. ✅ Full 4-column footer (`e17fcda`)
6. ✅ Scroll-triggered reveals (`aea548e`)
7. ✅ Newsletter signup (`eb28c57`)
8. ✅ Dedicated 1200×630 OG image, build-time generated (`3ad8c12`)

---

## Appendix E — Bonus fixes (caught after the original audit)

Discovered during re-audits and visual passes; not part of the original 40-row roadmap. All closed.

- ✅ Mobile horizontal-overflow on blog posts (long `<pre>` lines were pushing the whole layout past the viewport on 375px)
- ✅ About figure right-side padding asymmetry (figure wasn't capped to image's natural width)
- ✅ Mobile nav stacked vertically — replaced with compact horizontal row (icons hidden below md)
- ✅ Blue ring on the avatar (Tailwind's slash-opacity modifier couldn't decompose a hex-valued CSS variable, so the default `--tw-ring-color` blue-500 took over)
- ✅ Convention attribution lines on `/now` and `/uses` removed for cleaner content
- ✅ Manual theme toggle (System / Light / Dark) on top of OS preference

Plus the six findings from Appendix C (duplicate H1, purged `bg-accent-soft`, footer tap targets, unlinked Pesto Bot mention, title-template bypass, redundant Colophon footer link) — all closed.

---

*End of audit.*
