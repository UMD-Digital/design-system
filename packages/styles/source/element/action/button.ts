/**
 * @module element/action/button
 * Provides specialized button styles for multimedia and UI controls.
 */

import { color, media } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-action-button';

/**
 * Video playback control button style.
 * @returns {JssObject} Button style for video playback controls.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.button.videoState
 * ```
 * @example
 * ```css
 * class="umd-action-button-video-state"
 * ```
 * @since 1.1.0
 */
export const videoState: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-video-state`,
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '40px',
  height: '40px',
  zIndex: '9999',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  transition: `background-color 0.3s`,

  [`@media (${media.queries.tablet.min})`]: {
    width: '44px',
    height: '44px',
  },

  [`&:hover, &:focus`]: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
  },

  '& > svg': {
    fill: `${color.white}`,
    width: '20px',
  },
});
