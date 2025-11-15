import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
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
    });

  if (ribbon) {
    const ribbonElement = new ElementBuilder(ribbon)
      .styled(elementStyles.text.decoration.ribbon)
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
      .styled(
        typography.sans.compose('largest', {
          theme: theme.fontColor(finalIsThemeDark),
        }),
      )
      .withStyles({
        element: {
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
      .styled(
        elementStyles.text.rich.composeAdvanced({
          theme: theme.fontColor(finalIsThemeDark),
        }),
      )
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.md,
        },
      })
      .build();

    container.withChild(textElement);
  }

  if (compositeStats) {
    container.withChild(compositeStats);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(layout.grid.stacked)
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
