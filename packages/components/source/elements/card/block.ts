import BlockContainer, { TypeBlockContainer } from '../block/container';
import BlockImageContainer from '../block/image';
import BlockTextContainer, { TypeBlockTextContainter } from '../block/text';

type TypeBlockCardProps = TypeBlockTextContainter &
  TypeBlockContainer & {
    image?: HTMLImageElement | null;
  };

const ELEMENT_NAME = 'umd-card-block';
const ELEMENT_LIST_CONTAINER = 'card-block-container';

// prettier-ignore
const STYLES_BLOCK_CARD_ELEMENT = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${BlockImageContainer.Styles}
  ${BlockTextContainer.Styles}
  ${BlockContainer.Styles}
`;

const CreateCardBlockElement = (element: TypeBlockCardProps) => {
  const { theme, image, isAligned = false, isBordered = false } = element;
  const textContainer = BlockTextContainer.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? BlockImageContainer.CreateElement({ image })
    : null;
  const container = BlockContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardBlockElement,
  Styles: STYLES_BLOCK_CARD_ELEMENT,
};