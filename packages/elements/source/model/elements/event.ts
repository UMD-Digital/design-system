import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

export const metaContainer = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.container);

export const metaWrapper = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.wrapper);

export const metaItem = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.item);

export const signContainer = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.sign.container);
