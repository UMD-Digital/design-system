import {
  LayoutBlockContainer,
  LayoutBlockImage,
  TextLockupSmall,
} from 'macros';

type TypeBlockCardProps = {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isAligned?: boolean;
  isBordered?: boolean;
  theme?: string;
};

const ELEMENT_NAME = 'umd-card-block';
const ELEMENT_CARD_BLOCK_CONTAINER = 'card-block-container';

// prettier-ignore
const STYLES_BLOCK_CARD_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${TextLockupSmall.Styles}
  ${LayoutBlockImage.Styles}
  ${LayoutBlockContainer.Styles}
`;

const CreateCardBlockElement = (props: TypeBlockCardProps) => {
  const { theme, image, isAligned = false, isBordered = false } = props;
  const textContainer = TextLockupSmall.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? LayoutBlockImage.CreateElement({ image })
    : null;
  const container = LayoutBlockContainer.CreateElement({
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
