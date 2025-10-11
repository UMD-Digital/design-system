import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import { type UMDElement } from '../../_types';

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
  eventMeta?: UMDElement;
  hasEyebrowRibbon?: boolean;
};

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-small-container';
const metaContainer = elementStyles?.event?.meta?.container;
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
    elementStyles: {
      element: {
        marginTop: token.spacing.sm,
      },
    },
  });

export const createTextLockupSmall = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {
  const children: UMDElement[] = [];

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
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });
};
