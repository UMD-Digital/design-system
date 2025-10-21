# CLAUDE.md - Hero Component

This file provides guidance to Claude Code when working with the hero composite element in the UMD Design System.

## Component Overview

The hero component is a flexible, full-width banner element designed for page headers and impactful visual storytelling. It provides multiple variants for different use cases, from simple text-based headers to complex animated multimedia experiences.

## Architecture

### File Structure
```
hero/
├── _types.ts          - TypeScript interfaces for all hero variants
├── index.ts           - Main exports and type re-exports
├── standard.ts        - Standard hero with background media
├── minimal.ts         - Minimal hero with optional side image
├── overlay.ts         - Hero with text overlay on media
├── stacked.ts         - Stacked hero with scroll animations
├── logo.ts            - Logo-focused hero variant
└── custom/            - Advanced custom variants
    ├── expand.ts      - Expanding hero with scroll effects
    ├── grid.ts        - Grid-based hero with multiple images
    └── video-arrow.ts - Video hero with animated arrow overlay
```

### Type System

All hero variants follow a composable type pattern defined in `_types.ts`:

- **Base Interfaces**: Shared properties grouped by concern
  - `HeroAnimationProps`: Animation configuration
  - `HeroSizingProps`: Height sizing options
  - `HeroLayoutProps`: Text alignment options
  - `HeroAssetProps`: Media (image/video) properties

- **Variant Interfaces**: Each variant explicitly extends only needed base interfaces
  - Uses `Pick<ThemeProps, 'specific-props'>` for selective theme inheritance
  - Required vs optional properties clearly defined per variant

### Common Patterns

#### Media Handling
All heroes support image and/or video backgrounds:
- Videos use `assets.video.observedAutoPlay()` for performance
- Images use `assets.image.background()` with scaling options
- Fallback to placeholder when no media provided

#### Animation Support
Heroes with `includesAnimation` prop implement:
- CSS animations with `prefers-reduced-motion` respect
- Scroll-triggered animations using `animation-timeline: view()`
- Keyframe definitions included in component styles

#### Responsive Design
- Container queries for component-level responsiveness
- Breakpoints: Mobile (< 768px), Tablet (768-1023px), Desktop (1024px+)
- Aspect ratio adjustments per viewport size

## Component Variants

### Standard Hero (`standard.ts`)
Full-width hero with background media and overlaid text
- **Props**: `HeroStandardProps`
- **Features**: 
  - Background image/video with gradient overlay
  - Optional slide-up and scale-down animations
  - Height variants (small/full)
  - Text alignment options

### Minimal Hero (`minimal.ts`)
Clean hero with side-by-side text and optional image
- **Props**: `HeroMinimalProps`
- **Features**:
  - 50/50 split layout on tablet+
  - Colored border accent
  - Theme-aware backgrounds
  - No animations

### Overlay Hero (`overlay.ts`)
Text overlaid on offset media
- **Props**: `HeroOverlayProps`
- **Features**:
  - 60% width media with text overlay
  - Gradient fade for text readability
  - Resize and slide animations
  - Minimum height constraints

### Stacked Hero (`stacked.ts`)
Scroll-animated hero with sticky text
- **Props**: `HeroStackedProps`
- **Features**:
  - Sticky text during scroll
  - Color transitions (black to white)
  - Fade-in overlay on scroll
  - Configurable top position

### Logo Hero (`logo.ts`)
Centered hero focused on logo/image display
- **Props**: `HeroLogoProps`
- **Features**:
  - Centered layout
  - Logo/image showcase
  - Theme-aware backgrounds
  - No animations

### Custom Variants

#### Expand Hero (`custom/expand.ts`)
Advanced scroll-triggered expanding hero
- **Props**: `HeroExpandProps` (extends base with additional slots)
- **Features**:
  - Width expansion from 10% to 100vw on scroll
  - Height expansion from 50vh to 100vh
  - Overlay fade animation
  - Additional content slot support

#### Grid Hero (`custom/grid.ts`)
Complex grid layout with multiple images
- **Props**: Custom `HeroGridProps` (not using base types)
- **Features**:
  - 3-column grid (25%-50%-25%)
  - Animated grid collapse on scroll
  - Corner and center image sections
  - Video support in center
  - Extensive validation

#### Video Arrow Hero (`custom/video-arrow.ts`)
Video hero with animated brand chevron
- **Props**: `HeroVideoArrowProps` (requires video)
- **Features**:
  - Full-screen video background
  - Animated chevron overlay
  - Staged text fade-in
  - Auto-resize to viewport

## Implementation Guidelines

### Creating New Variants

1. **Define Types**: Add interface to `_types.ts` extending only needed base interfaces
2. **File Structure**: Follow consistent pattern (imports, interfaces, constants, functions, export)
3. **Use ElementModel**: Leverage the model system for element creation
4. **Include Animations**: Add keyframes to composite.styles when using animations
5. **Container Queries**: Use for responsive behavior within component

### Animation Best Practices

```typescript
// Define animation config as constants
const ANIMATION_CONFIG = {
  SLIDE_UP: {
    DURATION: '1s',
    TRANSFORM: { FROM: 'translateY(25px)', TO: 'translateY(0)' },
  },
} as const;

// Create keyframe strings
const keyFrameSlideUp = `
  @keyframes hero-slide-up {
    from { transform: ${ANIMATION_CONFIG.SLIDE_UP.TRANSFORM.FROM}; }
    to { transform: ${ANIMATION_CONFIG.SLIDE_UP.TRANSFORM.TO}; }
  }
`;

// Apply with motion preference check
elementStyles: {
  element: {
    ...(includesAnimation && {
      [`@media (prefers-reduced-motion: no-preference)`]: {
        animation: `hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
      },
    }),
  },
}

// Add keyframes to composite
composite.styles += keyFrameSlideUp;
```

### Responsive Patterns

```typescript
// Use container queries for component-level responsiveness
elementStyles: {
  element: {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      // Tablet styles
    },
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      // Desktop styles
    },
  },
}
```

### Testing Considerations

- Test all viewport sizes for responsive behavior
- Verify animations respect `prefers-reduced-motion`
- Check fallback behavior when media assets missing
- Validate theme prop combinations
- Test scroll-triggered animations in supported browsers

## Common Utilities Used

- `assets.image.background()`: Creates responsive image containers
- `assets.video.observedAutoPlay()`: Performance-optimized video playback
- `textLockup.large()`: Consistent text grouping patterns
- `ElementBuilder.styled.headline.*`: Typography components
- `ElementBuilder.styled.layout.*`: Spacing containers
- `Utils.theme.media.withViewTimelineAnimation()`: Scroll animation wrapper

## Performance Notes

- Videos use intersection observer for lazy loading
- Images scale appropriately per viewport
- Animations use CSS transforms for GPU acceleration
- Container queries scope responsive calculations
- Scroll animations use native CSS when supported