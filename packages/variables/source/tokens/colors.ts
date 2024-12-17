export type ColorScale = typeof colorScale;
export type BaseColors = typeof baseColors;

export const colorScale = {
  gray: {
    50: '#FAFAFA',
    100: '#F1F1F1',
    200: '#E6E6E6',
    400: '#7F7F7F',
    500: '#757575',
    700: '#454545',
    900: '#242424',
  },
  red: {
    500: '#E21833',
    900: '#A90007',
  },
  blue: {
    500: '#2F7EDA',
  },
  green: {
    500: '#008000',
  },
  gold: {
    500: '#FFD200',
  },
} as const;

export const baseColors = {
  white: '#FFFFFF',
  black: '#000000',
} as const;

export default {
  red: colorScale.red[500],
  blue: colorScale.blue[500],
  green: colorScale.green[500],
  gold: colorScale.gold[500],
  white: baseColors.white,
  black: baseColors.black,
  redDark: colorScale.red[900],
  gray: {
    darker: colorScale.gray[900],
    dark: colorScale.gray[700],
    mediumAA: colorScale.gray[500],
    medium: colorScale.gray[400],
    light: colorScale.gray[200],
    lighter: colorScale.gray[100],
    lightest: colorScale.gray[50],
  },
};
