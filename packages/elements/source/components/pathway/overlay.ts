import { Layout, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, { TypePathwayImageContainer } from './elements/image';

type TypePathwayOverlayProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImageRight: boolean;
    includesAnimation?: boolean;
    isThemeLight?: boolean;
    isThemeMaryland?: boolean;
  };

const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-overlay';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ANIMATION = 'data-animation';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const PATHWAY_OVERLAY_CONTAINER = 'pathway-overlay-container';
const PATHWAY_OVERLAY_CONTAINER_WRAPPER = 'pathway-overlay-container-wrapper';
const PATHWAY_OVERLAY_CONTAINER_LOCK = 'pathway-overlay-container-lock';
const PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER =
  'pathway-overlay-container-lock-wrapper';
const PATHWAY_OVERLAY_CONTAINER_BACKGROUND =
  'pathway-overlay-container-background';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;
const IS_ANIMATION_START = `[${ATTRIBUTE_ANIMATION}="true"]`;

const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_OVERLAY_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_OVERLAY_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_OVERLAY_CONTAINER}${IS_WITH_IMAGE_LEFT}`;
const OVERWRITE_THEME_DARK_CONTAINER = `.${PATHWAY_OVERLAY_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${PATHWAY_OVERLAY_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${PATHWAY_OVERLAY_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_IMAGE_RIGHT_BACKGROUND = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND}`;
const OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_LEFT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_THEME_DARK_BACKGROUND = `${OVERWRITE_THEME_DARK_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND}`;
const OVERWRITE_THEME_LIGHT_BACKGROUND = `${OVERWRITE_THEME_LIGHT_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND}`;
const OVERWRITE_THEME_MARYLAND_BACKGROUND = `${OVERWRITE_THEME_MARYLAND_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND}`;

const OVERWRITE_CONTAINER_ANIMATION = `.${PATHWAY_OVERLAY_CONTAINER}${IS_ANIMATION}`;
const OVERWRITE_CONTAINER_ANIMATION_START = `.${PATHWAY_OVERLAY_CONTAINER}${IS_ANIMATION_START}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.container}`;
const OVERWRITE_ANIMATION_IMAGE_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${ImageContainer.Elements.container}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER_START = `${OVERWRITE_CONTAINER_ANIMATION_START} .${TextContainer.Elements.container}`;
const OVERWRITE_ANIMATION_IMAGE_CONTAINER_START = `${OVERWRITE_CONTAINER_ANIMATION_START} .${ImageContainer.Elements.container}`;

// prettier-ignore
const AnimationStyles = `
  @keyframes pathway-fade-in {
    from {
      opacity: 0;
      transform: translateY(100px);
   }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER}, 
    ${OVERWRITE_ANIMATION_IMAGE_CONTAINER} {
      opacity: 0;
      transform: translateY(100px);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER_START}, 
    ${OVERWRITE_ANIMATION_IMAGE_CONTAINER_START} {
      animation: pathway-fade-in 1s forwards;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER_START} {
      animation-delay: 0.5s;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_IMAGE_CONTAINER_START} {
      animation-delay: 0s;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER} {
       animation-delay: 0s;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER} {
      animation-delay: 0.5s;
    }
  }
`;

// prettier-ignore
const BackgroundAnimationStyles = `
  @keyframes pathway-overlay-background {
    from {
      transform: translateX(30vw);
   }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pathway-overlay-background-right {
    from {
      transform: translateX(-30vw);
   }
    to {
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      ${OVERWRITE_CONTAINER_ANIMATION} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND} {
        animation: pathway-overlay-background forwards;
        animation-timeline: view();
        animation-range-start: entry;
        animation-range-end: contain;
        transform: translateX(30vw);
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${PATHWAY_OVERLAY_CONTAINER}${IS_WITH_IMAGE_RIGHT}${IS_ANIMATION} .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND} {
        animation: pathway-overlay-background-right forwards;
        animation-timeline: view();
        animation-range-start: entry;
        animation-range-end: contain;
        transform: translateX(-30vw);
      }
    }
  }
`

// prettier-ignore
const OverwriteVarationTheme = `
  ${OVERWRITE_THEME_DARK_BACKGROUND} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_LIGHT_BACKGROUND} {
    background-color: ${Colors.gray.lighter};
  }

  ${OVERWRITE_THEME_MARYLAND_BACKGROUND} {
    background-color: ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_THEME_LIGHT_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER},
    ${OVERWRITE_THEME_DARK_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER},
    ${OVERWRITE_THEME_MARYLAND_CONTAINER} .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER} {
      padding: ${Spacing['6xl']} 0;
    }
  }
`

// prettier-ignore
const OverwriteImagePositionStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER} {
      order: 2;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER} {
      order: 1;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_TEXT_WRAPPER} {
      padding-left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_LEFT_TEXT_WRAPPER} {
      padding-right: 0;
    }
  }
`;

// prettier-ignore
const OverwriteImageContainerStyles = `
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ImageContainer.Elements.container} img {
      min-height: 656px;
     }
  }
`;

// prettier-ignore
const OverwriteTextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${Spacing.md} 0;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_WRAPPER}`]: LockMax ,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${Spacing['8xl']} ${Spacing['6xl']};
    }
  }
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_OVERLAY_CONTAINER_LOCK}`]: LockMax,
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_OVERLAY_CONTAINER_LOCK} {
      padding: 0;
    }
  }
`;

const LockWrapperStyles = `
  .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER} {
      padding: 0;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER} {
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER} > * {
      width: 50%;
    }
  }
`;

const BackgroundStyles = `
  .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: ${Colors.white};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_OVERLAY_CONTAINER_BACKGROUND} {
      right: -1000px;
      width: calc(75% + 1000px) !important;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_RIGHT_BACKGROUND} {
      left: -1000px;
    }
  }
`;

// prettier-ignore
const STYLES_PATHWAY_OVERLAY_ELEMENT = `
  .${PATHWAY_OVERLAY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: clip;
  }

  .${PATHWAY_OVERLAY_CONTAINER} * {
    color: ${Colors.black};
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${BackgroundStyles}
  ${AnimationStyles}
  ${BackgroundAnimationStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImagePositionStyles}
  ${OverwriteVarationTheme}
`;

const Animation = ({
  includesAnimation = true,
  container,
}: {
  includesAnimation?: boolean;
  container: HTMLElement;
}) => {
  if (includesAnimation) {
    const animation: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          target.setAttribute(ATTRIBUTE_ANIMATION, 'true');
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(animation, {
      root: null,
      rootMargin: '0px',
      threshold: [0.35],
    });

    observer.observe(container);
    container.setAttribute(ATTRIBUTE_ANIMATION, '');
  }
};

const CreatePathwayOverlayElement = (element: TypePathwayOverlayProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const background = document.createElement('div');
  const {
    isImageRight = true,
    includesAnimation,
    isThemeDark,
    isThemeLight,
    isThemeMaryland,
  } = element;

  const textContainer = TextContainer.CreateElement(element);
  const imageContainer = ImageContainer.CreateElement(element);
  const loadAnimation = () => {
    Animation({ includesAnimation, container });
  };

  container.classList.add(PATHWAY_OVERLAY_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isThemeLight) container.setAttribute(ATTRIBUTE_THEME, THEME_LIGHT);
  if (isThemeMaryland) container.setAttribute(ATTRIBUTE_THEME, THEME_MARYLAND);

  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_OVERLAY_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_OVERLAY_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_OVERLAY_CONTAINER_LOCK_WRAPPER);
  background.classList.add(PATHWAY_OVERLAY_CONTAINER_BACKGROUND);

  lockWrapper.appendChild(background);

  if (imageContainer) lockWrapper.appendChild(imageContainer);
  lockWrapper.appendChild(textContainer);

  lock.appendChild(lockWrapper);
  wrapper.appendChild(lock);
  container.appendChild(wrapper);

  return {
    element: container,
    events: {
      loadAnimation,
    },
  };
};

export default {
  CreateElement: CreatePathwayOverlayElement,
  Styles: STYLES_PATHWAY_OVERLAY_ELEMENT,
};
