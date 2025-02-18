import { layout, token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, { TypePathwayImageContainer } from './elements/image';

type TypePathwayDefaultProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImageRight: boolean;
    includesAnimation?: boolean;
    includedStyles?: string;
  };

const { convertJSSObjectToStyles } = Utility.styles;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-image';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ANIMATION = 'data-animation';

const PATHWAY_DEFAULT_CONTAINER = 'pathway-default-container';
const PATHWAY_DEFAULT_CONTAINER_WRAPPER = 'pathway-default-container-wrapper';
const PATHWAY_DEFAULT_CONTAINER_LOCK = 'pathway-default-container-lock';
const PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER =
  'pathway-image-container-lock-wrapper';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_ANIMATION = `[${ATTRIBUTE_ANIMATION}]`;
const IS_ANIMATION_START = `[${ATTRIBUTE_ANIMATION}="true"]`;

const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_DEFAULT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_LEFT}`;

const OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_LEFT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_CONTAINER_ANIMATION = `.${PATHWAY_DEFAULT_CONTAINER}${IS_ANIMATION}`;
const OVERWRITE_CONTAINER_ANIMATION_START = `.${PATHWAY_DEFAULT_CONTAINER}${IS_ANIMATION_START}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${TextContainer.Elements.container}`;
const OVERWRITE_ANIMATION_IMAGE_CONTAINER = `${OVERWRITE_CONTAINER_ANIMATION} .${ImageContainer.Elements.container}`;
const OVERWRITE_ANIMATION_TEXT_CONTAINE_START = `${OVERWRITE_CONTAINER_ANIMATION_START} .${TextContainer.Elements.container}`;
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
    ${OVERWRITE_ANIMATION_TEXT_CONTAINE_START}, 
    ${OVERWRITE_ANIMATION_IMAGE_CONTAINER_START} {
      animation: pathway-fade-in 1s forwards;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_TEXT_CONTAINER} {
      animation-delay: 0.5s;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${OVERWRITE_ANIMATION_IMAGE_CONTAINER} {
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
      padding: ${token.spacing.md} 0;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_WRAPPER}`]: layout.space.horizontal.max,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: 0 ${token.spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: 0 ${token.spacing['6xl']};
    }
  }
`;

const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_DEFAULT_CONTAINER_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_DEFAULT_CONTAINER_LOCK} {
      padding: 0;
    }
  }
`;

const LockWrapperStyles = `
  .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER} {
      padding: 0;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER} {
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER} > * {
      width: 50%;
    }
  }
`;

// prettier-ignore
const STYLES_PATHWAY_DEFAULT_ELEMENT = `
  .${PATHWAY_DEFAULT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: hidden;
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${AnimationStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImagePositionStyles}
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
      rootMargin: '0px',
      threshold: [0.35],
    });

    observer.observe(container);
    container.setAttribute(ATTRIBUTE_ANIMATION, '');
  }
};

const CreatePathwayDefaultElement = (props: TypePathwayDefaultProps) => {
  const {
    isImageRight = true,
    includesAnimation,
    isThemeDark,
    includedStyles,
  } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  let styles = STYLES_PATHWAY_DEFAULT_ELEMENT;

  if (includedStyles) styles += includedStyles;

  const textContainer = TextContainer.CreateElement(props);
  const imageContainer = ImageContainer.CreateElement(props);
  const loadAnimation = () => {
    Animation({ includesAnimation, container });
  };

  container.classList.add(PATHWAY_DEFAULT_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER);

  if (imageContainer) {
    lockWrapper.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  lockWrapper.appendChild(textContainer.element);
  styles += textContainer.styles;

  lock.appendChild(lockWrapper);
  wrapper.appendChild(lock);
  container.appendChild(wrapper);

  return {
    element: container,
    styles,
    events: {
      loadAnimation,
    },
  };
};

export default {
  CreateElement: CreatePathwayDefaultElement,
};
