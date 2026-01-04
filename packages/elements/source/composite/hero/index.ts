export * as custom from './custom';
export { createCompositeHeroLogo as logo } from './logo';
export { createCompositeHeroMinimal as minimal } from './minimal';
export { createCompositeHeroOverlay as overlay } from './overlay';
export { createCompositeHeroStacked as stacked } from './stacked';
export { createCompositeHeroStandard as standard } from './standard';

// Export types for external use
export type {
  HeroAnimationProps,
  HeroSizingProps,
  HeroLayoutProps,
  HeroAssetProps,
  HeroStandardProps,
  HeroMinimalProps,
  HeroStackedProps,
  HeroOverlayProps,
  HeroLogoProps,
  HeroGridProps,
  HeroExpandProps,
  HeroVideoArrowProps,
} from './_types';
