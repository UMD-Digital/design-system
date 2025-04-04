import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardBlockProps extends ElementProps {
  isTransparent?: boolean;
  hasBorder?: boolean;
  isPerson?: boolean;
}

export const borderedDark = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.borderDark);

export const bordered = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.border);

export const person = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.person);

export const personDark = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.personDark);

export const themeDark = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.dark);

export const themeLight = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.light);

export const transparent = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.transparent);

export default (props: CardBlockProps) => {
  const { isTransparent, hasBorder, isPerson, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isPerson && isThemeDark) {
    return personDark(elementProps);
  }

  if (isPerson) {
    return person(elementProps);
  }

  if (hasBorder && isThemeDark) {
    return borderedDark(elementProps);
  }

  if (hasBorder) {
    return bordered(elementProps);
  }

  if (isTransparent) {
    return transparent(elementProps);
  }

  if (isThemeDark) {
    return themeDark(elementProps);
  }

  return themeLight(elementProps);
};
