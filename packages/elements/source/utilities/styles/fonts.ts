import { Typography } from '@universityofmaryland/variables';

const { CampaignFonts, SansFonts } = Typography;

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

export function getSansFontSizes(): string[] {
  return Object.keys(SansFonts);
}

export function getSansFont(size: SansFontSize) {
  return SansFonts[size];
}
