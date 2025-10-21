import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { image as elementImage, text as elementText } from './elements';
import { quoteAnimation } from './helper/animation';
import { SMALL } from './_constants';
import { type QuoteInlineProps } from './_types';
import { type ElementVisual } from '../../_types';

export default (props: QuoteInlineProps) => {
  const { isSizeLarge, image, isTypeFeatured = false } = props;
  const textContainer = elementText(props);
  const getInlineWrapperChildren = (props: QuoteInlineProps) => {
    const wrapperChildren: ElementVisual[] = [];

    if (image) {
      const imageContainer = elementImage({
        ...props,
        isTypeFeatured,
        image,
      });

      wrapperChildren.push(imageContainer);
    }

    wrapperChildren.push(textContainer);
    return wrapperChildren;
  };

  const createWrapper = (children: ElementVisual[]) => {
    return ElementBuilder.create.div({
      className: 'quote-inline-container-wrapper',
      children: children,
      elementStyles: {
        element: {
          [`@container (min-width: ${SMALL}px)`]: {
            display: 'flex',
            gap: token.spacing.lg,
            ...(isSizeLarge && { gap: token.spacing.xl }),
          },
        },
      },
    });
  };

  const createContainer = (wrapper: ElementVisual) => {
    return ElementBuilder.create.div({
      className: 'quote-inline-container',
      children: [wrapper],
      elementStyles: {
        element: {
          containerType: 'inline-size',
          width: '100%',
        },
      },
    });
  };

  const wrapperChildren = getInlineWrapperChildren(props);
  const wrapper = createWrapper(wrapperChildren);

  const loadAnimation = () => {
    quoteAnimation({
      ...props,
      quoteElement: wrapper,
    });
  };

  return {
    ...createContainer(wrapper),
    events: {
      loadAnimation,
    },
  };
};
