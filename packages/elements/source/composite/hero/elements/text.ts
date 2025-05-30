import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeTextProps = {
  isTextCenter?: boolean;
  eyebrow?: HTMLElement | null;
  headline: HTMLElement | null;
  richText?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

export type TypeTextContainerProps = TypeTextProps;

const { convertJSSObjectToStyles } = Utility.styles;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TEXT_ALIGN = 'text-align';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const TEXT_ALIGN_CENTER = 'center';

const ELEMENT_NAME = 'umd-element-hero-text-container';
const ELEMENT_TEXT_CONTAINER = 'hero-text-container';
const ELEMENT_TEXT_CONTAINER_WRAPPER = 'hero-text-container-wrapper';
const ELEMENT_HERO_EYEBROW = 'hero-eyebrow';
const ELEMENTS_HERO_HEADLINE = 'hero-headline';
const ELEMENTS_HERO_RICH_TEXT = 'hero-richtext';
const ELEMENTS_HERO_ACTION = 'hero-actions';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_TEXT_CENTER = `[${ATTRIBUTE_TEXT_ALIGN}='${TEXT_ALIGN_CENTER}']`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_MARYLAND}`;
const OVERWRITE_TEXT_CENTER_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_TEXT_CENTER}`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} * {
    color: ${token.color.black};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} * {
    color: ${token.color.white};
  }
`;

// prettier-ignore
const OverwriteTextCenter = `
  ${OVERWRITE_TEXT_CENTER_CONTAINER} * {
    text-align: center;
  }
`;

// prettier-ignore
const EyebrowStyles = `  
  .${ELEMENT_HERO_EYEBROW} + * {
    margin-top: ${token.spacing.sm} !important;
  }
`

// prettier-ignore
const HeadlineStyles = `
  .${ELEMENTS_HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${token.color.black};
    text-wrap: balance;
  }

  .${ELEMENTS_HERO_HEADLINE} + * {
    margin-top: ${token.spacing.md};
  }

  .${ELEMENTS_HERO_HEADLINE} > a:hover,
  .${ELEMENTS_HERO_HEADLINE} > a:focus {
    text-decoration: underline;
  }
`

// prettier-ignore
const TextStyles = `
  .${ELEMENTS_HERO_RICH_TEXT} {
    max-width: 860px;
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT}`]: typography.sans.medium,
    },
  })}
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT} *`]: typography.sans.medium,
    },
  })}

  .${ELEMENTS_HERO_RICH_TEXT} + * {
    margin-top: ${token.spacing.lg};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENTS_HERO_ACTION} {
    margin-top: ${token.spacing.sm};
  }

  @media (${token.media.queries.tablet.min}) {
    * + .${ELEMENTS_HERO_ACTION} {
      margin-top: ${token.spacing.lg};
    }
  }
`;

// prettier-ignore
const STYLES_HERO_ELEMENT_TEXT_CONTAINER = `
  .${ELEMENT_TEXT_CONTAINER} {
    position: relative;
    height: 100%;
  }

  .${ELEMENT_TEXT_CONTAINER_WRAPPER} {
    position: relative;
    z-index: 99;
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${OverwriteTextCenter}
  ${OverwriteTheme}
`;

const CreateBody = ({
  eyebrow,
  headline,
  richText,
  actions,
}: TypeTextProps) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_TEXT_CONTAINER_WRAPPER);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_HERO_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    Utility.markup.modify.animationLinkSpan({ element: headline });
    headline.classList.add(ELEMENTS_HERO_HEADLINE);
    container.appendChild(headline);
  }

  if (richText) {
    richText.classList.add(ELEMENTS_HERO_RICH_TEXT);
    container.appendChild(richText);
  }

  if (actions) {
    actions.classList.add(ELEMENTS_HERO_ACTION);
    container.appendChild(actions);
  }

  return container;
};

const CreateTextContainerElement = (element: TypeTextContainerProps) => {
  const { isThemeDark, isTextCenter = false } = element;
  const container = document.createElement('div');
  const body = CreateBody(element);
  let styles = STYLES_HERO_ELEMENT_TEXT_CONTAINER;

  container.classList.add(ELEMENT_TEXT_CONTAINER);

  if (isThemeDark) container.setAttribute('theme', THEME_DARK);

  if (isTextCenter)
    container.setAttribute(ATTRIBUTE_TEXT_ALIGN, TEXT_ALIGN_CENTER);

  container.appendChild(body);

  return { element: container, styles };
};

export default {
  CreateElement: CreateTextContainerElement,
  Elements: {
    container: ELEMENT_TEXT_CONTAINER,
    wrapper: ELEMENT_TEXT_CONTAINER_WRAPPER,
    eyebrow: ELEMENT_HERO_EYEBROW,
    headline: ELEMENTS_HERO_HEADLINE,
    richText: ELEMENTS_HERO_RICH_TEXT,
    actions: ELEMENTS_HERO_ACTION,
  },
};
