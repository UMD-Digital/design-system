import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

export type TypeCommonTextAttributes = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarger, SansMin, Eyebrow } = Typography;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

export const LIST_TEXT_CONTAINER = 'list-text-container';
export const LIST_EYEBROW_WRAPPER = 'list-eyebrow-wrapper';
export const LIST_HEADLINE_WRAPPER = 'list-headline-wrapper';
export const LIST_TEXT_WRAPPER = 'list-text-wrapper';
export const LIST_DATE_WRAPPER = 'list-date-wrapper';
export const LIST_ACTIONS_WRAPPER = 'list-actions-wrapper';

const IS_THEME_DARK = `.${LIST_TEXT_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const DarkThemeStyles = `
  ${IS_THEME_DARK} .${LIST_EYEBROW_WRAPPER} {
    color: ${Colors.white};
  }

  ${IS_THEME_DARK} .${LIST_HEADLINE_WRAPPER} {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${LIST_HEADLINE_WRAPPER} a`]:
      Link.LineSlideUnder.white
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${LIST_HEADLINE_WRAPPER}`]:
      Link.LineSlideUnder.white
    },
  })}

  ${IS_THEME_DARK} .${LIST_TEXT_WRAPPER} {
    color: ${Colors.white};
  }

  ${IS_THEME_DARK} .${LIST_DATE_WRAPPER} {
    color: ${Colors.gray.lighter};
  }
`

// prettier-ignore
const EyebrowStyles = `
  * + .${LIST_EYEBROW_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  .${LIST_EYEBROW_WRAPPER} {
    color: ${Colors.black};
  }

  .${LIST_EYEBROW_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_EYEBROW_WRAPPER}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_EYEBROW_WRAPPER} *`]: Eyebrow,
    },
  })}

  .${LIST_EYEBROW_WRAPPER} a:hover,
  .${LIST_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${LIST_HEADLINE_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  .${LIST_HEADLINE_WRAPPER} {
    color: ${Colors.black};
  }

  .${LIST_HEADLINE_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} *`]: SansLarger,
    },
  })}

  .${LIST_HEADLINE_WRAPPER}, 
  .${LIST_HEADLINE_WRAPPER} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${LIST_TEXT_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_TEXT_WRAPPER}`]: Typography.SansSmall,
    },
  })}

  .${LIST_TEXT_WRAPPER} {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_TEXT_WRAPPER} *`]: Typography.SansSmall,
    },
  })}

  .${LIST_TEXT_WRAPPER} {
    color: ${Colors.gray.dark};
  }

  .${LIST_TEXT_WRAPPER} * {
    color: currentColor;
  }

  .${LIST_TEXT_WRAPPER} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${LIST_TEXT_WRAPPER} a:hover,
  .${LIST_TEXT_WRAPPER} a:focus{
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${LIST_DATE_WRAPPER} {
    display: block;
  }

  * + .${LIST_DATE_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${LIST_DATE_WRAPPER} {
    color: ${Colors.gray.mediumAA};
  }

  .${LIST_DATE_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_DATE_WRAPPER}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_DATE_WRAPPER} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${LIST_ACTIONS_WRAPPER}  {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
export const STYLES_LIST_COMMON_TEXT = `
  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${DateStyles}
  ${ActionStyles}
  ${DarkThemeStyles}
`;

export const CreateTextContainer = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  theme,
}: {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
}) => {
  const container = document.createElement('div');

  container.classList.add(LIST_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (eyebrow) {
    eyebrow.classList.add(LIST_EYEBROW_WRAPPER);
    container.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(LIST_HEADLINE_WRAPPER);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(LIST_TEXT_WRAPPER);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(LIST_DATE_WRAPPER);
    container.appendChild(date);
  }

  if (actions) {
    actions.classList.add(LIST_ACTIONS_WRAPPER);
    container.appendChild(actions);
  }

  return container;
};
