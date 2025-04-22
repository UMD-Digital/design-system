/**
 * @module layout/background/highlight
 * Provides highlight background styles with accent borders.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-highlight';

const box = {
  padding: `${spacing.md}`,
  borderLeft: `2px solid ${color.red}`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing.lg}`,
  },

  [`@media (${media.queries.desktop.min})`]: {
    padding: `${spacing['3xl']}`,
  },
};

/**
 * White highlight background with red accent border.
 * @returns {JssObject} White background box with red accent border and responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.highlight.white
 * ```
 * @example
 * ```css
 * class="umd-layout-background-highlight"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-highlight' instead of 'umd-layout-background-box'.
 * ```
 * @since 1.1.0
 */
export const white: JssObject = create.jssObject({
  ...box,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-layout-background-highlight' instead */
    'umd-layout-background-box',
  ],
});

/**
 * Light gray highlight background with red accent border.
 * @returns {JssObject} Light gray background box with red accent border and responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.highlight.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-highlight-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-highlight-light' instead of 'umd-layout-background-box'.
 * ```
 * @since 1.1.0
 */
export const light: JssObject = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-highlight-light' instead */
    'umd-layout-background-box',
  ],
});

/**
 * Dark gray highlight background with red accent border.
 * @returns {JssObject} Dark gray background box with red accent border and responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.highlight.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-highlight-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-highlight-dark' instead of 'umd-layout-background-box[theme="dark"]'.
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.darker}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-highlight-dark' instead */
    'umd-layout-background-box[theme="dark"]',
  ],
});
