import { Typography } from '@universityofmaryland/variables';
import { Transform } from 'utilities';

export default {
  '@font-face': Object.values(Typography.FontFaces),
  ...Transform.objectWithName(Typography.CampaignFonts),
  ...Transform.objectWithName(Typography.SerifFonts),
  ...Transform.objectWithName(Typography.SansFonts),
  ...Transform.objectWithName(Typography.SansTransformationsFonts),
  ...Transform.objectWithName(Typography.ElementFonts),
  ...Transform.objectWithName(Typography.StatisticFonts),
};
