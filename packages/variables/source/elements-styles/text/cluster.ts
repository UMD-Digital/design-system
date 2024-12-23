import { Colors, Spacing } from '../../tokens';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-cluster';

const pill = {
  ...sans.min,
  display: 'inline-block',
  padding: `${Spacing.min} ${Spacing.xs}`,
  marginBottom: '0',
  marginTop: Spacing.min,
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

  marginTop: `-${Spacing.min}`,

  '& > *': {
    ...pill,
    backgroundColor: Colors.gray.lightest,
  },

  '& svg': {
    ...pillSvg,
  },

  '& a:hover, & a:focus': {
    backgroundColor: Colors.gold,
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
    backgroundColor: Colors.gray.dark,
    color: Colors.white,
  },

  '& svg': {
    ...pillSvg,
    fill: Colors.white,
  },

  '& a:hover, & a:focus': {
    backgroundColor: Colors.gray.lighter,
    color: Colors.black,

    '& svg': {
      fill: Colors.black,
    },
  },
});

// @Deprecated
export const pillDoNotUse = create.jssObject({
  className: [
    /** @deprecated Use 'umd-pill-list' instead */
    'umd-pills',
  ],

  marginTop: `-${Spacing.min}`,

  '& > *': {
    backgroundColor: Colors.gray.lightest,
    display: 'inline-block',
    padding: `${Spacing.min} ${Spacing.xs}`,
    marginBottom: '0',
    marginTop: Spacing.min,
  },

  '& a:hover, &:focus': {
    textDecoration: 'underline',
  },
});
