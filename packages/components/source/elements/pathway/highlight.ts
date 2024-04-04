import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CreatePathwayTextContainer,
  TypePathwayTextContainer,
  ELEMENT_TEXT_CONTAINER,
} from './elements/text';

type TypePathwayHighlightContainer = {
  quote: HTMLElement | null;
  attribution: HTMLElement | null;
};

type TypePathwayHighlightProps = TypePathwayTextContainer &
  TypePathwayHighlightContainer;

const { Colors, Spacing } = Tokens;
const { Lock } = Layout;

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

const OVERWRITE_TEXT_CONTAINER = `.${PATHWAY_HIGHLIGHT_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_THEME_DARK_HIGHLIGHT = `.${PATHWAY_HIGHLIGHT_CONTAINER}${IS_THEME_DARK} .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER}`;

// prettier-ignore
const OverwriteThemeDarkStyles = `
  ${OVERWRITE_THEME_DARK_HIGHLIGHT} {
    background-color: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_HIGHLIGHT} * {
   color: ${Colors.white};
  }
`

// prettier-ignore
const OverwriteTextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-bottom: ${Spacing.md};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${Spacing['4xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-right: ${Spacing['6xl']};
    }
  }
`;

// prettier-ignore
const HighlightContainer = `
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
    padding: ${Spacing['5xl']} ${Spacing.md} ${Spacing.md} ${Spacing.md};
    background-color: ${Colors.gray.lightest};
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER} {
      padding: ${Spacing['8xl']} ${Spacing['xl']};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER} {
      padding-left: ${Spacing['xl']};
      position: relative;
    }
  }
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
    content: '';
    position: absolute;
    background-color: ${Colors.red};
  }
  
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
      top: ${Spacing['2xl']};
      width: ${Spacing['5xl']};
      height: 2px;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_WRAPPER}:before {
      left: 0;
      width: 2px;
      height: 100%;
      background-color: ${Colors.red};
    }
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT}`]: Typography.SansLarger,
    },
  })}
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT},
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_TEXT} * {
    font-weight: 700;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION}`]: Typography.SansMedium,
    },
  })}
  
  .${PATHWAY_HIGHLIGHT_COLUMN_CONTAINER_ATTRIBUTION} {
    margin-top: ${Spacing.sm};
  }
`

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_LOCK}`]: Lock['.base'],
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
  const { theme } = element;
  const container = document.createElement('div');
  const lock = document.createElement('div');

  const textContainer = CreatePathwayTextContainer(element);
  const highlightContainer = CreateHighlightColumn(element);

  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  container.classList.add(PATHWAY_HIGHLIGHT_CONTAINER);
  lock.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_LOCK);

  lock.appendChild(textContainer);
  lock.appendChild(highlightContainer);

  container.appendChild(lock);
  return container;
};

export default {
  CreateElement: CreatePathwayHighlightElement,
  Styles: STYLES_PATHWAY_HIGHLIGHT,
};
