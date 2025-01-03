import { colors, spacing } from '../../tokens';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-cluster';

const pill = {
  ...sans.min,
  display: 'inline-block',
  padding: `${spacing.min} ${spacing.xs}`,
  marginBottom: '0',
  marginTop: spacing.min,
  transition: 'background-color 0.3s',

  '& > span': {
    display: 'flex',
    gap: '4px',
    whiteSpace: 'nowrap',
  },
};

const pillSvg = {
  height: '12px',
  width: '12px',
};

// umd-text-cluster-pill
export const pillList = create.jssObject({
  className: [
    `${classNamePrefix}-pill`,
    /** @deprecated Use 'umd-text-cluster-pill' instead */
    'umd-pill-list',
  ],

  marginTop: `-${spacing.min}`,

  '& > *': {
    ...pill,
    backgroundColor: colors.gray.lightest,
  },

  '& svg': {
    ...pillSvg,
  },

  '& a:hover, & a:focus': {
    backgroundColor: colors.gold,
  },
});

// umd-text-cluster-pill-dark
export const pillListDark = create.jssObject({
  ...pillList,

  className: [
    `${classNamePrefix}-pill-dark`,
    /** @deprecated Use 'umd-text-cluster-pill-dark' instead */
    'umd-pill-list-dark',
  ],

  '& > *': {
    ...pill,
    backgroundColor: colors.gray.dark,
    color: colors.white,
  },

  '& svg': {
    ...pillSvg,
    fill: colors.white,
  },

  '& a:hover, & a:focus': {
    backgroundColor: colors.gray.lighter,
    color: colors.black,

    '& svg': {
      fill: colors.black,
    },
  },
});

// @Deprecated
export const pillDoNotUse = create.jssObject({
  className: [
    /** @deprecated Use 'umd-pill-list' instead */
    'umd-pills',
  ],

  marginTop: `-${spacing.min}`,

  '& > *': {
    backgroundColor: colors.gray.lightest,
    display: 'inline-block',
    padding: `${spacing.min} ${spacing.xs}`,
    marginBottom: '0',
    marginTop: spacing.min,
  },

  '& a:hover, &:focus': {
    textDecoration: 'underline',
  },
});
