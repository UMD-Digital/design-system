import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { headlines } from '@universityofmaryland/web-builder-library/presets';
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
  new ElementBuilder(eyebrow)
    .styled(Styles.typography.elements.fonts.eyebrow)
    .withStyles(eyebrowStyles)
    .withThemeDark(isThemeDark)
    .build();

export const createRibbonEyebrow = ({ eyebrow }: TypeEyebrow) =>
  new ElementBuilder(eyebrow)
    .styled(Styles.element.text.decoration.ribbon)
    .withStyles(ribbonStyles)
    .build();

export const createActions = ({ actions }: TypeActions) =>
  new ElementBuilder(actions)
    .styled(Styles.layout.grid.inline.tabletRows)
    .withStyles({
      element: {
        marginTop: token.spacing.sm,
      },
    })
    .build();

export const createTextLockupSmall = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {
  const container = new ElementBuilder()
    .withClassName(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER)
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
      },
    })
    .withThemeDark(isThemeDark);

  if (eyebrow) {
    const eyebrowElement = createEyebrow({ eyebrow, isThemeDark });
    container.withChild(eyebrowElement);
  }

  if (headline) {
    const headlineElement = new ElementBuilder(headline)
      .styled(Styles.typography.sans.fonts.larger)
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
      .styled(Styles.element.text.rich.simple)
      .withStyles(textStyles)
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(textElement);
  }

  if (date) {
    const dateElement = headlines
      .sansMin()
      .withChild(date)
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
