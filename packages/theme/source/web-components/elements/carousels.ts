const Cards = {
  'umd-element-carousel-cards:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-cards:defined': {
    display: 'block',
  },
};

const ImageStandard = {
  'umd-element-carousel-image:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-image:defined': {
    display: 'block',
  },
};

export default {
  ...Cards,
  ...ImageStandard,
};
