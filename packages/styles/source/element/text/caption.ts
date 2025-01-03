import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-caption';

// umd-text-caption-smaller
export const smaller = create.jssObject({
  ...sans.smaller,
  color: color.gray.mediumAA,
  paddingTop: spacing.xs,

  className: [
    `${classNamePrefix}-smaller`,
    /** @deprecated Use 'umd-text-caption-smaller' instead */
    `umd-caption`,
  ],
});

// umd-text-caption-smaller-italic
export const smallerItalic = create.jssObject({
  ...smaller,
  color: color.gray.darker,
  fontStyle: 'italic',

  className: [
    `${classNamePrefix}-smaller-italic`,
    /** @deprecated Use 'umd-text-caption-smaller-italic' instead */
    `umd-forms-instructions`,
  ],
});
