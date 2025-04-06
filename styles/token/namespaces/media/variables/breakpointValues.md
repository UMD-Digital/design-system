[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [token](../../../README.md) / [media](../README.md) / breakpointValues

# Variable: breakpointValues

> `const` **breakpointValues**: `object`

Defined in: [token/media.ts:23](https://github.com/UMD-Digital/design-system/blob/ada30a44686a89a90941bbd44a6f156101fc9b44/packages/styles/source/token/media.ts#L23)

Numeric breakpoint values in pixels.

## Type declaration

### desktop

> **desktop**: `object`

#### desktop.max

> **max**: `number` = `1199`

#### desktop.min

> **min**: `number` = `1024`

### highDef

> **highDef**: `object`

#### highDef.max

> **max**: `number` = `1499`

#### highDef.min

> **min**: `number` = `1200`

### large

> **large**: `object`

#### large.max

> **max**: `number` = `767`

#### large.min

> **min**: `number` = `650`

### maximum

> **maximum**: `object`

#### maximum.min

> **min**: `number` = `1500`

### medium

> **medium**: `object`

#### medium.max

> **max**: `number` = `649`

#### medium.min

> **min**: `number` = `480`

### small

> **small**: `object`

#### small.max

> **max**: `number` = `479`

#### small.min

> **min**: `number` = `320`

### tablet

> **tablet**: `object`

#### tablet.max

> **max**: `number` = `1023`

#### tablet.min

> **min**: `number` = `768`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.token.media.breakpointValues.desktop.min // 1024
```

## Since

1.8.0
