/**
 * @module element/field/select
 * Provides styles for select dropdown input elements.
 */

import { color, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { baseInput } from './_base';
import { valid, invalid } from './_state';

/**
 * Base64 encoded SVG for dark chevron down icon.
 * @private
 */
const CHEVRON_DOWN_DARK = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC43NDAyIDUyLjE3OTRMMjMuNjY3NSAyNEwyIDI0LjAwMDFMMzcuMDkxNSA2NS4yNzE0TDM3LjA3NTMgNjUuMjg5N0w0OC43MTYgNzlMNDguNzQwMiA3OC45NzE1TDQ4Ljc2NDQgNzlMNjAuNDA1MSA2NS4yODk3TDYwLjM4ODkgNjUuMjcxNEw5NS40ODA0IDI0TDczLjgxMjkgMjQuMDAwMUw0OC43NDAyIDUyLjE3OTRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K`;

/**
 * Base64 encoded SVG for red chevron down icon.
 * @private
 */
const CHEVRON_DOWN_RED = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC43NDAyIDUyLjE3OTRMMjMuNjY3NSAyNEwyIDI0LjAwMDFMMzcuMDkxNSA2NS4yNzE0TDM3LjA3NTMgNjUuMjg5N0w0OC43MTYgNzlMNDguNzQwMiA3OC45NzE1TDQ4Ljc2NDQgNzlMNjAuNDA1MSA2NS4yODk3TDYwLjM4ODkgNjUuMjcxNEw5NS40ODA0IDI0TDczLjgxMjkgMjQuMDAwMUw0OC43NDAyIDUyLjE3OTRaIiBmaWxsPSIjRTIxODMzIi8+Cjwvc3ZnPgo=`;

// Consistent naming
const classNamePrefix = 'umd-field-select';

/**
 * Base select dropdown styles.
 * @type {object}
 * @private
 */
export const select = {
  ...baseInput,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },

  '&[multiple]': {
    cursor: 'pointer',
    resize: 'vertical',

    '& option': {
      padding: '5px',
      color: color.black,
      transition: 'color 0.3s',

      '&:hover': {
        color: color.red,
      },

      '&:checked': {
        backgroundColor: color.gray.light,
      },
    },
  },
};

/**
 * Select dropdown wrapper with custom dropdown indicator.
 * @returns {JssObject} Styles for select dropdown with chevron indicator.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.select.selectWrapper
 * ```
 * @example
 * ```css
 * class="umd-field-select-wrapper"
 * ```
 * @deprecated Use 'umd-field-select-wrapper' instead of 'umd-forms-select-wrapper'.
 * @since 1.8.0
 */
export const selectWrapper: JssObject = create.jssObject({
  backgroundColor: color.white,
  overflow: 'hidden',
  position: 'relative',

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-field-select-wrapper' instead */
    'umd-forms-select-wrapper',
  ],

  '& select': {
    appearance: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    paddingRight: spacing.lg,
    position: 'relative',
    zIndex: 9,
  },

  [`&:after, &:before`]: {
    content: "''",
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    position: 'absolute',
    right: spacing.sm,
    top: `calc(50% - ${spacing.min})`,
    zIndex: 0,
    transition: 'opacity 0.5s ease-in-out',
    height: spacing.sm,
    width: spacing.sm,
  },

  '&:before': {
    backgroundImage: `url("${CHEVRON_DOWN_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${CHEVRON_DOWN_RED}")`,
    opacity: 0,
  },

  [`&:hover, &:focus, &:focus-within`]: {
    '&:before': {
      opacity: 0,
    },

    '&:after': {
      opacity: 1,
    },
  },
});
