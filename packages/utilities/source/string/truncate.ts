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
  // Handle non-string input
  if (typeof str !== 'string') {
    return '';
  }

  // Handle empty string or null/undefined
  if (!str) {
    return '';
  }

  // If string fits within maxLength, return as-is
  if (str.length <= maxLength) {
    return str;
  }

  // Calculate truncation point
  const truncateLength = Math.max(0, maxLength - ellipsis.length);

  // Handle edge case where maxLength is less than or equal to ellipsis length
  if (truncateLength <= 0) {
    // Just return the full ellipsis
    return ellipsis;
  }

  return str.slice(0, truncateLength) + ellipsis;
};