/**
 * @module element/asset/image
 * Provides styles for image assets with various display options and animations.
 */

import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { box } from '../../layout/background';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-asset-image';

/**
 * Options for image wrapper style variants
 * @since 1.7.0
 */
export interface WrapperOptions {
  scaled?: boolean;
}

/**
 * Options for image aspect ratio style variants
 * @since 1.7.0
 */
export interface AspectOptions {
  ratio?: 'standard' | 'square';
}

/**
 * Base image container styles.
 * @type {object}
 * @private
 */
const base = {
  position: `relative`,
  display: `inline-block`,
  overflow: `hidden`,
};

/**
 * Base image element styles.
 * @type {object}
 * @private
 */
const imageBase = {
  display: `block`,
};

/**
 * Styles for scaled image display with cover behavior.
 * @type {object}
 * @private
 */
const imageScaled = {
  ...imageBase,
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
};

/**
 * Initial animation state for hover effects.
 * @type {object}
 * @private
 */
const imageAnimationStart = {
  transform: 'scale(1)',
  transition: 'transform 0.5s',
};

/**
 * Final animation state for hover effects.
 * @type {object}
 * @private
 */
const imageAnimationEnd = {
  transform: 'scale(1.025)',
};

/**
 * Base link styles for image links.
 * @type {object}
 * @private
 */
const linkBase = {
  lineHeight: `0`,
  overflow: `hidden`,
  display: `flex`,
};

/**
 * Styles for sign/badge overlays.
 * @type {object}
 * @private
 */
const signBase = {
  [`& .${box.white.className}`]: {
    position: `absolute`,
    bottom: `${spacing.min}`,
    left: `${spacing.min}`,

    [`@media (max-width: ${media.breakpointValues.large.min}px)`]: {
      display: `none`,
    },
  },
};

/**
 * Styles for linked images with hover effects.
 * @type {object}
 * @private
 */
const linkImage = {
  '& img': {
    ...imageBase,
  },

  '& > a': {
    ...linkBase,

    '& img': {
      ...imageAnimationStart,
    },
  },

  [`a:hover, a:focus`]: {
    '& > img': {
      ...imageAnimationEnd,
    },
  },
};

/**
 * Styles for linked scaled images with hover effects.
 * @type {object}
 * @private
 */
const linkImageScaled = {
  '& img': {
    ...imageBase,
    ...imageAnimationStart,
    ...imageScaled,
  },

  '& > a': {
    ...linkBase,
    height: '100%',
    width: '100%',

    '& img': {
      ...imageAnimationStart,
    },
  },

  [`a:hover, a:focus`]: {
    '& > img': {
      ...imageAnimationEnd,
    },
  },
};

/**
 * Composable image wrapper style selector
 *
 * Creates image wrapper styles with configurable scaling options.
 * Wrappers provide container styles with animation and sign overlay support.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Basic wrapper without scaling
 * const styles = composeWrapper();
 *
 * // Wrapper with scaled image behavior
 * const styles = composeWrapper({ scaled: true });
 * ```
 *
 * @since 1.7.0
 */
export function composeWrapper(options?: WrapperOptions): JssObject {
  const { scaled = false } = options || {};

  let composed: Record<string, any> = {
    ...base,
    ...signBase,
  };

  if (scaled) {
    composed = {
      ...composed,
      width: '100%',
      height: `100%`,
      ...linkImageScaled,
    };
  } else {
    composed = {
      ...composed,
      ...linkImage,
    };
  }

  // Generate appropriate className
  const className = scaled
    ? `${classNamePrefix}-wrapper-scaled`
    : `${classNamePrefix}-wrapper`;

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

/**
 * Composable aspect ratio style selector
 *
 * Creates aspect ratio constraint styles for images.
 * Aspect ratios maintain consistent image dimensions across different content.
 *
 * @param options - Configuration object for aspect ratio variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Standard 4:3 aspect ratio
 * const styles = composeAspect({ ratio: 'standard' });
 *
 * // Square 1:1 aspect ratio
 * const styles = composeAspect({ ratio: 'square' });
 * ```
 *
 * @since 1.7.0
 */
export function composeAspect(options?: AspectOptions): JssObject {
  const { ratio = 'standard' } = options || {};

  let aspectValue: string;
  let className: string;

  if (ratio === 'square') {
    aspectValue = '1/1';
    className = `${classNamePrefix}-aspect-square`;
  } else {
    // standard (4:3)
    aspectValue = '4/3';
    className = `${classNamePrefix}-aspect-standard`;
  }

  return create.jss.objectWithClassName({
    aspectRatio: aspectValue,
    width: 'auto',

    '& img': {
      aspectRatio: aspectValue,
      width: 'auto',
    },

    className,
  });
}

/**
 * Image caption overlay style.
 * @returns {JssObject} Styles for image captions that appear as overlays.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.image.caption
 * ```
 * @example
 * ```css
 * class="umd-asset-image-caption"
 * ```
 * @since 1.1.0
 */
export const caption: JssObject = create.jss.objectWithClassName({
  ...sans.min,
  className: `${classNamePrefix}-caption`,
  position: 'absolute',
  bottom: '0',
  right: '0',
  height: 'auto !important',
  width: 'auto !important',
  padding: `${spacing.min}`,
  backgroundColor: ` rgba(0, 0, 0, 0.5)`,
  color: `${color.white}`,
  zIndex: '99',
});

/**
 * Basic image wrapper style.
 * @returns {JssObject} Container styles for images with animation effects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.image.wrapper
 * ```
 * @example
 * ```css
 * class="umd-asset-image-wrapper"
 * ```
 * @since 1.1.0
 */
export const wrapper: JssObject = composeWrapper();

/**
 * Scaled image wrapper style.
 * @returns {JssObject} Container styles for scaled images with animation effects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.image.wrapperScaled
 * ```
 * @example
 * ```css
 * class="umd-asset-image-wrapper-scaled"
 * ```
 * @since 1.1.0
 */
export const wrapperScaled: JssObject = composeWrapper({ scaled: true });

/**
 * Standard aspect ratio (4:3) for images.
 * @returns {JssObject} Styles to enforce 4:3 aspect ratio on images.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.image.aspectStandard
 * ```
 * @example
 * ```css
 * class="umd-asset-image-aspect-standard"
 * ```
 * @since 1.1.0
 */
export const aspectStandard: JssObject = composeAspect({ ratio: 'standard' });

/**
 * Square aspect ratio (1:1) for images.
 * @returns {JssObject} Styles to enforce 1:1 square aspect ratio on images.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.image.aspectSquare
 * ```
 * @example
 * ```css
 * class="umd-asset-image-aspect-square"
 * ```
 * @since 1.1.0
 */
export const aspectSquare: JssObject = composeAspect({ ratio: 'square' });
