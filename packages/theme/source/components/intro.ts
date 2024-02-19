import { Tokens } from '@universityofmaryland/variables';
import { AlignedContent } from '../layout/alignment';

const { Colors, Spacing, Queries } = Tokens;

export default {
  'umd-component-intro': {
    containerName: 'umd-component-intro',
    containerType: 'inline-size',
    display: 'block',

    '& .intro-content-wrapper': {
      ...AlignedContent['.umd-layout-aligned-center'],
      ...{
        margin: 'auto',
        paddingTop: `${Spacing['6xl']}`,
        position: 'relative',

        '&:before': {
          content: '""',
          backgroundColor: Colors.red,
          height: `${Spacing['4xl']}`,
          width: '2px',
          position: 'absolute',
          left: `calc(50% - 1px)`,
          top: '0',
        },
      },
    },
  },

  'umd-component-intro-simple': {
    containerName: 'umd-component-intro',
    containerType: 'inline-size',
    display: 'block',

    '& .intro-content-wrapper': {
      paddingTop: '0',

      '&:before': {
        display: 'none',
      },
    },
  },

  'umd-component-intro-wide': {
    containerName: 'umd-component-intro',
    containerType: 'inline-size',
    display: 'block',

    '& .intro-content-wrapper': {
      display: 'block',
      padding: '0',

      [`@container umd-component-intro (${Queries.large.min})`]: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      },

      '&:before': {
        display: 'none',
      },

      '& > *': {
        textWrap: 'pretty',
        maxWidth: '100%',
        marginTop: Spacing.xs,

        [`@container umd-component-intro (${Queries.large.min})`]: {
          marginTop: '0',
        },

        '&:first-child': {
          marginTop: '0',
          marginRight: Spacing.md,
          paddingBottom: '0',

          [`@container umd-component-intro (${Queries.large.min})`]: {
            maxWidth: '66.666%',
          },
        },

        '&:last-child': {
          [`@container umd-component-intro (${Queries.large.min})`]: {
            maxWidth: '33.333%',
          },
        },
      },
    },
  },
};
