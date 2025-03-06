import { textLockup } from 'atomic';
import { ElementModel } from 'model';

type TypeBlockCardIconProps = {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isThemeDark?: boolean;
};

const elementStyles = {
  element: {
    className: 'card-overlay-icon',
    containerType: 'inline-size',
  },
};

export default (props: TypeBlockCardIconProps) => {
  const { image } = props;
  const composite = ElementModel.composite.card.overlay.icon({
    ...props,
    elementStyles,
    element: document.createElement('div'),
  });
  const textContainer = textLockup.smallScaling(props);

  if (image) {
    const imageContainer = ElementModel.composite.card.overlay.elementIcon({
      ...props,
      element: document.createElement('div'),
    });
    imageContainer.element.appendChild(image);
    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  composite.element.appendChild(textContainer.element);
  composite.styles += textContainer.styles;

  return composite;
};
