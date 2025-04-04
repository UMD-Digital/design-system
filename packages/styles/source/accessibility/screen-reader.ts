import { create } from '../utilities';

/**
 * Screen reader only class.
 * @returns {JssObject} The JSS object for the screen reader only class.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.accessibility.screenReader.only
 * ```
 *
 * @since 1.8.0
 */
export const only = create.jssObject({
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
