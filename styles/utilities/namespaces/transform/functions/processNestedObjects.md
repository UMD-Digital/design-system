[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [utilities](../../../README.md) / [transform](../README.md) / processNestedObjects

# Function: processNestedObjects()

> **processNestedObjects**\<`T`\>(`obj`): [`JssNamedOutputFormat`](../interfaces/JssNamedOutputFormat.md)

Defined in: [utilities/transform.ts:90](https://github.com/UMD-Digital/design-system/blob/8c958a0419ab79ba8bcba0aabd12f79a69ac5834/packages/styles/source/utilities/transform.ts#L90)

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
