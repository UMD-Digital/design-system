import { Tokens } from '@universityofmaryland/variables';
import PersonTextContainer, {
  TypePersonProps,
  ELEMENT_PERSON_TEXT_CONTAINER,
} from './elements/text';
import ImageContainer, {
  ELEMENT_LIST_IMAGE_CONTAINER,
} from '../shared-elements/list/image';
import ListContainer, {
  ELEMENT_LIST_CONTAINER,
} from '../shared-elements/list/container';

type TypeListPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;

const SMALL = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-list';
const ELEMENT_PERSON_LIST_CONTAINER = 'person-list-container';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER} .${ELEMENT_LIST_CONTAINER} .${ELEMENT_LIST_IMAGE_CONTAINER}`;
const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER} .${ELEMENT_LIST_CONTAINER} .${ELEMENT_PERSON_TEXT_CONTAINER}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_IMAGE_CONTAINER = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_LIST_IMAGE_CONTAINER}`;

const OverwriteThemeDarkStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_THEME_DARK_IMAGE_CONTAINER} {
      background-color: ${Colors.gray.dark};
    }
  }
`;

const OverwriteImagesStyles = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    order: 1;
    padding-right: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      float: none;
      width: 100%;
      margin-bottom: ${Spacing.md};
      background-color: ${Colors.gray.lighter};
      display: flex;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img,
    ${OVERWRITE_IMAGE_CONTAINER} svg {
      width: 140px;
    }
  }
`;

const OverwriteTextStyles = `
  ${OVERWRITE_TEXT_CONTAINER} {
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

  ${PersonTextContainer.Styles}
  ${ImageContainer.Styles}
  ${ListContainer.Styles}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
  ${OverwriteThemeDarkStyles}
`;

const CreatePersonListElement = (element: TypeListPersonProps) => {
  const { theme, image } = element;
  const personContainer = PersonTextContainer.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? ImageContainer.CreateElement({ image }) : null;
  const container = ListContainer.CreateElement({
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
