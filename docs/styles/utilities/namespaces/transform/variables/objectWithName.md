[**umd-styles-library**](../../../../README.md)

***

[umd-styles-library](../../../../modules.md) / [utilities](../../../README.md) / [transform](../README.md) / objectWithName

# Variable: objectWithName

> `const` **objectWithName**: `JssNameConverter`

Defined in: [utilities/transform.ts:56](https://github.com/UMD-Digital/design-system/blob/8021d9898368f604bce452fe4dde6fae3a0578fd/packages/styles/source/utilities/transform.ts#L56)

Converts JSS objects to a format with class names as keys.

## Param

The original JSS object

## Returns

The transformed JSS object with class names as keys

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.utilities.transform.objectWithName({ 
  key: { className: 'my-class', color: 'red' } 
})
```

## Since

1.8.0
