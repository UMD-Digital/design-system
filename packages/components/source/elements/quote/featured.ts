import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import InlineQuote, { TypeInlineInline } from './inline';
import { MarkupCreate } from 'utilities';

type TypeQuoteFeatured = TypeInlineInline & {};

const { Spacing, Colors } = Tokens;
const { Node } = MarkupCreate;

const SMALL = 500;
const MEDIUM = 900;

const BACKGROUND_TEXTURE_LIGHT = `<svg id="quote_background_light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 850.5 532.1"><path d="M.3,0h332.7L.3,326.6V0Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/><path d="M517.9,532.1h332.7L308.6,0H0v23.6l517.9,508.5Z" fill="#000" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/></svg>`;
const BACKGROUND_TEXTURE_DARK = `<svg id="quote_background_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 851 534"><path d="M.3,1h332.7L.3,327.6V1Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".1" stroke-width="0"/><path d="M517.9,533h332.7L308.7,1H.1v23.6l517.8,508.4Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".2" stroke-width="0"/></svg>`;

const ELEMENT_NAME = 'umd-element-quote-featured';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}="${THEME_MARYLAND}"]`;

const QUOTE_FEATURED_CONTAINER = 'quote-featured-container';
const QUOTE_FEATURED_CONTAINER_WRAPPER = 'quote-featured-container-wrapper';
const QUOTE_FEATURED_TEXTURE = 'quote-featured-texture';

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
const TextureStyles = `
  .${QUOTE_FEATURED_TEXTURE} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${QUOTE_FEATURED_CONTAINER_WRAPPER} {
    padding: ${Spacing.lg};
    background-color: ${Colors.gray.lightest};
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${QUOTE_FEATURED_CONTAINER_WRAPPER} {
      padding: ${Spacing['2xl']} ${Spacing['2xl']} ${Spacing['2xl']} ${Spacing['2xl']};
  
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${QUOTE_FEATURED_CONTAINER_WRAPPER} {
      padding: ${Spacing['4xl']} ${Spacing['4xl']} ${Spacing['4xl']} ${Spacing['4xl']};
    }
  }
`;

// prettier-ignore
const STYLES_QUOTE_FEATURED_ELEMENT = `
  .${QUOTE_FEATURED_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
  }

  ${WrapperStyles}
  ${TextureStyles}
  ${OverwriteTheme}
`;

const CreateQuoteFeaturedElement = (props: TypeQuoteFeatured) => {
  const { theme } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const inlineQuote = InlineQuote.CreateElement(props);
  const isDarkText = theme === THEME_DARK || theme === THEME_MARYLAND;
  const backgroundTexture = Node.imageFromSvg({
    SVG: isDarkText ? BACKGROUND_TEXTURE_DARK : BACKGROUND_TEXTURE_LIGHT,
  });

  backgroundTexture.classList.add(QUOTE_FEATURED_TEXTURE);

  wrapper.classList.add(QUOTE_FEATURED_CONTAINER_WRAPPER);
  wrapper.appendChild(backgroundTexture);
  wrapper.appendChild(inlineQuote);

  container.classList.add(QUOTE_FEATURED_CONTAINER);
  container.appendChild(wrapper);
  if (theme) container.setAttribute('theme', theme);

  return container;
};

export default {
  CreateElement: CreateQuoteFeaturedElement,
  Styles: STYLES_QUOTE_FEATURED_ELEMENT,
};
