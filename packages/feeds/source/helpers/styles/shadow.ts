/**
 * Shadow DOM Styles Utility
 *
 * Utilities for managing styles within Shadow DOM contexts.
 *
 * @module utilities/styles/shadow
 */

import * as Styles from '@universityofmaryland/web-styles-library';

/**
 * Sets optimized styles on a shadow root
 *
 * This function takes a CSS string, removes duplicate rules for optimization,
 * and injects it into a shadow root via a style element.
 *
 * @param shadowRoot - The shadow root to inject styles into
 * @param styles - CSS string to optimize and inject
 *
 * @example
 * ```typescript
 * const shadowRoot = element.attachShadow({ mode: 'open' });
 * await setShadowStyles({
 *   shadowRoot,
 *   styles: '.my-class { color: red; }'
 * });
 * ```
 */
export const setShadowStyles = async ({
  shadowRoot,
  styles,
}: {
  shadowRoot: ShadowRoot;
  styles: string;
}): Promise<void> => {
  const styleElement = document.createElement('style');
  const optimizedCss = await Styles.utilities.transform.css.removeDuplicates(
    styles,
  );
  styleElement.textContent = optimizedCss;
  shadowRoot.appendChild(styleElement);
};

/**
 * Updates shadow root styles by replacing or appending
 *
 * This function can either replace all existing styles or append new styles
 * to an existing shadow root.
 *
 * @param shadowRoot - The shadow root to update
 * @param styles - CSS string to optimize and inject
 * @param replace - If true, removes all existing style elements first
 *
 * @example
 * ```typescript
 * // Append additional styles
 * await updateShadowStyles({
 *   shadowRoot,
 *   styles: '.new-class { color: blue; }',
 *   replace: false
 * });
 *
 * // Replace all styles
 * await updateShadowStyles({
 *   shadowRoot,
 *   styles: '.only-class { color: green; }',
 *   replace: true
 * });
 * ```
 */
export const updateShadowStyles = async ({
  shadowRoot,
  styles,
  replace = false,
}: {
  shadowRoot: ShadowRoot;
  styles: string;
  replace?: boolean;
}): Promise<void> => {
  if (replace) {
    // Remove all existing style elements
    const existingStyles = shadowRoot.querySelectorAll('style');
    existingStyles.forEach((style) => style.remove());
  }

  await setShadowStyles({ shadowRoot, styles });
};
