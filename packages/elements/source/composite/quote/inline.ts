import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '_types';
import CreateQuoteImageContainer from './elements/image';
import { AnimateQuote, BaseProps } from '.';
import CreateQuoteTextContainer, { QuoteTextContainer } from './elements/text';
import { SMALL } from './index';

export interface InlineProps extends QuoteTextContainer, BaseProps {
  isSizeLarge: boolean;
}

export default (props: InlineProps) => {
  const { isSizeLarge, image } = props;
  const textContainer = CreateQuoteTextContainer(props);
  const getInlineWrapperChildren = (props: InlineProps) => {
    const wrapperChildren: ElementVisual[] = [];

    if (image) {
      const imageContainer = CreateQuoteImageContainer(props, image);

      wrapperChildren.push(imageContainer);
    }

    wrapperChildren.push(textContainer);
    return wrapperChildren;
  };

  const createWrapper = (children: ElementVisual[]) => {
    return ElementModel.createDiv({
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
    return ElementModel.createDiv({
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

  AnimateQuote(props, wrapper);

  return createContainer(wrapper);
};
