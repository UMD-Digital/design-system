/**
 * Detects if the browser window is zoomed beyond 100%
 *
 * Checks the device pixel ratio to determine if the user has zoomed in.
 * Accounts for high DPI displays (Retina screens) by using different thresholds.
 *
 * @returns True if zoomed beyond 100% (or 200% on high DPI displays)
 *
 * @example
 * ```typescript
 * if (isScreenZoomed()) {
 *   // Adjust layout for zoomed view
 *   element.classList.add('zoomed-layout');
 * }
 * ```
 */
export const isScreenZoomed = (): boolean => {
  const isHighDPI = window.devicePixelRatio > 1;
  const browserZoomLevel = Math.round(window.devicePixelRatio * 100);

  if (isHighDPI && browserZoomLevel > 200) return true;
  if (!isHighDPI && browserZoomLevel > 100) return true;

  return false;
};