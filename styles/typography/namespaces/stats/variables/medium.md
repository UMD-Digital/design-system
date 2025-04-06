[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [stats](../README.md) / medium

# Variable: medium

> `const` **medium**: `object`

Defined in: [typography/stats.ts:66](https://github.com/UMD-Digital/design-system/blob/8c958a0419ab79ba8bcba0aabd12f79a69ac5834/packages/styles/source/typography/stats.ts#L66)

Medium statistic typography style with responsive scaling.

## Type declaration

## Index Signature

\[`key`: `string`\]: `string` \| \{ `fontSize`: `string`; \}

### fontFamily

> **fontFamily**: `string`

### fontSize

> **fontSize**: `string`

### fontStyle

> **fontStyle**: `string` = `'italic'`

### fontWeight

> **fontWeight**: `string`

### lineHeight

> **lineHeight**: `string` = `'1'`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
// Use in object spread syntax
const myStyle = { ...Styles.typography.stats.medium };
```

## Since

1.8.0
