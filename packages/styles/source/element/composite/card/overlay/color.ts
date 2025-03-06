import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-color';

const createMediaQuery = (
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
export const light = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});

// umd-element-composite-card-overlay-color-dark
export const dark = create.jssObject({
  className: `${classNamePrefix}-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});
