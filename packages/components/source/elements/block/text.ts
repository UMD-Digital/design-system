import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

export type TypeBlockTextContainter = {
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

export const ELEMENT_BLOCK_TEXT_CONTAINER = 'block-text-container';
export const ELEMENT_BLOCK_TEXT_WRAPPER = 'block-text-container-wrapper';
export const ELEMENT_BLOCK_TEXT_EYEBROW = 'block-text-eyebrow';
export const ELEMENT_BLOCK_TEXT_HEADLINE = 'block-text-headline';
export const ELEMENT_BLOCK_TEXT_RICH_TEXT = 'block-rich-text';
export const ELEMENT_BLOCK_TEXT_DATE = 'block-text-date';
export const ELEMENT_BLOCK_TEXT_ACTIONS = 'block-text-actions';

const IS_THEME_DARK = `.${ELEMENT_BLOCK_TEXT_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_DARK_HEADLINE = `${IS_THEME_DARK} .${ELEMENT_BLOCK_TEXT_HEADLINE}`;

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
  .${ELEMENT_BLOCK_TEXT_EYEBROW} {
    color: ${Colors.black};
  }

  .${ELEMENT_BLOCK_TEXT_EYEBROW} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_EYEBROW}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_EYEBROW} *`]: Eyebrow,
    },
  })}

  .${ELEMENT_BLOCK_TEXT_EYEBROW} a:hover,
  .${ELEMENT_BLOCK_TEXT_EYEBROW} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${ELEMENT_BLOCK_TEXT_HEADLINE} {
    margin-top: ${Spacing.min}
  }

  .${ELEMENT_BLOCK_TEXT_HEADLINE} {
    color: ${Colors.black};
  }

  .${ELEMENT_BLOCK_TEXT_HEADLINE},
  .${ELEMENT_BLOCK_TEXT_HEADLINE} * {
    color: currentColor;
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_HEADLINE}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_HEADLINE} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_HEADLINE} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_BLOCK_TEXT_RICH_TEXT} {
    margin-top: ${Spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_RICH_TEXT} *`]: Typography.SansSmall,
    },
  })}

  .${ELEMENT_BLOCK_TEXT_RICH_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENT_BLOCK_TEXT_RICH_TEXT} a:hover,
  .${ELEMENT_BLOCK_TEXT_RICH_TEXT} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  .${ELEMENT_BLOCK_TEXT_DATE} {
    display: block;
  }

  * + .${ELEMENT_BLOCK_TEXT_DATE} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${ELEMENT_BLOCK_TEXT_DATE} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_DATE}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BLOCK_TEXT_DATE} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${ELEMENT_BLOCK_TEXT_ACTIONS} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
const STYLES_BLOCK_TEXT_CONTAINER = `
  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${DateStyles}
  ${ActionStyles}
  ${DarkThemeStyles}
`;

const CreateBlockTextContainer = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  theme,
}: TypeBlockTextContainter) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_BLOCK_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_BLOCK_TEXT_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(ELEMENT_BLOCK_TEXT_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_BLOCK_TEXT_RICH_TEXT);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(ELEMENT_BLOCK_TEXT_DATE);
    container.appendChild(date);
  }

  if (actions) {
    actions.classList.add(ELEMENT_BLOCK_TEXT_ACTIONS);
    container.appendChild(actions);
  }

  return container;
};

export default {
  CreateElement: CreateBlockTextContainer,
  Styles: STYLES_BLOCK_TEXT_CONTAINER,
};
