import { ElementModel } from 'model';
import { CreateIconSpan, SMALL, BaseProps } from '..';
import { token } from '@universityofmaryland/web-styles-library';
import { ElementVisual } from '_types';

export interface QuoteImageProps extends BaseProps {
  isSizeLarge: boolean;
}

const CreateQuoteImageContainer = (
  props: QuoteImageProps,
  image: HTMLImageElement,
) => {
  const { isTypeInline, isSizeLarge, isThemeMaryland } = props;
  const iconSpan = CreateIconSpan(props);
  const imageContainerChildren: ElementVisual[] = [];
  const imageElement = ElementModel.create({
    element: image,
    className: 'quote-image',
    elementStyles: {
      element: {
        maxWidth: '100%',
        height: 'auto',

        ...(isTypeInline && {
          maxWidth: '160px',

          ...(isSizeLarge && { maxWidth: '200px' }),

          [`@container (min-width: ${SMALL}px)`]: {
            borderRight: `2px solid ${token.color.red}`,

            ...(isThemeMaryland && {
              borderRight: `2px solid ${token.color.gold}`,
            }),
          },
        }),
      },
    },
  });

  if (isTypeInline) {
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

        ...(isTypeInline && {
          marginBottom: token.spacing.sm,
          position: 'relative',
        }),
      },
    },
  });
};

export default CreateQuoteImageContainer;
