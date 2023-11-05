import { colors } from '../tokens/colors';
import { spacing } from '../tokens/layout';
import { typography } from '../common/typography';

const base = {
  '.umd-cta': {
    ...typography['.umd-interactive-sans-small'],
    ...{
      transition: 'background 0.5s, border 0.5s, color 0.5s',
      textAlign: 'center',

      '& > *:not(svg)': {
        verticalAlign: 'middle',
      },
    },
  },
  '.umd-cta-icon': {
    fill: colors.red,
    display: 'inline',
    flex: 'none',
    height: '14px',
    width: '14px',
    transition: 'fill 0.5s',
  },
};

const standard = {
  '.umd-cta-primary': {
    ...base['.umd-cta'],
    ...{
      backgroundColor: colors.red,
      border: `1px solid ${colors.red}`,
      color: colors.white,
      padding: `${spacing.xs} ${spacing.lg}`,
      maxWidth: '400px',

      svg: {
        ...base['.umd-cta-icon'],

        fill: colors.white,
      },

      'svg:first-child': {
        marginRight: '4px',
      },

      'svg:last-child': {
        marginLeft: '4px',
      },

      '&:hover,&:focus': {
        border: `1px solid ${colors.redDark}`,
        backgroundColor: colors.redDark,

        svg: {
          fill: colors.white,
        },
      },
    },
  },

  '.umd-cta-secondary': {
    ...base['.umd-cta'],
    ...{
      color: colors.black,
      display: 'inline-block',
      textAlign: 'left',
      paddingLeft: '18px',
      position: 'relative',

      svg: {
        ...base['.umd-cta-icon'],
        position: 'absolute',
        left: '0',
        top: '4px',
      },

      '& > *:not(svg):not(.sr-only)': {
        backgroundImage: `linear-gradient(${colors.red}, ${colors.red})`,
        display: 'inline',
        position: 'relative',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '0% 2px',
        transition: 'background-size 0.4s',
      },

      '&:hover,&:focus': {
        svg: {
          fill: colors.red,
        },

        '& > *:not(svg):not(.sr-only)': {
          backgroundSize: '100% 2px',
        },
      },
    },
  },

  '.umd-cta-outlined': {
    ...base['.umd-cta'],
    ...{
      backgroundColor: colors.white,
      border: `1px solid ${colors.gray.darker}`,
      color: colors.black,
      padding: `${spacing.xs} ${spacing.lg}`,

      svg: {
        ...base['.umd-cta-icon'],
      },

      'svg:first-child': {
        marginRight: '4px',
      },

      'svg:last-child': {
        marginLeft: '4px',
      },

      '&:hover,&:focus': {
        backgroundColor: colors.gray.darker,
        color: colors.white,

        svg: {
          fill: colors.white,
        },
      },
    },
  },
};

const large = {
  '.umd-cta-primary-large': {
    ...standard['.umd-cta-primary'],
    ...typography['.umd-sans-large'],
    ...{
      padding: `${spacing.sm} ${spacing.lg}`,

      svg: {
        ...base['.umd-cta-icon'],

        fill: colors.white,
        height: '18px',
        width: '18px',
      },
    },
  },

  '.umd-cta-secondary-large': {
    ...standard['.umd-cta-secondary'],
    ...typography['.umd-sans-large'],
    ...{
      paddingLeft: '22px',

      svg: {
        ...base['.umd-cta-icon'],
        position: 'absolute',
        left: '0',
        top: '4px',

        height: '18px',
        width: '18px',
      },
    },
  },

  '.umd-cta-outlined-large': {
    ...standard['.umd-cta-outlined'],
    ...typography['.umd-sans-large'],
    ...{
      padding: `${spacing.sm} ${spacing.lg}`,

      svg: {
        ...base['.umd-cta-icon'],

        height: '18px',
        width: '18px',
      },
    },
  },
};

const umdCta = Object.assign(standard, large);

export { umdCta };
