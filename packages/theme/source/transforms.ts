import {
  Accessibility,
  Animations,
  ElementStyles,
  Typography,
  Utilities,
} from '@universityofmaryland/variables';

export default {
  ...Typography.fontFace.browserString,
  ...Utilities.transform.processNestedObjects(Accessibility),
  ...Utilities.transform.processNestedObjects(Animations),
  ...Utilities.transform.processNestedObjects(ElementStyles),
  ...Utilities.transform.processNestedObjects(Typography),
};
