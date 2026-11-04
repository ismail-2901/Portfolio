# Reference Interactions — adinaa.me

> Verified via DOM inspection and Framer Motion bundle analysis.

## Navigation

| Interaction | Trigger | Behaviour | Visual Feedback |
|---|---|---|---|
| Nav scroll | Scroll down | Background opacity increases, border appears | CSS/JS transition |
| Hamburger open | Click button | Mobile menu slides in | SVG icon changes |
| Hamburger close | Click button / outside | Mobile menu slides out | Reverse animation |
| Nav link click | Click | Smooth scroll to section | Active state highlight |
| Active nav link | Current section | Link colour changes | Colour transition |

## Hero Section

| Interaction | Trigger | Behaviour | Visual Feedback |
|---|---|---|---|
| H1 animation | Page load | Letters animate in one by one (stagger) | Framer Motion stagger |
| Stats counters | Page load / in-view | Numbers count up | JavaScript counter |
| Availability badge | — | Green dot pulses continuously | CSS/Framer pulse |
| GitHub button | Click | Opens GitHub in new tab | External link |
| Resume button | Click | Downloads/opens resume | Navigation |

## Projects Section

| Interaction | Trigger | Behaviour | Visual Feedback |
|---|---|---|---|
| Filter: All | Click | Shows all project cards | Active button state |
| Filter: Web | Click | Shows only web projects | Cards animate out/in |
| Filter: Design | Click | Shows only design projects | Framer AnimatePresence |
| Card hover | Mouse enter | Dark overlay appears on image, links visible | Smooth fade |
| Card GitHub link | Click | Opens GitHub repo in new tab | — |
| Card Live link | Click | Opens live demo in new tab | — |
| "See more" button | Click | Shows additional hidden cards | Cards animate in |
| Scroll arrow | Click | Scrolls to next section | Smooth scroll |

## Experience Section

| Interaction | Trigger | Behaviour | Visual Feedback |
|---|---|---|---|
| Section entrance | Scroll into view | Section and entries animate in | Framer whileInView |

## General

| Interaction | Trigger | Behaviour | Visual Feedback |
|---|---|---|---|
| Scroll-triggered entrance | Scroll | Each section fades + slides up on first view | `once: true` animation |
| External links | Click | Open in new tab with `rel="noreferrer"` | — |
| Focus states | Tab | Focus ring visible on interactive elements | Outline |

## Animation Library Details

**Framer Motion** (confirmed from bundle):
- `@emotion/is-prop-valid` dependency used for filtering HTML props
- Likely uses: `motion.div`, `AnimatePresence`, `useInView`, `variants`
- H1 uses `staggerChildren` on parent container
- Project filter uses `AnimatePresence` with `layout` prop
- Section entrance uses `whileInView` with `once: true`

## Our Implementation Status

| Feature | Status |
|---|---|
| Smooth scroll | ✅ CSS `scroll-behavior: smooth` |
| Nav active state | ✅ `SiteNavigationLink` with `aria-current="page"` |
| Scroll-triggered entrance | ✅ `Reveal` component (IntersectionObserver) |
| Stagger animations | ✅ `Stagger`/`StaggerItem` components |
| Project filter | ❌ Not yet implemented |
| Letter-by-letter H1 | ❌ Not implemented (we use StaggerItem blocks) |
| Stats counters | ❌ Not implemented |
| Card hover overlay | ⚠️ Partial (ProjectMediaFrame has overlay elements) |
| "See more" button | ❌ Not needed (we show all published) |
| Availability badge | ❌ Not implemented |

