import { Tokens } from '@universityofmaryland/variables';

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
    maxWidth: `calc(100% - (${Spacing['6xl']} + 4px))`,

    '& img': {
      width: '100%',
      maxWidth: '160px',
      maxHeight: '60px',

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
    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    '& .nav-items': {
      display: 'flex',
      gap: Spacing.md,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    '& svg': {
      width: '24px',
      fill: `${Colors.black}`,
    },

    '& svg path': {
      fill: `${Colors.black}`,
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
