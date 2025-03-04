import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import { CardListProps } from './_types';

const elementStyles = {
  element: {
    className: 'card-list-container',
    containerType: 'inline-size',
    height: '100%',
  },
};

export default (props: CardListProps) => {
  const { image, isAligned, dateSign } = props;
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.cardList({
    ...props,
    isDisplayEvent: dateSign ? true : false,
    elementStyles,
    element: document.createElement('div'),
  });
  const textLockupElement = textLockup.small(props);

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
    });
    containerQuery.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  containerQuery.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  if (dateSign) {
    containerQuery.appendChild(dateSign.element);
    composite.styles += dateSign.styles;
  }

  composite.element.appendChild(containerQuery);

  return composite;
};
