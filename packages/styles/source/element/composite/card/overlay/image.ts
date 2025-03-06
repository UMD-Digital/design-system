import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-image';

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

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: `${spacing.lg} ${spacing.md}`,
    paddingTop: `${spacing['4xl']}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '360px',

    ...createContainerQuery(media.breakpointValues.medium.min, 'min-width', {
      paddingTop: `${spacing['8xl']}`,
      minHeight: `450px`,
    }),
    ...customStyles,
  };
};

// umd-element-composite-card-overlay-element-quote
export const quoateContainer = create.jssObject({
  className: `${classNamePrefix}-element-quote`,
  width: '41px',
  height: '30px',
  marginBottom: `${spacing.xs}`,

  '& svg': {
    fill: `${color.red}`,
  },
});

// umd-element-composite-card-overlay-image-tint
export const tint = create.jssObject({
  className: `${classNamePrefix}`,
  ...createContainerStyles({}),
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
      opacity: 1,
      transition: `opacity 0.5s ease-in-out`,
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 60%, rgba(0, 0, 0, 0.9) 100%)',
    },

    [`&[data-size="large"]:before`]: {
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 30%, rgba(0, 0, 0, 0.9) 100%)',
    },

    [`&:hover:before`]: {
      opacity: 0.7,
    },

    '&:hover & img': {
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-in-out',
    },
  }),
});
