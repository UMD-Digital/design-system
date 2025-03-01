import { color, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-block';

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

const createRangeContainerQuery = (min: number, max: number, styles = {}) => {
  return {
    [`@media (min-width: ${min}px) and (max-width: ${max})`]: styles,
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
    [`& > div > div:not(.${image.wrapperScaled.className})`]: {
      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        paddingTop: spacing.md,
      }),
      ...customStyles,
    },
  };
};

const createContainerStyles = (customStyles = {}) => {
  return {
    maxWidth: `${spacing.maxWidth.smallest}`,

    [`&:has(img)`]: {
      ...createContainerQuery(smallBreakpoint, 'max-width', {}),
    },
    ...customStyles,
  };
};

// umd-element-composite-card-block-light
export const light = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-block-border
export const border = create.jssObject({
  className: `${classNamePrefix}-border`,
  ...createContainerStyles({
    border: `1px solid ${color.gray.light}`,
    height: '100%',
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createRangeContainerQuery(mediumBreakpointStart, mediumBreakpoint, {
      marginLeft: spacing.sm,
    }),
  }),
});

// umd-element-composite-card-block-dark
export const dark = create.jssObject({
  className: `${classNamePrefix}-dark`,

  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    color: color.white,
    height: '100%',
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      marginRight: spacing.sm,
      marginTop: spacing.sm,
    }),
  }),
});

// umd-element-composite-card-block-transparent
export const transparent = create.jssObject({
  className: `${classNamePrefix}-transparent`,

  ...createContainerStyles({
    backgroundColor: 'transparent',
    color: color.white,
    height: '100%',
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      paddingTop: spacing.md,
    }),
  }),
  ...createImageStyles(),
});
