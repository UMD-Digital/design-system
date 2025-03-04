import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

interface CardBlockProps extends ElementProps {
  isTransparent?: boolean;
  isBordered?: boolean;
}

interface CardListProps extends ElementProps {
  isDisplayEvent?: boolean;
}

interface CardOverlayProps extends ElementProps {}

export const cardBlock = (props: CardBlockProps) => {
  const { isTransparent, isBordered, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isTransparent) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.transparent,
    );
  }

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.dark,
    );
  }

  if (isBordered) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.border,
    );
  }

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.block.light,
  );
};

export const cardList = (props: CardListProps) => {
  const { isDisplayEvent, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isDisplayEvent && isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.eventDark,
    );
  }

  if (isDisplayEvent) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.eventLight,
    );
  }

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.dark,
    );
  }

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.list.light,
  );
};

export const cardOverlay = (props: CardOverlayProps) => {
  const { isThemeDark, ...elementProps } = props;

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.overlay.colorDark,
    );
  }

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.overlay.colorLight,
  );
};
