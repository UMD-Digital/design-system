import { color, font, media, spacing } from './token';
import { sans } from './typography';
import { transform } from './utilities';
import { input } from './element/field/input';
import { textarea } from './element/field/textarea';
import { select } from './element/field/select';
import { label } from './element/text/label';

/**
 * Reset styles for the application.
 * @returns {Object} DOM reset styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.baseColors.white
 * ```
 * @since 1.0.0
 */
export const reset = {
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
  },

  body: {
    overscrollBehavior: 'none',
  },

  'h1, h2, h3, h4, h5, h6': {
    marginBottom: '0',
    fontSize: '16px',
    lineHeight: '1.4em',
    fontWeight: 'normal',
  },

  hr: {
    margin: `${spacing.lg} 0`,
    backgroundColor: color.gray.light,
    border: 'none',
    height: '1px',
  },

  li: {
    ...sans.medium,
    color: color.gray.dark,
  },

  date: {
    color: color.black,
  },

  p: {
    ...sans.medium,
    color: color.gray.dark,
    marginBottom: spacing.md,

    '&:last-child': {
      marginBottom: '0',
    },
  },

  address: {
    fontStyle: 'normal',
  },

  label: {
    ...label,
  },

  input: {
    ...input,
  },

  textarea: {
    ...textarea,
  },

  select: {
    ...select,
  },
};

export const variables = {
  '--serif': font.family.serif,
  '--sanSerif': font.family.sans,
  ...transform.variables.fromTokens(color, 'umd-color-'),
  ...transform.variables.fromTokens(spacing, 'umd-space-'),
  ...transform.variables.fromTokens(font.size, 'umd-font-size-'),
};

export const root = {
  ':root': {
    ...variables,
    ...media.conditionals,
    FontFamily: font.family.sans,
    FontSize: font.size.base,
    lineHeight: '1.5em',
  },

  ...reset,
};
