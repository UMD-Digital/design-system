/**
 * @module layout/background/wrap
 * Provides background wrap styles with responsive padding.
 */

import { color, media, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-wrap';

/**
 * Options for wrap background style variants
 * @since 1.7.0
 */
export interface WrapBackgroundOptions {
  color?: 'white' | 'light' | 'dark';
}

/**
 * Base box styles for wrap backgrounds.
 * @type {object}
 * @private
 */
const box = {
  padding: `${spacing.md}`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing.lg}`,
  },

  [`@media (${media.queries.desktop.min})`]: {
    padding: `${spacing['3xl']}`,
  },
};

/**
 * Composable wrap background style selector
 *
 * Creates wrap background styles with configurable color options.
 * Wrap backgrounds provide responsive padding for content containers.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // White background (default)
 * const styles = composeWrap();
 *
 * // Light gray background
 * const styles = composeWrap({ color: 'light' });
 *
 * // Dark gray background
 * const styles = composeWrap({ color: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeWrap(options?: WrapBackgroundOptions): JssObject {
  const { color: bgColor = 'white' } = options || {};

  let composed: Record<string, any> = {
    ...box,
  };

  let className: string;
  let deprecatedAliases: string[] = [];

  if (bgColor === 'white') {
    className = `${classNamePrefix}`;
  } else if (bgColor === 'light') {
    composed = {
      ...composed,
      backgroundColor: color.gray.lighter,
    };
    className = `${classNamePrefix}-light`;
    deprecatedAliases.push('umd-forms-layout');
  } else {
    // dark
    composed = {
      ...composed,
      backgroundColor: color.gray.darker,
    };
    className = `${classNamePrefix}-dark`;
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * White background wrap with responsive padding.
 * @returns {JssObject} White background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.white
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap"
 * ```
 * @since 1.1.0
 */
export const white: JssObject = composeWrap({ color: 'white' });

/**
 * Light gray background wrap with responsive padding.
 * @returns {JssObject} Light gray background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-wrap-light' instead of 'umd-forms-layout'.
 * ```
 * @since 1.1.0
 */
export const light: JssObject = composeWrap({ color: 'light' });

/**
 * Dark gray background wrap with responsive padding.
 * @returns {JssObject} Dark gray background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap-dark"
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = composeWrap({ color: 'dark' });
