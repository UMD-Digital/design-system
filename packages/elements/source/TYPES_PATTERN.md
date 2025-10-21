# Type System Pattern for UMD Design System Elements

## Overview

This document defines the pattern for organizing TypeScript types across the UMD Design System elements library. The pattern balances reusability with maintainability by establishing clear guidelines for when types should be centralized vs. component-specific.

## Core Principles

1. **Shared types belong in `_types.ts`** - Types used by 3+ components
2. **Component-specific types belong in `[component]/_types.ts`** - Types unique to a component family
3. **Variant types use consistent naming** - `[Component][Variant]Props` pattern
4. **Base types enable extension** - `[Component]BaseProps` for shared component properties
5. **Type guards ensure safety** - Provide guards for runtime type checking

## Directory Structure

```
source/
├── _types.ts                    # Global shared types
├── atomic/
│   └── [component]/
│       └── _types.ts           # Atomic component family types (if needed)
└── composite/
    └── [component]/
        ├── _types.ts           # Component family types
        ├── index.ts            # Exports including types
        └── [variant].ts        # Component implementation
```

## Type Categories

### 1. Global Shared Types (`_types.ts`)

These types are used across multiple component families:

```typescript
// Element structure types
export interface ElementModel { /* ... */ }
export interface ElementVisual { /* ... */ }

// HTML element aliases
export type ContentElement = HTMLElement | null;
export type ImageElement = HTMLImageElement | null;
export type VideoElement = HTMLVideoElement | null;

// Common prop interfaces
export interface ThemeProps { /* ... */ }
export interface CommonContentProps { /* ... */ }
export interface DisplayProps { /* ... */ }
export interface StateProps { /* ... */ }
export interface SizeProps { /* ... */ }

// Type guards
export const isImageElement = (element: any): element is HTMLImageElement => { /* ... */ }
```

### 2. Component Family Types (`[component]/_types.ts`)

Types specific to a component family and its variants:

```typescript
// Import shared types
import {
  type CommonContentProps,
  type ThemeProps,
  type AssetProps,
} from '_types';

// Component-specific props
export interface ComponentAnimationProps {
  includesAnimation?: boolean;
}

// Base props for truly shared properties only
export interface ComponentBaseProps {
  // Only include props that ALL variants share
  // Don't include theme or content props here
}

// Variant-specific props - be explicit
export interface ComponentStandardProps extends
  ComponentBaseProps,
  AssetProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;  // Required
  text?: ContentElement;     // Optional  
  actions?: ContentElement;  // Optional
  // Standard variant specific props
}

export interface ComponentMinimalProps extends
  ComponentBaseProps {
  headline: ContentElement;  // Required
  text?: ContentElement;     // Optional
  // Minimal variant specific props
}
```

### 3. Implementation Pattern

Component files should follow this pattern:

```typescript
// [component]/[variant].ts
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import {
  type ElementVisual,
  type ImageElement,
  isImageElement,
} from '_types';
import { type ComponentVariantProps} from './_types';

// Constants
const CLASS_NAMES = { /* ... */ } as const;
const THEME_VALUES = { /* ... */ } as const;

// Pure functions with typed parameters
const createSubComponent = (props: Pick<ComponentVariantProps, 'needed' | 'props'>) => {
  // Implementation
};

// Main export
export default (props: ComponentVariantProps) => {
  // Implementation
};
```

## Migration Guide

### Step 1: Analyze Component Types

For each component family:
1. Identify types used across variants
2. Check if types exist in global `_types.ts`
3. Determine if component needs its own `_types.ts`

### Step 2: Create Component Types File

If component has 3+ variants or complex type needs:

```typescript
// [component]/_types.ts
import { /* shared types */ } from '_types';

// Component-specific extensions
export interface ComponentThemeProps extends ThemeProps {
  isThemeSpecial?: boolean;
}

// Base and variant interfaces
export interface ComponentBaseProps extends /* ... */ { }
export interface ComponentVariantProps extends ComponentBaseProps { }
```

### Step 3: Update Implementations

1. Replace inline interfaces with imported types
2. Use type guards for runtime checks
3. Use `Pick<Type, 'prop1' | 'prop2'>` for function parameters

### Step 4: Export Types

Update component index.ts:

```typescript
// Export components
export { default as variant1 } from './variant1';
export { default as variant2 } from './variant2';

// Export types for external use
export type {
  ComponentBaseProps,
  ComponentVariant1Props,
  ComponentVariant2Props,
} from './_types';
```

## Best Practices

### 1. Type Naming Conventions

- Base types: `[Component]BaseProps`
- Variant types: `[Component][Variant]Props`
- Internal types: `[Component][Purpose]Props`
- Theme extensions: `[Component]ThemeProps`

### 2. Type Composition

Be explicit about which properties each component variant needs:

```typescript
// Good - Explicit about what properties are needed
interface CardBlockProps extends 
  CardMediaProps,
  CardEventProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;  // Required
  text?: ContentElement;     // Optional
  actions?: ContentElement;  // Optional
  eyebrow?: ContentElement;  // Optional
  date?: ContentElement;     // Optional
  hasBorder?: boolean;
  isTransparent?: boolean;
}

// Avoid - Too generic, hides what's actually needed
interface CardBlockProps extends 
  Partial<CommonContentProps>,
  ThemeProps {
  hasBorder?: boolean;
  isTransparent?: boolean;
}
```

When extending shared interfaces:
- Only extend full interfaces when you need ALL properties
- Use `Pick<Interface, 'prop1' | 'prop2'>` to select specific properties
- Be explicit about required vs optional properties
- Don't use complex type gymnastics that obscure what's actually needed

### 3. Type Guards Usage

Always use type guards for nullable types:

```typescript
// Good
if (image && isImageElement(image)) {
  const imageAsset = createImageAsset(image);
}

// Avoid
if (image instanceof HTMLImageElement) {
  const imageAsset = createImageAsset(image);
}
```

### 4. Function Parameter Types

Use Pick for focused function signatures:

```typescript
// Good
const createHeadline = (props: Pick<ComponentProps, 'headline' | 'theme'>) => {
  const { headline, theme } = props;
  // ...
};

// Avoid
const createHeadline = (props: ComponentProps) => {
  // Function only uses 2 properties from 10+ in ComponentProps
};
```

## Examples

### Card Component Pattern

```typescript
// card/_types.ts
import { 
  type ContentElement,
  type ImageElement,
  type LinkElement,
  type ThemeProps 
} from '_types';

export enum CardVariant {
  Block = 'block',
  List = 'list',
  Overlay = 'overlay',
}

// Media and event props shared by multiple variants
export interface CardMediaProps {
  image?: ImageElement | LinkElement;
  isAligned?: boolean;
}

export interface CardEventProps {
  eventMeta?: { element: HTMLElement; styles: string; };
  dateSign?: { element: HTMLElement; styles: string; };
}

// Each variant explicitly declares what it needs
export interface CardBlockProps extends 
  CardMediaProps,
  CardEventProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;   // Required
  text?: ContentElement;      // Optional
  actions?: ContentElement;   // Optional
  eyebrow?: ContentElement;   // Optional
  date?: ContentElement;      // Optional
  newsId?: string;
  hasBorder?: boolean;
  hasEyebrowRibbon?: boolean;
  isTransparent?: boolean;
}

export interface CardListProps extends
  CardMediaProps,
  CardEventProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;   // Required
  text?: ContentElement;      // Optional
  actions?: ContentElement;   // Optional
  eyebrow?: ContentElement;   // Optional
  date?: ContentElement;      // Optional
}

export interface CardOverlayProps extends
  CardEventProps,
  Pick<ThemeProps, 'isThemeDark' | 'isThemeLight'> {
  headline: ContentElement;   // Required
  text?: ContentElement;      // Optional
  actions?: ContentElement;   // Optional
  eyebrow?: ContentElement;   // Optional
  date?: ContentElement;      // Optional
  ctaIcon?: ContentElement;
  backgroundImage?: ImageElement | LinkElement;
  isQuote?: boolean;
}
```

### Banner Component Pattern

```typescript
// banner/_types.ts (if needed)
import { type CommonContentProps, type ThemeProps } from '_types';

export interface BannerBaseProps extends CommonContentProps, ThemeProps {
  includesAnimation?: boolean;
}

export interface BannerStandardProps extends BannerBaseProps {
  isFixed?: boolean;
}
```

## Checklist for New Components

- [ ] Identify shared vs. specific types
- [ ] Check global `_types.ts` for existing interfaces
- [ ] Create component `_types.ts` if needed (3+ variants)
- [ ] Use consistent naming patterns
- [ ] Implement type guards for nullable types
- [ ] Export types from index.ts
- [ ] Document complex type relationships

## Type Complexity Guidelines

### When to Create Component Types File

Create `[component]/_types.ts` when:
- Component has 3+ variants
- Complex type relationships exist
- Types are reused within component family
- External packages need type definitions

### When to Use Inline Types

Use inline types when:
- Component has 1-2 simple variants
- Types are variant-specific
- No external type consumption needed
- Types are simple extensions of shared types

## Maintenance

### Regular Review

1. Quarterly review of type usage
2. Consolidate duplicated types
3. Move frequently used types to global
4. Remove unused type definitions

### Documentation

1. Document complex type relationships
2. Provide examples for type usage
3. Note breaking changes in types
4. Maintain this pattern guide