import { colors, spacing } from '../../tokens';
import { create } from '../../utilities';
import { baseInput } from './_base';
import { valid, invalid } from './_state';

const CHEVRON_DOWN_DARK = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC43NDAyIDUyLjE3OTRMMjMuNjY3NSAyNEwyIDI0LjAwMDFMMzcuMDkxNSA2NS4yNzE0TDM3LjA3NTMgNjUuMjg5N0w0OC43MTYgNzlMNDguNzQwMiA3OC45NzE1TDQ4Ljc2NDQgNzlMNjAuNDA1MSA2NS4yODk3TDYwLjM4ODkgNjUuMjcxNEw5NS40ODA0IDI0TDczLjgxMjkgMjQuMDAwMUw0OC43NDAyIDUyLjE3OTRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K`;
const CHEVRON_DOWN_RED = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC43NDAyIDUyLjE3OTRMMjMuNjY3NSAyNEwyIDI0LjAwMDFMMzcuMDkxNSA2NS4yNzE0TDM3LjA3NTMgNjUuMjg5N0w0OC43MTYgNzlMNDguNzQwMiA3OC45NzE1TDQ4Ljc2NDQgNzlMNjAuNDA1MSA2NS4yODk3TDYwLjM4ODkgNjUuMjcxNEw5NS40ODA0IDI0TDczLjgxMjkgMjQuMDAwMUw0OC43NDAyIDUyLjE3OTRaIiBmaWxsPSIjRTIxODMzIi8+Cjwvc3ZnPgo=`;

// Consistent naming
const classNamePrefix = 'umd-field-select';

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
      color: colors.black,
      transition: 'color 0.3s',

      '&:hover': {
        color: colors.red,
      },

      '&:checked': {
        backgroundColor: colors.gray.light,
      },
    },
  },
};

export const selectWrapper = create.jssObject({
  backgroundColor: colors.white,
  overflow: 'hidden',
  position: 'relative',

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
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
