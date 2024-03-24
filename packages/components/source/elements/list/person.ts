import { Tokens } from '@universityofmaryland/variables';
import { CreatListContainer, STYLES_LIST_CONTAINER } from './container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
  LIST_IMAGE_CONTAINER,
} from './image';
import {
  CreateTextContainer,
  TypeCommonTextAttributes,
  STYLES_LIST_COMMON_TEXT,
  LIST_TEXT_CONTAINER,
} from './text';

export type TypeListPersonProps = TypeCommonTextAttributes & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing } = Tokens;

const SMALL = 400;

const ELEMENT_NAME = 'umd-list-person';
const ELEMENT_LIST_CONTAINER = 'umd-list-person-container';

const OverwriteImagesStyles = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_IMAGE_CONTAINER} {
      order: 1;
    }
  }
`;

const OverwriteTextStyles = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_TEXT_CONTAINER} {
      order: 2;
      padding-right: 0;
      padding-left: ${Spacing.md};
    }
  }
`;

// prettier-ignore
export const STYLES_LIST_PERSON = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${STYLES_LIST_CONTAINER}
  ${STYLES_LIST_COMMON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
`;

export const CreatPersonListElement = (element: TypeListPersonProps) => {
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
