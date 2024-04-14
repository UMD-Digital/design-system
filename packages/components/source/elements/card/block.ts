import BlockContainer, {
  TypeBlockContainer,
} from '../shared-elements/block/container';
import BlockImageContainer from '../shared-elements/block/image';
import LockupTextContainer, {
  TypeTextLockupSmall,
} from '../shared-elements/lockup/text-small';

type TypeBlockCardProps = TypeTextLockupSmall &
  TypeBlockContainer & {
    image?: HTMLImageElement | null;
  };

const ELEMENT_NAME = 'umd-card-block';
const ELEMENT_CARD_BLOCK_CONTAINER = 'card-block-container';

// prettier-ignore
const STYLES_BLOCK_CARD_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${BlockImageContainer.Styles}
  ${LockupTextContainer.Styles}
  ${BlockContainer.Styles}
`;

const CreateCardBlockElement = (element: TypeBlockCardProps) => {
  const { theme, image, isAligned = false, isBordered = false } = element;
  const textContainer = LockupTextContainer.CreateElement(element);
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
  elementContainer.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardBlockElement,
  Styles: STYLES_BLOCK_CARD_ELEMENT,
};
