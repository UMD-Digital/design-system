import { spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-alignment-block';

// umd-layout-alignment-block-center
export const center = create.jssObject({
  display: 'flex',
  justifyContent: 'center',

  className: [
    `${classNamePrefix}-center`,
    /** @deprecated Use 'umd-layout-alignment-block-center' instead */
    'umd-layout-element-alignment-center',
  ],
});

// umd-layout-alignment-block-stacked
export const stacked = create.jssObject({
  display: 'flex',
  flexDirection: 'column',

  '& > *': {
    marginTop: spacing.sm,

    '&:first-child': {
      marginTop: '0',
    },
  },

  className: [
    `${classNamePrefix}-stacked`,
    /** @deprecated Use 'umd-layout-alignment-block-stacked' instead */
    'umd-media-with-caption',
  ],
});
