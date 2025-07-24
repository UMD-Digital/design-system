import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardImageOverlayProps extends ElementProps {}

export const elementIcon = (props: ElementProps) =>
  createStyledElement(
    props,
    Styles.element.composite.card.overlay.icon.elementIconContainer,
  );

export const elementQuote = (props: ElementProps) =>
  createStyledElement(
    props,
    Styles.element.composite.card.overlay.image.quoateContainer,
  );

export const icon = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.composite.card.overlay.icon.dark,
    );
  }

  return createStyledElement(
    props,
    Styles.element.composite.card.overlay.icon.light,
  );
};

export const image = (props: CardImageOverlayProps) => {
  const { isThemeDark, ...elementProps } = props;

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.overlay.image.tint,
  );
};
