import { Tokens, Layout } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

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
      maxWidth: '800px',
      width: '100%',
    },
  },
};

const SidebarNavigation = {
  ...InteriorNavigation,

  [`@media (${Queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Queries.tablet.min})`]: {
      maxWidth: '754px',
    },
  },

  '& > *:last-child': {
    [`@media (${Queries.tablet.min})`]: {
      marginLeft: Spacing['max'],
      width: '322px',
    },
  },
};

export default {
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
  '.umd-layout-interior-sidebar': {
    ...SidebarNavigation,
  },
  '.umd-layout-headline-large': {
    ...HeadlineLarge,
  },
  '.umd-layout-headline-medium': {
    ...HeadlineMedium,
  },
};
