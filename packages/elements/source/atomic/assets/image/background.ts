import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { default as gifToggle } from './gif';
import { type UMDElement } from '../../../_types';

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
) => {
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

  return new ElementBuilder('span')
    .withText(text)
    .styled(Styles.element.asset.image.caption)
    .build();
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
    return new ElementBuilder()
      .styled(Styles.element.asset.image.aspectStandard)
      .withChild(element)
      .build();
  }

  return new ElementBuilder()
    .withClassName('image-container')
    .withStyles({
      element: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
    })
    .withChild(element)
    .build();
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
  const styles = isScaled
    ? Styles.element.asset.image.wrapperScaled
    : Styles.element.asset.image.wrapper;

  const composite = new ElementBuilder().styled(styles).withStyles({
    element: {
      ...customStyles,
    },
  });

  if (caption) {
    composite.withChild(caption);
  }

  if (dateSign) {
    const test = new ElementBuilder()
      .styled(Styles.layout.background.box.white)
      .withChild(dateSign)
      .build();

    composite.withChild(test);
  }

  if (asset) {
    composite.withChild(asset);
  }

  return composite.build();
};
