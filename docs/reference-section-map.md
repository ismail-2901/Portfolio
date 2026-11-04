# Reference Section Map — adinaa.me

> DOM-verified structure via REA MCP browser inspection. Total DOM nodes: 3,334.

## Page Layout (Top to Bottom)

```
┌─────────────────────────────────────────────────────────┐
│  NAV (sticky, transforms on scroll)                     │
│  [Logo: "Adina Hawaldar"] [Home|Projects|Portfolio|     │
│   Skills|Contact] [☰ hamburger]                         │
└─────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────┐
│  SECTION#hero                                           │
│  ┌────────────────────────┐  ┌─────────────────────┐   │
│  │ <H1> (animated letters)│  │  Profile Image      │   │
│  │ Stat counters row      │  │  (geometric frame)  │   │
│  │ Bio paragraph          │  └─────────────────────┘   │
│  │ [● Open to Work]       │                             │
│  │ [GitHub] [Resume]      │                             │
│  └────────────────────────┘                             │
└─────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────┐
│  SECTION#projects                                       │
│  <H2>Projects</H2>                                      │
│  [All] [Web] [Design]  ← Filter buttons                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ Project  │ │ Project  │ │ Project  │               │
│  │ Card     │ │ Card     │ │ Card     │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│  [See more projects ↓]                                  │
└─────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────┐
│  SECTION#experience                                     │
│  <H2>Experience</H2>                                    │
│  Timeline entries (image + role + dates + description)  │
└─────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────┐
│  SECTION (contact / footer — inferred)                  │
│  Social links + Contact CTA                             │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### NAV
```
nav[class, style]
  div.container
    div.left-group
      a.logo → "Adina Hawaldar"
      div.desktop-links
        a → "Home"
        a → "Projects"
        a → "Portfolio"
        a → "Skills"
        a → "Contact"
        button.hamburger → <svg>
    div.right-group (mobile branding + actions)
      a.logo → "Adina Hawaldar"
      div
        button.theme-toggle → <svg>
        button → "Work" (CTA)
    div.desktop-cta
      a → "Home"
      a → "Projects"
      a → "Portfolio"
      a → "Skills"
      a → "Contact"
```

### SECTION#hero
```
section#hero[class, style]
  div.container[style]
    div.hero-content
      div.hero-heading[style]
        h1[class, style]
          span × 14 (each letter, individually animated via Framer Motion)
      div.hero-stats[style]
        div × 3  (counter blocks)
          span → number
          span → label
      div.hero-bio[style]
        p
          text + a[href, target] + text
      div.hero-cta[style]
        div.availability-badge
          span.badge-icon (green pulse dot)
          span → "Open to Work"
        div.cta-buttons
          a[href, target] → "GitHub"
          a[href] → "Resume"
      div.hero-image[style]
        div[style]
          div[style]
            img[alt, src, style]
```

### SECTION#projects
```
section#projects[class, style]
  div.container[style]
    div.projects-header
      div
        h2[class, style] → "Projects"
      div.filter-buttons
        button × 3  ("All", "Web", "Design")
    div.projects-grid
      div × N  (project cards)
        div.card-image-wrap
          img[alt, src]
          div.hover-overlay
          div.category-badge
            p → "React / Node.js / ..."
        div.card-info
          h3 → Project title
          div.card-meta
            div → Year
            a[href, target] → <GitHub SVG>
            a[href, target] → <ExternalLink SVG>
    div.load-more
      button → "See more projects"
  button.scroll-down-arrow
    svg ↓
```

### SECTION#experience
```
section#experience[class, style]
  div.container[style]
    div.experience-header
      div
        h2 → "Experience"
    div.experience-timeline
      div.timeline-left
        h3 → "Role\nCompany"
        div.date-badges
      div.timeline-right
        div × N  (entries)
          div.entry-logo
            img
          div.entry-content
            div.entry-header
              h4 → Role
              p → Date range
              p → Description (150 chars)
            div.entry-tags
```

