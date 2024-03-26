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

export const PATHWAY_CONTAINER_IMAGE = 'pathway-container-image-column';
const PATHWAY_CONTAINER_IMAGE_WRAPPER = 'pathway-container-image-wrapper';

// prettier-ignore
const ImageSizeStyles = `
  .${PATHWAY_CONTAINER_IMAGE}${IS_WITHOUT_IMAGE_SCALED} img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

// prettier-ignore
const STYLES_PATHWAY_IMAGE_CONTAINER = `
  .${PATHWAY_CONTAINER_IMAGE} {
    z-index: 99;
    position: relative;
  }

  .${PATHWAY_CONTAINER_IMAGE} * {
    height: 100%;
  }

  .${PATHWAY_CONTAINER_IMAGE} img {
    object-fit: cover;
    object-position: center;
  }

  .${PATHWAY_CONTAINER_IMAGE_WRAPPER} > * {
    display: flex;
  }

  ${ImageSizeStyles}
`

export const CreatePathwayImageContainer = (
  element: TypePathwayImageContainer | TypePathwayHeroImageContainer,
) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { image } = element;

  wrapper.classList.add(PATHWAY_CONTAINER_IMAGE_WRAPPER);

  if ('isImageScaled' in element) {
    if (!element.isImageScaled) {
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'false');
    }
  }

  if (image) {
    wrapper.appendChild(image);

    container.classList.add(PATHWAY_CONTAINER_IMAGE);
    container.appendChild(wrapper);

    return container;
  }

  return null;
};

export default {
  CreateElement: CreatePathwayImageContainer,
  Styles: STYLES_PATHWAY_IMAGE_CONTAINER,
};
