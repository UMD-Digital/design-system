import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextContainer, { TypePathwayTextContainer } from './elements/text';
import ImageContainer, {
  TypePathwayHeroImageContainer,
} from './elements/image';

type TypePathwayHeroProps = TypePathwayTextContainer &
  TypePathwayHeroImageContainer & {
    isImageRight: boolean;
  };

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-pathway';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_HERO = 'hero';

const PATHWAY_HERO_CONTAINER = 'pathway-hero-container';
const PATHWAY_HERO_CONTAINER_WRAPPER = 'pathway-hero-container-wrapper';
const PATHWAY_HERO_CONTAINER_LOCK = 'pathway-hero-container-lock';

const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;

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
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img {
      min-height: inherit;
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

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${Spacing['4xl']} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_TEXT_WRAPPER} {
      padding: ${Spacing['8xl']} 0;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_HEADLINE} *`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_RICHTEXT} *`]: SansLarger,
    },
  })}
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HERO_CONTAINER_LOCK}`]: Lock['.base'],
    },
  })}

  .${PATHWAY_HERO_CONTAINER_LOCK} {
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER_LOCK} {
      display: flex;
      min-height: 832px;
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
  }

  ${LockStyles}
  ${OverwriteTextContainerStyles}
  ${OverwriteImageContainerStyles}
  ${OverwriteImageRightStyles}
  ${OverwriteImageLeftStyles}
`;

const CreatePathwayHeroElement = (element: TypePathwayHeroProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const { isImageRight = true } = element;

  const textContainer = TextContainer.CreateElement(element);
  const imageContainer = ImageContainer.CreateElement(element);

  container.classList.add(PATHWAY_HERO_CONTAINER);
  container.setAttribute(
    ATTRIBUTE_IMAGE_POSITION,
    isImageRight ? 'right' : 'left',
  );

  wrapper.classList.add(PATHWAY_HERO_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_HERO_CONTAINER_LOCK);

  lockWrapper.appendChild(textContainer);
  lock.appendChild(lockWrapper);

  if (imageContainer) wrapper.appendChild(imageContainer);
  wrapper.appendChild(lock);

  container.setAttribute(ATTRIBUTE_HERO, '');
  container.appendChild(wrapper);
  return container;
};

export default {
  CreateElement: CreatePathwayHeroElement,
  Styles: STYLES_PATHWAY_HERO_ELEMENT,
};
