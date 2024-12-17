import { Colors, Spacing } from '../tokens';
import { elements } from '../typography';

export const ribbon = {
  ...elements.eyebrow,
  backgroundColor: Colors.gold,
  padding: `${Spacing.min} ${Spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
};
