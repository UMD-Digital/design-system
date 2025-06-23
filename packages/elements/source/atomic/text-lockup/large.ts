import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';

export type TypeTextLockupLarge = {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  isHeadlineMaximum?: boolean;
};

export default ({
  eyebrow,
  headline,
  text,
  actions,
  isThemeDark,
  isHeadlineMaximum = false,
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
    const styledEyebrow = ElementModel.text.ribbon({
      element: eyebrow,
      elementStyles: {
        element: {},
        siblingAfter: {
          marginTop: Styles.token.spacing.min,
        },
      },
    });
    composite.element.appendChild(styledEyebrow.element);
    composite.styles += styledEyebrow.styles;
  }

  if (headline) {
    const styledHeadline = ElementModel.headline.campaignLarge({
      element: headline,
      elementStyles: {
        element: {
          textTransform: 'uppercase',
          [`@media (${Styles.token.media.queries.tablet.min})`]: {
            maxWidth: '700px',
            margin: '0 auto',
            color: `${Styles.token.color.white}`,
          },

          [`@media (${Styles.token.media.queries.desktop.min})`]: {
            maxWidth: '816px',
            ...(isHeadlineMaximum && {
              fontSize: `120px`,
            }),
          },

          [`& + *`]: {
            marginTop: Styles.token.spacing.sm,
          },
        },
        subElement: {
          color: 'currentColor',
        },
      },
      isThemeDark,
    });
    composite.element.appendChild(styledHeadline.element);
    composite.styles += styledHeadline.styles;
  }

  if (text) {
    const styledText = ElementModel.richText.simpleLargest({
      element: text,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.min,
        },
      },
      isThemeDark,
    });

    composite.element.appendChild(styledText.element);
    composite.styles += styledText.styles;
  }

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: {
        element: {
          marginTop: Styles.token.spacing.sm,
        },
      },
    });
    composite.element.appendChild(styledActions.element);
    composite.styles += styledActions.styles;
  }

  return composite;
};
