[**UMD Styles Library**](../../../../README.md)

***

[UMD Styles Library](../../../../README.md) / [utilities](../../../README.md) / [create](../README.md) / jssObjectFromString

# Function: jssObjectFromString()

> **jssObjectFromString**(`cssString`): `Record`\<`string`, `any`\>

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
