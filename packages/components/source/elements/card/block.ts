import { LayoutBlock, LayoutImage, TextLockupSmallScaling } from 'macros';

type TypeBlockCardProps = {
  id?: string;
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | HTMLAnchorElement | null;
  isAligned?: boolean;
  isBordered?: boolean;
  isThemeDark?: boolean;
  isTransparent?: boolean;
};

const ELEMENT_NAME = 'umd-card-block';
const ELEMENT_CARD_BLOCK_CONTAINER = 'card-block-container';

// prettier-ignore
export const STYLES_BLOCK_CARD_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  ${TextLockupSmallScaling.Styles}
  ${LayoutImage.Styles}
  ${LayoutBlock.Styles}
`;

const CreateCardBlockElement = (props: TypeBlockCardProps) => {
  const { id, image } = props;

  const textContainer = TextLockupSmallScaling.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutBlock.CreateElement({
    ...props,
    imageContainer,
    textContainer,
  });

  if (id) elementContainer.setAttribute('news-id', id);
  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);

  return { element: elementContainer, styles: STYLES_BLOCK_CARD_ELEMENT };
};

export default CreateCardBlockElement;
