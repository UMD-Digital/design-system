import { ElementModel } from 'model';
import { default as gifToggle } from './gif';

const ATTRIBUTE_CAPTION = 'data-caption';
const ATTRIBUTE_CREDIT = 'data-credit';

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
  customStyles?: Record<string, any>;
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
  const { image, dateSign, customStyles, isShowCaption = false } = props;
  const attributeCaption = image.getAttribute(ATTRIBUTE_CAPTION);
  const attributeCredit = image.getAttribute(ATTRIBUTE_CREDIT);
  const composite = ElementModel.assets.imageWrapper({
    ...props,
    element: document.createElement('div'),
    elementStyles: {
      element: {
        ...customStyles,
      },
    },
  });
  const isTypeGif =
    image instanceof HTMLImageElement &&
    image.src !== null &&
    image.src.toLowerCase().includes('.gif');

  const asset = embedAsset({ ...props, isTypeGif });

  if (isShowCaption) {
    if (attributeCaption) {
      console.log(
        `Attribute "data-caption" is deprecated. Use "data-credit" instead. This attribute will be removed in version 2.0.`,
      );
    }

    if (attributeCaption || attributeCredit) {
      const text = attributeCaption || attributeCredit;
      const caption = document.createElement('span');
      caption.textContent = text;

      const imageCaption = ElementModel.assets.imageCaption({
        element: caption,
      });
      composite.element.appendChild(imageCaption.element);
      composite.styles += imageCaption.styles;
    }
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
