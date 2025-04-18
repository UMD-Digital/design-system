export type TypeQuoteImageContainer = {
  image: HTMLImageElement;
};

const IMAGE_CONTAINER = 'quote-image-container';

const CreateQuoteImageContainer = ({ image }: TypeQuoteImageContainer) => {
  const container = document.createElement('div');

  container.classList.add(IMAGE_CONTAINER);

  container.appendChild(image);

  return { element: container, styles: '' };
};

export default {
  create: CreateQuoteImageContainer,
  elements: {
    container: IMAGE_CONTAINER,
  },
};
