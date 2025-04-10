/**
 * @module animation/nested-elements
 * Provides styles for animating nested elements.
 */

import { white, red } from '../element/text/link';
import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Dark style links for nested elements.
 * @returns {JssObject} Dark style links to be applied to nested elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.nestedElements.linksDark
 * ```
 * @since 1.8.0
 */
export const linksDark: JssObject = {
  className: `umd-animation-links-dark`,
  '& a': {
    ...white,
  },
};

/**
 * White style links for nested elements.
 * @returns {JssObject} White style links to be applied to nested elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.nestedElements.linksWhite
 * ```
 * @since 1.8.0
 */
export const linksWhite: JssObject = {
  className: `umd-animation-links-white`,
  '& a': {
    ...red,
  },
};

/**
 * Grid setup with animation for child elements.
 * @returns {JssObject} Grid setup with fade-in animation for child elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.nestedElements.gridSetup
 * ```
 * @since 1.8.0
 */
export const gridSetup: JssObject = create.jssObject({
  '& > *': {
    [`@media (prefers-reduced-motion: no-preference)`]: {
      opacity: '0',
      transform: 'translateY(50px)',
    },
  },

  className: [
    `umd-animation-grid`,
    /** @deprecated Use 'umd-animation-grid' instead */
    'umd-grid-animation',
  ],
});
