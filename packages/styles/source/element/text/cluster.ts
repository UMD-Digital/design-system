import { color, spacing } from '../../token';
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
    backgroundColor: color.gray.lightest,
  },

  '& svg': {
    ...pillSvg,
  },

  '& a:hover, & a:focus': {
    backgroundColor: color.gold,
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
    backgroundColor: color.gray.dark,
    color: color.white,
  },

  '& svg': {
    ...pillSvg,
    fill: color.white,
  },

  '& a:hover, & a:focus': {
    backgroundColor: color.gray.lighter,
    color: color.black,

    '& svg': {
      fill: color.black,
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
    backgroundColor: color.gray.lightest,
    display: 'inline-block',
    padding: `${spacing.min} ${spacing.xs}`,
    marginBottom: '0',
    marginTop: spacing.min,
  },

  '& a:hover, &:focus': {
    textDecoration: 'underline',
  },
});
