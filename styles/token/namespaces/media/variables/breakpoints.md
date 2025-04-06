[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [token](../../../README.md) / [media](../README.md) / breakpoints

# Variable: breakpoints

> `const` **breakpoints**: `object`

Defined in: [token/media.ts:50](https://github.com/UMD-Digital/design-system/blob/ada30a44686a89a90941bbd44a6f156101fc9b44/packages/styles/source/token/media.ts#L50)

Breakpoint values with 'px' units for CSS usage.

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
Styles.token.media.breakpoints.desktop.min // "1024px"
```

## Since

1.8.0
