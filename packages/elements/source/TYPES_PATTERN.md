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

// Base props for all variants
export interface ComponentBaseProps extends
  CommonContentProps,
  ThemeProps {
  // Common props for all variants
}

// Variant-specific props
export interface ComponentStandardProps extends
  ComponentBaseProps,
  AssetProps {
  // Standard variant specific props
}

export interface ComponentMinimalProps extends
  ComponentBaseProps {
  // Minimal variant specific props
}
```

### 3. Implementation Pattern

Component files should follow this pattern:

```typescript
// [component]/[variant].ts
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { ElementModel } from 'model';
import {
  type ElementVisual,
  type ImageElement,
  isImageElement,
} from '_types';
import { type ComponentVariantProps } from './_types';

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

Prefer composition over duplication:

```typescript
// Good
interface CardProps extends CommonContentProps, ThemeProps {
  category?: ContentElement;
}

// Avoid
interface CardProps {
  headline?: HTMLElement | null;  // Duplicates CommonContentProps
  text?: HTMLElement | null;      // Duplicates CommonContentProps
  category?: HTMLElement | null;
}
```

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
import { type CommonContentProps, type ThemeProps } from '_types';

export enum CardVariant {
  Block = 'block',
  List = 'list',
  Overlay = 'overlay',
}

export interface CardBaseProps extends CommonContentProps, ThemeProps {
  link?: LinkElement;
  category?: ContentElement;
}

export interface CardBlockProps extends CardBaseProps {
  isFeature?: boolean;
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