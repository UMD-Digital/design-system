import { color, media, spacing } from '../../../token';
import { image as imageElement } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay';

const createMediaQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};

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

const colorContainerBase = {
  padding: `${spacing.lg} ${spacing.md}`,
  ...createMediaQuery(media.breakpointValues.tablet.min, 'min-width', {
    minHeight: '456px',
  }),
};

// umd-element-composite-card-overlay-color-light
export const colorLight = create.jssObject({
  className: `${classNamePrefix}-color-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-overlay-color-dark
export const colorDark = create.jssObject({
  className: `${classNamePrefix}-color-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-overlay-icon-container
export const iconContainer = create.jssObject({
  className: `${classNamePrefix}-icon-container`,
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
export const iconLight = create.jssObject({
  className: `${classNamePrefix}-icon-light`,
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
export const iconDark = create.jssObject({
  className: `${classNamePrefix}-icon-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...iconContainerBase,
  }),
  ...createTextStyles({
    ...iconContainerTextBase,
  }),
  ...createImageStyles({}),
});

// umd-element-composite-card-overlay-image
export const image = create.jssObject({
  className: `${classNamePrefix}-image`,
  ...createContainerStyles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  ...createTextStyles({
    height: 'auto',
  }),
  ...createImageStyles({
    [`&:before`]: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 60%, rgba(0, 0, 0, 0.9) 100%)',
    },
  }),
});
