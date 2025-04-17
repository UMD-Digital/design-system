/**
 * @module layout/background/quarter
 * Provides background styles that cover a quarter of the container.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { padding } from './full';

// Consistent naming
const classNamePrefix = 'umd-layout-background-quarter';

const psuedo = {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: -1,

  [`@media (${media.queries.tablet.max})`]: {
    display: 'none',
  },

  [`@media (${media.queries.desktop.min})`]: {
    width: `calc(75% + 80px)`,
  },
};

const quarter = {
  position: 'relative',
  ...padding,

  '&:before': {
    ...psuedo,
    backgroundColor: `${color.gray.lightest}`,
  },
};

/**
 * Light quarter background.
 * @returns {JssObject} Light gray responsive quarter background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.quarter.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-quarter-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-quarter-light' instead of 'umd-layout-background-quater-color'.
 * ```
 * @since 1.8.0
 */
export const light: JssObject = create.jssObject({
  ...quarter,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-quarter-light' instead */
    'umd-layout-background-quater-color',
  ],
});

/**
 * Dark quarter background.
 * @returns {JssObject} Dark gray responsive quarter background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.quarter.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-quarter-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-quarter-dark' instead of 'umd-layout-background-quater-color'.
 * ```
 * @since 1.8.0
 */
export const dark: JssObject = create.jssObject({
  ...quarter,

  '&:before': {
    ...psuedo,
    backgroundColor: `${color.gray.darker}`,
  },

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-quarter-dark' instead */
    'umd-layout-background-quater-color',
  ],
});
