import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

interface CardProps extends ElementProps {
  isTransparent?: boolean;
  isBordered?: boolean;
}

export const card = (props: CardProps) => {
  const { isTransparent, isBordered, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isTransparent) {
    return createElement(
      elementProps,
      Styles.element.composite.card.transparent,
    );
  }

  if (isThemeDark) {
    return createElement(elementProps, Styles.element.composite.card.dark);
  }

  if (isBordered) {
    return createElement(elementProps, Styles.element.composite.card.border);
  }

  return createElement(elementProps, Styles.element.composite.card.light);
};
