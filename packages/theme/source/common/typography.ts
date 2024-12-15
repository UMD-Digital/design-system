import { Typography } from '@universityofmaryland/variables';

const {
  ElementFonts,
  CampaignFonts,
  SansFonts,
  SerifFonts,
  StatisticFonts,
  SansTransformationsFonts,
} = Typography;

interface FontEntry {
  class: string;
  [key: string]: any;
}

interface FontInputFormat {
  [key: string]: FontEntry;
}

interface FontOutputFormat {
  [className: string]: {
    [key: string]: any;
  };
}

interface FontFormatConverter {
  (originalObject: FontInputFormat): FontOutputFormat;
}

const convertFontFormat: FontFormatConverter = (originalObject) => {
  const newFormat: FontOutputFormat = {};

  for (const [key, value] of Object.entries(originalObject)) {
    const typographyKey = `.${value.class}`;

    newFormat[typographyKey] = {
      ...value,
    };
  }

  return newFormat;
};

export const campaign = convertFontFormat(CampaignFonts);
export const elements = convertFontFormat(ElementFonts);
export const sans = convertFontFormat(SansFonts);
export const sansTransforms = convertFontFormat(SansTransformationsFonts);
export const serif = convertFontFormat(SerifFonts);
export const statistics = convertFontFormat(StatisticFonts);

export default {
  ...campaign,
  ...serif,
  ...sans,
  ...sansTransforms,
  ...elements,
  ...statistics,
};
