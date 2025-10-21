import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../core';
import { type ElementProps } from '../core/_types';

export const eyebrow = (props: ElementProps) =>
  createStyledElement(props, Styles.typography.elements.fonts.eyebrow);

export const ribbon = (props: ElementProps) =>
  createStyledElement(props, Styles.element.text.decoration.ribbon);

export const lineAdjustment = (props: ElementProps) =>
  createStyledElement(props, Styles.element.text.line.adjustent);

export const lineAdjustmentInset = (props: ElementProps) =>
  createStyledElement(props, Styles.element.text.line.adjustentInset);
