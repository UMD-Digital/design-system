import { Tokens } from '@universityofmaryland/web-elements-styles';
import { Asset } from 'utilities';
import Text, { TypeQuoteTextContainer } from './elements/text';
import Image from './elements/image';

export type TypeInlineInline = TypeQuoteTextContainer & {
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  isSizeLarge: boolean;
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

const TEXT_CONTAINER = Text.Elements.container;
const TEXT_CONTAINER_QUOTE_WRAPPER = Text.Elements.quoteWrapper;

const QUOTE_INLINE_CONTAINER = 'quote-inline-container';
const QUOTE_INLINE_CONTAINER_WRAPPER = 'quote-inline-container-wrapper';

const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_SIZE_LARGE = `[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_WITH_IMAGE}]`;
const IS_WITH_IMAGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_WITH_IMAGE}`;
const IS_SIZE_LARGE_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_SIZE_LARGE}`;
const IS_SIZE_LARGE_WITH_IMAGE_CONTAINER = `${IS_WITH_IMAGE_CONTAINER}${IS_WITH_IMAGE}`;

const IS_TEXT_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_IMAGE_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${Image.Elements.container}`;

const IS_MARYLAND_CONTAINER = `.${QUOTE_INLINE_CONTAINER}${IS_THEME_MARYLAND}`;
const IS_SIZE_LARGE_TEXT_CONTAINER = `${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_TEXT_CONTAINER = `${IS_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_TEXT_QUOTE = `${IS_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}`;
const IS_WITH_IMAGE_SIZE_LARGE_TEXT_CONTAINER = `${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER}`;
const IS_WITH_IMAGE_SIZE_LARGE_TEXT_QUOTE = `${IS_SIZE_LARGE_WITH_IMAGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}`;

// prettier-ignore
const OverwriteThemeMaryland = `
  ${IS_MARYLAND_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
    background-color: ${Colors.gold};
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_MARYLAND_CONTAINER} .${Image.Elements.container} img  {
      border-right: 2px solid ${Colors.gold};
    }
  }
  
  ${IS_MARYLAND_CONTAINER} span svg {
    fill: ${Colors.gold} !important;
  }
`;

// prettier-ignore
const OverwriteSizeLarge = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${QUOTE_INLINE_CONTAINER_WRAPPER} {
      gap: ${Spacing.xl};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${Image.Elements.container} img {
    max-width: 200px;
  }

  ${IS_SIZE_LARGE_CONTAINER} .${Image.Elements.container} span {
    bottom: -7px;
    left: -2px;
    height: 26px;
    width: 36px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${Image.Elements.container} span {
      height: 30px;
      width: 41px;
      top: -14px;
      right: -28px;
      left: inherit;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${IS_SIZE_LARGE_TEXT_CONTAINER} {
      padding-top:  ${Spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_TEXT_CONTAINER} {
      padding-left: ${Spacing.md};
    }
  }

  ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    height: 26px;
    width: 36px;
    top: -${Spacing['2xl']};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_SIZE_LARGE_CONTAINER} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
      left: -${Spacing['6xl']};
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
      padding-top: ${Spacing.lg};
      padding-left: ${Spacing.md};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} {
      padding-left: ${Spacing['4xl']};
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    position: relative;
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
    content: '';
    position: absolute;
    left: -${Spacing.md};
    top: 7px;
    height: calc(100% - 14px);
    width: 2px;
    display: block;
    background-color: ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER}:before {
      left: -${Spacing.md};
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    position: absolute;
    left: -${Spacing.md};
    top: -${Spacing.lg};
    height: 15px;
    width: 22px;
    display: block;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
      position: absolute;
      left: -${Spacing['4xl']};
      top: 0;
    }
  }

  ${IS_TEXT_CONTAINER_OVERWRITE} .${TEXT_CONTAINER_QUOTE_WRAPPER} svg {
    fill: ${Colors.red};
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

const CreateQuoteInlineElement = (props: TypeInlineInline) => {
  const { isSizeLarge, image, isThemeDark, isThemeMaryland } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const hasImage = image !== null;
  const textContainer = Text.CreateElement({
    ...props,
  });

  if (hasImage) {
    const imageContainer = Image.CreateElement({
      image: image as HTMLImageElement,
    });

    if (imageContainer) {
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = Asset.icon.QUOTE;
      imageContainer.appendChild(iconSpan);

      wrapper.appendChild(imageContainer);
      container.setAttribute(ATTRIBUTE_WITH_IMAGE, '');
    }
  }

  wrapper.classList.add(QUOTE_INLINE_CONTAINER_WRAPPER);
  wrapper.appendChild(textContainer);

  container.classList.add(QUOTE_INLINE_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');
  if (isThemeMaryland) container.setAttribute(ATTRIBUTE_THEME, THEME_MARYLAND);
  if (isSizeLarge) container.setAttribute(ATTRIBUTE_SIZE, SIZE_LARGE);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateQuoteInlineElement,
  Styles: STYLES_QUOTE_INLINE_ELEMENT,
};
