export const BLOCK_IMAGE_CONTAINER = 'umd-block-image-container';

// prettier-ignore
export const STYLES_BLOCK_COMMON_IMAGE = `
  .${BLOCK_IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${BLOCK_IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${BLOCK_IMAGE_CONTAINER} a:hover img,
  .${BLOCK_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

export const CreateImageBlockContainer = ({
  image,
}: {
  image: HTMLImageElement | string;
}) => {
  const container = document.createElement('div');

  container.classList.add(BLOCK_IMAGE_CONTAINER);

  if (typeof image === 'string') {
    container.innerHTML = image;
    return container;
  }

  container.appendChild(image);
  return container;
};
