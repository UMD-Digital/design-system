import Typography from '../typography';
import { Colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { fontWeight } from '../tokens/fonts';

const Eyebrow = {
  '.umd-eyebrow-ribbon': {
    ...Typography['.umd-interactive-sans-small'],
    backgroundColor: Colors.gold,
    padding: `${spacing.min} ${spacing.md}`,
    display: `inline-block`,
    clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
    fontWeight: fontWeight.bold,
    color: Colors.black,
  },
};

export { Eyebrow };
