import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import ImageContainer, {
  TypeImageContainerProps,
  ELEMENT_IMAGE_CONTINATER,
} from './elements/image';
import TextContainer, {
  TypeTextContainerProps,
  ELEMENT_TEXT_CONTAINER,
  ELEMENT_TEXT_CONTAINER_WRAPPER,
  ELEMENT_HERO_EYEBROW,
  ELEMENTS_HERO_HEADLINE,
} from './elements/text';

type TypeHeroMinimalProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    textAlignment: string;
    theme: string;
    isWithLock: boolean;
    isInterior: boolean;
  };

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { SansLargest, SansSmaller } = Typography;

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
const IS_WITH_IMAGE = `[${ATTRIBUTE_HAS_IMAGE}]`;
const IS_WITHIN_LOCK = `[${ATTRIBUTE_WITHIN_LOCK}]`;
const IS_INTERIOR = `[${ATTRIBUTE_INTERIOR}]`;

const ELEMENT_NAME = 'umd-element-hero-minimal';
const ELEMENT_HERO_DECLARATION = 'hero-minimal-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-minimal-container';
const ELEMENT_HERO_LOCK = 'hero-minimal-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_IMAGE_CONTINATER}`;

const OVERWRITE_TEXT_CONTAINER_WRAPPER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_HERO_EYEBROW}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${ELEMENTS_HERO_HEADLINE}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_WITH_IMAGE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER}${IS_WITH_IMAGE} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_CENTERED_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER}${IS_TEXT_CENTER} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;

const OVERWRITE_THEME_DARK_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_DARK} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_MARYLAND_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER}${IS_THEME_MARYLAND} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;

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

  ELEMENT_TEXT_CONTAINER_WRAPPER
  ${OVERWRITE_TEXT_CONTAINER_WRAPPER} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_CENTERED_TEXT_WRAPPER} {
      padding-left: ${Spacing.lg};
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
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
  ${OverwriteTheme}
`;

export const CreateHeroMinimalElement = (element: TypeHeroMinimalProps) => {
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
  CreateElement: CreateHeroMinimalElement,
  Styles: STYLES_HERO_MINIMAL_ELEMENT,
};
