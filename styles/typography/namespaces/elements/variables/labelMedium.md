[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [elements](../README.md) / labelMedium

# Variable: labelMedium

> `const` **labelMedium**: `object`

Defined in: [typography/elements.ts:58](https://github.com/UMD-Digital/design-system/blob/8c958a0419ab79ba8bcba0aabd12f79a69ac5834/packages/styles/source/typography/elements.ts#L58)

Medium label typography style with responsive scaling.

## Type declaration

## Index Signature

\[`key`: `string`\]: `string` \| \{ `fontSize`: `string`; `letterSpacing`: `undefined`; `lineHeight`: `undefined`; \} \| \{ `fontSize`: `string`; `letterSpacing`: `string`; `lineHeight`: `string`; \}

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
const myStyle = { ...Styles.typography.elements.labelMedium };
```

## Since

1.8.0
