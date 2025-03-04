import { color, media, spacing } from '../../../token';
import { image as imageElement } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay';

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
    [`& > div:first-child`]: {
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
    padding: `${spacing.lg} ${spacing.md}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',

    ...createContainerQuery(media.breakpointValues.tablet.min, 'min-width', {
      minHeight: '456px',
    }),
    ...customStyles,
  };
};

// umd-element-composite-card-overlay-color-light
export const colorLight = create.jssObject({
  className: `${classNamePrefix}-color-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-overlay-color-dark
export const colorDark = create.jssObject({
  className: `${classNamePrefix}-color-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
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
      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
    },
  }),
});
