import {
  Typography,
  Layout,
  Tokens,
  Elements,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

export type TypePathwayTextContainer = {
  eyebrow: HTMLElement | null;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  action: HTMLElement | null;
  theme: string;
};

const { Spacing, Colors, FontSize } = Tokens;
const { Eyebrow, Text } = Elements;
const { GridColumnAndRows } = Layout;
const { SansLargest } = Typography;

const MEDIUM = 400;

const TEXT_CONTAINER_ELEMENT_NAME = 'umd-element-pathway-text-container';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

export const TEXT_CONTAINER = 'umd-pathway-text-container';
export const TEXT_CONTAINER_WRAPPER = 'umd-pathway-text-container-wrapper';
export const TEXT_CONTAINER_HEADLINE_WRAPPER =
  'umd-pathway-text-container-headline';
const TEXT_CONTAINER_EYEBROW_WRAPPER = 'umd-pathway-text-container-eyebrow';
export const TEXT_CONTAINER_TEXT_WRAPPER = 'umd-pathway-text-container-text';
const TEXT_CONTAINER_ACTIONS_WRAPPER = 'umd-pathway-text-container-actions';

const IS_THEME_DARK = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;

// prettier-ignore
const VarationThemeDark = `
  ${IS_THEME_DARK} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const VarationThemeLight = `
  ${IS_THEME_LIGHT} * {
    color: ${Colors.black};
  }
`

// prettier-ignore
const VarationThemeMaryland = `
  ${IS_THEME_MARYLAND} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const EyebrowStyles = `
  .${TEXT_CONTAINER_EYEBROW_WRAPPER} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black} !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_EYEBROW_WRAPPER}`]: Eyebrow.Ribbon,
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_HEADLINE_WRAPPER}`]: SansLargest,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_HEADLINE_WRAPPER} *`]: SansLargest,
    },
  })}

  .${TEXT_CONTAINER_HEADLINE_WRAPPER} {
    color: ${Colors.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${TEXT_CONTAINER_TEXT_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  @container ${TEXT_CONTAINER_ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${TEXT_CONTAINER_TEXT_WRAPPER} {
      margin-top: ${Spacing.md};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_TEXT_WRAPPER}`]: Text.RichText,
    },
  })}

  .${TEXT_CONTAINER_TEXT_WRAPPER} * {
    font-size: ${FontSize['lg']};
    line-height: 1.5em;
    color: ${Colors.gray.dark};
  }
`;

// prettier-ignore
const ActionStyles = `
  * + .${TEXT_CONTAINER_ACTIONS_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  @container ${TEXT_CONTAINER_ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${TEXT_CONTAINER_ACTIONS_WRAPPER} {
      margin-top: ${Spacing.lg};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ACTIONS_WRAPPER}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
const STYLES_PATHWAY_TEXT_CONTAINER = `
  .${TEXT_CONTAINER} {
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

  wrapper.classList.add(TEXT_CONTAINER_WRAPPER);

  if (eyebrow) {
    eyebrow.classList.add(TEXT_CONTAINER_EYEBROW_WRAPPER);
    wrapper.appendChild(eyebrow);
  }

  if (headline) {
    headline.classList.add(TEXT_CONTAINER_HEADLINE_WRAPPER);
    wrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(TEXT_CONTAINER_TEXT_WRAPPER);
    wrapper.appendChild(text);
  }

  if (action) {
    action.classList.add(TEXT_CONTAINER_ACTIONS_WRAPPER);
    wrapper.appendChild(action);
  }

  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.classList.add(TEXT_CONTAINER);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreatePathwayTextContainer,
  Styles: STYLES_PATHWAY_TEXT_CONTAINER,
};
