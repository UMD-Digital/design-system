import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement, createLinkAnimationElement } from './_base';
import { type ElementProps } from '../_types';

export const outline = (props: ElementProps) =>
  createElement(props, Styles.element.action.outline.normal);

export const outlineLarge = (props: ElementProps) =>
  createElement(props, Styles.element.action.outline.large);

export const outlineWhite = (props: ElementProps) =>
  createElement(props, Styles.element.action.outline.white);

export const primary = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.normal);

export const primaryLarge = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.large);

export const primaryWhite = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.white);

export const secondary = (props: ElementProps) =>
  createLinkAnimationElement(
    { ...props, isColorRed: true },
    Styles.element.action.secondary.normal,
  );

export const secondaryLarge = (props: ElementProps) =>
  createLinkAnimationElement(
    { ...props, isColorRed: true },
    Styles.element.action.secondary.large,
  );

export const secondaryWhite = (props: ElementProps) =>
  createLinkAnimationElement(
    { ...props, isColorRed: true },
    Styles.element.action.secondary.white,
  );

export const secondaryGold = (props: ElementProps) =>
  createLinkAnimationElement(
    { ...props, isColorRed: true },
    Styles.element.action.secondary.gold,
  );
