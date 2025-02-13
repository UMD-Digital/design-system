import { color, spacing } from '../../token';
import { create } from '../../utilities';
import { valid, invalid } from './_state';

// Consistent naming
const classNamePrefix = 'umd-field-file';

const file = {
  appearance: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 9,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },

  [`&::file-selector-button, &::-webkit-file-upload-button`]: {
    cursor: 'pointer',
    marginRight: spacing.sm,
  },
};

export const fileWrapper = create.jssObject({
  backgroundColor: color.white,
  overflow: 'hidden',
  position: 'relative',

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-forms-file-wrapper',
  ],

  "& input[type='file']": {
    ...file,
  },
});
