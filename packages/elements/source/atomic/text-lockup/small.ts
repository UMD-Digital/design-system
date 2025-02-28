import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { ElementModel } from 'model';

type TypeTheme = {
  isThemeDark?: boolean;
};

type TypeEyebrow = TypeTheme & {
  eyebrow: HTMLElement;
};

type TypeActions = {
  actions: HTMLElement;
};

export type TypeTextLockupSmall = TypeTheme & {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  eventMeta?: { element: HTMLElement; styles: string };
  isEyebrowRibbon?: boolean;
};

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-small-container';
const { token } = Styles;

export const eyebrowStyles = {
  element: {
    display: 'block',
  },
  siblingAfter: {
    marginTop: token.spacing.min,
  },
};

export const ribbonStyles = {
  siblingAfter: {
    marginTop: token.spacing.sm,
  },
};

export const headlineStyles = {
  element: {
    fontWeight: '700',
    color: `${token.color.black}`,
  },
  siblingAfter: {
    marginTop: token.spacing.sm,
  },
  subElement: {
    color: 'currentColor',
  },
};

export const textStyles = {
  element: {
    color: `${token.color.gray.dark}`,
  },
  siblingAfter: {
    marginTop: token.spacing.min,
  },
};

export const dateStyles = {
  element: {
    display: 'block',
    color: `${token.color.gray.mediumAA}`,
  },
  child: {
    color: 'currentColor',
  },
  siblingAfter: {
    marginTop: token.spacing.min,
  },
};

export const actionStyles = {
  element: {
    marginTop: token.spacing.sm,
  },
};

const containerStyles = {
  className: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
  zIndex: '9',
  position: 'relative',
};

export const createEyebrow = ({ eyebrow, isThemeDark }: TypeEyebrow) =>
  ElementModel.text.eyebrow({
    element: eyebrow,
    elementStyles: eyebrowStyles,
    isThemeDark,
  });

export const createRibbonEyebrow = ({ eyebrow }: TypeEyebrow) =>
  ElementModel.text.ribbon({
    element: eyebrow,
    elementStyles: ribbonStyles,
  });

export const createActions = ({ actions }: TypeActions) =>
  ElementModel.layout.gridInlineTabletRows({
    element: actions,
    elementStyles: actionStyles,
  });

export const elements = {
  container: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
  eyebrow: Styles.typography.elements.fonts.eyebrow.className,
  headline: Styles.typography.sans.fonts.larger.className,
  text: Styles.element.text.rich.simple.className,
  date: Styles.typography.sans.fonts.min.className,
  actions: Styles.layout.grid.inline.tabletRows.className,
};

export default ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {
  const container = document.createElement('div');
  let styles = `
    ${Utility.styles.getStyleStringFromJssObject(containerStyles)}
  `;

  container.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER);

  if (eyebrow) {
    const styledEyebrow = createEyebrow({ eyebrow, isThemeDark });
    container.appendChild(styledEyebrow.element);
    styles += styledEyebrow.styles;
  }

  if (headline) {
    const styledHeadline = ElementModel.headline.sansLarger({
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
    const styledText = ElementModel.richText.simple({
      element: text,
      elementStyles: textStyles,
      isThemeDark,
    });

    container.appendChild(styledText.element);
    styles += styledText.styles;
  }

  if (date) {
    const styledDate = ElementModel.headline.sansMin({
      element: date,
      elementStyles: dateStyles,
      isThemeDark,
    });

    container.appendChild(styledDate.element);
    styles += styledDate.styles;
  }

  if (actions) {
    const styledActions = createActions({
      actions,
    });
    container.appendChild(styledActions.element);
    styles += styledActions.styles;
  }

  return { element: container, styles };
};
