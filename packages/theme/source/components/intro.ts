import { Tokens } from '@universityofmaryland/variables';
import LayoutSpacing from '../layout/spacing';

const { Colors, Spacing, Queries } = Tokens;

export default {
  'umd-component-intro': {
    containerName: 'umd-component-intro',
    containerType: 'inline-size',
    display: 'block',
    marginBottom: `${Spacing.xl}`,

    [`@container umd-component-intro (${Queries.large.min})`]: {
      marginBottom: `${Spacing['2xl']}`,
    },

    '& .intro-content-wrapper': {
      ...LayoutSpacing['.umd-layout-spacing-center'],
      ...{
        margin: 'auto',
        maxWidth: `calc(${Spacing['5xl']} * 10)`,
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
    containerName: 'umd-component-intro-simple',
    containerType: 'inline-size',
    display: 'block',
    marginBottom: `${Spacing.xl}`,

    [`@container umd-component-intro (${Queries.large.min})`]: {
      marginBottom: `${Spacing['2xl']}`,
    },

    '& .intro-content-wrapper': {
      ...LayoutSpacing['.umd-layout-spacing-center'],
      ...{
        margin: 'auto',
        maxWidth: `calc(${Spacing['5xl']} * 10)`,
        paddingTop: '0',
        position: 'relative',

        '&:before': {
          display: 'none',
        },
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
