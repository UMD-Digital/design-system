import { Tokens } from '@universityofmaryland/variables';
import {
  CreatListContainer,
  STYLES_LIST_CONTAINER,
} from '../shared-elements/list/container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
} from '../shared-elements/list/image';
import {
  CreateTextContainer,
  TypeCommonTextAttributes,
  STYLES_LIST_COMMON_TEXT,
} from '../shared-elements/list/text';

type TypeListCardProps = TypeCommonTextAttributes & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-list-standard';
const ELEMENT_LIST_CONTAINER = 'umd-list-standard-container';

// prettier-ignore
const STYLES_LIST_CARD_ELEMENT = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${STYLES_LIST_CONTAINER}
  ${STYLES_LIST_COMMON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
`;

const CreateCardListElement = (element: TypeListCardProps) => {
  const { theme, image } = element;
  const textContainer = CreateTextContainer(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? CreateImageContainer({ image }) : null;
  const container = CreatListContainer({
    textContainer,
    imageContainer,
    theme,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardListElement,
  Styles: STYLES_LIST_CARD_ELEMENT,
};
