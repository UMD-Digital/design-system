/**
 * Card element content types
 * These define the possible HTML elements that can be placed in different card regions
 */
export type CardContentElement = HTMLElement | null;
export type CardImageElement = HTMLImageElement | null;
export type CardLinkElement = HTMLAnchorElement | null;
export type CardImageOrLinkElement = CardImageElement | CardLinkElement;

/**
 * Style variants available for cards
 */
export enum CardVariant {
  Block = 'block',
  List = 'list',
  Overlay = 'overlay',
}

/**
 * Base properties shared by all card types
 */
export interface CardBaseProps {
  /** Main title/heading of the card */
  headline: CardContentElement;

  /** Optional smaller text above the headline */
  eyebrow?: CardContentElement;

  /** Main body text content */
  text?: CardContentElement;

  /** Date information */
  date?: CardContentElement;

  /** Action buttons or links */
  actions?: CardContentElement;

  /** Action buttons or links */
  isThemeDark?: boolean;
}

/**
 * Common properties for cards that can display images
 */
export interface CardMediaProps {
  /** Card image content */
  image?: CardImageOrLinkElement;

  /** Display with image aligned */
  isAligned?: boolean;
}

/**
 * Properties specific to event-style cards
 */
export interface CardEventProps {
  /** Metadata display for events (time, location, etc) */
  eventMeta?: {
    element: HTMLElement;
    styles: string;
  };

  /** Date display for events in sign format */
  dateSign?: {
    element: HTMLElement;
    styles: string;
  };
}

/**
 * Properties specific to block-style cards
 */
export interface CardBlockProps
  extends CardBaseProps,
    CardMediaProps,
    CardEventProps {
  /** Optional ID for news items */
  newsId?: string;

  /** Display with border */
  hasBorder?: boolean;

  /** Display eyebrow as ribbon */
  hasEyebrowRibbon?: boolean;

  /** Display transparent background */
  isTransparent?: boolean;
}

/**
 * Properties specific to list-style cards
 */
export interface CardListProps
  extends CardBaseProps,
    CardMediaProps,
    CardEventProps {}

/**
 * Properties specific to overlay cards with color background
 */
export interface CardOverlayProps extends CardBaseProps {
  /** Icon to display with CTA */
  ctaIcon?: CardContentElement;

  /** Background image */
  backgroundImage?: CardImageOrLinkElement;

  /** Display with quote icon */
  isQuote?: boolean;
}

/**
 * Union type of all possible card configurations
 */
export type CardProps = CardBlockProps | CardListProps | CardOverlayProps;
