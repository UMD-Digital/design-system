import { Typography, Tokens, Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeSectionIntroDefaultProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  hasSeparator?: boolean;
};

const { SansLargest } = Typography;
const { Colors, Spacing } = Tokens;
const { GridColumnAndRows } = Layout;

const ATTRIBUTE_WITH_SEPARATOR = 'include-separator';

const ELEMENT_NAME = 'umd-section-intro-default';
const ELEMENT_LIST_CONTAINER = 'intro-default-container';
const ELEMENT_LIST_CONTAINER_WRAPPER = 'intro-default-container-wrapper';
const ELEMENT_HEADLINE = 'intro-default-headline';
const ELEMENT_ACTIONS = 'intro-default-actions';

const OVERWRITE_SEPARATOR_WRAPPER = `.${ELEMENT_LIST_CONTAINER}[${ATTRIBUTE_WITH_SEPARATOR}] .${ELEMENT_LIST_CONTAINER_WRAPPER}`;

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
    max-width: 720px;
    margin: 0 auto;
  }

  .${ELEMENT_LIST_CONTAINER_WRAPPER} {
    text-align: center;
  }

  ${HeadlineStyles}
  ${ActionStyles}
  ${OverwriteSeparator}
`;

const CreateSectionIntroDefaultElement = (
  element: TypeSectionIntroDefaultProps,
) => {
  const { headline, actions, hasSeparator = false } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_LIST_CONTAINER);
  wrapper.classList.add(ELEMENT_LIST_CONTAINER_WRAPPER);

  if (hasSeparator) container.setAttribute(ATTRIBUTE_WITH_SEPARATOR, '');

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
  CreateElement: CreateSectionIntroDefaultElement,
  Styles: STYLES_SECTION_INTRO_DEFAULT_ELEMENT,
};
