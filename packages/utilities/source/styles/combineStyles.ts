/**
 * Combines multiple style strings into a single string, filtering out null/undefined values.
 * This is useful for conditionally combining CSS strings from different sources.
 *
 * @param styles - Variable number of style strings (can include null or undefined)
 * @returns A single concatenated string with all valid styles
 *
 * @example
 * ```typescript
 * const baseStyles = '.container { padding: 1rem; }';
 * const conditionalStyles = isDark ? '.container { background: #000; }' : null;
 * const moreStyles = '.container { border: 1px solid; }';
 *
 * const combined = combineStyles(baseStyles, conditionalStyles, moreStyles);
 * // Returns: '.container { padding: 1rem; }.container { border: 1px solid; }'
 * // (conditionalStyles was null, so it was filtered out)
 * ```
 */
export const combineStyles = (
  ...styles: (string | null | undefined)[]
): string => styles.filter(Boolean).join('');