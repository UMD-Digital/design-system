/**
 * Capitalizes the first letter of a string
 *
 * @param str - The string to capitalize
 * @returns The string with first letter capitalized
 *
 * @example
 * ```typescript
 * capitalize('hello'); // 'Hello'
 * capitalize('hello world'); // 'Hello world'
 * capitalize(''); // ''
 * ```
 *
 * @category string
 */
export const capitalize = (str: string): string => {
  // Handle non-string input
  if (typeof str !== 'string') {
    return '';
  }

  // Handle empty string or null/undefined
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};