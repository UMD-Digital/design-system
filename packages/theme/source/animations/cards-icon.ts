import { FlexColumnsCore } from '../layout/flex';
import { Layout } from '@universityofmaryland/variables';

const { FlexChildrenThree, FlexChildrenFour } = Layout;

export const FloatCardsIcon = {
  '.umd-flex-three-float-icon-card': {
    ...FlexColumnsCore['.umd-flex-three'],
    ...{
      '& umd-element-card-icon': {
        ...FlexChildrenThree,
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
    ...FlexColumnsCore['.umd-flex-four'],
    ...{
      '& umd-element-card-icon': {
        ...FlexChildrenFour,
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
