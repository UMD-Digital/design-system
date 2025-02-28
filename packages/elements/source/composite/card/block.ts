import { textLockup, assets } from 'atomic';
import { ElementModel } from 'model';
import * as Utility from 'utilities';

type TypeBlockCardProps = {
  newsId?: string;
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

const CONTAINER_CLASS = 'card-block-container';
export const STYLES_BLOCK_CARD_ELEMENT = '';

const containerQueryStyles = {
  className: CONTAINER_CLASS,
  containerType: 'inline-size',
};

export default (props: TypeBlockCardProps) => {
  const { newsId, image, isAligned } = props;
  const elementDiv = document.createElement('div');
  const containerQuery = document.createElement('div');
  const composite = ElementModel.composite.card({
    ...props,
    element: elementDiv,
    elementStyles: {
      element: {
        height: '100%',
      },
    },
  });
  const textLockupElement = textLockup.smallScaling(props);

  let styles = `
      ${Utility.styles.getStyleStringFromJssObject(containerQueryStyles)}
    ${composite.styles}
  `;

  containerQuery.classList.add(CONTAINER_CLASS);

  if (newsId) {
    composite?.element.setAttribute('news-id', newsId);
  }

  if (image) {
    const imageContainer = assets.image({
      image,
      isScaled: true,
      isAspectStandard: isAligned,
    });
    composite.element.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  return { element: composite.element, styles };
};
