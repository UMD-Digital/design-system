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
  theme?: string;
};

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarge, SansMin, Eyebrow } = Typography;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

export const BLOCK_TEXT_CONTAINER = 'block-text-container';
export const BLOCK_TEXT_WRAPPER = 'block-text-container-wrapper';
export const BLOCK_TEXT_HEADLINE_WRAPPER = 'block-text-headline-wrapper';
export const BLOCK_TEXT_EYEBROW_WRAPPER = 'block-text-eyebrow-wrapper';
export const BLOCK_TEXT_CONTAINER_TEXT_WRAPPER = 'block-text-wrapper';
export const BLOCK_TEXT_DATE_WRAPPER = 'block-text-date-wrapper';
export const BLOCK_TEXT_ACTIONS_WRAPPER = 'block-text-actions-wrapper';

const IS_THEME_DARK = `.${BLOCK_TEXT_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const DarkThemeStyles = `
  ${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${BLOCK_TEXT_HEADLINE_WRAPPER} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${BLOCK_TEXT_HEADLINE_WRAPPER}`]:
      Link.LineSlideUnder.white,
    },
  })}
`

// prettier-ignore
const EyebrowStyles = `
  .${BLOCK_TEXT_EYEBROW_WRAPPER} {
    color: ${Colors.black};
  }

  .${BLOCK_TEXT_EYEBROW_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_EYEBROW_WRAPPER}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_EYEBROW_WRAPPER} *`]: Eyebrow,
    },
  })}

  .${BLOCK_TEXT_EYEBROW_WRAPPER} a:hover,
  .${BLOCK_TEXT_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${BLOCK_TEXT_HEADLINE_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  .${BLOCK_TEXT_HEADLINE_WRAPPER} {
    color: ${Colors.black};
  }

  .${BLOCK_TEXT_HEADLINE_WRAPPER},
  .${BLOCK_TEXT_HEADLINE_WRAPPER} * {
    color: currentColor;
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_HEADLINE_WRAPPER}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_HEADLINE_WRAPPER} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_HEADLINE_WRAPPER} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} *`]: Typography.SansSmall,
    },
  })}

  .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} a:hover,
  .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${BLOCK_TEXT_DATE_WRAPPER} {
    display: block;
  }

  * + .${BLOCK_TEXT_DATE_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${BLOCK_TEXT_DATE_WRAPPER} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_DATE_WRAPPER}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${BLOCK_TEXT_DATE_WRAPPER} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${BLOCK_TEXT_ACTIONS_WRAPPER} {
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

export const CreateBlockTextContainer = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  theme,
}: TypeCommonTextAttributes) => {
  const container = document.createElement('div');

  container.classList.add(BLOCK_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (eyebrow) {
    eyebrow.classList.add(BLOCK_TEXT_EYEBROW_WRAPPER);
    container.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(BLOCK_TEXT_HEADLINE_WRAPPER);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(BLOCK_TEXT_CONTAINER_TEXT_WRAPPER);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(BLOCK_TEXT_DATE_WRAPPER);
    container.appendChild(date);
  }

  if (actions) {
    actions.classList.add(BLOCK_TEXT_ACTIONS_WRAPPER);
    container.appendChild(actions);
  }

  return container;
};
