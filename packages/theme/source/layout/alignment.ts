import { Tokens } from '@universityofmaryland/variables';

const { spacing, queries } = Tokens;

const AlignedContentBase = {
  display: 'block',

  '& > *': {
    textWrap: 'pretty',
    marginTop: spacing.sm,

    [`@media (${queries.large.min})`]: {
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
