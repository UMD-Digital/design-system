import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CreatePathwayTextContainer,
  TypePathwayTextContainer,
  TEXT_CONTAINER,
  TEXT_CONTAINER_WRAPPER,
} from '../../shared-elements/pathway/text';
import {
  CreatePathwayImageContainer,
  TypePathwayImageContainer,
  PATHWAY_CONTAINER_IMAGE,
} from '../../shared-elements/pathway/image';

type TypePathwayHeroProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImageRight: boolean;
  };

const { Colors, Spacing } = Tokens;
const { Lock } = Layout;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-image';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_IMAGE_SCALED = 'image-scaled';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';

const PATHWAY_IMAGE_CONTAINER = 'pathway-image-container';
const PATHWAY_IMAGE_CONTAINER_WRAPPER = 'pathway-image-container-wrapper';
const PATHWAY_IMAGE_CONTAINER_LOCK = 'pathway-image-container-lock';
const PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER =
  'pathway-image-container-lock-wrapper';
const PATHWAY_IMAGE_CONTAINER_BACKGROUND = 'pathway-image-container-background';

const IS_WITH_IMAGE_RIGHT = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_IMAGE_SCALED = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_IMAGE_SCALED}]`;
const IS_THEME_DARK = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `.${PATHWAY_IMAGE_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;

// prettier-ignore
const VarationThemeDark = `
  ${IS_THEME_DARK} .${PATHWAY_IMAGE_CONTAINER_BACKGROUND} {
    background-color: ${Colors.black};
  }
`

// prettier-ignore
const VarationThemeLight = `
  ${IS_THEME_LIGHT} .${PATHWAY_IMAGE_CONTAINER_BACKGROUND} {
    background-color: ${Colors.gray.lightest};
  }
`

// prettier-ignore
const VarationThemeMaryland = `
  ${IS_THEME_MARYLAND} .${PATHWAY_IMAGE_CONTAINER_BACKGROUND} {
    background-color: ${Colors.red};
  }
`

// prettier-ignore
const ImageContainerScaledStyles = `
  ${IS_IMAGE_SCALED} .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} {
    align-items: inherit;
  }

  ${IS_IMAGE_SCALED} .${PATHWAY_CONTAINER_IMAGE} img {
    object-fit: cover;
    object-position: center;
  }
`;

// prettier-ignore
const ImageContainerPositionStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_RIGHT} .${PATHWAY_CONTAINER_IMAGE} {
      order: 2;
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_CONTAINER_IMAGE} img {
      min-height: 656px;
     }
  }
`;

// prettier-ignore
const TextContainerPositionStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_RIGHT} .${TEXT_CONTAINER} {
      order: 1;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_RIGHT} .${TEXT_CONTAINER_WRAPPER} {
      padding-left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_LEFT} .${TEXT_CONTAINER_WRAPPER} {
      padding-right: 0;
    }
  }
`;

// prettier-ignore
const TextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_IMAGE_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing.md} 0;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${PATHWAY_IMAGE_CONTAINER} .${TEXT_CONTAINER_WRAPPER}`]: Lock['.base'],
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_IMAGE_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_IMAGE_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing['8xl']} ${Spacing['6xl']};
    }
  }
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_IMAGE_CONTAINER_LOCK}`]: Lock['.base'],
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_IMAGE_CONTAINER_LOCK} {
      padding: 0;
    }
  }
`;

const LockWrapperStyles = `
  .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} {
      padding: 0;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} {
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} > * {
      width: 50%;
    }
  }
`;

const BackgroundStyles = `
  .${PATHWAY_IMAGE_CONTAINER_BACKGROUND} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1000px;
    width: calc(100% + 1000px) !important;
    background-color: ${Colors.white};
  }

  .${PATHWAY_IMAGE_CONTAINER}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_IMAGE_CONTAINER_BACKGROUND} {
    left: -1000px;
  }
`;

// prettier-ignore
const STYLES_PATHWAY_IMAGE_ELEMENT = `
  .${PATHWAY_IMAGE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: hidden;
  }

  .${PATHWAY_IMAGE_CONTAINER} * {
    color: ${Colors.black};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_IMAGE_CONTAINER}${IS_THEME_LIGHT} .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER},
    .${PATHWAY_IMAGE_CONTAINER}${IS_THEME_DARK} .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER},
    .${PATHWAY_IMAGE_CONTAINER}${IS_THEME_MARYLAND} .${PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER} {
      padding: ${Spacing['6xl']} 0;
    }
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${BackgroundStyles}
  ${TextContainerStyles}
  ${TextContainerPositionStyles}
  ${ImageContainerStyles}
  ${ImageContainerScaledStyles}
  ${ImageContainerPositionStyles}
  ${VarationThemeDark}
  ${VarationThemeLight}
  ${VarationThemeMaryland}
`;

const CreatePathwayImageElement = (element: TypePathwayHeroProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const background = document.createElement('div');
  const { isImageRight = true, isImageScaled = true, theme } = element;

  const textContainer = CreatePathwayTextContainer(element);
  const imageContainer = CreatePathwayImageContainer(element);

  container.classList.add(PATHWAY_IMAGE_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  if (isImageScaled) container.setAttribute(ATTRIBUTE_IMAGE_SCALED, '');
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_IMAGE_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_IMAGE_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_IMAGE_CONTAINER_LOCK_WRAPPER);
  background.classList.add(PATHWAY_IMAGE_CONTAINER_BACKGROUND);

  lockWrapper.appendChild(background);

  if (imageContainer) lockWrapper.appendChild(imageContainer);
  lockWrapper.appendChild(textContainer);

  lock.appendChild(lockWrapper);
  wrapper.appendChild(lock);
  container.appendChild(wrapper);
  return container;
};

export default {
  CreateElement: CreatePathwayImageElement,
  Styles: STYLES_PATHWAY_IMAGE_ELEMENT,
};
