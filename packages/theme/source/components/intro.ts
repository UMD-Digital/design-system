import {
  spacing,
  colors,
  umdAlignedContent,
} from '@universityofmaryland/variables';

const umdIntro = {
  'umd-component-intro': {
    container: 'umd-intro inline-size',
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

  '.umd-intro-type-simple': {
    '& .intro-content-wrapper': {
      paddingTop: '0',

      '&:before': {
        display: 'none',
      },
    },
  },

  '.umd-intro-type-wide': {
    '& .intro-content-wrapper': {
      display: 'block',
      paddingTop: '0',

      '@container umd-intro (min-width: 640px)': {
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

        '@container umd-intro (min-width: 640px)': {
          marginTop: '0',
        },

        '&:first-child': {
          marginTop: '0',
          marginRight: spacing.md,

          '@container umd-intro (min-width: 640px)': {
            maxWidth: '66.666%',
          },
        },

        '&:last-child': {
          '@container umd-intro (min-width: 640px)': {
            maxWidth: '33.333%',
          },
        },
      },
    },
  },
};

export { umdIntro };
