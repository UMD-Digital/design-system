/**
 * @module element/composite/card/list
 * Provides styles for list-style card components with various themes and layouts.
 */

import { color, media, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';
import type { JssObject } from '../../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-list';

const smallBreakpoint = media.breakpointValues.small.max;
const mediumBreakpointStart = media.breakpointValues.medium.min;
const mediumBreakpoint = media.breakpointValues.large.min;

/**
 * Creates container query-style media query for responsive layouts.
 * @param {number} breakpoint - The breakpoint value in pixels
 * @param {string} comparison - The comparison operator ('min-width' or 'max-width')
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Media query object with styles
 * @private
 */
const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};

const createImageStyles = (customStyles = {}) => {
  const baseStyles = {
    height: 'auto',
    ...customStyles,
  };

  return {
    [`.${image.wrapper.className}, .${image.wrapperScaled.className}`]: {
      ...baseStyles,
      ...createContainerQuery(smallBreakpoint, 'max-width', {
        marginLeft: spacing.min,
        marginBottom: spacing.md,
        width: '120px',
        float: 'right',
      }),

      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        display: 'block',
        width: '160px',
        order: '3',
      }),

      ...createContainerQuery(mediumBreakpoint, 'min-width', {
        width: '208px',
      }),

      '& img': {
        ...createContainerQuery(smallBreakpoint, 'max-width', {
          height: 'auto !important',
        }),
      },
    },
  };
};

const createPersonImageStyles = (customStyles = {}) => {
  const baseStyles = {
    height: 'auto',
    ...customStyles,
  };

  return {
    [`.${image.wrapper.className}`]: {
      ...createContainerQuery(smallBreakpoint, 'max-width', {
        width: '100%',
        marginBottom: `${spacing.md}`,
        backgroundColor: `${color.gray.lighter}`,
        display: 'flex',
        justifyContent: 'center',
      }),

      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        display: 'block',
        width: '160px',
        order: '-1',
        paddingRight: `${spacing.md}`,
        alignSelf: 'flex-start',
      }),

      ...createContainerQuery(mediumBreakpoint, 'min-width', {
        width: '208px',
      }),

      '& img, & svg': {
        ...createContainerQuery(smallBreakpoint, 'max-width', {
          height: 'auto !important',
          width: '140px',
        }),
      },
      ...baseStyles,
    },
  };
};

const createPersonTabularImageStyles = (customStyles = {}) => {
  const baseStyles = {
    height: 'auto',
    ...customStyles,
  };

  return {
    [`.${image.wrapper.className}`]: {
      ...createContainerQuery(smallBreakpoint, 'max-width', {
        marginBottom: `${spacing.md}`,
        backgroundColor: `${color.gray.lighter}`,
        display: 'flex',
        justifyContent: 'center',
      }),

      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        display: 'block',
        width: '96px',
        order: '-1',
        paddingRight: `${spacing.md}`,
        alignSelf: 'flex-start',
      }),

      '& img, & svg': {
        ...createContainerQuery(smallBreakpoint, 'max-width', {
          height: 'auto !important',
          width: '140px',
        }),
      },
      ...baseStyles,
    },
  };
};

const createTextStyles = (customStyles = {}) => {
  return {
    [`& > *:nth-child(2)`]: {
      flex: '1 0',

      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        paddingRight: `${spacing.md}`,
        order: '2',
      }),

      ...createContainerQuery(mediumBreakpoint, 'min-width', {
        width: '208px',
      }),
      ...customStyles,
    },
  };
};

const createEventStyles = (customStyles = {}) => {
  return {
    [`& > *:last-child:not(.${image.wrapper.className}), & > *:last-child:not(.${image.wrapperScaled.className})`]:
      {
        width: `${spacing.xl}`,
        order: 1,
        alignSelf: 'flex-start',

        ...createContainerQuery(mediumBreakpoint, 'max-width', {
          display: 'none',
        }),
        ...createContainerQuery(mediumBreakpoint, 'min-width', {
          width: `${spacing['8xl']}`,
        }),
      },
    ...customStyles,
  };
};

const createWrapperStyles = (customStyles = {}) => {
  return {
    [`&:has(img)`]: {
      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        display: 'flex',
        justifyContent: 'space-between',
      }),
    },
    ...customStyles,
  };
};

const createContainerStyles = (customStyles = {}) => {
  return {
    maxWidth: `${spacing.maxWidth.smallest}`,
    paddingBottom: '24px',
    borderBottom: `1px solid ${color.gray.light}`,
    overflow: 'hidden',

    [`&:has(img)`]: {
      ...createContainerQuery(smallBreakpoint, 'max-width', {}),
    },
    ...customStyles,
  };
};

const darkContainerStyles = {
  backgroundColor: color.black,
  color: color.white,
  borderBottom: `1px solid ${color.gray.dark}`,
};

/**
 * Light theme list card style.
 * @returns {JssObject} Light themed list card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.light
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-light"
 * ```
 * @since 1.1.1
 */
export const light: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Dark theme list card style.
 * @returns {JssObject} Dark themed list card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.dark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-dark"
 * ```
 * @since 1.1.1
 */
export const dark: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-dark`,

  ...createContainerStyles({
    ...darkContainerStyles,
  }),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Light theme event list card style.
 * @returns {JssObject} Light themed event list card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.eventLight
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-event-light"
 * ```
 * @since 1.1.1
 */
export const eventLight: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-event-light`,

  ...createContainerStyles(),
  ...createEventStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Light theme event dark card style.
 * @returns {JssObject} Light themed event list card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.eventDark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-event-dark"
 * ```
 * @since 1.1.1
 */

export const eventDark = create.jss.objectWithClassName({
  className: `${classNamePrefix}-event-dark`,

  ...createContainerStyles({
    ...darkContainerStyles,
  }),
  ...createWrapperStyles(),
  ...createEventStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Person style.
 * @returns {JssObject} Light themed person list card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.person
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-person"
 * ```
 * @since 1.1.1
 */

export const person = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person`,
  ...createContainerStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createPersonImageStyles(),
});

/**
 * Person Dark style.
 * @returns {JssObject} Dark themed event person card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.personDark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-person-dark"
 * ```
 * @since 1.1.1
 */

export const personDark = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person-dark`,
  ...createContainerStyles({
    ...darkContainerStyles,
  }),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createPersonImageStyles({
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      width: '100%',
      marginBottom: `${spacing.md}`,
      backgroundColor: `${color.gray.darker}`,
      display: 'flex',
      justifyContent: 'center',
    }),
  }),
});

const tabularColumnStyles = {
  order: 3,

  ...createContainerQuery(mediumBreakpoint, 'min-width', {
    width: '30%',
  }),
};

/**
 * Person three column style.
 * @returns {JssObject} Three column list person with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.personTabular
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-person-tabular"
 * ```
 * @since 1.9.1
 */

export const personTabular = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person-tabular`,
  ...createContainerStyles({
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      flexDirection: 'column',
    }),

    [`& > *:last-child`]: {
      ...tabularColumnStyles,
    },
  }),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createPersonTabularImageStyles(),
});

/**
 * Person three column style with dark theme.
 * @returns {JssObject} Three column person list with dark theme and responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.list.personTabularDark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-list-person-tabular-dark"
 * ```
 * @since 1.9.1
 */

export const personTabularDark = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person-tabular-dark`,
  ...createContainerStyles({
    ...darkContainerStyles,

    [`& > *:last-child`]: {
      ...tabularColumnStyles,
    },
  }),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createPersonTabularImageStyles({
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      width: '100%',
      marginBottom: `${spacing.md}`,
      backgroundColor: `${color.gray.darker}`,
      display: 'flex',
      justifyContent: 'center',
    }),
  }),
});
