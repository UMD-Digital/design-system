import {
  typography,
  tokens,
  layout,
} from '@universityofmaryland/web-elements-styles';
import { Styles } from 'utilities';

type TypeSectionIntroDefaultProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  text?: HTMLElement | null;
  hasSeparator?: boolean;
  isThemeDark?: boolean;
  includesAnimation?: boolean;
};

const { colors, spacing } = tokens;
const { convertJSSObjectToStyles } = Styles;

const ATTRIBUTE_WITH_SEPARATOR = 'include-separator';
const ATTRIBUTE_ANIMATION = 'data-animation';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;
const IS_ANIMATION_START = `[${ATTRIBUTE_ANIMATION}="true"]`;

const ELEMENT_NAME = 'umd-section-intro-default';
const ELEMENT_INTRO_CONTAINER = 'intro-default-container';
const ELEMENT_INTRO_CONTAINER_WRAPPER = 'intro-default-container-wrapper';
const ELEMENT_INTRO_TEXT_CONTAINER = 'intro-default-container-text';
const ELEMENT_HEADLINE = 'intro-default-headline';
const ELEMENT_RICH_TEXT = 'intro-default-rich-text';
const ELEMENT_RICH_TEXT_SMALL = 'intro-default-rich-text-small';
const ELEMENT_ACTIONS = 'intro-default-actions';

const OVERWRITE_SEPARATOR_WRAPPER = `.${ELEMENT_INTRO_CONTAINER}[${ATTRIBUTE_WITH_SEPARATOR}] .${ELEMENT_INTRO_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_DARK_CONTAINTER = `.${ELEMENT_INTRO_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

const OVERWRITE_CONTAINER_ANIMATION = `.${ELEMENT_INTRO_CONTAINER}${IS_ANIMATION}`;
const OVERWRITE_CONTAINER_ANIMATION_START = `.${ELEMENT_INTRO_CONTAINER}${IS_ANIMATION_START}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${ELEMENT_INTRO_TEXT_CONTAINER}`;
const OVERWRITE_ANIMATION_WRAPPER = `${OVERWRITE_CONTAINER_ANIMATION} .${ELEMENT_INTRO_CONTAINER_WRAPPER}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER_START = `${OVERWRITE_CONTAINER_ANIMATION_START} .${ELEMENT_INTRO_TEXT_CONTAINER}`;
const OVERWRITE_ANIMATION_WRAPPER_START = `${OVERWRITE_CONTAINER_ANIMATION_START} .${ELEMENT_INTRO_CONTAINER_WRAPPER}`;

// prettier-ignore
const OverwriteAnimationLine = `
  @keyframes intro-line {
    from {
      height: 0;
      transform: translateY(${spacing['lg']});
   }
    to {
      height: ${spacing['4xl']};
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_WRAPPER}:before {
      height: 0;
      transform: translateY(${spacing['lg']});
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_WRAPPER_START}:before {
      animation: intro-line 1.2s forwards;
    }
  }
`;

// prettier-ignore
const OverwriteAnimationText = `
  @keyframes intro-fade-in {
    from {
      opacity: 0;
      transform: translateY(100px);
   }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER} {
      opacity: 0;
      transform: translateY(100px);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER_START} {
      animation: intro-fade-in 1s forwards;
      animation-delay: 0.2s;
    }
  }
`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINTER} * {
    color: ${colors.white};
  }
`;

// prettier-ignore
const OverwriteSeparator = `
  ${OVERWRITE_SEPARATOR_WRAPPER} {
    padding-top: ${spacing['6xl']};
    position: relative;
  }

  ${OVERWRITE_SEPARATOR_WRAPPER}:before {
    content: '';
    background-color: ${colors.red};
    position: absolute;
    height: ${spacing['4xl']};
    width: 2px;
    left: calc(50% - 1px);
    top: 0;
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
    color: ${colors.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_RICH_TEXT},
  * + .${ELEMENT_RICH_TEXT_SMALL} {
    margin-top: ${spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT}`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT} *`]: typography.sans.larger,
    },
  })}

  .${ELEMENT_RICH_TEXT},
  .${ELEMENT_RICH_TEXT} * {
    font-weight: 700;
    color: ${colors.black};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT_SMALL}`]: typography.sans.medium,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT_SMALL} *`]: typography.sans.medium,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENT_ACTIONS} {
    margin-top: ${spacing.md};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ACTIONS}`]: layout.grid.inline.tabletRows,
    },
  })}

  .${ELEMENT_ACTIONS} {
    justify-content: center;
    align-items: center;
  }
`;

// prettier-ignore
const STYLES_SECTION_INTRO_DEFAULT_ELEMENT = `
  .${ELEMENT_INTRO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: ${spacing.maxWidth.small};
    margin: 0 auto;
  }

  .${ELEMENT_INTRO_CONTAINER_WRAPPER} {
    text-align: center;
  }

  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${OverwriteSeparator}
  ${OverwriteTheme}
  ${OverwriteAnimationText}
  ${OverwriteAnimationLine}
`;

const Animation = ({
  includesAnimation = true,
  container,
}: {
  includesAnimation?: boolean;
  container: HTMLElement;
}) => {
  if (includesAnimation) {
    const animation: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          target.setAttribute(ATTRIBUTE_ANIMATION, 'true');
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(animation, {
      root: null,
      rootMargin: '0px',
      threshold: [0.35],
    });

    observer.observe(container);
    container.setAttribute(ATTRIBUTE_ANIMATION, '');
  }
};

const CreateSectionIntroDefaultElement = (
  element: TypeSectionIntroDefaultProps,
) => {
  const {
    headline,
    actions,
    text,
    isThemeDark,
    hasSeparator = false,
    includesAnimation,
  } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const textContainer = document.createElement('div');
  const loadAnimation = () => {
    Animation({ includesAnimation, container });
  };

  textContainer.classList.add(ELEMENT_INTRO_TEXT_CONTAINER);

  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (hasSeparator) container.setAttribute(ATTRIBUTE_WITH_SEPARATOR, '');

  if (headline) {
    headline.classList.add(ELEMENT_HEADLINE);
    textContainer.appendChild(headline);
  }

  if (text) {
    text.classList.add(headline ? ELEMENT_RICH_TEXT_SMALL : ELEMENT_RICH_TEXT);
    textContainer.appendChild(text);
  }

  if (actions) {
    actions.classList.add(ELEMENT_ACTIONS);
    textContainer.appendChild(actions);
  }

  wrapper.classList.add(ELEMENT_INTRO_CONTAINER_WRAPPER);
  wrapper.appendChild(textContainer);

  container.classList.add(ELEMENT_INTRO_CONTAINER);
  container.appendChild(wrapper);

  return {
    element: container,
    events: {
      loadAnimation,
    },
  };
};

export default {
  CreateElement: CreateSectionIntroDefaultElement,
  Styles: STYLES_SECTION_INTRO_DEFAULT_ELEMENT,
};
