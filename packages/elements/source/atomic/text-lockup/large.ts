import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '../../_types';

interface TypeTextLockupLarge {
  headlineComposite?: ElementVisual | null;
  eyebrow?: HTMLElement | null;
  ribbon?: HTMLElement | null;
  text?: HTMLElement | null;
  textLargest?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  additionalStyles?: Record<string, unknown>;
}

export default ({
  eyebrow,
  ribbon,
  headlineComposite,
  text,
  textLargest,
  actions,
  isThemeDark,
  additionalStyles,
}: TypeTextLockupLarge) => {
  const children: ElementVisual[] = [];

  if (eyebrow) {
    children.push(
      ElementModel.headline.sansSmall({
        element: eyebrow,
        elementStyles: {
          element: {
            textTransform: 'uppercase',
            fontWeight: 600,
            color: Styles.token.color.black,
          },
          siblingAfter: {
            marginTop: Styles.token.spacing.sm,
          },
        },
        isThemeDark,
      }),
    );
  }

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

  if (headlineComposite) {
    children.push(headlineComposite);
  }

  if (text) {
    children.push(
      ElementModel.richText.simpleLarge({
        element: text,
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.lg,
          },
        },
        isThemeDark,
      }),
    );
  }

  if (textLargest) {
    children.push(
      ElementModel.richText.simpleLargest({
        element: textLargest,
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.lg,
          },
        },
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(
      ElementModel.layout.gridStacked({
        element: actions,
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'text-lockup-large',
    children,
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
        ...additionalStyles,
      },
    },
  });
};
