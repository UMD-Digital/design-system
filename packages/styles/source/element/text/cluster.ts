/**
 * @module element/text/cluster
 * Provides styles for grouped text elements like tags and pills.
 */

import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-cluster';

/**
 * Base pill element styles.
 * @type {object}
 * @private
 */
const pill = {
  ...sans.min,
  display: 'inline-block',
  padding: `${spacing.min} ${spacing.xs}`,
  marginBottom: '0',
  marginTop: spacing.min,
  transition: 'background-color 0.3s',

  '& > span': {
    display: 'flex',
    gap: '4px',
    whiteSpace: 'nowrap',
  },
};

/**
 * SVG icon styles for pills.
 * @type {object}
 * @private
 */
const pillSvg = {
  height: '12px',
  width: '12px',
};

/**
 * Light pill/tag list.
 * @returns {JssObject} Light-themed pill list with hover effects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.cluster.pillList
 * ```
 * @example
 * ```css
 * class="umd-text-cluster-pill"
 * Use 'umd-text-cluster-pill' instead of 'umd-pill-list'.
 * ```
 * @since 1.8.0
 */
export const pillList: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-pill`,
    /** @deprecated Use 'umd-text-cluster-pill' instead */
    'umd-pill-list',
  ],

  marginTop: `-${spacing.min}`,

  '& > *': {
    ...pill,
    backgroundColor: color.gray.lightest,
  },

  '& svg': {
    ...pillSvg,
  },

  '& a:hover, & a:focus': {
    backgroundColor: color.gold,
  },
});

/**
 * Dark pill/tag list.
 * @returns {JssObject} Dark-themed pill list with hover effects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.cluster.pillListDark
 * ```
 * @example
 * ```css
 * class="umd-text-cluster-pill-dark"
 * Use 'umd-text-cluster-pill-dark' instead of 'umd-pill-list-dark'.
 * ```
 * @since 1.8.0
 */
export const pillListDark: JssObject = create.jssObject({
  ...pillList,

  className: [
    `${classNamePrefix}-pill-dark`,
    /** @deprecated Use 'umd-text-cluster-pill-dark' instead */
    'umd-pill-list-dark',
  ],

  '& > *': {
    ...pill,
    backgroundColor: color.gray.dark,
    color: color.white,
  },

  '& svg': {
    ...pillSvg,
    fill: color.white,
  },

  '& a:hover, & a:focus': {
    backgroundColor: color.gray.lighter,
    color: color.black,

    '& svg': {
      fill: color.black,
    },
  },
});

/**
 * Legacy pill list style.
 * @returns {JssObject} Deprecated pill list style.
 * @deprecated Use pillList instead.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.cluster.pillDoNotUse
 * ```
 * @example
 * ```css
 * class="umd-pills"
 * ```
 * @since 1.8.0
 */
export const pillDoNotUse: JssObject = create.jssObject({
  className: [
    /** @deprecated Use 'umd-pill-list' instead */
    'umd-pills',
  ],

  marginTop: `-${spacing.min}`,

  '& > *': {
    backgroundColor: color.gray.lightest,
    display: 'inline-block',
    padding: `${spacing.min} ${spacing.xs}`,
    marginBottom: '0',
    marginTop: spacing.min,
  },

  '& a:hover, &:focus': {
    textDecoration: 'underline',
  },
});
