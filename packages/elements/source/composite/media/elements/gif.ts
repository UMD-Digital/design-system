import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { assets } from 'atomic';

const CreateGifElement = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  const calculateHeight = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;

    const aspectRatio = image.naturalHeight / image.naturalWidth;
    const containerWidth = container.offsetWidth;

    if (containerWidth > 0) {
      const calculatedHeight = Math.round(containerWidth * aspectRatio);
      container.style.height = `${calculatedHeight}px`;
    } else {
      container.style.width = `${image.naturalWidth}px`;

      setTimeout(() => {
        const containerWidth = container.offsetWidth;
        const calculatedHeight = Math.round(containerWidth * aspectRatio);
        container.style.height = `${calculatedHeight}px`;
      }, 100);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    container.style.width = `${image.naturalWidth}px`;
    setTimeout(() => {
      calculateHeight();
    }, 10);
  });

  if (image.complete && image.naturalWidth) {
    container.style.width = `${image.naturalWidth}px`;
    setTimeout(() => {
      calculateHeight();
    }, 10);
  } else {
    image.addEventListener('load', calculateHeight);
  }

  setTimeout(() => {
    resizeObserver.observe(container);
  }, 0);

  const imageElement = assets.image.background({
    element: image,
    isShowCaption: true,
    isScaled: false,
    isGifAllowed: true,
    customStyles: {
      width: 'auto',
      height: '100%',
      display: 'block',
    },
  });

  const elementModel = new ElementBuilder(container)
    .withClassName('media-gif')
    .withChild(imageElement)
    .withStyles({
      element: {
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
      },
    })
    .build();

  return {
    ...elementModel,
    destroy: () => {
      resizeObserver.disconnect();
      image.removeEventListener('load', calculateHeight);
    },
  };
};

export const createCompositeMediaGif = CreateGifElement;
