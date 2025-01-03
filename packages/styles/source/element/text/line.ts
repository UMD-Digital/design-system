import { color, spacing, media } from '../../token';
import { elements } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-line';

// umd-text-line-tailwing
export const tailwing = create.jssObject({
  className: [
    `${classNamePrefix}-tailwing`,
    /** @deprecated Use 'umd-text-line-tailwing' instead */
    'umd-tailwings-headline',
  ],

  ...elements.labelSmall,
  textAlign: 'center',
  textTransform: 'uppercase',
  overflow: 'hidden',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '9px',
    left: `0`,
    width: `100vw`,
    height: '1px',
    background: `${color.black}`,
    zIndex: -1,
  },

  '& > span': {
    position: 'relative',
    display: 'inline-block',
    maxWidth: '70%',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: `-2px`,
      right: `-2px`,
      height: '100%',
      backgroundColor: `${color.white}`,
      zIndex: -1,

      [`@media (${media.queries.medium.min})`]: {
        left: `-${spacing.min}`,
        right: `-${spacing.min}`,
      },

      [`@media (${media.queries.large.min})`]: {
        left: `-${spacing.sm}`,
        right: `-${spacing.sm}`,
      },
    },
  },

  '& + *': {
    marginTop: spacing.md,
  },
});

const lineTrailingBefore = {
  content: '""',
  position: 'absolute',
  top: '9px',
  right: `0`,
  width: `100vw`,
  height: '1px',
  background: `${color.black}`,
  zIndex: 1,
};

// umd-text-line-trailing
export const lineTrailing = create.jssObject({
  className: [
    `${classNamePrefix}-trailing`,
    /** @deprecated Use 'umd-text-line-trailing' instead */
    'umd-tailwing-right-headline',
  ],

  ...elements.labelSmall,
  textTransform: 'uppercase',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: `${color.white}`,

  '&::before': {
    ...lineTrailingBefore,
  },

  '& > span': {
    position: 'relative',
    backgroundColor: `inherit`,
    paddingRight: spacing.min,
    zIndex: 2,
  },

  '& + *': {
    marginTop: spacing.xl,
  },
});

// umd-text-line-trailing-light
export const lineTrailingLight = create.jssObject({
  ...lineTrailing,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-trailing-light`,
    /** @deprecated Use 'umd-text-line-trailing-light' instead */
    'umd-tailwing-right-headline[theme="light"]',
  ],
});

// umd-text-line-trailing-dark
export const lineTrailingDark = create.jssObject({
  ...lineTrailing,
  backgroundColor: `${color.gray.darker}`,
  color: `${color.white}`,

  className: [
    `${classNamePrefix}-trailing-dark`,
    /** @deprecated Use 'umd-text-line-trailing-dark' instead */
    'umd-tailwing-right-headline[theme="dark"]',
  ],

  '&::before': {
    ...lineTrailingBefore,
    background: `${color.white}`,
  },
});

// umd-text-line-adjustent
export const lineAdjustent = create.jssObject({
  className: [
    `${classNamePrefix}-adjustent`,
    /** @deprecated Use 'umd-text-line-adjustent' instead */
    'umd-adjacent-line-text',
  ],

  position: 'relative',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: '-24px',
    width: '2px',
    height: '100%',
    backgroundColor: color.red,
  },
});
