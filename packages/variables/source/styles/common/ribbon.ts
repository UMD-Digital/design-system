import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontWeight } from '../../tokens/fonts';

const umdEyebrow = {
  '.umd-eyebrow-ribbon': {
    backgroundColor: colors.gold,
    padding: `${spacing.min} ${spacing.md}`,
    display: `inline-block`,
    clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
    fontWeight: fontWeight.bold,
  },
};

export { umdEyebrow };
