[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [utilities](../../../README.md) / [create](../README.md) / jssObject

# Function: jssObject()

> **jssObject**\<`T`\>(`style`): `T`

Defined in: [utilities/create.ts:20](https://github.com/UMD-Digital/design-system/blob/ed6189804bf5f4c4fcbe5325b54aac33ac48d614/packages/styles/source/utilities/create.ts#L20)

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
