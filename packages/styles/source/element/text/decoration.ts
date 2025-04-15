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
  opacity: ' 0.6',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: '-1',

  [`@media (${media.queries.large.max})`]: {
    display: 'none',
  },
};

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
 * @deprecated Use 'umd-text-decoration-watermark' instead of 'umd-watermark'.
 * @since 1.8.0
 */
export const watermark: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-watermark`,
    /** @deprecated Use 'umd-text-decoration-watermark' instead */
    'umd-watermark',
  ],

  position: 'relative',

  '> *': {
    ...watermarkChild,
    ...transition.slideRight,
  },
});

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
 * @deprecated Use 'umd-text-decoration-watermark-dark' instead of 'umd-watermark-dark'.
 * @since 1.8.0
 */
export const watermarkDark: JssObject = create.jssObject({
  ...watermark,

  className: [
    `${classNamePrefix}-watermark-dark`,
    /** @deprecated Use 'umd-text-decoration-watermark-dark' instead */
    'umd-watermark-dark',
  ],

  '> *': {
    ...watermarkChild,
    ...transition.slideRight,
    opacity: '0.12',
    zIndex: 'inherit',
  },
});

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
 * @deprecated Use 'umd-text-decoration-eyebrow' instead of 'umd-eyebrow-ribbon'.
 * @since 1.8.0
 */
export const ribbon: JssObject = create.jssObject({
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
