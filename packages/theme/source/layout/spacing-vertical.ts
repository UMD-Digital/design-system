import { Tokens, Layout } from '@universityofmaryland/variables';

const { Spacing, Media, Colors } = Tokens;

const HeadlineLarge = {
  marginBottom: Spacing.sm,

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing.md,
  },
};

const HeadlineMedium = {
  marginBottom: Spacing.sm,
};

const InteriorNavigation = {
  [`@media (${Media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Media.queries.tablet.min})`]: {
      marginRight: Spacing['max'],
      width: '242px',
    },
  },

  '& > *:last-child': {
    [`@media (${Media.queries.tablet.min})`]: {
      maxWidth: '800px',
      width: '100%',
    },
  },
};

const SidebarNavigation = {
  ...InteriorNavigation,

  [`@media (${Media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.min})`]: {
      width: `calc(100% - 322px)`,
    },
  },

  '& > *:last-child': {
    paddingTop: Spacing.md,
    borderTop: `1px solid ${Colors.black}`,

    [`@media (${Media.queries.large.max})`]: {
      marginTop: Spacing['3xl'],
    },

    [`@media (${Media.queries.tablet.min})`]: {
      marginLeft: Spacing['7xl'],
      width: '322px',
    },
  },
};

export default {
  '.umd-layout-vertical-landing': {
    ...Layout.spacing.verticalLanding,
  },
  '.umd-layout-vertical-landing-child': {
    ...Layout.spacing.verticalLandingChild,
  },
  '.umd-layout-vertical-interior': {
    ...Layout.spacing.verticalInterior,
  },
  '.umd-layout-vertical-interior-child': {
    ...Layout.spacing.verticalInteriorChild,
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
