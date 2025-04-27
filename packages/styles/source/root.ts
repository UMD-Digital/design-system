import { color, font, spacing } from './token';
import { sans } from './typography';
import { transform } from './utilities';
import { input } from './element/field/input';
import { textarea } from './element/field/textarea';
import { select } from './element/field/select';
import { label } from './element/text/label';

export const reset = {
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
  ...transform.variables.tokensToCssVars(color, 'umd-color-'),
  ...transform.variables.tokensToCssVars(spacing, 'umd-space-'),
};

export const root = {
  ':root': {
    ...variables,
    FontFamily: font.family.sans,
    FontSize: font.size.base,
    lineHeight: '1.5em',
  },

  ...reset,
};
