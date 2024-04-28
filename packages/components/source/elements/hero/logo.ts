import {
  Layout,
  Tokens,
  Elements,
  Typography,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroLogoProps = TypeTextContainerProps & TypeImageContainerProps;

const { LockSmall } = Layout;
const { Colors, Spacing, MaxWidth } = Tokens;
const { Eyebrow } = Elements;
const { CampaignLarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

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
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} {
    background-color: ${Colors.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${Colors.red};
  }
`;

// prettier-ignore
const OverwriteEyebrow = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}
  
  ${OVERWRITE_EYEBROW} {
    color: ${Colors.black}
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE} *`]: CampaignLarge,
    },
  })}
`;

// prettier-ignore
const OverwriteRichText = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: SansLarger,
    },
  })}
  
  ${OVERWRITE_RICH_TEXT} {
    color: ${Colors.gray.dark};
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
    margin-bottom: ${Spacing.xl};
  }

  ${OVERWRITE_IMAGE_CONTAINER} img {
    max-width: 100%;
    max-height: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const STYLES_HERO_LOGO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_HERO_CONTAINER} {
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: LockSmall,
    },
  })}
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export const CreateHeroLogoElement = (element: TypeHeroLogoProps) => {
  const { theme } = element;

  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement({ ...element, isTextCenter: true });
  const asset = ImageContainer.CreateElement(element);

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (asset) {
    lock.appendChild(asset);
  }

  lock.classList.add(ELEMENT_HERO_LOCK);
  lock.appendChild(text);
  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroLogoElement,
  Styles: STYLES_HERO_LOGO_ELEMENT,
};
