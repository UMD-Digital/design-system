import {
  animations,
  layout,
  typography,
  tokens,
} from '@universityofmaryland/web-elements-styles';
import { Markup, Styles } from 'utilities';

export type TypeTextLockupSmall = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { colors, spacing } = tokens;
const { convertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-small-container';
const ELEMENT_TEXT_LOCKUP_SMALL_WRAPPER = 'text-lockup-small-container-wrapper';
const ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW = 'text-lockup-small-eyebrow';
const ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE = 'text-lockup-small-headline';
const ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT = 'text-lockup-small-rich-text';
const ELEMENT_TEXT_LOCKUP_SMALL_DATE = 'text-lockup-small-date';
const ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS = 'text-lockup-small-actions';

const IS_THEME_DARK = `.${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_DARK_EYEBROW = `${IS_THEME_DARK} .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW}`;
const IS_THEME_DARK_HEADLINE = `${IS_THEME_DARK} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`;
const IS_THEME_DARK_RICH_TEXT = `${IS_THEME_DARK} .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT}`;
const IS_THEME_DARK_DATE = `${IS_THEME_DARK} .${ELEMENT_TEXT_LOCKUP_SMALL_DATE}`;

// prettier-ignore
const DarkThemeStyles = `
  ${IS_THEME_DARK_EYEBROW},
  ${IS_THEME_DARK_HEADLINE},
  ${IS_THEME_DARK_HEADLINE} *,
  ${IS_THEME_DARK_RICH_TEXT},
  ${IS_THEME_DARK_DATE},
  ${IS_THEME_DARK_DATE} * {
    color: ${colors.white};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK_HEADLINE} a`]:
      animations.line.slideUnderWhite,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK_RICH_TEXT}`]: animations.nestedElements.linksDark,
    },
  })}
`

// prettier-ignore
const EyebrowStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} {
    color: ${colors.black};
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} * {
    color: currentColor;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW}`]: typography.elements.eyebrow,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} *`]: typography.elements.eyebrow,
    },
  })}

  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} a:hover,
  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} {
    margin-top: ${spacing.min}
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE},
  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} * {
    font-weight: 700;
    color: ${colors.black};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} *`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} a`]:
      animations.line.slideUnderBlack,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} {
    margin-top: ${spacing.min};
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} {
    color: ${colors.gray.dark};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT}`]: typography.sans.small,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} *`]: typography.sans.small,
    },
  })}

  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a:hover,
  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a:focus {
    text-decoration: underline;
    color: ${colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} {
    display: block;
  }

  * + .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} {
    margin-top: ${spacing.min};
    display: block;
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_DATE},
  .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} * {
    color: ${colors.gray.mediumAA};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_DATE}`]: typography.sans.min,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_DATE} *`]: typography.sans.min,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS} {
    margin-top: ${spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS}`]: layout.grid.inline.tabletRows,
    },
  })}
`;

// prettier-ignore
const STYLES_TEXT_LOCKUP_SMALL_CONTAINER = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER} {
    z-index: 9;
    position: relative;
  }
  
  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${DateStyles}
  ${ActionStyles}
  ${DarkThemeStyles}
`;

const CreateTextLockupSmallContainer = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  isThemeDark,
}: TypeTextLockupSmall) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    Markup.modify.animationLinkSpan({ element: headline });
    headline.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_DATE);
    container.appendChild(date);
  }

  if (actions) {
    actions.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS);
    container.appendChild(actions);
  }

  return container;
};

export default {
  CreateElement: CreateTextLockupSmallContainer,
  Styles: STYLES_TEXT_LOCKUP_SMALL_CONTAINER,
  Elements: {
    container: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
    wrapper: ELEMENT_TEXT_LOCKUP_SMALL_WRAPPER,
    headline: ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE,
    richText: ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT,
    date: ELEMENT_TEXT_LOCKUP_SMALL_DATE,
    actions: ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS,
  },
};
