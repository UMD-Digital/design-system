import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, Queries } = Tokens;

const FeaturedEvent = {
  borderBottom: `1px solid ${Colors.gray.light}`,
  display: 'block',
  position: 'relative',
  paddingBottom: Spacing.md,
  textWrap: 'pretty',

  '&:after': {
    backgroundColor: Colors.red,
    content: `''`,
    display: 'block',
    height: '1px',
    position: 'absolute',
    bottom: '-1px',
    left: '0',
    transition: 'width 0.75s',
    width: '0',
  },

  '&:hover, &:focus-within': {
    '&:after': {
      width: '100%',
    },
  },

  [`@media (${Queries.desktop.min})`]: {
    paddingBottom: Spacing.lg,
  },

  '& .event-image-wrapper': {
    display: 'inline-block',
    marginBottom: Spacing.min,
    position: 'relative',
    width: '100%',

    [`@media (${Queries.tablet.min})`]: {
      marginBottom: Spacing.md,
    },
  },

  '& .event-image': {
    display: 'block',
    overflow: 'hidden',
    position: 'relative',

    '& img': {
      height: 'auto',
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-in-out',
      width: '100%',
    },

    '&:hover img, &:focus img': {
      transform: 'scale(1.02)',
    },
  },

  '& .event-date-tag': {
    backgroundColor: Colors.white,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    padding: Spacing.sm,
    position: 'absolute',
    bottom: '0',
    left: '0',
    margin: '10px',
    textAlign: 'center',

    '& .umd-sans-small': {
      display: 'block',
      textTransform: 'uppercase',
    },

    '& .umd-sans-extralarge': {
      display: 'block',
    },
  },

  '& .feature-banner': {
    backgroundColor: Colors.gold,
    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
    display: 'inline-block',
    lineHeight: '1em',
    marginBottom: Spacing.sm,
    padding: '8px 18px',
  },

  '& .event-title': {
    color: Colors.black,
    marginBottom: Spacing.min,
    paddingRight: Spacing['2xl'],

    [`@media (${Queries.medium.min})`]: {
      marginBottom: Spacing.sm,
    },
  },

  '& umd-event-flags, & > img, & .event-links': {
    marginBottom: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      marginBottom: Spacing.sm,
    },

    '&:last-child': {
      marginBottom: '0',
    },
  },

  '& umd-event-flags a': {
    '& span': {
      fontWeight: '500',
      textDecoration: 'none',
      position: 'relative',

      '&:after': {
        content: '',
        height: '1px',
        opacity: '0',
        position: 'absolute',
        bottom: '1px',
        left: '0',
        transition: 'opacity 0.3s',
        width: '100%',
      },
    },

    '&:hover, &:focus': {
      color: Colors.red,

      '& span:after, & span:after': {
        backgroundColor: Colors.red,
        opacity: 1,
      },
    },
  },

  '& .event-summary': {
    color: Colors.gray.dark,
    marginBottom: Spacing.sm,
  },
};

export default {
  'umd-featured-event': {
    ...FeaturedEvent,
  },
};
