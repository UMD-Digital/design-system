import { color, media, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-list';

const smallBreakpoint = media.breakpointValues.small.max;
const mediumBreakpointStart = media.breakpointValues.medium.min;
const mediumBreakpoint = media.breakpointValues.large.min;

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
    [`.${image.wrapperScaled.className}`]: {
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
    [`& > *:last-child:not(.${image.wrapperScaled.className})`]: {
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

// umd-element-composite-card-list-light
export const light = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-list-dark
export const dark = create.jssObject({
  className: `${classNamePrefix}-dark`,

  ...createContainerStyles({
    ...darkContainerStyles,
  }),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-list-event-light
export const eventLight = create.jssObject({
  className: `${classNamePrefix}-event-light`,

  ...createContainerStyles(),
  ...createEventStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-list-event-dark
export const eventDark = create.jssObject({
  className: `${classNamePrefix}-event-dark`,

  ...createContainerStyles({
    ...darkContainerStyles,
  }),
  ...createWrapperStyles(),
  ...createEventStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-list-person
export const person = create.jssObject({
  className: `${classNamePrefix}-person`,
  ...createContainerStyles(),
  ...createWrapperStyles(),
  ...createTextStyles(),
  ...createPersonImageStyles(),
});

// umd-element-composite-card-list-person-dark
export const personDark = create.jssObject({
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

// umd-element-composite-card-list-person-tabular
export const personTabular = create.jssObject({
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

// umd-element-composite-card-list-person-tabular-dark
export const personTabularDark = create.jssObject({
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
