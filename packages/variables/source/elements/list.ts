import Typography from '../typography';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

const ListStylesBase = {
  [`& ul,
    & ol ul`]: {
    padding: '0',
    counterReset: 'item',
    listStyleType: 'none !important',

    '& li': {
      paddingLeft: spacing.md,
      position: 'relative',
    },

    '& li:before': {
      ...Typography['.umd-sans-large'],
      ...{
        content: '"•"',
        counterIncrement: 'item',
        position: 'absolute',
        top: '0',
        right: `calc(100% - ${spacing.xs})`,
      },
    },

    '& li li': {
      paddingLeft: spacing.xl,

      '&:before': {
        right: `calc(100% - ${spacing.md})`,
      },
    },
  },

  [`& ol,
    & ul ol`]: {
    padding: '0',
    counterReset: 'item',
    listStyleType: 'none !important',

    '& li ': {
      paddingLeft: spacing.xl,
      position: 'relative',
    },

    '& li:before': {
      ...Typography['.umd-sans-large'],
      ...{
        content: 'counter(item) "."',
        counterIncrement: 'item',
        fontVariantNumeric: 'tabular-nums',
        position: 'absolute',
        top: '0',
        right: `calc(100% - ${spacing.md})`,
        unicodeBidi: 'isolate',
        whiteSpace: 'pre',
      },
    },
  },

  '& > ol': {
    '& > li': {
      paddingLeft: spacing.xl,
    },

    '& > li:before': {
      content: 'counter(item)',
      borderRight: `1px solid ${colors.red}`,
      paddingRight: spacing.min,
      right: `calc(100% - ${spacing.lg})`,
    },
  },

  '& li': {
    marginTop: spacing.sm,

    '&:first-child': {
      marginTop: '0',
    },

    [`& > ul,
      & > ol`]: {
      marginTop: spacing.sm,
    },
  },
};

const UnOrderedListStyleTypes = {
  // disc

  [`& ul[style*='list-style-type:disc'] > li:before,
    & ul[style*='list-style-type: disc'] > li:before`]: {
    content: 'counter(item, disc)',
  },

  // circle

  [`& ul[style*='list-style-type:circle'] > li:before,
    & ul[style*='list-style-type: circle'] > li:before`]: {
    content: 'counter(item, circle)',
  },

  // square

  [`& ul[style*='list-style-type:square'] > li:before,
    & ul[style*='list-style-type: square'] > li:before`]: {
    content: 'counter(item, square)',
  },
};

const OrderedListStyleTypes = {
  // decimal

  [`& ol[style*='list-style-type:decimal'] > li:before,
    & ol[style*='list-style-type: decimal'] > li:before`]: {
    content: "counter(item, decimal) '.'",
  },

  [`& > ol[style*='list-style-type:decimal'] > li:before,
    & > ol[style*='list-style-type: decimal'] > li:before`]: {
    content: 'counter(item, decimal)',
  },

  // cjk-decimal

  [`& ol[style*='list-style-type:cjk-decimal'] > li:before,
    & ol[style*='list-style-type: cjk-decimal'] > li:before`]: {
    content: "counter(item, cjk-decimal) '.'",
  },

  [`& > ol[style*='list-style-type:cjk-decimal'] > li:before,
    & > ol[style*='list-style-type: cjk-decimal'] > li:before`]: {
    content: 'counter(item, cjk-decimal)',
  },

  // decimal-leading-zero

  [`& ol[style*='list-style-type:decimal-leading-zero'] > li:before,
    & ol[style*='list-style-type: decimal-leading-zero'] > li:before`]: {
    content: "counter(item, decimal-leading-zero) '.'",
  },

  [`& > ol[style*='list-style-type:decimal-leading-zero'] > li:before,
    & > ol[style*='list-style-type: decimal-leading-zero'] > li:before`]: {
    content: 'counter(item, decimal-leading-zero)',
  },

  // lower-roman

  [`& ol[style*='list-style-type:lower-roman'] > li:before,
    & ol[style*='list-style-type: lower-roman'] > li:before`]: {
    content: "counter(item, lower-roman) '.'",
  },

  [`& > ol[style*='list-style-type:lower-roman'] > li:before,
    & > ol[style*='list-style-type: lower-roman'] > li:before`]: {
    content: 'counter(item, lower-roman)',
  },

  // upper-roman

  [`& ol[style*='list-style-type:upper-roman'] > li:before,
    & ol[style*='list-style-type: upper-roman'] > li:before`]: {
    content: "counter(item, upper-roman) '.'",
  },

  [`& > ol[style*='list-style-type:upper-roman'] > li:before,
    & > ol[style*='list-style-type: upper-roman'] > li:before`]: {
    content: 'counter(item, upper-roman)',
  },

  // lower-greek

  [`& ol[style*='list-style-type:lower-greek'] > li:before,
    & ol[style*='list-style-type: lower-greek'] > li:before`]: {
    content: "counter(item, lower-greek) '.'",
  },

  [`& > ol[style*='list-style-type:lower-greek'] > li:before,
    & > ol[style*='list-style-type: lower-greek'] > li:before`]: {
    content: 'counter(item, lower-greek)',
  },

  // lower-latin

  [`& ol[style*='list-style-type:lower-latin'] > li:before,
    & ol[style*='list-style-type: lower-latin'] > li:before`]: {
    content: "counter(item, lower-latin) '.'",
  },

  [`& > ol[style*='list-style-type:lower-latin'] > li:before,
    & > ol[style*='list-style-type: lower-latin'] > li:before`]: {
    content: 'counter(item, lower-latin)',
  },

  // upper-latin

  [`& ol[style*='list-style-type:upper-latin'] > li:before,
    & ol[style*='list-style-type: upper-latin'] > li:before`]: {
    content: "counter(item, upper-latin) '.'",
  },

  [`& > ol[style*='list-style-type:upper-latin'] > li:before,
    & > ol[style*='list-style-type: upper-latin'] > li:before`]: {
    content: 'counter(item, upper-latin)',
  },

  // lower-alpha

  [`& ol[style*='list-style-type:lower-alpha'] > li:before,
    & ol[style*='list-style-type: lower-alpha'] > li:before`]: {
    content: "counter(item, lower-alpha) '.'",
  },

  [`& > ol[style*='list-style-type:lower-alpha'] > li:before,
    & > ol[style*='list-style-type: lower-alpha'] > li:before`]: {
    content: 'counter(item, lower-alpha)',
  },

  // upper-alpha

  [`& ol[style*='list-style-type:upper-alpha'] > li:before,
    & ol[style*='list-style-type: upper-alpha'] > li:before`]: {
    content: "counter(item, upper-alpha) '.'",
  },

  [`& > ol[style*='list-style-type:upper-alpha'] > li:before,
    & > ol[style*='list-style-type: upper-alpha'] > li:before`]: {
    content: 'counter(item, upper-alpha)',
  },
};

const ListStyles = {
  ...ListStylesBase,
  ...UnOrderedListStyleTypes,
  ...OrderedListStyleTypes,
};

export default ListStyles;
