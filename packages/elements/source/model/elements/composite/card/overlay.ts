import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardImageOverlayProps extends ElementProps {}

export const elementQuote = (props: ElementProps) =>
  createStyledElement(
    props,
    Styles.element.composite.card.overlay.image.quoateContainer,
  );

export const image = (props: CardImageOverlayProps) => {
  const { isThemeDark, ...elementProps } = props;

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.overlay.image.tint,
  );
};
