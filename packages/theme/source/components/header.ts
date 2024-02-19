import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, Queries } = Tokens;

export default {
  '.umd-header-container': {
    backgroundColor: Colors.white,
    display: 'block',
    padding: Spacing.md,
    position: 'relative',

    [`@media (${Queries.tablet.min})`]: {
      padding: `${Spacing.md} ${Spacing['2xl']}`,
    },
  },

  '.umd-header-container-wrapper': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  '.umd-header-logo-column': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
  },

  '.umd-header-logo': {
    display: 'block',
    maxWidth: `calc(100% - (${Spacing['6xl']} + 4px))`,
    borderLeft: `1px solid ${Colors.gray.light}`,
    paddingLeft: Spacing.sm,
    marginLeft: Spacing.sm,
  },

  '.umd-header-logo img': {
    maxHeight: '40px',

    [`@media (${Queries.tablet.min})`]: {
      maxHeight: '60px',
    },
  },

  '.umd-header-nav-items': {
    display: 'flex',
    gap: Spacing.md,
    justifyContent: 'flex-end',
    transition: 'gap 0.5s',

    [`@media (${Queries.highDef.min})`]: {
      padding: Spacing.lg,
    },
  },

  '.umd-header-nav-column': {},
};
