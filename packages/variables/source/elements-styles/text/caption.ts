import { Colors, Font, Spacing } from '../../tokens';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-caption';

// umd-text-caption-smaller
export const smaller = create.jssObject({
  ...sans.smaller,
  captionSide: 'bottom',
  color: Colors.gray.mediumAA,
  paddingTop: Spacing.xs,

  '& > *': {
    marginTop: Spacing.sm,

    '&:first-child': {
      marginTop: '0',
    },
  },

  className: [
    `${classNamePrefix}-smaller`,
    /** @deprecated Use 'umd-text-caption-smaller' instead */
    `umd-caption`,
  ],
});
