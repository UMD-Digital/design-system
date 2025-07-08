/**
 * Hero-specific type definitions that extend the base types from _types.ts
 * These types provide explicit interfaces for each hero variation
 */

import {
  type ContentElement,
  type ImageElement,
  type VideoElement,
  type ThemeProps,
} from '_types';

/**
 * Hero-specific animation properties
 */
export interface HeroAnimationProps {
  includesAnimation?: boolean;
}

/**
 * Hero-specific sizing properties
 */
export interface HeroSizingProps {
  isHeightSmall?: boolean;
  isHeightFull?: boolean;
}

/**
 * Hero-specific layout properties
 */
export interface HeroLayoutProps {
  isTextCenter?: boolean;
  isTextRight?: boolean;
}

/**
 * Hero-specific asset properties
 */
export interface HeroAssetProps {
  image?: ImageElement;
  video?: VideoElement;
}

/**
 * Standard hero variant props
 * Explicitly defines all properties needed for standard hero
 */
export interface HeroStandardProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  HeroSizingProps,
  HeroLayoutProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
}

/**
 * Minimal hero variant props
 * Explicitly defines all properties needed for minimal hero
 */
export interface HeroMinimalProps extends 
  HeroAssetProps,
  Pick<ThemeProps, 'isThemeDark' | 'isThemeLight' | 'isThemeMaryland'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
}

/**
 * Stacked hero variant props
 * Explicitly defines all properties needed for stacked hero
 */
export interface HeroStackedProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  HeroSizingProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  isWidthLarge?: boolean;
}

/**
 * Overlay hero variant props
 * Explicitly defines all properties needed for overlay hero
 */
export interface HeroOverlayProps extends
  HeroAssetProps,
  HeroAnimationProps,
  HeroLayoutProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  hasBorder?: boolean;
  isTransparent?: boolean;
  isSticky?: boolean;
}

/**
 * Logo hero variant props
 * Explicitly defines all properties needed for logo hero
 */
export interface HeroLogoProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  Pick<ThemeProps, 'isThemeDark' | 'isThemeLight' | 'isThemeMaryland'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  logo?: ContentElement;
}

/**
 * Custom hero grid props
 * Explicitly defines all properties needed for grid hero
 */
export interface HeroGridProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  blocks?: HTMLElement[];
}

/**
 * Custom hero expand props
 * Explicitly defines all properties needed for expand hero
 */
export interface HeroExpandProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  expandedContent?: ContentElement;
}

/**
 * Custom hero video arrow props
 * Explicitly defines all properties needed for video arrow hero
 */
export interface HeroVideoArrowProps extends 
  HeroAssetProps,
  HeroAnimationProps,
  Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  videoControls?: boolean;
}
