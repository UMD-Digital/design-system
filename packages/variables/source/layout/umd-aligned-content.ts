import { queries } from '../tokens/breakpoints';
import { spacing } from '../tokens/spacing';

const umdAlignedContentBase = {
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

const umdAlignedContent = {
  '.umd-aligned-content': { ...umdAlignedContentBase },

  '.umd-layout-aligned-right': {
    ...umdAlignedContentBase,
    ...{
      textAlign: 'right',

      '& > *': {
        justifyContent: 'flex-end',
      },
    },
  },

  '.umd-layout-aligned-center': {
    ...umdAlignedContentBase,
    ...{
      textAlign: 'center',

      '& > *': {
        justifyContent: 'center',
      },
    },
  },
};

export { umdAlignedContent };
