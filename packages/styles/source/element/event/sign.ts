/**
 * @module element/event/sign
 * Provides styles for event sign components that display date and time information.
 */

import { color } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-event-sign';

/**
 * Container for event sign elements.
 * @returns {JssObject} Container styles for event signs with consistent typography.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.sign.container
 * ```
 * @example
 * ```css
 * class="umd-element-event-sign-container"
 * ```
 * @since 1.1.0
 */
export const container: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-container`,
  display: 'flex',
  alignItems: 'center',

  '& *': {
    display: 'block',
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: '200px',
    fontWeight: '700',
  },
});
