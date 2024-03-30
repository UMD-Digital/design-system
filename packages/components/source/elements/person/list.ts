import { Tokens } from '@universityofmaryland/variables';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
  PERSON_TEXT_CONTAINER,
} from './elements/text';
import {
  CreatListContainer,
  STYLES_LIST_CONTAINER,
} from '../shared-elements/list/container';
import {
  CreateImageContainer,
  STYLES_LIST_COMMON_IMAGE,
  LIST_IMAGE_CONTAINER,
} from '../shared-elements/list/image';

type TypeListPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;

const SMALL = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-list-person';
const ELEMENT_PERSON_LIST_CONTAINER = 'umd-list-person-container';
const IS_IMAGE_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_LIST_CONTAINER} .${LIST_IMAGE_CONTAINER}`;
const IS_TEXT_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_LIST_CONTAINER} .${PERSON_TEXT_CONTAINER}`;
const IS_THEME_DARK = `.${ELEMENT_PERSON_LIST_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OverwriteThemeDarkStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_THEME_DARK} .${LIST_IMAGE_CONTAINER} {
      background-color: ${Colors.gray.dark};
    }
  }
`;

const OverwriteImagesStyles = `
  ${IS_IMAGE_CONTAINER_OVERWRITE} {
    order: 1;
    padding-right: ${Spacing.md};
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
    ${IS_IMAGE_CONTAINER_OVERWRITE} img,
    ${IS_IMAGE_CONTAINER_OVERWRITE} svg {
      width: 140px;
    }
  }
`;

const OverwriteTextStyles = `
  ${IS_TEXT_CONTAINER_OVERWRITE} {
    order: 2;
    width: 100%;
  }
`;

// prettier-ignore
const STYLES_PERSON_LIST_ELEMENT = `
  .${ELEMENT_PERSON_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_PERSON_LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${STYLES_LIST_CONTAINER}
  ${STYLES_PERSON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
  ${OverwriteThemeDarkStyles}
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

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_PERSON_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonListElement,
  Styles: STYLES_PERSON_LIST_ELEMENT,
};
