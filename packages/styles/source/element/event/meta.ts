/**
 * @module element/event/meta
 * Provides styles for event metadata displays including date, time, and location.
 */

import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-event-meta';

/**
 * Container for event metadata.
 * @returns {JssObject} Container styles for event metadata with container query support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.container
 * ```
 * @since 1.8.0
 */
export const container: JssObject = create.jssObject({
  className: `${classNamePrefix}-container`,
  container: 'inline-size',

  '+ *': {
    marginTop: `${spacing.sm}`,

    [`@media (max-width: ${media.breakpoints.small.max})`]: {
      marginTop: spacing.min,
    },
  },
});

/**
 * Wrapper for event metadata items.
 * @returns {JssObject} Flexbox wrapper styles for event metadata items with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.wrapper
 * ```
 * @since 1.8.0
 */
export const wrapper: JssObject = create.jssObject({
  className: `${classNamePrefix}-wrapper`,
  display: 'flex',
  flexWrap: 'wrap',

  '> *': {
    marginRight: `5px`,
    marginTop: `5px`,
  },

  '> *:not(:first-child)': {
    display: 'flex',
    width: '100%',
  },

  '> *:first-child': {
    [`@container (min-width: ${media.breakpointValues.medium.max}px)`]: {
      display: 'flex',
    },

    '> *': {
      display: 'flex',
      alignItems: 'center',
    },

    '> *:not(:first-child)': {
      [`@container (min-width: ${media.breakpointValues.medium.max}px)`]: {
        marginLeft: `${spacing.xs}`,
      },

      [`@container (max-width: ${media.breakpointValues.medium.max}px)`]: {
        marginTop: `3px`,
      },
    },
  },
});

/**
 * Individual event metadata item.
 * @returns {JssObject} Styles for individual event metadata items with icon support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.item
 * ```
 * @since 1.8.0
 */
export const item: JssObject = create.jssObject({
  ...sans.smaller,
  className: `${classNamePrefix}-item`,
  color: `${color.gray.dark}`,
  fontWeight: `400`,
  marginBottom: '0',

  '& > *:first-child': {
    width: '18px',
    display: 'flex',

    [`@container (min-width: ${media.breakpointValues.large.min}px)`]: {
      width: '20px',
    },
  },

  '& svg': {
    width: '12px',
    height: '12px',

    [`@container (min-width: ${media.breakpointValues.large.min}px)`]: {
      width: '14px',
      height: '14px',
    },
  },
});
