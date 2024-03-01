import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, Queries } = Tokens;

const EventListing = {
  borderBottom: `1px solid ${Colors.gray.light}`,
  display: 'block',
  marginTop: Spacing.md,
  position: 'relative',
  paddingBottom: Spacing.md,

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

  '&:first-of-type': {
    marginTop: '0',
  },

  [`@media (${Queries.desktop.min})`]: {
    alignItems: 'flex-start',
    display: 'flex',
    paddingLeft: '135px',
  },

  '& .event-date-tag': {
    alignItems: 'center',
    display: 'flex',
    gap: '4px',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    left: '18px',
    width: '80px',

    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    '& svg': {
      fill: Colors.black,
      width: '10px',
      height: '10px',
    },

    '& time': {
      textAlign: 'center',
    },

    '& time > span': {
      display: 'block',
    },

    '& time > span:first-child': {
      textTransform: 'uppercase',
      fontWeight: '700',
    },
  },

  '& .event-details': {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 16px',
    margin: '0',
    padding: '0',
    marginBottom: Spacing.min,

    '& > *': {
      alignItems: 'center',
      display: 'flex',
      gap: '0.25em',
      margin: '0',

      '& svg': {
        fill: Colors.gray,
        height: '1em',
        marginRight: '4px',
        width: '1em',

        [`@media (${Queries.large.min})`]: {
          fill: Colors.black,
          gridArea: 'details',
          paddingRight: Spacing.sm,
        },
      },
    },
  },

  '& .event-content': {
    display: 'block',
    position: 'relative',

    [`@media (${Queries.large.min})`]: {
      alignItems: 'start',
      display: 'grid',
      gridTemplateColumns:
        '[content-start] auto [content-gutter] 33% [content-end]',
      gridTemplateRows: 'auto auto 1fr',
      gridTemplateAreas: "'title image' 'details image' 'summary image'",
    },
  },

  '& .event-image': {
    display: 'block',
    float: 'right',
    lineHeight: '0',
    marginLeft: Spacing.sm,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    position: 'relative',
    width: '33%',

    [`@media (${Queries.large.min})`]: {
      float: 'none',
      gridArea: 'image',
      margin: '0',
      marginLeft: Spacing.sm,
      width: 'calc(100% - 16px)',
    },

    '& img': {
      height: 'auto',
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-in-out',
      width: '100%',
    },

    '&:hover img, &:focus img': {
      transform: 'scale(1.05)',
    },
  },

  '& .event-title': {
    marginBottom: Spacing.min,
    overflowWrap: 'anywhere',

    [`@media (${Queries.large.min})`]: {
      gridArea: 'title',
      paddingRight: Spacing.min,
    },

    '& a': {
      color: Colors.black,
    },
  },

  '& umd-event-flags': {
    marginBottom: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      marginBottom: Spacing.sm,
    },
  },

  '& .event-summary': {
    color: Colors.gray.dark,
    marginBottom: '0',

    [`@media (${Queries.large.min})`]: {
      gridArea: 'summary',
      paddingRight: Spacing.sm,
    },
  },
};

export default {
  'umd-event': {
    ...EventListing,
  },
};
