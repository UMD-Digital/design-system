import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import { default as elementIcon } from './icon';
import { SMALL } from '../_constants';
import {
  type QuoteBaseProps,
  type QuoteVariantProps,
  type QuoteSizeProps,
} from '../_types';
import { type ElementVisual } from '../../../_types';

interface QuoteImageProps
  extends QuoteVariantProps,
    QuoteSizeProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  image: HTMLImageElement;
}

export default ({
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
  const imageContainerChildren: ElementVisual[] = [];
  const imageElement = ElementModel.create({
    element: image,
    className: 'quote-image',
    elementStyles: {
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
    },
  });

  if (!isTypeFeatured) {
    imageContainerChildren.push(iconSpan);
  }

  imageContainerChildren.push(imageElement);

  return ElementModel.createDiv({
    className: 'quote-image-container',
    children: imageContainerChildren,
    elementStyles: {
      element: {
        display: 'inline-block',
        position: 'relative',

        ...(!isTypeFeatured && {
          marginBottom: token.spacing.sm,
          position: 'relative',
        }),
      },
    },
  });
};
