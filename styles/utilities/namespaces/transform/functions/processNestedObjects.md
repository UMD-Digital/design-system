[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [utilities](../../../README.md) / [transform](../README.md) / processNestedObjects

# Function: processNestedObjects()

> **processNestedObjects**\<`T`\>(`obj`): [`JssNamedOutputFormat`](../interfaces/JssNamedOutputFormat.md)

Defined in: [utilities/transform.ts:90](https://github.com/UMD-Digital/design-system/blob/ed6189804bf5f4c4fcbe5325b54aac33ac48d614/packages/styles/source/utilities/transform.ts#L90)

Processes nested JSS objects and flattens them.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | Type extending object |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `obj` | `T` | The object to process |

## Returns

[`JssNamedOutputFormat`](../interfaces/JssNamedOutputFormat.md)

The processed JSS object

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.utilities.transform.processNestedObjects({
  component: { className: 'my-component', color: 'blue' }
})
```

## Since

1.8.0
