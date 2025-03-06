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
  const composite = ElementModel.composite.card.list({
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
    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  if (dateSign) {
    composite.element.appendChild(dateSign.element);
    composite.styles += dateSign.styles;
  }

  return composite;
};
