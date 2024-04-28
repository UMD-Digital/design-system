import { Layout, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, { TypePathwayImageContainer } from './elements/image';

type TypePathwayOverlayProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImageRight: boolean;
  };

const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-overlay';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_THEME = 'theme';
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
    overflow: hidden;
  }

  .${PATHWAY_OVERLAY_CONTAINER} * {
    color: ${Colors.black};
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${BackgroundStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImagePositionStyles}
  ${OverwriteVarationTheme}
`;

const CreatePathwayOverlayElement = (element: TypePathwayOverlayProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const background = document.createElement('div');
  const { isImageRight = true, isImageScaled = true, theme } = element;

  const textContainer = TextContainer.CreateElement(element);
  const imageContainer = ImageContainer.CreateElement(element);

  container.classList.add(PATHWAY_OVERLAY_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
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
  return container;
};

export default {
  CreateElement: CreatePathwayOverlayElement,
  Styles: STYLES_PATHWAY_OVERLAY_ELEMENT,
};
