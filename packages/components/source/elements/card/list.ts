import { Tokens } from '@universityofmaryland/variables';
import { LayoutImage, LayoutList, TextLockupSmall } from 'macros';

type TypeListCardProps = {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | HTMLAnchorElement | null;
  isAligned?: boolean;
  theme?: string | null;
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
  ${LayoutImage.Styles}
  ${LayoutList.Styles}
`;

const CreateCardListElement = (props: TypeListCardProps) => {
  const { theme, image, isAligned } = props;
  const textContainer = TextLockupSmall.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutList.CreateElement({
    textContainer,
    imageContainer,
    theme,
    isAligned,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CARD_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardListElement,
  Styles: STYLES_LIST_CARD_ELEMENT,
};
