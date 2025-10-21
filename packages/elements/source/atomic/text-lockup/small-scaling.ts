import ElementBuilder from '@universityofmaryland/web-builder-library';
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
  const children: UMDElement[] = [];

  if (eyebrow && !hasEyebrowRibbon) {
    children.push(createEyebrow({ eyebrow, isThemeDark }));
  }

  if (eyebrow && hasEyebrowRibbon) {
    children.push(createRibbonEyebrow({ eyebrow }));
  }

  if (headline) {
    children.push(
      ElementBuilder.styled.headline.sansScalingLarger({
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
      ElementBuilder.styled.richText.simpleScaling({
        element: text,
        elementStyles: textStyles,
        isThemeDark,
      }),
    );
  }

  if (date) {
    children.push(
      ElementBuilder.styled.headline.sansScalingMin({
        element: date,
        elementStyles: dateStyles,
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(createActions({ actions }));
  }

  return ElementBuilder.create.div({
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
