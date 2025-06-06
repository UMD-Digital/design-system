import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import Text, { TypeQuoteTextContainer } from './elements/text';
import Image from './elements/image';

export type TypeInlineInline = TypeQuoteTextContainer & {
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  isSizeLarge: boolean;
  image: HTMLElement | null;
};

const SMALL = 500;

const ELEMENT_NAME = 'umd-element-quote-inline';
const ATTRIBUTE_WITH_IMAGE = 'has-image';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const THEME_MARYLAND = 'maryland';
const SIZE_LARGE = 'large';

const TEXT_CONTAINER = Text.elements.container;
const TEXT_CONTAINER_QUOTE_WRAPPER = Text.elements.quoteWrapper;

const QUOTE_INLINE_CONTAINER = 'quote-inline-container';
const QUOTE_INLINE_CONTAINER_WRAPPER = 'quote-inline-container-wrapper';

const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_SIZE_LARGE = `[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_WITH_IMAGE}]`;
const IS_WITH_IMAGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_WITH_IMAGE}`;
const IS_SIZE_LARGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_SIZE_LARGE}`;
const IS_SIZE_LARGE_WITH_IMAGE_CONTAINER = `${IS_WITH_IMAGE_CONTAINER}${IS_WITH_IMAGE}`;

const IS_TEXT_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_IMAGE_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${Image.elements.container}`;

const IS_MARYLAND_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_THEME_MARYLAND}`;
const IS_SIZE_LARGE_TEXT_CONTAINER = `${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_TEXT_CONTAINER = `${IS_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_TEXT_QUOTE = `${IS_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}`;
const IS_WITH_IMAGE_SIZE_LARGE_TEXT_CONTAINER = `${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_SIZE_LARGE_TEXT_QUOTE = `${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}`;

// prettier-ignore
const OverwriteThemeMaryland = `
  ${IS_MARYLAND_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
    background-color: ${token.color.gold};
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_MARYLAND_CONTAINER} .${Image.elements.container} img  {
      border-right: 2px solid ${token.color.gold};
    }
  }
  
  ${IS_MARYLAND_CONTAINER} span svg {
    fill: ${token.color.gold} !important;
  }
`;

// prettier-ignore
const OverwriteSizeLarge = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${QUOTE_INLINE_CONTAINER_WRAPPER} {
      gap: ${token.spacing.xl};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${Image.elements.container} img {
    max-width: 200px;
  }

  ${IS_SIZE_LARGE_CONTAINER} .${Image.elements.container} span {
    bottom: -7px;
    left: -2px;
    height: 26px;
    width: 36px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${Image.elements.container} span {
      height: 30px;
      width: 41px;
      top: -14px;
      right: -28px;
      left: inherit;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_SIZE_LARGE_TEXT_CONTAINER} {
      padding-top:  ${token.spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_TEXT_CONTAINER} {
      padding-left: ${token.spacing.md};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    height: 26px;
    width: 36px;
    top: -${token.spacing['2xl']};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
      left: -${token.spacing['6xl']};
      top: 0;
    }
  }
`;

// prettier-ignore
const OverwriteSizedLargeWithImage = `
  ${IS_WITH_IMAGE_SIZE_LARGE_TEXT_CONTAINER} {
    padding-top: 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_WITH_IMAGE_SIZE_LARGE_TEXT_QUOTE} {
      margin-left: 0;
      padding-left: 0;
    }
  }

  ${IS_WITH_IMAGE_SIZE_LARGE_TEXT_QUOTE} span {
    display: none;
  }
`;

// prettier-ignore
const OverwriteWithImage = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_WITH_IMAGE_TEXT_CONTAINER} {
      padding-left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_WITH_IMAGE_TEXT_QUOTE}:before {
      display: none;
    }
  }
`;

// prettier-ignore
const TextContainer = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} {
      padding-top: ${token.spacing.lg};
      padding-left: ${token.spacing.md};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} {
      padding-left: ${token.spacing['4xl']};
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    position: relative;
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
    content: '';
    position: absolute;
    left: -${token.spacing.md};
    top: 7px;
    height: calc(100% - 14px);
    width: 2px;
    display: block;
    background-color: ${token.color.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
      left: -${token.spacing.md};
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    position: absolute;
    left: -${token.spacing.md};
    top: -${token.spacing.lg};
    height: 15px;
    width: 22px;
    display: block;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
      position: absolute;
      left: -${token.spacing['4xl']};
      top: 0;
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} svg {
    fill: ${token.color.red};
  }
`

// prettier-ignore
const ImageContainer = `
  ${IS_IMAGE_CONTAINER_OVERWRITE} {
    margin-bottom: ${token.spacing.sm};
    position: relative;
  }

  ${IS_IMAGE_CONTAINER_OVERWRITE} img {
    max-width: 160px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_IMAGE_CONTAINER_OVERWRITE} img  {
      border-right: 2px solid ${token.color.red};
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
    fill: ${token.color.red};
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
      gap: ${token.spacing.lg};
    }
  }

  ${ImageContainer}
  ${TextContainer}
  ${OverwriteWithImage}
  ${OverwriteSizeLarge}
  ${OverwriteSizedLargeWithImage}
  ${OverwriteThemeMaryland}
`;

export default (props: TypeInlineInline) => {
  const { isSizeLarge, image, isThemeDark, isThemeMaryland } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const hasImage = image !== null;
  const textContainer = Text.create({
    ...props,
  });
  let styles = STYLES_QUOTE_INLINE_ELEMENT;

  if (hasImage) {
    const imageContainer = Image.create({
      image: image as HTMLImageElement,
    });

    if (imageContainer) {
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = Utility.asset.icon.QUOTE;
      imageContainer.element.appendChild(iconSpan);

      wrapper.appendChild(imageContainer.element);
      styles += imageContainer.styles;

      container.setAttribute(ATTRIBUTE_WITH_IMAGE, '');
    }
  }

  wrapper.classList.add(QUOTE_INLINE_CONTAINER_WRAPPER);
  wrapper.appendChild(textContainer.element);
  styles += textContainer.styles;

  container.classList.add(QUOTE_INLINE_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');
  if (isThemeMaryland) container.setAttribute(ATTRIBUTE_THEME, THEME_MARYLAND);
  if (isSizeLarge) container.setAttribute(ATTRIBUTE_SIZE, SIZE_LARGE);
  container.appendChild(wrapper);

  return { element: container, styles };
};
