import {
  element,
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroLogoProps = TypeTextContainerProps & TypeImageContainerProps;

const { convertJSSObjectToStyles } = Utility.styles;

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const ATTRIBUTE_THEME = 'theme';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;

const ELEMENT_NAME = 'umd-element-hero-logo';
const ELEMENT_HERO_ELEMENT_DECLARATION = 'hero-logo-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-logo-container';
const ELEMENT_HERO_LOCK = 'hero-logo-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.richText}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND}`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} .${TextContainer.Elements.eyebrow} {
    color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} {
    background-color: ${token.color.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${token.color.red};
  }
`;

// prettier-ignore
const OverwriteEyebrow = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: element.text.decoration.ribbon,
    },
  })}
  
  ${OVERWRITE_EYEBROW} {
    color: ${token.color.black}
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: typography.campaign.large,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE} *`]: typography.campaign.large,
    },
  })}
`;

// prettier-ignore
const OverwriteRichText = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: typography.sans.larger,
    },
  })}
  
  ${OVERWRITE_RICH_TEXT} {
    color: ${token.color.gray.dark};
    font-weight: 400;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    text-align: center;
    display: flex;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: ${token.spacing.xl};
  }

  ${OVERWRITE_IMAGE_CONTAINER} img {
    max-width: 100%;
    max-height: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const STYLES_HERO_LOGO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_HERO_CONTAINER} {
    padding: ${token.spacing['5xl']} 0 ${token.spacing.lg};
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: layout.space.horizontal.small,
    },
  })}
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export default (element: TypeHeroLogoProps) => {
  const { isThemeDark } = element;

  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement({ ...element, isTextCenter: true });
  const asset = ImageContainer.CreateElement(element);
  let styles = STYLES_HERO_LOGO_ELEMENT;

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  if (asset) {
    lock.appendChild(asset.element);
    styles += asset.styles;
  }

  lock.classList.add(ELEMENT_HERO_LOCK);
  lock.appendChild(text.element);
  styles += text.styles;

  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return { element: declaration, styles };
};
