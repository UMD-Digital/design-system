import { Tokens, Typography } from '@universityofmaryland/web-elements-styles';

const { Colors, Spacing } = Tokens;

const FormFieldValidation = {
  invalid: {
    border: `1px solid ${Colors.redDark}`,

    '&[aria-errormessage] + [id]': {
      ...Typography.elements.eyebrow,

      color: Colors.redDark,
      display: 'block',
      margin: 0,
      marginTop: Spacing.xs,
    },
  },

  valid: {
    border: `1px solid ${Colors.green}`,

    '& + [id]': {
      display: 'none',
    },
  },
};

export default {
  FormFieldValidation,
};
