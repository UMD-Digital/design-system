import { Colors, Spacing } from '../tokens';
import { sans } from '../typography';
import { create } from '../utilities';

let orderedListBase: Record<string, any> = {
  padding: '0',
  counterReset: 'item',
  listStyleType: 'none !important',
  lineHeight: '1.4em',

  '& li ': {
    paddingLeft: Spacing.xl,
    position: 'relative',
  },

  '& li': {
    '&:before': {
      ...sans.large,
      content: 'counter(item)',
      counterIncrement: 'item',

      fontVariantNumeric: 'tabular-nums',
      position: 'absolute',
      top: '1px',
      right: `calc(100% - ${Spacing.md})`,
      unicodeBidi: 'isolate',
      whiteSpace: 'pre',
    },
  },

  '& > li li': {
    '&:before': {
      content: 'counter(item) "."',
    },
  },

  '& ol': {
    counterReset: 'item',
  },

  '& li + li, & li > ul, & li > ol': {
    marginTop: Spacing.sm,
  },
};

const unorderedListBase = {
  padding: '0',
  counterReset: 'item',
  listStyleType: 'none !important',

  '& li': {
    paddingLeft: Spacing.md,
    position: 'relative',
    lineHeight: '1.4em',

    '&:before': {
      content: '"•"',
      fontWeight: 'bold',
      counterIncrement: 'item',
      position: 'absolute',
      top: '1px',
      right: `calc(100% - ${Spacing.xs})`,
    },
  },

  '& li + li, & li > ul, & li > ol': {
    marginTop: Spacing.sm,
  },

  '& li li': {
    paddingLeft: Spacing.xl,

    '&:before': {
      right: `calc(100% - ${Spacing.md})`,
    },
  },

  '& ol': {
    ...orderedListBase,
  },
};

orderedListBase = {
  ...orderedListBase,

  '& > li': {
    paddingLeft: Spacing.xl,

    '&:before': {
      content: 'counter(item)',
      borderRight: `1px solid ${Colors.red}`,
      paddingRight: Spacing.min,
      right: `calc(100% - ${Spacing.lg})`,
    },
  },

  '& ul': {
    ...unorderedListBase,
  },
};

const nested = {
  [`& ul, 
    & ol ul`]: {
    ...unorderedListBase,
  },

  [`& ol,
    & ul ol`]: {
    ...orderedListBase,
  },
};

const unordered = {
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

const ordered = {
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

// umd-list
export const listNested = create.jssObject({
  className: [
    `umd-list`,
    /** @deprecated Use 'umd-list' instead */
    `umd-lists`,
  ],

  ...nested,
  ...ordered,
  ...unordered,
});

// '& + ol, &ol + ul': {
//   marginTop: Spacing.sm,
// },

// umd-list-ordered
export const listOrdered = create.jssObject({
  className: `umd-list-ordered`,
  ...orderedListBase,
  ...ordered,
});

// umd-list-ordered
export const listUnordered = create.jssObject({
  className: `umd-list-unordered`,

  ...unorderedListBase,
  ...unordered,
});
