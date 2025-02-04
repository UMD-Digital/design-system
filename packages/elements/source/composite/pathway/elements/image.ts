import { token } from '@universityofmaryland/web-styles-library';
import ButtonVideoState from '../../../atomic/buttons/video-state';
import { Image as LayoutImage } from 'layout';
import * as Utility from 'utilities';

type TypeScaleProps = {
  isImageScaled: boolean;
};

type TypeImageProps = {
  image: HTMLElement | null;
  video: HTMLElement | null;
  eventSign?: HTMLElement | null;
};

export type TypePathwayImageContainer = TypeScaleProps & TypeImageProps;
export type TypePathwayHeroImageContainer = TypeImageProps;

const ATTRIBUTE_IMAGE_SCALED = 'data-image-scaled';
const IS_WITHOUT_IMAGE_SCALED = `[${ATTRIBUTE_IMAGE_SCALED}="false"]`;

const ELEMENT_PATHWAY_CONTAINER_IMAGE = 'pathway-image-container';
const ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER = 'pathway-image-container-image';
const ELEMENT_PATHWAY_CONTAINER_IMAGE_SIGN = 'pathway-image-container-sign';

const OVERWRITE_SCALED_IMAGE_CONTAINER = `.${ELEMENT_PATHWAY_CONTAINER_IMAGE}${IS_WITHOUT_IMAGE_SCALED}`;

// prettier-ignore
const EventSignStyles = `
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE_SIGN} {
    position: absolute;
    z-index: 9;
    bottom: ${token.spacing.min};
    left: ${token.spacing.min};
    background-color: ${token.color.white};
    padding: ${token.spacing.min};
  }

  @media (${token.media.queries.tablet.min}) {
    .${ELEMENT_PATHWAY_CONTAINER_IMAGE_SIGN} {
      padding: ${token.spacing.sm} ${token.spacing.sm} ${token.spacing.min} ${token.spacing.sm};
    }
  }
`;

// prettier-ignore
const ImageSizeStyles = `
  ${OVERWRITE_SCALED_IMAGE_CONTAINER} .${LayoutImage.Elements.container} {
    justify-content: center;
    padding: 0 ${token.spacing.md};
  }

  ${OVERWRITE_SCALED_IMAGE_CONTAINER} img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

// prettier-ignore
const GifStyles = `
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
  }
  
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} canvas {
    display: block;
    opacity: 0;
  }
  
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} button {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} button svg {
    fill: white;
    width: 24px;
  }
`;

// prettier-ignore
const STYLES_PATHWAY_IMAGE_CONTAINER = `
  ${LayoutImage.Styles}

  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} {
    z-index: 99;
    position: relative;
    overflow: hidden;
  }

  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} .${LayoutImage.Elements.container} {
    height: 100%;
  }
  
  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} img {
    object-fit: cover;
    object-position: center;
    width: 100%;
  }

  .${ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER} > * {
    display: flex;
  }

  ${ImageSizeStyles}
  ${GifStyles}
  ${EventSignStyles}
  ${ButtonVideoState.Styles}
`

const CreatePathwayImageContainer = (
  element: TypePathwayImageContainer | TypePathwayHeroImageContainer,
) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { image, video, eventSign } = element;
  const isVideo = video instanceof HTMLVideoElement;

  wrapper.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER);

  if ('isImageScaled' in element) {
    if (!element.isImageScaled) {
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'false');
    }
  }

  if (image || video) {
    if (image) {
      const imageContainer = LayoutImage.CreateElement({
        image: image as HTMLImageElement,
        showCaption: true,
      });
      wrapper.appendChild(imageContainer);
      Utility.markup.create.gif({ container: imageContainer });

      container.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE);
      container.appendChild(wrapper);
    }

    if (video && isVideo) {
      const videoRef = video as HTMLVideoElement;
      const buttonMacro = ButtonVideoState.CreateElement({ video: videoRef });

      wrapper.appendChild(videoRef);
      wrapper.appendChild(buttonMacro.elements.button);
      if (!Utility.accessibility.isPrefferdReducedMotion()) {
        buttonMacro.events.setButtonPlay();
      } else {
        buttonMacro.events.setButtonPause();
        video.pause();
      }

      container.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE);
      container.appendChild(wrapper);
    }

    if (eventSign) {
      eventSign.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE_SIGN);
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'true');
      container.appendChild(eventSign);
    }

    return container;
  }

  return null;
};

export default {
  CreateElement: CreatePathwayImageContainer,
  Styles: STYLES_PATHWAY_IMAGE_CONTAINER,
  Elements: {
    container: ELEMENT_PATHWAY_CONTAINER_IMAGE,
  },
};
