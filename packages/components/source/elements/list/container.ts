import { Tokens } from '@universityofmaryland/variables';
import { LIST_HEADLINE_WRAPPER } from './text';

const { Colors, Spacing } = Tokens;

const ELEMENT_NAME = 'umd-list-standard';

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const SMALL = 400;
const LARGE = 650;

export const LIST_CONTAINER = 'umd-list-container';
export const LIST_CONTAINER_WRAPPER = 'umd-list-container-wrapper';
export const LIST_TEXT_CONTAINER = 'umd-list-text-container';
export const LIST_IMAGE_CONTAINER = 'umd-list-image-container';

const IS_THEME_DARK = `.${LIST_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const VariationThemeStyles = `
  ${IS_THEME_DARK} .${LIST_CONTAINER_WRAPPER} {
    border-bottom: 1px solid ${Colors.gray.dark};
  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${LIST_TEXT_CONTAINER} {
    padding-right: ${Spacing.min};
    flex: 1 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_TEXT_CONTAINER} {
      padding-right: ${Spacing.md};
      order: 2;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${LIST_HEADLINE_WRAPPER} {
      max-width: calc(100% - 110px);
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL -1}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 96px;
      float: right;
      margin-bottom: 4px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 160px;
      order: 3;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 208px;
    }
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${LIST_CONTAINER_WRAPPER} {
    padding-bottom: ${Spacing.md};
    border-bottom: 1px solid ${Colors.gray.light};
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${LIST_CONTAINER_WRAPPER} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

// prettier-ignore
export const STYLES_LIST_CONTAINER = `
  .${LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: 750px;
  }

  ${WrapperStyles}
  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${VariationThemeStyles}
`;

export const CreatListContainer = ({
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

  container.classList.add(LIST_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  wrapper.classList.add(LIST_CONTAINER_WRAPPER);

  if (imageContainer) wrapper.appendChild(imageContainer);

  if (textContainer) {
    textContainer.classList.add(LIST_TEXT_CONTAINER);
    wrapper.appendChild(textContainer);
  }

  if (personContainer) {
    wrapper.appendChild(personContainer);
  }

  container.appendChild(wrapper);

  return container;
};
