import {
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, {
  TypePathwayHeroImageContainer,
} from './elements/image';

type TypePathwayHeroProps = TypePathwayTextContainer &
  TypePathwayHeroImageContainer & {
    isImageRight: boolean;
    includesAnimation?: boolean;
    includedStyles?: string;
  };

const { convertJSSObjectToStyles } = Utility.styles;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-pathway';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_HERO = 'hero';
const ATTRIBUTE_ANIMATION = 'data-animation';

const PATHWAY_HERO_CONTAINER = 'pathway-hero-container';
const PATHWAY_HERO_CONTAINER_WRAPPER = 'pathway-hero-container-wrapper';
const PATHWAY_HERO_CONTAINER_LOCK = 'pathway-hero-container-lock';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_WITH_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;

const OVERWRITE_IMAGE_CONTAINER = `.${PATHWAY_HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_HERO_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_TEXT_HEADLINE = `.${PATHWAY_HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_TEXT_RICHTEXT = `.${PATHWAY_HERO_CONTAINER} .${TextContainer.Elements.text}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_HERO_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_RIGHT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${PATHWAY_HERO_CONTAINER_WRAPPER}`;
const OVERWRITE_IMAGE_RIGHT_CONTAINER_IMAGE = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_CONTAINER_TEXT = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_CONTAINER_TEXT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_HERO_CONTAINER}${IS_WITH_IMAGE_LEFT}`;
const OVERWRITE_IMAGE_LEFT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${PATHWAY_HERO_CONTAINER_WRAPPER}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER_TEXT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_CONTAINER_ANIMATION = `.${PATHWAY_HERO_CONTAINER}${IS_WITH_ANIMATION}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.container}`;
const OVERWRITE_ANIMATION_IMAGE_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${ImageContainer.Elements.container}`;

// prettier-ignore
const OverwriteImageRightStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_WRAPPER} {
      padding-right: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_CONTAINER_IMAGE} {
      order: 2;
      left: inherit;
      right: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_CONTAINER_TEXT} {
      order: 1;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_CONTAINER_TEXT_WRAPPER} {
      padding-left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${PATHWAY_HERO_CONTAINER_LOCK} {
      padding-right: ${token.spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${PATHWAY_HERO_CONTAINER_LOCK} {
      padding-right: ${token.spacing['4xl']};
    }
  }
`;

// prettier-ignore
const OverwriteImageLeftStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_LEFT_WRAPPER} {
      padding-left: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_LEFT_CONTAINER_TEXT_WRAPPER} {
      padding-right: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_LEFT_CONTAINER} .${PATHWAY_HERO_CONTAINER_LOCK} {
      padding-left: ${token.spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_IMAGE_LEFT_CONTAINER} .${PATHWAY_HERO_CONTAINER_LOCK} {
      padding-left: ${token.spacing['4xl']};
    }
  }
`;

// prettier-ignore
const OverwriteImageContainerStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTAINER} div {
      height: 100%;
      width: 100%;
      overflow: clip;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img {
      min-height: inherit;
      width: 100%;
      height: 100%;
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

// prettier-ignore
const OverwriteTextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${token.spacing.md} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${token.spacing['4xl']} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${token.spacing['8xl']} 0;
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_HEADLINE}`]: typography.campaign.extralarge,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_HEADLINE} *`]: typography.campaign.extralarge,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_RICHTEXT} *`]: typography.sans.larger,
    },
  })}
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${OVERWRITE_TEXT_RICHTEXT}`]: typography.sans.larger,
    },
  })}
`;

// prettier-ignore
const AnimationStyles = `
  @keyframes pathway-hero-resize {
    from { transform: scale(1.1); }
    to { transform: scale(1); }
  }

  @keyframes pathway-hero-slide-up {
    from { transform: translateY(25px); opacity: .2 }
    to { transform: translateY(0); opacity: 1 }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    @media (prefers-reduced-motion: no-preference) {
      ${OVERWRITE_ANIMATION_IMAGE_CONTAINER} img,
      ${OVERWRITE_ANIMATION_IMAGE_CONTAINER} video{
        animation: pathway-hero-resize forwards 1.5s;
      }
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    @media (prefers-reduced-motion: no-preference) {
      ${OVERWRITE_ANIMATION_TEXT_CONTAINER} {
        animation: pathway-hero-slide-up forwards 1.5s;
      }
    }
  }
`;

const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HERO_CONTAINER_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  .${PATHWAY_HERO_CONTAINER_LOCK} {
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
      min-height: 720px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER_LOCK} > * {
      width: 100%;
    }
  }
`;

// prettier-ignore
const STYLES_PATHWAY_HERO_ELEMENT = `
  .${PATHWAY_HERO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
  }

  ${LockStyles}
  ${AnimationStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImageRightStyles}
  ${OverwriteImageLeftStyles}
`;

export default (element: TypePathwayHeroProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const {
    isImageRight = true,
    includesAnimation = true,
    includedStyles,
  } = element;

  const textContainer = TextContainer.CreateElement(element);
  const imageContainer = ImageContainer.CreateElement(element);
  let styles = STYLES_PATHWAY_HERO_ELEMENT;

  if (includedStyles) styles += includedStyles;

  container.classList.add(PATHWAY_HERO_CONTAINER);
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_HERO_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_HERO_CONTAINER_LOCK);

  lockWrapper.appendChild(textContainer.element);
  styles += textContainer.styles;
  lock.appendChild(lockWrapper);

  if (imageContainer) {
    wrapper.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }
  wrapper.appendChild(lock);

  if (includesAnimation) container.setAttribute(ATTRIBUTE_ANIMATION, '');
  container.setAttribute(ATTRIBUTE_HERO, '');
  container.appendChild(wrapper);
  return {
    element: container,
    styles,
  };
};
