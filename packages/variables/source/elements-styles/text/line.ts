import { Colors, Spacing, Media } from '../../tokens';
import { elements, sans } from '../../typography';
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
    background: `${Colors.black}`,
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
      backgroundColor: `${Colors.white}`,
      zIndex: -1,

      [`@media (${Media.queries.medium.min})`]: {
        left: `-${Spacing.min}`,
        right: `-${Spacing.min}`,
      },

      [`@media (${Media.queries.large.min})`]: {
        left: `-${Spacing.sm}`,
        right: `-${Spacing.sm}`,
      },
    },
  },

  '& + *': {
    marginTop: Spacing.md,
  },
});

const lineTrailingBefore = {
  content: '""',
  position: 'absolute',
  top: '9px',
  right: `0`,
  width: `100vw`,
  height: '1px',
  background: `${Colors.black}`,
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
  backgroundColor: `${Colors.white}`,

  '&::before': {
    ...lineTrailingBefore,
  },

  '& > span': {
    position: 'relative',
    backgroundColor: `inherit`,
    paddingRight: Spacing.min,
    zIndex: 2,
  },

  '& + *': {
    marginTop: Spacing.xl,
  },
});

// umd-text-line-trailing-light
export const lineTrailingLight = create.jssObject({
  ...lineTrailing,
  backgroundColor: `${Colors.gray.lighter}`,

  className: [
    `${classNamePrefix}-trailing-light`,
    /** @deprecated Use 'umd-text-line-trailing-light' instead */
    'umd-tailwing-right-headline[theme="light"]',
  ],
});

// umd-text-line-trailing-dark
export const lineTrailingDark = create.jssObject({
  ...lineTrailing,
  backgroundColor: `${Colors.gray.darker}`,
  color: `${Colors.white}`,

  className: [
    `${classNamePrefix}-trailing-dark`,
    /** @deprecated Use 'umd-text-line-trailing-dark' instead */
    'umd-tailwing-right-headline[theme="dark"]',
  ],

  '&::before': {
    ...lineTrailingBefore,
    background: `${Colors.white}`,
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
    backgroundColor: Colors.red,
  },
});
