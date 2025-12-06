/**
 * @module token
 * Design tokens for the University of Maryland Design System.
 * Provides a centralized source of truth for colors, typography, spacing, and breakpoints.
 *
 * @example
 * ```typescript
 * // Import all tokens
 * import * as token from '@universityofmaryland/web-token-library';
 *
 * // Import specific categories
 * import { color, spacing } from '@universityofmaryland/web-token-library';
 *
 * // Use in styles
 * const myStyles = {
 *   color: token.color.red,
 *   padding: token.spacing.md,
 *   fontFamily: token.font.family.sans
 * };
 * ```
 *
 * @since 1.0.0
 */

import color from './color';
import spacing from './spacing';

/**
 * Media query breakpoints and utilities.
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.media.queries.desktop.min // "min-width: 1024px"
 * ```
 * @since 1.0.0
 */
export * as media from './media';

/**
 * Typography and font tokens.
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.font.family.sans // "'Interstate', Helvetica, Arial, Verdana, sans-serif"
 * ```
 * @since 1.0.0
 */
export * as font from './font';

/**
 * Color system tokens.
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.color.red // '#E21833'
 * ```
 * @since 1.0.0
 */
export { color };

/**
 * Spacing system tokens.
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.spacing.md // '24px'
 * ```
 * @since 1.0.0
 */
export { spacing };
