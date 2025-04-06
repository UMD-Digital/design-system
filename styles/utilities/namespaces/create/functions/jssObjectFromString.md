[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [utilities](../../../README.md) / [create](../README.md) / jssObjectFromString

# Function: jssObjectFromString()

> **jssObjectFromString**(`cssString`): `Record`\<`string`, `any`\>

Defined in: [utilities/create.ts:33](https://github.com/UMD-Digital/design-system/blob/8c958a0419ab79ba8bcba0aabd12f79a69ac5834/packages/styles/source/utilities/create.ts#L33)

Creates a JSS object from a CSS string.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cssString` | `string` | The CSS string to convert |

## Returns

`Record`\<`string`, `any`\>

The JSS object with converted properties

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.create.jssObjectFromString('color: red; font-size: 16px;')
```

## Since

1.8.0
