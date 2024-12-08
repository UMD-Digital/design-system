import { Typography } from '@universityofmaryland/variables';

const { CampaignFonts, SansFonts } = Typography;

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

export const CampaignFontOptions = (size: CampaignFontSize) => ({
  className: CampaignFonts[size].class,
  fontStyles: CampaignFonts[size],
});

export const SansFontOptions = (size: SansFontSize) => ({
  className: SansFonts[size].class,
  fontStyles: SansFonts[size],
});
