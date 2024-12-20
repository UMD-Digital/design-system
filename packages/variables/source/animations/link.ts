import { Colors } from '../tokens';
import { create } from '../utilities';
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

export const slideUnderRed = create.jssObject({
  className: 'umd-slidein-underline-red',
  ...line.slideUnder.red,
});

export const slideUnderBlack = create.jssObject({
  className: 'umd-slidein-underline-black',
  ...line.slideUnder.black,
});

export const slideUnderWhite = create.jssObject({
  className: 'umd-slidein-underline-white',
  ...line.slideUnder.white,
});

export const slideUnderGold = create.jssObject({
  className: 'umd-slidein-underline-gold',
  ...line.slideUnder.gold,
});

export const fadeUnderRed = create.jssObject({
  className: 'umd-fadein-underline-red',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },
});

export const fadeUnderGray = create.jssObject({
  className: 'umd-fadein-underline-gray',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gray.mediumAA}, ${Colors.gray.mediumAA})`,
    },
  },
});

export const fadeUnderGold = create.jssObject({
  className: 'umd-fadein-underline-gold',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },
});

export const fadeUnderBlack = create.jssObject({
  className: 'umd-fadein-underline-black',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },
});

export const fadeUnderWhite = create.jssObject({
  className: 'umd-fadein-underline-white',
  ...{
    ...line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    },
  },
});

export const slideInGrayRed = create.jssObject({
  className: 'umd-slidein-underline-gray-red',
  ...baseLink,
  ...line.slideUnder.gray,
});

export const slideInDarkGrayRed = create.jssObject({
  className: 'umd-slidein-underline-graydark-red',
  ...baseLink,
  ...line.slideUnder.grayDark,
});

export const fadeInSimpleDark = create.jssObject({
  className: 'umd-fadein-simple-dark',
  ...baseLink,
  ...line.fadeUnder.dark,
});

export const fadeInSimpleLight = create.jssObject({
  className: 'umd-fadein-simple-light',
  ...baseLink,
  ...line.fadeUnder.light,
});
