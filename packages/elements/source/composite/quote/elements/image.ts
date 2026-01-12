import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { createCompositeQuoteIcon as elementIcon } from './icon';
import { SMALL } from '../_constants';
import { type QuoteImageProps, type QuoteStatementImageProps } from '../_types';

const CreateQuoteImageElement = ({
  image,
  isSizeLarge,
  isThemeMaryland,
  isTypeFeatured,
}: QuoteImageProps) => {
  const iconSpan = elementIcon({
    hasImage: image != null,
    isTypeFeatured,
    isThemeMaryland,
  });

  const imageElement = new ElementBuilder(image)
    .withClassName('quote-image')
    .withStyles({
      element: {
        maxWidth: '100%',
        height: 'auto',

        ...(!isTypeFeatured && {
          maxWidth: '160px',

          [`@container (min-width: ${SMALL}px)`]: {
            borderRight: `2px solid ${token.color.red}`,
          },
        }),

        ...(!isTypeFeatured && isSizeLarge && { maxWidth: '200px' }),

        ...(!isTypeFeatured &&
          isThemeMaryland && {
            borderRight: `2px solid ${token.color.gold}`,
          }),
      },
    })
    .build();

  const container = new ElementBuilder()
    .withClassName('quote-image-container')
    .withStyles({
      element: {
        display: 'inline-block',
        position: 'relative',

        ...(!isTypeFeatured && {
          marginBottom: token.spacing.sm,
          position: 'relative',
        }),
      },
    });

  if (!isTypeFeatured) {
    container.withChild(iconSpan);
  }

  container.withChild(imageElement);

  return container.build();
};

const CreateStatementImageElement = ({
  image,
  isThemeGold,
}: QuoteStatementImageProps) =>
  new ElementBuilder(image)
    .withClassName('statement-image')
    .styled({
      element: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: 0,
        objectFit: 'cover',
        aspectRatio: '1 / 1',
        border: `4px solid ${token.color.red}`,
        width: '100px',
        boxShadow:
          '0 2px 4px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08), 0 24px 40px rgba(0, 0, 0, 0.10)',
        ...(isThemeGold && {
          border: `4px solid ${token.color.gold}`,
        }),
      },
    })
    .build();
export const createCompositeQuoteImage = CreateQuoteImageElement;
export const createStatementQuoteImage = CreateStatementImageElement;
