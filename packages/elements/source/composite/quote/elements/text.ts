import { typography, token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '_types';
import { CreateAction, CreateIconSpan, SMALL, BaseProps } from '..';

export interface QuoteTextContainer extends BaseProps {
  attribution: HTMLElement | null;
  attributionSubText: HTMLElement | null;
  action: HTMLElement | null;
  isSizeLarge?: boolean;
}

export default (props: QuoteTextContainer) => {
  const {
    isThemeDark,
    isThemeMaryland,
    isSizeLarge = false,
    isTypeInline,
    image,
    quote,
    attribution,
    attributionSubText,
    action,
    includesAnimation,
  } = props;

  const createQuoteText = (
    quote: HTMLElement,
    quoteChildren: ElementVisual[],
  ) => {
    let quoteTextElement: HTMLElement = quote;
    const wordsList = splitWords(quote);

    if (includesAnimation) {
      quoteTextElement = document.createElement('div');

      wordsList.map((word) => {
        quoteTextElement.appendChild(word);
      });
    }

    const quoteElement = ElementModel.create({
      element: quoteTextElement,
      className: 'quote-container-quote',
      children: quoteChildren,
      elementStyles: {
        element: {
          position: 'relative',
          fontWeight: '700',
          color: token.color.black,
          ...typography.sans.larger,

          ...(isSizeLarge && { ...typography.sans.extraLarge }),

          ...((isThemeDark || isThemeMaryland) && {
            color: token.color.white,
          }),

          [`&::before`]: {
            content: '""',
            position: 'absolute',
            left: `-${token.spacing.md}`,
            top: '7px',
            height: 'calc(100% - 14px)',
            width: '2px',
            display: 'block',
            backgroundColor: token.color.red,
            ...(isThemeMaryland && { backgroundColor: token.color.gold }),

            ...(image &&
              isTypeInline && {
                display: 'none',
              }),

            [`@container (min-width: ${SMALL}px)`]: {
              left: `-${token.spacing.md}`,
            },

            [`@container (max-width: ${SMALL - 1}px)`]: {
              ...(isTypeInline && {
                display: 'block',
              }),
            },
          },

          ['& *']: {
            color: 'currentColor',
            ...typography.sans.larger,
            ...(isSizeLarge && { ...typography.sans.extraLarge }),
          },
        },
      },
    });

    return quoteElement;
  };

  const getQuoteTextContainerChildren = (props: QuoteTextContainer) => {
    const wrapperChildren: ElementVisual[] = [];

    if (quote) {
      const quoteChildren: ElementVisual[] = [];
      const iconSpan = CreateIconSpan(props);

      if (!image) {
        quoteChildren.push(iconSpan);
      }

      const quoteElement = createQuoteText(quote, quoteChildren);

      wrapperChildren.push(quoteElement);
    }

    if (attribution) {
      const attributionElement = ElementModel.create({
        element: attribution,
        className: 'quote-container-attribution',
        elementStyles: {
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
        },
      });

      wrapperChildren.push(attributionElement);
    }

    if (attributionSubText) {
      const attributionSubTextElement = ElementModel.create({
        element: attributionSubText,
        className: 'quote-container-text-attribution-sub-text',
        elementStyles: {
          element: {
            color: token.color.gray.dark,
            fontStyle: 'italic',
            ...typography.sans.small,

            ...(includesAnimation && {
              opacity: '0',
              transform: 'translateY(20px)',
              transition: 'opacity 1s ease, transform 0.5s ease',
            }),

            ...((isThemeDark || isThemeMaryland) && {
              color: token.color.white,
            }),
          },
        },
      });

      wrapperChildren.push(attributionSubTextElement);
    }

    if (action) {
      const actionElement = CreateAction(action, props);

      wrapperChildren.push(actionElement);
    }

    return wrapperChildren;
  };

  const splitWords = (quote: HTMLElement) => {
    const text = quote.textContent ?? '';
    const words = text.trim().split(/\s+/);

    const wordElements = words.map((word, index) => {
      const wordElement = document.createElement('div');
      wordElement.classList.add('quote-text-split-word');

      Object.assign(wordElement.style, {
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 1s ease, transform 0.5s ease',
      });

      wordElement.textContent = word + (index < words.length - 1 ? ' ' : '');

      return wordElement;
    });

    return wordElements;
  };

  const CreateQuoteTextContainer = (props: QuoteTextContainer) => {
    const wrapperChildren = getQuoteTextContainerChildren(props);

    const wrapper = ElementModel.createDiv({
      className: 'quote-text-container-wrapper',
      children: wrapperChildren,
    });

    return ElementModel.createDiv({
      className: 'quote-text-container',
      children: [wrapper],
      elementStyles: {
        element: {
          width: '100%',
          ...typography.sans.medium,

          [`@container (max-width: ${SMALL - 1}px)`]: {
            paddingTop: token.spacing.lg,
            paddingLeft: token.spacing.md,

            ...(isTypeInline && {
              ...(isSizeLarge && { paddingTop: token.spacing['2xl'] }),
            }),
          },

          [`@container (min-width: ${SMALL}px)`]: {
            paddingLeft: token.spacing['4xl'],

            ...(isTypeInline && {
              ...(image && { paddingLeft: '0' }),
            }),
          },

          [`& *`]: {
            ...typography.sans.medium,

            ...(isThemeDark && {
              color: token.color.white,
            }),

            ...(isThemeMaryland && {
              color: token.color.white,
            }),
          },
        },
      },
    });
  };

  return CreateQuoteTextContainer(props);
};
