[**@universityofmaryland/web-styles-library**](../../../../../../README.md)

***

[@universityofmaryland/web-styles-library](../../../../../../README.md) / [element](../../../../../README.md) / [event](../../../README.md) / [meta](../README.md) / wrapper

# Variable: wrapper

> `const` **wrapper**: `object`

Defined in: [element/event/meta.ts:23](https://github.com/UMD-Digital/design-system/blob/7fa144f196ef5f0ef2b372670136735f5a5c9236/packages/styles/source/element/event/meta.ts#L23)

## Type declaration

### \> \*

> **\> \***: `object`

#### \> \*.marginRight

> **marginRight**: `string`

#### \> \*.marginTop

> **marginTop**: `string`

### \> \*:first-child

> **\> \*:first-child**: `object`

#### Index Signature

\[`key`: `string`\]: \{ `alignItems`: `undefined`; `display`: `string`; \} \| \{ `alignItems`: `string`; `display`: `string`; \} \| \{[`key`: `string`]: \{ `marginLeft`: `string`; `marginTop`: `undefined`; \} \| \{ `marginLeft`: `undefined`; `marginTop`: `string`; \}; `alignItems`: `undefined`; `display`: `undefined`; \}

#### \> \*:first-child.\> \*

> **\> \***: `object`

#### \> \*:first-child.\> \*.alignItems

> **alignItems**: `string` = `'center'`

#### \> \*:first-child.\> \*.display

> **display**: `string` = `'flex'`

#### \> \*:first-child.\> \*:not(:first-child)

> **\> \*:not(:first-child)**: `object`

##### Index Signature

\[`key`: `string`\]: \{ `marginLeft`: `string`; `marginTop`: `undefined`; \} \| \{ `marginLeft`: `undefined`; `marginTop`: `string`; \}

### \> \*:not(:first-child)

> **\> \*:not(:first-child)**: `object`

#### \> \*:not(:first-child).display

> **display**: `string` = `'flex'`

#### \> \*:not(:first-child).width

> **width**: `string` = `'100%'`

### className

> **className**: `string`

### display

> **display**: `string` = `'flex'`

### flexWrap

> **flexWrap**: `string` = `'wrap'`
