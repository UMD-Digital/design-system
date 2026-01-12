import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { createCompositeQuoteAction as elementAction } from './action';
import { createCompositeQuote as elementQuote } from './quote';
import { SMALL } from '../_constants';
import {
  type QuoteStatementProps,
  type QuoteTextChildrenProps,
  type QuoteTextProps,
} from '../_types';
import { type ElementModel } from '../../../_types';

const createChildren = (
  props: QuoteTextChildrenProps,
): ElementModel<HTMLElement>[] => {
  const {
    action,
    attribution,
    attributionSubText,
    hasImage,
    includesAnimation,
    isThemeDark,
    isSizeLarge,
    quote,
    shouldHaveWhiteText,
  } = props;
  const wrapperChildren: ElementModel<HTMLElement>[] = [];

  if (quote) {
    wrapperChildren.push(
      elementQuote({
        ...props,
        shouldHaveWhiteText,
        quote,
        hasImage,
        isSizeLarge,
      }),
    );
  }

  if (attribution) {
    const attributionElement = new ElementBuilder(attribution)
      .styled(
        typography.sans.compose('medium', {
          theme: theme.fontColor(shouldHaveWhiteText),
        }),
      )
      .withClassName('quote-container-attribution')
      .withStyles({
        element: {
          marginTop: token.spacing.sm,

          ...(includesAnimation && {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 1s ease, transform 0.5s ease',
          }),

          ...(!shouldHaveWhiteText && {
            color: token.color.gray.dark,
          }),

          [`& *`]: {
            color: 'currentColor',
          },
        },
      })
      .build();

    wrapperChildren.push(attributionElement);
  }

  if (attributionSubText) {
    const attributionSubTextElement = new ElementBuilder(attributionSubText)
      .styled(typography.sans.small)
      .withClassName('quote-container-text-attribution-sub-text')
      .withStyles({
        element: {
          color: token.color.gray.dark,
          fontStyle: 'italic',

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

const CreateStatementQuoteHeadline = ({
  headline,
}: Pick<QuoteStatementProps, 'headline'>): ElementModel<HTMLElement> | null => {
  if (!headline) return null;
  return new ElementBuilder(headline)
    .withClassName('statement-headline')
    .withStyles({
      element: {
        color: token.color.black,
        fontSize: token.font.size.base,
        textTransform: 'uppercase',
        marginBottom: token.spacing.sm,
        letterSpacing: '2px',
        fontWeight: token.font.weight.light,
      },
    })
    .build();
};

const CreateStatementQuoteAttribution = ({
  attribution,
  attributionSubText,
}: Pick<
  QuoteStatementProps,
  'attribution' | 'attributionSubText'
>): ElementModel<HTMLElement> | null => {
  if (!attribution && !attributionSubText) return null;

  const container = new ElementBuilder()
    .withClassName('statement-attribution-container')
    .withStyles({
      element: {
        margin: token.spacing.lg,
      },
    });

  if (attribution) {
    const attributionElement = new ElementBuilder(attribution)
      .withClassName('statement-attribution')
      .withStyles({
        element: {
          fontWeight: token.font.weight.bold,
          color: token.color.black,
          fontSize: token.font.size.xl,
          marginBottom: token.spacing.xs,
        },
      })
      .build();

    container.withChild(attributionElement);
  }

  if (attributionSubText) {
    const subTextElement = new ElementBuilder(attributionSubText)
      .withClassName('statement-attribution-subtext')
      .withStyles({
        element: {
          color: token.color.gray.dark,
          fontSize: token.font.size.sm,
        },
      })
      .build();
    container.withChild(subTextElement);
  }

  return container.build();
};

const CreateQuoteTextElement = (
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
      },
    })
    .build();
};

export const createCompositeQuoteText = CreateQuoteTextElement;
export const createStatementQuoteHeadline = CreateStatementQuoteHeadline;
export const createStatementQuoteAttribution = CreateStatementQuoteAttribution;
