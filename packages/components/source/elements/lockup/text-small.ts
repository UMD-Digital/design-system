import {
  Animations,
  Typography,
  Tokens,
  Layout,
} from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';

export type TypeTextLockupSmall = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
};

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarge, SansMin, Eyebrow } = Typography;
const { GridColumnAndRows } = Layout;
const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

export const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER =
  'text-lockup-small-container';
export const ELEMENT_TEXT_LOCKUP_SMALL_WRAPPER =
  'text-lockup-small-container-wrapper';
export const ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW = 'text-lockup-small-eyebrow';
export const ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE = 'text-lockup-small-headline';
export const ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT =
  'text-lockup-small-rich-text';
export const ELEMENT_TEXT_LOCKUP_SMALL_DATE = 'text-lockup-small-date';
export const ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS = 'text-lockup-small-actions';

const IS_THEME_DARK = `.${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_DARK_HEADLINE = `${IS_THEME_DARK} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`;

// prettier-ignore
const DarkThemeStyles = `
  ${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK_HEADLINE} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK_HEADLINE}`]:
      Link.LineSlideUnder.white,
    },
  })}
`

// prettier-ignore
const EyebrowStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} {
    color: ${Colors.black};
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW} *`]: Eyebrow,
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
    margin-top: ${Spacing.min}
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} {
    color: ${Colors.black};
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE},
  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} * {
    color: currentColor;
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} {
    margin-top: ${Spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT}`]: Typography.SansSmall,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} *`]: Typography.SansSmall,
    },
  })}

  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a:hover,
  .${ELEMENT_TEXT_LOCKUP_SMALL_RICH_TEXT} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} {
    display: block;
  }

  * + .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_DATE} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_DATE}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_DATE} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_ACTIONS}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
const STYLES_TEXT_LOCKUP_SMALL_CONTAINER = `
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
  theme,
}: TypeTextLockupSmall) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    MarkupModify.AnimationLinkSpan({ element: headline });
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
};
