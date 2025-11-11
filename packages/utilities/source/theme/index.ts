/**
 * @file theme/index.ts
 * @description Theme utility functions for UMD Design System
 *
 * Provides helper functions to convert boolean theme flags (isThemeDark)
 * to the appropriate string values expected by the styles package compose functions.
 *
 * This creates a single source of truth for theme-related value mappings
 * and eliminates repetitive ternary expressions throughout the design system packages.
 */

import * as token from '@universityofmaryland/web-styles-library/token';

/**
 * Theme utility namespace
 *
 * Provides functions to map boolean theme flags to style package values.
 * All functions accept an optional boolean and return type-safe literals.
 *
 * @example
 * ```typescript
 * import { theme } from '@universityofmaryland/web-utilities-library/theme';
 *
 * // Use in typography compose
 * const headlineStyles = {
 *   ...typography.sans.compose('large', {
 *     theme: theme.variant(isThemeDark)
 *   })
 * };
 *
 * // Use in animation compose
 * const animationStyles = {
 *   ...animation.line.composeSlideUnder({
 *     color: theme.foreground(isThemeDark)
 *   })
 * };
 *
 * // Use in element styles
 * .withStyles({
 *   element: {
 *     color: theme.foreground(isThemeDark),
 *     backgroundColor: theme.background(isThemeDark)
 *   }
 * })
 * ```
 */
export const theme = {
  /**
   * Convert boolean theme flag to theme variant string
   *
   * Maps the boolean `isThemeDark` prop to the string values expected
   * by styles package compose functions (typography, campaign, etc.)
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns 'dark' when true, 'light' when false/undefined
   *
   * @example
   * ```typescript
   * typography.sans.compose('large', { theme: theme.variant(isThemeDark) })
   * typography.campaign.compose('extralarge', { theme: theme.variant(isThemeDark) })
   * elementStyles.text.rich.composeSimple({ theme: theme.variant(isThemeDark) })
   * ```
   */
  variant: (isDark?: boolean): 'light' | 'dark' =>
    isDark ? 'dark' : 'light',

  /**
   * Get appropriate foreground color for theme
   *
   * Returns the text/icon color that should be used for the given theme.
   * Dark themes use white text, light themes use black text.
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns 'white' when true, 'black' when false/undefined
   *
   * @example
   * ```typescript
   * animation.line.composeSlideUnder({ color: theme.foreground(isThemeDark) })
   * animation.line.composeFadeUnder({ color: theme.foreground(isThemeDark) })
   *
   * .withStyles({
   *   element: {
   *     color: theme.foreground(isThemeDark)
   *   }
   * })
   * ```
   */
  foreground: (isDark?: boolean): 'white' | 'black' =>
    isDark ? 'white' : 'black',

  /**
   * Get appropriate background color for theme
   *
   * Returns the background color token for dark themes.
   * Returns undefined for light themes (uses default/transparent).
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns Dark gray color token when true, undefined when false
   *
   * @example
   * ```typescript
   * .withStyles({
   *   element: {
   *     backgroundColor: theme.background(isThemeDark)
   *   }
   * })
   * ```
   */
  background: (isDark?: boolean): string | undefined =>
    isDark ? token.color.gray.darker : undefined,

  /**
   * Get appropriate border color for theme
   *
   * Returns border color appropriate for the theme.
   * Dark themes use darker gray, light themes use light gray.
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns Dark gray when true, light gray when false/undefined
   *
   * @example
   * ```typescript
   * .withStyles({
   *   element: {
   *     border: `1px solid ${theme.border(isThemeDark)}`
   *   }
   * })
   * ```
   */
  border: (isDark?: boolean): string =>
    isDark ? token.color.gray.darker : token.color.gray.light,

  /**
   * Get inverted foreground color for theme
   *
   * Returns the opposite of theme.foreground().
   * Useful for accent elements that should contrast with the theme.
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns 'black' when true, 'white' when false/undefined
   *
   * @example
   * ```typescript
   * // Badge on dark background
   * .withStyles({
   *   element: {
   *     backgroundColor: theme.foreground(isThemeDark),
   *     color: theme.inverse(isThemeDark)
   *   }
   * })
   * ```
   */
  inverse: (isDark?: boolean): 'white' | 'black' =>
    isDark ? 'black' : 'white',

  /**
   * Get theme variant for font-related compose functions (alias for variant)
   *
   * Alias for theme.variant() with a more explicit name for typography contexts.
   * Use this when passing theme to compose functions like typography.sans.compose(),
   * typography.campaign.compose(), or text.rich.composeSimple().
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns 'dark' when true, 'light' when false/undefined
   *
   * @example
   * ```typescript
   * // Use with typography compose functions
   * typography.sans.compose('large', { theme: theme.fontColor(isThemeDark) })
   * elementStyles.text.rich.composeSimple({ theme: theme.fontColor(isThemeDark) })
   *
   * // For actual color values, use foreground()
   * .withStyles({
   *   element: {
   *     color: theme.foreground(isThemeDark)  // Returns 'white' | 'black'
   *   }
   * })
   * ```
   */
  fontColor: (isDark?: boolean): 'light' | 'dark' =>
    isDark ? 'dark' : 'light',

  /**
   * Get subdued/secondary text color for theme
   *
   * Returns a less prominent text color appropriate for secondary text,
   * captions, labels, or supporting content. Adapts to theme context.
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns Light gray for dark themes, dark gray for light themes
   *
   * @example
   * ```typescript
   * // Secondary text that adapts to theme
   * typography.sans.compose('small', {
   *   color: theme.subdued(isThemeDark)
   * })
   *
   * // Caption text
   * .withStyles({
   *   element: {
   *     color: theme.subdued(isThemeDark)  // Gray variant for theme
   *   }
   * })
   * ```
   */
  subdued: (isDark?: boolean): string =>
    isDark ? token.color.gray.light : token.color.gray.dark,

  /**
   * Get muted/tertiary text color for theme
   *
   * Returns the most subtle text color appropriate for tertiary text,
   * placeholder text, or disabled states. More muted than subdued().
   *
   * @param isDark - Boolean indicating whether dark theme is active
   * @returns Lighter gray for dark themes, medium gray for light themes
   *
   * @example
   * ```typescript
   * // Placeholder or disabled text
   * typography.sans.compose('small', {
   *   color: theme.muted(isThemeDark)
   * })
   *
   * // Tertiary supporting text
   * .withStyles({
   *   element: {
   *     color: theme.muted(isThemeDark)  // Most subtle gray for theme
   *   }
   * })
   * ```
   */
  muted: (isDark?: boolean): string =>
    isDark ? token.color.gray.lighter : token.color.gray.medium,
} as const;
