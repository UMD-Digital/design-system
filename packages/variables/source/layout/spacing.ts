import { Media, Spacing } from '../tokens';

const VerticalLanding = {
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['6xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: '120px',
  },
};

const VerticalLandingChild = {
  marginBottom: Spacing.lg,

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['2xl'],
  },
};

const VerticalInterior = {
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['6xl'],
  },
};

const VerticalInteriorChild = {
  marginBottom: Spacing.lg,
};

export default {
  VerticalLanding,
  VerticalLandingChild,
  VerticalInterior,
  VerticalInteriorChild,
};
