[**UMD Styles Library**](../../../../README.md)

***

[UMD Styles Library](../../../../README.md) / [typography](../../../README.md) / [elements](../README.md) / interativeMedium

# Variable: interativeMedium

> `const` **interativeMedium**: `object`

Medium interactive typography style with responsive scaling.

## Type declaration

## Index Signature

\[`key`: `string`\]: `string` \| \{ `fontSize`: `string`; `fontWeight`: `undefined`; `letterSpacing`: `undefined`; `lineHeight`: `undefined`; \} \| \{ `fontSize`: `string`; `fontWeight`: `string`; `letterSpacing`: `string`; `lineHeight`: `string`; \}

### fontFamily

> **fontFamily**: `string`

### fontSize

> **fontSize**: `string`

### lineHeight

> **lineHeight**: `string`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
// Use in object spread syntax
const myStyle = { ...Styles.typography.elements.interativeMedium };
```

## Since

1.8.0
