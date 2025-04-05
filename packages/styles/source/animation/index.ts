/**
 * @module animation
 * Animation module that provides various animation styles.
 */

/**
 * Slide and fade line animation styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line
 * ```
 * @since 1.8.0
 */
export * as line from './line';

/**
 * Loading indicator animation styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.loader
 * ```
 * @since 1.8.0
 */
export * as loader from './loader';

/**
 * Nested element animation styles - commonly used for rich text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.nestedElements
 * ```
 * @since 1.8.0
 */
export * as nestedElements from './nested-elements';

/**
 * CSS-based transitions with keyframes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.transition
 * ```
 * @since 1.8.0
 */
export * as transition from './transition';
