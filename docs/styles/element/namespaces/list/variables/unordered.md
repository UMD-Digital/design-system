[**@universityofmaryland/web-styles-library**](../../../../README.md)

***

[@universityofmaryland/web-styles-library](../../../../README.md) / [element](../../../README.md) / [list](../README.md) / unordered

# Variable: unordered

> `const` **unordered**: `object`

Defined in: [element/list.ts:255](https://github.com/UMD-Digital/design-system/blob/7fa144f196ef5f0ef2b372670136735f5a5c9236/packages/styles/source/element/list.ts#L255)

## Type declaration

### & li

> **& li**: `object`

#### & li.&:before

> **&:before**: `object`

#### & li.&:before.content

> **content**: `string` = `'"•"'`

#### & li.&:before.counterIncrement

> **counterIncrement**: `string` = `'item'`

#### & li.&:before.fontWeight

> **fontWeight**: `string` = `'bold'`

#### & li.&:before.position

> **position**: `string` = `'absolute'`

#### & li.&:before.right

> **right**: `string`

#### & li.&:before.top

> **top**: `string` = `'1px'`

#### & li.lineHeight

> **lineHeight**: `string` = `'1.4em'`

#### & li.paddingLeft

> **paddingLeft**: `string` = `spacing.md`

#### & li.position

> **position**: `string` = `'relative'`

### & li + li, & li \> ul, & li \> ol

> **& li + li, & li \> ul, & li \> ol**: `object`

#### & li + li, & li \> ul, & li \> ol.marginTop

> **marginTop**: `string` = `spacing.sm`

### & li li

> **& li li**: `object`

#### & li li.&:before

> **&:before**: `object`

#### & li li.&:before.right

> **right**: `string`

#### & li li.paddingLeft

> **paddingLeft**: `string` = `spacing.xl`

### & ol

> **& ol**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

### & ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before

> **& ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before**: `object`

#### & ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before.content

> **content**: `string` = `'counter(item, circle)'`

### & ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before

> **& ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before**: `object`

#### & ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before.content

> **content**: `string` = `'counter(item, disc)'`

### & ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before

> **& ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before**: `object`

#### & ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before.content

> **content**: `string` = `'counter(item, square)'`

### className

> **className**: `string`

### counterReset

> **counterReset**: `string` = `'item'`

### listStyleType

> **listStyleType**: `string` = `'none !important'`

### padding

> **padding**: `string` = `'0'`
