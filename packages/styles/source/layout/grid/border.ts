import { color } from '../../token';
import { create } from '../../utilities';
import { base } from './base';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-border';

const boarderBase = {
  border: `1px solid ${color.gray.light}`,
  borderBottom: `none`,
};

// umd-layout-grid-border-two
export const columnsTwo = create.jssObject({
  ...base.two,
  ...boarderBase,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-border-two' instead */
    'umd-grid-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(2)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});

// umd-layout-grid-border-three
export const columnsThree = create.jssObject({
  ...base.three,
  ...boarderBase,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-border-three' instead */
    'umd-grid-three-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(3)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});

// umd-layout-grid-border-four
export const columnsFour = create.jssObject({
  ...base.four,
  ...boarderBase,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-border-four' instead */
    'umd-grid-four-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(4)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(4)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});
