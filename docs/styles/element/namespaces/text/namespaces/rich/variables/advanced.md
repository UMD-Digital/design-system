[**@universityofmaryland/web-styles-library**](../../../../../../README.md)

***

[@universityofmaryland/web-styles-library](../../../../../../README.md) / [element](../../../../../README.md) / [text](../../../README.md) / [rich](../README.md) / advanced

# Variable: advanced

> `const` **advanced**: `object`

Defined in: [element/text/rich.ts:194](https://github.com/UMD-Digital/design-system/blob/7fa144f196ef5f0ef2b372670136735f5a5c9236/packages/styles/source/element/text/rich.ts#L194)

## Type declaration

### & + ol, &ol + ul

> **& + ol, &ol + ul**: `object`

#### & + ol, &ol + ul.marginTop

> **marginTop**: `string` = `spacing.sm`

### & \> \*

> **& \> \***: `object`

#### & \> \*.&:empty

> **&:empty**: `object`

#### & \> \*.&:empty.marginTop

> **marginTop**: `number` = `0`

#### & \> \*.&:first-child

> **&:first-child**: `object`

#### & \> \*.&:first-child.marginTop

> **marginTop**: `string` = `'0'`

#### & \> \*.fontSize

> **fontSize**: `string` = `font.size.lg`

#### & \> \*.marginTop

> **marginTop**: `string` = `spacing.md`

### & a

> **& a**: `object`

#### & a.&:hover, &:focus

> **&:hover, &:focus**: `object`

#### & a.&:hover, &:focus.backgroundImage

> **backgroundImage**: `string`

#### & a.&:hover, &:focus.backgroundPosition

> **backgroundPosition**: `string` = `'left calc(100%)'`

#### & a.&:hover, &:focus.backgroundSize

> **backgroundSize**: `string` = `'100% 1px'`

#### & a.&:hover, &:focus.color

> **color**: `string`

#### & a.&:hover, &:focus.textDecoration

> **textDecoration**: `string` = `'none !important'`

#### & a.backgroundImage

> **backgroundImage**: `string` = `'linear-gradient(#000000, #000000)'`

#### & a.backgroundPosition

> **backgroundPosition**: `string` = `'left calc(100% - 1px)'`

#### & a.backgroundRepeat

> **backgroundRepeat**: `string` = `'no-repeat'`

#### & a.backgroundSize

> **backgroundSize**: `string` = `'100% 1px'`

#### & a.className

> **className**: `string`

#### & a.color

> **color**: `"#000000"` = `color.black`

#### & a.position

> **position**: `string` = `'relative'`

#### & a.transition

> **transition**: `string` = `'color 0.5s, background-size 0.5s, background-image 0.5s, background-position 0.5s'`

### & blockquote

> **& blockquote**: `object`

#### & blockquote.borderLeft

> **borderLeft**: `string`

#### & blockquote.display

> **display**: `string` = `'inline-block'`

#### & blockquote.fontFamily

> **fontFamily**: `string`

#### & blockquote.fontSize

> **fontSize**: `string`

#### & blockquote.lineHeight

> **lineHeight**: `string`

#### & blockquote.paddingLeft

> **paddingLeft**: `string` = `spacing.md`

#### & blockquote.position

> **position**: `string` = `'relative'`

### & code

> **& code**: `object`

#### & code.display

> **display**: `string` = `'inline-block'`

#### & code.padding

> **padding**: `string`

### & code, & pre

> **& code, & pre**: `object`

#### & code, & pre.backgroundColor

> **backgroundColor**: `"#FAFAFA"` = `color.gray.lightest`

#### & code, & pre.border

> **border**: `string`

#### & code, & pre.borderRadius

> **borderRadius**: `string` = `'3px'`

#### & code, & pre.color

> **color**: `string` = `'currentColor'`

#### & code, & pre.FontFamily

> **FontFamily**: `string` = `font.family.mono`

### & em, & i

> **& em, & i**: `object`

#### & em, & i.fontStyle

> **fontStyle**: `string` = `'italic'`

### & hr

> **& hr**: `object`

#### & hr.backgroundColor

> **backgroundColor**: `string` = `'currentColor'`

#### & hr.border

> **border**: `string` = `'none'`

#### & hr.height

> **height**: `string` = `'1px'`

### & img

> **& img**: `object`

#### & img.maxWidth

> **maxWidth**: `string` = `'100%'`

### & ol,
    & ul ol

> **& ol,
    & ul ol**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: cjk-decimal'\] \> li:before

> **& \> ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: cjk-decimal'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: cjk-decimal'\] \> li:before.content

> **content**: `string` = `'counter(item, cjk-decimal)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before

> **& \> ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before.content

> **content**: `string` = `'counter(item, decimal-leading-zero)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal'\] \> li:before

> **& \> ol\[style\*='list-style-type:decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:decimal'\] \> li:before,
    & \> ol\[style\*='list-style-type: decimal'\] \> li:before.content

> **content**: `string` = `'counter(item, decimal)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-alpha'\] \> li:before

> **& \> ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-alpha'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-alpha'\] \> li:before.content

> **content**: `string` = `'counter(item, lower-alpha)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-greek'\] \> li:before

> **& \> ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-greek'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-greek'\] \> li:before.content

> **content**: `string` = `'counter(item, lower-greek)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-latin'\] \> li:before

> **& \> ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-latin'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-latin'\] \> li:before.content

> **content**: `string` = `'counter(item, lower-latin)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-roman'\] \> li:before

> **& \> ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-roman'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: lower-roman'\] \> li:before.content

> **content**: `string` = `'counter(item, lower-roman)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-alpha'\] \> li:before

> **& \> ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-alpha'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-alpha'\] \> li:before.content

> **content**: `string` = `'counter(item, upper-alpha)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-latin'\] \> li:before

> **& \> ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-latin'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-latin'\] \> li:before.content

> **content**: `string` = `'counter(item, upper-latin)'`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-roman'\] \> li:before

> **& \> ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-roman'\] \> li:before**: `object`

#### & ol,
    & ul ol.& \> ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & \> ol\[style\*='list-style-type: upper-roman'\] \> li:before.content

> **content**: `string` = `'counter(item, upper-roman)'`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & ol\[style\*='list-style-type: cjk-decimal'\] \> li:before

> **& ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & ol\[style\*='list-style-type: cjk-decimal'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:cjk-decimal'\] \> li:before,
    & ol\[style\*='list-style-type: cjk-decimal'\] \> li:before.content

> **content**: `string` = `"counter(item, cjk-decimal) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before

> **& ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:decimal-leading-zero'\] \> li:before,
    & ol\[style\*='list-style-type: decimal-leading-zero'\] \> li:before.content

> **content**: `string` = `"counter(item, decimal-leading-zero) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:decimal'\] \> li:before,
    & ol\[style\*='list-style-type: decimal'\] \> li:before

> **& ol\[style\*='list-style-type:decimal'\] \> li:before,
    & ol\[style\*='list-style-type: decimal'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:decimal'\] \> li:before,
    & ol\[style\*='list-style-type: decimal'\] \> li:before.content

> **content**: `string` = `"counter(item, decimal) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: lower-alpha'\] \> li:before

> **& ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: lower-alpha'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: lower-alpha'\] \> li:before.content

> **content**: `string` = `"counter(item, lower-alpha) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & ol\[style\*='list-style-type: lower-greek'\] \> li:before

> **& ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & ol\[style\*='list-style-type: lower-greek'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-greek'\] \> li:before,
    & ol\[style\*='list-style-type: lower-greek'\] \> li:before.content

> **content**: `string` = `"counter(item, lower-greek) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & ol\[style\*='list-style-type: lower-latin'\] \> li:before

> **& ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & ol\[style\*='list-style-type: lower-latin'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-latin'\] \> li:before,
    & ol\[style\*='list-style-type: lower-latin'\] \> li:before.content

> **content**: `string` = `"counter(item, lower-latin) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & ol\[style\*='list-style-type: lower-roman'\] \> li:before

> **& ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & ol\[style\*='list-style-type: lower-roman'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:lower-roman'\] \> li:before,
    & ol\[style\*='list-style-type: lower-roman'\] \> li:before.content

> **content**: `string` = `"counter(item, lower-roman) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: upper-alpha'\] \> li:before

> **& ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: upper-alpha'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-alpha'\] \> li:before,
    & ol\[style\*='list-style-type: upper-alpha'\] \> li:before.content

> **content**: `string` = `"counter(item, upper-alpha) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & ol\[style\*='list-style-type: upper-latin'\] \> li:before

> **& ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & ol\[style\*='list-style-type: upper-latin'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-latin'\] \> li:before,
    & ol\[style\*='list-style-type: upper-latin'\] \> li:before.content

> **content**: `string` = `"counter(item, upper-latin) '.'"`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & ol\[style\*='list-style-type: upper-roman'\] \> li:before

> **& ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & ol\[style\*='list-style-type: upper-roman'\] \> li:before**: `object`

#### & ol,
    & ul ol.& ol\[style\*='list-style-type:upper-roman'\] \> li:before,
    & ol\[style\*='list-style-type: upper-roman'\] \> li:before.content

> **content**: `string` = `"counter(item, upper-roman) '.'"`

#### & ol,
    & ul ol.className

> **className**: `string`

### & p,
    & ul,
    & ol,
    & pre,
    & blockquote

> **& p,
    & ul,
    & ol,
    & pre,
    & blockquote**: `object`

#### & p,
    & ul,
    & ol,
    & pre,
    & blockquote.maxWidth

> **maxWidth**: `string` = `'960px'`

### & pre

> **& pre**: `object`

#### & pre.padding

> **padding**: `string` = `spacing.min`

### & small

> **& small**: `object`

#### & small.display

> **display**: `string` = `'inline-block'`

#### & small.fontFamily

> **fontFamily**: `string`

#### & small.fontSize

> **fontSize**: `string`

#### & small.lineHeight

> **lineHeight**: `string`

### & strong, & b

> **& strong, & b**: `object`

#### & strong, & b.FontWeight

> **FontWeight**: `string` = `font.weight.bold`

### & sub

> **& sub**: `object`

#### & sub.fontSize

> **fontSize**: `string` = `font.size.min`

### & sup

> **& sup**: `object`

#### & sup.fontSize

> **fontSize**: `string` = `font.size.min`

### & table

> **& table**: `object`

#### & table.& tbody tr

> **& tbody tr**: `object`

#### & table.& tbody tr.borderTop

> **borderTop**: `string`

#### & table.& td

> **& td**: `object` = `sans.small`

#### & table.& td.fontFamily

> **fontFamily**: `string`

#### & table.& td.fontSize

> **fontSize**: `string`

#### & table.& td.lineHeight

> **lineHeight**: `string`

#### & table.& th

> **& th**: `object` = `sans.large`

#### & table.& th.fontFamily

> **fontFamily**: `string`

#### & table.& th.fontSize

> **fontSize**: `string`

#### & table.& th.fontWeight

> **fontWeight**: `string`

#### & table.& th.lineHeight

> **lineHeight**: `string`

#### & table.& th, & td

> **& th, & td**: `object`

#### & table.& th, & td.&:first-child

> **&:first-child**: `object`

#### & table.& th, & td.&:first-child.paddingLeft

> **paddingLeft**: `string` = `spacing.md`

#### & table.& th, & td.&:last-Child

> **&:last-Child**: `object`

#### & table.& th, & td.&:last-Child.paddingRight

> **paddingRight**: `string` = `spacing.md`

#### & table.& th, & td.padding

> **padding**: `string`

#### & table.& th, & td.verticalAlign

> **verticalAlign**: `string` = `'top'`

#### & table.& thead th

> **& thead th**: `object`

#### & table.& thead th.background

> **background**: `"#F1F1F1"` = `color.gray.lighter`

#### & table.& thead th.color

> **color**: `"#000000"` = `color.black`

#### & table.& thead th.textAlign

> **textAlign**: `string` = `'left'`

#### & table.& tr:nth-child(even)

> **& tr:nth-child(even)**: `object`

#### & table.& tr:nth-child(even).background

> **background**: `"#FAFAFA"` = `color.gray.lightest`

#### & table.borderCollapse

> **borderCollapse**: `string` = `'collapse'`

#### & table.className

> **className**: `string`[]

#### & table.display

> **display**: `string` = `'block'`

#### & table.maxWidth

> **maxWidth**: `string` = `'100%'`

#### & table.overflowX

> **overflowX**: `string` = `'auto'`

#### & table.tableLayout

> **tableLayout**: `string` = `'fixed'`

### & u

> **& u**: `object`

#### & u.textDecoration

> **textDecoration**: `string` = `'underline'`

### & ul,
    & ol ul

> **& ul,
    & ol ul**: `object`

#### & ul,
    & ol ul.& li

> **& li**: `object`

#### & ul,
    & ol ul.& li.&:before

> **&:before**: `object`

#### & ul,
    & ol ul.& li.&:before.content

> **content**: `string` = `'"•"'`

#### & ul,
    & ol ul.& li.&:before.counterIncrement

> **counterIncrement**: `string` = `'item'`

#### & ul,
    & ol ul.& li.&:before.fontWeight

> **fontWeight**: `string` = `'bold'`

#### & ul,
    & ol ul.& li.&:before.position

> **position**: `string` = `'absolute'`

#### & ul,
    & ol ul.& li.&:before.right

> **right**: `string`

#### & ul,
    & ol ul.& li.&:before.top

> **top**: `string` = `'1px'`

#### & ul,
    & ol ul.& li.lineHeight

> **lineHeight**: `string` = `'1.4em'`

#### & ul,
    & ol ul.& li.paddingLeft

> **paddingLeft**: `string` = `spacing.md`

#### & ul,
    & ol ul.& li.position

> **position**: `string` = `'relative'`

#### & ul,
    & ol ul.& li + li, & li \> ul, & li \> ol

> **& li + li, & li \> ul, & li \> ol**: `object`

#### & ul,
    & ol ul.& li + li, & li \> ul, & li \> ol.marginTop

> **marginTop**: `string` = `spacing.sm`

#### & ul,
    & ol ul.& li li

> **& li li**: `object`

#### & ul,
    & ol ul.& li li.&:before

> **&:before**: `object`

#### & ul,
    & ol ul.& li li.&:before.right

> **right**: `string`

#### & ul,
    & ol ul.& li li.paddingLeft

> **paddingLeft**: `string` = `spacing.xl`

#### & ul,
    & ol ul.& ol

> **& ol**: `object`

##### Index Signature

\[`key`: `string`\]: `any`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before

> **& ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before**: `object`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:circle'\] \> li:before,
    & ul\[style\*='list-style-type: circle'\] \> li:before.content

> **content**: `string` = `'counter(item, circle)'`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before

> **& ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before**: `object`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:disc'\] \> li:before,
    & ul\[style\*='list-style-type: disc'\] \> li:before.content

> **content**: `string` = `'counter(item, disc)'`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before

> **& ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before**: `object`

#### & ul,
    & ol ul.& ul\[style\*='list-style-type:square'\] \> li:before,
    & ul\[style\*='list-style-type: square'\] \> li:before.content

> **content**: `string` = `'counter(item, square)'`

#### & ul,
    & ol ul.className

> **className**: `string`

#### & ul,
    & ol ul.counterReset

> **counterReset**: `string` = `'item'`

#### & ul,
    & ol ul.listStyleType

> **listStyleType**: `string` = `'none !important'`

#### & ul,
    & ol ul.padding

> **padding**: `string` = `'0'`

### className

> **className**: `string`[]

### fontSize

> **fontSize**: `string` = `font.size.lg`

### FontWeight

> **FontWeight**: `string` = `font.weight.normal`

### lineHeight

> **lineHeight**: `string` = `'1.5em'`
