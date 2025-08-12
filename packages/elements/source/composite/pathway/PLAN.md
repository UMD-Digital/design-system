# PLAN - Pathway Component Migration to Element Model

This document outlines the migration strategy for converting the pathway components from direct DOM manipulation to the Element Model pattern, following the successful hero component migration.

## Migration Overview

Each pathway element will be updated to:
1. Use `ElementModel.create()` for DOM construction
2. Leverage atomic components from the `atomic/` directory
3. Simplify TypeScript interfaces without excessive extending
4. Organize constants using the `as const` pattern
5. Structure files consistently (imports → interfaces → constants → functions → export)

## File Migration Order

### Phase 1: Type System Setup
**File**: Create `_types.ts`
- Define base interfaces for shared properties
- Create variant-specific interfaces using `Pick<>` pattern
- Avoid `Partial<>` and excessive inheritance
- Make required vs optional properties explicit

### Phase 2: Leverage Existing Atomic Elements
**Atomic Components to Use**:
- `/source/atomic/assets` - For image and video handling and display
- `/source/atomic/text-lockup` - For text groupings and layouts

**Enhancement Required**:
- Extend `atomic/text-lockup/medium` to support:
  - Event details (date, time, location)
  - Stats display (numbers, metrics)
  - Additional metadata fields
- These enhancements will benefit other components beyond pathway

### Phase 3: Core Variants Migration (Simple → Complex)

#### 3.1 Standard Pathway (`standard.ts`)
**Current State**:
- Manual DOM creation with string concatenation
- Complex style strings
- Direct element manipulation

**Migration Tasks**:
- Replace DOM creation with `ElementModel.create()`
- Use atomic components:
  - `atomic/text-lockup/large` for headlines
  - `atomic/assets/image` for images
  - `atomic/layout/container` for spacing
- Convert styles to `elementStyles` object
- Organize constants (CLASS_NAMES, THEME_VALUES)
- Simplify TypePathwayDefaultProps interface

#### 3.2 Hero Pathway (`hero.ts`)
**Migration Tasks**:
- Implement Element Model structure
- Integrate atomic components for prominent display
- Add background media support using `assets.image.background()`
- Use `textLockup.large()` for emphasized typography

#### 3.3 Highlight Pathway (`highlight.ts`)
**Migration Tasks**:
- Convert accent styling to elementStyles
- Use atomic components for numbered/icon indicators
- Implement theme-aware color schemes
- Simplify interaction with Element Model events

#### 3.4 Overlay Pathway (`overlay.ts`)
**Migration Tasks**:
- Migrate overlay positioning to CSS-in-JS
- Use `assets.image` with proper gradient overlays
- Implement hover states through elementStyles
- Convert animations to keyframe strings

#### 3.5 Sticky Pathway (`sticky.ts`)
**Migration Tasks**:
- Complex scroll behavior using Element Model
- Implement sticky positioning through elementStyles
- Add scroll progress indicators
- Use `Utils.theme.media.withViewTimelineAnimation()` if needed

## Implementation Pattern

### Before (Current Pattern)
```typescript
// Complex inheritance and manual DOM
type TypePathwayDefaultProps = TypePathwayTextContainer &
  TypePathwayImageContainer & { ... };

const element = document.createElement('div');
element.classList.add(PATHWAY_DEFAULT_CONTAINER);
element.setAttribute(ATTRIBUTE_IMAGE_POSITION, position);
element.innerHTML = `...`;
```

### After (Element Model Pattern)
```typescript
// Simplified, explicit interfaces
interface PathwayStandardProps extends 
  Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;      // Required
  text?: ContentElement;         // Optional
  image?: ImageElement;
  imagePosition?: 'left' | 'right';
  includesAnimation?: boolean;
}

// Constants organization
const CLASS_NAMES = {
  CONTAINER: 'pathway-standard-container',
  WRAPPER: 'pathway-standard-wrapper',
  LOCK: 'pathway-standard-lock',
} as const;

const THEME_VALUES = {
  MAX_WIDTH: {
    MEDIUM: '800px',
    LARGE: '1200px',
  },
} as const;

// Element Model creation
export default (props: PathwayStandardProps) => {
  const children = [
    props.image && Atomic.assets.image({
      src: props.image.src,
      alt: props.image.alt,
    }),
    Atomic.textLockup.large({
      headline: props.headline,
      text: props.text,
    }),
  ].filter(Boolean);

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.CONTAINER,
    children,
    elementStyles: {
      element: {
        display: 'flex',
        gap: Styles.token.spacing.xl,
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          flexDirection: props.imagePosition === 'left' ? 'row' : 'row-reverse',
        },
      },
    },
  });
};
```

## Testing Strategy

### For Each Migrated Component:
1. Verify DOM structure matches original
2. Test responsive behavior at all breakpoints
3. Validate prop combinations
4. Check animation behavior (if applicable)
5. Ensure destroy() method cleans up properly
6. Test update() method functionality

### Test Files to Update:
- Update existing tests to work with Element Model
- Add tests for new atomic component integration
- Verify style output consistency

## Success Criteria

✅ All pathway variants use Element Model  
✅ Atomic components integrated where applicable  
✅ TypeScript interfaces simplified and explicit  
✅ Files follow consistent structure pattern  
✅ All tests passing  
✅ No breaking changes to public API  
✅ Performance maintained or improved  

## Notes

- Maintain backward compatibility - external API should remain the same
- Document any discovered edge cases
- Consider creating shared utility functions for common patterns
- Follow the hero component as a reference implementation
- Prioritize readability and maintainability over cleverness