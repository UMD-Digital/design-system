/**
 * Retrieves an integer value from localStorage
 *
 * Gets a value from localStorage by key and parses it as an integer.
 * Returns null if the key doesn't exist or the value cannot be parsed.
 *
 * @param key - The localStorage key to retrieve
 * @returns The parsed integer value, or null if not found
 *
 * @example
 * ```typescript
 * const count = getLocalStorageInt({ key: 'visit-count' });
 * if (count !== null) {
 *   console.log(`You've visited ${count} times`);
 * }
 * ```
 */
export const getLocalStorageInt = ({ key }: { key: string }): number | null => {
  const string = localStorage.getItem(key);
  if (string) {
    const parsed = parseInt(string, 10);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
};