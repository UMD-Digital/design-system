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

export default (props: TypeTextLockupLarge) => {
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'text-lockup-large',
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
        ...props.additionalStyles,
      },
    },
  });

  if (props.eyebrow) {
    const styledEyebrow = ElementModel.headline.sansSmall({
      element: props.eyebrow,
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
      isThemeDark: props.isThemeDark || false,
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

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

  if (props.headlineComposite) {
    composite.element.appendChild(props.headlineComposite.element);
    composite.styles += props.headlineComposite.styles;
  }

  if (props.text) {
    const styledText = ElementModel.richText.simpleLarge({
      element: props.text,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
      isThemeDark: props.isThemeDark || false,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (props.textLargest) {
    const styledText = ElementModel.richText.simpleLargest({
      element: props.textLargest,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
      isThemeDark: props.isThemeDark || false,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (props.actions) {
    const styledActions = ElementModel.layout.gridStacked({
      element: props.actions,
    });
    composite.element.appendChild(styledActions.element);
    composite.styles += styledActions.styles;
  }

  return composite;
};
