import {
  type ContentElement,
  type ImageElement,
  type LinkElement,
  type ThemeProps,
  type UMDElement,
  type LoadingProps,
} from '../../_types';

/**
 * Card-specific type for image or link elements
 */
export type CardImageOrLinkElement = ImageElement | LinkElement;

/**
 * Style variants available for cards
 */
export enum CardVariant {
  Block = 'block',
  List = 'list',
  Overlay = 'overlay',
}

/**
 * Common properties for cards that can display images
 */
export interface CardMediaProps {
  image?: CardImageOrLinkElement;
  isAligned?: boolean;
}

/**
 * Properties specific to event-style cards
 */
export interface CardEventProps {
  eventMeta?: UMDElement;
  dateSign?: UMDElement;
}

/**
 * Properties specific to block-style cards
 */
export interface CardBlockProps
  extends CardMediaProps,
    CardEventProps,
    LoadingProps,
    Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  eyebrow?: ContentElement;
  date?: ContentElement;
  newsId?: string;
  hasBorder?: boolean;
  hasEyebrowRibbon?: boolean;
  isTransparent?: boolean;
}

/**
 * Properties specific to list-style cards
 */
export interface CardListProps
  extends CardMediaProps,
    CardEventProps,
    LoadingProps,
    Pick<ThemeProps, 'isThemeDark'> {
  headline: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  eyebrow?: ContentElement;
  date?: ContentElement;
}

/**
 * Properties specific to event-time cards (two-column: content + image)
 */
export interface CardEventTimeProps
  extends CardMediaProps,
    LoadingProps,
    Pick<ThemeProps, 'isThemeDark'> {
  headline?: ContentElement;
  startTime: ContentElement;
  endTime?: ContentElement;
  location?: ContentElement;
  information?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
}

/**
 * Properties specific to overlay cards with color background
 */
export interface CardOverlayProps
  extends CardEventProps,
    LoadingProps,
    Partial<Pick<ThemeProps, 'isThemeDark' | 'isThemeLight'>> {
  headline: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  eyebrow?: ContentElement;
  date?: ContentElement;
  ctaIcon?: ContentElement;
  backgroundImage?: CardImageOrLinkElement;
  isQuote?: boolean;
}
