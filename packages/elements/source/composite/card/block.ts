import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import { CardBlockProps } from './_types';

export const STYLES_BLOCK_CARD_ELEMENT = '';

const elementStyles = {
  element: {
    className: 'card-block-container',
    containerType: 'inline-size',
    height: '100%',
  },
};

export default (props: CardBlockProps) => {
  const { newsId, image, isAligned, dateSign } = props;
  const composite = ElementModel.composite.card.block({
    ...props,
    elementStyles,
    element: document.createElement('div'),
  });
  const textLockupElement = textLockup.smallScaling(props);

  if (newsId) {
    composite?.element.setAttribute('news-id', newsId);
  }

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
      dateSign,
    });
    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  return composite;
};
