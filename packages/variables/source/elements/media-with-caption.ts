import { colors } from '../tokens/colors';
import { spacing } from '../tokens/layout';
import { typography } from '../common/typography';

const captionedMedia = {
  '.umd-media-with-caption': {
    display: 'table',
    maxWidth: '100%',
  },

  '.umd-caption': {
    ...typography['.umd-sans-smaller'],
    captionSide: 'bottom',
    color: colors.gray.mediumAA,
    display: 'table-caption',
    paddingTop: spacing.xs,

    '& > *': {
      marginTop: spacing.sm,

      '&:first-child': {
        marginTop: '0',
      },
    },
  },
};

export { captionedMedia };
