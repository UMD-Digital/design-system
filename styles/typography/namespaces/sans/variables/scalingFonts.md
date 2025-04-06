[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [sans](../README.md) / scalingFonts

# Variable: scalingFonts

> `const` **scalingFonts**: `object`

Defined in: [typography/sans.ts:335](https://github.com/UMD-Digital/design-system/blob/ed6189804bf5f4c4fcbe5325b54aac33ac48d614/packages/styles/source/typography/sans.ts#L335)

Container-responsive sans-serif typography styles as JSS objects.

## Type declaration

### larger

> **larger**: `object`

#### larger.className

> **className**: `string` = `'umd-sans-scaling-larger'`

#### larger.fontFamily

> **fontFamily**: `string`

#### larger.fontSize

> **fontSize**: `string`

#### larger.lineHeight

> **lineHeight**: `string`

### min

> **min**: `object`

#### min.className

> **className**: `string` = `'umd-sans-scaling-min'`

#### min.fontFamily

> **fontFamily**: `string`

#### min.fontSize

> **fontSize**: `string`

#### min.lineHeight

> **lineHeight**: `string`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
// Use as a complete JSS object with container query scaling
Styles.typography.sans.scalingFonts.larger
```

## Since

1.8.0
