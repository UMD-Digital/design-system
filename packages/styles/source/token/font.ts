/**
 * @module token/font
 * Provides font-related design tokens including sizes, weights, and font families.
 */

/**
 * Font size tokens.
 * @type {Object<string, string>}
 * @property {string} min - 12px font size
 * @property {string} sm - 14px font size
 * @property {string} base - 16px font size (default)
 * @property {string} lg - 18px font size
 * @property {string} xl - 20px font size
 * @property {string} 2xl - 22px font size
 * @property {string} 3xl - 24px font size
 * @property {string} 4xl - 32px font size
 * @property {string} 5xl - 48px font size
 * @property {string} 6xl - 56px font size
 * @property {string} 7xl - 64px font size
 * @property {string} 8xl - 72px font size
 * @property {string} 9xl - 80px font size
 * @property {string} 10xl - 96px font size
 * @property {string} max - 120px font size
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.font.size.base // '16px'
 * ```
 * @since 1.8.0
 */
export const size = {
  min: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '24px',
  '4xl': '32px',
  '5xl': '48px',
  '6xl': '56px',
  '7xl': '64px',
  '8xl': '72px',
  '9xl': '80px',
  '10xl': '96px',
  max: '120px',
};

/**
 * Font weight tokens.
 * @type {Object<string, string>}
 * @property {string} thin - 100 weight
 * @property {string} extraLight - 200 weight
 * @property {string} light - 300 weight
 * @property {string} normal - 400 weight (default)
 * @property {string} medium - 500 weight
 * @property {string} semiBold - 600 weight
 * @property {string} bold - 700 weight
 * @property {string} extraBold - 800 weight
 * @property {string} black - 900 weight
 * @property {string} extraBlack - 950 weight
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.font.weight.bold // '700'
 * ```
 * @since 1.8.0
 */
export const weight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
  extraBlack: '950',
};

/**
 * Font family tokens.
 * @type {Object<string, string>}
 * @property {string} campaign - Barlow Condensed font stack for campaign/marketing text
 * @property {string} sans - Interstate font stack for primary sans-serif text
 * @property {string} serif - Crimson Pro font stack for serif text
 * @property {string} mono - Monospace font stack for code/technical text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.font.family.sans // "'Interstate', Helvetica, Arial, Verdana, sans-serif"
 * ```
 * @since 1.8.0
 */
export const family = {
  campaign: "'Barlow Condensed', Arial Narrow, sans-serif",
  sans: "'Interstate', Helvetica, Arial, Verdana, sans-serif",
  serif: "'Crimson Pro', Georgia, serif",
  mono: 'monospace',
};
