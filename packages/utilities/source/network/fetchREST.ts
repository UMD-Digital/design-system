/**
 * Sends a JSON GET request to a REST endpoint
 *
 * Shared entry point for REST reads, so request settings common to every
 * call can change in one place. Callers handle the status and body.
 *
 * @param url - The endpoint URL
 * @returns Promise resolving to the fetch Response
 *
 * @example
 * ```typescript
 * const response = await fetchREST({
 *   url: 'https://gateway.designsystem.umd.edu/v1/feeds/campus-alerts',
 * });
 *
 * if (response.ok) {
 *   const data = await response.json();
 * }
 * ```
 *
 * @category network
 */
export const fetchREST = ({ url }: { url: string }): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
