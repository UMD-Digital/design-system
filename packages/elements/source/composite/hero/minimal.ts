import {
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroMinimalProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    isThemeLight?: boolean;
    isThemeMaryland?: boolean;
  };

const { convertJSSObjectToStyles } = Utility.styles;

const TABLET = 768;
const DESKTOP = 1024;

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_HAS_IMAGE = 'has-image';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_HAS_IMAGE}]`;

const ELEMENT_NAME = 'umd-element-hero-minimal';
const ELEMENT_HERO_DECLARATION = 'hero-minimal-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-minimal-container';
const ELEMENT_HERO_LOCK = 'hero-minimal-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ImageContainer.Elements.container}`;

const OVERWRITE_TEXT_CONTAINER_WRAPPER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.headline}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_WITH_IMAGE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_WITH_IMAGE} .${TextContainer.Elements.container}`;

const OVERWRITE_THEME_DARK_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_THEME_MARYLAND_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND} .${TextContainer.Elements.wrapper}`;

// prettier-ignore
const OverwriteTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} .${TextContainer.Elements.eyebrow} {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} {
    background-color: ${token.color.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${token.color.red};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} .${TextContainer.Elements.eyebrow} {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_TEXT_WRAPPER},
  ${OVERWRITE_THEME_MARYLAND_TEXT_WRAPPER} {
    border-left: 2px solid ${token.color.gold};
  }
`;

// prettier-ignore
const OverwriteEyebrow = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: typography.sans.small,
    },
  })}
  
  ${OVERWRITE_EYEBROW} {
    text-transform: uppercase;
    font-weight: 600;
    color: ${token.color.black};
  }
  
  ${OVERWRITE_EYEBROW} + * {
    margin-top: ${token.spacing.sm} !important;
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: typography.campaign.large,
    },
  })}
  
  ${OVERWRITE_HEADLINE} {
    font-weight: 800;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding: ${token.spacing.xl} 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_WITH_IMAGE_TEXT_CONTAINER} {
      padding: ${token.spacing['4xl']} 0;
      width: calc(50% - ${token.spacing['4xl']});
    }
  }

  ${OVERWRITE_TEXT_CONTAINER_WRAPPER} {
    padding-left: ${token.spacing.md};
    border-left: 2px solid ${token.color.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    ${OVERWRITE_TEXT_CONTAINER_WRAPPER} {
      padding-left: ${token.spacing.lg};
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
    }
  }
`;

export const STYLES_HERO_MINIMAL_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
    position: relative;
  }
  
  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_HERO_LOCK} {
      min-height: 288px;
      display: flex;
      align-items: center;
    }
  }
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export default (element: TypeHeroMinimalProps) => {
  const { isThemeDark, isThemeLight, isThemeMaryland } = element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement({
    ...element,
    isThemeDark: isThemeDark || isThemeMaryland,
  });
  const asset = ImageContainer.CreateElement({
    ...element,
    isTypeMinimal: true,
  });
  let styles = STYLES_HERO_MINIMAL_ELEMENT;

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isThemeLight) container.setAttribute(ATTRIBUTE_THEME, THEME_LIGHT);
  if (isThemeMaryland) container.setAttribute(ATTRIBUTE_THEME, THEME_MARYLAND);

  lock.classList.add(ELEMENT_HERO_LOCK);

  lock.appendChild(text.element);
  styles += text.styles;

  if (asset) {
    container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');
    container.appendChild(asset.element);
    styles += asset.styles;
  }

  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return { element: declaration, styles };
};
