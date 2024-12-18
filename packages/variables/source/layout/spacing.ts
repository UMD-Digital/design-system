import { Media, Spacing } from '../tokens';

export const verticalLanding = {
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['6xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: '120px',
  },
};

export const verticalLandingChild = {
  marginBottom: Spacing.lg,

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['2xl'],
  },
};

export const verticalInterior = {
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['6xl'],
  },
};

export const verticalInteriorChild = {
  marginBottom: Spacing.lg,
};
