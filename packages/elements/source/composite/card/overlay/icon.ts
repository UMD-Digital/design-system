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
  const composite = ElementModel.composite.cardOverlay({
    ...props,
    isCardIcon: true,
    elementStyles,
    element: document.createElement('div'),
  });
  const textContainer = textLockup.small(props);

  if (image) {
    const imageContainer = ElementModel.composite.cardOverlayIcon({
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
