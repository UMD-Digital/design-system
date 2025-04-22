/**
 * @module token
 * Design tokens and system variables.
 */

import color from './color';
import spacing from './spacing';

/**
 * Media query breakpoints and utilities.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.media
 * ```
 * @since 1.1.0
 */
export * as media from './media';

/**
 * Typography and font tokens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.font
 * ```
 * @since 1.1.0
 */
export * as font from './font';

/**
 * Color system tokens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.color
 * ```
 * @since 1.1.0
 */
export { color };

/**
 * Spacing system tokens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.spacing
 * ```
 * @since 1.1.0
 */
export { spacing };
