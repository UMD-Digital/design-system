import { color, font, spacing } from '../../token';
import { sans } from '../../typography';
import * as animation from '../../animation';
import { create } from '../../utilities';
import * as list from '../list';
import * as table from '../table';
import { code } from './code';
import { quote } from './quote';

// Consistent naming
const classNamePrefix = 'umd-text-rich';
const scalingContainerMedium = 650;

const themeDarkColors = {
  ...animation.nestedElements.linksDark,
  color: color.white,

  '& *': {
    color: color.white,
  },
};

const childSpacing = {
  marginTop: spacing.md,

  '&:first-child': {
    marginTop: '0',
  },

  '&:empty': {
    marginTop: 0,
  },
};

const simpleBase = {
  ...animation.nestedElements.linksWhite,
  fontSize: font.size.base,
  lineHeight: '1.5em',

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  '& em, & i': {
    fontStyle: 'italic',
  },

  '& strong, & b': {
    FontWeight: font.weight.bold,
  },

  '& u': {
    textDecoration: 'underline',
  },
};

const advancedBase = {
  ...simpleBase,
  fontSize: font.size.lg,
  lineHeight: '1.5em',

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  [`& p,
    & ul,
    & ol,
    & pre,
    & blockquote`]: {
    maxWidth: '960px',
  },

  '& hr': {
    border: 'none',
    height: '1px',
    backgroundColor: 'currentColor',
  },

  '& img': {
    maxWidth: '100%',
  },

  '& sup': {
    fontSize: font.size.min,
  },

  '& sub': {
    fontSize: font.size.min,
  },

  '& small': {
    ...sans.smaller,
    display: 'inline-block',
  },
};

// umd-text-rich-simple
export const simple = create.jssObject({
  className: [
    `${classNamePrefix}-simple`,
    /** @deprecated Use 'umd-text-rich-simple' instead */
    `umd-text-simple`,
  ],
  ...simpleBase,
});

// umd-text-rich-simple-dark
export const simpleDark = create.jssObject({
  ...simpleBase,
  ...themeDarkColors,
  className: `${classNamePrefix}-simple-dark`,
});

// umd-text-rich-simple-large
export const simpleLarge = create.jssObject({
  ...simpleBase,
  fontSize: font.size.lg,

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  className: [
    `${classNamePrefix}-simple-large`,
    /** @deprecated Use 'umd-text-rich-simple-large' instead */
    `umd-text-simple-large`,
  ],
});

// umd-text-rich-simple-large-dark
export const simpleLargeDark = create.jssObject({
  ...simpleBase,
  ...themeDarkColors,
  fontSize: font.size.lg,

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  className: `${classNamePrefix}-simple-large-dark`,
});

// umd-text-rich-simple-scaling
export const simpleScaling = create.jssObject({
  ...simpleBase,
  fontSize: font.size.base,

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: font.size.lg,

    '& > *': {
      fontSize: font.size.lg,
      ...childSpacing,
    },
  },

  className: `${classNamePrefix}-simple-scaling`,
});

// umd-text-rich-simple-scaling-dark
export const simpleScalingDark = create.jssObject({
  ...simpleBase,
  ...themeDarkColors,
  fontSize: font.size.base,

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: font.size.lg,

    '& > *': {
      fontSize: font.size.lg,
      ...childSpacing,
    },
  },

  className: `${classNamePrefix}-simple-scaling-dark`,
});

// umd-text-rich-advanced
export const advanced = create.jssObject({
  FontWeight: font.weight.normal,

  ...advancedBase,
  ...code,
  ...quote,

  [`& ul,
    & ol ul`]: {
    ...list.unordered,
  },

  [`& ol,
    & ul ol`]: {
    ...list.ordered,
  },

  '& + ol, &ol + ul': {
    marginTop: spacing.sm,
  },

  '& table': {
    ...table.inline,
  },

  className: [
    `${classNamePrefix}-advanced`,
    /** @deprecated Use 'umd-text-rich-advanced' instead */
    `umd-rich-text`,
  ],
});

// umd-text-rich-advanced-dark
export const advancedDark = create.jssObject({
  ...advanced,
  ...themeDarkColors,

  className: [
    `${classNamePrefix}-advanced-dark`,
    /** @deprecated Use 'umd-text-rich-advanced-dark' instead */
    `umd-rich-text-dark`,
  ],
});
