/**
 * @module tailwind/generator
 * Generates Tailwind 4 CSS-first configuration from UMD design tokens.
 *
 * This module transforms UMD design tokens into Tailwind 4's @theme CSS variable
 * format, producing a single CSS file that users can import for full UMD token
 * integration with Tailwind 4.
 *
 * @example
 * ```typescript
 * import { generateTailwind4Theme, generateTailwind4CSS } from './generator';
 *
 * // Generate just the @theme block
 * const theme = generateTailwind4Theme();
 *
 * // Generate complete CSS with @import and @utility blocks
 * const css = generateTailwind4CSS();
 * ```
 *
 * @since 1.8.0
 */

import { color, spacing } from '@universityofmaryland/web-token-library';
import * as font from '@universityofmaryland/web-token-library/font';
import * as media from '@universityofmaryland/web-token-library/media';

/**
 * Convert camelCase to kebab-case for CSS variable names.
 * @param str - The string to convert
 * @returns Kebab-case string
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

/**
 * Generate Tailwind 4 @theme block with UMD design tokens.
 *
 * This function converts all UMD design tokens to Tailwind 4's CSS variable
 * format using the @theme directive.
 *
 * @returns CSS string containing the @theme block
 *
 * @example
 * ```typescript
 * const theme = generateTailwind4Theme();
 * // Returns:
 * // @theme {
 * //   --color-red: #E21833;
 * //   --color-gold: #FFD200;
 * //   ...
 * // }
 * ```
 */
export function generateTailwind4Theme(): string {
  const lines: string[] = [];

  lines.push('@theme {');

  // ===== Colors =====
  lines.push('  /* Colors */');
  lines.push(`  --color-red: ${color.red};`);
  lines.push(`  --color-red-dark: ${color.redDark};`);
  lines.push(`  --color-blue: ${color.blue};`);
  lines.push(`  --color-green: ${color.green};`);
  lines.push(`  --color-gold: ${color.gold};`);
  lines.push(`  --color-white: ${color.white};`);
  lines.push(`  --color-black: ${color.black};`);

  // Gray scale
  lines.push(`  --color-gray-lightest: ${color.gray.lightest};`);
  lines.push(`  --color-gray-lighter: ${color.gray.lighter};`);
  lines.push(`  --color-gray-light: ${color.gray.light};`);
  lines.push(`  --color-gray-medium: ${color.gray.medium};`);
  lines.push(`  --color-gray-medium-aa: ${color.gray.mediumAA};`);
  lines.push(`  --color-gray-dark: ${color.gray.dark};`);
  lines.push(`  --color-gray-darker: ${color.gray.darker};`);
  lines.push('');

  // ===== Spacing =====
  lines.push('  /* Spacing */');
  lines.push(`  --spacing-min: ${spacing.min};`);
  lines.push(`  --spacing-xs: ${spacing.xs};`);
  lines.push(`  --spacing-sm: ${spacing.sm};`);
  lines.push(`  --spacing-md: ${spacing.md};`);
  lines.push(`  --spacing-lg: ${spacing.lg};`);
  lines.push(`  --spacing-xl: ${spacing.xl};`);
  lines.push(`  --spacing-2xl: ${spacing['2xl']};`);
  lines.push(`  --spacing-3xl: ${spacing['3xl']};`);
  lines.push(`  --spacing-4xl: ${spacing['4xl']};`);
  lines.push(`  --spacing-5xl: ${spacing['5xl']};`);
  lines.push(`  --spacing-6xl: ${spacing['6xl']};`);
  lines.push(`  --spacing-7xl: ${spacing['7xl']};`);
  lines.push(`  --spacing-8xl: ${spacing['8xl']};`);
  lines.push(`  --spacing-max: ${spacing.max};`);
  lines.push('');

  // ===== Max Width =====
  lines.push('  /* Max Width */');
  lines.push(`  --max-width-smallest: ${spacing.maxWidth.smallest};`);
  lines.push(`  --max-width-small: ${spacing.maxWidth.small};`);
  lines.push(`  --max-width-normal: ${spacing.maxWidth.normal};`);
  lines.push(`  --max-width-large: ${spacing.maxWidth.large};`);
  lines.push(`  --max-width-larger: ${spacing.maxWidth.larger};`);
  lines.push('');

  // ===== Font Families =====
  lines.push('  /* Font Families */');
  lines.push(`  --font-campaign: ${font.family.campaign};`);
  lines.push(`  --font-sans: ${font.family.sans};`);
  lines.push(`  --font-serif: ${font.family.serif};`);
  lines.push(`  --font-mono: ${font.family.mono};`);
  lines.push('');

  // ===== Font Sizes =====
  lines.push('  /* Font Sizes */');
  lines.push(`  --font-size-min: ${font.size.min};`);
  lines.push(`  --font-size-sm: ${font.size.sm};`);
  lines.push(`  --font-size-base: ${font.size.base};`);
  lines.push(`  --font-size-lg: ${font.size.lg};`);
  lines.push(`  --font-size-xl: ${font.size.xl};`);
  lines.push(`  --font-size-2xl: ${font.size['2xl']};`);
  lines.push(`  --font-size-3xl: ${font.size['3xl']};`);
  lines.push(`  --font-size-4xl: ${font.size['4xl']};`);
  lines.push(`  --font-size-5xl: ${font.size['5xl']};`);
  lines.push(`  --font-size-6xl: ${font.size['6xl']};`);
  lines.push(`  --font-size-7xl: ${font.size['7xl']};`);
  lines.push(`  --font-size-8xl: ${font.size['8xl']};`);
  lines.push(`  --font-size-9xl: ${font.size['9xl']};`);
  lines.push(`  --font-size-10xl: ${font.size['10xl']};`);
  lines.push(`  --font-size-max: ${font.size.max};`);
  lines.push('');

  // ===== Font Weights =====
  lines.push('  /* Font Weights */');
  lines.push(`  --font-weight-thin: ${font.weight.thin};`);
  lines.push(`  --font-weight-extra-light: ${font.weight.extraLight};`);
  lines.push(`  --font-weight-light: ${font.weight.light};`);
  lines.push(`  --font-weight-normal: ${font.weight.normal};`);
  lines.push(`  --font-weight-medium: ${font.weight.medium};`);
  lines.push(`  --font-weight-semi-bold: ${font.weight.semiBold};`);
  lines.push(`  --font-weight-bold: ${font.weight.bold};`);
  lines.push(`  --font-weight-extra-bold: ${font.weight.extraBold};`);
  lines.push(`  --font-weight-black: ${font.weight.black};`);
  lines.push(`  --font-weight-extra-black: ${font.weight.extraBlack};`);
  lines.push('');

  // ===== Breakpoints =====
  lines.push('  /* Breakpoints */');
  lines.push(`  --breakpoint-small: ${media.breakpoints.small.min};`);
  lines.push(`  --breakpoint-medium: ${media.breakpoints.medium.min};`);
  lines.push(`  --breakpoint-large: ${media.breakpoints.large.min};`);
  lines.push(`  --breakpoint-tablet: ${media.breakpoints.tablet.min};`);
  lines.push(`  --breakpoint-desktop: ${media.breakpoints.desktop.min};`);
  lines.push(`  --breakpoint-high-def: ${media.breakpoints.highDef.min};`);
  lines.push(`  --breakpoint-maximum: ${media.breakpoints.maximum.min};`);

  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate Tailwind 4 @utility blocks for UMD-specific utilities.
 *
 * Creates container utilities with UMD max-width values.
 *
 * @returns CSS string containing @utility blocks
 */
export function generateTailwind4Utilities(): string {
  const lines: string[] = [];

  lines.push('/* ===== UMD Custom Utilities ===== */');
  lines.push('');

  // Container utilities
  const containerSizes = ['smallest', 'small', 'normal', 'large', 'larger'] as const;

  for (const size of containerSizes) {
    lines.push(`@utility umd-container-${size} {`);
    lines.push(`  max-width: var(--max-width-${size});`);
    lines.push('  margin-left: auto;');
    lines.push('  margin-right: auto;');
    lines.push('}');
    lines.push('');
  }

  // Responsive padding container utility
  lines.push('@utility umd-container-padding {');
  lines.push('  padding-left: var(--spacing-sm);');
  lines.push('  padding-right: var(--spacing-sm);');
  lines.push('}');
  lines.push('');

  // Section spacing utilities
  lines.push('@utility umd-section-spacing {');
  lines.push('  padding-top: var(--spacing-xl);');
  lines.push('  padding-bottom: var(--spacing-xl);');
  lines.push('}');
  lines.push('');

  lines.push('@utility umd-section-spacing-lg {');
  lines.push('  padding-top: var(--spacing-4xl);');
  lines.push('  padding-bottom: var(--spacing-4xl);');
  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate complete Tailwind 4 CSS file with UMD design tokens.
 *
 * This function generates a complete CSS file that:
 * 1. Imports Tailwind CSS
 * 2. Defines UMD design tokens using @theme directive
 * 3. Adds UMD-specific @utility blocks
 *
 * @returns Complete CSS string ready for use
 *
 * @example
 * ```typescript
 * import { generateTailwind4CSS } from './generator';
 *
 * const css = generateTailwind4CSS();
 * // Use in build script to write to file
 * writeFile('dist/tailwind.css', css);
 * ```
 */
export function generateTailwind4CSS(): string {
  const lines: string[] = [];

  // Header comment
  lines.push('/**');
  lines.push(' * UMD Design System - Tailwind 4 Integration');
  lines.push(' * Generated automatically from @universityofmaryland/web-token-library');
  lines.push(' *');
  lines.push(' * This file provides UMD design tokens as Tailwind 4 CSS variables.');
  lines.push(' *');
  lines.push(' * Usage:');
  lines.push(' *   @import "@universityofmaryland/web-styles-library/tailwind.css";');
  lines.push(' *');
  lines.push(' * After importing, you can use UMD tokens with Tailwind utilities:');
  lines.push(' *   - text-red, bg-gold, text-gray-darker');
  lines.push(' *   - p-md, m-lg, gap-xl');
  lines.push(' *   - font-sans, font-serif, font-campaign');
  lines.push(' *   - text-lg, text-3xl');
  lines.push(' *   - tablet:*, desktop:*, high-def:*');
  lines.push(' *');
  lines.push(' * @see https://designsystem.umd.edu');
  lines.push(' */');
  lines.push('');

  // Tailwind import
  lines.push('@import "tailwindcss";');
  lines.push('');

  // Theme block
  lines.push('/* ===== UMD Theme Tokens ===== */');
  lines.push(generateTailwind4Theme());
  lines.push('');

  // Utility blocks
  lines.push(generateTailwind4Utilities());

  return lines.join('\n');
}

/**
 * Generate a standalone theme-only CSS file (without @import "tailwindcss").
 *
 * Useful for projects that want to use UMD tokens as CSS variables without
 * the full Tailwind framework.
 *
 * @returns CSS string with theme variables only
 */
export function generateThemeOnlyCSS(): string {
  const lines: string[] = [];

  lines.push('/**');
  lines.push(' * UMD Design System - CSS Variables Only');
  lines.push(' * Generated automatically from @universityofmaryland/web-token-library');
  lines.push(' *');
  lines.push(' * This file provides UMD design tokens as CSS custom properties');
  lines.push(' * without requiring Tailwind CSS.');
  lines.push(' *');
  lines.push(' * Usage:');
  lines.push(' *   @import "@universityofmaryland/web-styles-library/tailwind-theme.css";');
  lines.push(' *');
  lines.push(' * Then use CSS variables directly:');
  lines.push(' *   color: var(--color-red);');
  lines.push(' *   padding: var(--spacing-md);');
  lines.push(' *');
  lines.push(' * @see https://designsystem.umd.edu');
  lines.push(' */');
  lines.push('');

  // Convert @theme to :root
  const theme = generateTailwind4Theme();
  const rootCSS = theme.replace('@theme {', ':root {');

  lines.push(rootCSS);

  return lines.join('\n');
}
