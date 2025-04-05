/**
 * @module layout/background/box
 * Provides background box styles for layout elements.
 */

import { color, spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

// Consistent naming
const classNamePrefix = 'umd-layout-background-box';

/**
 * White background box style.
 * @returns {JssObject} Inline block with white background and padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.box.white
 * ```
 * @since 1.8.0
 */
export const white: JssObject = create.jssObject({
  className: `${classNamePrefix}-white`,
  display: 'inline-block',
  zIndex: '9',
  backgroundColor: `${color.white}`,
  padding: `${spacing.sm} ${spacing.sm} ${spacing.min} ${spacing.sm}`,
});
