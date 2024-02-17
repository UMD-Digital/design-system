import { Tokens, umdAlignedContent } from '@universityofmaryland/variables';

const { colors, spacing, queries } = Tokens;

const umdIntro = {
  'umd-component-intro': {
    containerName: 'umd-component-intro',
    containerType: 'inline-size',
    display: 'block',

    '& .intro-content-wrapper': {
      ...umdAlignedContent['.umd-layout-aligned-center'],
      ...{
        margin: 'auto',
        paddingTop: `${spacing['6xl']}`,
        position: 'relative',

        '&:before': {
          content: '""',
          backgroundColor: colors.red,
          height: `${spacing['4xl']}`,
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

      [`@container umd-component-intro (${queries.large.min})`]: {
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
        marginTop: spacing.xs,

        [`@container umd-component-intro (${queries.large.min})`]: {
          marginTop: '0',
        },

        '&:first-child': {
          marginTop: '0',
          marginRight: spacing.md,
          paddingBottom: '0',

          [`@container umd-component-intro (${queries.large.min})`]: {
            maxWidth: '66.666%',
          },
        },

        '&:last-child': {
          [`@container umd-component-intro (${queries.large.min})`]: {
            maxWidth: '33.333%',
          },
        },
      },
    },
  },
};

export { umdIntro };
