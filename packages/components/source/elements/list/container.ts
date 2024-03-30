import { Tokens } from '@universityofmaryland/variables';
import { ELEMENT_LIST_HEADLINE, ELEMENT_LIST_TEXT_CONTAINER } from './text';
import { ELEMENT_LIST_IMAGE_CONTAINER } from './image';

const { Colors, Spacing } = Tokens;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const SMALL = 400;
const LARGE = 650;

const ELEMENT_NAME = 'umd-list-container';
export const ELEMENT_LIST_CONTAINER = 'list-container';
export const ELEMENT_LIST_CONTAINER_WRAPPER = 'list-container-wrapper';

const IS_THEME_DARK = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_LIST_CONTAINER} .${ELEMENT_LIST_TEXT_CONTAINER}`;
const OVERWRITE_TEXT_HEADLINE = `.${ELEMENT_LIST_CONTAINER} .${ELEMENT_LIST_HEADLINE}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_LIST_CONTAINER} .${ELEMENT_LIST_IMAGE_CONTAINER}`;

// prettier-ignore
const VariationThemeStyles = `
  ${IS_THEME_DARK} .${ELEMENT_LIST_CONTAINER_WRAPPER} {
    border-bottom: 1px solid ${Colors.gray.dark};
  }
`;

// prettier-ignore
const TextContainerStyles = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding-right: ${Spacing.min};
    flex: 1 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${Spacing.md};
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
    padding-bottom: ${Spacing.md};
    border-bottom: 1px solid ${Colors.gray.light};
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
    max-width: 750px;
  }

  ${WrapperStyles}
  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${VariationThemeStyles}
`;

const CreateListContainer = ({
  imageContainer,
  textContainer,
  personContainer,
  theme,
}: {
  textContainer?: HTMLDivElement;
  imageContainer?: HTMLDivElement | null;
  personContainer?: HTMLDivElement | null;
  theme?: string;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_LIST_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
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
};
