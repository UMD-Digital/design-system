import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroMinimalProps = TypeTextContainerProps & TypeImageContainerProps;

const { LockMax } = Layout;
const { Colors, Spacing } = Tokens;
const { SansLargest, SansSmaller, CampaignLarge } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;

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
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} {
    background-color: ${Colors.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${Colors.red};
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
      [`${OVERWRITE_HEADLINE}`]: CampaignLarge,
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
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: LockMax,
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

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  lock.classList.add(ELEMENT_HERO_LOCK);

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
