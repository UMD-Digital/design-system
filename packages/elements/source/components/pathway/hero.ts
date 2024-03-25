import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CreatePathwayTextContainer,
  TypePathwayTextContainer,
  TEXT_CONTAINER,
  TEXT_CONTAINER_WRAPPER,
  TEXT_CONTAINER_HEADLINE_WRAPPER,
  TEXT_CONTAINER_TEXT_WRAPPER,
} from '../../shared-elements/pathway/text';
import {
  CreatePathwayImageContainer,
  TypePathwayHeroImageContainer,
  PATHWAY_CONTAINER_IMAGE,
} from '../../shared-elements/pathway/image';

type TypePathwayHeroProps = TypePathwayTextContainer &
  TypePathwayHeroImageContainer & {
    isImageRight: boolean;
  };

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-pathway';
const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_HERO = 'hero';

const PATHWAY_HERO_CONTAINER = 'pathway-hero-container';
const PATHWAY_HERO_CONTAINER_WRAPPER = 'pathway-hero-container-wrapper';
const PATHWAY_HERO_CONTAINER_LOCK = 'pathway-hero-container-lock';

const IS_WITH_IMAGE_RIGHT = `.${PATHWAY_HERO_CONTAINER}[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `.${PATHWAY_HERO_CONTAINER}[${ATTRIBUTE_IMAGE_POSITION}="left"]`;

// prettier-ignore
const ImageContainerStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER} .${PATHWAY_CONTAINER_IMAGE} {
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_RIGHT} .${PATHWAY_CONTAINER_IMAGE}  {
      left: inherit;
      right: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER} .${PATHWAY_CONTAINER_IMAGE} img {
      min-height: inherit;
    }
  }
`;

// prettier-ignore
const TextContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing.md} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_WRAPPER} {
      padding: ${Spacing['8xl']} ${Spacing['6xl']};
      max-width: 85%;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_HEADLINE_WRAPPER}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_HEADLINE_WRAPPER} *`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HERO_CONTAINER} .${TEXT_CONTAINER_TEXT_WRAPPER} *`]: SansLarger,
    },
  })}
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

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_LEFT} .${PATHWAY_HERO_CONTAINER_WRAPPER} {
      padding-left: 50%;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${IS_WITH_IMAGE_RIGHT} .${PATHWAY_HERO_CONTAINER_WRAPPER} {
      padding-right: 50%;
    }
  }

  ${LockStyles}
  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${TextContainerPositionStyles}
  ${ImageContainerPositionStyles}
`;

const CreatePathwayHeroElement = (element: TypePathwayHeroProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const { isImageRight = true } = element;

  const textContainer = CreatePathwayTextContainer(element);
  const imageContainer = CreatePathwayImageContainer(element);

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
