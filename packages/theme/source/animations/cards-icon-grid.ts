import { FlexGridCore } from '../layout/flex';
import { Layout } from '@universityofmaryland/variables';

const { FlexRowsChildrenBase: RowsChildren } = Layout;

export const FloatCardsIconGrid = {
  '.umd-flex-three-float-icon-card': {
    ...FlexGridCore['.umd-flex-three'],
    ...{
      '& umd-element-card-icon': {
        ...RowsChildren.Three,
        ...{
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out',
          transform: 'scale(1)',

          [`&:hover,
        &:focus-within `]: {
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.025)',
            zIndex: '99',
          },
        },
      },
    },
  },

  '.umd-flex-four-float-icon-card': {
    ...FlexGridCore['.umd-flex-four'],
    ...{
      '& umd-element-card-icon': {
        ...RowsChildren.Four,
        ...{
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out',
          transform: 'scale(1)',

          [`&:hover,
        &:focus-within `]: {
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.025)',
            zIndex: '99',
          },
        },
      },
    },
  },
};
