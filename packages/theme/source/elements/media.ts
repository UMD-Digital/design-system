import { Tokens, Typography } from '@universityofmaryland/variables';

const { Colors, spacing } = Tokens;

const CaptionedMedia = {
  '.umd-media-with-caption': {
    display: 'table',
    maxWidth: '100%',
  },

  '.umd-caption': {
    ...Typography['.umd-sans-smaller'],
    captionSide: 'bottom',
    color: Colors.gray.mediumAA,
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

export default { CaptionedMedia };