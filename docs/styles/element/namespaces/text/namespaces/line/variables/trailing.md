[**UMD Styles Library**](../../../../../../README.md)

***

[UMD Styles Library](../../../../../../README.md) / [element](../../../../../README.md) / [text](../../../README.md) / [line](../README.md) / trailing

# Variable: trailing

> `const` **trailing**: `object`

Trailing line text style.

## Type declaration

### & + \*

> **& + \***: `object`

#### & + \*.marginTop

> **marginTop**: `string` = `spacing.xl`

### & \> span

> **& \> span**: `object`

#### & \> span.backgroundColor

> **backgroundColor**: `string`

#### & \> span.paddingRight

> **paddingRight**: `string` = `spacing.min`

#### & \> span.position

> **position**: `string` = `'relative'`

#### & \> span.zIndex

> **zIndex**: `number` = `2`

### &::before

> **&::before**: `object`

#### &::before.background

> **background**: `string`

#### &::before.content

> **content**: `string` = `'""'`

#### &::before.height

> **height**: `string` = `'1px'`

#### &::before.position

> **position**: `string` = `'absolute'`

#### &::before.right

> **right**: `string`

#### &::before.top

> **top**: `string` = `'9px'`

#### &::before.width

> **width**: `string`

#### &::before.zIndex

> **zIndex**: `number` = `1`

### backgroundColor

> **backgroundColor**: `string`

### className

> **className**: `string`[]

### fontFamily

> **fontFamily**: `string`

### fontSize

> **fontSize**: `string`

### letterSpacing

> **letterSpacing**: `string` = `'0.16em'`

### lineHeight

> **lineHeight**: `string`

### overflow

> **overflow**: `string` = `'hidden'`

### position

> **position**: `string` = `'relative'`

### textTransform

> **textTransform**: `string` = `'uppercase'`

## Returns

Styles for text with trailing horizontal line.

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.element.text.line.trailing
```

## Since

1.8.0
