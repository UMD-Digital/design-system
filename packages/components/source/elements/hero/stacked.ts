import {
  Layout,
  Tokens,
  Typography,
  Elements,
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

type TypeHeroStackedProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    textAlignment: string;
    theme: string;
    isWithLock: boolean;
    isInterior: boolean;
  };

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignExtralarge, CampaignLarge, SansLarger } = Typography;

const TABLET = 768;

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
const IS_WITHIN_LOCK = `[${ATTRIBUTE_WITHIN_LOCK}]`;
const IS_INTERIOR = `[${ATTRIBUTE_INTERIOR}]`;

const ELEMENT_NAME = 'umd-element-hero-stacked';
const ELEMENT_HERO_DECLARATION = 'hero-stacked-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-stacked-container';
const ELEMENT_HERO_LOCK = 'hero-stacked-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_IMAGE_CONTINATER}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_HERO_EYEBROW}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${ELEMENTS_HERO_HEADLINE}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${ELEMENTS_HERO_RICH_TEXT}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_TEXT_CENTER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_INTERIOR_HEADLINE = `.${ELEMENT_HERO_CONTAINER}${IS_INTERIOR} .${ELEMENTS_HERO_HEADLINE}`;

const OVERWRITE_WITH_LOCK_HEADLINE = `.${ELEMENT_HERO_CONTAINER}${IS_WITHIN_LOCK} .${ELEMENTS_HERO_HEADLINE}`;

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

  .${OVERWRITE_EYEBROW} {
    color: ${Colors.black}
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignExtralarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_WITH_LOCK_HEADLINE}`]: CampaignLarge,
    },
  })}
  
  ${OVERWRITE_HEADLINE} {
    color: ${Colors.black};
    max-width: 700px;
    margin: 0 auto;
  }
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
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
    display: flex;
    justify-content: center;
    text-align: center;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding: ${Spacing['5xl']} 0 ${Spacing['3xl']};
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    max-height: 700px;
  }
`;

export const STYLES_HERO_STACKED_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${ELEMENT_HERO_CONTAINER} {
    display: flex;
    flex-direction: column-reverse;
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
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export const CreateHeroStackedElement = (element: TypeHeroStackedProps) => {
  const { theme, textAlignment, isWithLock, isInterior } = element;

  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement({ element });
  const asset = ImageContainer.CreateElement({ element });

  container.classList.add(ELEMENT_HERO_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.setAttribute(ATTRIBUTE_TEXT_ALIGN, textAlignment);

  if (isInterior) container.setAttribute(ATTRIBUTE_INTERIOR, '');

  lock.classList.add(ELEMENT_HERO_LOCK);
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

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroStackedElement,
  Styles: STYLES_HERO_STACKED_ELEMENT,
};
