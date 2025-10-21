import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../core';
import { type ElementProps } from '../core/_types';

interface ImageWrapperProps extends ElementProps {
  isScaled?: boolean;
}

interface ImageProps extends ElementProps {
  isAspectStandard?: boolean;
  isAspectSquare?: boolean;
}

export const imageCaption = (props: ElementProps) =>
  createStyledElement(props, Styles.element.asset.image.caption);

export const imageAspect = (props: ImageProps) => {
  const { isAspectSquare } = props;

  if (isAspectSquare) {
    return createStyledElement(props, Styles.element.asset.image.aspectSquare);
  }

  return createStyledElement(props, Styles.element.asset.image.aspectStandard);
};

export const imageWrapper = (props: ImageWrapperProps) => {
  const { isScaled } = props;

  if (isScaled) {
    return createStyledElement(props, Styles.element.asset.image.wrapperScaled);
  }

  return createStyledElement(props, Styles.element.asset.image.wrapper);
};

export const gifToggle = (props: ElementProps) =>
  createStyledElement(props, Styles.element.asset.gif.toggle);
