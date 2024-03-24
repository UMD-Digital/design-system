import { Tokens } from '@universityofmaryland/variables';
import {
  CreatBlockContainer,
  TypeBlockContainerAttributes,
  STYLES_BLOCK_CONTAINER,
  BLOCK_CONTAINER,
} from './container';
import {
  CreateImageBlockContainer,
  STYLES_BLOCK_COMMON_IMAGE,
  BLOCK_IMAGE_CONTAINER,
} from './image';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
} from '../common/person-text';

export type TypeBlockPersonProps = TypePersonProps &
  TypeBlockContainerAttributes & {
    image?: HTMLImageElement | null;
  };

const { Spacing, Colors } = Tokens;

const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-block-person';
const ELEMENT_LIST_CONTAINER = 'umd-block-person-container';
const ELEMENT_LIST_WRAPPER = 'umd-block-person-wrapper';

const IS_THEME_DARK = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OverwriteImagesStyles = `
  .${BLOCK_IMAGE_CONTAINER} {
    display: flex;
    justify-content: center;
    margin-bottom: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${BLOCK_IMAGE_CONTAINER} {
      float: none;
      width: 100%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${BLOCK_IMAGE_CONTAINER} {
      order: 1;
    }
  }

  .${BLOCK_IMAGE_CONTAINER} img {
    max-height: 240px;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${BLOCK_IMAGE_CONTAINER} img {
      max-width: 80%;
    }
  }
`;

const OverwriteThemeDarkStyles = `
  ${IS_THEME_DARK} .${BLOCK_CONTAINER} {
    background-color: ${Colors.black};
  }

  ${IS_THEME_DARK} .${ELEMENT_LIST_WRAPPER} {
    border: 1px solid ${Colors.gray.dark};
  }
`;

const WrapperStyles = `
  .${ELEMENT_LIST_WRAPPER} {
    border: 1px solid ${Colors.gray.light};
    padding: ${Spacing.sm};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_LIST_WRAPPER} {
      padding: ${Spacing['2xl']};
    }
  }
`;

// prettier-ignore
export const STYLES_BLOCK_PERSON = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${STYLES_BLOCK_COMMON_IMAGE}
  ${STYLES_PERSON_TEXT}
  ${STYLES_BLOCK_CONTAINER}
  ${WrapperStyles}
  ${OverwriteImagesStyles}
  ${OverwriteThemeDarkStyles}
`;

export const CreatPersonBlockElement = (element: TypeBlockPersonProps) => {
  const { theme, image, isAligned = false, isBordered = false } = element;
  const personContainer = CreatePersonTextContainer(element);
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const imageContainer = image ? CreateImageBlockContainer({ image }) : null;
  const container = CreatBlockContainer({
    personContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementWrapper.appendChild(container);
  elementWrapper.classList.add(ELEMENT_LIST_WRAPPER);

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};
