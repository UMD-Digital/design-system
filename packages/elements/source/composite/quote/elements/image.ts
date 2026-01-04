import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { createCompositeQuoteIcon as elementIcon } from './icon';
import { SMALL } from '../_constants';
import {
  type QuoteBaseProps,
  type QuoteVariantProps,
  type QuoteSizeProps,
} from '../_types';

interface QuoteImageProps
  extends QuoteVariantProps,
    QuoteSizeProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  image: HTMLImageElement;
}

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

export const createCompositeQuoteImage = CreateQuoteImageElement;
