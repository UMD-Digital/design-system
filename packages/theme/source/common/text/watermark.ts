import { Tokens } from '@universityofmaryland/variables';

const { Colors, Queries, FontSize } = Tokens;

const WatermarkContainer = {
  position: 'relative',
};

const Watermark = {
  alignItems: 'center',
  color: Colors.gray.lighter,
  position: 'absolute',
  width: '100%',
  top: '30px',
  left: '-40px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'flex-start',
  opacity: ' 0.6',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: '-1',

  [`@media (${Queries.large.max})`]: {
    display: 'none',
  },

  [`@media (${Queries.large.min})`]: {
    fontSize: `min(calc(${FontSize['5xl']} + 13vw), 240px)`,
  },
};

const WatermarkDark = {
  ...Watermark,
  ...{
    opacity: '0.2',
    zIndex: '0',
  },
};

export default {
  '.umd-watermark-container': {
    ...WatermarkContainer,
  },

  '.umd-watermark': {
    ...Watermark,
  },

  '.umd-watermark-dark': {
    ...WatermarkDark,
  },
};
