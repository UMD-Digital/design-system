export type TypePositionProps = {
  isImageRight: boolean;
};

export type TypeScaleProps = {
  isImageScaled: boolean;
};

export type TypeImageProps = {
  image: HTMLElement | null;
};

export type TypePathwayTextContainer = TypePositionProps & {
  eyebrow: HTMLElement | null;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  action: HTMLElement | null;
  theme: string;
  isHighlightType?: boolean;
};

export type TypePathwayImageContainer = TypePositionProps &
  TypeScaleProps &
  TypeImageProps;

type TypePathwayHeroImageContainer = TypePositionProps & TypeImageProps;

const MEDIUM = 800;
const LARGE = 1200;

const ATTRIBUTE_IMAGE_POSITION = 'data-image-position';
const ATTRIBUTE_IMAGE_SCALED = 'data-image-scaled';
const ATTRIBUTE_HERO = 'data-hero';

const IS_WITH_IMAGE = `[${ATTRIBUTE_IMAGE_POSITION}]`;
const IS_WITH_IMAGE_RIGHT = `[${ATTRIBUTE_IMAGE_POSITION}="right"]`;
const IS_WITH_IMAGE_LEFT = `[${ATTRIBUTE_IMAGE_POSITION}="left"]`;
const IS_WITH_IMAGE_SCALED = `[${ATTRIBUTE_IMAGE_SCALED}="true"]`;
const IS_WITHOUT_IMAGE_SCALED = `[${ATTRIBUTE_IMAGE_SCALED}="false"]`;
const IS_WITH_HERO = `[${ATTRIBUTE_HERO}]`;

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
export const STYLES_PATHWAY_IMAGE_CONTAINER = `
  .${PATHWAY_CONTAINER_IMAGE} {
    z-index: 99;
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

// @container ${IMAGE_CONTAINER_ELEMENT_NAME} (min-width: ${LARGE}px) {
//   .${PATHWAY_CONTAINER_IMAGE} img {
//     min-height: 656px;
//   }
// }

export const CreateImageContainer = (
  element: TypePathwayImageContainer | TypePathwayHeroImageContainer,
) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { image, isImageRight = true } = element;

  wrapper.classList.add(PATHWAY_CONTAINER_IMAGE_WRAPPER);

  if (!isImageRight) {
    container.setAttribute(ATTRIBUTE_IMAGE_POSITION, 'left');
  }

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
