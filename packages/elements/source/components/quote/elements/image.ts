export type TypeQuoteImageContainer = {
  image: HTMLImageElement;
};

const IMAGE_CONTAINER_ELEMENT_NAME = 'umd-element-quote-image-container';

export const IMAGE_CONTAINER = 'quote-image-container';

// prettier-ignore
const STYLES_QUOTE_IMAGE_CONTAINER = `
  .${IMAGE_CONTAINER} {
    container: ${IMAGE_CONTAINER_ELEMENT_NAME} / inline-size;
  }
`;

export const CreateQuoteImageContainer = ({
  image,
}: TypeQuoteImageContainer) => {
  const container = document.createElement('div');

  container.classList.add(IMAGE_CONTAINER);

  return container;
};

export default {
  CreateElement: CreateQuoteImageContainer,
  Styles: STYLES_QUOTE_IMAGE_CONTAINER,
};
