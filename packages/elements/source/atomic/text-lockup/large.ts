import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { ElementModel } from '../../_types';

interface TypeTextLockupLarge {
  headlineComposite?: ElementModel<HTMLElement> | null;
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
    });

  if (eyebrow) {
    const eyebrowElement = new ElementBuilder(eyebrow)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          textTransform: 'uppercase',
          fontWeight: 600,
          ...(!isThemeDark && { color: token.color.black }),
        },
        siblingAfter: {
          marginTop: token.spacing.sm,
        },
      })
      .build();

    container.withChild(eyebrowElement);
  }

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

  if (headlineComposite) {
    container.withChild(headlineComposite);
  }

  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(
        elementStyles.text.rich.composeSimple({
          size: 'large',
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .build();

    container.withChild(textElement);
  }

  if (textLargest) {
    const textLargestElement = new ElementBuilder(textLargest)
      .styled(
        elementStyles.text.rich.composeSimple({
          size: 'largest',
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .build();

    container.withChild(textLargestElement);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(layout.grid.stacked)
      .build();

    container.withChild(actionsElement);
  }

  return container.build();
};
