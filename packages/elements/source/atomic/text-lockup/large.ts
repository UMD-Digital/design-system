import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { ElementModel } from '../../_types';

interface TypeTextLockupLarge {
  headlineComposite?: ElementModel | null;
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
  const container = new ElementBuilder()
    .withClassName('text-lockup-large')
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
        ...additionalStyles,
      },
    })
    .withThemeDark(isThemeDark);

  if (eyebrow) {
    const eyebrowElement = new ElementBuilder(eyebrow)
      .styled(Styles.typography.sans.fonts.small)
      .withStyles({
        element: {
          textTransform: 'uppercase',
          fontWeight: 600,
          color: token.color.black,
        },
        siblingAfter: {
          marginTop: token.spacing.sm,
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(eyebrowElement);
  }

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

  if (headlineComposite) {
    container.withChild(headlineComposite.element);
  }

  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(Styles.element.text.rich.simpleLarge)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(textElement);
  }

  if (textLargest) {
    const textLargestElement = new ElementBuilder(textLargest)
      .styled(Styles.element.text.rich.simpleLargest)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(textLargestElement);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(Styles.layout.grid.stacked)
      .build();

    container.withChild(actionsElement);
  }

  return container.build();
};
