import { Tokens } from '@universityofmaryland/variables';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
  PERSON_TEXT_CONTAINER,
} from '../../shared-elements/person/person-text';
import {
  CreatListContainer,
  STYLES_LIST_CONTAINER,
} from '../../shared-elements/list/container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
  LIST_IMAGE_CONTAINER,
} from '../../shared-elements/list/image';

type TypeListPersonProps = TypePersonProps & {
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
const STYLES_PERSON_LIST_ELEMENT = `
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

const CreatePersonListElement = (element: TypeListPersonProps) => {
  const { theme, image } = element;
  const personContainer = CreatePersonTextContainer(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? CreateImageContainer({ image }) : null;
  const container = CreatListContainer({
    personContainer,
    imageContainer,
    theme,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonListElement,
  Styles: STYLES_PERSON_LIST_ELEMENT,
};
