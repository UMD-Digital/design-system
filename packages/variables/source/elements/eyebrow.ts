import { Colors } from '../tokens/colors';
import { Spacing } from '../tokens/spacing';
import { Eyebrow } from '../typography/elements';

const Ribbon = {
  ...Eyebrow,
  backgroundColor: Colors.gold,
  padding: `${Spacing.min} ${Spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
};

export default { Ribbon };
