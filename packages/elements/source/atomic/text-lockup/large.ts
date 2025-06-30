import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '_types';

export type TypeTextLockupLarge = {
  headline?: ElementVisual | null;
  eyebrow?: HTMLElement | null;
  ribbon?: HTMLElement | null;
  text?: HTMLElement | null;
  textLargest?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

export default ({
  eyebrow,
  ribbon,
  headline,
  text,
  textLargest,
  actions,
  isThemeDark,
}: TypeTextLockupLarge) => {
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'text-lockup-large',
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });

  if (eyebrow) {
    const styledEyebrow = ElementModel.headline.sansSmall({
      element: eyebrow,
      elementStyles: {
        element: {
          textTransform: 'uppercase',
          fontWeight: 600,
        },
        siblingAfter: {
          marginTop: Styles.token.spacing.sm,
        },
      },
      isThemeDark,
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

  if (ribbon) {
    const styledEyebrow = ElementModel.text.ribbon({
      element: ribbon,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.sm,
        },
      },
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

  if (headline) {
    composite.element.appendChild(headline.element);
    composite.styles += headline.styles;
  }

  if (text) {
    const styledText = ElementModel.richText.simpleLarge({
      element: text,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
      isThemeDark,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (textLargest) {
    const styledText = ElementModel.richText.simpleLargest({
      element: textLargest,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
      isThemeDark,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (actions) {
    const styledActions = ElementModel.layout.gridStacked({
      element: actions,
    });
    composite.element.appendChild(styledActions.element);
    composite.styles += styledActions.styles;
  }

  return composite;
};
