import { Colors, Spacing } from '../../tokens';
import { elements } from '../../typography';

export const invalid = {
  border: `1px solid ${Colors.redDark}`,

  '&[aria-errormessage] + [id]': {
    ...elements.eyebrow,

    color: Colors.redDark,
    display: 'block',
    margin: 0,
    marginTop: Spacing.xs,
  },
};

export const valid = {
  border: `1px solid ${Colors.green}`,

  '& + [id]': {
    display: 'none',
  },
};
