import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { image as elementImage, text as elementText } from './elements';
import { quoteAnimation } from './helper/animation';
import { SMALL } from './_constants';
import { type QuoteInlineProps } from './_types';

const CreateQuoteInlineElement = (props: QuoteInlineProps) => {
  const { isSizeLarge, image, isTypeFeatured = false } = props;
  const textContainer = elementText(props);
  const imageContainer = image
    ? elementImage({
        ...props,
        isTypeFeatured,
        image,
      })
    : null;

  const wrapper = new ElementBuilder()
    .withClassName('quote-inline-container-wrapper')
    .withStyles({
      element: {
        [`@container (min-width: ${SMALL}px)`]: {
          display: 'flex',
          gap: token.spacing.lg,
          ...(isSizeLarge && { gap: token.spacing.xl }),
        },
      },
    });

  if (imageContainer) {
    wrapper.withChild(imageContainer);
  }

  wrapper.withChild(textContainer);

  const wrapperBuilt = wrapper.build();

  const container = new ElementBuilder()
    .withClassName('quote-inline-container')
    .withChild(wrapperBuilt)
    .withStyles({
      element: {
        containerType: 'inline-size',
        width: '100%',
      },
    })
    .build();

  const loadAnimation = () => {
    quoteAnimation({
      ...props,
      quoteElement: wrapperBuilt,
    });
  };

  return {
    ...container,
    events: {
      loadAnimation,
    },
  };
};

export const createCompositeQuoteInline = CreateQuoteInlineElement;
