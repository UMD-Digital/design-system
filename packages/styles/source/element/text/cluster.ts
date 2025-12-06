/**
 * @module element/text/cluster
 * Provides styles for grouped text elements like tags and pills.
 */

import { color, spacing } from '@universityofmaryland/web-token-library';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-cluster';

/**
 * Options for pill style variants
 * @since 1.7.0
 */
export interface PillOptions {
  theme?: 'light' | 'dark';
}

/**
 * Base pill element styles.
 * @type {object}
 * @private
 */
const pillBase = {
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
 * Composable pill/tag list style selector
 *
 * Creates pill list styles with configurable theme options.
 * This function enables dynamic style composition based on theme requirements.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composePill();
 *
 * // Dark theme
 * const styles = composePill({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composePill(options?: PillOptions): JssObject {
  const { theme = 'light' } = options || {};

  let composed: Record<string, any> = {
    marginTop: `-${spacing.min}`,

    '& > *': {
      ...pillBase,
    },

    '& svg': {
      ...pillSvg,
    },
  };

  if (theme === 'light') {
    composed = {
      ...composed,
      '& > *': {
        ...composed['& > *'],
        backgroundColor: color.gray.lightest,
      },
      '& a:hover, & a:focus': {
        backgroundColor: color.gold,
      },
    };
  } else if (theme === 'dark') {
    composed = {
      ...composed,
      '& > *': {
        ...composed['& > *'],
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
    };
  }

  // Generate appropriate className
  const className =
    theme === 'dark'
      ? `${classNamePrefix}-pill-dark`
      : `${classNamePrefix}-pill`;

  // Add deprecated aliases
  const deprecatedAliases =
    theme === 'dark' ? ['umd-pill-list-dark'] : ['umd-pill-list'];

  return create.jss.objectWithClassName({
    ...composed,
    className: [className, ...deprecatedAliases],
  });
}

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
 * ```
 * @example
 * ```text
 * Use 'umd-text-cluster-pill' instead of 'umd-pill-list'.
 * ```
 * @since 1.1.0
 */
export const pillList: JssObject = composePill();

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
 * ```
 * @example
 * ```text
 * Use 'umd-text-cluster-pill-dark' instead of 'umd-pill-list-dark'.
 * ```
 * @since 1.1.0
 */
export const pillListDark: JssObject = composePill({ theme: 'dark' });

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
 * @since 1.1.0
 */
export const pillDoNotUse: JssObject = create.jss.objectWithClassName({
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
