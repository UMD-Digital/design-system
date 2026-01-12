import {
  type ContentElement,
  type ImageElement,
  type LinkElement,
  type ElementModel,
  type ThemeProps,
  type DisplayProps,
  type AnimationProps,
  type SizeProps as BaseSizeProps,
} from '../../_types';

export interface QuoteBaseProps
  extends Pick<ThemeProps, 'isThemeDark' | 'isThemeMaryland'>,
    Pick<DisplayProps, 'isTransparent'>,
    Pick<AnimationProps, 'includesAnimation'> {
  quote: ContentElement;
  image?: ImageElement;
}

export interface QuoteSizeProps extends Pick<BaseSizeProps, 'isSizeLarge'> {}

export interface QuoteVariantProps {
  isTypeFeatured?: boolean;
}

export interface QuoteContentProps {
  attribution: ContentElement;
  attributionSubText: ContentElement;
  action?: LinkElement;
}

export interface QuoteTextProps
  extends QuoteBaseProps,
    QuoteVariantProps,
    QuoteSizeProps,
    QuoteContentProps {}

export interface QuoteInlineProps extends QuoteTextProps {}

export interface QuoteFeaturedProps extends QuoteInlineProps {}

export interface QuoteStatementProps
  extends QuoteTextProps,
    Pick<ThemeProps, 'isThemeGold'> {
  headline?: ContentElement;
}

export interface QuoteAnimationProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'quote' | 'includesAnimation' | 'image'> {
  quoteElement: ElementModel<HTMLElement>;
}

export interface QuoteIconProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  hasImage?: boolean;
}

export interface QuoteProps
  extends Pick<
    QuoteTextProps,
    | 'quote'
    | 'isThemeMaryland'
    | 'isSizeLarge'
    | 'isTypeFeatured'
    | 'includesAnimation'
  > {
  hasImage?: boolean;
  shouldHaveWhiteText?: boolean;
  quote: HTMLElement;
}

export interface QuoteActionProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'includesAnimation' | 'image'> {
  action: HTMLAnchorElement;
}

export interface QuoteImageProps
  extends QuoteVariantProps,
    QuoteSizeProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  image: HTMLImageElement;
}

export interface QuoteTextChildrenProps
  extends Pick<
    QuoteTextProps,
    | 'quote'
    | 'image'
    | 'attribution'
    | 'attributionSubText'
    | 'action'
    | 'isThemeDark'
    | 'isSizeLarge'
    | 'isTypeFeatured'
    | 'includesAnimation'
  > {
  shouldHaveWhiteText?: boolean;
  hasImage: boolean;
}

export interface QuoteStatementImageProps
  extends Pick<QuoteStatementProps, 'isThemeGold'> {
  image: HTMLImageElement;
}

export interface QuoteStatementQuoteProps {
  quote: HTMLElement;
}
