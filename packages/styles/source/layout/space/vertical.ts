/**
 * @module layout/space/vertical
 * Provides vertical spacing utilities for page layouts.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-space-vertical';

/**
 * Vertical spacing for landing sections.
 * @returns {JssObject} Responsive bottom margin for landing sections.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.landing
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-landing"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-landing' instead of 'umd-layout-vertical-landing'.
 * @since 1.8.0
 */
export const landing: JssObject = create.jssObject({
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

/**
 * Vertical spacing for landing section child elements.
 * @returns {JssObject} Responsive bottom margin for landing section child elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.landingChild
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-landing-child"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-landing-child' instead of 'umd-layout-vertical-landing-child'.
 * @since 1.8.0
 */
export const landingChild: JssObject = create.jssObject({
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

/**
 * Vertical spacing for interior sections.
 * @returns {JssObject} Responsive bottom margin for interior sections.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.interior
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-interior"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-interior' instead of 'umd-layout-vertical-interior'.
 * @since 1.8.0
 */
export const interior: JssObject = create.jssObject({
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

/**
 * Vertical spacing for interior section child elements.
 * @returns {JssObject} Bottom margin for interior section child elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.interiorChild
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-interior-child"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-interior-child' instead of 'umd-layout-vertical-interior-child'.
 * @since 1.8.0
 */
export const interiorChild: JssObject = create.jssObject({
  marginBottom: spacing.lg,

  className: [
    `${classNamePrefix}-interior-child`,
    /** @deprecated Use 'umd-layout-space-vertical-interior-child' instead */
    'umd-layout-vertical-interior-child',
  ],
});

/**
 * Vertical spacing for large headlines.
 * @returns {JssObject} Responsive bottom margin for large headlines.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.headlineLarge
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-headline-large"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-headline-large' instead of 'umd-layout-headline-large'.
 * @since 1.8.0
 */
export const headlineLarge: JssObject = create.jssObject({
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

/**
 * Vertical spacing for medium headlines.
 * @returns {JssObject} Bottom margin for medium headlines.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical.headlineMedium
 * ```
 * @example
 * ```css
 * class="umd-layout-space-vertical-headline-medium"
 * ```
 * @deprecated Use 'umd-layout-space-vertical-headline-medium' instead of 'umd-layout-headline-medium'.
 * @since 1.8.0
 */
export const headlineMedium: JssObject = create.jssObject({
  marginBottom: spacing.sm,

  className: [
    `${classNamePrefix}-headline-medium`,
    /** @deprecated Use 'umd-layout-space-vertical-headline-medium' instead */
    'umd-layout-headline-medium',
  ],
});
