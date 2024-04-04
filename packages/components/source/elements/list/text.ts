import {
  Animations,
  Typography,
  Tokens,
  Layout,
} from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';

export type TypeListText = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
};

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarger, SansMin, Eyebrow } = Typography;
const { GridColumnAndRows } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

export const ELEMENT_LIST_TEXT_CONTAINER = 'list-text-container';
export const ELEMENT_LIST_EYEBROW = 'list-eyebrow-wrapper';
export const ELEMENT_LIST_HEADLINE = 'list-headline-wrapper';
export const ELEMENT_LIST_RICH_TEXT = 'list-text-wrapper';
export const ELEMENT_LIST_DATE = 'list-date-wrapper';
export const ELEMENT_LIST_ACTIONS = 'list-actions-wrapper';

const IS_THEME_DARK = `.${ELEMENT_LIST_TEXT_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const DarkThemeStyles = `
  ${IS_THEME_DARK} .${ELEMENT_LIST_EYEBROW} {
    color: ${Colors.white};
  }

  ${IS_THEME_DARK} .${ELEMENT_LIST_HEADLINE} {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${ELEMENT_LIST_HEADLINE} a`]:
      Link.LineSlideUnder.white
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${ELEMENT_LIST_HEADLINE}`]:
      Link.LineSlideUnder.white
    },
  })}

  ${IS_THEME_DARK} .${ELEMENT_LIST_RICH_TEXT} {
    color: ${Colors.white};
  }

  ${IS_THEME_DARK} .${ELEMENT_LIST_DATE} {
    color: ${Colors.gray.lighter};
  }
`

// prettier-ignore
const EyebrowStyles = `
  * + .${ELEMENT_LIST_EYEBROW} {
    margin-top: ${Spacing.min}
  }

  .${ELEMENT_LIST_EYEBROW} {
    color: ${Colors.black};
  }

  .${ELEMENT_LIST_EYEBROW} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_EYEBROW}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_EYEBROW} *`]: Eyebrow,
    },
  })}

  .${ELEMENT_LIST_EYEBROW} a:hover,
  .${ELEMENT_LIST_EYEBROW} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${ELEMENT_LIST_HEADLINE} {
    margin-top: ${Spacing.min}
  }

  .${ELEMENT_LIST_HEADLINE} {
    color: ${Colors.black};
  }

  .${ELEMENT_LIST_HEADLINE} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_HEADLINE}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_HEADLINE} *`]: SansLarger,
    },
  })}

  .${ELEMENT_LIST_HEADLINE}, 
  .${ELEMENT_LIST_HEADLINE} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_HEADLINE} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_LIST_RICH_TEXT} {
    margin-top: ${Spacing.min};
    display: block;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_RICH_TEXT}`]: Typography.SansSmall,
    },
  })}

  .${ELEMENT_LIST_RICH_TEXT} {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_RICH_TEXT} *`]: Typography.SansSmall,
    },
  })}

  .${ELEMENT_LIST_RICH_TEXT} {
    color: ${Colors.gray.dark};
  }

  .${ELEMENT_LIST_RICH_TEXT} * {
    color: currentColor;
  }

  .${ELEMENT_LIST_RICH_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENT_LIST_RICH_TEXT} a:hover,
  .${ELEMENT_LIST_RICH_TEXT} a:focus{
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${ELEMENT_LIST_DATE} {
    display: block;
  }

  * + .${ELEMENT_LIST_DATE} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${ELEMENT_LIST_DATE} {
    color: ${Colors.gray.mediumAA};
  }

  .${ELEMENT_LIST_DATE} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_DATE}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_DATE} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${ELEMENT_LIST_ACTIONS}  {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_ACTIONS}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
export const STYLES_ELEMENT_LIST_TEXT_CONTAINER = `
  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${DateStyles}
  ${ActionStyles}
  ${DarkThemeStyles}
`;

export const CreateListTextContainer = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  theme,
}: TypeListText) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_LIST_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_LIST_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    MarkupModify.AnimationLinkSpan({ element: headline });
    headline.classList.add(ELEMENT_LIST_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_LIST_RICH_TEXT);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(ELEMENT_LIST_DATE);
    container.appendChild(date);
  }

  if (actions) {
    actions.classList.add(ELEMENT_LIST_ACTIONS);
    container.appendChild(actions);
  }

  return container;
};

export default {
  CreateElement: CreateListTextContainer,
  Styles: STYLES_ELEMENT_LIST_TEXT_CONTAINER,
};
