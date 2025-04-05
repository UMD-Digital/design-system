/**
 * @module element/field
 * Provides styles for form field elements like inputs, checkboxes, and selects.
 */

/**
 * Checkbox input field styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.checkbox.checkboxWrapper
 * ```
 * @since 1.8.0
 */
import * as checkbox from './checkbox';

/**
 * File upload input styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.file.fileWrapper
 * ```
 * @since 1.8.0
 */
import * as file from './file';

/**
 * Text input field styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.text
 * ```
 * @since 1.8.0
 */
import * as input from './input';

/**
 * Radio button input styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.radio.radioWrapper
 * ```
 * @since 1.8.0
 */
import * as radio from './radio';

/**
 * Select dropdown field styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.select.selectWrapper
 * ```
 * @since 1.8.0
 */
import * as select from './select';

/**
 * Field set container styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.set.fieldset
 * ```
 * @since 1.8.0
 */
import * as set from './set';

export { checkbox, file, input, radio, select, set };
