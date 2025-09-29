/**
 * Debounces a function to limit how often it can be called
 *
 * Creates a debounced version of the provided function that delays execution
 * until after the specified wait time has elapsed since the last call.
 * Useful for optimizing performance of expensive operations triggered by
 * frequent events (e.g., window resize, scroll, input).
 *
 * @param callback - The function to debounce
 * @param wait - The number of milliseconds to delay (default: 50ms)
 * @returns The debounced function
 *
 * @example
 * ```typescript
 * const handleResize = () => {
 *   console.log('Window resized');
 * };
 *
 * const debouncedResize = debounce(handleResize, 200);
 * window.addEventListener('resize', debouncedResize);
 * ```
 */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  wait: number = 50
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback(...args), wait);
  };
};