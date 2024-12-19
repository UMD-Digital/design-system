import * as barlowCondensed from './barlow-condensed';
import * as crimsonPro from './crimson-pro';
import * as interstate from './interstate';

const fontFaces = [
  ...Object.values(barlowCondensed),
  ...Object.values(interstate),
  ...Object.values(crimsonPro),
];

const browserString = {
  '@font-face': fontFaces,
};

export { barlowCondensed, crimsonPro, interstate, browserString };
