/**
 * Checks if a given URL points to a different hostname than the current page.
 *
 * This utility is useful for determining whether a link should open in a new tab
 * or have special styling/behavior for external links.
 *
 * @param url - The URL to check (can be absolute or relative)
 * @returns True if the URL is external (different hostname), false otherwise
 *
 * @example
 * ```typescript
 * // On https://beta.localhost.dev/components
 *
 * // Same hostname - returns false
 * isExternalUrl('https://beta.localhost.dev/giving'); // false
 * isExternalUrl('/components/navigation'); // false
 * isExternalUrl('../about'); // false
 *
 * // Different hostname - returns true
 * isExternalUrl('https://giving.umd.edu'); // true
 * isExternalUrl('https://www.google.com'); // true
 *
 * // Invalid URLs - returns false
 * isExternalUrl('not a url'); // false
 * isExternalUrl(''); // false
 * ```
 *
 * @category network
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObject = new URL(url, window.location.href);
    const currentLocation = new URL(window.location.href);

    if (!urlObject.protocol.startsWith('http')) {
      return urlObject.protocol === 'mailto:' || urlObject.protocol === 'tel:';
    }

    return (
      urlObject.hostname !== currentLocation.hostname ||
      urlObject.port !== currentLocation.port
    );
  } catch {
    return false;
  }
}
