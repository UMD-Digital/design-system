const NewsGrid = {
  'umd-feed-news:not(:defined)': {
    display: 'none',
  },
  'umd-feed-news:defined': {
    display: 'block',
  },
};

export default {
  ...NewsGrid,
};
