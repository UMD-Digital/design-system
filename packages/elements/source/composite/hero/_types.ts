import {
  type AnimationProps,
  type StandaloneAssetProps,
  type ContentElement,
  type LayoutProps,
  type ThemeProps,
} from '../../_types';

/**
 * Hero-specific type definitions that extend the base types from _types.ts
 * These types provide explicit interfaces for each hero variation
 */

/**
 * Hero-specific sizing properties
 */
export interface HeroSizingProps {
  isHeightSmall?: boolean;
  isHeightFull?: boolean;
}

/**
 * Standard hero variant props
 * Explicitly defines all properties needed for standard hero
 */
export interface HeroStandardProps
  extends HeroSizingProps,
    StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
    Pick<LayoutProps, 'isTextCenter' | 'isTextRight'>,
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
export interface HeroMinimalProps
  extends StandaloneAssetProps,
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
export interface HeroStackedProps
  extends HeroSizingProps,
    StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
    Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  isWidthLarge?: boolean;
  topPosition?: string | null;
}

/**
 * Overlay hero variant props
 * Explicitly defines all properties needed for overlay hero
 */
export interface HeroOverlayProps
  extends StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
    Pick<LayoutProps, 'isTextCenter' | 'isTextRight'>,
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
export interface HeroLogoProps
  extends StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
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
export interface HeroGridProps
  extends StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
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
export interface HeroExpandProps
  extends StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
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
export interface HeroVideoArrowProps
  extends StandaloneAssetProps,
    Pick<AnimationProps, 'includesAnimation'>,
    Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  videoControls?: boolean;
}
