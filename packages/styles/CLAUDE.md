# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
npm run start       # Run webpack in watch mode for development
npm run build       # Build production bundle
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run test:snapshot # Update Jest snapshots
npm run docs       # Generate TypeDoc documentation
npm run clean      # Clean dist directory
```

### Testing Individual Files
```bash
npm test -- path/to/test.ts  # Run specific test file
npm test -- --updateSnapshot # Update snapshots for failing tests
```

## Architecture Overview

This package provides JSS (JavaScript Style Sheets) objects for the University of Maryland design system. The styles are JavaScript objects that can be:
- Used inline with JavaScript frameworks
- Converted to CSS strings using provided utilities
- Integrated with Tailwind CSS
- Split for optimal loading (preRender/postRender)

### Core Structure

**Source Organization:**
- `token/` - Design tokens (colors, spacing, fonts, media queries)
- `typography/` - Font definitions and text styles
- `element/` - UI component styles (buttons, forms, cards, etc.)
- `layout/` - Layout utilities (grid, alignment, backgrounds)
- `animation/` - Transitions and animations
- `accessibility/` - Screen reader and skip navigation utilities
- `utilities/` - Helper functions for JSS/CSS transformation

### Key Patterns

1. **JSS Objects**: All styles are defined as JavaScript objects with `className` properties
2. **CSS Variables**: Tokens are exposed as CSS custom properties
3. **Media Queries**: Responsive styles use predefined breakpoints from `token/media.ts`
4. **Type Safety**: Full TypeScript definitions for all style objects

### Testing

- Jest with snapshot testing for style objects
- Tests are co-located with source files in `__tests__` directories
- Focus on testing the structure and values of JSS objects

### Build Output

The webpack build produces:
- ES module bundle at `dist/index.js`
- TypeScript definitions
- Minified production code
- PostCSS processing with nesting support