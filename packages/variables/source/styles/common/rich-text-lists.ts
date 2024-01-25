import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from './typography';

const listStylesBase = {
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
      ...typography['.umd-sans-large'],
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
      ...typography['.umd-sans-large'],
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

const unOrderedListStyleTypes = {
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

const orderedListStyleTypes = {
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

  // arabic-indic

  [`& ol[style*='list-style-type:arabic-indic'] > li:before,
    & ol[style*='list-style-type: arabic-indic'] > li:before`]: {
    content: "counter(item, arabic-indic) '.'",
  },

  [`& > ol[style*='list-style-type:arabic-indic'] > li:before,
    & > ol[style*='list-style-type: arabic-indic'] > li:before`]: {
    content: 'counter(item, arabic-indic)',
  },

  // armenian

  [`& ol[style*='list-style-type:armenian'] > li:before,
    & ol[style*='list-style-type: armenian'] > li:before`]: {
    content: "counter(item, armenian) '.'",
  },

  [`& > ol[style*='list-style-type:armenian'] > li:before,
    & > ol[style*='list-style-type: armenian'] > li:before`]: {
    content: 'counter(item, armenian)',
  },

  // bengali

  [`& ol[style*='list-style-type:bengali'] > li:before,
    & ol[style*='list-style-type: bengali'] > li:before`]: {
    content: "counter(item, bengali) '.'",
  },

  [`& > ol[style*='list-style-type:bengali'] > li:before,
    & > ol[style*='list-style-type: bengali'] > li:before`]: {
    content: 'counter(item, bengali)',
  },

  // cambodian/khmer

  [`& ol[style*='list-style-type:cambodian/khmer'] > li:before,
    & ol[style*='list-style-type: cambodian/khmer'] > li:before`]: {
    content: "counter(item, cambodian/khmer) '.'",
  },

  [`& > ol[style*='list-style-type:cambodian/khmer'] > li:before,
    & > ol[style*='list-style-type: cambodian/khmer'] > li:before`]: {
    content: 'counter(item, cambodian/khmer)',
  },

  // cjk-earthly-branch

  [`& ol[style*='list-style-type:cjk-earthly-branch'] > li:before,
    & ol[style*='list-style-type: cjk-earthly-branch'] > li:before`]: {
    content: "counter(item, cjk-earthly-branch) '.'",
  },

  [`& > ol[style*='list-style-type:cjk-earthly-branch'] > li:before,
    & > ol[style*='list-style-type: cjk-earthly-branch'] > li:before`]: {
    content: 'counter(item, cjk-earthly-branch)',
  },

  // cjk-heavenly-stem

  [`& ol[style*='list-style-type:cjk-heavenly-stem'] > li:before,
    & ol[style*='list-style-type: cjk-heavenly-stem'] > li:before`]: {
    content: "counter(item, cjk-heavenly-stem) '.'",
  },

  [`& > ol[style*='list-style-type:cjk-heavenly-stem'] > li:before,
    & > ol[style*='list-style-type: cjk-heavenly-stem'] > li:before`]: {
    content: 'counter(item, cjk-heavenly-stem)',
  },

  // cjk-ideographic

  [`& ol[style*='list-style-type:cjk-ideographic'] > li:before,
    & ol[style*='list-style-type: cjk-ideographic'] > li:before`]: {
    content: "counter(item, cjk-ideographic) '.'",
  },

  [`& > ol[style*='list-style-type:cjk-ideographic'] > li:before,
    & > ol[style*='list-style-type: cjk-ideographic'] > li:before`]: {
    content: 'counter(item, cjk-ideographic)',
  },

  // devanagari

  [`& ol[style*='list-style-type:devanagari'] > li:before,
    & ol[style*='list-style-type: devanagari'] > li:before`]: {
    content: "counter(item, devanagari) '.'",
  },

  [`& > ol[style*='list-style-type:devanagari'] > li:before,
    & > ol[style*='list-style-type: devanagari'] > li:before`]: {
    content: 'counter(item, devanagari)',
  },

  // ethiopic-numeric

  [`& ol[style*='list-style-type:ethiopic-numeric'] > li:before,
    & ol[style*='list-style-type: ethiopic-numeric'] > li:before`]: {
    content: "counter(item, ethiopic-numeric) '.'",
  },

  [`& > ol[style*='list-style-type:ethiopic-numeric'] > li:before,
    & > ol[style*='list-style-type: ethiopic-numeric'] > li:before`]: {
    content: 'counter(item, ethiopic-numeric)',
  },

  // georgian

  [`& ol[style*='list-style-type:georgian'] > li:before,
    & ol[style*='list-style-type: georgian'] > li:before`]: {
    content: "counter(item, georgian) '.'",
  },

  [`& > ol[style*='list-style-type:georgian'] > li:before,
    & > ol[style*='list-style-type: georgian'] > li:before`]: {
    content: 'counter(item, georgian)',
  },

  // gujarati

  [`& ol[style*='list-style-type:gujarati'] > li:before,
    & ol[style*='list-style-type: gujarati'] > li:before`]: {
    content: "counter(item, gujarati) '.'",
  },

  [`& > ol[style*='list-style-type:gujarati'] > li:before,
    & > ol[style*='list-style-type: gujarati'] > li:before`]: {
    content: 'counter(item, gujarati)',
  },

  // gurmukhi

  [`& ol[style*='list-style-type:gurmukhi'] > li:before,
    & ol[style*='list-style-type: gurmukhi'] > li:before`]: {
    content: "counter(item, gurmukhi) '.'",
  },

  [`& > ol[style*='list-style-type:gurmukhi'] > li:before,
    & > ol[style*='list-style-type: gurmukhi'] > li:before`]: {
    content: 'counter(item, gurmukhi)',
  },

  // hebrew

  [`& ol[style*='list-style-type:hebrew'] > li:before,
    & ol[style*='list-style-type: hebrew'] > li:before`]: {
    content: "counter(item, hebrew) '.'",
  },

  [`& > ol[style*='list-style-type:hebrew'] > li:before,
    & > ol[style*='list-style-type: hebrew'] > li:before`]: {
    content: 'counter(item, hebrew)',
  },

  // hiragana

  [`& ol[style*='list-style-type:hiragana'] > li:before,
    & ol[style*='list-style-type: hiragana'] > li:before`]: {
    content: "counter(item, hiragana) '.'",
  },

  [`& > ol[style*='list-style-type:hiragana'] > li:before,
    & > ol[style*='list-style-type: hiragana'] > li:before`]: {
    content: 'counter(item, hiragana)',
  },

  // hiragana-iroha

  [`& ol[style*='list-style-type:hiragana-iroha'] > li:before,
    & ol[style*='list-style-type: hiragana-iroha'] > li:before`]: {
    content: "counter(item, hiragana-iroha) '.'",
  },

  [`& > ol[style*='list-style-type:hiragana-iroha'] > li:before,
    & > ol[style*='list-style-type: hiragana-iroha'] > li:before`]: {
    content: 'counter(item, hiragana-iroha)',
  },

  // japanese-formal

  [`& ol[style*='list-style-type:japanese-formal'] > li:before,
    & ol[style*='list-style-type: japanese-formal'] > li:before`]: {
    content: "counter(item, japanese-formal) '.'",
  },

  [`& > ol[style*='list-style-type:japanese-formal'] > li:before,
    & > ol[style*='list-style-type: japanese-formal'] > li:before`]: {
    content: 'counter(item, japanese-formal)',
  },

  // japanese-informal

  [`& ol[style*='list-style-type:japanese-informal'] > li:before,
    & ol[style*='list-style-type: japanese-informal'] > li:before`]: {
    content: "counter(item, japanese-informal) '.'",
  },

  [`& > ol[style*='list-style-type:japanese-informal'] > li:before,
    & > ol[style*='list-style-type: japanese-informal'] > li:before`]: {
    content: 'counter(item, japanese-informal)',
  },

  // kannada

  [`& ol[style*='list-style-type:kannada'] > li:before,
    & ol[style*='list-style-type: kannada'] > li:before`]: {
    content: "counter(item, kannada) '.'",
  },

  [`& > ol[style*='list-style-type:kannada'] > li:before,
    & > ol[style*='list-style-type: kannada'] > li:before`]: {
    content: 'counter(item, kannada)',
  },

  // katakana

  [`& ol[style*='list-style-type:katakana'] > li:before,
    & ol[style*='list-style-type: katakana'] > li:before`]: {
    content: "counter(item, katakana) '.'",
  },

  [`& > ol[style*='list-style-type:katakana'] > li:before,
    & > ol[style*='list-style-type: katakana'] > li:before`]: {
    content: 'counter(item, katakana)',
  },

  // katakana-iroha

  [`& ol[style*='list-style-type:katakana-iroha'] > li:before,
    & ol[style*='list-style-type: katakana-iroha'] > li:before`]: {
    content: "counter(item, katakana-iroha) '.'",
  },

  [`& > ol[style*='list-style-type:katakana-iroha'] > li:before,
    & > ol[style*='list-style-type: katakana-iroha'] > li:before`]: {
    content: 'counter(item, katakana-iroha)',
  },

  // korean-hangul-formal

  [`& ol[style*='list-style-type:korean-hangul-formal'] > li:before,
    & ol[style*='list-style-type: korean-hangul-formal'] > li:before`]: {
    content: "counter(item, korean-hangul-formal) '.'",
  },

  [`& > ol[style*='list-style-type:korean-hangul-formal'] > li:before,
    & > ol[style*='list-style-type: korean-hangul-formal'] > li:before`]: {
    content: 'counter(item, korean-hangul-formal)',
  },

  // korean-hanja-formal

  [`& ol[style*='list-style-type:korean-hanja-formal'] > li:before,
    & ol[style*='list-style-type: korean-hanja-formal'] > li:before`]: {
    content: "counter(item, korean-hanja-formal) '.'",
  },

  [`& > ol[style*='list-style-type:korean-hanja-formal'] > li:before,
    & > ol[style*='list-style-type: korean-hanja-formal'] > li:before`]: {
    content: 'counter(item, korean-hanja-formal)',
  },

  // korean-hanja-informal

  [`& ol[style*='list-style-type:korean-hanja-informal'] > li:before,
    & ol[style*='list-style-type: korean-hanja-informal'] > li:before`]: {
    content: "counter(item, korean-hanja-informal) '.'",
  },

  [`& > ol[style*='list-style-type:korean-hanja-informal'] > li:before,
    & > ol[style*='list-style-type: korean-hanja-informal'] > li:before`]: {
    content: 'counter(item, korean-hanja-informal)',
  },

  // lao

  [`& ol[style*='list-style-type:lao'] > li:before,
    & ol[style*='list-style-type: lao'] > li:before`]: {
    content: "counter(item, lao) '.'",
  },

  [`& > ol[style*='list-style-type:lao'] > li:before,
    & > ol[style*='list-style-type: lao'] > li:before`]: {
    content: 'counter(item, lao)',
  },

  // lower-armenian

  [`& ol[style*='list-style-type:lower-armenian'] > li:before,
    & ol[style*='list-style-type: lower-armenian'] > li:before`]: {
    content: "counter(item, lower-armenian) '.'",
  },

  [`& > ol[style*='list-style-type:lower-armenian'] > li:before,
    & > ol[style*='list-style-type: lower-armenian'] > li:before`]: {
    content: 'counter(item, lower-armenian)',
  },

  // malayalam

  [`& ol[style*='list-style-type:malayalam'] > li:before,
    & ol[style*='list-style-type: malayalam'] > li:before`]: {
    content: "counter(item, malayalam) '.'",
  },

  [`& > ol[style*='list-style-type:malayalam'] > li:before,
    & > ol[style*='list-style-type: malayalam'] > li:before`]: {
    content: 'counter(item, malayalam)',
  },

  // mongolian

  [`& ol[style*='list-style-type:mongolian'] > li:before,
    & ol[style*='list-style-type: mongolian'] > li:before`]: {
    content: "counter(item, mongolian) '.'",
  },

  [`& > ol[style*='list-style-type:mongolian'] > li:before,
    & > ol[style*='list-style-type: mongolian'] > li:before`]: {
    content: 'counter(item, mongolian)',
  },

  // myanmar

  [`& ol[style*='list-style-type:myanmar'] > li:before,
    & ol[style*='list-style-type: myanmar'] > li:before`]: {
    content: "counter(item, myanmar) '.'",
  },

  [`& > ol[style*='list-style-type:myanmar'] > li:before,
    & > ol[style*='list-style-type: myanmar'] > li:before`]: {
    content: 'counter(item, myanmar)',
  },

  // oriya

  [`& ol[style*='list-style-type:oriya'] > li:before,
    & ol[style*='list-style-type: oriya'] > li:before`]: {
    content: "counter(item, oriya) '.'",
  },

  [`& > ol[style*='list-style-type:oriya'] > li:before,
    & > ol[style*='list-style-type: oriya'] > li:before`]: {
    content: 'counter(item, oriya)',
  },

  // persian

  [`& ol[style*='list-style-type:persian'] > li:before,
    & ol[style*='list-style-type: persian'] > li:before`]: {
    content: "counter(item, persian) '.'",
  },

  [`& > ol[style*='list-style-type:persian'] > li:before,
    & > ol[style*='list-style-type: persian'] > li:before`]: {
    content: 'counter(item, persian)',
  },

  // simp-chinese-formal

  [`& ol[style*='list-style-type:simp-chinese-formal'] > li:before,
    & ol[style*='list-style-type: simp-chinese-formal'] > li:before`]: {
    content: "counter(item, simp-chinese-formal) '.'",
  },

  [`& > ol[style*='list-style-type:simp-chinese-formal'] > li:before,
    & > ol[style*='list-style-type: simp-chinese-formal'] > li:before`]: {
    content: 'counter(item, simp-chinese-formal)',
  },

  // simp-chinese-informal

  [`& ol[style*='list-style-type:simp-chinese-informal'] > li:before,
    & ol[style*='list-style-type: simp-chinese-informal'] > li:before`]: {
    content: "counter(item, simp-chinese-informal) '.'",
  },

  [`& > ol[style*='list-style-type:simp-chinese-informal'] > li:before,
    & > ol[style*='list-style-type: simp-chinese-informal'] > li:before`]: {
    content: 'counter(item, simp-chinese-informal)',
  },

  // tamil

  [`& ol[style*='list-style-type:tamil'] > li:before,
    & ol[style*='list-style-type: tamil'] > li:before`]: {
    content: "counter(item, tamil) '.'",
  },

  [`& > ol[style*='list-style-type:tamil'] > li:before,
    & > ol[style*='list-style-type: tamil'] > li:before`]: {
    content: 'counter(item, tamil)',
  },

  // telugu

  [`& ol[style*='list-style-type:telugu'] > li:before,
    & ol[style*='list-style-type: telugu'] > li:before`]: {
    content: "counter(item, telugu) '.'",
  },

  [`& > ol[style*='list-style-type:telugu'] > li:before,
    & > ol[style*='list-style-type: telugu'] > li:before`]: {
    content: 'counter(item, telugu)',
  },

  // thai

  [`& ol[style*='list-style-type:thai'] > li:before,
    & ol[style*='list-style-type: thai'] > li:before`]: {
    content: "counter(item, thai) '.'",
  },

  [`& > ol[style*='list-style-type:thai'] > li:before,
    & > ol[style*='list-style-type: thai'] > li:before`]: {
    content: 'counter(item, thai)',
  },

  // tibetan

  [`& ol[style*='list-style-type:tibetan'] > li:before,
    & ol[style*='list-style-type: tibetan'] > li:before`]: {
    content: "counter(item, tibetan) '.'",
  },

  [`& > ol[style*='list-style-type:tibetan'] > li:before,
    & > ol[style*='list-style-type: tibetan'] > li:before`]: {
    content: 'counter(item, tibetan)',
  },

  // trad-chinese-formal

  [`& ol[style*='list-style-type:trad-chinese-formal'] > li:before,
    & ol[style*='list-style-type: trad-chinese-formal'] > li:before`]: {
    content: "counter(item, trad-chinese-formal) '.'",
  },

  [`& > ol[style*='list-style-type:trad-chinese-formal'] > li:before,
    & > ol[style*='list-style-type: trad-chinese-formal'] > li:before`]: {
    content: 'counter(item, trad-chinese-formal)',
  },

  // trad-chinese-informal

  [`& ol[style*='list-style-type:trad-chinese-informal'] > li:before,
    & ol[style*='list-style-type: trad-chinese-informal'] > li:before`]: {
    content: "counter(item, trad-chinese-informal) '.'",
  },

  [`& > ol[style*='list-style-type:trad-chinese-informal'] > li:before,
    & > ol[style*='list-style-type: trad-chinese-informal'] > li:before`]: {
    content: 'counter(item, trad-chinese-informal)',
  },

  // upper-armenian

  [`& ol[style*='list-style-type:upper-armenian'] > li:before,
    & ol[style*='list-style-type: upper-armenian'] > li:before`]: {
    content: "counter(item, upper-armenian) '.'",
  },

  [`& > ol[style*='list-style-type:upper-armenian'] > li:before,
    & > ol[style*='list-style-type: upper-armenian'] > li:before`]: {
    content: 'counter(item, upper-armenian)',
  },

  // -moz-ethiopic-halehame

  [`& ol[style*='list-style-type:-moz-ethiopic-halehame'] > li:before,
    & ol[style*='list-style-type: -moz-ethiopic-halehame'] > li:before`]: {
    content: "counter(item, -moz-ethiopic-halehame) '.'",
  },

  [`& > ol[style*='list-style-type:-moz-ethiopic-halehame'] > li:before,
    & > ol[style*='list-style-type: -moz-ethiopic-halehame'] > li:before`]: {
    content: 'counter(item, -moz-ethiopic-halehame)',
  },

  // -moz-ethiopic-halehame-am

  [`& ol[style*='list-style-type:-moz-ethiopic-halehame-am'] > li:before,
    & ol[style*='list-style-type: -moz-ethiopic-halehame-am'] > li:before`]: {
    content: "counter(item, -moz-ethiopic-halehame-am) '.'",
  },

  [`& > ol[style*='list-style-type:-moz-ethiopic-halehame-am'] > li:before,
    & > ol[style*='list-style-type: -moz-ethiopic-halehame-am'] > li:before`]: {
    content: 'counter(item, -moz-ethiopic-halehame-am)',
  },

  // ethiopic-halehame-ti-er

  [`& ol[style*='list-style-type:ethiopic-halehame-ti-er'] > li:before,
    & ol[style*='list-style-type: ethiopic-halehame-ti-er'] > li:before`]: {
    content: "counter(item, ethiopic-halehame-ti-er) '.'",
  },

  [`& > ol[style*='list-style-type:ethiopic-halehame-ti-er'] > li:before,
    & > ol[style*='list-style-type: ethiopic-halehame-ti-er'] > li:before`]: {
    content: 'counter(item, ethiopic-halehame-ti-er)',
  },

  // ethiopic-halehame-ti-et

  [`& ol[style*='list-style-type:ethiopic-halehame-ti-et'] > li:before,
    & ol[style*='list-style-type: ethiopic-halehame-ti-et'] > li:before`]: {
    content: "counter(item, ethiopic-halehame-ti-et) '.'",
  },

  [`& > ol[style*='list-style-type:ethiopic-halehame-ti-et'] > li:before,
    & > ol[style*='list-style-type: ethiopic-halehame-ti-et'] > li:before`]: {
    content: 'counter(item, ethiopic-halehame-ti-et)',
  },

  // hangul

  [`& ol[style*='list-style-type:hangul'] > li:before,
    & ol[style*='list-style-type: hangul'] > li:before`]: {
    content: "counter(item, hangul) '.'",
  },

  [`& > ol[style*='list-style-type:hangul'] > li:before,
    & > ol[style*='list-style-type: hangul'] > li:before`]: {
    content: 'counter(item, hangul)',
  },

  // hangul-consonant

  [`& ol[style*='list-style-type:hangul-consonant'] > li:before,
    & ol[style*='list-style-type: hangul-consonant'] > li:before`]: {
    content: "counter(item, hangul-consonant) '.'",
  },

  [`& > ol[style*='list-style-type:hangul-consonant'] > li:before,
    & > ol[style*='list-style-type: hangul-consonant'] > li:before`]: {
    content: 'counter(item, hangul-consonant)',
  },

  // urdu

  [`& ol[style*='list-style-type:urdu'] > li:before,
    & ol[style*='list-style-type: urdu'] > li:before`]: {
    content: "counter(item, urdu) '.'",
  },

  [`& > ol[style*='list-style-type:urdu'] > li:before,
    & > ol[style*='list-style-type: urdu'] > li:before`]: {
    content: 'counter(item, urdu)',
  },
};

const richTextLists = {
  '.umd-rich-text-lists': {
    ...listStylesBase,
    ...unOrderedListStyleTypes,
    ...orderedListStyleTypes,
  },
};

export { richTextLists };
