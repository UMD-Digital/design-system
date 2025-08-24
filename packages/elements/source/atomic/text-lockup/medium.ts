import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '../../_types';

interface TypeTextLockupMedium {
  actions?: HTMLElement | null;
  compositeHeadline?: ElementVisual | null;
  eventDetails?: ElementVisual;
  headline?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  ribbon?: HTMLElement | null;
  compositeStats?: ElementVisual | null;
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
  const children: ElementVisual[] = [];

  if (ribbon) {
    children.push(
      ElementModel.text.ribbon({
        element: ribbon,
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  if (compositeHeadline) {
    children.push(compositeHeadline);
  }

  if (headline && !compositeHeadline) {
    children.push(
      ElementModel.headline.sansLargest({
        element: headline,
        elementStyles: {
          element: {
            color: `${Styles.token.color.black}`,
            fontWeight: 800,
            textTransform: 'uppercase',
            textWrap: 'balance',

            [`${BREAKPOINTS.large}`]: {
              maxWidth: '90%',
            },
          },
          siblingAfter: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  if (eventDetails) {
    children.push(
      ElementModel.createDiv({
        className: 'text-lockup-medium-event-details',
        children: [eventDetails],
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.md,
          },
        },
      }),
    );
  }

  if (text) {
    children.push(
      ElementModel.richText.advanced({
        element: text,
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.md,
          },
        },
        isThemeDark: isThemeDark || isThemeMaryland || false,
      }),
    );
  }

  if (compositeStats) {
    children.push(compositeStats);
  }

  if (actions) {
    children.push(
      ElementModel.layout.gridStacked({
        element: actions,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.md,

            [`${BREAKPOINTS.large}`]: {
              marginTop: Styles.token.spacing.lg,
            },
          },
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'text-lockup-medium',
    children,
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });
};
