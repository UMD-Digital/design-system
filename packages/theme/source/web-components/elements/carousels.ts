const Cards = {
  'umd-element-carousel-cards:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-cards:defined': {
    display: 'block',
  },
};

const Default = {
  'umd-element-carousel:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel:defined': {
    display: 'block',
    position: 'relative',
  },
};

const ImageStandard = {
  'umd-element-carousel-image:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-image:defined': {
    display: 'block',
    position: 'relative',
  },
};

const ImageMultiple = {
  'umd-element-carousel-multiple-image:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-multiple-image:defined': {
    display: 'block',
    position: 'relative',
  },
};

const People = {
  'umd-element-carousel-people:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-people:defined': {
    display: 'block',
    position: 'relative',
  },
};

export default {
  ...Cards,
  ...Default,
  ...ImageStandard,
  ...ImageMultiple,
  ...People,
};
