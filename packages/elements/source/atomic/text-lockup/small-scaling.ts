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
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  eventMeta?: ElementVisual;
  isThemeDark?: boolean;
  hasEyebrowRibbon?: boolean;
};

export default (props: TypeTextLockupSmallScaling) => {
  const {
    headline,
    eyebrow,
    text,
    date,
    actions,
    eventMeta,
    isThemeDark,
    hasEyebrowRibbon = false,
  } = props;

  const children: ElementVisual[] = [];

  if (eyebrow && !hasEyebrowRibbon) {
    children.push(createEyebrow({ eyebrow, isThemeDark }));
  }

  if (eyebrow && hasEyebrowRibbon) {
    children.push(createRibbonEyebrow({ eyebrow }));
  }

  if (headline) {
    children.push(
      ElementModel.headline.sansScalingLarge({
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
      },
    },
  });
};
