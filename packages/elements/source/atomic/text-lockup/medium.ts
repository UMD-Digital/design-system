import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { ElementVisual } from '../../_types';

interface TypeTextLockupMedium {
  headline?: HTMLElement | null;
  compositeHeadline?: ElementVisual | null;
  ribbon?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
}

const BREAKPOINTS = {
  medium: `@container (min-width: 400px)`,
  large: `@container (min-width: 600px)`,
};

export default (props: TypeTextLockupMedium) => {
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'text-lockup-medium',
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });

  if (props.ribbon) {
    const styledEyebrow = ElementModel.text.ribbon({
      element: props.ribbon,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.sm,
        },
      },
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

  if (props.compositeHeadline) {
    composite.element.appendChild(props.compositeHeadline.element);
    composite.styles += props.compositeHeadline.styles;
  }

  if (props.headline) {
    const styledEyebrow = ElementModel.headline.sansLarger({
      element: props.headline,
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
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

  if (props.text) {
    const styledText = ElementModel.richText.simpleLarge({
      element: props.text,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.md,
        },
      },
      isThemeDark: props.isThemeDark || props.isThemeMaryland || false,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (props.actions) {
    const styledActions = ElementModel.layout.gridStacked({
      element: props.actions,
      elementStyles: {
        element: {
          marginTop: Styles.token.spacing.md,

          [`${BREAKPOINTS.large}`]: {
            marginTop: Styles.token.spacing.lg,
          },
        },
      },
    });
    composite.element.appendChild(styledActions.element);
    composite.styles += styledActions.styles;
  }

  return composite;
};
