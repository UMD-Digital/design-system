import { Tokens, Typography } from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';

type TypeTextProps = {
  isTextCenter?: boolean;
  eyebrow?: HTMLElement | null;
  headline: HTMLElement | null;
  richText?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

export type TypeTextContainerProps = TypeTextProps;

const { Colors, Queries, Spacing } = Tokens;
const { SansMedium } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;
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
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} * {
    color: ${Colors.black};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} * {
    color: ${Colors.white};
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
    margin-top: ${Spacing.sm} !important;
  }
`

// prettier-ignore
const HeadlineStyles = `
  .${ELEMENTS_HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.black};
    text-wrap: balance;
  }

  .${ELEMENTS_HERO_HEADLINE} + * {
    margin-top: ${Spacing.md};
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
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT}`]: SansMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT} *`]: SansMedium,
    },
  })}

  .${ELEMENTS_HERO_RICH_TEXT} + * {
    margin-top: ${Spacing.lg};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENTS_HERO_ACTION} {
    margin-top: ${Spacing.sm};
  }

  @media (${Queries.tablet.min}) {
    * + .${ELEMENTS_HERO_ACTION} {
      margin-top: ${Spacing.lg};
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
    MarkupModify.AnimationLinkSpan({ element: headline });
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

  container.classList.add(ELEMENT_TEXT_CONTAINER);

  if (isThemeDark) container.setAttribute('theme', THEME_DARK);

  if (isTextCenter)
    container.setAttribute(ATTRIBUTE_TEXT_ALIGN, TEXT_ALIGN_CENTER);

  container.appendChild(body);

  return container;
};

export default {
  CreateElement: CreateTextContainerElement,
  Styles: STYLES_HERO_ELEMENT_TEXT_CONTAINER,
  Elements: {
    container: ELEMENT_TEXT_CONTAINER,
    wrapper: ELEMENT_TEXT_CONTAINER_WRAPPER,
    eyebrow: ELEMENT_HERO_EYEBROW,
    headline: ELEMENTS_HERO_HEADLINE,
    richText: ELEMENTS_HERO_RICH_TEXT,
    actions: ELEMENTS_HERO_ACTION,
  },
};
