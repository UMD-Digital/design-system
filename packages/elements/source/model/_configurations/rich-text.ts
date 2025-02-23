import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const simple = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createElement(props, Styles.element.text.rich.simpleDark);
  }

  return createElement(props, Styles.element.text.rich.simple);
};

export const simpleLarge = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createElement(props, Styles.element.text.rich.simpleLargeDark);
  }

  return createElement(props, Styles.element.text.rich.simpleLarge);
};

export const simpleScaling = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createElement(props, Styles.element.text.rich.simpleScalingDark);
  }

  return createElement(props, Styles.element.text.rich.simpleScaling);
};
