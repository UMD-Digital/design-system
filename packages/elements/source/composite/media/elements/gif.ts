import { ElementModel } from 'model';
import { assets } from 'atomic';

export default ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  const calculateHeight = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;

    const aspectRatio = image.naturalHeight / image.naturalWidth;
    const containerWidth = container.offsetWidth;

    if (containerWidth > 0) {
      const calculatedHeight = Math.round(containerWidth * aspectRatio);
      container.style.height = `${calculatedHeight}px`;
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

  const elementModel = ElementModel.create({
    element: container,
    className: 'media-gif',
    children: [
      assets.image.background({
        element: image,
        isShowCaption: true,
        isScaled: false,
        customStyles: {
          width: 'auto',
          height: '100%',
          display: 'inline',
        },
      }),
    ],
    elementStyles: {
      element: {
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
      },
    },
  });

  return {
    ...elementModel,
    destroy: () => {
      resizeObserver.disconnect();
      image.removeEventListener('load', calculateHeight);
    },
  };
};
