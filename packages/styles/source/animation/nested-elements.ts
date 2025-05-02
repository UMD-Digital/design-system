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
 * @example
 * ```css
 * class="umd-animation-links-dark"
 * ```
 * @since 1.1.0
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
 * @example
 * ```css
 * class="umd-animation-links-white"
 * ```
 * @since 1.1.0
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
 * @example
 * ```css
 * class="umd-animation-grid"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-grid' instead of 'umd-grid-animation'.
 * ```
 * @since 1.1.0
 */
export const gridSetup: JssObject = create.jss.objectWithClassName({
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
