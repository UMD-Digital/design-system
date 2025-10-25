import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  createEyebrow,
  createRibbonEyebrow,
  createActions,
  headlineStyles,
  textStyles,
  dateStyles,
} from './small';
import { type UMDElement } from '../../_types';

export type TypeTextLockupSmallScaling = {
  actions?: HTMLElement | null;
  customStyles?: Record<string, string>;
  date?: HTMLElement | null;
  eventMeta?: UMDElement;
  eyebrow?: HTMLElement | null;
  hasEyebrowRibbon?: boolean;
  headline?: HTMLElement | null;
  isThemeDark?: boolean;
  text?: HTMLElement | null;
};

export default ({
  actions,
  customStyles = {},
  date,
  eventMeta,
  eyebrow,
  hasEyebrowRibbon = false,
  headline,
  isThemeDark,
  text,
}: TypeTextLockupSmallScaling) => {
  const container = new ElementBuilder()
    .withClassName('scaling-font-block-container')
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
        ...customStyles,
      },
    })
    .withThemeDark(isThemeDark);

  if (eyebrow && !hasEyebrowRibbon) {
    const eyebrowElement = createEyebrow({ eyebrow, isThemeDark });
    container.withChild(eyebrowElement);
  }

  if (eyebrow && hasEyebrowRibbon) {
    const ribbonEyebrowElement = createRibbonEyebrow({ eyebrow });
    container.withChild(ribbonEyebrowElement);
  }

  if (headline) {
    const headlineElement = new ElementBuilder(headline)
      .styled(Styles.typography.sans.scalingFonts.larger)
      .withStyles(headlineStyles)
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(headlineElement);
  }

  if (eventMeta) {
    container.withChild(eventMeta);
  }

  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(Styles.element.text.rich.simpleScaling)
      .withStyles(textStyles)
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(textElement);
  }

  if (date) {
    const dateElement = new ElementBuilder(date)
      .styled(Styles.typography.sans.scalingFonts.min)
      .withStyles(dateStyles)
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(dateElement);
  }

  if (actions) {
    const actionsElement = createActions({ actions });
    container.withChild(actionsElement);
  }

  return container.build();
};
