import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import * as Utility from 'utilities';
import { CardBlockProps } from './_types';

export const STYLES_BLOCK_CARD_ELEMENT = '';

const containerQueryStyles = {
  className: 'card-block-container',
  containerType: 'inline-size',
};

export default (props: CardBlockProps) => {
  const { newsId, image, isAligned, dateSign } = props;
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.cardBlock({
    ...props,
    element: document.createElement('div'),
    elementStyles: {
      element: {
        height: '100%',
      },
    },
  });
  const textLockupElement = textLockup.smallScaling(props);

  let styles = `
    ${Utility.styles.getStyleStringFromJssObject(containerQueryStyles)}
    ${composite.styles}
  `;

  if (newsId) {
    composite?.element.setAttribute('news-id', newsId);
  }

  if (image) {
    const imageContainer = assets.image({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
      dateSign,
    });
    containerQuery.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  containerQuery.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  composite.element.appendChild(containerQuery);

  return { element: composite.element, styles };
};
