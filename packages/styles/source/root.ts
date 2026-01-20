import {
  color,
  font,
  media,
  spacing,
} from '@universityofmaryland/web-token-library';
import { sans } from './typography';
import { transform } from './utilities';
import { input } from './element/field/input';
import { textarea } from './element/field/textarea';
import { select } from './element/field/select';
import { label } from './element/text/label';

/**
 * Reset styles for the application.
 * @returns {Object} DOM reset styles.
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

  button: {
    border: 'none',
    background: 'none',
  },

  video: {
    maxWidth: '100%',
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

  '.umd-layout-space-vertical-landing': {
    marginBottom: spacing.max,
  },
};

/**
 * CSS custom variables for the design system.
 * These variables provide global access to tokens throughout your application's CSS.
 * When using CSS variables, you can access token values in any CSS context.
 *
 * @type {Object<string, string>}
 * @property {string} --serif - Serif font family (Crimson Pro)
 * @property {string} --sanSerif - Sans-serif font family (Interstate)
 *
 * @property {string} --umd-color-red - #E21833
 * @property {string} --umd-color-blue - #2F7EDA
 * @property {string} --umd-color-green - #008000
 * @property {string} --umd-color-gold - #FFD200
 * @property {string} --umd-color-white - #FFFFFF
 * @property {string} --umd-color-black - #000000
 * @property {string} --umd-color-red-dark - #A90007
 * @property {string} --umd-color-gray-darker - #242424
 * @property {string} --umd-color-gray-dark - #454545
 * @property {string} --umd-color-gray-medium-a-a - #757575
 * @property {string} --umd-color-gray-medium - #7F7F7F
 * @property {string} --umd-color-gray-light - #E6E6E6
 * @property {string} --umd-color-gray-lighter - #F1F1F1
 * @property {string} --umd-color-gray-lightest - #FAFAFA
 *
 * @property {string} --umd-space-min - 8px
 * @property {string} --umd-space-xs - 12px
 * @property {string} --umd-space-sm - 16px
 * @property {string} --umd-space-md - 24px
 * @property {string} --umd-space-lg - 32px
 * @property {string} --umd-space-xl - 40px
 * @property {string} --umd-space-2xl - 48px
 * @property {string} --umd-space-3xl - 56px
 * @property {string} --umd-space-4xl - 64px
 * @property {string} --umd-space-5xl - 72px
 * @property {string} --umd-space-6xl - 80px
 * @property {string} --umd-space-7xl - 96px
 * @property {string} --umd-space-8xl - 104px
 * @property {string} --umd-space-max - 120px
 * @property {string} --umd-space-max-width-max - 1728px
 * @property {string} --umd-space-max-width-large - 1552px
 * @property {string} --umd-space-max-width-normal - 1384px
 * @property {string} --umd-space-max-width-small - 1200px
 * @property {string} --umd-space-max-width-smallest - 992px
 *
 * @property {string} --umd-font-size-min - 12px
 * @property {string} --umd-font-size-sm - 14px
 * @property {string} --umd-font-size-base - 16px
 * @property {string} --umd-font-size-lg - 18px
 * @property {string} --umd-font-size-xl - 20px
 * @property {string} --umd-font-size-2xl - 22px
 * @property {string} --umd-font-size-3xl - 24px
 * @property {string} --umd-font-size-4xl - 32px
 * @property {string} --umd-font-size-5xl - 48px
 * @property {string} --umd-font-size-6xl - 56px
 * @property {string} --umd-font-size-7xl - 64px
 * @property {string} --umd-font-size-8xl - 72px
 * @property {string} --umd-font-size-9xl - 80px
 * @property {string} --umd-font-size-10xl - 96px
 * @property {string} --umd-font-size-max - 120px
 *
 * @example
 * ```css
 *  .element: {
 *    fontFamily: 'var(--serif)',
 *    color: 'var(--umd-color-red)',
 *    fontSize: 'var(--umd-font-size-lg)',
 *    padding: 'var(--umd-space-md)'
 *  }
 * ```
 *
 * @see {@link font.family | Font families} - All available font families
 * @see {@link color | Color tokens} - All available color tokens
 * @see {@link spacing | Spacing tokens} - All available spacing tokens
 * @see {@link font.size | Font size tokens} - All available font size tokens
 *
 * @since 1.3.0
 */
export const variables = {
  '--serif': font.family.serif,
  '--sanSerif': font.family.sans,
  ...transform.variables.fromTokens(color, 'umd-color-'),
  ...transform.variables.fromTokens(spacing, 'umd-space-'),
  ...transform.variables.fromTokens(font.size, 'umd-font-size-'),
};

/**
 * Root styles for the design system.
 * Combines CSS custom properties, media conditionals, and reset styles in a single object.
 * This can be used to initialize your application with all the design system variables and base styles.
 *
 * @type {Object<string, any>}
 * @property {Object} :root - Styles for the :root selector
 * @property {string} :root.FontFamily - Base font family for the document
 * @property {string} :root.FontSize - Base font size for the document
 * @property {string} :root.lineHeight - Base line height for the document
 * @property {Object} ...reset - All reset styles for various HTML elements
 *
 * @see {@link variables | CSS Variables} - All design system CSS custom properties
 * @see {@link media.conditionals | Media Conditionals} - Responsive design breakpoint variables
 * @see {@link reset | Reset Styles} - Reset styles for HTML elements
 *
 * @since 1.0.0
 */
export const root = {
  ':root': {
    ...variables,
    ...media.conditionals,
    ...{
      'font-family': font.family.sans,
      'font-size': font.size.base,
      'line-height': '1.5em',
    },
  },
};
