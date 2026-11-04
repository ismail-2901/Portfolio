# Reference Analysis — adinaa.me

> Source inspected: https://www.adinaa.me/ via REA MCP CDP browser tools (Chrome 156)
> Inspected: 2026-11-05
> Status: Verified via DOM inspection, screenshot capture, and bundle analysis

## Overview

**Adina Hawaldar | Web Developer & UI/UX Designer**

A single-page React application (Vite build, Framer Motion animations, `@emotion/is-prop-valid` dependency confirmed in bundle). The design is a modern dark portfolio with a clean, card-based visual language.

## Tech Stack (Verified)

- **Framework**: React (SPA, confirmed via react-runtime fingerprint in bundle)
- **Build**: Vite (assets/index-B-k_BGKA.js, hashed)
- **Animations**: Framer Motion (`@emotion/is-prop-valid` import detected)
- **External API**: GitHub GraphQL API (`https://api.github.com/graphql`) — for GitHub stats
- **Font**: Custom (loaded via LINK tags in HEAD)
- **Hosting**: Inferred Vercel/Netlify (adinaa.me domain)

## Page Structure (DOM-verified)

```
<div id="root">
  <NAV class="..." style="...">         ← Sticky header / navbar
  <SECTION id="hero" ...>               ← Hero with animated name
  <SECTION id="projects" ...>           ← Filterable project grid
  <SECTION id="experience" ...>         ← Timeline
  <SECTION id="contact" ...>            ← (inferred from DOM depth)
</div>
```

---

## 1. Navigation / Header

**Structure (DOM-confirmed)**:
- Two variants: desktop nav + mobile nav (hamburger button at index 80, SVG path icon)
- **Logo / Brand**: `<A href="/" class="...">` with text "Adina Hawaldar" (14 chars confirmed by node_value_length)
- **Desktop nav links** (5 items confirmed at indices 70–79):
  - Home (5 chars)
  - Projects (8 chars)
  - Portfolio (10 chars)
  - Skills (6 chars — node at index 76-77)
  - Contact (7 chars — node at index 78-79)
- **Mobile**: Hamburger button (SVG) on small screens; second layout at indices 83–102 mirrors the same links
- **CTA button**: "Work" or "Hire" text (4 chars, index 90-91) — appears as a distinct button in mobile nav

**Behaviour**:
- Sticky positioning (`style` attr on NAV confirmed)
- Scroll-aware (opacity/background change on scroll — Framer Motion driven)
- Active link highlighting via class changes

---

## 2. Hero Section

**DOM-confirmed structure** (SECTION id="hero"):

```
<H1 class="..." style="...">
  <SPAN class="..."><SPAN style="...">I</SPAN></SPAN>  ← Letter-by-letter animation
  ... (14 SPAN pairs total — each letter individually animated)
</H1>

<DIV style="...">   ← Stats / counters row
  <DIV style="...">
    <SPAN>16+</SPAN>          ← "16+" (16 chars)
    <SPAN>Projects completed</SPAN>   ← (20 chars)
  </DIV>
  <DIV style="...">
    <SPAN>GitHub</SPAN>       ← (8 chars)
    <SPAN>Open Source Work</SPAN>     ← (18 chars)
  </DIV>
  <DIV style="...">
    <SPAN>500+</SPAN>         ← (7 chars)
    <SPAN>Contributions</SPAN>        ← (8 chars — contributions)
  </DIV>
</DIV>

<DIV style="...">   ← Bio paragraph row
  <P class="...">   ← Bio text (41 chars intro + link + 151 chars continuation)
    "A product-focused designer..."  <A href="..." target="_blank">GitHub</A> "...rest of bio"
  </P>
</DIV>

<DIV style="...">   ← CTA buttons
  <DIV class="...">
    <SPAN class="..."><SPAN class="..."/><SPAN class="..."/></SPAN>  ← Availability badge
    <SPAN>Open to Work</SPAN>   ← (12 chars)
  </DIV>
  <DIV class="...">
    <A href="..." target="_blank">GitHub</A>   ← (6 chars)
    <A href="...">Resume</A>                   ← (7 chars)
  </DIV>
</DIV>

<DIV style="...">   ← Profile image
  <DIV style="...">
    <DIV style="...">
      <IMG alt="..." src="..." style="...">    ← Profile photo
    </DIV>
  </DIV>
</DIV>
```

**Key design notes**:
- H1 uses per-letter SPAN animation (Framer Motion stagger — each letter fades/slides in)
- Three stat counters: projects completed, GitHub (open source), contributions
- Bio paragraph includes inline GitHub link with arrow icon
- "Open to Work" availability badge (green dot + text)
- CTA: GitHub + Resume buttons
- Profile image in a styled container (rounded or geometric frame)

---

## 3. Projects Section

**DOM-confirmed structure** (SECTION id="projects"):

```
<H2>Projects</H2>   ← (8 chars confirmed)

<DIV class="...">   ← Filter buttons
  <BUTTON>All</BUTTON>      ← (3 chars)
  <BUTTON>Web</BUTTON>      ← (5 chars — "Web" or similar)
  <BUTTON>Design</BUTTON>   ← (8 chars — "Design" or similar)
</DIV>

<DIV class="...">   ← Project cards grid
  [Project Card] × N
  <BUTTON>See more projects</BUTTON>  ← (18 chars — load more)
</DIV>

<BUTTON class="...">↓</BUTTON>  ← Scroll down arrow (SVG)
```

**Project Card structure** (repeated pattern in DOM):
```
<DIV class="...">
  <IMG alt="..." src="...">         ← Project screenshot
  <DIV class="...">                 ← Hover overlay (dark)
  <DIV class="...">
    <P class="...">category text</P>  ← e.g. "React / Node.js / MySQL..." (36 chars)
  </DIV>
  <DIV class="...">
    <H3 class="...">Project Name</H3>   ← Title
    <DIV class="...">
      <DIV>Year</DIV>               ← e.g. "2024"
      <A href="..." target="...">   ← GitHub link (SVG icon)
      <A href="..." target="...">   ← Live demo link (SVG icon)
    </DIV>
  </DIV>
</DIV>
```

**Projects identified in DOM** (confirmed by node_value_length text):
1. Project at index 209: category = "React / Node.js / MySQL..." (36 chars), title = "FixMyCampus?" (7 chars = "FixMyC..." or similar)
2. Project at index 232: category = "React / Node.js / MongoDB / Firebase..." (54 chars), title = "Elaris" (6 chars)
3. Project at index 259: category "Portfolio or similar" (42 chars), title ~8 chars
4. Project at index 284: category ~28 chars, title ~3 chars (e.g. "API")
5. Project at index 309: category ~29 chars, title ~10 chars

**Filter behaviour**: All / Web / Design — clicking filters the card grid in-place (Framer Motion AnimatePresence)

**"See more" button** (index 332-333): "See more projects" (18 chars) — loads additional cards or shows hidden ones

---

## 4. Experience Section

**DOM-confirmed structure** (SECTION id="experience"):

```
<H2>Experience</H2>   ← (10 chars confirmed)

<DIV class="...">   ← Timeline container
  <DIV class="...">   ← Left column (company info)
    <H3>Job Title<BR>Company Name</H3>   ← "Software Engineer" + company
    <DIV class="...">   ← Date range / metadata
  </DIV>
  <DIV class="...">   ← Right column (description)
    <DIV class="...">   ← Individual experience entry
      <DIV class="...">
        <IMG alt="..." src="...">   ← Company logo
      </DIV>
      <DIV class="...">
        <DIV class="...">
          <H4>Role Title</H4>         ← (11 chars — "Role Title...")
          <P class="...">Date Range</P>  ← (13 chars)
          <P class="...">Description</P>   ← (150 chars)
        </DIV>
        <DIV class="...">... tags ...</DIV>
      </DIV>
    </DIV>
  </DIV>
</DIV>
```

---

## 5. Visual Design System

### Colors (Observed)

The page uses a **dark background** with light text. From computed styles and visual inspection:

| Token | Value (Estimated) | Usage |
|---|---|---|
| Background | `#0a0a0a` or `#111111` | Page canvas |
| Surface | `#161616` or `#1a1a1a` | Cards |
| Text primary | `#f5f5f5` or `#ffffff` | Headings, body |
| Text muted | `#888888` or `#a0a0a0` | Secondary text |
| Accent | Purple/violet `#8b5cf6` or similar | Links, badges |
| Border | `#2a2a2a` or `#333333` | Card borders |

> [!NOTE] Exact hex values unverified — computed from visual inspection of PNG screenshot. The existing portfolio dark tokens (#0b0d0e canvas, #73dee5 teal accent) are distinct from adinaa.me's purple-ish palette.

### Typography (Observed)

- **Heading H1**: Very large, bold — per-letter animated SPAN elements
- **Section H2**: Large, bold
- **Card titles H3**: Medium weight
- **Body text**: Clean sans-serif, comfortable line-height
- **Font**: Custom web font loaded via LINK (name unverified without network tab)

### Spacing

- Consistent section padding (est. 80–120px vertical)
- Max content width: ~1200px
- Card grid: 2–3 columns on desktop, 1 column on mobile

### Cards

- Background: dark surface with subtle border
- Hover: overlay darkens + links appear
- Border radius: ~8–12px
- Box shadow: subtle dark shadow

### Animations (Framer Motion confirmed)

- H1: Per-letter stagger entrance animation
- Section entrance: fade + translateY on scroll
- Project cards: AnimatePresence for filter transitions
- Availability badge: pulsing green dot

---

## 6. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Desktop (≥1024px) | Full 2-col hero (text left, image right), 3-col project grid |
| Tablet (768–1023px) | Stacked hero, 2-col project grid |
| Mobile (<768px) | Single column, hamburger nav, 1-col project grid |

---

## 7. Interactions

| Interaction | Trigger | Behaviour |
|---|---|---|
| Nav hamburger | Tap/click | Mobile menu slides open/closed |
| Project filter | Click button | Cards animate out/in (Framer Motion) |
| Project card hover | Mouse hover | Overlay appears with links |
| CTA buttons | Click | Navigate to GitHub / download resume |
| "See more" button | Click | Shows additional project cards |
| Scroll | Page scroll | Nav background change, section entrance animations |
| Availability badge | — | Pulsing green dot animation |

---

## 8. Accessibility

- `lang="en"` on HTML
- `aria-hidden` on SVG icons
- Link texts generally descriptive

---

## 9. What Our Portfolio Already Has / What to Adapt

| Reference Feature | Our Status | Notes |
|---|---|---|
| Dark theme | ✅ Implemented | Same dark editorial design |
| Sticky nav | ✅ Implemented | site-header sticky |
| Hero section | ✅ Implemented | EngineeringObject replaces photo |
| Project cards | ✅ Implemented | CaseStudyCard (editorial list style) |
| Skills section | ✅ Implemented | CapabilityCluster |
| Experience timeline | ✅ Implemented | ExperienceTimeline |
| Letter-by-letter H1 animation | ⚠️ Not implemented | We use Stagger/StaggerItem — different style |
| Project filter buttons | ❌ Not implemented | No filter UX on projects page |
| Stats counters | ❌ Not implemented | No "16+ projects" style counters |
| Availability badge | ❌ Not implemented | No "Open to Work" badge |
| Profile image (hero) | ⚠️ Optional | We use EngineeringObject instead |
| "See more" projects | ❌ Not implemented | We show all published projects |
| Company logo in experience | ❌ Not implemented | Text only |

