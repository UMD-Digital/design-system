import { Tokens } from '@universityofmaryland/variables';

const { spacing, Queries } = Tokens;

const AlignedContentBase = {
  display: 'block',

  '& > *': {
    textWrap: 'pretty',
    marginTop: spacing.sm,

    [`@media (${Queries.large.min})`]: {
      marginTop: spacing.md,
    },

    '&:first-child': {
      marginTop: '0',
    },
  },
};

export const AlignedContent = {
  '.umd-aligned-content': { ...AlignedContentBase },

  '.umd-layout-aligned-right': {
    ...AlignedContentBase,
    ...{
      textAlign: 'right',

      '& > *': {
        justifyContent: 'flex-end',
      },
    },
  },

  '.umd-layout-aligned-center': {
    ...AlignedContentBase,
    ...{
      textAlign: 'center',

      '& > *': {
        justifyContent: 'center',
      },
    },
  },
};
