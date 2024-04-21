export type TypeQuoteImageContainer = {
  image: HTMLImageElement;
};

const IMAGE_CONTAINER_ELEMENT_NAME = 'umd-element-quote-image-container';

const IMAGE_CONTAINER = 'quote-image-container';

// prettier-ignore
const STYLES_QUOTE_IMAGE_CONTAINER = `
  .${IMAGE_CONTAINER} {
    container: ${IMAGE_CONTAINER_ELEMENT_NAME} / inline-size;
  }
`;

const CreateQuoteImageContainer = ({ image }: TypeQuoteImageContainer) => {
  const container = document.createElement('div');

  container.classList.add(IMAGE_CONTAINER);

  container.appendChild(image);

  return container;
};

export default {
  CreateElement: CreateQuoteImageContainer,
  Styles: STYLES_QUOTE_IMAGE_CONTAINER,
  Elements: {
    container: IMAGE_CONTAINER,
  },
};
