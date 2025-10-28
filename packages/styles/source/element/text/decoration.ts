/**
 * @module element/text/decoration
 * Provides decorative text elements like watermarks and ribbons.
 */

import { color, font, spacing, media } from '../../token';
import { transition } from '../../animation';
import { elements } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-decoration';

/**
 * Options for watermark style variants
 * @since 1.7.0
 */
export interface WatermarkOptions {
  theme?: 'light' | 'dark';
}

/**
 * Base styles for watermark text.
 * @type {object}
 * @private
 */
const watermarkChild = {
  position: 'absolute',
  top: '20px',
  left: '-2%',
  color: color.gray.lighter,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: `min(calc(${font.size['5xl']} + 13vw), 240px)`,
  lineHeight: '0',
  pointerEvents: 'none',
  userSelect: 'none',

  [`@media (${media.queries.large.max})`]: {
    display: 'none',
  },
};

/**
 * Composable watermark decoration style selector
 *
 * Creates watermark styles with configurable theme options.
 * Watermarks are large, subtle background text elements.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeWatermark();
 *
 * // Dark theme
 * const styles = composeWatermark({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeWatermark(options?: WatermarkOptions): JssObject {
  const { theme = 'light' } = options || {};

  let composed: Record<string, any> = {
    position: 'relative',

    '> *': {
      ...watermarkChild,
      ...transition.slideRight,
    },
  };

  if (theme === 'light') {
    composed = {
      ...composed,
      '> *': {
        ...composed['> *'],
        opacity: '0.6',
        zIndex: '-1',
      },
    };
  } else if (theme === 'dark') {
    composed = {
      ...composed,
      '> *': {
        ...composed['> *'],
        opacity: '0.12',
        zIndex: 'inherit',
      },
    };
  }

  // Generate appropriate className
  const className =
    theme === 'dark'
      ? `${classNamePrefix}-watermark-dark`
      : `${classNamePrefix}-watermark`;

  // Add deprecated aliases
  const deprecatedAliases =
    theme === 'dark' ? ['umd-watermark-dark'] : ['umd-watermark'];

  return create.jss.objectWithClassName({
    ...composed,
    className: [className, ...deprecatedAliases],
  });
}

/**
 * Light watermark decoration style.
 * @returns {JssObject} Styles for large, subtle watermark text with animation.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.decoration.watermark
 * ```
 * @example
 * ```css
 * class="umd-text-decoration-watermark"
 * ```
 * @example
 * ```text
 * Use 'umd-text-decoration-watermark' instead of 'umd-watermark'.
 * ```
 * @since 1.1.0
 */
export const watermark: JssObject = composeWatermark();

/**
 * Dark watermark decoration style.
 * @returns {JssObject} Styles for dark, subtle watermark text with animation.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.decoration.watermarkDark
 * ```
 * @example
 * ```css
 * class="umd-text-decoration-watermark-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-text-decoration-watermark-dark' instead of 'umd-watermark-dark'.
 * ```
 * @since 1.1.0
 */
export const watermarkDark: JssObject = composeWatermark({ theme: 'dark' });

/**
 * Ribbon/eyebrow decoration.
 * @returns {JssObject} Styles for gold ribbon with angled edges.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.decoration.ribbon
 * ```
 * @example
 * ```css
 * class="umd-text-decoration-eyebrow"
 * ```
 * @example
 * ```text
 * Use 'umd-text-decoration-eyebrow' instead of 'umd-eyebrow-ribbon'.
 * ```
 * @since 1.1.0
 */
export const ribbon: JssObject = create.jss.objectWithClassName({
  className: [
    `${classNamePrefix}-eyebrow`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-eyebrow-ribbon',
  ],

  ...elements.eyebrow,
  backgroundColor: color.gold,
  padding: `${spacing.min} ${spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
});
