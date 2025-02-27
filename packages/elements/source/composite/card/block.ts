import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';

type TypeBlockCardProps = {
  id?: string;
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | HTMLAnchorElement | null;
  isAligned?: boolean;
  isBordered?: boolean;
  isThemeDark?: boolean;
  isTransparent?: boolean;
};

export const ELEMENT_CARD_BLOCK_CONTAINER = 'card-container';

export const STYLES_BLOCK_CARD_ELEMENT = '';

const containerStyles = {
  className: ELEMENT_CARD_BLOCK_CONTAINER,
  height: '100%',
};

export default (props: TypeBlockCardProps) => {
  const { id, image, isAligned, isThemeDark } = props;
  const elementContainer = document.createElement('div');
  const container = ElementModel.composite.card({
    ...props,
    element: elementContainer,
  });
  const textLockupElement = textLockup.smallScaling(props);

  let styles = `
    ${container.styles}
  `;

  if (id) {
    container?.element.setAttribute('news-id', id);
  }

  if (image) {
    const imageContainer = assets.image({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
    });
    container.element.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  container.element.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  return { element: elementContainer, styles };
};
