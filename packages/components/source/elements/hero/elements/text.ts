import { Tokens, Typography } from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeTextProps = {
  theme?: string | null;
  isTextCenter?: boolean;
  eyebrow?: HTMLElement | null;
  headline: HTMLElement | null;
  richText?: HTMLElement | null;
  actions?: HTMLElement | null;
};

export type TypeTextContainerProps = TypeTextProps;

const { Colors, Spacing } = Tokens;
const { SansMedium } = Typography;

const TABLET = 768;
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TEXT_ALIGN = 'text-align';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const TEXT_ALIGN_CENTER = 'center';

export const ELEMENT_NAME = 'umd-element-hero-text-container';
export const ELEMENT_TEXT_CONTAINER = 'hero-text-container';
export const ELEMENT_TEXT_CONTAINER_WRAPPER = 'hero-text-container-wrapper';
export const ELEMENT_HERO_EYEBROW = 'hero-eyebrow';
export const ELEMENTS_HERO_HEADLINE = 'hero-headline';
export const ELEMENTS_HERO_RICH_TEXT = 'hero-richtext';
export const ELEMENTS_HERO_ACTION = 'hero-actions';

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
    color: ${Colors.white};
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

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    * + .${ELEMENTS_HERO_ACTION} {
      margin-top: ${Spacing.lg};
    }
  }
`;

// prettier-ignore
export const STYLES_HERO_ELEMENT_TEXT_CONTAINER = `
  .${ELEMENT_TEXT_CONTAINER} {
    position: relative;
    height: 100%;
  }

  .${ELEMENT_TEXT_CONTAINER_WRAPPER} {
    position: relative;
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
    CheckForAnimationLinkSpan({ element: headline });
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

export const CreateTextContainerElement = ({
  element,
}: {
  element: TypeTextContainerProps;
}) => {
  const { theme, isTextCenter = false } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const body = CreateBody(element);

  container.classList.add(ELEMENT_TEXT_CONTAINER);
  if (theme) container.setAttribute('theme', theme);
  if (isTextCenter)
    container.setAttribute(ATTRIBUTE_TEXT_ALIGN, TEXT_ALIGN_CENTER);

  wrapper.classList.add(ELEMENT_TEXT_CONTAINER_WRAPPER);
  wrapper.appendChild(body);

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateTextContainerElement,
  Styles: STYLES_HERO_ELEMENT_TEXT_CONTAINER,
};
