import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const imageCaption = (props: ElementProps) =>
  createElement(props, Styles.element.asset.image.caption);

export const imageAspectStandard = (props: ElementProps) =>
  createElement(props, Styles.element.asset.image.aspectStandard);

export const imageWrapper = (props: ElementProps) =>
  createElement(props, Styles.element.asset.image.wrapper);

export const imageWrapperScaled = (props: ElementProps) =>
  createElement(props, Styles.element.asset.image.wrapperScaled);
