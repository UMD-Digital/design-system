import { ElementModel } from 'model';
import { default as gifToggle } from './gif';
import { type UMDElement } from '_types';

const ATTRIBUTE_CAPTION = 'data-caption';
const ATTRIBUTE_CREDIT = 'data-credit';

interface Asset {
  element: HTMLImageElement | HTMLAnchorElement;
  isAspectStandard?: boolean;
  isScaled?: boolean;
  isGifAllowed?: boolean;
}

interface Props extends Asset {
  dateSign?: UMDElement;
  isShowCaption?: boolean;
  customStyles?: Record<string, any>;
}

const isImageElement = (element: HTMLElement): element is HTMLImageElement => {
  return element instanceof HTMLImageElement;
};

const checkIsGif = (element: HTMLImageElement | HTMLAnchorElement): boolean => {
  if (isImageElement(element)) {
    return element.src !== null && element.src.toLowerCase().includes('.gif');
  }

  if (element instanceof HTMLAnchorElement) {
    const imgChild = element.querySelector('img');
    const isGif =
      imgChild !== null &&
      imgChild.src !== null &&
      imgChild.src.toLowerCase().includes('.gif');

    if (isGif) {
      console.error(
        `GIFs are not allowed in <a>. Please upload a different format.`,
      );
    }

    return isGif;
  }

  return false;
};

const createCaption = (
  element: HTMLImageElement | HTMLAnchorElement,
  isShowCaption: boolean,
): UMDElement | null => {
  if (!isShowCaption) return null;

  const attributeCaption = element.getAttribute(ATTRIBUTE_CAPTION);
  const attributeCredit = element.getAttribute(ATTRIBUTE_CREDIT);

  if (attributeCaption) {
    console.log(
      `Attribute "data-caption" is deprecated. Use "data-credit" instead. This attribute will be removed in version 2.0.`,
    );
  }

  const text = attributeCaption || attributeCredit;
  if (!text) return null;

  const caption = document.createElement('span');
  caption.textContent = text;

  return ElementModel.assets.imageCaption({
    element: caption,
  });
};

const embedAsset = ({
  element,
  isAspectStandard,
  isGifAllowed,
}: Pick<Asset, 'element' | 'isAspectStandard' | 'isGifAllowed'>) => {
  const isTypeGif = checkIsGif(element);

  if (isGifAllowed && isTypeGif) {
    return gifToggle({ element });
  }

  if (!isGifAllowed && isTypeGif) {
    console.error(
      `GIFs are not allowed in <${element.localName}>. Please upload a different format.`,
    );
    return;
  }

  if (isAspectStandard) {
    return ElementModel.assets.imageAspect({
      element,
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

  defaultContainer.element.appendChild(element);

  return defaultContainer;
};

export default (props: Props) => {
  const {
    customStyles,
    dateSign,
    element,
    isAspectStandard = false,
    isScaled,
    isShowCaption = false,
    isGifAllowed = false,
  } = props;
  const asset = embedAsset({ element, isAspectStandard, isGifAllowed });
  const caption = createCaption(element, isShowCaption);
  const children: UMDElement[] = [];

  if (caption) {
    children.push(caption);
  }

  if (dateSign) {
    children.push(
      ElementModel.layout.backgroundBoxWhite({
        element: document.createElement('div'),
        children: [dateSign],
      }),
    );
  }

  if (asset) {
    children.push(asset);
  }

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
