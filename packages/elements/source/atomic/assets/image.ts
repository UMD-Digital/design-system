import { ElementModel } from 'model';

const ATTRIBUTE_CAPTION = 'data-caption';

export default (props: {
  image: HTMLImageElement | HTMLAnchorElement;
  isShowCaption?: boolean;
  isScaled?: boolean;
  isAspectStandard?: boolean;
}) => {
  const { image, isShowCaption = false, isAspectStandard = false } = props;
  const container = document.createElement('div');
  const hasCaption = image.hasAttribute(ATTRIBUTE_CAPTION);
  let additionalStyles = '';

  if (hasCaption && isShowCaption) {
    const caption = document.createElement('span');
    caption.textContent = image.getAttribute(ATTRIBUTE_CAPTION);

    const imageCaption = ElementModel.assets.imageCaption({
      element: caption,
    });
    container.appendChild(imageCaption.element);
    additionalStyles += imageCaption.styles;
  }

  if (isAspectStandard) {
    const imageElement = ElementModel.assets.imageAspect({
      ...props,
      element: image,
    });
    container.appendChild(imageElement.element);
    additionalStyles += imageElement.styles;
  } else {
    container.appendChild(image);
  }

  const element = ElementModel.assets.imageWrapper({
    ...props,
    element: container,
  });

  return {
    element: element.element,
    styles: element.styles + additionalStyles,
  };
};
