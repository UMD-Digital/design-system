import { color, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-list';

const smallBreakpoint = 479;
const mediumBreakpointStart = smallBreakpoint + 1;
const mediumBreakpoint = 650;

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

const createTextStyles = (customStyles = {}) => {
  return {
    [`& > div > *:nth-child(2)`]: {
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
    [`& > div > *:last-child:not(.${image.wrapperScaled.className})`]: {
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
    [`&:has(img) > div`]: {
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
