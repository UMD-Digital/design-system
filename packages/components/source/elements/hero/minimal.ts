import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroMinimalProps = TypeTextContainerProps & TypeImageContainerProps;

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { SansLargest, SansSmaller } = Typography;
const { Node } = MarkupCreate;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_HAS_IMAGE = 'has-image';

const BACKGROUND_TEXTURE_LIGHT = `<svg id="hero_background_light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 717 668"><defs><style>.cls-1 {opacity: 0;}.cls-1, .cls-2 {fill: #454545;fill-rule: evenodd;isolation: isolate;}.cls-2 {opacity: .03;}</style></defs><path class="cls-1" d="m149.06,0H0v85.89l247.31,247.86L0,581.61v85.89h149.06l333-333.75L149.06,0Z"/><path class="cls-2" d="m148.31,0h234.75l333,333.75-333,333.75h-234.75l333-333.75L148.31,0ZM0,243.5l79.17-79.24L0,85.02v158.48Z"/></svg>`;
const BACKGROUND_TEXTURE_DARK = `<svg id="hero_background_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 717 668"><defs><style>.cls-1 {opacity: .8;}.cls-1, .cls-2 {fill: #242424;fill-rule: evenodd;isolation: isolate;stroke-width: 0px;}.cls-2 {opacity: .5;}</style></defs><path class="cls-2" d="M149.1.5H0v85.9l247.3,247.9L0,582.1v85.9h149.1l333-333.8L149.1.5Z"/><path class="cls-1" d="M148.3.5h234.8l333,333.8-333,333.7h-234.8l333-333.8L148.3.5ZM0,244l79.2-79.2L0,85.5v158.5Z"/></svg>`;

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_HAS_IMAGE}]`;

const ELEMENT_NAME = 'umd-element-hero-minimal';
const ELEMENT_HERO_DECLARATION = 'hero-minimal-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-minimal-container';
const ELEMENT_HERO_LOCK = 'hero-minimal-lock';
const ELEMENT_HERO_TEXTURE = 'hero-minimal-texture';

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
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_HERO_TEXTURE} {
    opacity: 0.8;
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} {
    background-color: ${Colors.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${Colors.red};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} .${ELEMENT_HERO_TEXTURE} {
    opacity: 0.1;
  }

  ${OVERWRITE_THEME_DARK_TEXT_WRAPPER},
  ${OVERWRITE_THEME_MARYLAND_TEXT_WRAPPER} {
    border-left: 2px solid ${Colors.gold};
  }
`;

// prettier-ignore
const OverwriteEyebrow = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: SansSmaller,
    },
  })}
  
  ${OVERWRITE_EYEBROW} {
    text-transform: uppercase;
    font-weight: 600;
  }
  
  ${OVERWRITE_EYEBROW} + * {
    margin-top: ${Spacing.sm} !important;
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: SansLargest,
    },
  })}
  
  ${OVERWRITE_HEADLINE} {
    font-weight: 800;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding: ${Spacing.xl} 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_WITH_IMAGE_TEXT_CONTAINER} {
      padding: ${Spacing['4xl']} 0;
      width: calc(50% - ${Spacing['4xl']});
    }
  }

  ${OVERWRITE_TEXT_CONTAINER_WRAPPER} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
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

// prettier-ignore
const BackgroundTexture = `
  .${ELEMENT_HERO_TEXTURE} {
    position: absolute;
    top: 0;
    left: -10vw;
    height: 100%;
  }
`;

export const STYLES_HERO_MINIMAL_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: Lock['.base'],
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_HERO_LOCK} {
      min-height: 288px;
      display: flex;
      align-items: center;
    }
  }
  
  ${BackgroundTexture}
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export const CreateHeroMinimalElement = (element: TypeHeroMinimalProps) => {
  const { theme } = element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement(element);
  const asset = ImageContainer.CreateElement({
    ...element,
    isTypeMinimal: true,
  });
  const isDarkText = theme === THEME_DARK || theme === THEME_MARYLAND;
  const backgroundTexture = Node.imageFromSvg({
    SVG: isDarkText ? BACKGROUND_TEXTURE_DARK : BACKGROUND_TEXTURE_LIGHT,
  });

  backgroundTexture.classList.add(ELEMENT_HERO_TEXTURE);

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  lock.classList.add(ELEMENT_HERO_LOCK);
  lock.appendChild(backgroundTexture);
  lock.appendChild(text);

  if (asset) {
    container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');
    container.appendChild(asset);
  }

  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroMinimalElement,
  Styles: STYLES_HERO_MINIMAL_ELEMENT,
};
