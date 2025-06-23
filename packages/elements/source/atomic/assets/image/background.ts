import { ElementModel } from 'model';
import { default as gifToggle } from './gif';

const ATTRIBUTE_CAPTION = 'data-caption';

interface Asset {
  image: HTMLImageElement | HTMLAnchorElement;
  isAspectStandard?: boolean;
  isScaled?: boolean;
}

interface EmbedAsset extends Asset {
  isTypeGif: boolean;
}

interface Props extends Asset {
  dateSign?: { element: HTMLElement; styles: string };
  isShowCaption?: boolean;
}

const embedAsset = ({
  image,
  isTypeGif = false,
  isAspectStandard,
}: EmbedAsset) => {
  if (isTypeGif && image instanceof HTMLImageElement) {
    return gifToggle({ image });
  }

  if (isAspectStandard) {
    return ElementModel.assets.imageAspect({
      element: image,
    });
  }

  return { element: image, styles: '' };
};

export default (props: Props) => {
  const { image, dateSign, isShowCaption = false } = props;
  const composite = ElementModel.assets.imageWrapper({
    ...props,
    element: document.createElement('div'),
  });
  const isTypeGif =
    image instanceof HTMLImageElement &&
    image.src !== null &&
    image.src.toLowerCase().includes('.gif');

  const asset = embedAsset({ ...props, isTypeGif });

  if (image.hasAttribute(ATTRIBUTE_CAPTION) && isShowCaption) {
    const caption = document.createElement('span');
    caption.textContent = image.getAttribute(ATTRIBUTE_CAPTION);

    const imageCaption = ElementModel.assets.imageCaption({
      element: caption,
    });
    composite.element.appendChild(imageCaption.element);
    composite.styles += imageCaption.styles;
  }

  if (dateSign) {
    const dateSignContainer = ElementModel.layout.backgroundBoxWhite({
      element: document.createElement('div'),
    });

    composite.styles += dateSignContainer.styles;
    composite.styles += dateSign.styles;
    dateSignContainer.element.appendChild(dateSign.element);
    composite.element.appendChild(dateSignContainer.element);
  }

  composite.element.appendChild(asset.element);
  composite.styles += asset.styles;

  return composite;
};
