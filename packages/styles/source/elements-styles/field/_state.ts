import { colors, spacing } from '../../tokens';
import { elements } from '../../typography';

export const invalid = {
  border: `1px solid ${colors.redDark}`,

  '&[aria-errormessage] + [id]': {
    ...elements.eyebrow,

    color: colors.redDark,
    display: 'block',
    margin: 0,
    marginTop: spacing.xs,
  },
};

export const valid = {
  border: `1px solid ${colors.green}`,

  '& + [id]': {
    display: 'none',
  },
};
