import { Layout, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, { TypePathwayImageContainer } from './elements/image';

type TypePathwayDefaultProps = TypePathwayTextContainer &
  TypePathwayImageContainer & {
    isImageRight: boolean;
  };

const { Spacing } = Tokens;
const { LockMax } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 800;
const LARGE = 1200;

const ELEMENT_NAME = 'umd-element-pathway-image';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_THEME = 'theme';

const PATHWAY_DEFAULT_CONTAINER = 'pathway-default-container';
const PATHWAY_DEFAULT_CONTAINER_WRAPPER = 'pathway-default-container-wrapper';
const PATHWAY_DEFAULT_CONTAINER_LOCK = 'pathway-default-container-lock';
const PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER =
  'pathway-image-container-lock-wrapper';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;

const OVERWRITE_TEXT_WRAPPER = `.${PATHWAY_DEFAULT_CONTAINER} .${TextContainer.Elements.wrapper}`;

const OVERWRITE_IMAGE_RIGHT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_RIGHT}`;
const OVERWRITE_IMAGE_LEFT_CONTAINER = `.${PATHWAY_DEFAULT_CONTAINER}${IS_WITH_IMAGE_LEFT}`;

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
      padding: 0 ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: 0 ${Spacing['6xl']};
    }
  }
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_DEFAULT_CONTAINER_LOCK}`]: LockMax,
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
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImagePositionStyles}
`;

const CreatePathwayDefaultElement = (props: TypePathwayDefaultProps) => {
  const { isImageRight = true, theme } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');

  const textContainer = TextContainer.CreateElement(props);
  const imageContainer = ImageContainer.CreateElement(props);

  container.classList.add(PATHWAY_DEFAULT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_DEFAULT_CONTAINER_LOCK_WRAPPER);

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
