const BrandVideo = {
  'umd-element-hero-brand-video:not(:defined)': {
    display: 'none',
  },
  'umd-element-hero-brand-video:defined': {
    display: 'block',
  },
};

const Default = {
  'umd-element-hero:not(:defined)': {
    display: 'none',
  },
  'umd-element-hero:defined': {
    display: 'block',
  },
};

const Logo = {
  'umd-element-hero-logo:not(:defined)': {
    display: 'none',
  },
  'umd-element-hero-logo:defined': {
    display: 'block',
  },
};

const Minimal = {
  'umd-element-hero-minimal:not(:defined)': {
    display: 'none',
  },
  'umd-element-hero-minimal:defined': {
    display: 'block',
  },
};

export default {
  ...BrandVideo,
  ...Default,
  ...Logo,
  ...Minimal,
};
