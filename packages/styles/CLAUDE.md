# CLAUDE.md - Styles Package

## Package Overview

The **Styles Package** (`@universityofmaryland/web-styles-library`) provides JSS (JavaScript Style Sheets) objects, design tokens, and CSS utilities for the UMD Design System. All styles are JavaScript objects that can be transformed to CSS.

**Version**: 1.7.2
**Dependencies**: `postcss`, `postcss-discard-duplicates`, `postcss-js`, `postcss-nesting`

## Static CSS Exports

**Status**: Implemented in v1.8.0+

The styles package now provides pre-compiled CSS files generated at build time. This eliminates the need for runtime CSS compilation and improves performance.

### Usage

```typescript
// Full bundle (includes tokens + all styles)
import '@universityofmaryland/web-styles-library/css/styles.min.css';

// Or import only what you need (tokens required first)
import '@universityofmaryland/web-styles-library/css/tokens.min.css';
import '@universityofmaryland/web-styles-library/css/typography.min.css';
import '@universityofmaryland/web-styles-library/css/layout.min.css';
```

### Available CSS Files

| File | Description | Requires Tokens |
|------|-------------|-----------------|
| `styles.min.css` | Full bundle (includes tokens) | No |
| `tokens.min.css` | CSS custom properties for design tokens | - |
| `base.min.css` | Root and reset styles | Yes |
| `typography.min.css` | Typography utility classes | Yes |
| `layout.min.css` | Layout and grid utility classes | Yes |
| `element.min.css` | Element styles (buttons, forms, etc.) | Yes |
| `animation.min.css` | Animation utility classes | Yes |
| `accessibility.min.css` | Screen reader and a11y utilities | Yes |
| `web-components.min.css` | Web component styles | Yes |

### Benefits

- **Faster initial page load**: No runtime JSS compilation
- **Better SSR compatibility**: CSS loads immediately without JavaScript
- **Improved Core Web Vitals**: Reduced JavaScript execution time
- **Category-based loading**: Import only what you need

### CSS Custom Properties

The `tokens.min.css` file defines CSS custom properties for all design tokens:

```css
:root {
  --umd-color-red: #E21833;
  --umd-color-gold: #FFD200;
  --umd-space-md: 24px;
  --umd-font-size-base: 16px;
  /* ... all tokens */
}
```

These variables enable runtime theming and are required by category CSS files.

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Special Build**: CDN bundle (IIFE format) via `build:cdn` script
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true` for granular imports

### Build Commands

```bash
npm run build      # Main build + CDN build + CSS generation
npm run build:cdn  # CDN-only build (IIFE format)
npm run build:css  # Generate static CSS files from JSS
npm run dev        # Watch mode
npm run clean      # Remove dist
npm test          # Run all tests
```

### Special Builds

The styles package creates THREE builds:

1. **Module Build** (`vite build`): Code-split ES modules only (no CommonJS)
2. **CDN Build** (`BUILD_CDN=true vite build`): Single-file IIFE bundle for `<script>` tags
3. **CSS Build** (`npm run build:css`): Static CSS files generated from JSS modules

The CSS build runs after the module build and uses the `scripts/generate-css.ts` script to:
- Import the built JS modules
- Convert JSS objects to CSS using existing utilities
- Generate minified CSS files in `dist/css/`

## Package Structure

### Source Organization

```
source/
├── accessibility/  # Accessibility-focused styles
├── animation/      # Animation keyframes and utilities
├── element/        # Element-specific styles (buttons, forms, etc.)
├── layout/         # Layout utilities (grid, flex, etc.)
├── token/          # Design tokens (colors, spacing, fonts, media)
├── typography/     # Typography styles and font faces
├── utilities/      # Style transformation utilities
└── web-components/ # Web component-specific styles
```

### Export Pattern

```typescript
// Namespace import (recommended for JSS modules)
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';

// Named exports from main
import { token, layout } from '@universityofmaryland/web-styles-library';

// Use tokens
const myStyles = {
  color: token.color.red,
  padding: token.spacing.md
};
```

## package.json Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./token": {
      "types": "./dist/token.d.ts",
      "import": "./dist/token.js"
    }
    // ... other categories
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## JSS Pattern

All styles are JavaScript objects:

```typescript
export const myStyle = {
  className: 'my-class',
  color: 'red',
  '&:hover': { color: 'blue' }
};
```

## Composable Style Pattern

The styles package uses a **composable function pattern** to enable dynamic style generation while maintaining backwards compatibility with static exports. This pattern allows consumers to generate custom style combinations not covered by predefined exports.

### What is the Composable Pattern?

The composable pattern consists of:
1. **TypeScript Interface**: Defines available options (e.g., `size`, `theme`, `color`)
2. **Compose Function**: Generates JSS objects dynamically based on options
3. **Static Exports**: Pre-configured exports using the compose function for backwards compatibility
4. **Deprecated Aliases**: Maintains old className values for migration support

### Example Implementation

```typescript
// 1. Define options interface
export interface PrimaryOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white';
}

// 2. Create compose function
export function composePrimary(options?: PrimaryOptions): JssObject {
  const { size = 'normal', color = 'default' } = options || {};

  let composed: Record<string, any> = { ...baseStyles };

  if (size === 'large') {
    composed = { ...composed, fontSize: font.size.lg };
  }

  if (color === 'white') {
    composed = { ...composed, color: color.white };
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: [`${classNamePrefix}-${size}-${color}`, 'deprecated-alias'],
  });
}

// 3. Maintain static exports
export const normal: JssObject = composePrimary();
export const large: JssObject = composePrimary({ size: 'large' });
export const white: JssObject = composePrimary({ color: 'white' });
```

### Where Composable Pattern is Implemented

#### ✅ Element Styles
- **`element/text/rich.ts`**: `composeSimple()`, `composeAdvanced()` - Rich text with size, theme, and scaling options
- **`element/text/cluster.ts`**: `composePill()` - Pill/tag lists with theme variants
- **`element/text/decoration.ts`**: `composeWatermark()` - Watermark with theme variants
- **`element/text/line.ts`**: `composeTrailing()`, `composeAdjacent()` - Line decorations with theme and inset options
- **`element/text/link.ts`**: `composeLink()` - Links with color variants
- **`element/action/primary.ts`**: `composePrimary()` - Primary buttons with size and color options
- **`element/action/secondary.ts`**: `composeSecondary()` - Secondary buttons with size and color options
- **`element/action/outline.ts`**: `composeOutline()` - Outline buttons with size and color options
- **`element/action/icon.ts`**: `composeIcon()` - Icon buttons with theme variants
- **`element/asset/image.ts`**: `composeWrapper()`, `composeAspect()` - Image wrappers and aspect ratios

#### ✅ Layout Styles
- **`layout/background/full.ts`**: `composeFull()` - Full backgrounds with theme variants
- **`layout/background/highlight.ts`**: `composeHighlight()` - Highlight boxes with color options
- **`layout/background/quarter.ts`**: `composeQuarter()` - Quarter backgrounds with theme variants
- **`layout/background/wrap.ts`**: `composeWrap()` - Wrap backgrounds with color options
- **`layout/grid/base.ts`**: `composeColumns()` - Grid columns (2, 3, 4)
- **`layout/grid/border.ts`**: `composeBordered()` - Bordered grids with column count and theme options
- **`layout/grid/gap.ts`**: `composeGap()` - Gap grids with columns, size, and centered options
- **`layout/space/horizontal.ts`**: `composeHorizontal()` - Horizontal spacing with width variants

### When to Use the Composable Pattern

Use composable functions when a file has **style variants** that share a common base structure with configurable options. Good candidates have:

#### ✅ Criteria for Composable Pattern
1. **Multiple Related Variants**: 3+ exports that are variations of the same pattern
2. **Shared Base Structure**: All variants use the same foundational styles
3. **Limited Variable Properties**: Only 1-3 properties differ between variants (size, color, theme)
4. **Clear Progressive Scale**: Variants follow logical progression (small → medium → large)
5. **Repetitive Code**: Multiple exports with near-identical structure
6. **Future Flexibility**: Users may need combinations not currently exported

#### ✅ Good Candidates Examples

**Primary Buttons** (`element/action/primary.ts`):
- ✅ Multiple variants: normal, large, white, large-white
- ✅ Shared base: All share button base styles
- ✅ Variable properties: size (2 values), color (2 values)
- ✅ Clear combinations: 2×2 = 4 possible variants
- ✅ Repetitive code: Each variant nearly identical except size/color

**Grid Borders** (`layout/grid/border.ts`):
- ✅ Multiple variants: 3 column counts × 2 themes = 6 variants
- ✅ Shared base: All share grid base and border structure
- ✅ Variable properties: columns (2/3/4), theme (light/dark)
- ✅ Eliminated duplicate file: Consolidated border-dark.ts (~175 lines removed)

**Horizontal Spacing** (`layout/space/horizontal.ts`):
- ✅ Multiple variants: 6 width options (smallest → full)
- ✅ Shared base: All share lockBase with responsive padding
- ✅ Variable properties: Only maxWidth differs
- ✅ Progressive scale: Clear size progression
- ✅ Reduced lines: ~150 lines → composable function pattern

### When NOT to Use the Composable Pattern

Avoid composable functions when exports serve **fundamentally different purposes** or have **unique structural differences**. Poor candidates have:

#### ❌ Criteria Against Composable Pattern
1. **Semantically Different Exports**: Each export serves a distinct purpose
2. **Unique Base Structures**: Exports have different foundational styles
3. **Multiple Varying Properties**: Many properties differ (not just 1-3)
4. **No Clear Combinations**: Variants don't logically combine
5. **Simple Single Exports**: Only 1-2 simple exports
6. **Context-Specific Values**: Each variant optimized for specific use case

#### ❌ Poor Candidates Examples

**Vertical Spacing** (`layout/space/vertical.ts`):
- ❌ Semantically different: landing vs interior vs headline (different contexts)
- ❌ Unique values: Each optimized for specific layout purpose
- ❌ Parent vs child: Different spacing for containers vs children
- ❌ No combinations: Users wouldn't mix landing + interior spacing

**Column Layouts** (`layout/space/columns.ts`):
- ❌ Fundamentally different: left sidebar hides on mobile, right sidebar stacks
- ❌ Unique structures: Different widths (242px vs 322px), different responsive behavior
- ❌ Different purposes: Navigation sidebar vs content sidebar
- ❌ No shared pattern: Not variants of same layout

**Event Elements** (`element/event/`):
- ❌ Unique exports: `meta.ts` and `sign.ts` are completely different elements
- ❌ No variants: Each file provides single-purpose styles
- ❌ No combinations: Event metadata and event signage are unrelated

**Simple Text Styles** (`element/text/caption.ts`, `code.ts`, `label.ts`, `quote.ts`):
- ❌ Single exports: Each file provides one simple style
- ❌ No variants: No size/theme/color options needed
- ❌ Unique purposes: Caption, code block, label, and quote serve different roles

### Decision Matrix

Use this quick reference when evaluating if a file should use the composable pattern:

| Question | Yes = Composable | No = Keep Simple |
|----------|------------------|------------------|
| **Are there 3+ related exports?** | ✅ Primary buttons (4) | ❌ Caption (1) |
| **Do exports share base structure?** | ✅ All buttons share baseButton | ❌ Left/right columns differ |
| **Do only 1-3 properties vary?** | ✅ Size + color | ❌ Many properties differ |
| **Would users need custom combinations?** | ✅ large + gold button | ❌ Can't mix landing + interior |
| **Is there repetitive code?** | ✅ ~150 lines → compose | ❌ Each export unique |
| **Do variants serve same purpose?** | ✅ All are buttons | ❌ Meta vs sign different |

**Rule of Thumb**: If you're copying and pasting code to create a new variant, use the composable pattern. If each export requires unique implementation, keep them separate.

### Benefits of Composable Pattern

1. **Runtime Flexibility**: Consumers can generate combinations not in static exports
2. **Reduced Code**: Eliminate duplicate style definitions (~150+ lines per file)
3. **Type Safety**: TypeScript interfaces provide autocomplete and validation
4. **Future-Proof**: Easy to add new options without breaking changes
5. **Backwards Compatible**: Static exports maintained for existing code
6. **Testing**: Single compose function easier to test than multiple exports
7. **Consolidation**: Can eliminate duplicate files (e.g., border.ts + border-dark.ts)

### Implementation Guidelines

When creating a new composable function:

1. **Define Interface**: Create TypeScript interface with all options
2. **Set Defaults**: Use sensible defaults for all optional parameters
3. **Build Composed Object**: Start with base styles, layer variants
4. **Generate className**: Build className from option values
5. **Preserve Deprecated Aliases**: Include old className values
6. **Maintain Static Exports**: Keep all existing exports using compose function
7. **Document Examples**: Provide JSDoc examples showing usage
8. **Test All Combinations**: Ensure all option combinations work correctly

### Migration Pattern

When converting existing files to composable:

```typescript
// BEFORE: Multiple separate exports
export const buttonNormal = { ...baseButton, fontSize: '16px', className: 'btn' };
export const buttonLarge = { ...baseButton, fontSize: '20px', className: 'btn-lg' };
export const buttonWhite = { ...baseButton, color: 'white', className: 'btn-white' };

// AFTER: Composable function + static exports
export interface ButtonOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white';
}

export function composeButton(options?: ButtonOptions): JssObject {
  const { size = 'normal', color = 'default' } = options || {};
  // ... composition logic
}

export const buttonNormal = composeButton();
export const buttonLarge = composeButton({ size: 'large' });
export const buttonWhite = composeButton({ color: 'white' });
```

## Design Tokens

Centralized design system values:

### Token Categories
- **Colors**: `token.color.red`, `token.color.gray.dark`
- **Spacing**: `token.spacing.sm`, `token.spacing.maxWidth.small`
- **Typography**: `token.font.family.sans`, `token.font.size.lg`
- **Media Queries**: `token.media.min.desktop` (Mobile: 0-767px, Tablet: 768-1023px, Desktop: 1024px+)

## CDN Build

The CDN build bundles everything into a single IIFE file:

```html
<script src="https://cdn.example.com/styles/cdn.js"></script>
<script>
  const { token, layout } = window.Styles;
</script>
```

**Use Case**: Quick prototyping or legacy integrations without build tools

## Testing

- **Framework**: Jest with TypeScript
- **Location**: `source/__tests__/`
- **Test Pattern**: Snapshot testing for CSS output consistency

## Best Practices

1. **Use Namespace Imports**: JSS modules export objects, not primitives
   - ✅ `import * as token from '.../ token'`
   - ❌ `import token from '.../token'`  (no default export)

2. **Design Tokens First**: Use tokens before custom values
3. **Transform Before Use**: Convert JSS to CSS using utilities package
4. **Type Safety**: Leverage TypeScript for autocomplete
5. **Use Composable Functions**: When available, use compose functions for dynamic combinations
   - ✅ `composePrimary({ size: 'large', color: 'white' })` for runtime flexibility
   - ✅ Static exports (`primary.large`) for simple cases
   - See **Composable Style Pattern** section for implementation guidelines

## Build Output

### Module Build
- `dist/index.{js,d.ts}` - Main export (ES module only)
- `dist/{category}.{js,d.ts}` - Category exports
- `dist/{category}/{module}.{js,d.ts}` - Individual modules

### CDN Build
- `dist/cdn.js` - Single IIFE bundle (no externals)

### CSS Build
- `dist/css/tokens.min.css` - CSS custom properties for design tokens
- `dist/css/styles.min.css` - Full bundle (includes tokens + all styles)
- `dist/css/base.min.css` - Root and reset styles
- `dist/css/typography.min.css` - Typography utility classes
- `dist/css/layout.min.css` - Layout and grid utility classes
- `dist/css/element.min.css` - Element styles (buttons, forms, etc.)
- `dist/css/animation.min.css` - Animation utility classes
- `dist/css/accessibility.min.css` - Screen reader and a11y utilities
- `dist/css/web-components.min.css` - Web component styles

## Utilities Integration

The styles package provides JSS objects. Use the utilities package to convert them:

```typescript
import * as token from '@universityofmaryland/web-styles-library/token';
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';

const css = convertJSSObjectToStyles({
  styleObj: {
    '.my-class': {
      color: token.color.red
    }
  }
});
```

## Notes

- JSS enables dynamic, type-safe styling
- All values are JavaScript - no CSS parsing needed
- PostCSS processes output for nesting and optimization
- CDN build is self-contained with no external dependencies
- **Composable pattern** used throughout for flexible, maintainable style generation
- When evaluating new styles, consider if composable pattern applies (see decision matrix above)
