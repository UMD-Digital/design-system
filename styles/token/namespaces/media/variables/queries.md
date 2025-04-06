[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [token](../../../README.md) / [media](../README.md) / queries

# Variable: queries

> `const` **queries**: `object`

Defined in: [token/media.ts:100](https://github.com/UMD-Digital/design-system/blob/8c958a0419ab79ba8bcba0aabd12f79a69ac5834/packages/styles/source/token/media.ts#L100)

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
