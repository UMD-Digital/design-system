import { Typography } from '@universityofmaryland/variables';

export enum CampaignFontSize {
  Maximum = 'maximum',
  ExtraLarge = 'extraLarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  ExtraSmall = 'extraSmall',
}

export enum SansFontSize {
  Maximum = 'maximum',
  Largest = 'largest',
  ExtraLarge = 'extraLarge',
  Larger = 'larger',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Smaller = 'smaller',
  Min = 'min',
}

export const CampaignFontOptions = (size: CampaignFontSize) => {
  const { class: className, ...fontStyles } = Typography.campaign.fonts[size];
  return { className, fontStyles };
};

export const SansFontOptions = (size: SansFontSize) => {
  const { class: className, ...fontStyles } = Typography.sans.fonts[size];
  return { className, fontStyles };
};

export const getSansLargeFont = () => SansFontOptions(SansFontSize.Large);
export const getSansMediumFont = () => SansFontOptions(SansFontSize.Medium);

export const getCampaignLargeFont = () =>
  CampaignFontOptions(CampaignFontSize.Large);
