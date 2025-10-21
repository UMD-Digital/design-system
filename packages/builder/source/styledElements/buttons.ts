import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../core';
import { type ElementProps } from '../core/_types';

export const fullScreen = (props: ElementProps) =>
  createStyledElement(props, Styles.element.action.button.fullScreen);

export const videoState = (props: ElementProps) =>
  createStyledElement(props, Styles.element.action.button.videoState);
