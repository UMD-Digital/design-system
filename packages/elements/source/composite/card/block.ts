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
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.cardBlock({
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
    containerQuery.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  containerQuery.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  composite.element.appendChild(containerQuery);

  return composite;
};
