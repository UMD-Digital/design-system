import { color, spacing } from '../../token';
import { elements } from '../../typography';

export const invalid = {
  border: `1px solid ${color.redDark}`,

  '&[aria-errormessage] + [id]': {
    ...elements.eyebrow,

    color: color.redDark,
    display: 'block',
    margin: 0,
    marginTop: spacing.xs,
  },
};

export const valid = {
  border: `1px solid ${color.green}`,

  '& + [id]': {
    display: 'none',
  },
};
