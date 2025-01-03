import { token } from '@universityofmaryland/web-styles-library';
import InlineQuote, { TypeInlineInline } from './inline';
import QuoteText from './elements/text';
import * as Utility from 'utilities';

type TypeQuoteFeatured = TypeInlineInline & {
  isTransparent: boolean;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
};

type TypeQuoteFeaturedText = TypeQuoteFeatured & {
  hasImage: boolean;
};

const SMALL = 500;
const MEDIUM = 900;

const BACKGROUND_TEXTURE_LIGHT = `<svg id="quote_background_light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 850.5 532.1"><path d="M.3,0h332.7L.3,326.6V0Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/><path d="M517.9,532.1h332.7L308.6,0H0v23.6l517.9,508.5Z" fill="#000" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/></svg>`;
const BACKGROUND_TEXTURE_DARK = `<svg id="quote_background_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614.86 300.65"><defs><style>.cls-1{opacity:.25;}.cls-1,.cls-2{fill:#757575;fill-rule:evenodd;isolation:isolate;}.cls-2{opacity:.1;}</style></defs><path class="cls-2" d="m.27,0h332.67L27.46,299.93H.27V0Z"/><path class="cls-1" d="m0,0h308.65l306.21,300.65h-332.67L0,23.59V0Z"/></svg>`;

const ELEMENT_NAME = 'umd-element-quote-featured';
const ATTRIBUTE_HAS_IMAGE = 'has-image';
const ATTRIBUTE_TRANSPARENT = 'transparent';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}="${THEME_MARYLAND}"]`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_HAS_IMAGE}]`;
const IS_TRANSPARENT = `[${ATTRIBUTE_TRANSPARENT}="true"]`;

const QUOTE_FEATURED_CONTAINER = 'quote-featured-container';
const QUOTE_FEATURED_CONTAINER_SPACER = 'quote-featured-container-spacer';
const QUOTE_FEATURED_CONTAINER_WRAPPER = 'quote-featured-container-wrapper';
const QUOTE_FEATURED_TEXTURE = 'quote-featured-texture';
const QUOTE_FEATURED_TEXT = 'quote-featured-text';
const QUOTE_FEATURED_IMAGE = 'quote-featured-image';
const QUOTE_FEATURED_IMAGE_ACTIONS = 'quote-featured-image-actions';

const OVERWRITE_WITH_IMAGE_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_WITH_IMAGE} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;
const OVERWRITE_WITH_IMAGE_QUOTE_TEXT_CONTAINER = `.${QUOTE_FEATURED_CONTAINER}${IS_WITH_IMAGE} .${QuoteText.Elements.container}`;
const OVERWRITE_WITH_IMAGE_QUOTE_TEXT = `.${QUOTE_FEATURED_CONTAINER}${IS_WITH_IMAGE} .${QuoteText.Elements.quoteWrapper}`;

const OVERWRITE_THEME_DARK_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_THEME_DARK} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_MARYLAND_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_THEME_MARYLAND} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;

const OVERWRITE_TRANSPARENT_CONTAINER = `.${QUOTE_FEATURED_CONTAINER}${IS_TRANSPARENT}`;
const OVERWRITE_TRANSPARENT_WRAPPER = `${OVERWRITE_TRANSPARENT_CONTAINER} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;
const OVERWRITE_TRANSPARENT_SPACER = `${OVERWRITE_TRANSPARENT_CONTAINER} .${QUOTE_FEATURED_CONTAINER_SPACER}`;
const OVERWRITE_TRANSPARENT_TEXT = `${OVERWRITE_TRANSPARENT_CONTAINER} .${QUOTE_FEATURED_TEXT}`;

// prettier-ignore
const OverwriteTransparent = `
  ${OVERWRITE_TRANSPARENT_WRAPPER} {
    background-color: transparent;
  }

  ${OVERWRITE_TRANSPARENT_TEXT},
  ${OVERWRITE_TRANSPARENT_SPACER} {
    padding: 0;
  }
`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_WRAPPER} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_MARYLAND_WRAPPER} {
    background-color: ${token.color.red};
  }
`;

// prettier-ignore
const OverwriteWithImage = `
  ${OVERWRITE_WITH_IMAGE_WRAPPER} {
    display: flex;
    flex-direction: column;
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_WITH_IMAGE_WRAPPER} {
      display: flex;
      flex-direction: row;
    }
  }

  ${OVERWRITE_WITH_IMAGE_QUOTE_TEXT_CONTAINER} {
    padding-top: 0;
  }

  ${OVERWRITE_WITH_IMAGE_QUOTE_TEXT} span {
    display: none !important;
  }
`;

// prettier-ignore
const ImageContainer = `
  .${QUOTE_FEATURED_IMAGE} {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -${token.spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${QUOTE_FEATURED_IMAGE} {
      padding: 0 ${token.spacing.lg};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) and (max-width: ${MEDIUM - 1}px) {
    .${QUOTE_FEATURED_IMAGE} {
      margin: 0 auto;
      margin-top: -${token.spacing['8xl']};
      max-width: 300px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_IMAGE}[data-aligned="center"] {
      margin-top: 0;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_IMAGE} {
      padding-left: ${token.spacing['6xl']};
      width: calc(300px + ${token.spacing['6xl']});
    }
  }

  .${QUOTE_FEATURED_IMAGE_ACTIONS} {
    margin-top: ${token.spacing.sm};
  }

  .${QUOTE_FEATURED_IMAGE_ACTIONS} * + * {
    margin-top: ${token.spacing.min};
  }
`;

// prettier-ignore
const TextContainer = `
  .${QUOTE_FEATURED_TEXT} {
    padding: ${token.spacing.lg};
    position: relative;
    width: 100%;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${QUOTE_FEATURED_TEXT} {
      padding: ${token.spacing['2xl']} ${token.spacing['2xl']} ${token.spacing['2xl']} ${token.spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_TEXT} {
      padding: ${token.spacing['4xl']} ${token.spacing['4xl']} ${token.spacing['4xl']} ${token.spacing['4xl']};
    }
  }
`;

// prettier-ignore
const TextureStyles = `
  .${QUOTE_FEATURED_TEXTURE} {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .${QUOTE_FEATURED_TEXTURE} > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 120%;
    object-fit: cover;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${QUOTE_FEATURED_TEXTURE} {
      display: none;
    }
  }
`;

// prettier-ignore
const Wrapper = `
  .${QUOTE_FEATURED_CONTAINER_WRAPPER} {
    background-color: ${token.color.gray.lightest};
    position: relative;
  }
`;

// prettier-ignore
const STYLES_QUOTE_FEATURED_ELEMENT = `
  .${QUOTE_FEATURED_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${QUOTE_FEATURED_CONTAINER_SPACER} {
    padding-top: ${token.spacing.lg};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) and (max-width: ${MEDIUM - 1}px) {
    .${QUOTE_FEATURED_CONTAINER_SPACER} {
      padding-top: ${token.spacing['8xl']};
    }
  }

  ${Wrapper}
  ${TextureStyles}
  ${TextContainer}
  ${ImageContainer}
  ${OverwriteTheme}
  ${OverwriteWithImage}
  ${OverwriteTransparent}
`;

const CreateImageContainer = ({
  image,
  action,
}: {
  image: HTMLImageElement | HTMLElement;
  action?: HTMLElement | null;
}) => {
  const container = document.createElement('div');

  container.classList.add(QUOTE_FEATURED_IMAGE);

  container.appendChild(image);
  if (action) {
    action.classList.add(QUOTE_FEATURED_IMAGE_ACTIONS);
    container.appendChild(action);
  }

  if (window.innerWidth >= MEDIUM) {
    if (image instanceof HTMLImageElement) {
      image.addEventListener('load', () => {
        const parent = image.parentElement as HTMLElement;
        if (!parent) return;

        const aspectRatio = image.offsetHeight / parent.offsetHeight;

        if (aspectRatio < 0.5) {
          container.setAttribute('data-aligned', 'center');
        }
      });
    }
  }

  return container;
};

const CreateTextContainer = (props: TypeQuoteFeaturedText) => {
  const { hasImage, action } = props;
  const container = document.createElement('div');
  const inlineActions = hasImage ? null : action;
  const inlineProps = { ...props, action: inlineActions, image: null };
  const inlineQuote = InlineQuote.CreateElement(inlineProps);
  container.classList.add(QUOTE_FEATURED_TEXT);

  container.appendChild(inlineQuote);

  return container;
};

const CreateTextureContainer = ({
  isThemeDark,
  isThemeMaryland,
}: TypeQuoteFeatured) => {
  const container = document.createElement('div');
  const isDarkText = isThemeDark || isThemeMaryland;
  const backgroundTexture = Utility.markup.create.imageFromSvg({
    SVG: isDarkText ? BACKGROUND_TEXTURE_DARK : BACKGROUND_TEXTURE_LIGHT,
  });

  container.classList.add(QUOTE_FEATURED_TEXTURE);
  container.appendChild(backgroundTexture);

  return container;
};

const CreateQuoteFeaturedElement = (props: TypeQuoteFeatured) => {
  const { isThemeDark, isThemeMaryland, action, image, isTransparent } = props;
  const container = document.createElement('div');
  const spacer = document.createElement('div');
  const wrapper = document.createElement('div');
  const hasImage = !!image;
  const textureContainer = CreateTextureContainer(props);
  const textContainer = CreateTextContainer({ ...props, hasImage });

  wrapper.classList.add(QUOTE_FEATURED_CONTAINER_WRAPPER);

  if (!isTransparent) wrapper.appendChild(textureContainer);
  if (hasImage) wrapper.appendChild(CreateImageContainer({ image, action }));
  wrapper.appendChild(textContainer);

  spacer.classList.add(QUOTE_FEATURED_CONTAINER_SPACER);
  spacer.appendChild(wrapper);

  container.classList.add(QUOTE_FEATURED_CONTAINER);
  container.appendChild(spacer);
  if (isThemeDark) container.setAttribute('theme', THEME_DARK);
  if (isThemeMaryland) container.setAttribute('theme', THEME_MARYLAND);
  if (hasImage) container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');
  if (isTransparent) container.setAttribute(ATTRIBUTE_TRANSPARENT, 'true');

  return container;
};

export default {
  CreateElement: CreateQuoteFeaturedElement,
  Styles: STYLES_QUOTE_FEATURED_ELEMENT,
};
