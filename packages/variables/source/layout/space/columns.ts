import { Colors, Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-columns';

// umd-layout-space-columns-left
export const left = create.jssObject({
  [`@media (${Media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Media.queries.tablet.min})`]: {
      marginRight: Spacing['max'],
      width: '242px',
    },
  },

  '& > *:last-child': {
    [`@media (${Media.queries.tablet.min})`]: {
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

  [`@media (${Media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.min})`]: {
      width: `calc(100% - 322px)`,
    },
  },

  '& > *:last-child': {
    paddingTop: Spacing.md,
    borderTop: `1px solid ${Colors.black}`,

    [`@media (${Media.queries.large.max})`]: {
      marginTop: Spacing['3xl'],
    },

    [`@media (${Media.queries.tablet.min})`]: {
      marginLeft: Spacing['7xl'],
      width: '322px',
    },
  },

  className: [
    `${classNamePrefix}-right`,
    /** @deprecated Use 'umd-layout-space-columns-right' instead */
    'umd-layout-interior-sidebar',
  ],
});
