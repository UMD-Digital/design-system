import {
  Typography,
  Layout,
  Tokens,
  Elements,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';

export type TypePathwayTextContainer = {
  eyebrow: HTMLElement | null;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  action: HTMLElement | null;
  theme?: string | null;
};

const { Spacing, Colors, FontSize } = Tokens;
const { Eyebrow, Text } = Elements;
const { GridColumnAndRows } = Layout;
const { SansLargest } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 400;

const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const TEXT_CONTAINER_ELEMENT_NAME = 'umd-element-pathway-text-container';
export const ELEMENT_TEXT_CONTAINER = 'pathway-text-container';
export const ELEMENT_TEXT_CONTAINER_WRAPPER = 'pathway-text-container-wrapper';
export const ELEMENT_TEXT_CONTAINER_HEADLINE = 'pathway-text-headline';
const ELEMENT_TEXT_CONTAINER_EYEBROW = 'pathway-text-eyebrow';
export const ELEMENT_TEXT_CONTAINER_RICH_TEXT = 'pathway-text-richtext';
const ELEMENTS_TEXT_CONTAINER_ACTIONS = 'pathway-text-actions';

const IS_THEME_DARK = `.${ELEMENT_TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `.${ELEMENT_TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `.${ELEMENT_TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_TEXT_CONTAINER}${IS_THEME_MARYLAND}`;

// prettier-ignore
const VarationThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const VarationThemeLight = `
  ${OVERWRITE_THEME_LIGHT_CONTAINER} * {
    color: ${Colors.black};
  }
`

// prettier-ignore
const VarationThemeMaryland = `
  ${OVERWRITE_THEME_MARYLAND_CONTAINER} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const EyebrowStyles = `
  .${ELEMENT_TEXT_CONTAINER_EYEBROW} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black} !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_CONTAINER_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_CONTAINER_HEADLINE}`]: SansLargest,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_CONTAINER_HEADLINE} *`]: SansLargest,
    },
  })}

  .${ELEMENT_TEXT_CONTAINER_HEADLINE} {
    color: ${Colors.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${ELEMENT_TEXT_CONTAINER_RICH_TEXT} {
    margin-top: ${Spacing.sm};
  }

  @container ${TEXT_CONTAINER_ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${ELEMENT_TEXT_CONTAINER_RICH_TEXT} {
      margin-top: ${Spacing.md};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_CONTAINER_RICH_TEXT}`]: Text.RichText,
    },
  })}

  .${ELEMENT_TEXT_CONTAINER_RICH_TEXT} * {
    font-size: ${FontSize['lg']};
    line-height: 1.5em;
    color: ${Colors.gray.dark};
  }
`;

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENTS_TEXT_CONTAINER_ACTIONS} {
    margin-top: ${Spacing.sm};
  }

  @container ${TEXT_CONTAINER_ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${ELEMENTS_TEXT_CONTAINER_ACTIONS} {
      margin-top: ${Spacing.lg};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_TEXT_CONTAINER_ACTIONS}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
const STYLES_PATHWAY_TEXT_CONTAINER = `
  .${ELEMENT_TEXT_CONTAINER} {
    container: ${TEXT_CONTAINER_ELEMENT_NAME} / inline-size;
    display: flex;
    align-items: center;
    z-index: 99;
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${VarationThemeDark}
  ${VarationThemeLight}
  ${VarationThemeMaryland}
`;

export const CreatePathwayTextContainer = ({
  headline,
  eyebrow,
  text,
  action,
  theme,
}: TypePathwayTextContainer) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(ELEMENT_TEXT_CONTAINER_WRAPPER);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_TEXT_CONTAINER_EYEBROW);
    wrapper.appendChild(eyebrow);
  }

  if (headline) {
    headline.classList.add(ELEMENT_TEXT_CONTAINER_HEADLINE);
    wrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_TEXT_CONTAINER_RICH_TEXT);
    wrapper.appendChild(text);
  }

  if (action) {
    action.classList.add(ELEMENTS_TEXT_CONTAINER_ACTIONS);
    wrapper.appendChild(action);
  }

  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  container.classList.add(ELEMENT_TEXT_CONTAINER);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreatePathwayTextContainer,
  Styles: STYLES_PATHWAY_TEXT_CONTAINER,
};
