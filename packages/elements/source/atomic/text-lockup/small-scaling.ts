import { ElementModel } from 'model';
import {
  createEyebrow,
  createRibbonEyebrow,
  createActions,
  headlineStyles,
  textStyles,
  dateStyles,
} from './small';
import { type ElementVisual } from '../../_types';

export type TypeTextLockupSmallScaling = {
  actions?: HTMLElement | null;
  customStyles?: Record<string, string>;
  date?: HTMLElement | null;
  eventMeta?: ElementVisual;
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
  const children: ElementVisual[] = [];

  if (eyebrow && !hasEyebrowRibbon) {
    children.push(createEyebrow({ eyebrow, isThemeDark }));
  }

  if (eyebrow && hasEyebrowRibbon) {
    children.push(createRibbonEyebrow({ eyebrow }));
  }

  if (headline) {
    children.push(
      ElementModel.headline.sansScalingLarger({
        element: headline,
        elementStyles: headlineStyles,
        isThemeDark,
      }),
    );
  }

  if (eventMeta) {
    children.push(eventMeta);
  }

  if (text) {
    children.push(
      ElementModel.richText.simpleScaling({
        element: text,
        elementStyles: textStyles,
        isThemeDark,
      }),
    );
  }

  if (date) {
    children.push(
      ElementModel.headline.sansScalingMin({
        element: date,
        elementStyles: dateStyles,
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(createActions({ actions }));
  }

  return ElementModel.createDiv({
    className: 'scaling-font-block-container',
    children,
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
        ...customStyles,
      },
    },
  });
};
