import { token } from '@universityofmaryland/web-styles-library';
import { TextLockupSmall } from 'macros';
import ImageContainer from './image';

const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const SMALL = 400;
const LARGE = 650;

const ELEMENT_NAME = 'umd-list-container';
const ELEMENT_LIST_CONTAINER = 'list-container';
const ELEMENT_LIST_CONTAINER_WRAPPER = 'list-container-wrapper';

const IS_THEME_DARK = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_ALIGNED = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_ALIGNED}]`;

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_LIST_CONTAINER} .${TextLockupSmall.Elements.container}`;
const OVERWRITE_TEXT_HEADLINE = `.${ELEMENT_LIST_CONTAINER} .${TextLockupSmall.Elements.headline}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_LIST_CONTAINER} .${ImageContainer.Elements.container}`;

const OVERWRITE_ALIGNED_IMAGE_CONTAINER = `${IS_ALIGNED} .${ImageContainer.Elements.container}`;

// prettier-ignore
const VariationThemeStyles = `
  ${IS_THEME_DARK} .${ELEMENT_LIST_CONTAINER_WRAPPER} {
    border-bottom: 1px solid ${token.color.gray.dark};
  }
`;

// prettier-ignore
const VariantAlignedStyles = `
  ${OVERWRITE_ALIGNED_IMAGE_CONTAINER} {
    aspect-ratio: 4/3;
    display: block;
  }

  ${OVERWRITE_ALIGNED_IMAGE_CONTAINER} img {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

// prettier-ignore
const TextContainerStyles = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding-right: ${token.spacing.min};
    flex: 1 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${token.spacing.md};
      order: 2;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_TEXT_HEADLINE} {
      max-width: calc(100% - 110px);
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL -1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 96px;
      float: right;
      margin-bottom: 4px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 160px;
      order: 3;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 208px;
    }
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_LIST_CONTAINER_WRAPPER} {
    padding-bottom: ${token.spacing.md};
    border-bottom: 1px solid ${token.color.gray.light};
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_LIST_CONTAINER_WRAPPER} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

// prettier-ignore
const STYLES_LIST_CONTAINER = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: ${token.spacing.maxWidth.small};
  }

  ${WrapperStyles}
  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${VariationThemeStyles}
  ${VariantAlignedStyles}
`;

const CreateListContainer = ({
  imageContainer,
  textContainer,
  personContainer,
  isThemeDark,
  isAligned,
}: {
  textContainer?: HTMLDivElement;
  imageContainer?: HTMLDivElement | null;
  personContainer?: HTMLDivElement | null;
  isThemeDark?: boolean;
  isAligned?: boolean;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_LIST_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isAligned) container.setAttribute(ATTRIBUTE_ALIGNED, '');

  wrapper.classList.add(ELEMENT_LIST_CONTAINER_WRAPPER);

  if (imageContainer) wrapper.appendChild(imageContainer);

  if (textContainer) {
    wrapper.appendChild(textContainer);
  }

  if (personContainer) {
    wrapper.appendChild(personContainer);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateListContainer,
  Styles: STYLES_LIST_CONTAINER,
  Elements: {
    container: ELEMENT_LIST_CONTAINER,
    wrapper: ELEMENT_LIST_CONTAINER_WRAPPER,
  },
};
