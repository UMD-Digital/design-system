import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
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
      ElementBuilder.styled.text.ribbon({
        element: ribbon,
        elementStyles: {
          siblingAfter: {
            marginTop: token.spacing.sm,
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
      ElementBuilder.styled.headline.sansLargest({
        element: headline,
        elementStyles: {
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
        },
      }),
    );
  }

  if (eventDetails) {
    children.push(
      ElementBuilder.create.div({
        className: 'text-lockup-medium-event-details',
        children: [eventDetails],
        elementStyles: {
          siblingAfter: {
            marginTop: token.spacing.md,
          },
        },
      }),
    );
  }

  if (text) {
    children.push(
      ElementBuilder.styled.richText.advanced({
        element: text,
        elementStyles: {
          siblingAfter: {
            marginTop: token.spacing.md,
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
      ElementBuilder.styled.layout.gridStacked({
        element: actions,
        elementStyles: {
          element: {
            marginTop: token.spacing.md,

            [`${BREAKPOINTS.large}`]: {
              marginTop: token.spacing.lg,
            },
          },
        },
      }),
    );
  }

  return ElementBuilder.create.div({
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
