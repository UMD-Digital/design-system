import { spacing, queries, colors } from '@universityofmaryland/variables';

const umdHeader = {
  '.umd-header-container': {
    backgroundColor: colors.white,
    display: 'block',
    padding: spacing.md,
    position: 'relative',

    [`@media (${queries.tablet.min})`]: {
      padding: `${spacing.md} ${spacing['2xl']}`,
    },
  },

  '.umd-header-container-wrapper': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },

  '.umd-header-logo-column': {
    alignItems: 'center',
    display: 'flex',
    flex: 'none',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    position: 'relative',
  },

  '.umd-header-logo': {
    display: 'block',
    flex: 'none',
    maxWidth: `calc(100% - (${spacing['6xl']} + 4px))`,
    borderLeft: `1px solid ${colors.gray.light}`,
    paddingLeft: spacing.sm,
    marginLeft: spacing.sm,
  },

  '.umd-header-logo img': {
    maxHeight: '40px',

    [`@media (${queries.tablet.min})`]: {
      maxHeight: '60px',
    },
  },

  '.umd-header-nav-items': {
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end',
    transition: 'gap 0.5s',

    [`@media (${queries.highDef.min})`]: {
      padding: spacing.lg,
    },
  },

  '.umd-header-nav-column': {},
};

export { umdHeader };
