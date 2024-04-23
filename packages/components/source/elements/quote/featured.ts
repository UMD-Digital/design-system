import { Tokens } from '@universityofmaryland/variables';
import InlineQuote, { TypeInlineInline } from './inline';
import { MarkupCreate } from 'utilities';

type TypeQuoteFeatured = TypeInlineInline & {};

type TypeQuoteFeaturedText = TypeQuoteFeatured & {
  hasImage: boolean;
};

const { Spacing, Colors } = Tokens;
const { Node } = MarkupCreate;

const SMALL = 500;
const MEDIUM = 900;

const BACKGROUND_TEXTURE_LIGHT = `<svg id="quote_background_light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 850.5 532.1"><path d="M.3,0h332.7L.3,326.6V0Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/><path d="M517.9,532.1h332.7L308.6,0H0v23.6l517.9,508.5Z" fill="#000" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/></svg>`;
const BACKGROUND_TEXTURE_DARK = `<svg id="quote_background_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614.86 300.65"><defs><style>.cls-1{opacity:.25;}.cls-1,.cls-2{fill:#757575;fill-rule:evenodd;isolation:isolate;}.cls-2{opacity:.1;}</style></defs><path class="cls-2" d="m.27,0h332.67L27.46,299.93H.27V0Z"/><path class="cls-1" d="m0,0h308.65l306.21,300.65h-332.67L0,23.59V0Z"/></svg>`;

const ELEMENT_NAME = 'umd-element-quote-featured';
const ATTRIBUTE_HAS_IMAGE = 'has-image';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}="${THEME_MARYLAND}"]`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_HAS_IMAGE}]`;

const QUOTE_FEATURED_CONTAINER = 'quote-featured-container';
const QUOTE_FEATURED_CONTAINER_WRAPPER = 'quote-featured-container-wrapper';
const QUOTE_FEATURED_TEXTURE = 'quote-featured-texture';
const QUOTE_FEATURED_TEXT = 'quote-featured-text';
const QUOTE_FEATURED_IMAGE = 'quote-featured-image';
const QUOTE_FEATURED_IMAGE_ACTIONS = 'quote-featured-image-actions';

const OVERWRITE_WITH_IMAGE_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_WITH_IMAGE} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;
const OVERWRITE_WITH_IMAGE_TEXT = `.${QUOTE_FEATURED_CONTAINER}${IS_WITH_IMAGE} .${QUOTE_FEATURED_TEXT}`;

const OVERWRITE_THEME_DARK_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_THEME_DARK} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_MARYLAND_WRAPPER = `.${QUOTE_FEATURED_CONTAINER}${IS_THEME_MARYLAND} .${QUOTE_FEATURED_CONTAINER_WRAPPER}`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_WRAPPER} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_MARYLAND_WRAPPER} {
    background-color: ${Colors.red};
  }
`;

// prettier-ignore
const OverwriteWithImage = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_WITH_IMAGE_WRAPPER} {
      display: flex;
      flex-direction: column;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_WITH_IMAGE_WRAPPER} {
      display: flex;
      flex-direction: row;
    }
  }
`;

// prettier-ignore
const ImageContainer = `
  .${QUOTE_FEATURED_IMAGE} {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${QUOTE_FEATURED_IMAGE} {
      padding: ${Spacing.lg};
      padding-bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${QUOTE_FEATURED_IMAGE} {
      margin: 0 auto;
      align-items: center;
      margin-top: -${Spacing.lg};
      max-width: 400px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_IMAGE} {
      padding-left: ${Spacing['6xl']};
      width: calc(300px + ${Spacing['6xl']});
    }
  }

  .${QUOTE_FEATURED_IMAGE_ACTIONS} {
    margin-top: ${Spacing.sm};
  }

  .${QUOTE_FEATURED_IMAGE_ACTIONS} * + * {
    margin-top: ${Spacing.min};
  }
`;

// prettier-ignore
const TextContainer = `
  .${QUOTE_FEATURED_TEXT} {
    padding: ${Spacing.lg};
    position: relative;
    width: 100%;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${QUOTE_FEATURED_TEXT} {
      padding: ${Spacing['2xl']} ${Spacing['2xl']} ${Spacing['2xl']} ${Spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_TEXT} {
      padding: ${Spacing['4xl']} ${Spacing['4xl']} ${Spacing['4xl']} ${Spacing['4xl']};
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
    background-color: ${Colors.gray.lightest};
  }
`;

// prettier-ignore
const STYLES_QUOTE_FEATURED_ELEMENT = `
  .${QUOTE_FEATURED_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Wrapper}
  ${TextureStyles}
  ${TextContainer}
  ${ImageContainer}
  ${OverwriteTheme}
  ${OverwriteWithImage}
`;

const CreateImageContainer = ({
  image,
  action,
}: {
  image: HTMLElement;
  action?: HTMLElement | null;
}) => {
  const container = document.createElement('div');

  container.classList.add(QUOTE_FEATURED_IMAGE);

  container.appendChild(image);
  if (action) {
    action.classList.add(QUOTE_FEATURED_IMAGE_ACTIONS);
    container.appendChild(action);
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

const CreateTextureContainer = ({ theme }: TypeQuoteFeatured) => {
  const container = document.createElement('div');
  const isDarkText = theme === THEME_DARK || theme === THEME_MARYLAND;
  const backgroundTexture = Node.imageFromSvg({
    SVG: isDarkText ? BACKGROUND_TEXTURE_DARK : BACKGROUND_TEXTURE_LIGHT,
  });

  container.classList.add(QUOTE_FEATURED_TEXTURE);
  container.appendChild(backgroundTexture);

  return container;
};

const CreateQuoteFeaturedElement = (props: TypeQuoteFeatured) => {
  const { theme, action, image } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const hasImage = !!image;
  const textureContainer = CreateTextureContainer(props);
  const textContainer = CreateTextContainer({ ...props, hasImage });

  wrapper.classList.add(QUOTE_FEATURED_CONTAINER_WRAPPER);
  wrapper.appendChild(textureContainer);
  if (hasImage) wrapper.appendChild(CreateImageContainer({ image, action }));
  wrapper.appendChild(textContainer);

  container.classList.add(QUOTE_FEATURED_CONTAINER);
  container.appendChild(wrapper);
  if (theme) container.setAttribute('theme', theme);
  if (hasImage) container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');

  return container;
};

export default {
  CreateElement: CreateQuoteFeaturedElement,
  Styles: STYLES_QUOTE_FEATURED_ELEMENT,
};
