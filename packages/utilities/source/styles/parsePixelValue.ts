/**
 * Converts a pixel string value to a number by removing the 'px' suffix.
 * Useful for parsing CSS pixel values and performing numeric calculations.
 *
 * @param styleStr - A string value with 'px' suffix (e.g., '16px', '24px')
 * @returns The numeric value without the 'px' suffix
 *
 * @example
 * ```typescript
 * const pixels = parsePixelValue('16px');
 * // pixels: 16
 *
 * const fontSize = parsePixelValue('24px');
 * // fontSize: 24
 *
 * // Can be used for calculations
 * const padding = parsePixelValue('12px') * 2;
 * // padding: 24
 * ```
 */
export const parsePixelValue = (styleStr: string): number =>
  parseInt(styleStr.replace('px', ''));
