/**
 * @module element/table
 * Provides table styling components.
 */

import {
  color,
  font,
  media,
  spacing,
} from '@universityofmaryland/web-token-library';
import { sans } from '../typography';
import { white as linkWhite } from './text/link';
import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-table';

/**
 * Inline table styling with responsive overflow.
 * @returns {JssObject} Inline table with responsive overflow and consistent styling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.table.inline
 * ```
 * @example
 * ```css
 * class="umd-table-inline"
 * ```
 * @example
 * ```text
 * Use 'umd-table-inline' instead of 'umd-rich-text-inline-table'.
 * ```
 * @since 1.1.0
 */
export interface InlineTableOptions {
  theme?: 'light' | 'dark';
}

/**
 * Composable inline table style selector.
 *
 * @param options - Configuration for theme
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.table.composeInline({ theme: 'dark' });
 * ```
 * @since 2.1.0
 */
export function composeInline(options?: InlineTableOptions): JssObject {
  const { theme = 'light' } = options || {};
  const isThemeDark = theme === 'dark';

  const className: string[] = [];

  if (isThemeDark) {
    className.push(`${classNamePrefix}-inline-dark`);
  } else {
    className.push(
      `${classNamePrefix}-inline`,
      /** @deprecated Use 'umd-table-inline' instead */
      `umd-rich-text-inline-table`,
    );
  }

  return create.jss.objectWithClassName({
    borderCollapse: 'collapse',
    display: 'block',
    overflowX: 'auto',
    tableLayout: 'fixed',
    maxWidth: '100%',

    '& th': sans.large,

    '& strong, & b': {
      fontWeight: font.weight.bold,
    },

    '& td': sans.medium,

    '& th, & td': {
      padding: `${spacing.sm}`,
      verticalAlign: 'top',

      [`@media (${media.queries.large.min})`]: {
        padding: `${spacing.md}`,
      },
    },

    '& thead th': {
      background: color.black,
      color: color.white,
      textAlign: 'left',
      borderTop: `2px solid ${color.red}`,

      ...(isThemeDark && {
        background: color.gray.darker,
        borderTop: `2px solid ${color.gold}`,
      }),

      '& *': {
        color: 'inherit',
      },

      '& a': {
        ...linkWhite,

        '&:hover, &:focus': {
          ...linkWhite['&:hover, &:focus'],
          backgroundImage: `linear-gradient(${color.red}, ${color.red})`,

          ...(isThemeDark && {
            backgroundImage: `linear-gradient(${color.gold}, ${color.gold})`,
          }),
        },
      },
    },

    '& tbody tr': {
      borderTop: `1px solid ${color.gray.darker}`,

      ...(isThemeDark && {
        borderTop: `1px solid ${color.gray.dark}`,
      }),
    },

    '& tr:nth-child(even)': {
      background: color.gray.lightest,

      ...(isThemeDark && {
        background: color.gray.darker,
      }),
    },

    className,
  });
}

/**
 * Inline table styling with responsive overflow.
 * @returns {JssObject} Inline table with responsive overflow and consistent styling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.table.inline
 * ```
 * @example
 * ```css
 * class="umd-table-inline"
 * ```
 * @since 1.1.0
 */
export const inline: JssObject = composeInline();

/**
 * Inline table styling for dark themed sections.
 * @returns {JssObject} Inline table adjusted for dark backgrounds.
 * @example
 * ```css
 * class="umd-table-inline-dark"
 * ```
 * @since 2.1.0
 */
export const inlineDark: JssObject = composeInline({ theme: 'dark' });
