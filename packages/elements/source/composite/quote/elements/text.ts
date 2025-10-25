import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { default as elementAction } from './action';
import { default as elementQuote } from './quote';
import { SMALL } from '../_constants';
import { type ElementModel } from '../../../_types';
import { type QuoteTextProps } from '../_types';

interface ChildrenProps
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

const createChildren = (props: ChildrenProps): ElementModel<HTMLElement>[] => {
  const {
    action,
    attribution,
    attributionSubText,
    hasImage,
    includesAnimation,
    isThemeDark,
    quote,
    shouldHaveWhiteText,
  } = props;
  const wrapperChildren: ElementModel<HTMLElement>[] = [];

  if (quote) {
    wrapperChildren.push(
      elementQuote({ ...props, shouldHaveWhiteText, quote, hasImage }),
    );
  }

  if (attribution) {
    const attributionElement = new ElementBuilder(attribution)
      .withClassName('quote-container-attribution')
      .withStyles({
        element: {
          marginTop: token.spacing.sm,

          ...(includesAnimation && {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 1s ease, transform 0.5s ease',
          }),

          ...(isThemeDark && {
            color: token.color.white,
          }),

          [`& *`]: {
            color: 'currentColor',
            ...typography.sans.medium,
          },
        },
      })
      .build();

    wrapperChildren.push(attributionElement);
  }

  if (attributionSubText) {
    const attributionSubTextElement = new ElementBuilder(attributionSubText)
      .withClassName('quote-container-text-attribution-sub-text')
      .withStyles({
        element: {
          color: token.color.gray.dark,
          fontStyle: 'italic',
          ...typography.sans.small,

          ...(includesAnimation && {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 1s ease, transform 0.5s ease',
          }),

          ...(shouldHaveWhiteText && {
            color: token.color.white,
          }),
        },
      })
      .build();

    wrapperChildren.push(attributionSubTextElement);
  }

  if (action) {
    const actionElement = elementAction({
      ...props,
      action,
    });

    wrapperChildren.push(actionElement);
  }

  return wrapperChildren;
};

export default (
  props: Pick<
    QuoteTextProps,
    | 'isThemeDark'
    | 'isThemeMaryland'
    | 'isSizeLarge'
    | 'isTypeFeatured'
    | 'image'
    | 'quote'
    | 'attribution'
    | 'attributionSubText'
    | 'action'
    | 'includesAnimation'
  >,
) => {
  const {
    image,
    isSizeLarge = false,
    isThemeDark,
    isThemeMaryland,
    isTypeFeatured = false,
  } = props;
  const shouldHaveWhiteText = isThemeDark || isThemeMaryland;
  const isSizeLargeAndNotFeatured = isSizeLarge && !isTypeFeatured;
  const hasImage = image != null;
  const isHasImageAndNotFeatured = hasImage && !isTypeFeatured;

  const children = createChildren({
    ...props,
    shouldHaveWhiteText,
    hasImage,
  });

  const wrapper = new ElementBuilder()
    .withClassName('quote-text-container-wrapper')
    .withChildren(...children)
    .build();

  return new ElementBuilder()
    .withClassName('quote-text-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        width: '100%',
        ...typography.sans.medium,

        [`@container (max-width: ${SMALL - 1}px)`]: {
          paddingLeft: token.spacing.md,

          ...(!hasImage && {
            paddingTop: token.spacing.lg,
          }),

          ...(isSizeLargeAndNotFeatured && {
            paddingTop: token.spacing['2xl'],
          }),
        },

        [`@container (min-width: ${SMALL}px)`]: {
          paddingLeft: token.spacing['4xl'],

          ...(isHasImageAndNotFeatured && { paddingLeft: '0' }),
        },

        [`& *`]: {
          ...typography.sans.medium,

          ...(shouldHaveWhiteText && {
            color: token.color.white,
          }),
        },
      },
    })
    .build();
};
