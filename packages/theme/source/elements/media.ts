import { Tokens, Typography } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export const CaptionedMedia = {
  '.umd-media-with-caption': {
    display: 'table',
    maxWidth: '100%',
  },

  '.umd-caption': {
    ...Typography.sans.smaller,
    captionSide: 'bottom',
    color: Colors.gray.mediumAA,
    display: 'table-caption',
    paddingTop: Spacing.xs,

    '& > *': {
      marginTop: Spacing.sm,

      '&:first-child': {
        marginTop: '0',
      },
    },
  },
};
