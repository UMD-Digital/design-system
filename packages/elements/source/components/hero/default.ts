import {
  Layout,
  Tokens,
  Elements,
  Typography,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroDefaultProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    isInterior: boolean;
    includesAnimation?: boolean;
  };

const { LockMax } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignMaxium, CampaignExtralarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;
const DESKTOP = 1024;

const ATTRIBUTE_TEXT_ALIGN = 'text-align';
const ATTRIBUTE_INTERIOR = 'interior';
const ATTRIBUTE_HEADLINE_SIZE = 'headline-size';
const ATTRIBUTE_IS_VIDEO = 'data-video';
const ATTRIBUTE_ANIMATION = 'data-animation';
const TEXT_ALIGN_CENTER = 'center';
const HEADLINE_SIZE_LARGE = 'extra-large';

const ELEMENT_NAME = 'umd-element-hero-default';
const HERO_ELEMENT_DECLARATION = 'hero-default-element-declaration';
const HERO_CONTAINER = 'hero-default-container';
const HERO_LOCK = 'hero-default-lock';

const IS_TEXT_CENTER = `[${ATTRIBUTE_TEXT_ALIGN}='${TEXT_ALIGN_CENTER}']`;
const IS_INTERIOR = `[${ATTRIBUTE_INTERIOR}]`;
const IS_LARGE_HEADLINE = `[${ATTRIBUTE_HEADLINE_SIZE}='${HEADLINE_SIZE_LARGE}']`;
const IS_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;

const OVERWRITE_TEXT_CONTAINER = `.${HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_CONTAINER = `.${HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_EYEBROW = `.${HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT = `.${HERO_CONTAINER} .${TextContainer.Elements.richText}`;

const OVERWRITE_INTERIOR_CONTAINER = `.${HERO_CONTAINER}${IS_INTERIOR}`;
const OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER = `.${HERO_CONTAINER}${IS_TEXT_CENTER} .${TextContainer.Elements.container}`;
const OVERWRITE_SIZE_LARGE_HEADLINE = `.${HERO_CONTAINER}${IS_LARGE_HEADLINE} .${TextContainer.Elements.headline}`;

const OVERWRITE_VIDEO_CONTAINER = `.${HERO_CONTAINER}[${ATTRIBUTE_IS_VIDEO}]`;
const OVERWRITE_VIDEO_IMAGE_WRAPPER = `${OVERWRITE_VIDEO_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_CONTAINER_ANIMATION = `.${HERO_CONTAINER}${IS_ANIMATION}`;
const OVERWRITE_IMAGE_WRAPPER_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_CONTAINER_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${ImageContainer.Elements.container}`;

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
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_HEADLINE} {
      max-width: 700px;
      margin: 0 auto;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    ${OVERWRITE_HEADLINE} {
      max-width: 816px;
    }
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_SIZE_LARGE_HEADLINE}`]: CampaignMaxium,
      },
    })}
  }
`;

// prettier-ignore
const OverwriteRichText = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT} *`]: SansLarger,
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
    ${OVERWRITE_TEXT_CONTAINER}:has(.${TextContainer.Elements.eyebrow}) {
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
    margin-left: auto;
    margin-right: auto;
    max-width: 928px;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CENTER_ALIGNMENT_TEXT_CONTAINER} {
      width: 80%;
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
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 85%);
      z-index: 99;
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

const AnimationStyles = `
  @keyframes hero-scale-down {
    from { transform: scale(1.1); }
    to { transform: scale(1); }
  }

  @keyframes hero-slide-up {
    from { transform: translateY(25px); opacity: .2 }
    to { transform: translateY(0); opacity: 1 }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_IMAGE_CONTAINER_ANIMATION} img {
      animation: hero-scale-down forwards 1s;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_IMAGE_WRAPPER_ANIMATION} {
      animation: hero-slide-up forwards 1s;
    }
  }

  ${OVERWRITE_VIDEO_IMAGE_WRAPPER} {
    animation: none;
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
    ${OVERWRITE_INTERIOR_CONTAINER} {
      min-height: auto;
      height: auto;
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

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_INTERIOR_CONTAINER} .${HERO_LOCK} {
      min-height: 400px;
      align-items: flex-end;
      display: flex;
    }
  }
`;

export const STYLES_HERO_DEFAULT_ELEMENT = `
  .${HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: hidden;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_LOCK}`]: LockMax,
    },
  })}
  
  ${TextContainer.Styles}
  ${ImageContainer.Styles}
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${DefaultStyles}
  ${AnimationStyles}
  ${OverwriteImageContainer}
  ${OverwriteTextContainer}
`;

export const CreateHeroDefaultElement = (element: TypeHeroDefaultProps) => {
  const { headline, isTextCenter, isInterior, videoRef, includesAnimation } =
    element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement(element);
  const asset = ImageContainer.CreateElement(element);

  lock.classList.add(HERO_LOCK);
  lock.appendChild(text);
  if (asset) container.appendChild(asset);
  if (videoRef) container.setAttribute(ATTRIBUTE_IS_VIDEO, '');

  if (!isInterior && headline) {
    const characterCount = headline.textContent?.trim().length || 0;
    if (characterCount < 30) {
      container.setAttribute(ATTRIBUTE_HEADLINE_SIZE, HEADLINE_SIZE_LARGE);
    }
  }

  if (isTextCenter)
    container.setAttribute(ATTRIBUTE_TEXT_ALIGN, TEXT_ALIGN_CENTER);
  if (isInterior) container.setAttribute(ATTRIBUTE_INTERIOR, '');
  if (includesAnimation) container.setAttribute(ATTRIBUTE_ANIMATION, '');
  container.classList.add(HERO_CONTAINER);
  container.appendChild(lock);

  declaration.classList.add(HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroDefaultElement,
  Styles: STYLES_HERO_DEFAULT_ELEMENT,
};
