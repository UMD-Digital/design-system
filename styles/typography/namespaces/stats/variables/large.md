[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [stats](../README.md) / large

# Variable: large

> `const` **large**: `object`

Defined in: [typography/stats.ts:34](https://github.com/UMD-Digital/design-system/blob/ed6189804bf5f4c4fcbe5325b54aac33ac48d614/packages/styles/source/typography/stats.ts#L34)

Large statistic typography style with responsive scaling.

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
const myStyle = { ...Styles.typography.stats.large };
```

## Since

1.8.0
