import { Tokens } from '@universityofmaryland/variables';
import typography from 'common/typography';

const { Colors, Spacing, Queries } = Tokens;

const LogoColumn = {
  '& .logo-column': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
  },

  '& umd-element-nav-drawer': {
    borderRight: `1px solid ${Colors.gray.light}`,
    paddingRight: Spacing.min,
    marginRight: Spacing.sm,
  },

  '& .logo': {
    display: 'block',

    '& img': {
      width: '100%',
      maxWidth: '160px',
      maxHeight: '48px',

      [`@media (${Queries.tablet.min})`]: {
        maxWidth: '240px',
      },
    },
  },

  '& .umd-sans-extralarge': {
    whiteSpace: 'nowrap',
  },
};

const NavColumn = {
  '& .nav-column': {
    display: 'flex',
    alignItems: 'center',

    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },
  },

  '.nav-items': {
    display: 'flex',
    gap: Spacing.md,
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& svg': {
      width: '24px',
      height: '24px',
      fill: `${Colors.black}`,
    },

    '& svg path': {
      fill: `${Colors.black}`,
    },
  },

  '.utility-items': {
    display: 'flex',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
    marginBottom: `${Spacing.sm}`,

    '& a:hover, & a:focus, & button:hover, & button:focus': {
      color: `${Colors.red}`,
    },

    '& *': {
      ...typography['.umd-sans-smaller'],
      color: `${Colors.gray.darker}`,
      position: 'relative',
      tranisition: 'color 0.3s',
    },

    '& *:not(:first-child):before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      left: `-${Spacing.min}`,
      width: '1px',
      backgroundColor: `${Colors.gray.light}`,
    },
  },
};

export default {
  'umd-component-header': {
    backgroundColor: Colors.white,
    display: 'block',
    padding: `${Spacing.md} 0`,
    position: 'relative',

    '& .container-wrapper': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.lg,
    },

    ...LogoColumn,
    ...NavColumn,
  },
};
