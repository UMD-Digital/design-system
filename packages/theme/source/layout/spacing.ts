import { Tokens, Layout } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

// Deprecated - Do Not Use
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

// Deprecated - Do Not Use
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

export const LayoutSpacing = {
  '.umd-layout-vertical-landing': {
    ...Layout.VerticalLanding,
  },
  '.umd-layout-vertical-landing-child': {
    ...Layout.VerticalLandingChild,
  },
  '.umd-layout-vertical-interior': {
    ...Layout.VerticalInterior,
  },
  '.umd-layout-vertical-interior-child': {
    ...Layout.VerticalInteriorChild,
  },
};
