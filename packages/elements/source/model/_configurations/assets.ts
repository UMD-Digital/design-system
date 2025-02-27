import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

interface ImageWrapperProps extends ElementProps {
  isScaled?: boolean;
}

interface ImageProps extends ElementProps {
  isAspectStandard?: boolean;
  isAspectSquare?: boolean;
}

export const imageCaption = (props: ElementProps) =>
  createElement(props, Styles.element.asset.image.caption);

export const imageAspect = (props: ImageProps) => {
  const { isAspectSquare } = props;

  if (isAspectSquare) {
    return createElement(props, Styles.element.asset.image.aspectSquare);
  }

  return createElement(props, Styles.element.asset.image.aspectStandard);
};

export const imageWrapper = (props: ImageWrapperProps) => {
  const { isScaled } = props;

  if (isScaled) {
    return createElement(props, Styles.element.asset.image.wrapperScaled);
  }

  return createElement(props, Styles.element.asset.image.wrapper);
};
