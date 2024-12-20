import { Colors } from '../tokens';
import * as line from './effects/line';

const baseSpan = {
  display: 'inline',
  position: 'relative',
  backgroundPosition: 'left bottom',
  backgroundRepeat: 'no-repeat',
  transition: 'background 0.5s',
};

const baseLink = {
  position: 'relative',
  textDecoration: 'none',
};

export const slideUnderRed = {
  class: 'umd-slidein-underline-red',
  ...line.slideUnder.red,
};

export const slideUnderBlack = {
  class: 'umd-slidein-underline-black',
  ...line.slideUnder.black,
};

export const slideUnderWhite = {
  class: 'umd-slidein-underline-white',
  ...line.slideUnder.white,
};

export const slideUnderGold = {
  class: 'umd-slidein-underline-gold',
  ...line.slideUnder.gold,
};

export const fadeUnderRed = {
  class: 'umd-fadein-underline-red',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },
};

export const fadeUnderGray = {
  class: 'umd-fadein-underline-gray',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gray.mediumAA}, ${Colors.gray.mediumAA})`,
    },
  },
};

export const fadeUnderGold = {
  class: 'umd-fadein-underline-gold',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },
};

export const fadeUnderBlack = {
  class: 'umd-fadein-underline-black',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },
};

export const fadeUnderWhite = {
  class: 'umd-fadein-underline-white',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    },
  },
};

export const slideInGrayRed = {
  class: 'umd-slidein-underline-gray-red',
  ...baseLink,
  ...line.slideUnder.gray,
};

export const slideInDarkGrayRed = {
  class: 'umd-slidein-underline-graydark-red',
  ...baseLink,
  ...line.slideUnder.grayDark,
};

export const fadeInSimpleDark = {
  class: 'umd-fadein-simple-dark',
  ...baseLink,
  ...line.fadeUnder.dark,
};

export const fadeInSimpleLight = {
  class: 'umd-fadein-simple-light',
  ...baseLink,
  ...line.fadeUnder.light,
};
