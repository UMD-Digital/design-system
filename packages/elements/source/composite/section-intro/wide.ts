import { typography, token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeSectionIntroWideProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { convertJSSObjectToStyles } = Utility.styles;

const TABLET = 500;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-section-intro-wide';
const ELEMENT_LIST_CONTAINER = 'intro-wide-container';
const ELEMENT_LIST_CONTAINER_WRAPPER = 'intro-wide-container-wrapper';
const ELEMENT_HEADLINE = 'intro-wide-headline';
const ELEMENT_ACTIONS = 'intro-wide-actions';

const OVERWRITE_THEME_DARK_CONTAINTER = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINTER} * {
    color: ${token.color.white};
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADLINE}`]: typography.sans.largest,
    },
  })}

  .${ELEMENT_HEADLINE} {
    color: ${token.color.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const ActionStyles = `
  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    * + .${ELEMENT_ACTIONS} {
      margin-top: ${token.spacing.md};
    }
  }
`;

// prettier-ignore
const STYLES_SECTION_INTRO_WIDE_ELEMENT = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_LIST_CONTAINER_WRAPPER} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  ${HeadlineStyles}
  ${ActionStyles}
  ${OverwriteTheme}
`;

const CreateSectionIntroWideElement = (element: TypeSectionIntroWideProps) => {
  const { headline, actions, isThemeDark } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  container.classList.add(ELEMENT_LIST_CONTAINER);
  wrapper.classList.add(ELEMENT_LIST_CONTAINER_WRAPPER);

  if (headline) {
    headline.classList.add(ELEMENT_HEADLINE);
    wrapper.appendChild(headline);
  }

  if (actions) {
    actions.classList.add(ELEMENT_ACTIONS);
    wrapper.appendChild(actions);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateSectionIntroWideElement,
  Styles: STYLES_SECTION_INTRO_WIDE_ELEMENT,
};
