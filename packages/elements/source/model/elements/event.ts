import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

export const metaContainer = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.container);

export const metaWrapper = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.wrapper);

export const metaDate = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.date);

export const metaLocation = (elementProps: ElementProps) =>
  createStyledElement(elementProps, Styles.element.event.meta.location);
