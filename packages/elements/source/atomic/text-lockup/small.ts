import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '../../_types';

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
  eventMeta?: ElementVisual;
  hasEyebrowRibbon?: boolean;
};

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-small-container';
const metaContainer = Styles?.element?.event?.meta?.container;
const metaClass: string = (() => {
  if (!metaContainer?.className) return '';

  if (Array.isArray(metaContainer.className)) {
    return metaContainer.className[0] || '';
  }

  if (typeof metaContainer.className === 'string') {
    return metaContainer.className;
  }

  return '';
})();

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

    [`& + *`]: {
      marginTop: token.spacing.sm,
    },

    [`& + .${metaClass}`]: {
      [`@media (max-width: 479px)`]: {
        marginTop: token.spacing.min,
      },
    },
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

export default ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {
  let children: ElementVisual[] = [];

  if (eyebrow) {
    children.push(createEyebrow({ eyebrow, isThemeDark }));
  }

  if (headline) {
    children.push(
      ElementModel.headline.sansLarger({
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
      ElementModel.richText.simple({
        element: text,
        elementStyles: textStyles,
        isThemeDark,
      }),
    );
  }

  if (date) {
    children.push(
      ElementModel.headline.sansMin({
        element: date,
        elementStyles: dateStyles,
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(
      createActions({
        actions,
      }),
    );
  }

  return ElementModel.createDiv({
    className: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
    children,
    elementStyles: {
      element: containerStyles,
    },
  });
};
