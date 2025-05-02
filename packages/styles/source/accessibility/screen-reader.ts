import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Screen reader only class.
 * @returns {JssObject} The JSS object for the screen reader only class.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.accessibility.screenReader.only
 * ```
 * @example
 * ```css
 * class="sr-only"
 * ```
 * @since 1.1.0
 */
export const only: JssObject = create.jss.objectWithClassName({
  className: 'sr-only',
  clip: 'rect(0,0,0,0)',
  borderWidth: '0px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
});
