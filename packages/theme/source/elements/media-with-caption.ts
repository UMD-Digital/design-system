import { Tokens, typography } from '@universityofmaryland/variables';

const { colors, spacing } = Tokens;

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
