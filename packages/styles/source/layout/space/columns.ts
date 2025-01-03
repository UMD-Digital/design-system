import { colors, media, spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-columns';

// umd-layout-space-columns-left
export const left = create.jssObject({
  [`@media (${media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${media.queries.tablet.min})`]: {
      marginRight: spacing['max'],
      width: '242px',
    },
  },

  '& > *:last-child': {
    [`@media (${media.queries.tablet.min})`]: {
      width: 'calc(100% - 242px)',
    },
  },

  className: [
    `${classNamePrefix}-left`,
    /** @deprecated Use 'umd-layout-space-columns-left' instead */
    'umd-layout-interior-navigation',
  ],
});

// umd-layout-space-columns-right
export const right = create.jssObject({
  ...left,

  [`@media (${media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.min})`]: {
      width: `calc(100% - 322px)`,
    },
  },

  '& > *:last-child': {
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.black}`,

    [`@media (${media.queries.large.max})`]: {
      marginTop: spacing['3xl'],
    },

    [`@media (${media.queries.tablet.min})`]: {
      marginLeft: spacing['7xl'],
      width: '322px',
    },
  },

  className: [
    `${classNamePrefix}-right`,
    /** @deprecated Use 'umd-layout-space-columns-right' instead */
    'umd-layout-interior-sidebar',
  ],
});
