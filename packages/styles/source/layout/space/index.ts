/**
 * @module layout/space
 * Provides spacing utilities for layout components.
 */

import * as columns from './columns';
import * as horizontal from './horizontal';
import * as vertical from './vertical';

/**
 * Column layout utilities for sidebar layouts.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.columns
 * ```
 * @since 1.1.0
 */
export { columns };

/**
 * Horizontal spacing utilities for container layouts.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal
 * ```
 * @since 1.1.0
 */
export { horizontal };

/**
 * Vertical spacing utilities for component and section spacing.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.vertical
 * ```
 * @since 1.1.0
 */
export { vertical };
