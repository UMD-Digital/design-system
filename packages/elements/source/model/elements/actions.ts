import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

export const iconSmall = (props: ElementProps) => {
  if (props.isThemeDark) {
    return createStyledElement.base(
      props,
      Styles.element.action.icon.smallDark,
    );
  }
  return createStyledElement.base(props, Styles.element.action.icon.small);
};

export const outline = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.outline.normal);

export const outlineLarge = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.outline.large);

export const outlineWhite = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.outline.white);

export const primary = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.primary.normal);

export const primaryLarge = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.primary.large);

export const primaryWhite = (props: ElementProps) =>
  createStyledElement.base(props, Styles.element.action.primary.white);

export const secondary = (props: ElementProps) =>
  createStyledElement.animationLine(
    { ...props, isAnimationLineRed: true },
    Styles.element.action.secondary.normal,
  );

export const secondaryLarge = (props: ElementProps) =>
  createStyledElement.animationLine(
    { ...props, isAnimationLineRed: true },
    Styles.element.action.secondary.large,
  );

export const secondaryWhite = (props: ElementProps) =>
  createStyledElement.animationLine(
    { ...props, isAnimationLineRed: true, isThemeDark: true },
    Styles.element.action.secondary.white,
  );

export const secondaryGold = (props: ElementProps) =>
  createStyledElement.animationLine(
    { ...props, isAnimationLineRed: true, isThemeDark: true },
    Styles.element.action.secondary.gold,
  );
