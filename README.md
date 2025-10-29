# GitHub Profile README Generator

## Overview
A modern web application for generating customized GitHub profile READMEs with live preview and multiple template options. Built with React, TypeScript, and Tailwind CSS.

## Purpose
Help developers create stunning, professional GitHub profile READMEs quickly and easily with an intuitive form-based interface and real-time markdown preview.

## Recent Changes
- October 29, 2025: Initial implementation with three templates (minimal, detailed, creative)
- Added stepped wizard interface with 5 steps and progress indicator
- Implemented smooth animations (fade-in, slide-in) between steps
- Added live markdown preview with proper markdown parsing (marked + DOMPurify)
- Implemented skill selector with categories and custom skill support
- Added GitHub stats integration options
- Created social links form for multiple platforms
- Implemented dark/light theme toggle
- Removed all emojis from templates per design guidelines
- Added security: markdown sanitization to prevent XSS

## User Preferences
- Modern, clean UI with developer-focused design
- Gradient accents and smooth animations
- Real-time preview updates
- Mobile-responsive design

## Project Architecture

### Frontend Structure
- **React SPA** with TypeScript
- **Tailwind CSS** for styling with custom design tokens
- **Shadcn UI** components for consistent design system
- **Wouter** for client-side routing
- **TanStack Query** for state management

### Key Features
1. **Stepped Wizard Interface**: 5-step guided process (Basic Info → Links → Social → Skills → Preview)
2. **Progress Indicator**: Visual step tracker showing completed, current, and upcoming steps
3. **Template Selection**: Three professional templates (minimal, detailed, creative)
4. **Live Preview**: Real-time markdown rendering with preview/code tabs using marked + DOMPurify
5. **Skill Management**: Categorized skill selector with search and custom skills
6. **GitHub Stats**: Integration with GitHub stats cards, streaks, and language charts
7. **Social Links**: Support for GitHub, LinkedIn, Twitter, YouTube, Instagram, and website
8. **Copy/Download**: One-click copy to clipboard and README.md download
9. **Theme Toggle**: Light/dark mode support
10. **Smooth Animations**: Fade and slide transitions between steps

### Component Organization
- `/client/src/pages/home.tsx` - Main application page with stepped wizard
- `/client/src/components/` - Reusable UI components
  - `step-indicator.tsx` - Progress indicator for wizard steps
  - `template-selector.tsx` - Template choice interface
  - `skill-selector.tsx` - Skill management with categories
  - `social-links-form.tsx` - Social media links input
  - `markdown-preview.tsx` - Live preview panel with tabs (uses marked + DOMPurify)
  - `theme-toggle.tsx` - Dark/light mode switcher
  - `theme-provider.tsx` - Theme context management
- `/client/src/lib/markdown-generator.ts` - Markdown generation logic for all templates (emoji-free)
- `/shared/schema.ts` - TypeScript types and validation schemas

### Data Model
The application uses in-memory state management with the following structure:
- Template selection (minimal, detailed, creative)
- Basic info (name, tagline, bio, location)
- Skills array with category support
- GitHub username and stats toggles
- Social links object
- Custom sections array

### Backend
Simple Express server serving the frontend application. No database persistence required as all data is managed client-side.

## Design System
- **Colors**: Primary blue gradient accent, neutral backgrounds
- **Typography**: Inter for UI, JetBrains Mono for code
- **Spacing**: Consistent 6/8 unit spacing system
- **Components**: Shadcn UI with custom elevation utilities
- **Responsive**: Mobile-first with breakpoints at md (768px) and lg (1024px)

## Running the Project
The application runs on `npm run dev` which starts both the Express backend and Vite frontend on the same port.
