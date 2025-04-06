[**UMD Styles Library**](../../../../README.md)

***

[UMD Styles Library](../../../../README.md) / [utilities](../../../README.md) / [transform](../README.md) / objectWithName

# Variable: objectWithName

> `const` **objectWithName**: `JssNameConverter`

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
