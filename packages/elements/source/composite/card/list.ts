import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import * as Utility from 'utilities';
import { CardListProps } from './_types';

const containerQueryStyles = {
  className: 'card-list-container',
  containerType: 'inline-size',
};

// .${ELEMENT_LIST_CARD_CONTAINER} + * {
//   margin-top: ${token.spacing.md};
// }

// const { image } = props;
// const textContainer = textLockup.small(props);
// const elementContainer = document.createElement('div');
// const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
// const container = LayoutList.CreateElement({
//   textContainer: textContainer.element,
//   imageContainer,
//   ...props,
// });
// let styles = STYLES_LIST_CARD_ELEMENT;

// styles += textContainer.styles;

// elementContainer.appendChild(container);
// elementContainer.classList.add(ELEMENT_LIST_CARD_CONTAINER);

// return {
//   element: elementContainer,
//   styles,
// };

export default (props: CardListProps) => {
  const { image, isAligned, dateSign } = props;
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.cardList({
    ...props,
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
    const imageContainer = assets.image({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
    });
    containerQuery.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  containerQuery.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  composite.element.appendChild(containerQuery);

  return { element: composite.element, styles };
};
