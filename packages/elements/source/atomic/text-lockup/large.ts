import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
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
      ElementBuilder.styled.headline.sansSmall({
        element: eyebrow,
        elementStyles: {
          element: {
            textTransform: 'uppercase',
            fontWeight: 600,
            color: token.color.black,
          },
          siblingAfter: {
            marginTop: token.spacing.sm,
          },
        },
        isThemeDark,
      }),
    );
  }

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

  if (headlineComposite) {
    children.push(headlineComposite);
  }

  if (text) {
    children.push(
      ElementBuilder.styled.richText.simpleLarge({
        element: text,
        elementStyles: {
          siblingAfter: {
            marginTop: token.spacing.lg,
          },
        },
        isThemeDark,
      }),
    );
  }

  if (textLargest) {
    children.push(
      ElementBuilder.styled.richText.simpleLargest({
        element: textLargest,
        elementStyles: {
          siblingAfter: {
            marginTop: token.spacing.lg,
          },
        },
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(
      ElementBuilder.styled.layout.gridStacked({
        element: actions,
      }),
    );
  }

  return ElementBuilder.create.div({
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
