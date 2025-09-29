/**
 * Converts a pixel string value to a number by removing the 'px' suffix.
 * Useful for parsing CSS pixel values and performing numeric calculations.
 *
 * @param styleStr - A string value with 'px' suffix (e.g., '16px', '24px')
 * @returns The numeric value without the 'px' suffix
 *
 * @example
 * ```typescript
 * const pixels = convertPixelStringToNumber('16px');
 * // pixels: 16
 *
 * const fontSize = convertPixelStringToNumber('24px');
 * // fontSize: 24
 *
 * // Can be used for calculations
 * const padding = convertPixelStringToNumber('12px') * 2;
 * // padding: 24
 * ```
 */
export const convertPixelStringToNumber = (styleStr: string): number =>
  parseInt(styleStr.replace('px', ''));