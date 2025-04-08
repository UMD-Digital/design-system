import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Skip to content link class.
 * @returns {JssObject} The JSS object for the skip to content link.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.accessibility.skip.content
 * ```
 *
 * @since 1.8.0
 */
export const content: JssObject = create.jssObject({
  className: 'umd-skip-content',
  backgroundColor: `#fff`,
  color: `#e21833`,
  display: `block`,
  height: `0`,
  width: '0',
  opacity: `0`,
  padding: `8px`,
  position: `absolute`,
  textDecoration: `underline`,
  transition: `none`,
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  '&:focus': {
    display: 'block',
    height: 'inherit',
    width: 'auto',
    zIndex: '9999',
    opacity: '1',
    transition: 'opacity 0.5s',
  },
});
