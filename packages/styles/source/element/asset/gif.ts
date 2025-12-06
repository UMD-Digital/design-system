/**
 * @module element/asset/gif
 * Provides styles for animated GIF assets with playback controls.
 */

import { color, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-asset-gif';

/**
 * Toggle control for GIF animation playback.
 * @returns {JssObject} Styles for GIF container with play/pause button.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.asset.gif.toggle
 * ```
 * @example
 * ```css
 * class="umd-asset-gif-toggle"
 * ```
 * @since 1.1.0
 */
export const toggle: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-toggle`,
  display: 'block',
  height: '100%',
  width: '100%',

  ['& canvas, & img']: {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transform: 'scale(1)',
    transition: 'transform 0.5s ease-in-out',
  },

  ['& canvas']: {
    opacity: '0',
    objectFit: 'cover',
  },

  ['& button']: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '44px',
    height: '44px',
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
    zIndex: '99',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['& svg']: {
      fill: `${color.white}`,
      width: `${spacing.md}`,
    },
  },
});
