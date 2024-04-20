import { Tokens } from '@universityofmaryland/variables';
import { LayoutListImage, LayoutListContainer, TextLockupSmall } from 'macros';

type TypeListCardProps = {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-card-list';
const ELEMENT_LIST_CARD_CONTAINER = 'card-list-container';

// prettier-ignore
const STYLES_LIST_CARD_ELEMENT = `
  .${ELEMENT_LIST_CARD_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_LIST_CARD_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${TextLockupSmall.Styles}
  ${LayoutListImage.Styles}
  ${LayoutListContainer.Styles}
`;

const CreateCardListElement = (props: TypeListCardProps) => {
  const { theme, image } = props;
  const textContainer = TextLockupSmall.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? LayoutListImage.CreateElement({ image })
    : null;
  const container = LayoutListContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CARD_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardListElement,
  Styles: STYLES_LIST_CARD_ELEMENT,
};
