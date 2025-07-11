/**
 * @module element/composite/person/bio
 * Provides styles for biographical person components with responsive layouts.
 */

import { media, spacing } from '../../../token';
import { wrapper as imageWrapper } from '../../asset/image';
import { create } from '../../../utilities';
import type { JssObject } from '../../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-composite-person-bio';

/**
 * Creates container query style media query for responsive layouts.
 * @param {number} breakpoint - The breakpoint value in pixels
 * @param {string} comparison - The comparison operator ('min-width' or 'max-width')
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Container query object with styles
 * @private
 */
const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@container (${comparison}: ${breakpoint}px)`]: styles,
  };
};

/**
 * Base layout styles for biographical components.
 * @private
 */
const bioLayout = {
  display: 'grid',
  gridGap: `${spacing.md}`,

  ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
    gridTemplateColumns: `repeat(8, 1fr)`,
    gridGap: `${spacing.lg}`,
    alignItems: `center`,
  }),

  [`& .${imageWrapper.className}`]: {
    ...createContainerQuery(media.breakpointValues.medium.max, 'max-width', {
      display: 'flex',
    }),
  },

  [`& img`]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      width: `100%`,
      height: `auto !important`,
    }),
  },

  [`& > *`]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      gridColumn: `span 5`,
    }),
  },

  [`&:has(> :nth-child(2)) > *:first-child `]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      gridColumn: `span 3`,
      alignSelf: `flex-start`,
    }),
  },
};

/**
 * Small biographical component with responsive layout.
 * @returns {JssObject} Styles for small biographical component with light theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.person.bio.small
 * ```
 * @example
 * ```css
 * class="umd-element-composite-person-bio-small"
 * ```
 * @since 1.1.0
 */
export const small: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-small`,
  ...bioLayout,
});

/**
 * Small biographical component with dark theme.
 * @returns {JssObject} Styles for small biographical component with dark theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.person.bio.smallDark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-person-bio-small-dark"
 * ```
 * @since 1.1.0
 */
export const smallDark: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-small-dark`,
  ...bioLayout,
});
