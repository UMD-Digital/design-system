export const ELEMENT_LIST_IMAGE_CONTAINER = 'list-image-container';

// prettier-ignore
const STYLES_LIST_IMAGE_CONTAINER = `
  .${ELEMENT_LIST_IMAGE_CONTAINER} a {
    display: block;
    overflow: hidden;
  }

  .${ELEMENT_LIST_IMAGE_CONTAINER} img {
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s;
  }

  .${ELEMENT_LIST_IMAGE_CONTAINER} a:hover img,
  .${ELEMENT_LIST_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

const CreateListImageContainer = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_LIST_IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};

export default {
  CreateElement: CreateListImageContainer,
  Styles: STYLES_LIST_IMAGE_CONTAINER,
};
