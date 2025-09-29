/**
 * Stores the current timestamp in localStorage
 *
 * Sets the current time (in milliseconds since epoch) to localStorage
 * under the specified key. Useful for tracking when events occurred.
 *
 * @param key - The localStorage key to set
 *
 * @example
 * ```typescript
 * // Store when user last visited
 * setLocalStorageTimestamp({ key: 'last-visit' });
 *
 * // Later, retrieve and check the timestamp
 * const lastVisit = getLocalStorageInt({ key: 'last-visit' });
 * if (lastVisit) {
 *   const daysSince = (Date.now() - lastVisit) / (1000 * 60 * 60 * 24);
 *   console.log(`Last visited ${Math.floor(daysSince)} days ago`);
 * }
 * ```
 */
export const setLocalStorageTimestamp = ({ key }: { key: string }): void => {
  const currentTime = new Date().getTime();
  localStorage.setItem(key, currentTime.toString());
};