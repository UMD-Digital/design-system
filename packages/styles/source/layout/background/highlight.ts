/**
 * @module layout/background/highlight
 * Provides highlight background styles with accent borders.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-highlight';

/**
 * Options for highlight background style variants
 * @since 1.7.0
 */
export interface HighlightBackgroundOptions {
  color?: 'white' | 'light' | 'dark';
}

/**
 * Base highlight box styles.
 * @type {object}
 * @private
 */
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
 * Composable highlight background style selector
 *
 * Creates highlight background styles with configurable color options.
 * Highlight backgrounds feature a red accent border and responsive padding.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // White background (default)
 * const styles = composeHighlight();
 *
 * // Light gray background
 * const styles = composeHighlight({ color: 'light' });
 *
 * // Dark gray background
 * const styles = composeHighlight({ color: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeHighlight(options?: HighlightBackgroundOptions): JssObject {
  const { color: bgColor = 'white' } = options || {};

  let composed: Record<string, any> = {
    ...box,
  };

  let className: string;
  let deprecatedAliases: string[] = [];

  if (bgColor === 'white') {
    className = `${classNamePrefix}`;
    deprecatedAliases.push('umd-layout-background-box');
  } else if (bgColor === 'light') {
    composed = {
      ...composed,
      backgroundColor: color.gray.lighter,
    };
    className = `${classNamePrefix}-light`;
    deprecatedAliases.push('umd-layout-background-box');
  } else {
    // dark
    composed = {
      ...composed,
      backgroundColor: color.gray.darker,
    };
    className = `${classNamePrefix}-dark`;
    deprecatedAliases.push('umd-layout-background-box[theme="dark"]');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

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
export const white: JssObject = composeHighlight({ color: 'white' });

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
export const light: JssObject = composeHighlight({ color: 'light' });

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
export const dark: JssObject = composeHighlight({ color: 'dark' });
