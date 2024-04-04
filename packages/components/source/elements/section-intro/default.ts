import { Typography, Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeSectionIntroDefaultProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  text?: HTMLElement | null;
  hasSeparator?: boolean;
  theme?: string | null;
};

const { SansLargest, SansLarger, SansMedium } = Typography;
const { Colors, Spacing, MaxWidth } = Tokens;
const { GridColumnAndRows } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_WITH_SEPARATOR = 'include-separator';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-section-intro-default';
const ELEMENT_LIST_CONTAINER = 'intro-default-container';
const ELEMENT_LIST_CONTAINER_WRAPPER = 'intro-default-container-wrapper';
const ELEMENT_HEADLINE = 'intro-default-headline';
const ELEMENT_RICH_TEXT = 'intro-default-rich-text';
const ELEMENT_RICH_TEXT_SMALL = 'intro-default-rich-text-small';
const ELEMENT_ACTIONS = 'intro-default-actions';

const OVERWRITE_SEPARATOR_WRAPPER = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_WITH_SEPARATOR}] .${ELEMENT_LIST_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_DARK_CONTAINTER = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINTER} * {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const OverwriteSeparator = `
  ${OVERWRITE_SEPARATOR_WRAPPER} {
    padding-top: ${Spacing['6xl']};
    position: relative;
  }

  ${OVERWRITE_SEPARATOR_WRAPPER}:before {
    content: '';
    background-color: ${Colors.red};
    position: absolute;
    height: ${Spacing['4xl']};
    width: 2px;
    left: calc(50% - 1px);
    top: 0;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADLINE}`]: SansLargest,
    },
  })}

  .${ELEMENT_HEADLINE} {
    color: ${Colors.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_RICH_TEXT},
  * + .${ELEMENT_RICH_TEXT_SMALL} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT}`]: SansLarger,
    },
  })}

  .${ELEMENT_RICH_TEXT} {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT_SMALL}`]: SansMedium,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENT_ACTIONS} {
    margin-top: ${Spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ACTIONS}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}

  .${ELEMENT_ACTIONS} {
    justify-content: center;
    align-items: center;
  }
`;

// prettier-ignore
const STYLES_SECTION_INTRO_DEFAULT_ELEMENT = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: ${MaxWidth.small};
    margin: 0 auto;
  }

  .${ELEMENT_LIST_CONTAINER_WRAPPER} {
    text-align: center;
  }

  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${OverwriteSeparator}
  ${OverwriteTheme}
`;

const CreateSectionIntroDefaultElement = (
  element: TypeSectionIntroDefaultProps,
) => {
  const { headline, actions, text, theme, hasSeparator = false } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_LIST_CONTAINER);
  wrapper.classList.add(ELEMENT_LIST_CONTAINER_WRAPPER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  if (hasSeparator) container.setAttribute(ATTRIBUTE_WITH_SEPARATOR, '');

  if (headline) {
    headline.classList.add(ELEMENT_HEADLINE);
    wrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(headline ? ELEMENT_RICH_TEXT_SMALL : ELEMENT_RICH_TEXT);
    wrapper.appendChild(text);
  }

  if (actions) {
    actions.classList.add(ELEMENT_ACTIONS);
    wrapper.appendChild(actions);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateSectionIntroDefaultElement,
  Styles: STYLES_SECTION_INTRO_DEFAULT_ELEMENT,
};
