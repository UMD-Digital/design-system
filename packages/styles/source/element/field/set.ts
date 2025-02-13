import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import { valid, invalid } from './_state';

// Consistent naming
const classNamePrefix = 'umd-field-set';

// umd-field-set-wrapper
export const wrapper = create.jssObject({
  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-forms-layout-fieldset-list',
  ],

  '& > *': {
    alignItems: 'flex-start',
    marginTop: spacing.md,

    '&:first-of-type': {
      marginTop: 0,
    },
  },

  '& > legend': {
    ...sans.large,

    marginBottom: spacing.sm,
    position: 'relative',

    [`@media (${media.queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },

  '&[required] > legend': {
    content: "' *'",
    color: color.redDark,
  },

  "&[aria-invalid='true']": {
    ...invalid,
    border: 0,
  },

  "&[aria-invalid='false']": {
    ...valid,
    border: 0,
  },
});
