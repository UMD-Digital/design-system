import {
  type ContentElement,
  type ImageElement,
  type LinkElement,
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
  action: LinkElement;
}

export interface QuoteTextProps
  extends QuoteBaseProps,
    QuoteVariantProps,
    QuoteSizeProps,
    QuoteContentProps {}

export interface QuoteInlineProps extends QuoteTextProps {}

export interface QuoteFeaturedProps extends QuoteInlineProps {}

export interface QuoteStatementProps extends QuoteBaseProps {}
