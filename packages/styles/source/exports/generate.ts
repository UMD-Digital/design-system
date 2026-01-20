/**
 * @module exports/generate
 * Utilities for generating static CSS from JSS modules.
 *
 * This module provides the core functions needed to convert JSS objects
 * and design tokens into CSS strings. Use these utilities in build scripts
 * or for programmatic CSS generation.
 *
 * @example
 * ```typescript
 * import {
 *   generateTokensCSS,
 *   generateBaseCSS,
 *   processNestedJssObjects,
 *   minifyCSS,
 *   removeDuplicates,
 *   generateCSSStrings
 * } from '@universityofmaryland/web-styles-library/exports/generate';
 *
 * // Generate CSS programmatically
 * const tokensCSS = generateTokensCSS(color, spacing, font, media);
 * const typographyCSS = processNestedJssObjects(typography);
 * const cleanCSS = await removeDuplicates(tokensCSS + typographyCSS);
 * const minified = minifyCSS(cleanCSS);
 *
 * // Or generate all CSS strings at once
 * const cssStrings = await generateCSSStrings();
 * console.log('Generated tokens:', cssStrings.tokens);
 * ```
 *
 * @since 1.8.0
 */

import * as token from '@universityofmaryland/web-token-library';
import * as typography from '../typography';
import * as layout from '../layout';
import * as element from '../element';
import * as animation from '../animation';
import * as accessibility from '../accessibility';
import { webComponentStyles } from '../web-components';
import { root, reset } from '../root';
import {
  minifyCSS,
  removeDuplicates,
  toKebabCase,
  createBlock,
  createClassSelector,
  createRules,
  formatValue,
  isPlainObject,
} from '../utilities/transform/css';
import {
  processNestedJssObjects,
  processWebComponentStyles,
  generateBaseCSS,
  convertToClassSelectorCss,
  convertToSelectorCSS,
  convertToCss,
  convertFontToCss,
  formatWithClassSelector,
  formatNestedObjects,
} from '../utilities/transform/jss';
import {
  generateTokensCSS,
  fromTokens,
  formatTokenKey,
  toCssObject,
  toString,
} from '../utilities/transform/variables';

// Re-export CSS transformation utilities
export {
  minifyCSS,
  removeDuplicates,
  toKebabCase,
  createBlock,
  createClassSelector,
  createRules,
  formatValue,
  isPlainObject,
};

// Re-export JSS to CSS conversion
export {
  processNestedJssObjects,
  processWebComponentStyles,
  generateBaseCSS,
  convertToClassSelectorCss,
  convertToSelectorCSS,
  convertToCss,
  convertFontToCss,
  formatWithClassSelector,
  formatNestedObjects,
};

// Re-export Token to CSS variables
export {
  generateTokensCSS,
  fromTokens,
  formatTokenKey,
  toCssObject,
  toString,
};

/**
 * Result of CSS string generation.
 * @since 1.8.0
 */
export interface GenerateCSSStringsResult {
  /** CSS custom properties for design tokens */
  tokens: string;
  /** Typography utility classes */
  typography: string;
  /** Layout and grid utility classes */
  layout: string;
  /** Element styles (buttons, forms, etc.) */
  element: string;
  /** Animation utility classes */
  animation: string;
  /** Screen reader and a11y utilities */
  accessibility: string;
  /** Web component styles */
  webComponents: string;
  /** Root and reset styles */
  base: string;
  /** Full bundle (includes tokens + all styles) */
  styles: string;
}

/**
 * Generates all CSS strings from JSS modules.
 *
 * This is a pure function that generates CSS strings without writing to disk.
 * Use this function to get all CSS content programmatically for custom
 * build pipelines or server-side rendering.
 *
 * For file writing, use the CLI script `scripts/generate-css.ts` or
 * call this function and write the files yourself.
 *
 * @returns Promise resolving to all generated CSS strings
 *
 * @example
 * ```typescript
 * import { generateCSSStrings } from '@universityofmaryland/web-styles-library/exports/generate';
 *
 * const css = await generateCSSStrings();
 *
 * // Use individual category CSS
 * document.head.innerHTML += `<style>${css.tokens}</style>`;
 * document.head.innerHTML += `<style>${css.typography}</style>`;
 *
 * // Or use the full bundle
 * document.head.innerHTML += `<style>${css.styles}</style>`;
 * ```
 *
 * @since 1.8.0
 */
export async function generateCSSStrings(): Promise<GenerateCSSStringsResult> {
  // 1. Generate tokens CSS
  const tokensCSS = generateTokensCSS(
    token.color,
    token.spacing,
    token.font,
    token.media,
  );

  // 2. Generate typography CSS
  const typographyCSS = processNestedJssObjects(typography);
  const typographyCSSClean = await removeDuplicates(typographyCSS);

  // 3. Generate layout CSS
  const layoutCSS = processNestedJssObjects(layout);
  const layoutCSSClean = await removeDuplicates(layoutCSS);

  // 4. Generate element CSS
  const elementCSS = processNestedJssObjects(element);
  const elementCSSClean = await removeDuplicates(elementCSS);

  // 5. Generate animation CSS
  const animationCSS = processNestedJssObjects(animation);
  const animationCSSClean = await removeDuplicates(animationCSS);

  // 6. Generate accessibility CSS
  const accessibilityCSS = processNestedJssObjects(accessibility);
  const accessibilityCSSClean = await removeDuplicates(accessibilityCSS);

  // 7. Generate web-components CSS
  const webComponentsCSS = processWebComponentStyles(webComponentStyles);
  const webComponentsCSSClean = await removeDuplicates(webComponentsCSS);

  // 8. Generate base CSS (root + reset styles)
  const baseCSS = generateBaseCSS(root, reset);
  const baseCSSClean = await removeDuplicates(baseCSS);

  // 9. Generate full styles bundle
  const fullBundle = [
    tokensCSS,
    baseCSS,
    typographyCSS,
    layoutCSS,
    elementCSS,
    animationCSS,
    accessibilityCSS,
  ].join('\n\n');
  const fullBundleClean = await removeDuplicates(fullBundle);

  return {
    tokens: minifyCSS(tokensCSS),
    typography: minifyCSS(typographyCSSClean),
    layout: minifyCSS(layoutCSSClean),
    element: minifyCSS(elementCSSClean),
    animation: minifyCSS(animationCSSClean),
    accessibility: minifyCSS(accessibilityCSSClean),
    webComponents: minifyCSS(webComponentsCSSClean),
    base: minifyCSS(baseCSSClean),
    styles: minifyCSS(fullBundleClean),
  };
}
