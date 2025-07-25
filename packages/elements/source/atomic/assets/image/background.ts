import { ElementModel } from 'model';
import { default as gifToggle } from './gif';
import { ElementVisual } from '_types';

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
  dateSign?: ElementVisual;
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

  const defaultContainer = ElementModel.createDiv({
    className: 'image-container',
    elementStyles: {
      element: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
    },
  });

  defaultContainer.element.appendChild(image);

  return defaultContainer;
};

export default (props: Props) => {
  const {
    image,
    dateSign,
    isScaled,
    customStyles,
    isShowCaption = false,
  } = props;
  const children: ElementVisual[] = [];
  const attributeCaption = image.getAttribute(ATTRIBUTE_CAPTION);
  const attributeCredit = image.getAttribute(ATTRIBUTE_CREDIT);
  const isTypeGif =
    image instanceof HTMLImageElement &&
    image.src !== null &&
    image.src.toLowerCase().includes('.gif');

  const asset = embedAsset({ ...props, isTypeGif });

  if (attributeCaption && isShowCaption) {
    console.log(
      `Attribute "data-caption" is deprecated. Use "data-credit" instead. This attribute will be removed in version 2.0.`,
    );
  }

  if (isShowCaption) {
    if (attributeCaption || attributeCredit) {
      const text = attributeCaption || attributeCredit;
      const caption = document.createElement('span');
      caption.textContent = text;

      children.push(
        ElementModel.assets.imageCaption({
          element: caption,
        }),
      );
    }
  }

  if (dateSign) {
    children.push(
      ElementModel.layout.backgroundBoxWhite({
        element: document.createElement('div'),
        children: [dateSign],
      }),
    );
  }

  children.push(asset);

  return ElementModel.assets.imageWrapper({
    element: document.createElement('div'),
    children,
    isScaled,
    elementStyles: {
      element: {
        ...customStyles,
      },
    },
  });
};
