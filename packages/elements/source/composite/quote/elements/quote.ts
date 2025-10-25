import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { default as elementIcon } from './icon';
import { SMALL } from '../_constants';
import { type QuoteTextProps } from '../_types';

interface QuoteProps
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

export default (props: QuoteProps) => {
  const {
    hasImage = false,
    includesAnimation = false,
    isSizeLarge = false,
    isThemeMaryland = false,
    isTypeFeatured = false,
    quote,
    shouldHaveWhiteText = false,
  } = props;

  const isHasImageAndNotFeatured = hasImage && !isTypeFeatured;
  const iconSpan = elementIcon(props);
  const wordsList = splitWords(quote);
  let quoteTextElement: HTMLElement = quote;

  if (includesAnimation) {
    quoteTextElement = document.createElement('div');

    wordsList.map((word) => {
      quoteTextElement.appendChild(word);
    });
  }

  const builder = new ElementBuilder(quoteTextElement)
    .withClassName('quote-container-quote')
    .withStyles({
      element: {
        position: 'relative',
        fontWeight: '700',
        color: token.color.black,
        ...typography.sans.larger,

        ...(isSizeLarge && { ...typography.sans.extraLarge }),

        ...(shouldHaveWhiteText && {
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

          ...(isHasImageAndNotFeatured && {
            display: 'none',
          }),

          [`@container (min-width: ${SMALL}px)`]: {
            left: `-${token.spacing.md}`,
          },

          [`@container (max-width: ${SMALL - 1}px)`]: {
            ...(!isTypeFeatured && {
              display: 'block',
            }),
          },
        },

        ['& *']: {
          color: 'currentColor',
          ...(!isSizeLarge && { ...typography.sans.larger }),
          ...(isSizeLarge && { ...typography.sans.extraLarge }),
        },
      },
    });

  if (!hasImage) {
    builder.withChild(iconSpan);
  }

  return builder.build();
};
