# CLAUDE.md - Pathway Component

This file provides guidance to Claude Code when working with the pathway composite element in the UMD Design System.

## Component Overview

The pathway component is a versatile content container designed for showcasing sequential information, image galleries, and highlighted content sections. It provides multiple variants for different presentation needs, from simple text-based pathways to complex interactive layouts with images and overlays.

## Architecture

### File Structure
```
pathway/
├── _types.ts          - TypeScript interfaces for all pathway variants (to be created)
├── index.ts           - Main exports and type re-exports
├── standard.ts        - Standard pathway with text and optional image
├── hero.ts            - Hero-style pathway with prominent display
├── highlight.ts       - Highlighted pathway with emphasis styling
├── overlay.ts         - Pathway with overlay effects on media
├── sticky.ts          - Sticky pathway with scroll-based positioning
└── elements/          - Shared pathway element components
    ├── index.ts       - Element exports
    ├── text.ts        - Text content elements
    └── image.ts       - Image display elements
```

### Type System (To Be Implemented)

Following the hero component pattern, pathway variants will use a composable type system:

- **Base Interfaces**: Shared properties grouped by concern
  - `PathwayContentProps`: Text content and headline properties
  - `PathwayMediaProps`: Image and media configuration
  - `PathwayLayoutProps`: Layout and alignment options
  - `PathwayInteractionProps`: Interactive behavior configuration

- **Variant Interfaces**: Each variant will explicitly extend only needed base interfaces
  - Uses `Pick<Interface, 'prop'>` for selective property inheritance
  - Clear distinction between required and optional properties per variant

### Common Patterns

#### Content Structure
All pathway variants support flexible content arrangements:
- Text content with headline and description support
- Image integration with various positioning options
- Link and action button placement
- Sequential numbering for step-based content

#### Layout Options
Pathways adapt to different layout needs:
- Side-by-side layouts for text and media
- Stacked layouts for mobile-first design
- Overlay configurations for visual impact
- Grid arrangements for multi-item displays

#### Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoints: Mobile (< 768px), Tablet (768-1023px), Desktop (1024px+)
- Flexible image sizing and positioning per viewport

## Component Variants

### Standard Pathway (`standard.ts`)
Default pathway with flexible content arrangement
- **Features**: 
  - Text and optional image side-by-side
  - Configurable image position (left/right)
  - Responsive stacking on mobile
  - Theme-aware styling

### Hero Pathway (`hero.ts`)
Prominent pathway for featured content
- **Features**:
  - Large-scale presentation
  - Background media support
  - Emphasized typography
  - Call-to-action integration

### Highlight Pathway (`highlight.ts`)
Pathway with visual emphasis and accent styling
- **Features**:
  - Colored accent borders or backgrounds
  - Highlighted text sections
  - Number or icon indicators
  - Theme-based color schemes

### Overlay Pathway (`overlay.ts`)
Media-focused pathway with text overlays
- **Features**:
  - Text positioned over images
  - Gradient overlays for readability
  - Hover interactions
  - Flexible overlay positioning

### Sticky Pathway (`sticky.ts`)
Scroll-aware pathway with sticky positioning
- **Features**:
  - Sticky content during scroll
  - Progressive reveal animations
  - Fixed sidebars or headers
  - Scroll progress indicators

### Shared Elements (`elements/`)

#### Text Element (`elements/text.ts`)
Reusable text content structure for pathways
- Consistent typography patterns
- Headline and description grouping
- Link and action integration

#### Image Element (`elements/image.ts`)
Image display component for pathway variants
- Responsive image handling
- Aspect ratio management
- Loading optimization
- Placeholder support

## Implementation Guidelines

### Element Model Migration

All pathway components will follow the Element Model pattern:

```typescript
// Structure following Element Model
import * as ElementModel from 'model';
import * as Utils from 'utilities';
import * as Atomic from 'atomic';

// Constants
const CLASS_NAMES = {
  CONTAINER: 'pathway-container',
  CONTENT: 'pathway-content',
  // ...
} as const;

// Use ElementModel.create()
export default (props: PathwayProps) => {
  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.CONTAINER,
    children: [
      // Leverage atomic components
      Atomic.text.headline({ ... }),
      Atomic.layout.container({ ... }),
    ],
    elementStyles: {
      // CSS-in-JS styles
    },
  });
};
```

### Atomic Component Integration

Leverage existing atomic components:
- `atomic/text-lockup/` for text groupings
- `atomic/assets/` for images and icons
- `atomic/layout/` for spacing and containers
- `atomic/buttons/` for actions

### Style Management

Follow CSS-in-JS patterns with the Element Model:
- Define styles as objects in `elementStyles`
- Use design tokens from `@universityofmaryland/web-styles-library`
- Include responsive styles using media query objects
- Maintain theme awareness through props

## Common Utilities Used

- `textLockup.*`: Text grouping patterns from atomic
- `assets.image.*`: Image handling from atomic
- `layout.container()`: Layout containers from atomic
- `ElementModel.create()`: Element creation helper
- `Utils.markup.*`: DOM manipulation utilities

## Testing Considerations

- Test responsive behavior across all breakpoints
- Verify image loading and placeholder behavior
- Check theme prop combinations
- Validate accessibility attributes
- Test sticky behavior across browsers
- Ensure proper cleanup with destroy methods

## Performance Notes

- Images use lazy loading where appropriate
- Styles are scoped to prevent conflicts
- DOM updates batch through Element Model
- Event handlers properly cleaned up
- Minimal re-renders through update methods