import { Tokens } from '@universityofmaryland/variables';

const { Colors, Queries } = Tokens;

const EventFlags = {
  display: 'block',

  '& > *': {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 16px',
    margin: '0',
    padding: '0',

    '& > *': {
      alignItems: 'flex-start',
      color: Colors.gray.dark,
      display: 'flex',
      gap: '0.25em',
      margin: '0',

      '& svg': {
        fill: Colors.gray.dark,
        flex: 'none',
        height: '1em',
        marginTop: '0.08em',
        marginRight: '2px',
        width: '1em',

        [`@media (${Queries.large.min})`]: {
          fill: Colors.gray.dark,
        },
      },
    },
  },
};

export default {
  'umd-event-flags': {
    ...EventFlags,
  },
};
