import { Typography } from '@universityofmaryland/variables';
import { Tokens } from '@universityofmaryland/variables';

const fontWeight = Tokens.FontWeight;

export const campaign = {
  '.umd-campaign-maximum': {
    ...Typography.CampaignMaxium,
  },

  '.umd-campaign-extralarge': {
    ...Typography.CampaignExtralarge,
  },

  '.umd-campaign-large': {
    ...Typography.CampaignLarge,
  },

  '.umd-campaign-medium': {
    ...Typography.CampaignMedium,
  },

  '.umd-campaign-small': {
    ...Typography.CampaignSmall,
  },

  '.umd-campaign-extrasmall': {
    ...Typography.CampaignExtraSmall,
  },
};

export const serif = {
  '.umd-serif-maximum': {
    ...Typography.SerifMaxium,
  },

  '.umd-serif-extralarge': {
    ...Typography.SerifExtralarge,
  },

  '.umd-serif-larger': {
    ...Typography.SerifLarger,
  },

  '.umd-serif-large': {
    ...Typography.SerifLarge,
  },

  '.umd-serif-medium': {
    ...Typography.SerifMedium,
  },
};

export const sans = {
  '.umd-sans-maximum': {
    ...Typography.SansMaxium,
  },

  '.umd-sans-largest': {
    ...Typography.SansLargest,
  },

  '.umd-sans-extralarge': {
    ...Typography.SansExtraLarge,
  },

  '.umd-sans-larger': {
    ...Typography.SansLarger,
  },

  '.umd-sans-large': {
    ...Typography.SansLarge,
  },

  '.umd-sans-medium': {
    ...Typography.SansMedium,
  },

  '.umd-sans-small': {
    ...Typography.SansSmall,
  },

  '.umd-sans-smaller': {
    ...Typography.SansSmaller,
  },

  '.umd-sans-min': {
    ...Typography.SansMin,
  },
};

export const transforms = {
  '.umd-sans-largest-uppercase': {
    ...Typography.SansLargest,
    textTransform: 'uppercase',
  },

  '.umd-sans-extralarge-uppercase': {
    ...Typography.SansExtraLarge,
    textTransform: 'uppercase',
  },

  '.umd-sans-larger-regular': {
    ...Typography.SansLarger,

    fontWeight: fontWeight['normal'],
  },
};

export const elements = {
  '.umd-eyebrow': {
    ...Typography.Eyebrow,
  },

  '.umd-label-sans-medium': {
    ...Typography.LabelMedium,
  },

  '.umd-label-sans-small': {
    ...Typography.LabelSmall,
  },

  '.umd-interactive-sans-medium': {
    ...Typography.InterativeMedium,
  },

  '.umd-interactive-sans-small': {
    ...Typography.InterativeSmall,
  },
};

export const statistics = {
  '.umd-statistic-sans-large': {
    ...Typography.StatisticsLarge,
  },

  '.umd-statistic-sans-medium': {
    ...Typography.StatisticsMedium,
  },

  '.umd-statistic-sans-small': {
    ...Typography.StatisticsSmall,
  },
};

export default {
  ...campaign,
  ...serif,
  ...sans,
  ...transforms,
  ...elements,
  ...statistics,
};
