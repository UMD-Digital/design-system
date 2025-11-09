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
 * Options for composable event meta item styles
 * @since 1.7.0
 */
export interface MetaItemOptions {
  /** Theme variant for color */
  theme?: 'light' | 'dark';
}

/**
 * Container for event metadata.
 * @returns {JssObject} Container styles for event metadata with container query support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.container
 * ```
 * @example
 * ```css
 * class="umd-element-event-meta-container"
 * ```
 * @since 1.1.0
 */
export const container: JssObject = create.jss.objectWithClassName({
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
 * @example
 * ```css
 * class="umd-element-event-meta-wrapper"
 * ```
 * @since 1.1.0
 */
export const wrapper: JssObject = create.jss.objectWithClassName({
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
 * Base styles for event metadata item.
 * @type {object}
 * @private
 */
const itemBase = {
  ...sans.smaller,
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
};

/**
 * Composable event meta item style selector
 *
 * Creates event metadata item styles with configurable theme options.
 * This function allows theme-aware color selection for event metadata.
 *
 * @param options - Configuration object for theme variant
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeItem();
 *
 * // Dark theme
 * const styles = composeItem({ theme: 'dark' });
 *
 * // In element builder with theme
 * const styleElements = {
 *   ...event.meta.composeItem({
 *     theme: isThemeDark ? 'dark' : 'light'
 *   })
 * };
 * ```
 *
 * @since 1.7.0
 */
export function composeItem(options?: MetaItemOptions): JssObject {
  const { theme = 'light' } = options || {};

  const composed = {
    ...itemBase,
    color: theme === 'dark' ? color.white : color.gray.dark,

    '& svg path': {
      fill: theme === 'dark' ? color.white : color.gray.dark,
    },
  };

  // Generate className
  const className =
    theme === 'dark'
      ? `${classNamePrefix}-item-dark`
      : `${classNamePrefix}-item`;

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

/**
 * Individual event metadata item.
 * @returns {JssObject} Styles for individual event metadata items with icon support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.item
 * ```
 * @example
 * ```css
 * class="umd-element-event-meta-item"
 * ```
 * @since 1.1.0
 */
export const item: JssObject = composeItem();

/**
 * Individual event metadata item with dark theme.
 * @returns {JssObject} Styles for individual event metadata items with dark theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.event.meta.itemDark
 * ```
 * @example
 * ```css
 * class="umd-element-event-meta-item-dark"
 * ```
 * @since 1.7.0
 */
export const itemDark: JssObject = composeItem({ theme: 'dark' });
