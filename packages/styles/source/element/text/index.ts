/**
 * @module element/text
 * Provides styles for various text elements and typography components.
 */

/**
 * Caption text styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.caption.smaller
 * ```
 * @since 1.8.0
 */
import * as caption from './caption';

/**
 * Code text styles for displaying code snippets.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.code.block
 * ```
 * @since 1.8.0
 */
import * as code from './code';

/**
 * Text cluster styles for organizing related text elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.cluster.default
 * ```
 * @since 1.8.0
 */
import * as cluster from './cluster';

/**
 * Text decoration styles for highlighting and styling text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.decoration.eyebrow
 * ```
 * @since 1.8.0
 */
import * as decoration from './decoration';

/**
 * Label text styles for form fields and other labeling needs.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.label.field
 * ```
 * @since 1.8.0
 */
import * as label from './label';

/**
 * Link text styles with various hover effects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.link.red
 * ```
 * @since 1.8.0
 */
import * as link from './link';

/**
 * Text line styles for horizontal dividers.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.horizontal
 * ```
 * @since 1.8.0
 */
import * as line from './line';

/**
 * Quote text styles for blockquotes and pullquotes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.quote.blockquote
 * ```
 * @since 1.8.0
 */
import * as quote from './quote';

/**
 * Rich text styles for formatted content areas.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.content
 * ```
 * @since 1.8.0
 */
import * as rich from './rich';

export { caption, code, cluster, decoration, label, link, line, quote, rich };
