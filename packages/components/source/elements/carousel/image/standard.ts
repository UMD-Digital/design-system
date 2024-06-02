type TypeCarouselImageStandardProps = {
  images: HTMLImageElement[];
};

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_IMAGE_DECLARATION =
  'carousel-image-standard-declaration';
const ELEMENT_CAROUSEL_IMAGE_CONTAINER = 'carousel-image-standard-container';

// prettier-ignore
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
  .${ELEMENT_CAROUSEL_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

`;

const CreateCarouselImageStandardElement = (
  props: TypeCarouselImageStandardProps,
) => {
  const { images } = props;
  const elementDeclaration = document.createElement('div');
  const elementContainer = document.createElement('div');

  console.log('called');

  elementContainer.classList.add(ELEMENT_CAROUSEL_IMAGE_CONTAINER);

  elementDeclaration.classList.add(ELEMENT_CAROUSEL_IMAGE_DECLARATION);
  elementDeclaration.appendChild(elementContainer);

  return elementDeclaration;
};

export default {
  CreateElement: CreateCarouselImageStandardElement,
  Styles: STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT,
};
