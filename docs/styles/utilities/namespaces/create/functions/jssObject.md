[**UMD Styles Library**](../../../../README.md)

***

[UMD Styles Library](../../../../README.md) / [utilities](../../../README.md) / [create](../README.md) / jssObject

# Function: jssObject()

> **jssObject**\<`T`\>(`style`): `T`

Creates a JSS object with type checking.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`JssEntry`](../../transform/interfaces/JssEntry.md) | Type extending JssEntry |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `style` | `T` | The style object |

## Returns

`T`

The JSS object with the same type

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.create.jssObject({ color: 'red', className: 'my-class' })
```

## Since

1.8.0
