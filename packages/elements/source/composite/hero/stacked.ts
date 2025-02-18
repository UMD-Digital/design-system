import {
  element,
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroStackedProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    isTextCenter: boolean;
    isWithLock: boolean;
    isInterior: boolean;
    includesAnimation?: boolean;
  };

const { convertJSSObjectToStyles } = Utility.styles;

const TABLET = 768;

const ATTRIBUTE_WITHIN_LOCK = 'within-lock';
const ATTRIBUTE_ANIMATION = 'data-animation';

const IS_WITHIN_LOCK = `[${ATTRIBUTE_WITHIN_LOCK}]`;
const IS_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;

const ELEMENT_NAME = 'umd-element-hero-stacked';
const ELEMENT_HERO_DECLARATION = 'hero-stacked-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-stacked-container';
const ELEMENT_HERO_LOCK = 'hero-stacked-lock';
const ELEMENT_HERO_IMAGE_OVERLAY = 'hero-stacked-image-overlay';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_TEXT_WRAPPER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.richText}`;

const OVERWRITE_WITH_LOCK_HEADLINE = `.${ELEMENT_HERO_CONTAINER}${IS_WITHIN_LOCK} .${TextContainer.Elements.headline}`;

const OVERWRITE_CONTAINER_ANIMATION = `.${ELEMENT_HERO_CONTAINER}${IS_ANIMATION}`;
const OVERWRITE_TEXT_CONTAINER_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.container}`;
const OVERWRITE_HEADLINE_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.richText}`;
const OVERWRITE_IMAGE_OVERLAY_ANIMATION = `${OVERWRITE_CONTAINER_ANIMATION} .${ELEMENT_HERO_IMAGE_OVERLAY}`;

// prettier-ignore
const OverwriteEyebrow = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: element.text.decoration.ribbon,
    },
  })}

  .${OVERWRITE_EYEBROW} {
    color: ${token.color.black}
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: typography.campaign.extralarge,
    },
  })}
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_WITH_LOCK_HEADLINE}`]: typography.campaign.large,
    },
  })}
  
  ${OVERWRITE_HEADLINE} {
    color: ${token.color.black};
    max-width: 700px;
    margin: 0 auto;
  }
`;

// prettier-ignore
const OverwriteRichText = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT} *`]: typography.sans.larger,
    },
  })}

  ${OVERWRITE_RICH_TEXT} {
    color: ${token.color.gray.dark};
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding: ${token.spacing.lg} 0;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding: ${token.spacing['6xl']} 0 ${token.spacing['3xl']};
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    overflow: clip;
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    max-height: 700px;
  }

  .${ELEMENT_HERO_IMAGE_OVERLAY} {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    width: 100vw;
    display: block;
    background-color: rgba(0,0,0,.7);
    z-index: 99;
    opacity: 0;
  }
`;

const AnimationStyles = `
  @keyframes hero-stacked-fade-over {
    from { opacity: 0;}
    to { opacity: 1; }
  }

  @keyframes hero-stacked-font-color {
    from { color: ${token.color.black}; }
    to { color: ${token.color.white}; }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        ${OVERWRITE_TEXT_CONTAINER_ANIMATION} {
          position: sticky;
          top: 0;
          overflow: clip;
          z-index: 999;
        }
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        ${OVERWRITE_IMAGE_OVERLAY_ANIMATION} {
          animation: hero-stacked-fade-over ease-in-out forwards;
          animation-timeline: view();
          animation-range-start: 30vh;
          animation-range-end: 70vh;
        }
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        ${OVERWRITE_RICH_TEXT_ANIMATION},
        ${OVERWRITE_RICH_TEXT_ANIMATION} *,
        ${OVERWRITE_HEADLINE_ANIMATION} {
          animation: hero-stacked-font-color ease-in-out forwards;
          animation-timeline: view();
          animation-range-start: 50vh;
          animation-range-end: 160vh;
        }
      }
    }
  }
`;

export const STYLES_HERO_STACKED_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_CONTAINER} {
    display: flex;
    flex-direction: column-reverse;
  }
  
  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }

  ${OVERWRITE_TEXT_WRAPPER} > * {
    position: relative;
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  ${AnimationStyles}
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
`;

export const CreateHeroStackedElement = (element: TypeHeroStackedProps) => {
  const { isWithLock, includesAnimation } = element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement(element);
  const asset = ImageContainer.CreateElement({
    ...element,
    isTypeStacked: true,
  });
  let styles = STYLES_HERO_STACKED_ELEMENT;

  container.classList.add(ELEMENT_HERO_CONTAINER);
  if (includesAnimation) container.setAttribute(ATTRIBUTE_ANIMATION, '');

  lock.classList.add(ELEMENT_HERO_LOCK);

  if (asset) {
    const overlay = document.createElement('div');
    overlay.classList.add(ELEMENT_HERO_IMAGE_OVERLAY);

    asset.element.appendChild(overlay);
    styles += asset.styles;
    styles += text.styles;

    if (isWithLock) {
      lock.appendChild(text.element);
      lock.appendChild(asset.element);
      container.setAttribute(ATTRIBUTE_WITHIN_LOCK, '');
      container.appendChild(lock);
    } else {
      lock.innerHTML = text.element.innerHTML;
      text.element.innerHTML = '';
      text.element.appendChild(lock);

      container.appendChild(asset.element);
      container.appendChild(text.element);
    }
  } else {
    lock.appendChild(text.element);
    container.appendChild(lock);
  }

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return { element: declaration, styles };
};

export default {
  CreateElement: CreateHeroStackedElement,
};
