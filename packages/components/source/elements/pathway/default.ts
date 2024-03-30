import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CreatePathwayTextContainer,
  TypePathwayTextContainer,
  ELEMENT_TEXT_CONTAINER,
  ELEMENT_TEXT_CONTAINER_WRAPPER,
} from './elements/text';
import {
  CreatePathwayImageContainer,
  TypePathwayImageContainer,
  ELEMENT_PATHWAY_CONTAINER_IMAGE,
} from './elements/image';

type TypePathwayDefaultProps = TypePathwayTextContainer &
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

const PATHWAY_DEFAULT_CONTAINER = 'pathway-default-container';
const PATHWAY_DEFAULT_CONTAINER_WRAPPER = 'pathway-default-container-wrapper';
const PATHWAY_DEFAULT_CONTAINER_LOCK = 'pathway-default-container-lock';
const PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER =
  'pathway-image-container-lock-wrapper';
const PATHWAY_DEFAULT_CONTAINER_BACKGROUND =
  'pathway-image-container-background';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_IMAGE_SCALED = `[${ATTRIBUTE_IMAGE_SCALED}]`;
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}='${THEME_LIGHT}']`;
const IS_THEME_MARYLAND = `[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;

const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_DEFAULT_CONTAINER} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_LEFT}`;
const OVERWRITE_IMAGE_SCALED_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_IMAGE_SCALED}`;
const OVERWRITE_THEME_DARK_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_LIGHT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_MARYLAND_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_THEME_MARYLAND}`;

const OVERWRITE_IMAGE_RIGHT_BACKGROUND = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND}`;
const OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ELEMENT_PATHWAY_CONTAINER_IMAGE}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;
const OVERWRITE_IMAGE_LEFT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${ELEMENT_TEXT_CONTAINER_WRAPPER}`;

const OVERWRITE_IMAGE_SCALED_IMAGE_CONTAINER = `${OVERWRITE_IMAGE_SCALED_CONTAINER} .${ELEMENT_PATHWAY_CONTAINER_IMAGE}`;
const OVERWRITE_IMAGE_SCALED_IMAGE_LOCK = `${OVERWRITE_IMAGE_SCALED_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER}`;

const OVERWRITE_THEME_DARK_BACKGROUND = `${OVERWRITE_THEME_DARK_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND}`;
const OVERWRITE_THEME_LIGHT_BACKGROUND = `${OVERWRITE_THEME_LIGHT_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND}`;
const OVERWRITE_THEME_MARYLAND_BACKGROUND = `${OVERWRITE_THEME_MARYLAND_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND}`;

// prettier-ignore
const OverwriteVarationTheme = `
  ${OVERWRITE_THEME_DARK_BACKGROUND} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_LIGHT_BACKGROUND} {
    background-color: ${Colors.gray.lightest};
  }

  ${OVERWRITE_THEME_MARYLAND_BACKGROUND} {
    background-color: ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_THEME_LIGHT_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER},
    ${OVERWRITE_THEME_DARK_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER},
    ${OVERWRITE_THEME_MARYLAND_CONTAINER} .${PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER} {
      padding: ${Spacing['6xl']} 0;
    }
  }
`

// prettier-ignore
const OverwriteImageScaledStyles = `
  ${OVERWRITE_IMAGE_SCALED_IMAGE_LOCK} {
    align-items: inherit;
  }

  ${OVERWRITE_IMAGE_SCALED_IMAGE_CONTAINER} img {
    object-fit: cover;
    object-position: center;
    height: 100%;
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
    .${ELEMENT_PATHWAY_CONTAINER_IMAGE} img {
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
        [`${OVERWRITE_TEXT_WRAPPER}`]: Lock['.base'],
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
      [`.${PATHWAY_DEFAULT_CONTAINER_LOCK}`]: Lock['.base'],
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

const BackgroundStyles = `
  .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: ${Colors.white};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_DEFAULT_CONTAINER_BACKGROUND} {
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
const STYLES_PATHWAY_DEFAULT_ELEMENT = `
  .${PATHWAY_DEFAULT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: hidden;
  }

  .${PATHWAY_DEFAULT_CONTAINER} * {
    color: ${Colors.black};
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${BackgroundStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImageScaledStyles}
  ${OverwriteImagePositionStyles}
  ${OverwriteVarationTheme}
`;

const CreatePathwayDefaultElement = (element: TypePathwayDefaultProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const background = document.createElement('div');
  const { isImageRight = true, isImageScaled = true, theme } = element;

  const textContainer = CreatePathwayTextContainer(element);
  const imageContainer = CreatePathwayImageContainer(element);

  container.classList.add(PATHWAY_DEFAULT_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  if (isImageScaled) container.setAttribute(ATTRIBUTE_IMAGE_SCALED, '');
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER);
  background.classList.add(PATHWAY_DEFAULT_CONTAINER_BACKGROUND);

  lockWrapper.appendChild(background);

  if (imageContainer) lockWrapper.appendChild(imageContainer);
  lockWrapper.appendChild(textContainer);

  lock.appendChild(lockWrapper);
  wrapper.appendChild(lock);
  container.appendChild(wrapper);
  return container;
};

export default {
  CreateElement: CreatePathwayDefaultElement,
  Styles: STYLES_PATHWAY_DEFAULT_ELEMENT,
};
