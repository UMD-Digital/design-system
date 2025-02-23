import { token } from '@universityofmaryland/web-styles-library';
import { TextLockupSmallScaling } from 'macros';

type TypeBlockCardIconProps = {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isThemeDark?: boolean;
};

const LARGE = 500;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-card-icon-block';
const ELEMENT_CARD_BLOCK_DECLARATION = 'card-icon-block-declaration';
const ELEMENT_CARD_BLOCK_CONTAINER = 'card-icon-block-container';
const ELEMENT_CARD_BLOCK_WRAPPER = 'card-icon-block-wrapper';
const ELEMENT_CARD_BLOCK_IMAGE = 'card-icon-block-image';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CARD_BLOCK_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${token.color.gray.darker};
  }
`;

// prettier-ignore
const ImageStyles = `
  .${ELEMENT_CARD_BLOCK_IMAGE} {
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: ${LARGE}px) {
    .${ELEMENT_CARD_BLOCK_IMAGE} {
      margin-bottom: ${token.spacing.lg};
    }
  }

  .${ELEMENT_CARD_BLOCK_IMAGE} * {
    max-height: 120px;
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_CARD_BLOCK_WRAPPER} {
    position: relative;
  }

  @media (max-width: ${LARGE - 1}px) {
    .${ELEMENT_CARD_BLOCK_WRAPPER} {
      display: flex;
      flex-direction: row-reverse;
    }
  }

  @media (max-width: ${LARGE - 1}px) {
    .${ELEMENT_CARD_BLOCK_WRAPPER} > *:first-child {
      width: 100px;
    }
  }

  @media (max-width: ${LARGE - 1}px) {
    .${ELEMENT_CARD_BLOCK_WRAPPER} > *:not(:first-child) {
      width: calc(100% - 100px);
      padding-right: ${token.spacing.md}; 
    }
  }
`;

// prettier-ignore
const STYLES_BLOCK_CARD_ICON_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_CARD_BLOCK_CONTAINER} {
    background-color: ${token.color.gray.lightest};
    height: 100%;
    padding: ${token.spacing.sm};
    padding-bottom: ${token.spacing.md};
    overflow: hidden;
  }

  @media (min-width: ${LARGE}px) {
    .${ELEMENT_CARD_BLOCK_CONTAINER} {
      padding: ${token.spacing.md};
    }
  }

  ${ImageStyles}
  ${WrapperStyles}
  ${TextLockupSmallScaling.Styles}
  ${OverwriteThemeDark}
`;

const CreateCardIconBlockElement = (props: TypeBlockCardIconProps) => {
  const { isThemeDark, image } = props;
  const elementContainer = document.createElement('div');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const imageContainer = document.createElement('div');
  const textContainer = TextLockupSmallScaling.CreateElement(props);

  wrapper.classList.add(ELEMENT_CARD_BLOCK_WRAPPER);

  if (image) {
    imageContainer.classList.add(ELEMENT_CARD_BLOCK_IMAGE);
    imageContainer.appendChild(image);
    wrapper.appendChild(imageContainer);
  }

  if (textContainer) {
    wrapper.appendChild(textContainer);
  }

  container.appendChild(wrapper);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  container.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);
  elementContainer.classList.add(ELEMENT_CARD_BLOCK_DECLARATION);
  elementContainer.appendChild(container);

  return elementContainer;
};

export default {
  CreateElement: CreateCardIconBlockElement,
  Styles: STYLES_BLOCK_CARD_ICON_ELEMENT,
};
