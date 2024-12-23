import { Colors, Spacing } from '../../tokens';
import { elements } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-decoration';

// umd-text-decoration-eyebrow
export const ribbon = create.jssObject({
  className: [
    `${classNamePrefix}-eyebrow`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-eyebrow-ribbon',
  ],

  ...elements.eyebrow,
  backgroundColor: Colors.gold,
  padding: `${Spacing.min} ${Spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
});
