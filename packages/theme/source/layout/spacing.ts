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
const SpacingContent = {
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

const HeadlineLarge = {
  marginBottom: Spacing.sm,

  [`@media (${Queries.desktop.min})`]: {
    marginBottom: Spacing.md,
  },
};

const HeadlineMedium = {
  marginBottom: Spacing.sm,
};

const InteriorNavigation = {
  [`@media (${Queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Queries.tablet.min})`]: {
      marginRight: Spacing['max'],
      width: '242px',
    },
  },

  '& > *:last-child': {
    [`@media (${Queries.tablet.min})`]: {
      marginTop: Spacing.md,
      maxWidth: '800px',
    },
  },
};

export default {
  ...SpacingContent,

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
  '.umd-layout-interior-navigation': {
    ...InteriorNavigation,
  },
  '.umd-layout-headline-large': {
    ...HeadlineLarge,
  },
  '.umd-layout-headline-medium': {
    ...HeadlineMedium,
  },
};
