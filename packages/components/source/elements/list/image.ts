export const LIST_IMAGE_CONTAINER = 'umd-list-image-container';

// prettier-ignore
export const STYLES_LIST_COMMON_IMAGE = `
  .${LIST_IMAGE_CONTAINER} a {
    display: block;
    overflow: hidden;
  }

  .${LIST_IMAGE_CONTAINER} img {
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s;
  }

  .${LIST_IMAGE_CONTAINER} a:hover img,
  .${LIST_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

export const CreateImageContainer = ({
  image,
}: {
  image: HTMLImageElement;
}) => {
  const container = document.createElement('div');

  container.classList.add(LIST_IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};
