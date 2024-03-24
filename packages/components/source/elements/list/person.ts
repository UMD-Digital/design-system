import { Tokens } from '@universityofmaryland/variables';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
  PERSON_TEXT_CONTAINER,
} from '../common/person-text';
import { CreatListContainer, STYLES_LIST_CONTAINER } from './container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
  LIST_IMAGE_CONTAINER,
} from './image';

export type TypeListPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;

const SMALL = 400;

const ELEMENT_NAME = 'umd-list-person';
const ELEMENT_LIST_CONTAINER = 'umd-list-person-container';

const OverwriteImagesStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${LIST_IMAGE_CONTAINER} {
      float: none;
      width: 100%;
      margin-bottom: ${Spacing.md};
      background-color: ${Colors.gray.lighter};
      display: flex;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${LIST_IMAGE_CONTAINER} img {
      max-width: 80%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_IMAGE_CONTAINER} {
      order: 1;
    }
  }
`;

const OverwriteTextStyles = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${PERSON_TEXT_CONTAINER} {
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
  ${STYLES_PERSON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
`;

export const CreatPersonListElement = (element: TypeListPersonProps) => {
  const { theme, image } = element;
  const textContainer = CreatePersonTextContainer(element);
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
