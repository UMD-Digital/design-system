import { Tokens } from '@universityofmaryland/variables';
import { QUOTE_ICON } from 'assets/icons';
import Text, {
  TEXT_CONTAINER,
  TEXT_CONTAINER_QUOTE_WRAPPER,
  TypeQuoteTextContainer,
} from './elements/text';
import Image, { IMAGE_CONTAINER } from './elements/image';

type TypeInlineInline = TypeQuoteTextContainer & {
  theme: string;
  size: string;
  image: HTMLElement | null;
};

const { Spacing, Colors } = Tokens;

const SMALL = 500;

const ELEMENT_NAME = 'umd-element-quote-inline';
const ATTRIBUTE_WITH_IMAGE = 'has-image';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const THEME_MARYLAND = 'maryland';
const SIZE_LARGE = 'large';

const QUOTE_INLINE_CONTAINER = 'quote-inline-container';
const QUOTE_INLINE_CONTAINER_WRAPPER = 'quote-inline-container-wrapper';

const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_SIZE_LARGE = `[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_WITH_IMAGE}]`;
const IS_WITH_IMAGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_WITH_IMAGE}`;
const IS_SIZE_LARGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_SIZE_LARGE}`;
const IS_SIZE_LARGE_WITH_IMAGE_CONTAINER = `${IS_WITH_IMAGE_CONTAINER}${IS_WITH_IMAGE}`;
const IS_TEXT_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_IMAGE_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${IMAGE_CONTAINER}`;

const IS_MARYLAND_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_THEME_MARYLAND}`;

// prettier-ignore
const OverwriteThemeMaryland = `
  ${IS_MARYLAND_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    border-left: 2px solid ${Colors.white};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_MARYLAND_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
      border-left: 2px solid ${Colors.white};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_MARYLAND_CONTAINER} .${IMAGE_CONTAINER} img  {
      border-right: 2px solid ${Colors.white};
    }
  }
  
  ${IS_MARYLAND_CONTAINER} span svg {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const OverwriteSizeLarge = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${QUOTE_INLINE_CONTAINER_WRAPPER} {
      gap: ${Spacing.xl};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${IMAGE_CONTAINER} img {
    max-width: 200px;
  }

  ${IS_SIZE_LARGE_CONTAINER} .${IMAGE_CONTAINER} span {
    bottom: -7px;
    left: -2px;
    height: 26px;
    width: 36px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${IMAGE_CONTAINER} span {
      height: 30px;
      width: 41px;
      top: -14px;
      right: -28px;
      left: inherit;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER} {
      padding-top:  ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
      margin-left: ${Spacing['2xl']};
      padding-left: ${Spacing.md};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    position: absolute;
    left: 0;
    top: 0;
    height: 26px;
    width: 36px;
    display: block;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
      position: absolute;
      left: 0;
      top: 0;
      height: 26px;
      width: 36px;
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} svg {
    fill: ${Colors.red};
  }
`;

// prettier-ignore
const OverwriteSizedLargeWithImage = `
  ${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    display: none;
  }

  ${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER} {
    padding-top: 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
      margin-left: 0;
      padding-left: 0;
      border-left: none;
    }
  }
`;

// prettier-ignore
const OverwriteWithImage = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${IS_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
      border-left: 2px solid ${Colors.red};
      padding-left: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const TextContainer = `
  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
  }
`

// prettier-ignore
const ImageContainer = `
  ${IS_IMAGE_CONTAINER_OVERWRITE} {
    margin-bottom: ${Spacing.sm};
    position: relative;
  }

  ${IS_IMAGE_CONTAINER_OVERWRITE} img {
    max-width: 160px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} img  {
      border-right: 2px solid ${Colors.red};
    }
  }

  ${IS_IMAGE_CONTAINER_OVERWRITE} span {
    position: absolute;
    bottom: -7px;
    left: -2px;
    height: 15px;
    width: 21px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} span {
      height: 20px;
      width: 29px;
      top: -11px;
      right: -20px;
      left: inherit;
    }
  }

  ${IS_IMAGE_CONTAINER_OVERWRITE} span svg {
    fill: ${Colors.red};
  }
`;

// prettier-ignore
const STYLES_QUOTE_INLINE_ELEMENT = `
  .${QUOTE_INLINE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    width: 100%;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${QUOTE_INLINE_CONTAINER_WRAPPER} {
      display: flex;
      gap: ${Spacing.lg};
    }
  }

  ${ImageContainer}
  ${TextContainer}
  ${OverwriteWithImage}
  ${OverwriteSizeLarge}
  ${OverwriteSizedLargeWithImage}
  ${OverwriteThemeMaryland}
`;

const CreateQuoteInlineElement = (element: TypeInlineInline) => {
  const { size, image, theme } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const isSizeLarge = size === 'large';
  const hasImage = image !== null;
  const textContainer = Text.CreateElement({
    ...element,
    isSizeLarge,
  });

  if (hasImage) {
    const imageContainer = Image.CreateElement({
      image: image as HTMLImageElement,
    });

    if (imageContainer) {
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = QUOTE_ICON;
      imageContainer.appendChild(iconSpan);

      wrapper.appendChild(imageContainer);
      container.setAttribute(ATTRIBUTE_WITH_IMAGE, '');
    }
  }

  wrapper.classList.add(QUOTE_INLINE_CONTAINER_WRAPPER);
  wrapper.appendChild(textContainer);

  container.classList.add(QUOTE_INLINE_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.setAttribute(ATTRIBUTE_SIZE, size);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateQuoteInlineElement,
  Styles: STYLES_QUOTE_INLINE_ELEMENT,
};