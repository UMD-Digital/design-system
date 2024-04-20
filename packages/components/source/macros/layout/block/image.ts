export const ELEMENT_BLOCK_IMAGE_CONTAINER = 'block-image-container';

// prettier-ignore
const STYLES_BLOCK_IMAGE_CONTAINER = `
  .${ELEMENT_BLOCK_IMAGE_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_BLOCK_IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${ELEMENT_BLOCK_IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${ELEMENT_BLOCK_IMAGE_CONTAINER} a:hover img,
  .${ELEMENT_BLOCK_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

const CreateImageBlockContainer = ({
  image,
}: {
  image: HTMLImageElement | string;
}) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_BLOCK_IMAGE_CONTAINER);

  if (typeof image === 'string') {
    container.innerHTML = image;
    return container;
  }

  container.appendChild(image);
  return container;
};

export default {
  CreateElement: CreateImageBlockContainer,
  Styles: STYLES_BLOCK_IMAGE_CONTAINER,
  Elements: {
    container: ELEMENT_BLOCK_IMAGE_CONTAINER,
  },
};
