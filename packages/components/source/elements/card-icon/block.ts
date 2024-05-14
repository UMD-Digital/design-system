import { Tokens } from '@universityofmaryland/variables';
import { TextLockupSmallScaling } from 'macros';

type TypeBlockCardIconProps = {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  theme?: string | null;
};

const { Colors, Spacing } = Tokens;

const LARGE = 500;

const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
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
    background-color: ${Colors.gray.darker};
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
      margin-bottom: ${Spacing.lg};
    }
  }

  .${ELEMENT_CARD_BLOCK_IMAGE} * {
    max-height: 160px;
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
      padding-right: ${Spacing.md}; 
    }
  }
`;

// prettier-ignore
const STYLES_BLOCK_CARD_ICON_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CARD_BLOCK_CONTAINER} {
    background-color: ${Colors.gray.lightest};
    height: 100%;
    padding: ${Spacing.sm};
    padding-bottom: ${Spacing.md};
    overflow: hidden;
  }

  ${ImageStyles}
  ${WrapperStyles}
  ${TextLockupSmallScaling.Styles}
  ${OverwriteThemeDark}
`;

const CreateCardIconBlockElement = (props: TypeBlockCardIconProps) => {
  const { theme = THEME_LIGHT, image } = props;
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
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  container.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);
  elementContainer.classList.add(ELEMENT_CARD_BLOCK_DECLARATION);
  elementContainer.appendChild(container);

  return elementContainer;
};

export default {
  CreateElement: CreateCardIconBlockElement,
  Styles: STYLES_BLOCK_CARD_ICON_ELEMENT,
};
