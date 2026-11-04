# Reference Responsive Behaviour — adinaa.me

> Inspected viewport: 929×917 (Chrome headless default). Mobile/tablet breakpoints inferred from DOM + CSS class naming patterns.

## Breakpoints (Inferred)

| Breakpoint | Width | Behaviour |
|---|---|---|
| Desktop | ≥ 1024px | Full layout, 2-col hero, 3-col projects |
| Laptop | 768–1023px | Stacked hero, 2-col projects, desktop nav |
| Tablet | 480–767px | Stacked hero, 2-col projects, hamburger nav |
| Mobile | < 480px | Single column everything, hamburger nav |

## Navigation Changes

| Viewport | Nav Behaviour |
|---|---|
| Desktop | Horizontal links visible, hamburger hidden |
| Mobile | Hamburger visible, links hidden in flyout |

The DOM reveals two navigation structures in parallel:
- `div.left-group` (desktop) with inline links
- `div.right-group` (mobile) with hamburger button

This is a standard show/hide responsive pattern.

## Hero Section

| Viewport | Layout |
|---|---|
| Desktop | 2-column: text left, image right |
| Mobile | Stacked: text then image below |

## Projects Grid

| Viewport | Columns |
|---|---|
| Desktop (≥1024px) | 3 columns |
| Tablet (768–1023px) | 2 columns |
| Mobile (<768px) | 1 column |

## Experience Timeline

| Viewport | Layout |
|---|---|
| Desktop | 2-column: role/dates left, description right |
| Mobile | Stacked single column |

## Typography Scaling

- H1: Scales from ~3rem mobile to ~5–6rem desktop (Framer Motion `style` attr with responsive variants)
- Body: Constant ~1rem
- Metadata: Constant ~0.75rem

## Our Portfolio Responsive Implementation

| Feature | Our Status |
|---|---|
| Nav hamburger | ✅ MobileNavigation component |
| Hero 2-col layout | ✅ `lg:grid-cols-[1.05fr_0.95fr]` |
| Projects list (responsive) | ✅ Article list (not grid — editorial style) |
| Capability cluster | ✅ Responsive grid in CapabilityCluster |
| Experience timeline | ✅ `md:grid-cols-[160px_1fr]` |
| Page gutter | ✅ Responsive `--spacing-page-gutter` (40px → 16px at sm) |
| Typography | ✅ Responsive text classes (`sm:text-display-large lg:text-display-xl`) |

