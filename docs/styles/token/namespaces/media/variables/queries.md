[**UMD Styles Library**](../../../../README.md)

***

[UMD Styles Library](../../../../README.md) / [token](../../../README.md) / [media](../README.md) / queries

# Variable: queries

> `const` **queries**: `object`

Complete media query strings ready for use in CSS.

## Type declaration

### desktop

> **desktop**: `object`

#### desktop.max

> **max**: `string`

#### desktop.min

> **min**: `string`

### highDef

> **highDef**: `object`

#### highDef.max

> **max**: `string`

#### highDef.min

> **min**: `string`

### large

> **large**: `object`

#### large.max

> **max**: `string`

#### large.min

> **min**: `string`

### maximum

> **maximum**: `object`

#### maximum.min

> **min**: `string`

### medium

> **medium**: `object`

#### medium.max

> **max**: `string`

#### medium.min

> **min**: `string`

### small

> **small**: `object`

#### small.max

> **max**: `string`

#### small.min

> **min**: `string`

### tablet

> **tablet**: `object`

#### tablet.max

> **max**: `string`

#### tablet.min

> **min**: `string`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
// Use in JSS/CSS-in-JS
const styles = {
  [`@media (${Styles.token.media.queries.desktop.min})`]: {
    // Desktop-specific styles
  }
};
```

## Since

1.8.0
