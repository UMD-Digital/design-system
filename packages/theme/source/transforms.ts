import {
  Accessibility,
  Animations,
  Typography,
  Utilities,
} from '@universityofmaryland/variables';

const accessibility = {
  ...Utilities.transform.objectWithName(Accessibility),
};

const animations = {
  ...Utilities.transform.objectWithName(Animations.line),
  ...Utilities.transform.objectWithName(Animations.transition),
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
  ...animations,
  ...typography,
};
