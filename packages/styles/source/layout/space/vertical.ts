import { media, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-vertical';

// umd-layout-space-vertical-landing
export const landing = create.jssObject({
  marginBottom: spacing['3xl'],

  [`@media (${media.queries.tablet.min})`]: {
    marginBottom: spacing['6xl'],
  },

  [`@media (${media.queries.desktop.min})`]: {
    marginBottom: '120px',
  },

  className: [
    `${classNamePrefix}-landing`,
    /** @deprecated Use 'umd-layout-space-vertical-landing' instead */
    'umd-layout-vertical-landing',
  ],
});

// umd-layout-space-vertical-landing-child
export const landingChild = create.jssObject({
  marginBottom: spacing.lg,

  [`@media (${media.queries.tablet.min})`]: {
    marginBottom: spacing['xl'],
  },

  [`@media (${media.queries.desktop.min})`]: {
    marginBottom: spacing['2xl'],
  },

  className: [
    `${classNamePrefix}-landing-child`,
    /** @deprecated Use 'umd-layout-space-vertical-landing-child' instead */
    'umd-layout-vertical-landing-child',
  ],
});

// umd-layout-space-vertical-interior
export const interior = create.jssObject({
  marginBottom: spacing['3xl'],

  [`@media (${media.queries.desktop.min})`]: {
    marginBottom: spacing['6xl'],
  },

  className: [
    `${classNamePrefix}-interior`,
    /** @deprecated Use 'umd-layout-space-vertical-interior' instead */
    'umd-layout-vertical-interior',
  ],
});

// umd-layout-space-vertical-interior-child
export const interiorChild = create.jssObject({
  marginBottom: spacing.lg,

  className: [
    `${classNamePrefix}-interior-child`,
    /** @deprecated Use 'umd-layout-space-vertical-interior-child' instead */
    'umd-layout-vertical-interior-child',
  ],
});

// umd-layout-space-vertical-headline-large
export const headlineLarge = create.jssObject({
  marginBottom: spacing.sm,

  [`@media (${media.queries.desktop.min})`]: {
    marginBottom: spacing.md,
  },

  className: [
    `${classNamePrefix}-headline-large`,
    /** @deprecated Use 'umd-layout-space-vertical-headline-large' instead */
    'umd-layout-headline-large',
  ],
});

// umd-layout-space-vertical-headline-medium
export const headlineMedium = create.jssObject({
  marginBottom: spacing.sm,

  className: [
    `${classNamePrefix}-headline-medium`,
    /** @deprecated Use 'umd-layout-space-vertical-headline-medium' instead */
    'umd-layout-headline-medium',
  ],
});
