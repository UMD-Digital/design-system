/**
 * Common type definitions for the University of Maryland Web Elements Library
 * This file contains shared interfaces and types used across atomic, composite, and model modules
 */

import type { ElementModel as BuilderElementModel } from '@universityofmaryland/web-builder-library';

// ===== Core Element Types =====

/**
 * Re-export ElementModel from builder package for consistency
 * This is the standard return type for all element creation functions
 */
export type ElementModel<T extends HTMLElement = HTMLElement> = BuilderElementModel<T>;

/**
 * Visual element structure
 */
export interface UMDElement {
  element: HTMLElement;
  className?: string;
  styles: string;
}

/**
 * Visual element structure
 */
export interface ElementVisual extends UMDElement {
  className: string;
}

// ===== HTML Element Type Aliases =====

export type ContentElement = HTMLElement | null;
export type ImageElement = HTMLImageElement | null;
export type VideoElement = HTMLVideoElement | null;
export type LinkElement = HTMLAnchorElement | null;
export type MediaElement = HTMLImageElement | HTMLVideoElement | null;

// ===== Theme and Color Props =====

export interface ThemeProps {
  isThemeDark?: boolean;
  isThemeLight?: boolean;
  isThemeGold?: boolean;
  isThemeMaryland?: boolean;
}

export interface ColorProps {
  isTextColorWhite?: boolean;
  isTextColorBlack?: boolean;
  isAnimationLineRed?: boolean;
}

// ===== Size and Display Props =====

export interface SizeProps {
  isSizeSmall?: boolean;
  isSizeMedium?: boolean;
  isSizeLarge?: boolean;
}

export interface DisplayProps {
  isAligned?: boolean;
  hasBorder?: boolean;
  isTransparent?: boolean;
  isFullWidth?: boolean;
  isSticky?: boolean;
  isFixed?: boolean;
  hasBackground?: boolean;
}

// ===== Type/Variant Props =====

export interface TypeProps {
  isTypePrimary?: boolean;
  isTypeSecondary?: boolean;
  isTypeOutline?: boolean;
}

// ===== Content Props =====

export interface CommonContentProps {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  eyebrow?: ContentElement;
  date?: ContentElement;
}

export interface ExtendedContentProps extends CommonContentProps {
  subHeadline?: ContentElement;
  description?: ContentElement;
  metadata?: ContentElement;
}

// ===== Layout and Alignment Props =====

export interface LayoutProps {
  isTextCenter?: boolean;
  isTextRight?: boolean;
  isTextLeft?: boolean;
  isVerticalCenter?: boolean;
  isHorizontalCenter?: boolean;
}

// ===== Contact Information Props =====

export interface ContactProps {
  phone?: string;
  email?: string;
  address?: string;
  linkedin?: string;
  additionalContact?: ContentElement;
}

// ===== Social Media Props =====

export interface SocialMediaProps {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  pinterest?: string;
  tiktok?: string;
}

// ===== Media Props =====

export interface MediaProps {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  controls?: boolean;
}

export interface AssetProps {
  image?: ImageElement | LinkElement;
  video?: VideoElement;
  isAspectStandard?: boolean;
  isScaled?: boolean;
}

// ===== Media Component Base =====

export interface MediaComponentProps extends AssetProps, MediaProps {
  caption?: ContentElement;
  credit?: ContentElement;
  altText?: string;
  title?: string;
}

// ===== Style Configuration =====

export interface ElementStyles {
  element?: Record<string, any>;
  pseudoBefore?: Record<string, any>;
  pseudoAfter?: Record<string, any>;
  siblingAfter?: Record<string, any>;
  subElement?: Record<string, any>;
}

export interface StyleObject {
  className: string | string[];
  [key: string]: any;
}

// ===== Element Props (Combined) =====

export interface BaseElementProps extends ThemeProps, ColorProps {
  element: HTMLElement;
  elementStyles?: ElementStyles;
}

export interface ConfigurationProps extends BaseElementProps {
  className: string;
  baseStyles?: Record<string, any>;
}

// ===== Person-Like Components =====

export interface PersonLikeProps extends ThemeProps {
  name: ContentElement;
  job?: ContentElement;
  association?: ContentElement;
  pronouns?: ContentElement;
  image?: ImageElement;
  email?: string;
  phone?: string;
}

// ===== Event/Date Types =====

export interface DateTimeProps {
  startDate: Date | string;
  endDate?: Date | string;
  allDay?: boolean;
  timezone?: string;
}

export interface LocationInfo {
  title: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ===== Animation Props =====

export interface AnimationProps {
  includesAnimation?: boolean;
  animationDuration?: number;
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
}

// ===== Loading Props =====

export interface LoadingProps {
  imageLoading?: 'eager' | 'lazy';
  imageFetchPriority?: 'high' | 'low' | 'auto';
}

// ===== Function Types =====

export type ElementCreatorFn<T = any> = (props: T) => ElementModel;
export type ActionFunction = (props: BaseElementProps) => ElementModel;
export type CallbackFunction<T = void> = (arg: T) => void;

// ===== Builder Types =====

export interface StyleModifierProps {
  styles: string;
  className: string;
  elementOptions?: ElementStyles;
}

export interface BuilderConfig {
  styleModifiers: (props: StyleModifierProps) => string;
  elementModifiers?: ((element: HTMLElement) => void)[];
}

export interface BuilderProps extends BaseElementProps, ConfigurationProps {
  builderConfig: BuilderConfig;
}

// ===== Common Constants =====

export const ATTRIBUTE_THEME = 'theme';
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';
export const THEME_GOLD = 'gold';
export const THEME_MARYLAND = 'maryland';

// ===== Type Guards =====

export const isImageElement = (element: any): element is HTMLImageElement => {
  return element instanceof HTMLImageElement;
};

export const isVideoElement = (element: any): element is HTMLVideoElement => {
  return element instanceof HTMLVideoElement;
};

export const isLinkElement = (element: any): element is HTMLAnchorElement => {
  return element instanceof HTMLAnchorElement;
};

export const isButtonElement = (element: any): element is HTMLButtonElement => {
  return element instanceof HTMLButtonElement;
};

export const isDivElement = (element: any): element is HTMLDivElement => {
  return element instanceof HTMLDivElement;
};

// Content checks
export const hasContent = (element: ContentElement): element is HTMLElement => {
  return element !== null && element !== undefined;
};

// Combined checks
export const hasImageContent = (
  props: AssetProps,
): props is Required<Pick<AssetProps, 'image'>> => {
  return props.image !== null && props.image !== undefined;
};

export const hasVideoContent = (
  props: AssetProps,
): props is Required<Pick<AssetProps, 'video'>> => {
  return props.video !== null && props.video !== undefined;
};

// ===== Utility Types =====

// Make specific fields required
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Omit fields and make result partial
export type Without<T, K extends keyof T> = Partial<Omit<T, K>>;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Require at least one property
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// Extract props from element creator function
export type ExtractProps<T> = T extends ElementCreatorFn<infer P> ? P : never;
