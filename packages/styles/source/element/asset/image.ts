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
 * Base image container styles.
 * @private
 */
const base = {
  position: `relative`,
  display: `inline-block`,
  height: `100%`,
  overflow: `hidden`,
};

/**
 * Base image element styles.
 * @private
 */
const imageBase = {
  display: `block`,
  height: '100%',
};

/**
 * Styles for scaled image display with cover behavior.
 * @private
 */
const imageScaled = {
  ...imageBase,
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
};

/**
 * Initial animation state for hover effects.
 * @private
 */
const imageAnimationStart = {
  transform: 'scale(1)',
  transition: 'transform 0.5s',
};

/**
 * Final animation state for hover effects.
 * @private
 */
const imageAnimationEnd = {
  transform: 'scale(1.025)',
};

/**
 * Base link styles for image links.
 * @private
 */
const linkBase = {
  lineHeight: `0`,
  overflow: `hidden`,
  display: `flex`,
};

/**
 * Styles for sign/badge overlays.
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
export const wrapper: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-wrapper`,
  ...base,
  ...linkImage,
  ...signBase,
});

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
export const wrapperScaled: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-wrapper-scaled`,
  ...base,
  width: '100%',
  ...linkImageScaled,
  ...signBase,
});

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
export const aspectStandard: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-aspect-standard`,
  aspectRatio: `4/3`,
  width: 'auto',

  '& img': {
    aspectRatio: `4/3`,
    width: 'auto',
  },
});

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
export const aspectSquare: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-aspect-square`,
  aspectRatio: `1/1`,
  width: 'auto',

  '& img': {
    aspectRatio: `1/1`,
    width: 'auto',
  },
});
