import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon } from 'utilities';
import { LayoutBlockImage } from 'macros';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypeBlockPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
};

const { Spacing, Colors } = Tokens;

const IMAGE_BREAKPOINT = 349;
const PADDING_BREAKPOINT = 400;
const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-block';
const ELEMENT_PERSON_BLOCK_CONTAINER = 'person-block-container';
const ELEMENT_PERSON_BLOCK_WRAPPER = 'person-block-wrapper';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_PERSON_BLOCK_CONTAINER} .${LayoutBlockImage.Elements.container}`;

const OVERWRITE_DARK_THEME_PERSON_CONTAINER = `.${ELEMENT_PERSON_BLOCK_CONTAINER}${IS_THEME_DARK}`;

const OVERWRITE_DARK_THEME_WRAPPER = `${OVERWRITE_DARK_THEME_PERSON_CONTAINER} .${ELEMENT_PERSON_BLOCK_WRAPPER}`;
const OVERWRITE_DARK_THEME_IMAGE_CONTAINER = `${OVERWRITE_DARK_THEME_PERSON_CONTAINER} .${LayoutBlockImage.Elements.container}`;

const OverwriteThemeDarkStyles = `
  ${OVERWRITE_DARK_THEME_WRAPPER} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_CONTAINER} {
    background-color: ${Colors.gray.dark};
  }
`;

const OverwriteImagesStyles = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    display: flex;
    justify-content: center;
    margin-bottom: ${Spacing.md};
    background-color: ${Colors.gray.lightest};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 100%;
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} svg {
    height: 140px;
  }

  @container ${ELEMENT_NAME} (min-width: ${IMAGE_BREAKPOINT}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img,
    ${OVERWRITE_IMAGE_CONTAINER} svg {
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

  ${LayoutBlockImage.Styles}
  ${PersonTextContainer.Styles}
  ${WrapperStyles}
  ${OverwriteImagesStyles}
  ${OverwriteThemeDarkStyles}
`;

const CreatePersonBlockElement = (element: TypeBlockPersonProps) => {
  const { theme, image: providedImage } = element;
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const personContainer = PersonTextContainer.CreateElement(element);
  const imageContainer = LayoutBlockImage.CreateElement({
    image: providedImage || AssetIcon.PERSON,
  });

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementWrapper.appendChild(imageContainer);
  elementWrapper.appendChild(personContainer);
  elementWrapper.classList.add(ELEMENT_PERSON_BLOCK_WRAPPER);

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_PERSON_BLOCK_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBlockElement,
  Styles: STYLES_PERSON_BLOCK_ELEMENT,
};
