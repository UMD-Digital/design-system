import * as Styles from '@universityofmaryland/web-styles-library';
import { textLockup } from 'atomic';
import { ElementModel } from 'model';

type TypeBlockCardIconProps = {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isThemeDark?: boolean;
};

export default (props: TypeBlockCardIconProps) => {
  const { image } = props;
  const elementContainer = ElementModel.composite.cardOverlay({
    ...props,
    isCardIcon: true,
    element: document.createElement('div'),
  });
  const textContainer = textLockup.small(props);

  if (image) {
    const imageContainer = ElementModel.composite.cardOverlayIcon({
      ...props,
      element: document.createElement('div'),
    });
    imageContainer.element.appendChild(image);
    elementContainer.element.appendChild(imageContainer.element);
    elementContainer.styles += imageContainer.styles;
  }

  elementContainer.element.appendChild(textContainer.element);
  elementContainer.styles += textContainer.styles;

  return elementContainer;
};
