/**
 * @module layout/grid
 * Provides grid layout systems for responsive designs.
 */

import { columnsTwo, columnsThree, columnsFour, stacked } from './base';

/**
 * Grid layouts with light and dark borders.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsTwo // light borders
 * Styles.layout.grid.border.columnsTwoDark // dark borders
 * ```
 * @since 1.1.0
 */
export * as border from './border';

/**
 * Grid layouts with dark borders.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.borderDark.columnsTwo
 * ```
 * @deprecated Use border.columnsTwoDark, border.columnsThreeDark, border.columnsFourDark instead
 * @since 1.1.0
 */
import {
  columnsTwoDark,
  columnsThreeDark,
  columnsFourDark,
} from './border';

export const borderDark = {
  columnsTwo: columnsTwoDark,
  columnsThreeDark,
  columnsFourDark,
};

/**
 * Utilities for grid child elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.child
 * ```
 * @since 1.1.0
 */
export * as child from './child';

/**
 * Grid layouts with controlled gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap
 * ```
 * @since 1.1.0
 */
export * as gap from './gap';

/**
 * Inline grid and flex layouts.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.inline
 * ```
 * @since 1.1.0
 */
export * as inline from './inline';

/**
 * Masonry grid layouts with staggered elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.masonary
 * ```
 * @since 1.1.0
 */
export * as masonary from './masonary';

/**
 * Grid layouts with vertical offsets.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.offset
 * ```
 * @since 1.1.0
 */
export * as offset from './offset';

/**
 * Two-column responsive grid.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsTwo
 * ```
 * @since 1.1.0
 */
export { columnsTwo };

/**
 * Three-column responsive grid.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsThree
 * ```
 * @since 1.1.0
 */
export { columnsThree };

/**
 * Four-column responsive grid.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsFour
 * ```
 * @since 1.1.0
 */
export { columnsFour };

/**
 * Stacked vertical layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.stacked
 * ```
 * @since 1.1.0
 */
export { stacked };
