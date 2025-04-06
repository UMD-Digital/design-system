[**UMD Styles Library**](../../../README.md)

***

[UMD Styles Library](../../../README.md) / [utilities](../../README.md) / transform

# transform

Utilities for transforming style objects.

## Example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
Styles.utilities.transform
```

## Since

1.8.0

## Interfaces

| Interface | Description |
| ------ | ------ |
| [JssEntry](interfaces/JssEntry.md) | Interface for a JSS entry with className and other properties. |
| [JssInputFormat](interfaces/JssInputFormat.md) | Input format for JSS objects. |
| [JssNamedOutputFormat](interfaces/JssNamedOutputFormat.md) | Output format for JSS objects with class names as keys. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [JssObject](type-aliases/JssObject.md) | A JSS object that represents a styled component. This is the standard object format used throughout the design system. |

## Variables

| Variable | Description |
| ------ | ------ |
| [objectWithName](variables/objectWithName.md) | Converts JSS objects to a format with class names as keys. |

## Functions

| Function | Description |
| ------ | ------ |
| [processNestedObjects](functions/processNestedObjects.md) | Processes nested JSS objects and flattens them. |
