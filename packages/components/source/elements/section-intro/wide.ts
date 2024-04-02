import { Typography, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeSectionIntroWideProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string | null;
};

const { SansLargest } = Typography;
const { Colors, Spacing } = Tokens;

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
    color: ${Colors.white};
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
const ActionStyles = `
  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    * + .${ELEMENT_ACTIONS} {
      margin-top: ${Spacing.md};
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
  const { headline, actions, theme } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
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
