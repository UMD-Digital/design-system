import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
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

export const dateStyles = (isThemeDark?: boolean) => ({
  element: {
    display: 'block',

    ...(!isThemeDark && {
      color: `${token.color.gray.mediumAA}`,
    }),
  },
  child: {
    color: 'currentColor',
  },
  siblingAfter: {
    marginTop: token.spacing.min,
  },
});

export const createEyebrow = ({ eyebrow, isThemeDark }: TypeEyebrow) =>
  new ElementBuilder(eyebrow)
    .styled(
      typography.elements.compose('eyebrow', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles(eyebrowStyles)
    .build();

export const createRibbonEyebrow = ({ eyebrow }: TypeEyebrow) =>
  new ElementBuilder(eyebrow)
    .styled(elementStyles.text.decoration.ribbon)
    .withStyles(ribbonStyles)
    .build();

export const createActions = ({ actions }: TypeActions) =>
  new ElementBuilder(actions)
    .styled(layout.grid.inline.tabletRows)
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
    });

  if (eyebrow) {
    const eyebrowElement = createEyebrow({ eyebrow, isThemeDark });
    container.withChild(eyebrowElement);
  }

  if (headline) {
    const headlineElement = new ElementBuilder(headline)
      .styled(
        typography.sans.compose('larger', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles(headlineStyles)
      .build();

    container.withChild(headlineElement);
  }

  if (eventMeta) {
    container.withChild(eventMeta);
  }

  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(
        elementStyles.text.rich.composeSimple({
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles(textStyles)
      .build();

    container.withChild(textElement);
  }

  if (date) {
    const dateElement = new ElementBuilder('slot')
      .withClassName('umd-headline-sans-min')
      .styled(
        typography.sans.compose('min', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withAnimation('slideUnder')
      .withChild(date)
      .withStyles(dateStyles(isThemeDark))
      .build();

    container.withChild(dateElement);
  }

  if (actions) {
    const actionsElement = createActions({ actions });
    container.withChild(actionsElement);
  }

  return container.build();
};
