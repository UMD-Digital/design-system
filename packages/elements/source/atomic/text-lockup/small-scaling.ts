import * as Utility from 'utilities';
import { ElementModel } from 'model';
import {
  createEyebrow,
  createRibbonEyebrow,
  createActions,
  headlineStyles,
  textStyles,
  dateStyles,
} from './small';

export type TypeTextLockupSmallScaling = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  eventMeta?: { element: HTMLElement; styles: string };
  isThemeDark?: boolean;
  hasEyebrowRibbon?: boolean;
};

const ELEMENT_SCALABLE_FONT_CONTAINER = 'scaling-font-block-container';

const containerStyles = {
  className: ELEMENT_SCALABLE_FONT_CONTAINER,
  zIndex: '9',
  position: 'relative',
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
  const container = document.createElement('div');
  let styles = `
    ${Utility.theme.getStyleStringFromJssObject(containerStyles)}
  `;

  container.classList.add(ELEMENT_SCALABLE_FONT_CONTAINER);

  if (eyebrow && !hasEyebrowRibbon) {
    const styledEyebrow = createEyebrow({ eyebrow, isThemeDark });
    container.appendChild(styledEyebrow.element);
    styles += styledEyebrow.styles;
  }

  if (eyebrow && hasEyebrowRibbon) {
    const styledEyebrow = createRibbonEyebrow({ eyebrow });
    container.appendChild(styledEyebrow.element);
    styles += styledEyebrow.styles;
  }

  if (headline) {
    const styledHeadline = ElementModel.headline.sansScalingLarge({
      element: headline,
      elementStyles: headlineStyles,
      isThemeDark,
    });
    container.appendChild(styledHeadline.element);
    styles += styledHeadline.styles;
  }

  if (eventMeta) {
    container.appendChild(eventMeta.element);
    styles += eventMeta.styles;
  }

  if (text) {
    const styledText = ElementModel.richText.simpleScaling({
      element: text,
      elementStyles: textStyles,
      isThemeDark,
    });

    container.appendChild(styledText.element);
    styles += styledText.styles;
  }

  if (date) {
    const styledDate = ElementModel.headline.sansScalingMin({
      element: date,
      elementStyles: dateStyles,
      isThemeDark,
    });

    container.appendChild(styledDate.element);
    styles += styledDate.styles;
  }

  if (actions) {
    const styledActions = createActions({ actions });
    container.appendChild(styledActions.element);
    styles += styledActions.styles;
  }

  return { element: container, styles };
};
