import { Typography } from '@universityofmaryland/variables';
import { Transform } from 'utilities';

const fontsToTransform = {
  ...Transform.objectWithName(Typography.CampaignFonts),
  ...Transform.objectWithName(Typography.SerifFonts),
  ...Transform.objectWithName(Typography.SansFonts),
  ...Transform.objectWithName(Typography.SansTransformationsFonts),
  ...Transform.objectWithName(Typography.ElementFonts),
  ...Transform.objectWithName(Typography.StatisticFonts),
};

export default fontsToTransform;
