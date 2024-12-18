import { Typography, Utilities } from '@universityofmaryland/variables';

export default {
  '@font-face': Object.values(Typography.fontFace),
  ...Utilities.transform.objectWithName(Typography.campaign.fonts),
  ...Utilities.transform.objectWithName(Typography.serif.fonts),
  ...Utilities.transform.objectWithName(Typography.sans.fonts),
  ...Utilities.transform.objectWithName(Typography.sans.transformations),
  ...Utilities.transform.objectWithName(Typography.elements.fonts),
  ...Utilities.transform.objectWithName(Typography.stats.fonts),
};
