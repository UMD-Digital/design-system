import {
  Accessibility,
  Typography,
  Utilities,
} from '@universityofmaryland/variables';

const accessibility = {
  ...Utilities.transform.objectWithName(Accessibility),
};

const typography = {
  ...Typography.fontFace.browserString,
  ...Utilities.transform.objectWithName(Typography.campaign.fonts),
  ...Utilities.transform.objectWithName(Typography.serif.fonts),
  ...Utilities.transform.objectWithName(Typography.sans.fonts),
  ...Utilities.transform.objectWithName(Typography.sans.transformations),
  ...Utilities.transform.objectWithName(Typography.elements.fonts),
  ...Utilities.transform.objectWithName(Typography.stats.fonts),
};

export default {
  ...accessibility,
  ...typography,
};
