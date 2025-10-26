import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { ElementModel } from '../../_types';

interface TypeTextLockupMedium {
  actions?: HTMLElement | null;
  compositeHeadline?: ElementModel<HTMLElement> | null;
  eventDetails?: ElementModel<HTMLElement>;
  headline?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  ribbon?: HTMLElement | null;
  compositeStats?: ElementModel<HTMLElement> | null;
  text?: HTMLElement | null;
}

const BREAKPOINTS = {
  medium: `@container (min-width: 400px)`,
  large: `@container (min-width: 600px)`,
};

export default ({
  actions,
  eventDetails,
  compositeHeadline,
  compositeStats,
  headline,
  isThemeDark,
  isThemeMaryland,
  ribbon,
  text,
}: TypeTextLockupMedium) => {
  const finalIsThemeDark = isThemeDark || isThemeMaryland;

  const container = new ElementBuilder()
    .withClassName('text-lockup-medium')
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
      },
    })
    .withThemeDark(finalIsThemeDark);

  if (ribbon) {
    const ribbonElement = new ElementBuilder(ribbon)
      .styled(Styles.element.text.decoration.ribbon)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.sm,
        },
      })
      .build();

    container.withChild(ribbonElement);
  }

  if (compositeHeadline) {
    container.withChild(compositeHeadline);
  }

  if (headline && !compositeHeadline) {
    const headlineElement = new ElementBuilder(headline)
      .styled(Styles.typography.sans.fonts.largest)
      .withStyles({
        element: {
          color: `${token.color.black}`,
          fontWeight: 800,
          textTransform: 'uppercase',
          textWrap: 'balance',

          [`${BREAKPOINTS.large}`]: {
            maxWidth: '90%',
          },
        },
        siblingAfter: {
          marginTop: token.spacing.sm,
        },
      })
      .build();

    container.withChild(headlineElement);
  }

  if (eventDetails) {
    const eventDetailsElement = new ElementBuilder()
      .withClassName('text-lockup-medium-event-details')
      .withChild(eventDetails)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.md,
        },
      })
      .build();

    container.withChild(eventDetailsElement);
  }

  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(Styles.element.text.rich.advanced)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.md,
        },
      })
      .withThemeDark(finalIsThemeDark)
      .build();

    container.withChild(textElement);
  }

  if (compositeStats) {
    container.withChild(compositeStats);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(Styles.layout.grid.stacked)
      .withStyles({
        element: {
          marginTop: token.spacing.md,

          [`${BREAKPOINTS.large}`]: {
            marginTop: token.spacing.lg,
          },
        },
      })
      .build();

    container.withChild(actionsElement);
  }

  return container.build();
};
