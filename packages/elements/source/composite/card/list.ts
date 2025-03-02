import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import * as Utility from 'utilities';
import { CardListProps } from './_types';

const containerQueryStyles = {
  className: 'card-list-container',
  containerType: 'inline-size',
};

export default (props: CardListProps) => {
  const { image, isAligned, dateSign } = props;
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.cardList({
    ...props,
    isDisplayEvent: dateSign ? true : false,
    element: document.createElement('div'),
    elementStyles: {
      element: {
        height: '100%',
      },
    },
  });
  const textLockupElement = textLockup.small(props);

  let styles = `
    ${Utility.styles.getStyleStringFromJssObject(containerQueryStyles)}
    ${composite.styles}
  `;

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
    });
    containerQuery.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  containerQuery.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  if (dateSign) {
    containerQuery.appendChild(dateSign.element);
    styles += dateSign.styles;
  }

  composite.element.appendChild(containerQuery);

  return { element: composite.element, styles };
};
