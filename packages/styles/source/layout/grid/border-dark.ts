import { Colors } from '../../tokens';
import { create } from '../../utilities';
import { base } from './base';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-border-dark';

const boarderBaseDark = {
  border: `1px solid ${Colors.gray.dark}`,
  borderBottom: `none`,
};

// umd-layout-grid-border-dark-two
export const columnsTwo = create.jssObject({
  ...base.two,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-border-dark-two' instead */
    'umd-grid-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.dark}`,
    borderRight: `1px solid ${Colors.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(2)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },
  },
});

// umd-layout-grid-border-dark-three
export const columnsThreeDark = create.jssObject({
  ...base.three,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-border-dark-three' instead */
    'umd-grid-three-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.dark}`,
    borderRight: `1px solid ${Colors.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(3)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },
  },
});

// umd-layout-grid-border-dark-four
export const columnsFourDark = create.jssObject({
  ...base.four,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-border-dark-four' instead */
    'umd-grid-four-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.dark}`,
    borderRight: `1px solid ${Colors.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(4)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:nth-child(4)': {
      borderTop: `1px solid ${Colors.gray.dark}`,
    },
  },
});
