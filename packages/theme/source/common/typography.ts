import { Typography } from '@universityofmaryland/variables';
import { Transform } from 'utilities';

export default {
  '@font-face': Object.values(Typography.fontFace),
  ...Transform.objectWithName(Typography.campaign.fonts),
  ...Transform.objectWithName(Typography.serif.fonts),
  ...Transform.objectWithName(Typography.sans.fonts),
  ...Transform.objectWithName(Typography.sans.transformations),
  ...Transform.objectWithName(Typography.elements.fonts),
  ...Transform.objectWithName(Typography.stats.fonts),
};
