# GitHub Profile README Generator - Design Guidelines

## Design Approach

**Selected Approach**: Design System + Dev Tool Reference Hybrid

Drawing inspiration from Linear's clean typography, GitHub's familiar patterns, and modern dev tools like Vercel. This utility-focused application prioritizes efficiency, clarity, and seamless workflow over decorative elements.

**Core Principles**:
- Clarity over decoration
- Functional aesthetics
- Developer-friendly interface
- Instant feedback on all interactions

---

## Typography System

**Font Families**:
- Primary: Inter (via Google Fonts) - UI elements, forms, buttons
- Monospace: JetBrains Mono (via Google Fonts) - Code preview, markdown output

**Type Scale**:
- Hero/Title: text-3xl to text-4xl, font-semibold
- Section Headers: text-xl, font-semibold
- Form Labels: text-sm, font-medium
- Body Text: text-base, font-normal
- Helper Text: text-sm, font-normal
- Code Preview: text-sm, font-mono

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Component padding: p-6 or p-8
- Section margins: mb-6 or mb-8
- Form field spacing: space-y-4
- Grid gaps: gap-6

**Core Layout Structure**:

1. **Header Bar** (sticky top)
   - Logo/title on left
   - Theme toggle + GitHub icon link on right
   - Height: h-16
   - Border bottom separator

2. **Split Screen Layout** (main workspace)
   - Left Panel (45% width): Form builder with scrollable sections
   - Right Panel (55% width): Sticky live preview with markdown display
   - Responsive: Stack vertically on tablet/mobile (preview collapses into tabs)

3. **Form Sections** (left panel)
   - Template selector (cards with previews)
   - Basic Info (name, tagline, bio)
   - Skills & Tech Stack (searchable multi-select with badges)
   - GitHub Stats (toggle options: profile views, contribution graph, streak)
   - Social Links (icon + URL inputs)
   - Custom Sections (accordion for advanced options)

4. **Preview Panel** (right panel)
   - Tab switcher: Preview / Raw Markdown
   - Rendered markdown view with GitHub styling
   - Action buttons: Copy to Clipboard + Download .md file
   - Floating at top, sticky position

---

## Component Library

### Navigation & Header
- **App Header**: Clean bar with subtle border, contains branding and utilities
- **Tab Navigation**: Underline style for Preview/Markdown toggle

### Form Components
- **Text Inputs**: Clean borders, focused ring states, proper labels above
- **Multi-Select Tags**: Pill-style chips with remove icons for skills
- **Toggle Switches**: Modern switch design for stat options
- **Icon Selector**: Grid of social platform icons (use Heroicons for UI, Font Awesome brands for social icons)
- **Template Cards**: 3-column grid, hover lift effect, radio selection indicator

### Data Display
- **Preview Container**: GitHub-styled markdown renderer with syntax highlighting
- **Badge Generator**: Preview of skill badges inline as added
- **Stats Preview**: Mock GitHub stat cards showing example data

### Actions & Feedback
- **Primary Button**: Prominent, full-width or auto-width based on context
- **Secondary Button**: Outlined style for alternative actions
- **Icon Buttons**: Circle backgrounds for theme toggle, social actions
- **Copy Feedback**: Toast notification on successful copy
- **Loading States**: Skeleton loaders for preview rendering

### Overlays
- **Modal**: For template details or advanced configuration
- **Toast Notifications**: Bottom-right corner for copy confirmations

---

## Interaction Patterns

### Form to Preview Flow
- Real-time updates (debounced 300ms for text inputs)
- Instant updates for toggles and selections
- Smooth transitions when sections expand/collapse

### Template Selection
- Click card to select, show radio indicator
- Preview updates immediately with selected template structure
- Subtle scale-up on hover (scale-105)

### Copy & Download
- Single click copy with visual confirmation
- Download triggers browser download with "README.md" filename
- Clear success states for both actions

---

## Content Strategy

### Above the Fold
- App title: "GitHub Profile README Generator"
- Subtitle: "Create a stunning profile README in minutes"
- Template selector visible immediately
- Preview panel shows example on load

### Form Organization (Vertical Scroll)
1. Template Selection (cards)
2. Basic Information (3-4 inputs)
3. About Me (textarea)
4. Skills & Technologies (badge builder)
5. GitHub Statistics (toggle options)
6. Social Links (icon + URL pairs)
7. Advanced Options (collapsible)

### Progressive Disclosure
- Start with essentials visible
- Advanced options behind accordion/collapse
- Preview drives user understanding

---

## Images

**No large hero image required** - This is a functional application tool.

**Icon Usage**:
- Social platform icons in link builder (GitHub, LinkedIn, Twitter, etc.)
- Technology badges/icons for skills section (use DevIcons CDN or similar)
- UI icons from Heroicons for interface elements

---

## Responsive Behavior

**Desktop (lg+)**: Side-by-side split screen, both panels visible
**Tablet (md)**: 60/40 split or tabbed view with floating preview button
**Mobile (base)**: Single column, preview accessible via bottom sheet or tab switch

**Key Breakpoints**:
- Mobile-first base styles
- md: 768px (tablet adjustments)
- lg: 1024px (full split-screen layout)
- xl: 1280px (optimal viewing width, max-w-7xl container)

---

## Polish & Details

- Smooth scroll behavior for form sections
- Subtle box shadows on cards and panels (shadow-sm to shadow-md)
- Rounded corners: rounded-lg for cards, rounded-md for inputs
- Focus states: prominent rings on all interactive elements
- Empty states: Helpful placeholder text in preview when no content
- Micro-interactions: Button press states, checkbox animations, badge additions

**Critical**: Every form field should have clear labels, proper spacing, and helpful placeholder text. The preview should never feel disconnected from the form - changes propagate instantly with smooth transitions.