import {
  Layout,
  Tokens,
  Elements,
  Typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import ImageContainer, {
  TypeImageContainerProps,
  ELEMENT_IMAGE_CONTINATER,
} from './elements/image';
import TextContainer, {
  TypeTextContainerProps,
  ELEMENT_TEXT_CONTAINER,
  ELEMENT_HERO_EYEBROW,
  ELEMENTS_HERO_HEADLINE,
  ELEMENTS_HERO_RICH_TEXT,
} from './elements/text';

type TypeHeroDefaultProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    textAlignment: string;
    theme: string;
    isWithLock: boolean;
    isInterior: boolean;
  };

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignMaxium, CampaignExtralarge, SansLarger } = Typography;

const TABLET = 768;
const DESKTOP = 1024;

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const TEXT_ALIGN_CENTER = 'center';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TEXT_ALIGN = 'text-align';
const ATTRIBUTE_HAS_IMAGE = 'has-image';
const ATTRIBUTE_WITHIN_LOCK = 'within-lock';
const ATTRIBUTE_INTERIOR = 'interior';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_TEXT_CENTER = `[${ATTRIBUTE_TEXT_ALIGN}='${TEXT_ALIGN_CENTER}']`;
const IS_INTERIOR = `[${ATTRIBUTE_INTERIOR}]`;

const ELEMENT_NAME = 'umd-element-hero-default';
const HERO_ELEMENT_DECLARATION = 'hero-default-element-declaration';
const HERO_CONTAINER = 'hero-default-container';
const HERO_LOCK = 'hero-default-lock';

const OVERWRITE_TEXT_CONTAINER = `.${HERO_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_IMAGE_CONTAINER = `.${HERO_CONTAINER} .${ELEMENT_IMAGE_CONTINATER}`;
const OVERWRITE_EYEBROW = `.${HERO_CONTAINER} .${ELEMENT_HERO_EYEBROW}`;
const OVERWRITE_HEADLINE = `.${HERO_CONTAINER} .${ELEMENTS_HERO_HEADLINE}`;
const OVERWRITE_RICH_TEXT = `.${HERO_CONTAINER} .${ELEMENTS_HERO_RICH_TEXT}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${HERO_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${HERO_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER = `.${HERO_CONTAINER}${IS_TEXT_CENTER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_INTERIOR_HEADLINE = `.${HERO_CONTAINER}${IS_INTERIOR} .${ELEMENTS_HERO_HEADLINE}`;

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

  ${OVERWRITE_THEME_LIGHT_CONTAINER} * {
    color: ${Colors.black};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} {
    background-color: ${Colors.red};
  }

  ${OVERWRITE_THEME_MARYLAND_CONTAINER} * {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const OverwriteEyebrow = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignMaxium,
    },
  })}
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_HEADLINE} {
      max-width: 700px;
      margin: 0 auto;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    ${OVERWRITE_HEADLINE} {
      max-width: 776px;
    }
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}[size="extra-large"]`]: CampaignExtralarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_INTERIOR_HEADLINE}`]: CampaignExtralarge,
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
    font-weight: 400;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    display: flex;
    align-items: flex-end;
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding-top: ${Spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    ${OVERWRITE_TEXT_CONTAINER}:has(.${ELEMENT_HERO_EYEBROW}) {
      margin-top: -14px;
      padding-top: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      max-width: 736px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      max-width: 808px;
    }
  }

  ${OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER} {
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 928px;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER} {
      width: 80vw;
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      aspect-ratio: 16 / 9;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER}:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, .8) 85%);
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

// prettier-ignore
const DefaultStyles = `
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER} {
      height: 75vh;
      min-height: 480px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${HERO_CONTAINER} {
      min-height: 720px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_INTERIOR} {
      min-height: 400px;
      height: 40vh;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER} * {
      color: ${Colors.white};
    }
  }

  .${HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER} .${HERO_LOCK} {
      padding-top: ${Spacing['2xl']};
      padding-bottom: ${Spacing['2xl']};
    }
  }
`;

export const STYLES_HERO_DEFAULT_ELEMENT = `
.${HERO_ELEMENT_DECLARATION} {
  container: ${ELEMENT_NAME} / inline-size;
}

${ConvertJSSObjectToStyles({
  styleObj: {
    [`.${HERO_LOCK}`]: Lock['.base'],
  },
})}

${OverwriteEyebrow}
${OverwriteHeadline}
${OverwriteRichText}
${TextContainer.Styles}
${ImageContainer.Styles}
${DefaultStyles}
${OverwriteImageContainer}
${OverwriteTextContainer}
${OverwriteTheme}
`;

export const CreateHeroDefaultElement = (element: TypeHeroDefaultProps) => {
  const { theme, textAlignment, isWithLock, isInterior } = element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement({ element });
  const asset = ImageContainer.CreateElement({ element });

  container.classList.add(HERO_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.setAttribute(ATTRIBUTE_TEXT_ALIGN, textAlignment);

  if (isInterior) container.setAttribute(ATTRIBUTE_INTERIOR, '');

  lock.classList.add(HERO_LOCK);
  lock.appendChild(text);

  if (asset) {
    container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');

    if (isWithLock) {
      lock.appendChild(asset);
      container.setAttribute(ATTRIBUTE_WITHIN_LOCK, '');
    } else {
      container.appendChild(asset);
    }
  }

  container.appendChild(lock);

  declaration.classList.add(HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroDefaultElement,
  Styles: STYLES_HERO_DEFAULT_ELEMENT,
};
