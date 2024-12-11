import { Tokens, Typography } from '@universityofmaryland/variables';
import { Performance, Styles } from 'utilities';

type TypeHeadlineText = { headline?: HTMLElement | null };
type TypeBodyText = { text?: HTMLElement | null };
type TypeAccordionState = { isOpen: boolean };
type StateProps = {
  hasAnimation?: boolean;
};

type TypeAccordionProps = TypeHeadlineText &
  TypeBodyText & {
    isThemeLight?: boolean;
    isThemeDark?: boolean;
    isStateOpen: boolean;
  };

type TypeHeadlineProps = TypeHeadlineText &
  TypeAccordionState & {
    SetClosed: (arg: StateProps) => void;
    SetOpen: (arg: StateProps) => void;
  };

type TypeBodyProps = TypeBodyText & TypeAccordionState;

type ActionAnimationProps = StateProps & {
  container: HTMLDivElement;
  isOpening: boolean;
};

const { Colors, Spacing } = Tokens;
const { convertJSSObjectToStyles } = Styles;
const { Debounce } = Performance;
const { SansMedium, SansLarge } = Typography;

const SMALL = 480;

const ELEMENT_NAME = 'umd-element-accordion-item';
const ELEMENT_DECLARATION = 'accordion-declaration';
const ELEMENT_CONTAINER = 'accordion-container';
const ELEMENT_HEADLINE = 'accordion-headline';
const ELEMENT_BODY_WRAPPER = 'accordion-body-wrapper';
const ELEMENT_BODY = 'accordion-body';

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const ANIMATION_TIME = 500;

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

const OVERWRITE_THEME_DARK_HEADLINE = `.${ELEMENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_HEADLINE}`;
const OVERWRITE_THEME_DARK_BODY_WRAPPER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_BODY_WRAPPER}`;
const OVERWRITE_THEME_DARK_BODY = `.${ELEMENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_BODY}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_HEADLINE} {
    background-color: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_HEADLINE} > * {
    color: ${Colors.white}
  }

  ${OVERWRITE_THEME_DARK_HEADLINE}:before,
  ${OVERWRITE_THEME_DARK_HEADLINE}:after {
    background-color: ${Colors.gold};
  }

  ${OVERWRITE_THEME_DARK_HEADLINE}[aria-expanded='true'],
  ${OVERWRITE_THEME_DARK_HEADLINE}:hover,
  ${OVERWRITE_THEME_DARK_HEADLINE}:focus {
    background-color: ${Colors.gray.darker};
    border-top: 2px solid ${Colors.gold};
  }

  ${OVERWRITE_THEME_DARK_HEADLINE}[aria-expanded='true'] > *,
  ${OVERWRITE_THEME_DARK_HEADLINE}:hover > *,
  ${OVERWRITE_THEME_DARK_HEADLINE}:focus > * {
    color: ${Colors.gold};
  }

  ${OVERWRITE_THEME_DARK_BODY_WRAPPER} {
    background-color: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_BODY},
  ${OVERWRITE_THEME_DARK_BODY} * {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const bodyStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BODY_WRAPPER}`]: SansMedium
    },
  })}

  .${ELEMENT_BODY_WRAPPER} {
    background-color: ${Colors.gray.lightest};
    height: 0;
    overflow: hidden;
    display: none;
  }

  .${ELEMENT_BODY} {
    padding: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_BODY} {
      padding: ${Spacing.lg};
    }
  }

  .${ELEMENT_BODY} > * {
    margin-top: ${Spacing.sm};
  }

  .${ELEMENT_BODY} > *:first-child {
    margin-top: 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_BODY} > * {
      margin-top: ${Spacing.lg};
    }
  }
`;

// prettier-ignore
const headlineStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADLINE}`]: SansLarge,
    },
  })}

  .${ELEMENT_HEADLINE} {
    display: flex;
    border-top: 2px solid transparent;
    padding: ${Spacing.md};
    padding-right: ${Spacing['4xl']};
    background-color: ${Colors.gray.lightest};
    position: relative;
    transition: background 0.5s, border 0.5s, color 0.5s, padding 0.5s;
    width: 100%;
    text-align: left;
    color: ${Colors.black};
  }

  .${ELEMENT_HEADLINE} > * {
    color: ${Colors.black};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_HEADLINE} {
      padding: ${Spacing.lg};
      padding-right: ${Spacing['6xl']}
    }
  }

  .${ELEMENT_HEADLINE}:before,
  .${ELEMENT_HEADLINE}:after {
    content: '';
    background-color: ${Colors.red};
    position: absolute;
    right: ${Spacing.md};
    transition: background 0.5s, height 0.5s, right 0.5s, top 0.5s,
    transform 0.5s, width 0.5s;
  }

  .${ELEMENT_HEADLINE}:before {
    height: 4px;
    top: calc(50% - 2px);
    width: 16px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_HEADLINE}:before {
      width: 20px;
      right: 32px;
    }
  }

  .${ELEMENT_HEADLINE}:after {
    height: 16px;
    top: calc(50% - 8px);
    right: calc(${Spacing.md} + 6px);
    width: 4px;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_HEADLINE}:after {
      height: 20px;
      top: calc(50% - 10px);
      right: calc(${Spacing.lg} + 8px);
    }
  }

  .${ELEMENT_HEADLINE}[aria-expanded='true'],
  .${ELEMENT_HEADLINE}:hover,
  .${ELEMENT_HEADLINE}:focus {
    background-color: ${Colors.gray.lightest};
    border-top: 2px solid ${Colors.red};
  }

  .${ELEMENT_HEADLINE}[aria-expanded='true'] > *,
  .${ELEMENT_HEADLINE}:hover > *,
  .${ELEMENT_HEADLINE}:focus > * {
    color: ${Colors.red};
  }

  .${ELEMENT_HEADLINE}[aria-expanded='true']:after {
    transform: rotate(90deg);
  }
`;

const STYLES_ACCORDION_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${headlineStyles}
  ${bodyStyles}
  ${OverwriteThemeDark}
`;

const CreateBody = ({ text, isOpen }: TypeBodyProps) => {
  const contentWrapper = document.createElement('div');

  contentWrapper.classList.add(ELEMENT_BODY_WRAPPER);

  if (text) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(ELEMENT_BODY);
    contentWrapper.ariaHidden = isOpen ? 'false' : 'true';
    wrapper.appendChild(text);
    contentWrapper.appendChild(wrapper);

    return contentWrapper;
  }

  return null;
};

const CreateHeadline = ({
  headline,
  isOpen,
  SetClosed,
  SetOpen,
}: TypeHeadlineProps) => {
  const headlineContainer = document.createElement('button');

  headlineContainer.classList.add(ELEMENT_HEADLINE);
  headlineContainer.ariaExpanded = isOpen ? 'true' : 'false';

  if (headline) {
    headlineContainer.appendChild(headline);

    headlineContainer.addEventListener('click', () => {
      const isExpanded = headlineContainer.ariaExpanded == 'true';

      if (isExpanded) {
        SetClosed({ hasAnimation: true });
      } else {
        SetOpen({ hasAnimation: true });
      }
    });

    return headlineContainer;
  }

  return null;
};

const ActionAnimation = ({
  container,
  isOpening = true,
  hasAnimation = true,
}: ActionAnimationProps) => {
  const headlineContainer = container.querySelector(
    'button',
  ) as HTMLButtonElement;
  const bodyWrapperElement = container.querySelector(
    `.${ELEMENT_BODY_WRAPPER}`,
  ) as HTMLElement;
  const bodyElement = container.querySelector(
    `.${ELEMENT_BODY}`,
  ) as HTMLElement;

  if (!headlineContainer || !bodyWrapperElement || !bodyElement) {
    throw new Error('headlineContainer or bodyWrapperElement is not found');
  }

  if (hasAnimation)
    bodyWrapperElement.style.transition = `height ${ANIMATION_TIME}ms ease-in-out`;

  if (isOpening) {
    bodyWrapperElement.style.display = 'block';

    setTimeout(() => {
      headlineContainer.ariaExpanded = 'true';
      bodyWrapperElement.ariaHidden = 'false';
    }, 100);
  } else {
    headlineContainer.ariaExpanded = 'false';
    bodyWrapperElement.ariaHidden = 'true';

    setTimeout(() => {
      bodyWrapperElement.style.display = 'none';
    }, ANIMATION_TIME + 50);
  }

  setTimeout(() => {
    const bodyHeight = bodyElement.offsetHeight;
    bodyWrapperElement.style.height = isOpening ? `${bodyHeight}px` : '0';
  }, 100);

  setTimeout(() => {
    bodyWrapperElement.style.transition = 'none';
  }, 100 + ANIMATION_TIME);
};

const CreateAccordionElement = (props: TypeAccordionProps) =>
  (() => {
    const { isThemeDark, isThemeLight, isStateOpen = false } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    let isOpen = isStateOpen;

    const SetOpen = (props: StateProps) => {
      ActionAnimation({ ...props, container, isOpening: true });
      isOpen = true;
    };
    const SetClosed = (props: StateProps) => {
      ActionAnimation({ ...props, container, isOpening: false });
      isOpen = false;
    };
    const EventSize = () => {
      if (!isOpen) return;
      const bodyElement = container.querySelector(
        `.${ELEMENT_BODY}`,
      ) as HTMLElement;
      const bodyWrapperElement = container.querySelector(
        `.${ELEMENT_BODY_WRAPPER}`,
      ) as HTMLElement;

      bodyWrapperElement.style.height = `${bodyElement.offsetHeight}px`;
    };
    const resize = () => {
      EventSize();
    };

    const headline = CreateHeadline({ ...props, isOpen, SetClosed, SetOpen });
    const body = CreateBody({ ...props, isOpen });

    if (headline) container.appendChild(headline);
    if (body) container.appendChild(body);

    container.classList.add(ELEMENT_CONTAINER);
    if (isThemeLight) container.setAttribute(ATTRIBUTE_THEME, 'light');
    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');

    declaration.appendChild(container);
    declaration.classList.add(ELEMENT_DECLARATION);

    if (isStateOpen) {
      SetOpen({ hasAnimation: false });
    }

    window.addEventListener('resize', Debounce(resize, 20));

    return {
      element: declaration,
      styles: STYLES_ACCORDION_ELEMENT,
      events: {
        SetOpen,
        SetClosed,
      },
    };
  })();

export default CreateAccordionElement;
