/**
 * @module exports/tailwind
 * Tailwind 4 CSS generation utilities.
 *
 * This module provides Tailwind 4 CSS-first configuration utilities
 * for generating Tailwind-compatible CSS from UMD design tokens.
 *
 * @example
 * ```typescript
 * import {
 *   generateTailwind4CSS,
 *   generateTailwind4Theme,
 *   generateTailwind4Utilities,
 *   generateThemeOnlyCSS,
 *   generateTailwindStrings
 * } from '@universityofmaryland/web-styles-library/exports/tailwind';
 *
 * // Generate complete Tailwind 4 CSS
 * const css = generateTailwind4CSS();
 *
 * // Generate theme-only CSS (for non-Tailwind projects)
 * const themeCSS = generateThemeOnlyCSS();
 *
 * // Or generate all Tailwind strings at once
 * const strings = generateTailwindStrings();
 * console.log('Tailwind CSS:', strings.tailwind);
 * ```
 *
 * @since 1.8.0
 */

import {
  generateTailwind4CSS,
  generateTailwind4Theme,
  generateTailwind4Utilities,
  generateThemeOnlyCSS,
} from '../tailwind';

// Re-export generator functions
export {
  generateTailwind4CSS,
  generateTailwind4Theme,
  generateTailwind4Utilities,
  generateThemeOnlyCSS,
};

/**
 * Result of Tailwind string generation.
 * @since 1.8.0
 */
export interface GenerateTailwindStringsResult {
  /** Complete Tailwind 4 CSS with @import and @theme */
  tailwind: string;
  /** Theme-only CSS variables (no Tailwind import) */
  themeOnly: string;
}

/**
 * Generates Tailwind CSS strings from UMD design tokens.
 *
 * This is a pure function that generates CSS strings without writing to disk.
 * Use this function to get Tailwind CSS content programmatically.
 *
 * For file writing, use the CLI script `scripts/generate-tailwind.ts` or
 * call this function and write the files yourself.
 *
 * @returns Object containing all generated Tailwind CSS strings
 *
 * @example
 * ```typescript
 * import { generateTailwindStrings } from '@universityofmaryland/web-styles-library/exports/tailwind';
 *
 * const strings = generateTailwindStrings();
 *
 * // Use the complete Tailwind CSS
 * console.log(strings.tailwind);
 *
 * // Or use theme-only (for non-Tailwind projects)
 * console.log(strings.themeOnly);
 * ```
 *
 * @since 1.8.0
 */
export function generateTailwindStrings(): GenerateTailwindStringsResult {
  return {
    tailwind: generateTailwind4CSS(),
    themeOnly: generateThemeOnlyCSS(),
  };
}
