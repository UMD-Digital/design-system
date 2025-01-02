import { Colors, Spacing } from '../../tokens';
import { create } from '../../utilities';
import { baseInputChoice, baseInputChoiceWrapper } from './_base';

// Consistent naming
const classNamePrefix = 'umd-field-radio';

export const radio = {
  ...baseInputChoice,
  borderRadius: '50%',
  border: `1px solid ${Colors.gray.light}`,

  '&::after': {
    content: "''",
    backgroundSize: 'contain',
    backgroundColor: Colors.red,
    backgroundPosition: 'center',
    border: `1px solid ${Colors.gray.light}`,
    borderRadius: '50%',
    display: 'block',
    height: Spacing.xs,
    opacity: 0,
    position: 'absolute',
    left: '5px',
    top: '5px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: Spacing.xs,
  },
};

// umd-field-radio-wrapper
export const radioWrapper = create.jssObject({
  ...baseInputChoiceWrapper,

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-forms-choices-wrapper',
  ],

  "& input[type='radio']": {
    ...radio,
  },
});
