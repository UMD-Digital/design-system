/**
 * @module layout/alignment/inline
 * Provides inline text alignment styles.
 */

import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

/**
 * Center alignment for text.
 * @returns {JssObject} Center text alignment style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.alignment.inline.center
 * ```
 * @since 1.8.0
 */
export const center: JssObject = create.jssObject({
  className: [
    `text-center`,
    /** @deprecated Use 'text-center' instead */
    'umd-layout-text-alignment-center',
  ],
});
