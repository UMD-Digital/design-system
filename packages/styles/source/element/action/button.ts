/**
 * @module element/action/button
 * Provides specialized button styles for multimedia and UI controls.
 */

import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-action-button';

/**
 * Fullscreen button style.
 * @returns {JssObject} Button style for fullscreen controls.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.button.fullScreen
 * ```
 * @example
 * ```css
 * class="umd-action-button-full-screen"
 * ```
 * @since 1.1.0
 */
const { className: _, ...sansMinStyles } = sans.min;
export const fullScreen: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-full-screen`,
  ...sansMinStyles,
  position: 'absolute',
  top: '0',
  right: '0',
  color: `${color.white}`,
  textTransform: 'uppercase',
  fontWeight: '700',
  padding: `${spacing.min}`,
  display: `flex`,
  alignItems: `center`,
  backgroundColor: `rgba(0, 0, 0, 0.5)`,
  transition: `background-color 0.3s`,

  [`&:hover, &:focus`]: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
  },

  '& > span': {
    display: `block`,
    height: `12px`,
    width: `1px`,
    margin: `0 ${spacing.min}`,
    backgroundColor: `${color.gray.mediumAA}`,
  },
});

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
