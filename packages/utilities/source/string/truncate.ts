/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 *
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the string (including ellipsis)
 * @param ellipsis - The ellipsis string to append (default: '...')
 * @returns The truncated string
 *
 * @example
 * ```typescript
 * truncate('Hello World', 8); // 'Hello...'
 * truncate('Hello World', 20); // 'Hello World'
 * truncate('Hello World', 8, '…'); // 'Hello …'
 * ```
 */
export const truncate = (
  str: string,
  maxLength: number,
  ellipsis: string = '...'
): string => {
  if (!str || typeof str !== 'string') {
    return str || '';
  }

  if (str.length <= maxLength) {
    return str;
  }

  const truncateLength = maxLength - ellipsis.length;
  return str.slice(0, truncateLength) + ellipsis;
};