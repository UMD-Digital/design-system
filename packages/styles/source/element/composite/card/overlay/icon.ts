import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-icon';

const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@container (${comparison}: ${breakpoint}px)`]: styles,
  };
};

const createImageStyles = (customStyles = {}) => {
  const baseStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    ...customStyles,
  };

  return {
    [`.${imageElement.wrapperScaled.className}`]: {
      ...baseStyles,

      '& img': {},
    },
  };
};

const createTextStyles = (customStyles = {}) => {
  return {
    [`& > div:last-child`]: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9,
      position: 'relative',
      ...customStyles,
    },
  };
};

const createContainerStyles = (customStyles = {}) => {
  return {
    maxWidth: `${spacing.maxWidth.smallest}`,
    padding: `${spacing.md}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...customStyles,
  };
};

// umd-element-composite-card-overlay-icon-element-icon
export const elementIconContainer = create.jssObject({
  className: `${classNamePrefix}-element-container`,
  display: 'flex',
  justifyContent: 'flex-end',
  ...createContainerQuery(media.breakpointValues.medium.min, 'min-width', {
    marginBottom: `${spacing.lg}`,
  }),

  '& *': {
    maxHeight: '120px',

    ...createContainerQuery(media.breakpointValues.small.max, 'max-width', {
      width: '100px',
    }),
  },
});

const iconContainerBase = {
  padding: `${spacing.sm}`,
  paddingBottom: `${spacing.md}`,

  ...createContainerQuery(media.breakpointValues.small.max, 'max-width', {
    display: 'flex',
    flexDirection: 'row-reverse',
  }),
};

const iconContainerTextBase = {
  height: 'auto',

  ...createContainerQuery(media.breakpointValues.small.max, 'max-width', {
    width: `calc(100% - 100px)`,
    paddingRight: `${spacing.md}`,
  }),
};

// umd-element-composite-card-overlay-icon-light
export const light = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
    ...iconContainerBase,
  }),
  ...createTextStyles({
    ...iconContainerTextBase,
  }),
  ...createImageStyles({}),
});

// umd-element-composite-card-overlay-icon-dark
export const dark = create.jssObject({
  className: `${classNamePrefix}-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...iconContainerBase,
  }),
  ...createTextStyles({
    ...iconContainerTextBase,
  }),
  ...createImageStyles({}),
});
