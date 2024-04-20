const ELEMENT_IMAGE_CONTAINER = 'image-container';

// prettier-ignore
const STYLES_IMAGE_CONTAINER = `
  .${ELEMENT_IMAGE_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${ELEMENT_IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${ELEMENT_IMAGE_CONTAINER} a:hover img,
  .${ELEMENT_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

const CreateImageContainer = ({
  image,
}: {
  image: HTMLImageElement | string;
}) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_IMAGE_CONTAINER);

  if (typeof image === 'string') {
    container.innerHTML = image;
    return container;
  }

  container.appendChild(image);
  return container;
};

export default {
  CreateElement: CreateImageContainer,
  Styles: STYLES_IMAGE_CONTAINER,
  Elements: {
    container: ELEMENT_IMAGE_CONTAINER,
  },
};
