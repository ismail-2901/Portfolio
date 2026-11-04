# Reference Component Architecture — adinaa.me

> Reverse-engineered from DOM structure and bundle analysis.
> Do NOT copy this code — use as architecture reference only.

## Stack Summary

| Layer | Technology |
|---|---|
| Framework | React (SPA) |
| Build | Vite |
| Routing | React Router or hash-based (SPA) |
| Animations | Framer Motion |
| Styling | CSS Modules or Tailwind (class names minified/obfuscated) |
| Data | GitHub GraphQL API (live stats) |
| Hosting | Static (CDN) |

## Component Map (Inferred)

```
App
├── Navbar
│   ├── NavLogo
│   ├── NavLinks (desktop)
│   ├── NavCTA (desktop)
│   └── MobileMenu
│       ├── HamburgerButton
│       └── MobileNavLinks
│
├── HeroSection
│   ├── AnimatedHeading       ← per-letter Framer Motion stagger
│   ├── StatsRow
│   │   ├── StatCounter × 3   ← number count-up animation
│   ├── BioParagraph
│   ├── AvailabilityBadge     ← pulsing green dot + "Open to Work"
│   ├── CTAButtons
│   │   ├── GitHubButton
│   │   └── ResumeButton
│   └── HeroImage             ← profile photo in styled frame
│
├── ProjectsSection
│   ├── SectionHeading
│   ├── FilterBar             ← All / Web / Design buttons
│   ├── ProjectGrid           ← Framer AnimatePresence layout
│   │   └── ProjectCard × N
│   │       ├── CardImage
│   │       ├── HoverOverlay
│   │       ├── CategoryBadge
│   │       ├── CardTitle
│   │       └── CardActions   ← GitHub + Live links + Year
│   └── LoadMoreButton
│
├── ExperienceSection
│   ├── SectionHeading
│   └── ExperienceTimeline
│       └── ExperienceEntry × N
│           ├── CompanyLogo
│           ├── RoleTitle
│           ├── DateRange
│           ├── Description
│           └── TechTags
│
└── ContactSection / Footer
    ├── SocialLinks
    └── ContactCTA
```

## Key Animation Patterns

### Animated Heading (H1)
```jsx
// Pattern (DO NOT COPY — reference only)
const letters = "Adina".split("");
<motion.h1>
  {letters.map((letter, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
    >
      {letter}
    </motion.span>
  ))}
</motion.h1>
```

### Project Filter (AnimatePresence)
```jsx
// Pattern (DO NOT COPY — reference only)
<AnimatePresence mode="wait">
  {filteredProjects.map(project => (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  ))}
</AnimatePresence>
```

### Scroll-triggered Entrance
```jsx
// Pattern (DO NOT COPY — reference only)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

## Our Portfolio Component Mapping

| Reference Component | Our Component | File |
|---|---|---|
| Navbar | SiteHeader | site-header.tsx |
| MobileMenu | MobileNavigation | mobile-navigation.tsx |
| HeroSection | Home page | (site)/page.tsx |
| AnimatedHeading | Stagger/StaggerItem | motion.tsx |
| ProjectCard | CaseStudyCard | case-study-card.tsx |
| FilterBar | ❌ Not implemented | — |
| ProjectGrid | (implicit in page) | (site)/page.tsx |
| ExperienceTimeline | ExperienceTimeline | experience-timeline.tsx |
| CapabilityCluster | CapabilityCluster | capability-cluster.tsx |
| SectionIntro | SectionIntro | section-intro.tsx |
| Reveal | Reveal | motion.tsx |
| StatCounters | ❌ Not implemented | — |
| AvailabilityBadge | ❌ Not implemented | — |

