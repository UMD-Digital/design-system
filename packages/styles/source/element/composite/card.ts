import { color, font, spacing } from '../../token';
import { image } from '../asset';
import { create } from '../../utilities';
import { min } from 'typography/sans';

// Consistent naming
const classNamePrefix = 'umd-layout-element-card';

const smallBreakpoint = 380;
const mediumBreakpoint = 650;

const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@container (${comparison}: ${breakpoint}px)`]: styles,
  };
};

const createRangeContainerQuery = (min: number, max: number, styles = {}) => {
  return {
    [`@container (min-width: ${min}px) and (max-width: ${max})`]: styles,
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
      ...createContainerQuery(mediumBreakpoint, 'max-width', {
        marginLeft: spacing.min,
        marginBottom: spacing.md,
        width: '140px',
        float: 'right',
      }),

      '& img': {
        ...createContainerQuery(mediumBreakpoint, 'max-width', {
          height: 'auto !important',
        }),
      },
    },
  };
};

const createTextStyles = (customStyles = {}) => {
  return {
    [`& > div:not(.${image.wrapperScaled.className})`]: {
      ...createContainerQuery(mediumBreakpoint, 'min-width', {
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
      ...createContainerQuery(mediumBreakpoint, 'max-width', {}),
    },
    ...customStyles,
  };
};

// umd-layout-element-card-light
export const light = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-layout-element-card-border
export const border = create.jssObject({
  className: `${classNamePrefix}-border`,
  ...createContainerStyles({
    border: `1px solid ${color.gray.light}`,
    height: '100%',
    ...createContainerQuery(mediumBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpoint, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createRangeContainerQuery(smallBreakpoint, mediumBreakpoint, {
      marginLeft: spacing.sm,
    }),
  }),
});

// umd-layout-element-card-dark
export const dark = create.jssObject({
  className: `${classNamePrefix}-dark`,

  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    color: color.white,
    height: '100%',
    ...createContainerQuery(mediumBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpoint, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createContainerQuery(mediumBreakpoint, 'max-width', {
      marginRight: spacing.sm,
      marginTop: spacing.sm,
    }),
  }),
});

// umd-layout-element-card-transparent
export const transparent = create.jssObject({
  className: `${classNamePrefix}-transparent`,

  ...createContainerStyles({
    backgroundColor: 'transparent',
    color: color.white,
    height: '100%',
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpoint, 'min-width', {
      paddingTop: spacing.md,
    }),
  }),
  ...createImageStyles(),
});
