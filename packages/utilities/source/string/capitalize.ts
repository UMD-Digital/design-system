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
 */
export const capitalize = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return str || '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};