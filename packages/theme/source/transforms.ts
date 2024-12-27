import {
  Accessibility,
  Animations,
  ElementStyles,
  Layout,
  Typography,
  Utilities,
} from '@universityofmaryland/variables';

export default {
  ...Typography.fontFace.browserString,
  ...Utilities.transform.processNestedObjects(Accessibility),
  ...Utilities.transform.processNestedObjects(Animations),
  ...Utilities.transform.processNestedObjects(ElementStyles),
  ...Utilities.transform.processNestedObjects(Layout),
  ...Utilities.transform.processNestedObjects(Typography),
};
