import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

const AlignedContentBase = {
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
