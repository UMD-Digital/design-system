import { Animations, Tokens } from '@universityofmaryland/variables';

const { Colors, Queries, FontSize } = Tokens;

const Child = {
  position: 'absolute',
  top: '20px',
  left: '-2%',
  color: Colors.gray.lighter,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: `min(calc(${FontSize['5xl']} + 13vw), 240px)`,
  lineHeight: '0',
  opacity: ' 0.6',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: '-1',

  [`@media (${Queries.large.max})`]: {
    display: 'none',
  },
};

const Watermark = {
  position: 'relative',

  '> *': {
    ...Child,
    ...Animations.Scroll.SlideInFromLeft,
  },
};

const WatermarkDark = {
  ...Watermark,

  '> *': {
    ...Child,
    ...Animations.Scroll.SlideInFromLeft,
    opacity: '0.12',
    zIndex: 'inherit',
  },
};

export default {
  '.umd-watermark': {
    ...Watermark,
  },

  '.umd-watermark-dark': {
    ...WatermarkDark,
  },
};
