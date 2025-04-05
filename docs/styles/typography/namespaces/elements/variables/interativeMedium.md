[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [elements](../README.md) / interativeMedium

# Variable: interativeMedium

> `const` **interativeMedium**: `object`

Defined in: [typography/elements.ts:110](https://github.com/UMD-Digital/design-system/blob/8021d9898368f604bce452fe4dde6fae3a0578fd/packages/styles/source/typography/elements.ts#L110)

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
