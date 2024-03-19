import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const VerticalLanding = {
  marginBottom: Spacing['3xl'],

  [`@media (${Queries.tablet.min})`]: {
    marginBottom: Spacing['6xl'],
  },

  [`@media (${Queries.desktop.min})`]: {
    marginBottom: '120px',
  },
};

const VerticalLandingChild = {
  marginBottom: Spacing.lg,

  [`@media (${Queries.tablet.min})`]: {
    marginBottom: Spacing['xl'],
  },

  [`@media (${Queries.desktop.min})`]: {
    marginBottom: Spacing['2xl'],
  },
};

const VerticalInterior = {
  marginBottom: Spacing['3xl'],

  [`@media (${Queries.desktop.min})`]: {
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
