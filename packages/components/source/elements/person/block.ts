import { Tokens } from '@universityofmaryland/variables';
import { PERSON_ICON } from 'assets/icons';
import {
  CreatBlockContainer,
  TypeBlockContainerAttributes,
  STYLES_BLOCK_CONTAINER,
  BLOCK_CONTAINER,
} from '../shared-elements/block/container';
import {
  CreateImageBlockContainer,
  STYLES_BLOCK_COMMON_IMAGE,
  BLOCK_IMAGE_CONTAINER,
} from '../shared-elements/block/image';
import {
  CreatePersonTextContainer,
  TypePersonProps,
  STYLES_PERSON_TEXT,
} from './elements/text';

type TypeBlockPersonProps = TypePersonProps &
  TypeBlockContainerAttributes & {
    image?: HTMLImageElement | null;
  };

const { Spacing, Colors } = Tokens;

const IMAGE_BREAKPOINT = 349;
const PADDING_BREAKPOINT = 400;
const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-block-person';
const ELEMENT_PERSON_BLOCK_CONTAINER = 'umd-block-person-block-container';
const ELEMENT_PERSON_BLOCK_WRAPPER = 'umd-block-person-block-wrapper';

const IS_THEME_DARK = `.${ELEMENT_PERSON_BLOCK_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_IMAGE_CONTAINER_OVERWRITE = `.${ELEMENT_PERSON_BLOCK_CONTAINER} .${BLOCK_IMAGE_CONTAINER}`;

const OverwriteThemeDarkStyles = `
  ${IS_THEME_DARK} .${BLOCK_CONTAINER} {
    background-color: ${Colors.black};
  }

  ${IS_THEME_DARK} .${BLOCK_IMAGE_CONTAINER} {
    background-color: ${Colors.gray.dark};
  }
`;

const OverwriteImagesStyles = `
  ${IS_IMAGE_CONTAINER_OVERWRITE} {
    display: flex;
    justify-content: center;
    margin-bottom: ${Spacing.md};
    background-color: ${Colors.gray.lightest};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} {
      float: none;
      width: 100%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} {
      order: 1;
    }
  }

  ${IS_IMAGE_CONTAINER_OVERWRITE} img,
  ${IS_IMAGE_CONTAINER_OVERWRITE} svg {
    height: 140px;
  }

  @container ${ELEMENT_NAME} (min-width: ${IMAGE_BREAKPOINT}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} img,
    ${IS_IMAGE_CONTAINER_OVERWRITE} svg {
      height: 200px;
    }
  }
`;

const WrapperStyles = `
  .${ELEMENT_PERSON_BLOCK_WRAPPER} {
    padding: ${Spacing.md};
    height: 100%;
  }

  @container ${ELEMENT_NAME} (min-width: ${PADDING_BREAKPOINT}px) {
    .${ELEMENT_PERSON_BLOCK_WRAPPER} {
      padding: ${Spacing['2xl']};
    }
  }
`;

// prettier-ignore
const STYLES_PERSON_BLOCK_ELEMENT = `
  .${ELEMENT_PERSON_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  ${STYLES_BLOCK_COMMON_IMAGE}
  ${STYLES_PERSON_TEXT}
  ${STYLES_BLOCK_CONTAINER}
  ${WrapperStyles}
  ${OverwriteImagesStyles}
  ${OverwriteThemeDarkStyles}
`;

const CreatePersonBlockElement = (element: TypeBlockPersonProps) => {
  const {
    theme,
    image: providedImage,
    isAligned = false,
    isBordered = false,
  } = element;
  const personContainer = CreatePersonTextContainer(element);
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const imageContainer = CreateImageBlockContainer({
    image: providedImage || PERSON_ICON,
  });
  const container = CreatBlockContainer({
    personContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementWrapper.appendChild(container);
  elementWrapper.classList.add(ELEMENT_PERSON_BLOCK_WRAPPER);

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_PERSON_BLOCK_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBlockElement,
  Styles: STYLES_PERSON_BLOCK_ELEMENT,
};
