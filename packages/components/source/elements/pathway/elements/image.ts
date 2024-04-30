import { Tokens } from '@universityofmaryland/variables';
import { LayoutImage } from 'macros';

const { Spacing } = Tokens;

type TypeScaleProps = {
  isImageScaled: boolean;
};

type TypeImageProps = {
  image: HTMLElement | null;
};

export type TypePathwayImageContainer = TypeScaleProps & TypeImageProps;
export type TypePathwayHeroImageContainer = TypeImageProps;

const ATTRIBUTE_IMAGE_SCALED = 'data-image-scaled';
const IS_WITHOUT_IMAGE_SCALED = `[${ATTRIBUTE_IMAGE_SCALED}="false"]`;

const ELEMENT_PATHWAY_CONTAINER_IMAGE = 'pathway-image-container';
const ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER = 'pathway-image-container-image';

const OVERWRITE_SCALED_IMAGE_CONTAINER = `.${ELEMENT_PATHWAY_CONTAINER_IMAGE}${IS_WITHOUT_IMAGE_SCALED}`;

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
  }

  .${ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER} > * {
    display: flex;
  }

  ${ImageSizeStyles}
`

const CreatePathwayImageContainer = (
  element: TypePathwayImageContainer | TypePathwayHeroImageContainer,
) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { image } = element;

  wrapper.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE_WRAPPER);

  if ('isImageScaled' in element) {
    if (!element.isImageScaled) {
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'false');
    }
  }

  if (image) {
    const imageContainer = LayoutImage.CreateElement({
      image: image as HTMLImageElement,
      showCaption: true,
    });
    wrapper.appendChild(imageContainer);

    container.classList.add(ELEMENT_PATHWAY_CONTAINER_IMAGE);
    container.appendChild(wrapper);

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
