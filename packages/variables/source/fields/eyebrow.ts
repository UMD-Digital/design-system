import Typography from '../typography';
import { Colors } from '../tokens/colors';
import { Spacing } from '../tokens/spacing';
import { FontWeight } from '../tokens/fonts';

const { InterativeSmall } = Typography;

const Ribbon = {
  ...InterativeSmall,
  backgroundColor: Colors.gold,
  padding: `${Spacing.min} ${Spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
  FontWeight: FontWeight.bold,
  color: Colors.black,
};

export { Ribbon };
