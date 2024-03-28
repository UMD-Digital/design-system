import { Tokens } from '@universityofmaryland/variables';
import { GridColumnsGutterless } from '../layout/grid-gutterless';

const { Queries, Spacing } = Tokens;

const CardsOverlayAnimations = {
  '.umd-grid-two-float-overlay-card': {
    ...GridColumnsGutterless['.umd-grid-gutterless-two'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

    '& umd-element-card-overlay': {
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

  '.umd-grid-three-float-overlay-card': {
    ...GridColumnsGutterless['.umd-grid-gutterless-three'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

    '& umd-element-card-overlay': {
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

  '.umd-grid-four-float-overlay-card': {
    ...GridColumnsGutterless['.umd-grid-gutterless-four'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

    '& umd-element-card-overlay': {
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
};

export default {
  ...CardsOverlayAnimations,
};
