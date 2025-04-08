/**
 * @module element/form
 * Provides form styling and variants.
 */

import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-form';

/**
 * Gray form styling.
 * @returns {JssObject} Gray-themed form styling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.form.gray
 * ```
 * @since 1.8.0
 */
export const gray: JssObject = create.jssObject({
  className: `${classNamePrefix}-gray`,
});
