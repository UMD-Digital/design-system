import { Colors, Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-vertical';

// umd-layout-space-vertical-landing
export const landing = create.jssObject({
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['6xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
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
  marginBottom: Spacing.lg,

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: Spacing['xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['2xl'],
  },

  className: [
    `${classNamePrefix}-landing-child`,
    /** @deprecated Use 'umd-layout-space-vertical-landing-child' instead */
    'umd-layout-vertical-landing-child',
  ],
});

// umd-layout-space-vertical-interior
export const interior = create.jssObject({
  marginBottom: Spacing['3xl'],

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing['6xl'],
  },

  className: [
    `${classNamePrefix}-interior`,
    /** @deprecated Use 'umd-layout-space-vertical-interior' instead */
    'umd-layout-vertical-interior',
  ],
});

// umd-layout-space-vertical-interior-child
export const interiorChild = create.jssObject({
  marginBottom: Spacing.lg,

  className: [
    `${classNamePrefix}-interior-child`,
    /** @deprecated Use 'umd-layout-space-vertical-interior-child' instead */
    'umd-layout-vertical-interior-child',
  ],
});

// umd-layout-space-vertical-headline-large
export const headlineLarge = create.jssObject({
  marginBottom: Spacing.sm,

  [`@media (${Media.queries.desktop.min})`]: {
    marginBottom: Spacing.md,
  },

  className: [
    `${classNamePrefix}-headline-large`,
    /** @deprecated Use 'umd-layout-space-vertical-headline-large' instead */
    'umd-layout-headline-large',
  ],
});

// umd-layout-space-vertical-headline-medium
export const headlineMedium = create.jssObject({
  marginBottom: Spacing.sm,

  className: [
    `${classNamePrefix}-headline-medium`,
    /** @deprecated Use 'umd-layout-space-vertical-headline-medium' instead */
    'umd-layout-headline-medium',
  ],
});
