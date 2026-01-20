/**
 * @module tailwind
 * Tailwind 4 CSS-first configuration utilities for UMD Design System.
 *
 * This module provides functions to generate Tailwind 4 compatible CSS
 * from UMD design tokens.
 *
 * @example
 * ```typescript
 * // Import generator functions
 * import {
 *   generateTailwind4CSS,
 *   generateTailwind4Theme,
 *   generateTailwind4Utilities,
 *   generateThemeOnlyCSS
 * } from '@universityofmaryland/web-styles-library/tailwind';
 *
 * // Generate complete Tailwind 4 CSS
 * const css = generateTailwind4CSS();
 *
 * // Generate theme-only CSS (for non-Tailwind projects)
 * const themeCSS = generateThemeOnlyCSS();
 * ```
 *
 * @since 1.8.0
 */

export {
  generateTailwind4CSS,
  generateTailwind4Theme,
  generateTailwind4Utilities,
  generateThemeOnlyCSS,
} from './generator';
