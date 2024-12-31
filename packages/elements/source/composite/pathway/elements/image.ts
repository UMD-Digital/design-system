import { Tokens } from '@universityofmaryland/web-elements-styles';
import { ButtonVideoState } from 'atomic';
import { Image as LayoutImage } from 'layout';
import { Accessibility } from 'utilities';

const { Media, Colors, Spacing } = Tokens;

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
    bottom: ${Spacing.min};
    left: ${Spacing.min};
    background-color: ${Colors.white};
    padding: ${Spacing.min};
  }

  @media (${Media.queries.tablet.min}) {
    .${ELEMENT_PATHWAY_CONTAINER_IMAGE_SIGN} {
      padding: ${Spacing.sm} ${Spacing.sm} ${Spacing.min} ${Spacing.sm};
    }
  }
`;

// prettier-ignore
const ImageSizeStyles = `
  ${OVERWRITE_SCALED_IMAGE_CONTAINER} .${LayoutImage.Elements.container} {
    justify-content: center;
    padding: 0 ${Spacing.md};
  }

  ${OVERWRITE_SCALED_IMAGE_CONTAINER} img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

// prettier-ignore
const STYLES_PATHWAY_IMAGE_CONTAINER = `
  ${LayoutImage.Styles}

  .${ELEMENT_PATHWAY_CONTAINER_IMAGE} {
    z-index: 99;
    position: relative;
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

      container.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE);
      container.appendChild(wrapper);
    }

    if (video && isVideo) {
      const videoRef = video as HTMLVideoElement;
      const buttonMacro = ButtonVideoState.CreateElement({ video: videoRef });

      wrapper.appendChild(videoRef);
      wrapper.appendChild(buttonMacro.elements.button);
      if (!Accessibility.isPrefferdReducedMotion()) {
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
