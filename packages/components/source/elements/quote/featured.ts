import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import InlineQuote, { TypeInlineInline } from './inline';
import { Styles } from 'utilities';

type TypeQuoteFeatured = TypeInlineInline & {};

const { Spacing, Colors } = Tokens;

const SMALL = 500;
const MEDIUM = 900;

const ELEMENT_NAME = 'umd-element-quote-featured';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}="${THEME_MARYLAND}"]`;

const QUOTE_FEATURED_CONTAINER = 'quote-featured-container';
const QUOTE_FEATURED_CONTAINER_WRAPPER = 'quote-featured-container-wrapper';

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
const STYLES_QUOTE_FEATURED_ELEMENT = `
  .${QUOTE_FEATURED_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${QUOTE_FEATURED_CONTAINER_WRAPPER} {
    padding: ${Spacing.lg};
    background-color: ${Colors.gray.lightest};
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

  ${OverwriteTheme}
`;

const CreateQuoteFeaturedElement = (props: TypeQuoteFeatured) => {
  const { theme } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const inlineQuote = InlineQuote.CreateElement(props);

  wrapper.classList.add(QUOTE_FEATURED_CONTAINER_WRAPPER);
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
