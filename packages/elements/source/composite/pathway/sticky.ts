import { layout, token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, { TypePathwayImageContainer } from './elements/image';

type TypePathwayStickyProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImagePositionLeft: boolean;
    includedStyles?: string;
  };

const { convertJSSObjectToStyles } = Utility.styles;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-sticky';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_THEME = 'theme';

const PATHWAY_STICKY_CONTAINER = 'pathway-sticky-container';
const PATHWAY_STICKY_CONTAINER_WRAPPER = 'pathway-sticky-container-wrapper';
const PATHWAY_STICKY_CONTAINER_LOCK = 'pathway-sticky-container-lock';
const PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER =
  'pathway-sticky-image-container-lock-wrapper';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;

const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_STICKY_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_CONTAINER = `.${PATHWAY_STICKY_CONTAINER} .${ImageContainer.Elements.container}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_STICKY_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_STICKY_CONTAINER}${IS_WITH_IMAGE_LEFT}`;

const OVERWRITE_IMAGE_RIGHT_IMAGE_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_CONTAINER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_RIGHT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_RIGHT_CONTAINER} .${TextContainer.Elements.wrapper}`;
const OVERWRITE_IMAGE_LEFT_TEXT_WRAPPER = `${OVERWRITE_IMAGE_LEFT_CONTAINER} .${TextContainer.Elements.wrapper}`;

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
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      position: sticky;
      top: 0;
      align-self: flex-start;
     }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img {
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
      [`.${PATHWAY_STICKY_CONTAINER_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_STICKY_CONTAINER_LOCK} {
      padding: 0;
    }
  }
`;

const LockWrapperStyles = `
  .${PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER} {
      padding: 0;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER} {
      display: flex;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER} > * {
      width: 50%;
    }
  }
`;

// prettier-ignore
const STYLES_PATHWAY_STICKY_ELEMENT = `
  .${PATHWAY_STICKY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
  }

  ${LockStyles}
  ${LockWrapperStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImagePositionStyles}
`;

export default (props: TypePathwayStickyProps) => {
  const { isImagePositionLeft = true, isThemeDark, includedStyles } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');

  const textContainer = TextContainer.CreateElement(props);
  const imageContainer = ImageContainer.CreateElement(props);
  let styles = STYLES_PATHWAY_STICKY_ELEMENT;

  if (includedStyles) styles += includedStyles;

  container.classList.add(PATHWAY_STICKY_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImagePositionLeft ? 'left' : 'right',
  );

  wrapper.classList.add(PATHWAY_STICKY_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_STICKY_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_STICKY_CONTAINER_LOCK_WRAPPER);

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
  };
};
