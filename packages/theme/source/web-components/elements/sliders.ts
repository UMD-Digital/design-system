const Events = {
  'umd-element-slider-events:not(:defined)': {
    display: 'none',
  },
  'umd-element-slider-events:defined': {
    display: 'block',
  },
};

const EventsFeed = {
  'umd-element-slider-events-feed:not(:defined)': {
    display: 'none',
  },
  'umd-element-slider-events-feed:defined': {
    display: 'block',
  },
};

export default {
  ...Events,
  ...EventsFeed,
};
