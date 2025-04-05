[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [typography](../../../README.md) / [elements](../README.md) / fonts

# Variable: fonts

> `const` **fonts**: `object`

Defined in: [typography/elements.ts:167](https://github.com/UMD-Digital/design-system/blob/8021d9898368f604bce452fe4dde6fae3a0578fd/packages/styles/source/typography/elements.ts#L167)

Ready-to-use typography styles as JSS objects with class names.

## Type declaration

### eyebrow

> **eyebrow**: `object`

#### eyebrow.className

> **className**: `string` = `'umd-eyebrow'`

#### eyebrow.color

> **color**: `"#000000"` = `color.black`

#### eyebrow.fontSize

> **fontSize**: `string` = `font.size.min`

#### eyebrow.fontWeight

> **fontWeight**: `number` = `700`

#### eyebrow.letterSpacing

> **letterSpacing**: `string`

#### eyebrow.lineHeight

> **lineHeight**: `number` = `1`

#### eyebrow.textTransform

> **textTransform**: `string`

### labelMedium

> **labelMedium**: `object`

#### labelMedium.className

> **className**: `string` = `'umd-label-sans-medium'`

#### labelMedium.fontFamily

> **fontFamily**: `string`

#### labelMedium.fontSize

> **fontSize**: `string`

#### labelMedium.lineHeight

> **lineHeight**: `string`

### labelSmall

> **labelSmall**: `object`

#### labelSmall.className

> **className**: `string` = `'umd-label-sans-small'`

#### labelSmall.fontFamily

> **fontFamily**: `string`

#### labelSmall.fontSize

> **fontSize**: `string`

#### labelSmall.letterSpacing

> **letterSpacing**: `string` = `'0.16em'`

#### labelSmall.lineHeight

> **lineHeight**: `string`

### medium

> **medium**: `object`

#### medium.className

> **className**: `string` = `'umd-interactive-sans-medium'`

#### medium.fontFamily

> **fontFamily**: `string`

#### medium.fontSize

> **fontSize**: `string`

#### medium.lineHeight

> **lineHeight**: `string`

### small

> **small**: `object`

#### small.className

> **className**: `string` = `'umd-interactive-sans-small'`

#### small.fontFamily

> **fontFamily**: `string`

#### small.fontSize

> **fontSize**: `string`

#### small.fontWeight

> **fontWeight**: `string`

#### small.letterSpacing

> **letterSpacing**: `string` = `'-0.01em'`

#### small.lineHeight

> **lineHeight**: `string`

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
// Use as a complete JSS object including className
Styles.typography.elements.fonts.eyebrow
```

## Since

1.8.0
