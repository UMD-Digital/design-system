import {
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';

type TypePathwayHighlightContainer = {
  quote: HTMLElement | null;
  attribution: HTMLElement | null;
};

type TypePathwayHighlightProps = TypePathwayTextContainer &
  TypePathwayHighlightContainer;

const { convertJSSObjectToStyles } = Utility.styles;

const MEDIUM = 1000;
const LARGE = 1200;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

const ELEMENT_NAME = 'umd-element-pathway-highlight';
const PATHWAY_HIGHLIGHT_CONTAINER = 'pathway-highlight-container';
const PATHWAY_HIGHLIGHT_CONTAINER_LOCK = 'pathway-highlight-container-lock';
const PATHWAY_HIGHLIGHT_COLUMN_CONTAINER = 'pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER =
  'pathway-highlight-column-wrapper';
const PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT = 'pathway-highlight-text';
const PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION =
  'pathway-highlight-attribution';

const OVERWRITE_TEXT_CONTAINER = `.${PATHWAY_HIGHLIGHT_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_THEME_DARK_HIGHLIGHT = `.${PATHWAY_HIGHLIGHT_CONTAINER}${IS_THEME_DARK} .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER}`;

// prettier-ignore
const OverwriteThemeDarkStyles = `
  ${OVERWRITE_THEME_DARK_HIGHLIGHT} {
    background-color: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_HIGHLIGHT} * {
   color: ${token.color.white};
  }
`

// prettier-ignore
const OverwriteTextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-bottom: ${token.spacing.md};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${token.spacing['4xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${token.spacing['6xl']};
    }
  }
`;

// prettier-ignore
const HighlightContainer = `
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
    padding: ${token.spacing['5xl']} ${token.spacing.md} ${token.spacing.md} ${token.spacing.md};
    background-color: ${token.color.gray.lightest};
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
      padding: ${token.spacing['4xl']} ${token.spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
      padding: ${token.spacing['8xl']} ${token.spacing['xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER} {
      padding-left: ${token.spacing['xl']};
      position: relative;
    }
  }
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
    content: '';
    position: absolute;
    background-color: ${token.color.red};
  }
  
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
      top: ${token.spacing['2xl']};
      width: ${token.spacing['5xl']};
      height: 2px;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
      left: 0;
      width: 2px;
      height: 100%;
      background-color: ${token.color.red};
    }
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT}`]: typography.sans.larger,
    },
  })}
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT},
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT} * {
    font-weight: 700;
    color: ${token.color.black};
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION}`]: typography.sans.medium,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION} *`]: typography.sans.medium,
    },
  })}
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION},
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION} * {
    margin-top: ${token.spacing.sm};
    color: ${token.color.black};
  }
`

const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_LOCK} > * {
      width: 50%;
    }
  }
`;

// prettier-ignore
const STYLES_PATHWAY_HIGHLIGHT = `
  .${PATHWAY_HIGHLIGHT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${LockStyles}
  ${OverwriteTextContainerStyles}
  ${HighlightContainer}
  ${OverwriteThemeDarkStyles}
`;

const CreateHighlightColumn = ({
  quote,
  attribution,
}: TypePathwayHighlightContainer) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER);

  if (quote) {
    quote.classList.add(PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT);
    wrapper.appendChild(quote);
  }

  if (attribution) {
    const attributionElement = document.createElement('div');
    attributionElement.classList.add(
      PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION,
    );
    attributionElement.appendChild(attribution);
    wrapper.appendChild(attributionElement);
  }

  container.classList.add(PATHWAY_HIGHLIGHT_COLUMN_CONTAINER);
  container.appendChild(wrapper);

  return container;
};

const CreatePathwayHighlightElement = (element: TypePathwayHighlightProps) => {
  const { isThemeDark } = element;
  const container = document.createElement('div');
  const lock = document.createElement('div');

  const textContainer = TextContainer.CreateElement(element);
  const highlightContainer = CreateHighlightColumn(element);
  let styles = STYLES_PATHWAY_HIGHLIGHT;

  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  container.classList.add(PATHWAY_HIGHLIGHT_CONTAINER);
  lock.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_LOCK);

  lock.appendChild(textContainer.element);
  styles += textContainer.styles;

  lock.appendChild(highlightContainer);

  container.appendChild(lock);
  return { element: container, styles };
};

export default {
  CreateElement: CreatePathwayHighlightElement,
};
