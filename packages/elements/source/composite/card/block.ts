import {
  Block as LayoutBlock,
  Image as LayoutImage,
  STYLES_BLOCK_CONTAINER,
} from 'layout';
import { textLockup } from 'atomic';

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

  ${STYLES_BLOCK_CONTAINER}
  ${LayoutImage.Styles}
`;

const CreateCardBlockElement = (props: TypeBlockCardProps) => {
  const { id, image } = props;

  const textContainer = textLockup.smallScaling(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutBlock({
    ...props,
    imageContainer,
    textContainer: textContainer.element,
  });
  let styles = STYLES_BLOCK_CARD_ELEMENT;

  styles += textContainer.styles;

  if (id) elementContainer.setAttribute('news-id', id);
  elementContainer.appendChild(container.element);
  styles += textContainer.styles;
  elementContainer.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);

  return { element: elementContainer, styles };
};

export default CreateCardBlockElement;
