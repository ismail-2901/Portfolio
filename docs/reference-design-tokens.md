# Reference Design Tokens — adinaa.me

> Status: Partially verified. Colors estimated from screenshot, confirmed from DOM class patterns.
> Our portfolio uses a different (but compatible) dark editorial system.

## Colors

### Reference Site (Estimated)
| Name | Estimated Value | Usage |
|---|---|---|
| Canvas | `#0a0a0a` – `#111111` | Page background |
| Surface | `#161616` – `#1c1c1c` | Card backgrounds |
| Text | `#f0f0f0` – `#ffffff` | Primary text |
| Text muted | `#888` – `#aaa` | Secondary text, captions |
| Accent | `#7c3aed` – `#8b5cf6` | Violet/purple (links, active states) |
| Accent alt | `#06b6d4` – `#22d3ee` | Cyan (secondary highlights) |
| Border | `#2a2a2a` – `#333` | Card and section borders |
| Success/available | `#22c55e` | "Open to work" badge dot |

### Our Portfolio Tokens (Implemented)
```css
--color-canvas: #0b0d0e         /* near-black */
--color-surface: #121516
--color-surface-raised: #1a1e1f
--color-rule: #293032
--color-copy: #f1f2ef           /* near-white */
--color-copy-soft: #d4d6d5
--color-muted: #a0a8a7
--color-accent: #73dee5         /* teal (vs reference violet) */
--color-accent-secondary: #7e8de8  /* purple-blue */
--color-control-border: #647172
```

> [!NOTE] The reference uses a purple/violet accent. Our design uses teal (#73dee5). Both are valid dark portfolio palettes. We keep our tokens — they define our distinct design identity.

## Typography

### Reference Site (Observed)
- **Font family**: Custom web font (unverified name — loaded via LINK crossorigin)
- **H1**: Very large (est. 4–6rem), bold/heavy weight, letter-by-letter animation
- **H2**: 2–2.5rem, bold
- **H3**: 1.25–1.5rem, medium-bold
- **Body**: 1rem, comfortable line-height (~1.6)
- **Metadata**: 0.75–0.875rem, monospace or similar

### Our Portfolio Tokens (Implemented)
```css
--font-sans: Geist Sans
--font-mono: Cascadia Code / Segoe UI Mono
--text-display: 3rem (line-height 1.04)
--text-display-large: 3.75rem
--text-display-xl: 4.5rem
--text-heading: 1.875rem
--text-subheading: 1.25rem
--text-body: 1rem (line-height 1.75)
--text-body-large: 1.125rem
--text-body-small: 0.875rem
--text-metadata: 0.75rem
```

## Spacing

### Reference Site (Estimated)
- Section padding: ~80–120px vertical
- Container max-width: ~1200px
- Gutter: ~24–32px horizontal
- Card gap: ~16–24px
- Card padding: ~24px

### Our Portfolio (Implemented)
```css
--spacing-page-gutter: 2.5rem (40px)
--container-editorial: 1200px
--spacing-header-public: 4.5rem (72px)
```

## Border Radius

### Reference Site (Observed)
- Cards: ~8–12px
- Buttons: ~6–8px (or pill/full-round for some)
- Badge: ~full/pill

### Our Portfolio (Implemented)
```css
--radius-tight: 2px
--radius-small: 6px
--radius-panel: 12px
```

## Shadows

### Reference Site (Observed)
- Cards: subtle `box-shadow: 0 4px 24px rgba(0,0,0,0.3)` (estimated)
- Elevated panels: deeper shadow

### Our Portfolio (Implemented)
```css
--shadow-panel: 0 18px 60px rgb(0 0 0 / 18%)
--shadow-soft: 0 14px 40px rgb(0 0 0 / 24%)
```

## Animations

### Reference Site (Confirmed via bundle)
- Library: **Framer Motion** (`@emotion/is-prop-valid` dependency confirmed)
- H1: Per-letter stagger with slide + fade
- Sections: Scroll-triggered entrance (IntersectionObserver + Framer Motion `whileInView`)
- Project filters: AnimatePresence layout animations
- Availability badge: Pulsing CSS/Framer animation

### Our Portfolio (Implemented)
```css
--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)
--duration-quick: 160ms
--duration-interactive: 200ms
--duration-enter: 620ms
```
- Stagger animation via `.motion-stagger-item` CSS keyframes
- `Reveal` and `Stagger` components using IntersectionObserver

