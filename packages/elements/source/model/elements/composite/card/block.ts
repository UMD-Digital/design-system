import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardBlockProps extends ElementProps {
  isTransparent?: boolean;
  isBordered?: boolean;
  isPerson?: boolean;
}

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
  const { isTransparent, isBordered, isPerson, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isPerson && isThemeDark) {
    return personDark(elementProps);
  }

  if (isPerson) {
    return person(elementProps);
  }

  if (isTransparent) {
    return transparent(elementProps);
  }

  if (isThemeDark) {
    return themeDark(elementProps);
  }

  if (isBordered) {
    return bordered(elementProps);
  }

  return themeLight(elementProps);
};
