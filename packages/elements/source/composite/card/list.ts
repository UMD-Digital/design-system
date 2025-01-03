import { token } from '@universityofmaryland/web-styles-library';
import { List as LayoutList, Image as LayoutImage } from 'layout';
import { TextLockupSmall } from 'macros';

type TypeListCardProps = {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | HTMLAnchorElement | null;
  isThemeDark?: boolean;
  isAligned?: boolean;
};

const { spacing } = token;

const ELEMENT_NAME = 'umd-card-list';
const ELEMENT_LIST_CARD_CONTAINER = 'card-list-container';

// prettier-ignore
export const STYLES_LIST_CARD_ELEMENT = `
  .${ELEMENT_LIST_CARD_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_LIST_CARD_CONTAINER} + * {
    margin-top: ${token.spacing.md}; 
  }

  ${TextLockupSmall.Styles}
  ${LayoutImage.Styles}
  ${LayoutList.Styles}
`;

const CreateCardListElement = (props: TypeListCardProps) => {
  const { image } = props;
  const textContainer = TextLockupSmall.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutList.CreateElement({
    textContainer,
    imageContainer,
    ...props,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CARD_CONTAINER);

  return {
    element: elementContainer,
    styles: STYLES_LIST_CARD_ELEMENT,
  };
};

export default CreateCardListElement;
