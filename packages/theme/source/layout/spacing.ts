import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

const SpacingContentBase = {
  display: 'block',

  '& > *': {
    textWrap: 'pretty',
    marginTop: Spacing.sm,

    [`@media (${Queries.large.min})`]: {
      marginTop: Spacing.md,
    },

    '&:first-child': {
      marginTop: '0',
    },
  },
};

export const SpacingContent = {
  '.umd-layout-spacing-left': { ...SpacingContentBase },

  '.umd-layout-spacing-right': {
    textAlign: 'right',

    '& > *': {
      ...SpacingContentBase['& > *'],

      justifyContent: 'flex-end',
    },
  },

  '.umd-layout-spacing-center': {
    textAlign: 'center',

    '& > *': {
      ...SpacingContentBase['& > *'],

      justifyContent: 'center',
    },
  },
};
