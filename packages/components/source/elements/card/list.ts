import { Tokens } from '@universityofmaryland/variables';
import ListImageContainer from '../shared-elements/list/image';
import LockupTextContainer, {
  TypeTextLockupSmall,
} from '../shared-elements/lockup/text-small';
import ListContainer from '../shared-elements/list/container';

type TypeListCardProps = TypeTextLockupSmall & {
  image?: HTMLImageElement | null;
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

  ${LockupTextContainer.Styles}
  ${ListImageContainer.Styles}
  ${ListContainer.Styles}
`;

const CreateCardListElement = (element: TypeListCardProps) => {
  const { theme, image } = element;
  const textContainer = LockupTextContainer.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? ListImageContainer.CreateElement({ image })
    : null;
  const container = ListContainer.CreateElement({
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
