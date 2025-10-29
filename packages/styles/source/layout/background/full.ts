/**
 * @module layout/background/full
 * Provides full-width background styles with responsive padding.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-full';

/**
 * Options for full background style variants
 * @since 1.7.0
 */
export interface FullBackgroundOptions {
  theme?: 'light' | 'dark';
}

/**
 * Responsive padding for full-width backgrounds.
 * @returns {object} Responsive padding for different screen sizes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.padding
 * ```
 * @example
 * ```text
 * This is a style object that doesn't generate a CSS class directly, but provides padding styles that can be applied to backgrounds programmatically.
 * ```
 * @since 1.1.0
 */
export const padding = {
  padding: `${spacing['2xl']} 0`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing['6xl']} 0`,
  },

  [`@media (${media.queries.highDef})`]: {
    padding: `${spacing['8xl']} 0`,
  },
};

/**
 * Composable full background style selector
 *
 * Creates full-width background styles with configurable theme options.
 * Full backgrounds span the entire width with responsive padding.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeFull();
 *
 * // Dark theme
 * const styles = composeFull({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeFull(options?: FullBackgroundOptions): JssObject {
  const { theme = 'light' } = options || {};

  let backgroundColor: string;
  let deprecatedAliases: string[] = [];

  if (theme === 'light') {
    backgroundColor = color.gray.lightest;
    deprecatedAliases.push('umd-layout-background-color');
  } else {
    backgroundColor = color.black;
    deprecatedAliases.push('umd-layout-background-color-dark');
  }

  const className = `${classNamePrefix}-${theme}`;

  return create.jss.objectWithClassName({
    ...padding,
    backgroundColor,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Light full-width background with responsive padding.
 * @returns {JssObject} Light gray full-width background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-full-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-full-light' instead of 'umd-layout-background-color'.
 * ```
 * @since 1.1.0
 */
export const light: JssObject = composeFull({ theme: 'light' });

/**
 * Dark full-width background with responsive padding.
 * @returns {JssObject} Black full-width background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-full-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-full-dark' instead of 'umd-layout-background-color-dark'.
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = composeFull({ theme: 'dark' });
