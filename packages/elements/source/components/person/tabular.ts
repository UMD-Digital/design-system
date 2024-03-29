import { Tokens, Typography } from '@universityofmaryland/variables';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
  PERSON_TEXT_CONTAINER,
  PERSON_NAME_CONTAINER,
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
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeTabularPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;

const { SansLarge, SansSmaller } = Typography;

const SMALL = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-tabluar-person';
const ELEMENT_PERSON_TABULAR_CONTAINER = 'umd-tabluar-person-container';
const IS_IMAGE_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${LIST_IMAGE_CONTAINER}`;
const IS_TEXT_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${PERSON_TEXT_CONTAINER}`;
const IS_THEME_DARK = `.${ELEMENT_PERSON_TABULAR_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

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

  ${IS_IMAGE_CONTAINER_OVERWRITE} img,
  ${IS_IMAGE_CONTAINER_OVERWRITE} svg {
    width: 140px;
  }
`;

const OverwriteTextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_TEXT_CONTAINER_OVERWRITE} *`]: SansSmaller,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_TEXT_CONTAINER_OVERWRITE} .${PERSON_NAME_CONTAINER}`]: SansLarge,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} {
      order: 2;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} > *:nth-of-type(2) {
      justify-self: end;
    }
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
  ${OverwriteThemeDarkStyles}
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

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_PERSON_TABULAR_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonTabularElement,
  Styles: STYLES_PERSON_TABULAR_ELEMENT,
};
