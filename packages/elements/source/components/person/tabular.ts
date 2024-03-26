import { Tokens } from '@universityofmaryland/variables';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
  PERSON_TEXT_CONTAINER,
  DISPLAY_TABULAR,
} from './elements/text';
import {
  CreatListContainer,
  STYLES_LIST_CONTAINER,
} from '../../shared-elements/list/container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
  LIST_IMAGE_CONTAINER,
} from '../../shared-elements/list/image';

type TypeTabularPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;

const SMALL = 400;

const ELEMENT_NAME = 'umd-tabluar-person';
const ELEMENT_PERSON_TABULAR_CONTAINER = 'umd-tabluar-person-container';
const IS_IMAGE_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${LIST_IMAGE_CONTAINER}`;
const IS_TEXT_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${PERSON_TEXT_CONTAINER}`;

const OverwriteImagesStyles = `
  ${IS_IMAGE_CONTAINER_OVERWRITE} {
    order: 1;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} {
      float: none;
      width: 100%;
      margin-bottom: ${Spacing.md};
      background-color: ${Colors.gray.lighter};
      display: flex;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} img {
      max-width: 80%;
    }
  }
`;

const OverwriteTextStyles = `
  ${IS_TEXT_CONTAINER_OVERWRITE} {
    padding-left: ${Spacing.md};
    order: 2;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${Spacing.md};
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} > *:last-child {
    justify-self: end;
  }
`;

// prettier-ignore
const STYLES_PERSON_TABULAR_ELEMENT = `
  .${ELEMENT_PERSON_TABULAR_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_PERSON_TABULAR_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${STYLES_LIST_CONTAINER}
  ${STYLES_PERSON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
`;

const CreatePersonTabularElement = (element: TypeTabularPersonProps) => {
  const { theme, image } = element;
  const personContainer = CreatePersonTextContainer({
    ...element,
    displayType: DISPLAY_TABULAR,
  });
  const elementContainer = document.createElement('div');
  const imageContainer = image ? CreateImageContainer({ image }) : null;
  const container = CreatListContainer({
    personContainer,
    imageContainer,
    theme,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_PERSON_TABULAR_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonTabularElement,
  Styles: STYLES_PERSON_TABULAR_ELEMENT,
};
