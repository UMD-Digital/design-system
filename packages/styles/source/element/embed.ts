/**
 * @module element/embed
 * Provides styles for embedded content like videos and iframes.
 */

import { color } from '@universityofmaryland/web-token-library';
import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-embed';

/**
 * Inline video embed style.
 * @returns {JssObject} Styles for inline embedded video with 16:9 aspect ratio.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.embed.inline
 * ```
 * @example
 * ```css
 * class="umd-embed-video"
 * ```
 * @since 1.1.0
 */
export const inline: JssObject = create.jss.objectWithClassName({
  display: 'block',
  width: '100%',
  backgroundColor: color.black,

  className: `${classNamePrefix}-video`,

  '& iframe': {
    aspectRatio: '16/9',
    width: '100% !important',
    height: 'inherit !important',
  },
});
