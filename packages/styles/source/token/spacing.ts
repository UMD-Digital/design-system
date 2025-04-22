/**
 * @module token/spacing
 * Provides spacing tokens for the design system.
 */

/**
 * Spacing scale with values in pixels and their corresponding rem equivalents.
 * @returns {object} Spacing scale with numeric keys and pixel values.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.spacingScale[4] // '16px'
 * ```
 * @since 1.1.0
 */
export const spacingScale = {
  0: '0',
  1: '4px', // 0.25rem
  2: '8px', // 0.5rem  (min)
  3: '12px', // 0.75rem (xs)
  4: '16px', // 1rem    (sm)
  6: '24px', // 1.5rem  (md)
  8: '32px', // 2rem    (lg)
  10: '40px', // 2.5rem  (xl)
  12: '48px', // 3rem    (2xl)
  14: '56px', // 3.5rem  (3xl)
  16: '64px', // 4rem    (4xl)
  18: '72px', // 4.5rem  (5xl)
  20: '80px', // 5rem    (6xl)
  24: '96px', // 6rem    (7xl)
  26: '104px', // 6.5rem  (8xl)
  30: '120px', // 7.5rem  (max)
} as const;

/**
 * Maximum width constraints for layout containers.
 * @returns {object} Maximum width values with semantic naming.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.maxWidth.normal // '1384px'
 * ```
 * @since 1.1.0
 */
export const maxWidth = {
  max: '1728px',
  large: '1552px',
  normal: '1384px',
  small: '1200px',
  smallest: '992px',
};

/**
 * Default spacing tokens with semantic naming.
 * @returns {object} Spacing tokens with semantic names and corresponding pixel values.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.spacing.md // '24px'
 * ```
 * @since 1.1.0
 */
export default {
  min: '8px',
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
  '2xl': '48px',
  '3xl': '56px',
  '4xl': '64px',
  '5xl': '72px',
  '6xl': '80px',
  '7xl': '96px',
  '8xl': '104px',
  max: '120px',
  maxWidth: {
    ...maxWidth,
  },
};
