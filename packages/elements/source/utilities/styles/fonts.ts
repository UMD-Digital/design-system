import { typography } from '@universityofmaryland/web-styles-library';

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
  const { className, ...fontStyles } = typography.campaign.fonts[size];
  return { className, fontStyles };
};

export const SansFontOptions = (size: SansFontSize) => {
  const { className, ...fontStyles } = typography.sans.fonts[size];
  return { className, fontStyles };
};

export const getSansMaximumFont = () => SansFontOptions(SansFontSize.Maximum);
export const getSansLargestFont = () => SansFontOptions(SansFontSize.Largest);
export const getSansExtraLargeFont = () =>
  SansFontOptions(SansFontSize.ExtraLarge);
export const getSansLargerFont = () => SansFontOptions(SansFontSize.Larger);
export const getSansLargeFont = () => SansFontOptions(SansFontSize.Large);
export const getSansMediumFont = () => SansFontOptions(SansFontSize.Medium);
export const getSansSmallFont = () => SansFontOptions(SansFontSize.Small);
export const getSansSmallerFont = () => SansFontOptions(SansFontSize.Smaller);
export const getSansMinFont = () => SansFontOptions(SansFontSize.Min);

export const getCampaignLargeFont = () =>
  CampaignFontOptions(CampaignFontSize.Large);
