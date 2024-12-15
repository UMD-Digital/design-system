const ELEMENT_PERSON_IMAGE_CONTAINER = 'person-image-container';

// prettier-ignore
const STYLES_PERSON_IMAGE_CONTAINER = `
  .${ELEMENT_PERSON_IMAGE_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_PERSON_IMAGE_CONTAINER} > img {
    display: block;
    width: 100%;
    object-fit: contain;
  }
`;

const CreatePersonImageContainer = ({
  image,
}: {
  image: HTMLImageElement | string;
}) => {
  const container = document.createElement('div');
  const isString = typeof image === 'string';

  container.classList.add(ELEMENT_PERSON_IMAGE_CONTAINER);

  if (isString) {
    container.innerHTML = image;
    return container;
  }

  container.appendChild(image);
  return container;
};

export default {
  CreateElement: CreatePersonImageContainer,
  Styles: STYLES_PERSON_IMAGE_CONTAINER,
  Elements: {
    container: ELEMENT_PERSON_IMAGE_CONTAINER,
  },
};
